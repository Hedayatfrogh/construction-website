// admin/pages/Team.jsx
import CrudManager from "./CrudManager";
import { Field, TextInput, TextArea, Select, Checkbox, Badge } from "../adminUI";
import { EMPTY_TEAM_MEMBER, TEAM_DEPARTMENTS } from "../../data/adminSeed";
import { Users } from "lucide-react";

const columns = [
  {
    key: "photo", label: "Photo",
    render: (m) => (
      <div className="h-10 w-10 rounded-full bg-smsorange-50 overflow-hidden border border-charcoal-200 grid place-items-center text-smsorange-700 font-bold">
        {m.photo ? <img src={m.photo} alt="" className="h-full w-full object-cover" /> : (m.name || "?").charAt(0).toUpperCase()}
      </div>
    ),
  },
  { key: "name", label: "Name", render: (m) => <div>
    <div className="font-semibold text-charcoal-900">{m.name || <em className="text-charcoal-400">Unnamed</em>}</div>
    <div className="text-[11px] text-charcoal-500">{m.email}</div>
  </div> },
  { key: "role", label: "Role", render: (m) => <span className="text-charcoal-700">{m.role || "—"}</span> },
  { key: "department", label: "Department", render: (m) => <Badge tone="info">{m.department}</Badge> },
  { key: "isPublished", label: "Status", render: (m) => m.isPublished ? <Badge tone="success">Visible</Badge> : <Badge tone="neutral">Hidden</Badge> },
];

function TeamForm({ item, setItem }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" required>
          <TextInput value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
        </Field>
        <Field label="Role / Job title">
          <TextInput value={item.role} onChange={(e) => setItem({ ...item, role: e.target.value })} placeholder="Senior Civil Engineer" />
        </Field>
        <Field label="Department">
          <Select value={item.department} onChange={(e) => setItem({ ...item, department: e.target.value })}>
            {TEAM_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </Select>
        </Field>
        <Field label="Display order" hint="Lower = shown first">
          <TextInput type="number" value={item.displayOrder} onChange={(e) => setItem({ ...item, displayOrder: Number(e.target.value) || 0 })} />
        </Field>
        <Field label="Email">
          <TextInput type="email" value={item.email} onChange={(e) => setItem({ ...item, email: e.target.value })} />
        </Field>
        <Field label="Phone">
          <TextInput value={item.phone} onChange={(e) => setItem({ ...item, phone: e.target.value })} />
        </Field>
        <Field label="Photo URL" hint="Square JPG/PNG recommended">
          <TextInput value={item.photo} onChange={(e) => setItem({ ...item, photo: e.target.value })} placeholder="https://..." />
        </Field>
      </div>
      <Field label="Biography">
        <TextArea rows={4} value={item.bio} onChange={(e) => setItem({ ...item, bio: e.target.value })} placeholder="Short professional bio..." />
      </Field>
      <Checkbox label="Show on public Team page" checked={item.isPublished} onChange={(v) => setItem({ ...item, isPublished: v })} />
    </>
  );
}

export default function Team() {
  return (
    <CrudManager
      sectionKey="teamMembers"
      initialItem={EMPTY_TEAM_MEMBER}
      title="Team Members"
      subtitle="Manage the people shown on the public /team page and the homepage Workforce section."
      searchFields={["name", "role", "department", "email"]}
      columns={columns}
      renderForm={(item, setItem) => <TeamForm item={item} setItem={setItem} />}
      emptyTitle="No team members yet"
      emptyHint="Add the people who make SMS what it is."
      addLabel="Add team member"
      emptyIcon={Users}
    />
  );
}
