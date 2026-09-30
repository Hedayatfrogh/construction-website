// admin/pages/Equipment.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Edit the equipment categories + items shown on /equipment and the
// homepage showcase. Each category is a title + an items[] list.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import {
  PageHeader, Card, PrimaryButton, SecondaryButton, Field, TextInput, TagInput,
  SaveBar, EmptyState, Modal, IconButton, Trash2,
} from "../adminUI";
import { equipmentCategories as defaults } from "../../data/operations";
import { setSection, useContentSection } from "../../data/contentStore";
import { Wrench, Edit3, Save } from "lucide-react";

function CategoryEditor({ initial, onClose }) {
  const [draft, setDraft] = useState({ ...initial });
  const [saved, setSaved] = useState(false);
  useEffect(() => { setDraft({ ...initial }); }, [initial.id || initial.title]);

  const save = () => {
    const all = useCurrent();
    const idx = all.findIndex((c) => (c.title || c.icon) === (initial.title || initial.icon));
    if (idx >= 0) all[idx] = draft;
    else all.push(draft);
    setSection("equipmentCategories", all);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 700);
  };
  const dirty = JSON.stringify(draft) !== JSON.stringify(initial);

  return (
    <Modal open onClose={onClose} title={`Edit: ${initial.title}`} size="lg"
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
          <TextInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        </Field>
        <Field label="Lucide icon name" hint="e.g. Truck, Wrench, Drill (see lucide.dev for the full list)">
          <TextInput value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} />
        </Field>
        <Field label="Equipment items" hint="Press Enter after each item">
          <TagInput value={draft.items || []} onChange={(arr) => setDraft({ ...draft, items: arr })} />
        </Field>
      </div>
    </Modal>
  );
}

// Hook helper: returns the current categories list (override > default).
function useCurrent() {
  const override = useContentSection("equipmentCategories", null);
  return (override && Array.isArray(override) && override.length > 0) ? [...override] : defaults.map((d) => ({ ...d }));
}

export default function Equipment() {
  const [editing, setEditing] = useState(null);
  const override = useContentSection("equipmentCategories", null);
  const list = (override && Array.isArray(override) && override.length > 0) ? override : defaults;

  return (
    <>
      <PageHeader
        title="Equipment"
        subtitle="Edit the equipment categories shown on /equipment and the homepage showcase."
      />
      {list.length === 0 ? (
        <EmptyState icon={Wrench} title="No equipment" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c, i) => (
            <Card key={(c.title || c.icon) + i} action={
              <IconButton title="Edit" onClick={() => setEditing(c)}><Edit3 className="h-4 w-4" /></IconButton>
            }>
              <div className="flex items-start gap-3 mb-3">
                <div className="h-9 w-9 rounded-md bg-navy-700 text-smsgold-400 grid place-items-center font-display font-bold shrink-0">
                  {c.icon?.charAt(0) || "·"}
                </div>
                <div>
                  <div className="font-display font-bold text-charcoal-900">{c.title}</div>
                  <div className="text-[11px] text-charcoal-500">{c.items?.length || 0} items · icon: {c.icon}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {(c.items || []).slice(0, 6).map((it) => (
                  <span key={it} className="text-[11px] px-2 py-0.5 rounded-full bg-charcoal-100 text-charcoal-700">{it}</span>
                ))}
                {(c.items?.length || 0) > 6 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-smsorange-50 text-smsorange-700">+{c.items.length - 6} more</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
      {editing && <CategoryEditor initial={editing} onClose={() => setEditing(null)} />}
    </>
  );
}
