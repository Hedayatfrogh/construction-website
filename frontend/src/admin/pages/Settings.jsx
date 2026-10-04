// admin/pages/Settings.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Global site settings: contact info, social links, CMS storage tools.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import {
  PageHeader,
  Card,
  Field,
  TextInput,
  TextArea,
  SaveBar,
  Badge,
} from "../adminUI";
import {
  getAllOverrides,
  setSection,
  useContentSection,
  hasOverrides,
  resetAllOverrides,
} from "../../data/contentStore";
import { DEFAULT_SETTINGS } from "../../data/adminSeed";
import { Database, Trash2, Download, Upload } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { setAccessToken } from "../../api";

export default function Settings() {
  const { api } = useAuth();
  const override = useContentSection("settings", null);
  const [form, setForm] = useState(override || DEFAULT_SETTINGS());
  const [saved, setSaved] = useState(false);
  const [overridesLive, setOverridesLive] = useState(hasOverrides());
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    const handler = () => setOverridesLive(hasOverrides());
    window.addEventListener("sms:content-changed", handler);
    return () => window.removeEventListener("sms:content-changed", handler);
  }, []);

  useEffect(() => {
    setForm(override || DEFAULT_SETTINGS());
  }, [override]);

  const dirty =
    JSON.stringify(form) !== JSON.stringify(override || DEFAULT_SETTINGS());

  const save = async () => {
    try {
      await setSection("settings", form);
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    } catch (error) {
      alert(
        error.response?.data?.message || "Could not save website settings.",
      );
    }
  };
  const cancel = () => setForm(override || DEFAULT_SETTINGS());

  const handleReset = async () => {
    if (
      window.confirm(
        "Wipe every admin override across the entire site and restore static defaults? This cannot be undone.",
      )
    ) {
      try {
        await resetAllOverrides();
        setOverridesLive(false);
      } catch (error) {
        alert(
          error.response?.data?.message || "Could not reset website content.",
        );
      }
    }
  };

  const handleExport = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            content: getAllOverrides(),
            exportedAt: new Date().toISOString(),
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sms-content-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (ev) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(String(e.target?.result || ""));
        const content = data.content || data;
        if (content && typeof content === "object" && !Array.isArray(content)) {
          for (const [section, value] of Object.entries(content))
            await setSection(section, value);
          alert("Content imported to the website database.");
        }
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const changePassword = async (event) => {
    event.preventDefault();
    setPasswordMessage("");
    if (passwordForm.newPassword.length < 12) {
      setPasswordMessage("New password must be at least 12 characters.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }
    try {
      const { currentPassword, newPassword } = passwordForm;
      const response = await api.post("/users/change-password", {
        currentPassword,
        newPassword,
      });
      if (response.data.token) setAccessToken(response.data.token);
      setPasswordMessage(
        response.data.message || "Password changed successfully.",
      );
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setPasswordMessage(
        error.response?.data?.message || "Could not change the password.",
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Site Settings"
        subtitle="Global contact details, social links, and CMS maintenance tools."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Site identity">
          <div className="space-y-4">
            <Field label="Contact email">
              <TextInput
                type="email"
                value={form.contactEmail}
                onChange={(e) =>
                  setForm({ ...form, contactEmail: e.target.value })
                }
                placeholder="hello@example.com"
              />
            </Field>
            <Field label="Contact phone">
              <TextInput
                value={form.contactPhone}
                onChange={(e) =>
                  setForm({ ...form, contactPhone: e.target.value })
                }
                placeholder="+93 ..."
              />
            </Field>
            <Field
              label="Address lines (one per line)"
              hint="Footer address block"
            >
              <TextArea
                rows={4}
                value={(form.addressLines || []).join("\n")}
                onChange={(e) =>
                  setForm({ ...form, addressLines: e.target.value.split("\n") })
                }
              />
            </Field>
          </div>
        </Card>

        <Card title="Social links">
          <div className="space-y-4">
            <Field label="Facebook URL">
              <TextInput
                value={form.social?.facebook || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    social: {
                      ...(form.social || {}),
                      facebook: e.target.value,
                    },
                  })
                }
                placeholder="https://facebook.com/..."
              />
            </Field>
            <Field label="Twitter URL">
              <TextInput
                value={form.social?.twitter || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    social: { ...(form.social || {}), twitter: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="LinkedIn URL">
              <TextInput
                value={form.social?.linkedin || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    social: {
                      ...(form.social || {}),
                      linkedin: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Instagram URL">
              <TextInput
                value={form.social?.instagram || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    social: {
                      ...(form.social || {}),
                      instagram: e.target.value,
                    },
                  })
                }
              />
            </Field>
          </div>
        </Card>

        <Card title="Footer content">
          <div className="space-y-4">
            <Field label="Footer description">
              <TextArea
                rows={4}
                value={form.footerDescription || ""}
                onChange={(e) =>
                  setForm({ ...form, footerDescription: e.target.value })
                }
              />
            </Field>
            <Field label="Footer copyright text">
              <TextInput
                value={form.footerCopyright || ""}
                onChange={(e) =>
                  setForm({ ...form, footerCopyright: e.target.value })
                }
              />
            </Field>
          </div>
        </Card>

        <Card title="CMS storage" className="lg:col-span-2">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-charcoal-400" />
              <div className="flex-1">
                <div className="font-semibold text-charcoal-800">
                  Storage backend
                </div>
                <div className="text-xs text-charcoal-500">
                  Website content is stored in the connected MySQL database and
                  served to public pages.
                </div>
              </div>
              <Badge tone={overridesLive ? "brand" : "neutral"}>
                {overridesLive
                  ? "Overrides active"
                  : "All static (no overrides)"}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white border border-charcoal-200 hover:border-smsorange-300 hover:text-smsorange-600 text-charcoal-800 px-4 py-2 text-sm font-semibold transition"
              >
                <Download className="h-4 w-4" /> Export JSON
              </button>
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-charcoal-200 hover:border-smsorange-300 hover:text-smsorange-600 text-charcoal-800 text-sm font-semibold cursor-pointer transition">
                <Upload className="h-4 w-4" /> Import JSON
                <input
                  type="file"
                  accept="application/json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white border border-charcoal-200 hover:border-smsorange-300 hover:text-smsorange-600 text-charcoal-800 px-4 py-2 text-sm font-semibold transition"
              >
                <Trash2 className="h-4 w-4" /> Reset all overrides
              </button>
            </div>
            <p className="text-xs text-charcoal-500 pt-2">
              <strong>Tip:</strong> export a database content backup before
              importing or resetting site content.
            </p>
          </div>
        </Card>

        <Card title="Change password" className="lg:col-span-2">
          <form onSubmit={changePassword} className="grid gap-4 sm:grid-cols-2">
            <Field label="Current password">
              <TextInput
                type="password"
                autoComplete="current-password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
              />
            </Field>
            <div />
            <Field label="New password" hint="At least 12 characters">
              <TextInput
                type="password"
                autoComplete="new-password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
              />
            </Field>
            <Field label="Confirm new password">
              <TextInput
                type="password"
                autoComplete="new-password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Field>
            <div className="sm:col-span-2 flex items-center gap-4">
              <button
                type="submit"
                className="rounded-md bg-smsorange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-smsorange-600"
              >
                Change password
              </button>
              {passwordMessage && (
                <p role="status" className="text-sm text-charcoal-600">
                  {passwordMessage}
                </p>
              )}
            </div>
          </form>
        </Card>
      </div>

      <SaveBar onSave={save} onCancel={cancel} dirty={dirty} saving={saved} />
    </>
  );
}
