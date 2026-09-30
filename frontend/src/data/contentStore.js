// contentStore.js
// ─────────────────────────────────────────────────────────────────────────────
// Lightweight client-side content store with localStorage persistence.
//
// PURPOSE
//   The site renders all of its editable copy from the static `data/*.js`
//   modules. Without a CMS backend, we use a localStorage-backed override
//   layer that the admin panel at /admin writes to and every public page
//   reads from FIRST. When no override exists, the page falls back to the
//   static module so the site works exactly as before for visitors who
//   never open /admin.
//
// STORAGE KEY
//   We use a single namespaced key so the admin can clear all overrides
//   with one click without trampling anything else in localStorage.
//
// BROADCAST
//   We dispatch a `sms:content-changed` CustomEvent on `window` after every
//   write so multiple open tabs stay in sync without a full reload.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "sms.content.override.v1";
const EVENT_NAME  = "sms:content-changed";

function readRaw() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) { return null; }
}

function writeRaw(next) {
  if (typeof window === "undefined") return;
  try {
    if (next == null) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (_) { /* ignore */ }
}

/**
 * Returns the merged content for a section. Order of precedence:
 *   1. localStorage override (if present)
 *   2. the static default passed in by the caller
 */
export function getSection(sectionName, fallback) {
  const raw = readRaw();
  const override = raw && raw[sectionName];
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
  const raw = readRaw();
  const arr = raw && raw[sectionName];
  if (!Array.isArray(arr)) return null;
  return arr.find((x) => String(x.id) === String(id)) || null;
}

/** Replace an entire section. Triggers the change event. */
export function setSection(sectionName, value) {
  const raw = readRaw() || {};
  raw[sectionName] = value;
  writeRaw(raw);
}

/** Append to an array section. Returns the new id. */
export function addItem(sectionName, item) {
  const raw = readRaw() || {};
  const list = Array.isArray(raw[sectionName]) ? raw[sectionName] : [];
  const id = item.id ?? `${sectionName}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  raw[sectionName] = [{ ...item, id }, ...list];
  writeRaw(raw);
  return id;
}

/** Update a single item by id in an array section. */
export function updateItem(sectionName, id, patch) {
  const raw = readRaw() || {};
  const list = Array.isArray(raw[sectionName]) ? raw[sectionName] : [];
  let touched = false;
  const next = list.map((it) => {
    if (String(it.id) === String(id)) { touched = true; return { ...it, ...patch, id: it.id }; }
    return it;
  });
  if (!touched) return false;
  raw[sectionName] = next;
  writeRaw(raw);
  return true;
}

/** Remove an item by id from an array section. */
export function removeItem(sectionName, id) {
  const raw = readRaw() || {};
  const list = Array.isArray(raw[sectionName]) ? raw[sectionName] : [];
  raw[sectionName] = list.filter((it) => String(it.id) !== String(id));
  writeRaw(raw);
}

/** Wipe ALL admin overrides and restore the static defaults everywhere. */
export function resetAllOverrides() { writeRaw(null); }

/** Returns true if any admin override exists. */
export function hasOverrides() {
  const raw = readRaw();
  return raw != null && Object.keys(raw).length > 0;
}

/** Subscribe to change events. Returns an unsubscribe function. */
export function subscribe(handler) {
  if (typeof window === "undefined") return () => {};
  const wrap = (e) => handler(e);
  window.addEventListener(EVENT_NAME, wrap);
  const wrapStorage = (e) => { if (e.key === STORAGE_KEY) handler(e); };
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
    setValue(compute());
    const unsub = subscribe(() => setValue(compute()));
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionName, JSON.stringify(fallback)]);
  return value;
}
