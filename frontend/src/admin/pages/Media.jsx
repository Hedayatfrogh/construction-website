// admin/pages/Media.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Lightweight media library. Without a real upload backend we keep
// metadata in localStorage: { id, name, url, type, uploadedAt }. Admins
// can paste image URLs to populate it, and the URLs are available to
// paste into project / team / client forms.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import {
  PageHeader, Card, Toolbar, EmptyState, IconButton, Field, TextInput, Select,
  PrimaryButton, SecondaryButton, Modal, EmptyState as _ES,
} from "../adminUI";
import { Image as ImageIcon, Trash2, ExternalLink, Copy, Plus } from "lucide-react";
import { useContentSection, addItem, removeItem } from "../../data/contentStore";
import { format } from "date-fns";

const EMPTY_MEDIA = () => ({
  id: "",
  name: "",
  url: "",
  type: "image",        // image | doc | video
  uploadedAt: new Date().toISOString(),
});

export default function Media() {
  const list = useContentSection("media", []);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const filtered = list.filter((m) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [m.name, m.url, m.type].some((v) => String(v || "").toLowerCase().includes(q));
  });

  const save = (item) => {
    addItem("media", { ...item, id: item.id || undefined });
    setEditing(null);
  };

  return (
    <>
      <PageHeader
        title="Media Library"
        subtitle="Store URLs for images, documents, and videos. Paste them into Projects, Team, Clients, etc."
      />
      <Toolbar search={search} setSearch={setSearch} onAdd={() => setEditing(EMPTY_MEDIA())} addLabel="Add media" />

      {filtered.length === 0 ? (
        <EmptyState icon={ImageIcon}
          title={list.length === 0 ? "Your media library is empty" : "No matches"}
          hint={list.length === 0 ? "Paste URLs to images hosted elsewhere to build a reusable library." : "Try a different search."} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((m) => (
            <Card key={m.id} className="hover:shadow-sms-soft transition" action={
              <div className="flex gap-1">
                <IconButton title="Copy URL" onClick={() => { navigator.clipboard?.writeText(m.url); }}>
                  <Copy className="h-4 w-4" />
                </IconButton>
                <IconButton title="Open in new tab" onClick={() => window.open(m.url, "_blank", "noopener")}>
                  <ExternalLink className="h-4 w-4" />
                </IconButton>
                <IconButton title="Remove" danger onClick={() => { if (window.confirm("Remove this media item?")) removeItem("media", m.id); }}>
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </div>
            }>
              <div className="aspect-video rounded-md bg-charcoal-100 overflow-hidden mb-3 border border-charcoal-200">
                {m.type === "image" && m.url
                  ? <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full grid place-items-center text-charcoal-400">
                      <ImageIcon className="h-10 w-10" />
                    </div>}
              </div>
              <div className="text-sm font-semibold text-charcoal-900 truncate">{m.name || "Untitled"}</div>
              <div className="text-[11px] text-charcoal-500 truncate">{m.url}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-charcoal-400">{m.type} · {format(new Date(m.uploadedAt), "PP")}</div>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <Modal open onClose={() => setEditing(null)} title={editing.id ? "Edit media" : "Add media"} size="md"
          footer={
            <>
              <SecondaryButton onClick={() => setEditing(null)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={() => save(editing)}><Plus className="h-4 w-4" /> Add to library</PrimaryButton>
            </>
          }
        >
          <div className="space-y-4">
            <Field label="Display name"><TextInput value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="URL"><TextInput value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} placeholder="https://..." /></Field>
            <Field label="Type">
              <Select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}>
                <option value="image">Image</option>
                <option value="doc">Document</option>
                <option value="video">Video</option>
              </Select>
            </Field>
            {editing.type === "image" && editing.url && (
              <div className="rounded-md overflow-hidden border border-charcoal-200 bg-charcoal-100 aspect-video">
                <img src={editing.url} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
