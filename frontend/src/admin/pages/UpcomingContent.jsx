import CrudManager from "./CrudManager";
import { Field, TextInput, TextArea, Checkbox } from "../adminUI";
import { CalendarDays } from "lucide-react";

const columns = [
  { key: "title", label: "Project" },
  { key: "location", label: "Location" },
  { key: "targetDate", label: "Target date" },
  {
    key: "isPublished",
    label: "Visibility",
    render: (project) => (project.isPublished ? "Published" : "Hidden"),
  },
];

function UpcomingForm({ item, setItem }) {
  return (
    <>
      <Field label="Project title">
        <TextInput
          required
          value={item.title || ""}
          onChange={(event) => setItem({ ...item, title: event.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Location">
          <TextInput
            value={item.location || ""}
            onChange={(event) =>
              setItem({ ...item, location: event.target.value })
            }
          />
        </Field>
        <Field label="Target date">
          <TextInput
            value={item.targetDate || ""}
            onChange={(event) =>
              setItem({ ...item, targetDate: event.target.value })
            }
          />
        </Field>
      </div>
      <Field label="Description">
        <TextArea
          rows={4}
          value={item.description || ""}
          onChange={(event) =>
            setItem({ ...item, description: event.target.value })
          }
        />
      </Field>
      <Field label="Image URL">
        <TextInput
          type="url"
          value={item.image || ""}
          onChange={(event) => setItem({ ...item, image: event.target.value })}
        />
      </Field>
      <Checkbox
        label="Publish on the public website"
        checked={item.isPublished !== false}
        onChange={(value) => setItem({ ...item, isPublished: value })}
      />
    </>
  );
}

export default function UpcomingContent() {
  return (
    <CrudManager
      sectionKey="upcomingProjects"
      initialItem={() => ({
        title: "",
        location: "",
        targetDate: "",
        description: "",
        image: "",
        isPublished: true,
      })}
      title="Upcoming & Planned"
      subtitle="Manage upcoming and planned projects visible on the public website."
      columns={columns}
      searchFields={["title", "location", "description"]}
      renderForm={(item, setItem) => (
        <UpcomingForm item={item} setItem={setItem} />
      )}
      emptyTitle="No upcoming projects"
      addLabel="Add project"
      emptyIcon={CalendarDays}
    />
  );
}
