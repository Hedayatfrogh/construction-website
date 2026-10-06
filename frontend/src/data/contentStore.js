// contentStore.js
// ─────────────────────────────────────────────────────────────────────────────
// Client-side content store backed by the backend's SQLite database.
//
// PURPOSE
//   The site renders all of its editable copy from the static `data/*.js`
//   modules. The admin panel at /admin writes overrides per section to
//   `/api/v1/content/:section`; readers get the override FIRST and fall
//   back to the static module when none exists.
//
// CACHE
//   All sections are loaded once (`loadContent`) into an in-memory cache so
//   reads stay synchronous. Writes update the cache immediately and are
//   then saved to the backend in order. If a save fails, the admin is
//   alerted and the cache is reloaded from the server.
//
// BROADCAST
//   We dispatch a `sms:content-changed` CustomEvent on `window` after every
//   change so every mounted consumer re-renders.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import api from "../api";

const EVENT_NAME = "sms:content-changed";

let cache = {};
let status = { loaded: false, error: null };
let loadPromise = null;
let saveQueue = Promise.resolve();

function emit() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

/** Fetch every section from the backend. Pass `force` to refetch. */
export function loadContent(force = false) {
  if (loadPromise && !force) return loadPromise;
  loadPromise = api
    .get("/content")
    .then((res) => {
      cache = res.data?.data?.sections || {};
      status = { loaded: true, error: null };
    })
    .catch((err) => {
      status = { loaded: false, error: err.response?.data?.message || "Failed to load site content." };
      loadPromise = null;
    })
    .finally(emit);
  return loadPromise;
}

function persist(request) {
  const operation = saveQueue
    .catch(() => {})
    .then(request)
  saveQueue = operation.catch(async (error) => {
    await loadContent(true);
    throw error;
  });
  return saveQueue;
}

function saveSection(sectionName) {
  const value = cache[sectionName];
  return persist(() => api.patch(`/content/${encodeURIComponent(sectionName)}`, { value }));
}

/**
 * Returns the merged content for a section. Order of precedence:
 *   1. saved override (if present)
 *   2. the static default passed in by the caller
 */
export function getSection(sectionName, fallback) {
  const override = cache[sectionName];
  if (override == null) return fallback;
  if (typeof fallback !== "object" || fallback == null) {
    return override !== undefined ? override : fallback;
  }
  if (Array.isArray(fallback)) return override;          // arrays replaced wholesale
  if (typeof fallback === "object") return { ...fallback, ...override }; // shallow-merge objects
  return fallback;
}

/** Get one item from a CMS-managed array by id. */
export function getById(sectionName, id) {
  const arr = cache[sectionName];
  if (!Array.isArray(arr)) return null;
  return arr.find((x) => String(x.id) === String(id)) || null;
}

/** Snapshot of every saved section (used for export). */
export function getAllContent() {
  return JSON.parse(JSON.stringify(cache));
}

/** Replace an entire section. Triggers the change event. */
export function setSection(sectionName, value) {
  cache = { ...cache, [sectionName]: value };
  emit();
  return saveSection(sectionName);
}

/** Append to an array section. Returns the new id. */
export async function addItem(sectionName, item) {
  const list = Array.isArray(cache[sectionName]) ? cache[sectionName] : [];
  const id = item.id ?? `${sectionName}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  cache = { ...cache, [sectionName]: [{ ...item, id }, ...list] };
  emit();
  await saveSection(sectionName);
  return id;
}

/** Update a single item by id in an array section. */
export async function updateItem(sectionName, id, patch) {
  const list = Array.isArray(cache[sectionName]) ? cache[sectionName] : [];
  let touched = false;
  const next = list.map((it) => {
    if (String(it.id) === String(id)) { touched = true; return { ...it, ...patch, id: it.id }; }
    return it;
  });
  if (!touched) return false;
  cache = { ...cache, [sectionName]: next };
  emit();
  await saveSection(sectionName);
  return true;
}

/** Remove an item by id from an array section. */
export function removeItem(sectionName, id) {
  const list = Array.isArray(cache[sectionName]) ? cache[sectionName] : [];
  cache = { ...cache, [sectionName]: list.filter((it) => String(it.id) !== String(id)) };
  emit();
  return saveSection(sectionName);
}

/** Replace ALL saved sections with `sections` (used for import). */
export function replaceAllContent(sections) {
  cache = { ...sections };
  emit();
  return persist(async () => {
    await api.delete("/content");
    for (const [name, value] of Object.entries(sections)) {
      await api.patch(`/content/${encodeURIComponent(name)}`, { value });
    }
  });
}

/** Wipe ALL admin overrides and restore the static defaults everywhere. */
export function resetAllOverrides() {
  cache = {};
  emit();
  return persist(() => api.delete("/content"));
}

/** Returns true if any admin override exists. */
export function hasOverrides() {
  return Object.keys(cache).length > 0;
}

/** Subscribe to change events. Returns an unsubscribe function. */
export function subscribe(handler) {
  if (typeof window === "undefined") return () => {};
  const wrap = (e) => handler(e);
  window.addEventListener(EVENT_NAME, wrap);
  return () => window.removeEventListener(EVENT_NAME, wrap);
}

/** React hook: `{ loaded, error, retry }` for the initial content load. */
export function useContentStatus() {
  const [value, setValue] = useState(status);
  useEffect(() => {
    const unsub = subscribe(() => setValue(status));
    loadContent();
    setValue(status);
    return unsub;
  }, []);
  return { ...value, retry: () => loadContent(true) };
}

/**
 * React hook: returns the merged content for a section AND re-renders
 * the consumer whenever the admin writes a new override.
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
