import CrudManager from "./CrudManager";
import { Field, TextInput, TextArea, TagInput } from "../adminUI";
import { methodologySteps } from "../../data/content";
import { ClipboardList } from "lucide-react";

const columns = [
  { key: "step", label: "Step" },
  { key: "title", label: "Title" },
  { key: "description", label: "Description", className: "max-w-md" },
];

function StepForm({ item, setItem }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Step number">
          <TextInput
            type="number"
            value={item.step || ""}
            onChange={(event) =>
              setItem({ ...item, step: Number(event.target.value) })
            }
          />
        </Field>
        <Field label="Icon name">
          <TextInput
            value={item.icon || ""}
            onChange={(event) => setItem({ ...item, icon: event.target.value })}
          />
        </Field>
      </div>
      <Field label="Title">
        <TextInput
          required
          value={item.title || ""}
          onChange={(event) => setItem({ ...item, title: event.target.value })}
        />
      </Field>
      <Field label="Description">
        <TextArea
          rows={3}
          value={item.description || ""}
          onChange={(event) =>
            setItem({ ...item, description: event.target.value })
          }
        />
      </Field>
      <Field label="Key points">
        <TagInput
          value={item.points || []}
          onChange={(points) => setItem({ ...item, points })}
        />
      </Field>
    </>
  );
}

export default function MethodologyContent() {
  return (
    <CrudManager
      sectionKey="methodology"
      fallbackItems={methodologySteps}
      initialItem={() => ({
        step: methodologySteps.length + 1,
        title: "",
        icon: "ClipboardList",
        description: "",
        points: [],
      })}
      title="Our Methodology"
      subtitle="Manage the process steps displayed on the public Methodology page."
      columns={columns}
      searchFields={["title", "description"]}
      renderForm={(item, setItem) => <StepForm item={item} setItem={setItem} />}
      emptyTitle="No methodology steps"
      addLabel="Add step"
      emptyIcon={ClipboardList}
    />
  );
}
