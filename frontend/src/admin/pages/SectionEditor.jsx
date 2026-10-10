import { useEffect, useState } from "react";
import { PageHeader, Card, Field, TextInput, TextArea } from "../adminUI";
import { setSection, useContentSection } from "../../data/contentStore";

export default function SectionEditor({
  title,
  subtitle,
  section,
  defaults,
  fields,
}) {
  const content = useContentSection(section, defaults);
  const [form, setForm] = useState(content || defaults);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => setForm(content || defaults), [content, defaults]);

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await setSection(section, form);
      setMessage("Changes saved to the website database.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not save these changes.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <form onSubmit={save} className="space-y-5">
        <Card title={title}>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <Field
                key={field.key}
                label={field.label}
                className={field.wide ? "md:col-span-2" : ""}
              >
                {field.multiline ? (
                  <TextArea
                    rows={field.rows || 4}
                    value={form[field.key] || ""}
                    onChange={(event) =>
                      setForm({ ...form, [field.key]: event.target.value })
                    }
                  />
                ) : (
                  <TextInput
                    type={field.type || "text"}
                    value={form[field.key] || ""}
                    onChange={(event) =>
                      setForm({ ...form, [field.key]: event.target.value })
                    }
                  />
                )}
              </Field>
            ))}
          </div>
        </Card>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-smsorange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-smsorange-600 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {message && (
            <p role="status" className="text-sm text-charcoal-600">
              {message}
            </p>
          )}
        </div>
      </form>
    </>
  );
}
