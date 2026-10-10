import CrudManager from "./CrudManager";
import { Field, TextInput, TagInput } from "../adminUI";
import { sustainabilityPillars } from "../../data/safety";
import { Leaf } from "lucide-react";

const columns = [
  { key: "title", label: "Pillar" },
  { key: "icon", label: "Icon" },
  {
    key: "points",
    label: "Items",
    render: (item) => `${item.points?.length || 0} points`,
  },
];

function PillarForm({ item, setItem }) {
  return (
    <>
      <Field label="Pillar title">
        <TextInput
          required
          value={item.title || ""}
          onChange={(event) => setItem({ ...item, title: event.target.value })}
        />
      </Field>
      <Field label="Icon name">
        <TextInput
          value={item.icon || "Leaf"}
          onChange={(event) => setItem({ ...item, icon: event.target.value })}
        />
      </Field>
      <Field label="Content points">
        <TagInput
          value={item.points || []}
          onChange={(points) => setItem({ ...item, points })}
        />
      </Field>
    </>
  );
}

export default function SustainabilityContent() {
  return (
    <CrudManager
      sectionKey="sustainability"
      fallbackItems={sustainabilityPillars}
      initialItem={() => ({ title: "", icon: "Leaf", points: [] })}
      title="Sustainability"
      subtitle="Manage the sustainability pillars and content shown on the public site."
      columns={columns}
      searchFields={["title"]}
      renderForm={(item, setItem) => (
        <PillarForm item={item} setItem={setItem} />
      )}
      emptyTitle="No sustainability pillars"
      addLabel="Add pillar"
      emptyIcon={Leaf}
    />
  );
}
