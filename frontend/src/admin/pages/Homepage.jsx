// admin/pages/Homepage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Edit the homepage hero (tagline, subtitle) and the verified-stats
// cards. The visual sections are powered by data/company.js — admins
// can override the strings here and changes show up site-wide.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { PageHeader, Card, PrimaryButton, SecondaryButton, Field, TextInput, TextArea, SaveBar } from "../adminUI";
import { company as defaults, heroIntro } from "../../data/company";
import { setSection, useContentSection } from "../../data/contentStore";
import { Save, Globe } from "lucide-react";

export default function Homepage() {
  const [companyOverride] = useState(null);
  const override = useContentSection("company", null);
  const current = override || defaults;

  // Local form state
  const [form, setForm] = useState({ ...current, heroIntro: current.heroIntro || heroIntro });
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm({ ...current, heroIntro: current.heroIntro || heroIntro }); }, [current.name, current.tagline]);

  const dirty = JSON.stringify(form) !== JSON.stringify({ ...current, heroIntro: current.heroIntro || heroIntro });

  const save = () => {
    setSection("company", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };
  const cancel = () => setForm({ ...current, heroIntro: current.heroIntro || heroIntro });

  return (
    <>
      <PageHeader
        title="Homepage"
        subtitle="Edit the homepage hero text, the verified company facts shown in the Stats strip, and the global 'About' intro paragraph."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Hero (top of homepage)">
          <div className="space-y-4">
            <Field label="Hero badge" hint="Small line above the title (e.g. 'SMS · Established 2026')">
              <TextInput value={`${form.shortName} · Established ${form.established}`} disabled />
            </Field>
            <Field label="Tagline (line 1, before the comma)">
              <TextInput value={form.tagline?.split(",")[0] || ""} onChange={(e) => setForm({ ...form, tagline: `${e.target.value},${form.tagline?.split(",")[1] || ""}` })} />
            </Field>
            <Field label="Tagline (line 2, after the comma)">
              <TextInput value={form.tagline?.split(",")[1]?.trim() || ""} onChange={(e) => setForm({ ...form, tagline: `${form.tagline?.split(",")[0] || ""}, ${e.target.value}` })} />
            </Field>
            <Field label="Hero intro paragraph" hint="Shown directly below the hero title">
              <TextArea rows={5} value={form.heroIntro} onChange={(e) => setForm({ ...form, heroIntro: e.target.value })} />
            </Field>
          </div>
        </Card>

        <Card title="Verified stats (the four cards on the homepage)">
          <div className="space-y-4">
            {["foundedLabel", "regLabel", "licenseLabel", "tinLabel"].map((key, i) => {
              const labels = ["Founded (label)", "Registration No. (label)", "License No. (label)", "TIN (label)"];
              return (
                <Field key={key} label={labels[i]}>
                  <TextInput value={form.stats?.[key] || ""} onChange={(e) => setForm({ ...form, stats: { ...(form.stats || {}), [key]: e.target.value } })} />
                </Field>
              );
            })}
            <p className="text-xs text-charcoal-500">The numeric values (year, registration number, license, TIN) below the labels are managed from the Company facts section on the About page, or by editing them here as raw strings.</p>
          </div>
        </Card>

        <Card title="Offices (used in footer + contact strip)">
          <div className="space-y-4">
            <Field label="Main office (Kabul)">
              <TextInput value={form.offices?.main || ""} onChange={(e) => setForm({ ...form, offices: { ...(form.offices || {}), main: e.target.value } })} />
            </Field>
            <Field label="Branch office (Nangarhar)">
              <TextInput value={form.offices?.branch || ""} onChange={(e) => setForm({ ...form, offices: { ...(form.offices || {}), branch: e.target.value } })} />
            </Field>
            <Field label="Phone">
              <TextInput value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="Email">
              <TextInput type="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
          </div>
        </Card>

        <Card title="About-page vision & mission">
          <div className="space-y-4">
            <Field label="Vision">
              <TextArea rows={4} value={form.vision} onChange={(e) => setForm({ ...form, vision: e.target.value })} />
            </Field>
            <Field label="Mission">
              <TextArea rows={4} value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} />
            </Field>
          </div>
        </Card>
      </div>

      <SaveBar onSave={save} onCancel={cancel} dirty={dirty} saving={saved} />
    </>
  );
}
