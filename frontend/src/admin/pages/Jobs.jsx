// admin/pages/Jobs.jsx
import CrudManager from "./CrudManager";
import { Field, TextInput, TextArea, Select, Checkbox, TagInput, Badge } from "../adminUI";
import { EMPTY_JOB, JOB_TYPES, TEAM_DEPARTMENTS } from "../../data/adminSeed";
import { Briefcase } from "lucide-react";
import { format } from "date-fns";

const columns = [
  { key: "title", label: "Title", render: (j) => <div>
    <div className="font-semibold text-charcoal-900">{j.title || <em className="text-charcoal-400">Untitled</em>}</div>
    <div className="text-[11px] text-charcoal-500">{j.location} · {j.type}</div>
  </div> },
  { key: "department", label: "Department", render: (j) => <Badge tone="info">{j.department}</Badge> },
  { key: "type", label: "Type", render: (j) => <Badge tone="brand">{j.type}</Badge> },
  { key: "postedAt", label: "Posted", render: (j) => <span className="text-xs text-charcoal-500">{j.postedAt ? format(new Date(j.postedAt), "PP") : "—"}</span> },
  { key: "isOpen", label: "Status", render: (j) => j.isOpen ? <Badge tone="success">Open</Badge> : <Badge tone="neutral">Closed</Badge> },
];

function JobForm({ item, setItem }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Job title" required>
          <TextInput value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} placeholder="Senior Civil Engineer" />
        </Field>
        <Field label="Department">
          <Select value={item.department} onChange={(e) => setItem({ ...item, department: e.target.value })}>
            {TEAM_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </Select>
        </Field>
        <Field label="Location">
          <TextInput value={item.location} onChange={(e) => setItem({ ...item, location: e.target.value })} placeholder="Kabul, Afghanistan" />
        </Field>
        <Field label="Employment type">
          <Select value={item.type} onChange={(e) => setItem({ ...item, type: e.target.value })}>
            {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
        <Field label="Posted on">
          <TextInput type="datetime-local" value={item.postedAt ? item.postedAt.slice(0, 16) : ""} onChange={(e) => setItem({ ...item, postedAt: e.target.value ? new Date(e.target.value).toISOString() : "" })} />
        </Field>
      </div>
      <Field label="Description">
        <TextArea rows={4} value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
      </Field>
      <Field label="Requirements" hint="One per tag">
        <TagInput value={item.requirements || []} onChange={(arr) => setItem({ ...item, requirements: arr })} placeholder="5+ years of experience" />
      </Field>
      <Checkbox label="Position is currently open" checked={item.isOpen} onChange={(v) => setItem({ ...item, isOpen: v })} />
    </>
  );
}

export default function Jobs() {
  return (
    <CrudManager
      sectionKey="jobs"
      initialItem={EMPTY_JOB}
      title="Careers / Jobs"
      subtitle="Open positions shown on the careers / jobs section of the site."
      searchFields={["title", "department", "location", "type"]}
      columns={columns}
      renderForm={(item, setItem) => <JobForm item={item} setItem={setItem} />}
      emptyTitle="No open positions"
      emptyHint="Click ‘Add new’ to publish a new job listing."
      addLabel="Add job"
      emptyIcon={Briefcase}
    />
  );
}
