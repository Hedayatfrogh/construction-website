// admin/pages/Services.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Edit the seven core services shown on the public /services page.
// Each service is a string title + summary + description + an items[] list.
// Admins can rename them, change their summary text, or rewrite the
// bullets — changes persist to localStorage and show up on the site.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import {
  PageHeader, Card, PrimaryButton, SecondaryButton, Field, TextInput, TextArea,
  TagInput, SaveBar, EmptyState,
} from "../adminUI";
import { services as defaults } from "../../data/content";
import { setSection, useContentSection, subscribe } from "../../data/contentStore";
import { Briefcase, Save } from "lucide-react";

function ServiceEditor({ slug, fallback, onClose }) {
  const override = useContentSection("services", null);
  // Get the current value: prefer override, fall back to default
  const all = (override && Array.isArray(override) && override.length > 0)
    ? override
    : defaults;
  const item = all.find((s) => s.slug === slug) || fallback;
  const [draft, setDraft] = useState({ ...item });
  const [saved, setSaved] = useState(false);

  useEffect(() => { setDraft({ ...item }); }, [item.id]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(item);

  const save = () => {
    // Merge this draft into the existing services array.
    const base = (override && Array.isArray(override) && override.length > 0)
      ? [...override]
      : defaults.map((d) => ({ ...d }));
    const idx = base.findIndex((s) => s.slug === slug);
    if (idx >= 0) base[idx] = { ...draft, slug };
    else base.push({ ...draft, slug });
    setSection("services", base);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Card
      title={`Edit: ${item.title || slug}`}
      action={
        <div className="flex gap-2">
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
          <PrimaryButton onClick={save} disabled={!dirty}>
            <Save className="h-4 w-4" /> {saved ? "Saved" : "Save"}
          </PrimaryButton>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title (English)">
            <TextInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </Field>
          <Field label="URL slug" hint="Used in /services/[slug] routes">
            <TextInput value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} disabled />
          </Field>
        </div>
        <Field label="Summary" hint="Short tagline shown on the service card">
          <TextArea rows={2} value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} />
        </Field>
        <Field label="Description" hint="Long description shown on the detail page">
          <TextArea rows={4} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        </Field>
        <Field label="Scope items (bullet list)" hint="Press Enter after each item">
          <TagInput value={draft.items || []} onChange={(arr) => setDraft({ ...draft, items: arr })} />
        </Field>
      </div>
    </Card>
  );
}

export default function Services() {
  const [active, setActive] = useState(null);
  const override = useContentSection("services", null);
  const list = (override && Array.isArray(override) && override.length > 0)
    ? override
    : defaults;

  return (
    <>
      <PageHeader
        title="Services"
        subtitle="Edit the seven core service areas shown on the public /services page."
      />
      {list.length === 0 ? (
        <EmptyState icon={Briefcase} title="No services" hint="The static data is empty." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((s) => (
            <Card key={s.slug || s.title} className="hover:shadow-sms-soft transition cursor-pointer"
              action={<button onClick={() => setActive(s.slug)} className="text-xs font-semibold text-smsorange-600 hover:underline">Edit →</button>}>
              <div onClick={() => setActive(s.slug)} className="-m-5 p-5">
                <div className="font-display font-bold text-charcoal-900">{s.title}</div>
                <p className="mt-1 text-xs text-charcoal-500 line-clamp-2">{s.summary}</p>
                <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-charcoal-400">/{s.slug}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {active && (
        <div className="mt-6">
          <ServiceEditor slug={active} fallback={list.find((s) => s.slug === active) || {}} onClose={() => setActive(null)} />
        </div>
      )}
    </>
  );
}
