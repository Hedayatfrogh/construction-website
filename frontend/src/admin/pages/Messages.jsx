// admin/pages/Messages.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Contact-message inbox. Talks to the EXISTING /api/v1/messages endpoint.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import {
  Mail, MailOpen, Inbox, Trash2, AlertCircle, CheckCircle2,
} from "lucide-react";
import {
  PageHeader, EmptyState, Badge, Card, Toolbar,
  PrimaryButton, SecondaryButton, Modal,
} from "../adminUI";
import { useAuth } from "../../context/AuthContext";

export default function Messages() {
  const { api } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const reload = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/messages/azad_noori");
      const list = (res.data?.data || []).map((c) => ({
        ...c,
        id: c.id ?? c._id ?? String(Math.random()),
      }));
      setContacts(list);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { reload(); /* eslint-disable-next-line */ }, []);

  const open = async (c) => {
    setSelected(c);
    if (!c.isRead) {
      try {
        await api.patch(`/messages/${c.id}`, { isRead: true });
        setContacts((list) => list.map((x) => x.id === c.id ? { ...x, isRead: true } : x));
      } catch (_) { /* silent */ }
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/messages/${id}`);
      setContacts((list) => list.filter((x) => x.id !== id));
      setConfirmDelete(null);
      if (selected?.id === id) setSelected(null);
    } catch (e) {
      setConfirmDelete(null);
      setError(e.response?.data?.message || "Could not delete this message.");
    }
  };

  const toggleRead = async (c) => {
    const isRead = !c.isRead;
    try {
      await api.patch(`/messages/${c.id}`, { isRead });
      setContacts((list) => list.map((x) => (x.id === c.id ? { ...x, isRead } : x)));
      setSelected((s) => (s && s.id === c.id ? { ...s, isRead } : s));
    } catch (e) {
      window.alert(e.response?.data?.message || "Could not update this message.");
    }
  };

  const filtered = contacts.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [c.firstName, c.lastName, c.email, c.company].some(
      (v) => String(v || "").toLowerCase().includes(q)
    );
  });

  const unreadCount = contacts.filter((c) => !c.isRead).length;

  return (
    <>
      <PageHeader
        title="Contact Messages"
        subtitle="Inbox of every form submission from the public website. Click a row to read the full message and mark it as read."
      />

      <Toolbar search={search} setSearch={setSearch} placeholder="Search by name, email, company…" onAdd={reload} addLabel="Refresh" />

      {loading ? (
        <div className="text-center py-12 text-charcoal-500">Loading messages…</div>
      ) : error ? (
        <EmptyState icon={AlertCircle} title="Couldn't load messages" hint={error} action={
          <PrimaryButton onClick={reload}>Retry</PrimaryButton>
        } />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Inbox} title={contacts.length === 0 ? "No messages yet" : "No matches"}
          hint={contacts.length === 0 ? "When visitors submit the contact form, their messages appear here." : "Try a different search term."} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Card key={c.id} className={`hover:shadow-sms-soft transition cursor-pointer ${c.isRead ? "" : "border-l-4 !border-l-smsorange-500"}`}>
              <div onClick={() => open(c)} className="-m-5 p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-smsorange-50 text-smsorange-700 grid place-items-center font-bold">
                      {(c.firstName || "?").charAt(0)}{(c.lastName || "").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-charcoal-900 truncate">{c.firstName} {c.lastName}</div>
                      <div className="text-xs text-charcoal-500 truncate">{c.company || c.email}</div>
                    </div>
                  </div>
                  {c.isRead ? <MailOpen className="h-4 w-4 text-charcoal-400 shrink-0" /> : <Mail className="h-4 w-4 text-smsorange-500 shrink-0" />}
                </div>
                <p className="text-sm text-charcoal-600 line-clamp-2">{c.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-charcoal-400">{formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}</span>
                  {!c.isRead && <Badge tone="brand">New</Badge>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selected && (
        <Modal open onClose={() => setSelected(null)} title="Contact Details" size="lg"
          footer={
            <>
              <button onClick={() => setConfirmDelete(selected.id)} className="px-3 py-1.5 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm font-semibold inline-flex items-center gap-1">
                <Trash2 className="h-4 w-4" /> Delete
              </button>
              <SecondaryButton onClick={() => toggleRead(selected)}>
                {selected.isRead ? "Mark as unread" : "Mark as read"}
              </SecondaryButton>
              <SecondaryButton onClick={() => setSelected(null)}>Close</SecondaryButton>
            </>
          }
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="h-14 w-14 rounded-full bg-smsorange-50 text-smsorange-700 grid place-items-center font-bold text-lg">
              {(selected.firstName || "?").charAt(0)}{(selected.lastName || "").charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-charcoal-900">{selected.firstName} {selected.lastName}</h3>
              <div className="text-sm text-charcoal-500">{selected.company || "—"}</div>
              <div className="mt-2 text-xs text-charcoal-500">
                <a href={`mailto:${selected.email}`} className="text-smsorange-600 hover:underline">{selected.email}</a>
                {selected.phone && <> · {selected.phone}</>}
              </div>
              <div className="mt-1 text-xs text-charcoal-400">
                Submitted on {format(new Date(selected.createdAt), "PPP 'at' p")}
              </div>
            </div>
          </div>
          <div className="bg-charcoal-50 rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-charcoal-500 mb-2">Message</div>
            <p className="text-sm text-charcoal-800 whitespace-pre-line">{selected.description}</p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-sm text-charcoal-600">{selected.isRead ? "Read" : "Marked as read"}</span>
          </div>
        </Modal>
      )}

      {confirmDelete && (
        <Modal open onClose={() => setConfirmDelete(null)} title="Delete this message?" size="sm"
          footer={
            <>
              <button onClick={() => setConfirmDelete(null)} className="px-3 py-1.5 rounded-md border border-charcoal-200 text-charcoal-700 text-sm">Cancel</button>
              <button onClick={() => remove(confirmDelete)} className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">Delete</button>
            </>
          }
        >
          <p className="text-sm text-charcoal-700">
            This permanently deletes the message. This action cannot be undone.
          </p>
        </Modal>
      )}

      {unreadCount > 0 && (
        <div className="mt-6 text-xs text-charcoal-500">
          {unreadCount} unread of {contacts.length} total
        </div>
      )}
    </>
  );
}