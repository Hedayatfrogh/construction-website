// admin/pages/Clients.jsx
import CrudManager from "./CrudManager";
import { Field, TextInput, TextArea, Select, Checkbox, Badge } from "../adminUI";
import { EMPTY_CLIENT, CLIENT_CATEGORIES } from "../../data/adminSeed";
import { Building2 } from "lucide-react";

const columns = [
  { key: "logo", label: "Logo", render: (c) => (
    <div className="h-10 w-16 rounded-md bg-charcoal-50 border border-charcoal-200 grid place-items-center overflow-hidden">
      {c.logo ? <img src={c.logo} alt="" className="max-h-full max-w-full" /> : <Building2 className="h-5 w-5 text-charcoal-400" />}
    </div>
  ) },
  { key: "name", label: "Client", render: (c) => <span className="font-semibold text-charcoal-900">{c.name || <em className="text-charcoal-400">Unnamed</em>}</span> },
  { key: "category", label: "Category", render: (c) => <Badge tone="info">{c.category}</Badge> },
  { key: "website", label: "Website", render: (c) => c.website
    ? <a href={c.website} target="_blank" rel="noreferrer" className="text-smsorange-600 hover:underline text-xs">{c.website}</a>
    : <span className="text-charcoal-400">—</span> },
  { key: "isPublished", label: "Status", render: (c) => c.isPublished ? <Badge tone="success">Visible</Badge> : <Badge tone="neutral">Hidden</Badge> },
];

function ClientForm({ item, setItem }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Client name" required>
          <TextInput value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
        </Field>
        <Field label="Category">
          <Select value={item.category} onChange={(e) => setItem({ ...item, category: e.target.value })}>
            {CLIENT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Website">
          <TextInput value={item.website} onChange={(e) => setItem({ ...item, website: e.target.value })} placeholder="https://example.com" />
        </Field>
        <Field label="Display order" hint="Lower = shown first">
          <TextInput type="number" value={item.displayOrder} onChange={(e) => setItem({ ...item, displayOrder: Number(e.target.value) || 0 })} />
        </Field>
        <Field label="Logo URL" hint="Square PNG with transparent background looks best">
          <TextInput value={item.logo} onChange={(e) => setItem({ ...item, logo: e.target.value })} placeholder="https://..." />
        </Field>
      </div>
      <Field label="Description">
        <TextArea rows={3} value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
      </Field>
      <Checkbox label="Show on public Clients page" checked={item.isPublished} onChange={(v) => setItem({ ...item, isPublished: v })} />
    </>
  );
}

export default function Clients() {
  return (
    <CrudManager
      sectionKey="clients"
      initialItem={EMPTY_CLIENT}
      title="Clients"
      subtitle="Showcase the organisations you've worked with on the public /clients page."
      searchFields={["name", "category", "description"]}
      columns={columns}
      renderForm={(item, setItem) => <ClientForm item={item} setItem={setItem} />}
      emptyTitle="No clients yet"
      emptyHint="Add clients to feature them on the Clients page."
      addLabel="Add client"
      emptyIcon={Building2}
    />
  );
}
