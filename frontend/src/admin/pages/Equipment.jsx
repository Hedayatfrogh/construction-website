// admin/pages/Equipment.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Edit the equipment categories + items shown on /equipment and the
// homepage showcase. Each category is a title + an items[] list.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import {
  PageHeader,
  Card,
  PrimaryButton,
  SecondaryButton,
  Field,
  TextInput,
  TagInput,
  EmptyState,
  Modal,
  IconButton,
  Trash2,
} from "../adminUI";
import { equipmentCategories as defaults } from "../../data/operations";
import {
  setSection,
  getSection,
  useContentSection,
} from "../../data/contentStore";
import { Wrench, Edit3, Save, Plus } from "lucide-react";

function CategoryEditor({ initial, onClose }) {
  const [draft, setDraft] = useState({ ...initial });
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setDraft({ ...initial });
  }, [initial]);

  const save = async () => {
    const all = currentCategories();
    const idx = all.findIndex(
      (c) => (c.title || c.icon) === (initial.title || initial.icon),
    );
    const savedDraft = {
      ...draft,
      slug:
        draft.slug ||
        draft.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
    };
    if (idx >= 0) all[idx] = savedDraft;
    else all.push(savedDraft);
    try {
      await setSection("equipmentCategories", all);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 700);
    } catch (error) {
      alert(error.response?.data?.message || "Could not save equipment.");
    }
  };
  const dirty = JSON.stringify(draft) !== JSON.stringify(initial);

  return (
    <Modal
      open
      onClose={onClose}
      title={`Edit: ${initial.title}`}
      size="lg"
      footer={
        <>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={save} disabled={!dirty}>
            <Save className="h-4 w-4" /> {saved ? "Saved" : "Save"}
          </PrimaryButton>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Category title">
          <TextInput
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
        </Field>
        <Field label="URL slug" hint="Used in the equipment detail page route">
          <TextInput
            value={draft.slug || ""}
            onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
            placeholder="earthmoving"
          />
        </Field>
        <Field
          label="Lucide icon name"
          hint="e.g. Truck, Wrench, Drill (see lucide.dev for the full list)"
        >
          <TextInput
            value={draft.icon}
            onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
          />
        </Field>
        <Field label="Equipment items" hint="Press Enter after each item">
          <TagInput
            value={draft.items || []}
            onChange={(arr) => setDraft({ ...draft, items: arr })}
          />
        </Field>
      </div>
    </Modal>
  );
}

// Returns a copy of the current categories list (override > default).
function currentCategories() {
  const override = getSection("equipmentCategories", null);
  return Array.isArray(override)
    ? [...override]
    : defaults.map((d) => ({ ...d }));
}

export default function Equipment() {
  const [editing, setEditing] = useState(null);
  const override = useContentSection("equipmentCategories", null);
  const list = Array.isArray(override) ? override : defaults;

  const deleteCategory = async (category) => {
    if (!window.confirm(`Delete ${category.title}? This cannot be undone.`))
      return;
    try {
      await setSection(
        "equipmentCategories",
        list.filter((item) => item !== category),
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Could not delete this equipment category.",
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Equipment"
        subtitle="Edit the equipment categories shown on /equipment and the homepage showcase."
      />
      <div className="mb-5 flex justify-end">
        <PrimaryButton
          onClick={() =>
            setEditing({
              title: "New equipment category",
              icon: "Wrench",
              items: [],
            })
          }
        >
          <Plus className="h-4 w-4" /> Add category
        </PrimaryButton>
      </div>
      {list.length === 0 ? (
        <EmptyState icon={Wrench} title="No equipment" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c, i) => (
            <Card
              key={(c.title || c.icon) + i}
              action={
                <div className="flex gap-1">
                  <IconButton title="Edit" onClick={() => setEditing(c)}>
                    <Edit3 className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    title="Delete"
                    danger
                    onClick={() => deleteCategory(c)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              }
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="h-9 w-9 rounded-md bg-navy-700 text-smsgold-400 grid place-items-center font-display font-bold shrink-0">
                  {c.icon?.charAt(0) || "·"}
                </div>
                <div>
                  <div className="font-display font-bold text-charcoal-900">
                    {c.title}
                  </div>
                  <div className="text-[11px] text-charcoal-500">
                    {c.items?.length || 0} items · icon: {c.icon}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {(c.items || []).slice(0, 6).map((it) => (
                  <span
                    key={it}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-charcoal-100 text-charcoal-700"
                  >
                    {it}
                  </span>
                ))}
                {(c.items?.length || 0) > 6 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-smsorange-50 text-smsorange-700">
                    +{c.items.length - 6} more
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
      {editing && (
        <CategoryEditor initial={editing} onClose={() => setEditing(null)} />
      )}
    </>
  );
}
