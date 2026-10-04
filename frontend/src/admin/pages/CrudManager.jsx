// admin/pages/CrudManager.jsx
// ─────────────────────────────────────────────────────────────────────────────
// A reusable generic CRUD manager. Each section page (Projects, Team,
// News, Clients, Jobs) passes in sectionKey, columns, form renderer, etc.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import {
  PageHeader,
  Toolbar,
  EmptyState,
  IconButton,
  PrimaryButton,
  Modal,
  Edit3,
  Trash2,
} from "../adminUI";
import { FolderKanban } from "lucide-react";
import { setSection, useContentSection } from "../../data/contentStore";

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
function ensureSlug(item) {
  if (item.slug) return item;
  return { ...item, slug: slugify(item.title || item.name) };
}

export default function CrudManager({
  sectionKey,
  initialItem,
  renderForm,
  columns,
  searchFields = ["title", "name"],
  title,
  subtitle,
  fallbackItems = [],
  addLabel = "Add new",
  emptyIcon = FolderKanban,
  emptyTitle = "Nothing here yet",
  emptyHint = "Click ‘Add new’ to create your first record.",
}) {
  const normalizedFallback = fallbackItems.map((item, index) => ({
    ...item,
    id: item.id || `${sectionKey}-${item.slug || index}`,
  }));
  const list = useContentSection(sectionKey, normalizedFallback);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [actionError, setActionError] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((it) =>
      searchFields.some((f) =>
        String(it[f] || "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [list, search, searchFields]);

  const handleSave = async (item) => {
    const withMeta = ensureSlug({
      ...item,
      id: item.id || window.crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
      createdAt: item.createdAt || new Date().toISOString(),
    });
    const exists = list.some((entry) => String(entry.id) === String(item.id));
    const next = exists
      ? list.map((entry) =>
          String(entry.id) === String(item.id) ? withMeta : entry,
        )
      : [withMeta, ...list];
    await setSection(sectionKey, next);
    setEditing(null);
  };
  const handleDelete = async (id) => {
    try {
      await setSection(
        sectionKey,
        list.filter((item) => String(item.id) !== String(id)),
      );
      setConfirmDel(null);
    } catch (error) {
      setActionError(
        error.response?.data?.message || "Could not delete this item.",
      );
    }
  };

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <Toolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => setEditing("new")}
        addLabel={addLabel}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={emptyIcon}
          title={list.length === 0 ? emptyTitle : "No matches"}
          hint={list.length === 0 ? emptyHint : "Try a different search term."}
          action={
            list.length === 0 ? (
              <PrimaryButton onClick={() => setEditing("new")}>
                {addLabel}
              </PrimaryButton>
            ) : null
          }
        />
      ) : (
        <div className="bg-white border border-charcoal-100 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-charcoal-50 text-charcoal-500 text-[11px] uppercase tracking-[0.18em]">
                <tr>
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      className={`text-left px-4 py-3 font-semibold ${c.className || ""}`}
                    >
                      {c.label}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 font-semibold w-32">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {filtered.map((it) => (
                  <tr key={it.id} className="hover:bg-charcoal-50/40">
                    {columns.map((c) => (
                      <td
                        key={c.key}
                        className={`px-4 py-3 align-top ${c.cellClassName || ""}`}
                      >
                        {c.render ? (
                          c.render(it)
                        ) : (
                          <span className="text-charcoal-800">
                            {String(it[c.key] ?? "")}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 align-top text-right">
                      <div className="inline-flex gap-1 justify-end">
                        <IconButton title="Edit" onClick={() => setEditing(it)}>
                          <Edit3 className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          title="Delete"
                          danger
                          onClick={() => setConfirmDel(it)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editing && (
        <CrudFormModal
          initial={editing === "new" ? initialItem() : editing}
          title={editing === "new" ? `New ${title.replace(/s$/, "")}` : "Edit"}
          renderForm={renderForm}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}

      {confirmDel && (
        <Modal
          open
          onClose={() => setConfirmDel(null)}
          title="Delete this record?"
          size="sm"
          footer={
            <>
              <button
                onClick={() => setConfirmDel(null)}
                className="px-3 py-1.5 rounded-md border border-charcoal-200 text-charcoal-700 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDel.id)}
                className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-semibold"
              >
                Delete
              </button>
            </>
          }
        >
          {actionError && (
            <p className="mb-3 text-sm text-red-600">{actionError}</p>
          )}
          <p className="text-sm text-charcoal-700">
            This will permanently delete{" "}
            <strong>
              {confirmDel.title || confirmDel.name || "this record"}
            </strong>
            . This action cannot be undone.
          </p>
        </Modal>
      )}
    </>
  );
}

function CrudFormModal({ initial, title, renderForm, onCancel, onSave }) {
  const [item, setItem] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const submit = async () => {
    setSaving(true);
    setSaveError("");
    try {
      await onSave(item);
    } catch (error) {
      setSaveError(
        error.response?.data?.message || "Could not save this item.",
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <Modal
      open
      onClose={onCancel}
      title={title}
      size="lg"
      footer={
        <>
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded-md border border-charcoal-200 text-charcoal-700 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="px-3 py-1.5 rounded-md bg-smsorange-500 hover:bg-smsorange-600 disabled:opacity-50 text-white text-sm font-semibold inline-flex items-center gap-2"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </>
      }
    >
      {saveError && <p className="mb-4 text-sm text-red-600">{saveError}</p>}
      <div className="space-y-4">{renderForm(item, setItem)}</div>
    </Modal>
  );
}
