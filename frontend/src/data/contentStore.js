// contentStore.js
// ─────────────────────────────────────────────────────────────────────────────
// Public content is hydrated from the API; writes require an authenticated admin.
//
// PURPOSE
// Static modules remain the fallback. The in-memory cache is only a view of
// database content and is never the durable source of truth.
// ─────────────────────────────────────────────────────────────────────────────

import api from "../api";

const EVENT_NAME = "sms:content-changed";
let overrides = {};
let loaded = false;
let loadPromise;

function publish() {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

function replaceCache(next) {
  overrides =
    next && typeof next === "object" && !Array.isArray(next) ? next : {};
  publish();
}

export async function loadContent() {
  if (loaded) return overrides;
  if (!loadPromise) {
    loadPromise = api
      .get("/content")
      .then((res) => {
        overrides = res.data?.data?.content || {};
        loaded = true;
        publish();
        return overrides;
      })
      .catch(() => {
        loaded = true;
        return overrides;
      })
      .finally(() => {
        loadPromise = null;
      });
  }
  return loadPromise;
}

/**
 * Returns a database override when present, otherwise the static default.
 */
export function getSection(sectionName, fallback) {
  const override = overrides[sectionName];
  if (override == null) return fallback;
  if (typeof fallback !== "object" || fallback == null) {
    return override !== undefined ? override : fallback;
  }
  if (Array.isArray(fallback)) return override; // arrays replaced wholesale
  if (typeof fallback === "object") return { ...fallback, ...override }; // shallow-merge objects
  return fallback;
}

/** Get one item from a CMS-managed array by id. */
export function getById(sectionName, id) {
  const arr = overrides[sectionName];
  if (!Array.isArray(arr)) return null;
  return arr.find((x) => String(x.id) === String(id)) || null;
}

/** Replace a section in MySQL and update the local view after success. */
export async function setSection(sectionName, value) {
  const res = await api.put(`/admin/${encodeURIComponent(sectionName)}`, {
    content: value,
  });
  overrides = { ...overrides, [sectionName]: res.data?.data?.content ?? value };
  publish();
  return overrides[sectionName];
}

/** Create a section item in MySQL and return its generated id. */
export async function addItem(sectionName, item) {
  const res = await api.post(`/admin/${encodeURIComponent(sectionName)}`, {
    item,
  });
  overrides = { ...overrides, [sectionName]: res.data.data.content };
  publish();
  return res.data.data.item.id;
}

export async function updateItem(sectionName, id, patch) {
  const res = await api.put(
    `/admin/${encodeURIComponent(sectionName)}/${encodeURIComponent(id)}`,
    { item: patch },
  );
  overrides = { ...overrides, [sectionName]: res.data.data.content };
  publish();
  return true;
}

export async function removeItem(sectionName, id) {
  const res = await api.delete(
    `/admin/${encodeURIComponent(sectionName)}/${encodeURIComponent(id)}`,
  );
  overrides = { ...overrides, [sectionName]: res.data.data.content };
  publish();
}

export async function resetAllOverrides() {
  await api.delete("/admin/content");
  overrides = {};
  publish();
}

export function getAllOverrides() {
  return overrides;
}

export function hasOverrides() {
  return Object.keys(overrides).length > 0;
}

/** Subscribe to change events. Returns an unsubscribe function. */
export function subscribe(handler) {
  if (typeof window === "undefined") return () => {};
  const wrap = (e) => handler(e);
  window.addEventListener(EVENT_NAME, wrap);
  const wrapStorage = (e) => {
    if (e.key === STORAGE_KEY) handler(e);
  };
  window.addEventListener("storage", wrapStorage);
  return () => {
    window.removeEventListener(EVENT_NAME, wrap);
    window.removeEventListener("storage", wrapStorage);
  };
}

import { useEffect, useState } from "react";

/**
 * React hook: returns the merged content for a section AND re-renders
 * the consumer whenever the admin writes a new override (in any tab).
 */
export function useContentSection(sectionName, fallback) {
  const compute = () => getSection(sectionName, fallback);
  const [value, setValue] = useState(compute);
  useEffect(() => {
    loadContent();
    setValue(compute());
    const unsub = subscribe(() => setValue(compute()));
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionName, JSON.stringify(fallback)]);
  return value;
}
