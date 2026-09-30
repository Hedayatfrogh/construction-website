// admin/pages/Projects.jsx
import CrudManager from "./CrudManager";
import { Field, TextInput, TextArea, Select, Checkbox, TagInput, Badge, PublishToggle, StarToggle } from "../adminUI";
import { EMPTY_PROJECT, PROJECT_STATUSES, PROJECT_CATEGORIES } from "../../data/adminSeed";
import { FolderKanban } from "lucide-react";

const columns = [
  {
    key: "coverImage", label: "Cover",
    render: (p) => (
      <div className="h-10 w-16 rounded-md bg-charcoal-100 overflow-hidden border border-charcoal-200">
        {p.coverImage ? <img src={p.coverImage} alt="" className="h-full w-full object-cover" /> : <FolderKanban className="h-full w-full p-2 text-charcoal-400" />}
      </div>
    ),
  },
  { key: "title", label: "Title", render: (p) => <div>
    <div className="font-semibold text-charcoal-900">{p.title || <em className="text-charcoal-400">Untitled</em>}</div>
    <div className="text-[11px] text-charcoal-500">{p.slug}</div>
  </div> },
  { key: "category", label: "Category", render: (p) => <Badge tone="info">{p.category}</Badge> },
  { key: "status", label: "Status", render: (p) => {
    const tone = p.status === "Completed" ? "success" : p.status === "In Progress" ? "warning" : p.status === "On Hold" ? "danger" : "neutral";
    return <Badge tone={tone}>{p.status}</Badge>;
  } },
  { key: "location", label: "Location", render: (p) => <span className="text-charcoal-700">{p.location || "—"}</span> },
  { key: "year", label: "Year", render: (p) => <span className="text-charcoal-700">{p.year || "—"}</span> },
  { key: "isPublished", label: "Status", render: (p) => p.featured ? <Badge tone="brand">Featured</Badge> : null },
];

function ProjectForm({ item, setItem }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title" required>
          <TextInput value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} placeholder="Kabul International Tower" />
        </Field>
        <Field label="Slug (URL)" hint="Auto-generated from title if left blank">
          <TextInput value={item.slug} onChange={(e) => setItem({ ...item, slug: e.target.value })} placeholder="kabul-international-tower" />
        </Field>
        <Field label="Category">
          <Select value={item.category} onChange={(e) => setItem({ ...item, category: e.target.value })}>
            {PROJECT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Status">
          <Select value={item.status} onChange={(e) => setItem({ ...item, status: e.target.value })}>
            {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </Field>
        <Field label="Location">
          <TextInput value={item.location} onChange={(e) => setItem({ ...item, location: e.target.value })} placeholder="Kabul, Afghanistan" />
        </Field>
        <Field label="Year">
          <TextInput type="number" value={item.year} onChange={(e) => setItem({ ...item, year: Number(e.target.value) || "" })} />
        </Field>
        <Field label="Client">
          <TextInput value={item.client} onChange={(e) => setItem({ ...item, client: e.target.value })} placeholder="Government of Afghanistan" />
        </Field>
        <Field label="Cover image URL">
          <TextInput value={item.coverImage} onChange={(e) => setItem({ ...item, coverImage: e.target.value })} placeholder="https://..." />
        </Field>
      </div>
      <Field label="Summary" hint="Shown in project cards">
        <TextInput value={item.summary} onChange={(e) => setItem({ ...item, summary: e.target.value })} placeholder="One-line summary..." />
      </Field>
      <Field label="Description">
        <TextArea rows={5} value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} placeholder="Full project description..." />
      </Field>
      <Field label="Gallery image URLs" hint="One URL per tag">
        <TagInput value={item.gallery || []} onChange={(arr) => setItem({ ...item, gallery: arr })} placeholder="https://image-1.jpg" />
      </Field>
      <div className="flex items-center gap-6 pt-2">
        <Checkbox label="Published" checked={item.isPublished} onChange={(v) => setItem({ ...item, isPublished: v })} />
        <Checkbox label="Featured on homepage" checked={item.featured} onChange={(v) => setItem({ ...item, featured: v })} />
      </div>
    </>
  );
}

export default function Projects() {
  return (
    <CrudManager
      sectionKey="projects"
      initialItem={EMPTY_PROJECT}
      title="Projects"
      subtitle="Manage the project portfolio that powers the /projects page and the homepage portfolio section."
      searchFields={["title", "location", "client", "category"]}
      columns={columns}
      renderForm={(item, setItem) => <ProjectForm item={item} setItem={setItem} />}
      emptyTitle="No projects yet"
      emptyHint="Click ‘Add new’ to publish your first project."
      addLabel="Add project"
    />
  );
}
