// admin/pages/Media.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Database-backed media library for uploaded images and external URLs.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import {
  PageHeader,
  Card,
  Toolbar,
  EmptyState,
  IconButton,
  Field,
  TextInput,
  Select,
  PrimaryButton,
  SecondaryButton,
  Modal,
  EmptyState as _ES,
} from "../adminUI";
import {
  Image as ImageIcon,
  Trash2,
  ExternalLink,
  Copy,
  Plus,
} from "lucide-react";
import {
  useContentSection,
  addItem,
  removeItem,
} from "../../data/contentStore";
import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext";

const EMPTY_MEDIA = () => ({
  id: "",
  name: "",
  url: "",
  type: "image", // image | doc | video
  uploadedAt: new Date().toISOString(),
});

export default function Media() {
  const { api } = useAuth();
  const list = useContentSection("media", []);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const filtered = list.filter((m) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [m.name, m.url, m.type].some((v) =>
      String(v || "")
        .toLowerCase()
        .includes(q),
    );
  });

  const save = async (item) => {
    try {
      await addItem("media", { ...item, id: item.id || undefined });
      setEditing(null);
      setError("");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not save this media item.",
      );
    }
  };

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await api.post("/admin/media/upload", formData);
      setEditing((current) => ({
        ...current,
        name: current?.name || file.name,
        url: response.data.data.url,
        type: "image",
      }));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Image upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <>
      <PageHeader
        title="Media Library"
        subtitle="Store URLs for images, documents, and videos. Paste them into Projects, Team, Clients, etc."
      />
      <Toolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => setEditing(EMPTY_MEDIA())}
        addLabel="Add media"
      />
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title={
            list.length === 0 ? "Your media library is empty" : "No matches"
          }
          hint={
            list.length === 0
              ? "Paste URLs to images hosted elsewhere to build a reusable library."
              : "Try a different search."
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((m) => (
            <Card
              key={m.id}
              className="hover:shadow-sms-soft transition"
              action={
                <div className="flex gap-1">
                  <IconButton
                    title="Copy URL"
                    onClick={() => {
                      navigator.clipboard?.writeText(m.url);
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    title="Open in new tab"
                    onClick={() => window.open(m.url, "_blank", "noopener")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    title="Remove"
                    danger
                    onClick={async () => {
                      if (window.confirm("Remove this media item?")) {
                        try {
                          await removeItem("media", m.id);
                        } catch (requestError) {
                          setError(
                            requestError.response?.data?.message ||
                              "Could not remove this media item.",
                          );
                        }
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              }
            >
              <div className="aspect-video rounded-md bg-charcoal-100 overflow-hidden mb-3 border border-charcoal-200">
                {m.type === "image" && m.url ? (
                  <img
                    src={m.url}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-charcoal-400">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>
              <div className="text-sm font-semibold text-charcoal-900 truncate">
                {m.name || "Untitled"}
              </div>
              <div className="text-[11px] text-charcoal-500 truncate">
                {m.url}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-charcoal-400">
                {m.type} · {format(new Date(m.uploadedAt), "PP")}
              </div>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <Modal
          open
          onClose={() => setEditing(null)}
          title={editing.id ? "Edit media" : "Add media"}
          size="md"
          footer={
            <>
              <SecondaryButton onClick={() => setEditing(null)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={() =>
                  save({ ...editing, uploadedAt: new Date().toISOString() })
                }
                disabled={uploading}
              >
                <Plus className="h-4 w-4" /> Add to library
              </PrimaryButton>
            </>
          }
        >
          <div className="space-y-4">
            <Field label="Display name">
              <TextInput
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />
            </Field>
            <Field label="URL">
              <TextInput
                value={editing.url}
                onChange={(e) =>
                  setEditing({ ...editing, url: e.target.value })
                }
                placeholder="https://..."
              />
            </Field>
            <Field label="Upload image">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                disabled={uploading}
                onChange={uploadImage}
                className="block w-full text-sm"
              />
              {uploading && (
                <span className="mt-1 block text-xs text-charcoal-500">
                  Uploading…
                </span>
              )}
            </Field>
            <Field label="Type">
              <Select
                value={editing.type}
                onChange={(e) =>
                  setEditing({ ...editing, type: e.target.value })
                }
              >
                <option value="image">Image</option>
                <option value="doc">Document</option>
                <option value="video">Video</option>
              </Select>
            </Field>
            {editing.type === "image" && editing.url && (
              <div className="rounded-md overflow-hidden border border-charcoal-200 bg-charcoal-100 aspect-video">
                <img
                  src={editing.url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
