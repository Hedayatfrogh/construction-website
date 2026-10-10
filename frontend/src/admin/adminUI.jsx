// adminUI.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Shared building blocks for /admin pages: cards, page headers, form
// fields, badges, empty states, modals. Keeps every admin section
// visually consistent without dragging the public site's chrome in.
// ─────────────────────────────────────────────────────────────────────────────

import { Plus, Save, X, Trash2, Edit3, Star, Eye, EyeOff, Search, Check, Upload } from "lucide-react";
import { useState } from "react";
import api from "../api";

// ── PageHeader ───────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal-900">{title}</h1>
        {subtitle && <p className="text-sm text-charcoal-500 mt-1 max-w-2xl">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────
export function Card({ title, action, children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-charcoal-100 shadow-sm ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal-100">
          {title && <h2 className="text-sm font-semibold text-charcoal-800">{title}</h2>}
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

// ── Field ───────────────────────────────────────────────────────────────
export function Field({ label, hint, error, children, required }) {
  return (
    <label className="block">
      {label && (
        <span className="block text-xs font-semibold text-charcoal-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      )}
      {children}
      {hint && !error && <span className="block text-[11px] text-charcoal-500 mt-1">{hint}</span>}
      {error && <span className="block text-[11px] text-red-600 mt-1">{error}</span>}
    </label>
  );
}

export const inputCls = (err) =>
  [
    "block w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm outline-none transition",
    "focus:border-smsorange-400 focus:ring-2 focus:ring-smsorange-200",
    err ? "border-red-300" : "border-charcoal-200",
  ].join(" ");

export function TextInput(props) {
  return <input {...props} className={`${inputCls(props.error)} ${props.className || ""}`} />;
}

// URL input with an "Upload" button that stores the file via /admin/media/upload.
export function ImageInput({ value, onChange, placeholder = "https://..." }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const upload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.post("/admin/media/upload", formData, { timeout: 60000 });
      onChange(res.data?.data?.url || "");
    } catch (err) {
      setError(err.response?.data?.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
      <div className="flex gap-2">
        <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputCls()} />
        <label className={`${btnBase} shrink-0 px-3 py-2 text-sm border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-50 cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          <Upload className="h-4 w-4" />
          {uploading ? "…" : "Upload"}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" className="hidden" onChange={upload} disabled={uploading} />
        </label>
      </div>
      {value && <img src={value} alt="" className="mt-2 h-16 w-24 rounded-md object-cover border border-charcoal-200" />}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function TextArea({ rows = 4, ...props }) {
  return <textarea rows={rows} {...props} className={`${inputCls(props.error)} ${props.className || ""}`} />;
}

export function Select({ children, ...props }) {
  return (
    <select {...props} className={`${inputCls(props.error)} bg-white ${props.className || ""}`}>
      {children}
    </select>
  );
}

export function Checkbox({ label, checked, onChange }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-charcoal-700 select-none">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-charcoal-300 text-smsorange-500 focus:ring-smsorange-400"
      />
      <span>{label}</span>
    </label>
  );
}

// ── Buttons ────────────────────────────────────────────────────────────
const btnBase = "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";
export function PrimaryButton({ children, className = "", ...props }) {
  return <button {...props} className={`${btnBase} bg-smsorange-500 hover:bg-smsorange-600 text-white px-4 py-2 text-sm ${className}`}>{children}</button>;
}
export function SecondaryButton({ children, className = "", ...props }) {
  return <button {...props} className={`${btnBase} bg-white border border-charcoal-200 hover:border-smsorange-300 hover:text-smsorange-600 text-charcoal-800 px-4 py-2 text-sm ${className}`}>{children}</button>;
}
export function DangerButton({ children, className = "", ...props }) {
  return <button {...props} className={`${btnBase} bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 text-xs ${className}`}>{children}</button>;
}
export function IconButton({ title, children, onClick, className = "", danger }) {
  return (
    <button type="button" title={title} aria-label={title} onClick={onClick}
      className={[
        "inline-flex items-center justify-center h-8 w-8 rounded-md border transition",
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-charcoal-200 text-charcoal-600 hover:border-smsorange-300 hover:text-smsorange-600",
        className,
      ].join(" ")}>
      {children}
    </button>
  );
}

// ── Badge ───────────────────────────────────────────────────────────────
export function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-charcoal-100 text-charcoal-700",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger:  "bg-red-100 text-red-700",
    info:    "bg-navy-100 text-navy-800",
    brand:   "bg-smsorange-50 text-smsorange-700 border border-smsorange-200",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${tones[tone] || tones.neutral}`}>{children}</span>;
}

// ── EmptyState ──────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, hint, action }) {
  return (
    <div className="text-center py-12 px-4 border-2 border-dashed border-charcoal-200 rounded-xl bg-white">
      {Icon && <Icon className="h-10 w-10 text-charcoal-300 mx-auto" />}
      <h3 className="mt-3 font-semibold text-charcoal-800">{title}</h3>
      {hint && <p className="mt-1 text-sm text-charcoal-500 max-w-md mx-auto">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ── Toolbar (search + add) ──────────────────────────────────────────────
export function Toolbar({ search, setSearch, placeholder = "Search…", onAdd, addLabel = "Add new" }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-3 py-2 rounded-md border border-charcoal-200 bg-white text-sm shadow-sm focus:border-smsorange-400 focus:ring-2 focus:ring-smsorange-200 outline-none"
        />
      </div>
      {onAdd && (
        <PrimaryButton onClick={onAdd}>
          <Plus className="h-4 w-4" /> {addLabel}
        </PrimaryButton>
      )}
    </div>
  );
}

// ── Modal ───────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, footer, size = "md" }) {
  if (!open) return null;
  const sizes = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-hidden flex flex-col`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal-100">
          <h2 className="font-semibold text-charcoal-900">{title}</h2>
          <IconButton title="Close" onClick={onClose}><X className="h-4 w-4" /></IconButton>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && <div className="px-5 py-3 border-t border-charcoal-100 bg-charcoal-50/40 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

// ── SaveBar (sticky bottom save) ────────────────────────────────────────
export function SaveBar({ onSave, onCancel, saving, dirty, saveLabel = "Save changes", cancelLabel = "Cancel" }) {
  return (
    <div className="sticky bottom-0 -mx-4 md:-mx-8 px-4 md:px-8 py-3 bg-white border-t border-charcoal-100 mt-6 flex items-center justify-end gap-2 z-10">
      <SecondaryButton type="button" onClick={onCancel}>{cancelLabel}</SecondaryButton>
      <PrimaryButton type="button" onClick={onSave} disabled={!dirty || saving}>
        <Save className="h-4 w-4" /> {saving ? "Saving…" : saveLabel}
      </PrimaryButton>
    </div>
  );
}

// ── TagInput (chips) ────────────────────────────────────────────────────
export function TagInput({ value, onChange, placeholder = "Type and press Enter" }) {
  const [draft, setDraft] = useState("");
  const list = Array.isArray(value) ? value : [];
  const commit = (raw) => {
    const v = (raw || "").trim();
    if (!v) return;
    if (list.includes(v)) { setDraft(""); return; }
    onChange([...list, v]);
    setDraft("");
  };
  const remove = (v) => onChange(list.filter((x) => x !== v));
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-1">
        {list.map((v) => (
          <span key={v} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-smsorange-50 text-smsorange-700 border border-smsorange-200 text-xs">
            {v}
            <button type="button" onClick={() => remove(v)} className="hover:text-smsorange-900"><X className="h-3 w-3" /></button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") { e.preventDefault(); commit(draft); }
          else if (e.key === "Backspace" && !draft && list.length) { remove(list[list.length - 1]); }
        }}
        onBlur={() => commit(draft)}
        placeholder={placeholder}
        className="w-full rounded-md border border-charcoal-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-smsorange-400 focus:ring-2 focus:ring-smsorange-200 outline-none"
      />
    </div>
  );
}

// ── Small toggles used in list rows ─────────────────────────────────────
export function StarToggle({ active, onToggle, title }) {
  return (
    <IconButton title={title || (active ? "Unfeature" : "Feature")} onClick={onToggle}>
      <Star className={`h-4 w-4 ${active ? "fill-smsgold-400 text-smsgold-500" : ""}`} />
    </IconButton>
  );
}
export function PublishToggle({ published, onToggle, title }) {
  return (
    <IconButton title={title || (published ? "Unpublish" : "Publish")} onClick={onToggle}>
      {published
        ? <Eye className="h-4 w-4 text-green-600" />
        : <EyeOff className="h-4 w-4 text-charcoal-400" />}
    </IconButton>
  );
}
export function CheckToggle({ on, onToggle, title }) {
  return (
    <IconButton title={title || (on ? "Disable" : "Enable")} onClick={onToggle}>
      <Check className={`h-4 w-4 ${on ? "text-green-600" : "text-charcoal-400"}`} />
    </IconButton>
  );
}

export { Plus, Save, X, Trash2, Edit3, Star, Eye, EyeOff, Search, Check };
