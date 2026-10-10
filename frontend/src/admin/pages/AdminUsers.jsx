import { useCallback, useEffect, useState } from "react";
import { UserPlus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { PageHeader, Field, TextInput } from "../adminUI";

const emptyDraft = () => ({
  id: null,
  name: "",
  email: "",
  password: "",
  is_active: true,
});

export default function AdminUsers() {
  const { api, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [draft, setDraft] = useState(emptyDraft);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data.data.users);
      setError("");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not load administrator accounts.",
      );
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    const payload = {
      name: draft.name,
      email: draft.email,
      is_active: draft.is_active,
    };
    if (draft.password) payload.password = draft.password;
    try {
      if (draft.id) await api.put(`/admin/users/${draft.id}`, payload);
      else await api.post("/admin/users", payload);
      setDraft(emptyDraft());
      setNotice(draft.id ? "Administrator updated." : "Administrator created.");
      await loadUsers();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not save this administrator.",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleUser = async (account) => {
    setError("");
    try {
      await api.put(`/admin/users/${account.id}`, {
        is_active: !account.is_active,
      });
      await loadUsers();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not change account status.",
      );
    }
  };

  const deleteUser = async (account) => {
    if (
      !window.confirm(
        `Delete administrator ${account.email}? This cannot be undone.`,
      )
    )
      return;
    setError("");
    try {
      await api.delete(`/admin/users/${account.id}`);
      await loadUsers();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not delete this administrator.",
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Admin Users"
        subtitle="Manage administrator access to the SMS website."
      />
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      {notice && (
        <p
          role="status"
          className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800"
        >
          {notice}
        </p>
      )}

      <form
        onSubmit={save}
        className="mb-8 rounded-lg border border-charcoal-100 bg-white p-5 shadow-sms-soft"
      >
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-charcoal-900">
          {draft.id ? (
            <Pencil className="h-4 w-4" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )}
          {draft.id ? "Edit administrator" : "Create administrator"}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name">
            <TextInput
              required
              value={draft.name}
              onChange={(event) =>
                setDraft({ ...draft, name: event.target.value })
              }
            />
          </Field>
          <Field label="Email address">
            <TextInput
              required
              type="email"
              autoComplete="email"
              value={draft.email}
              onChange={(event) =>
                setDraft({ ...draft, email: event.target.value })
              }
            />
          </Field>
          <Field
            label={draft.id ? "New password (optional)" : "Password"}
            hint="At least 12 characters; it is never displayed after saving."
          >
            <TextInput
              required={!draft.id}
              type="password"
              autoComplete="new-password"
              minLength={12}
              value={draft.password}
              onChange={(event) =>
                setDraft({ ...draft, password: event.target.value })
              }
            />
          </Field>
          {draft.id && (
            <label className="flex items-center gap-2 self-end pb-2 text-sm text-charcoal-700">
              <input
                type="checkbox"
                checked={draft.is_active}
                onChange={(event) =>
                  setDraft({ ...draft, is_active: event.target.checked })
                }
              />{" "}
              Account enabled
            </label>
          )}
        </div>
        <div className="mt-5 flex gap-2">
          <button
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-md bg-smsorange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-smsorange-600 disabled:opacity-50"
          >
            <ShieldCheck className="h-4 w-4" />
            {saving ? "Saving…" : draft.id ? "Save changes" : "Create admin"}
          </button>
          {draft.id && (
            <button
              type="button"
              onClick={() => setDraft(emptyDraft())}
              className="rounded-md border border-charcoal-200 px-4 py-2 text-sm font-semibold text-charcoal-700"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-hidden rounded-lg border border-charcoal-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-charcoal-50 text-xs uppercase text-charcoal-500">
              <tr>
                <th className="px-4 py-3">Administrator</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {users.map((account) => (
                <tr key={account.id}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-charcoal-900">
                      {account.name}
                      {Number(account.is_super_admin) === 1 && (
                        <span className="ml-2 text-[10px] font-semibold uppercase text-smsorange-700">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-charcoal-500">
                      {account.email}
                      {String(account.id) === String(currentUser?.id)
                        ? " · You"
                        : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        account.is_active
                          ? "text-green-700"
                          : "text-charcoal-500"
                      }
                    >
                      {account.is_active ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex flex-wrap justify-end gap-2">
                      <button
                        onClick={() =>
                          setDraft({
                            ...account,
                            is_active: Boolean(account.is_active),
                            password: "",
                          })
                        }
                        className="rounded border border-charcoal-200 px-2.5 py-1 text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleUser(account)}
                        disabled={Number(account.is_super_admin) === 1}
                        className="rounded border border-charcoal-200 px-2.5 py-1 text-xs font-semibold disabled:opacity-40"
                      >
                        {account.is_active ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => deleteUser(account)}
                        disabled={
                          String(account.id) === String(currentUser?.id) ||
                          Number(account.is_super_admin) === 1
                        }
                        aria-label={`Delete ${account.email}`}
                        className="rounded border border-red-200 px-2 py-1 text-red-700 disabled:opacity-40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && users.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-8 text-center text-charcoal-500"
                  >
                    No administrator accounts found.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-8 text-center text-charcoal-500"
                  >
                    Loading administrators…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
