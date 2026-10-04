import { company } from "../../data/company";
import SectionEditor from "./SectionEditor";

const defaults = {
  phone: company.phone,
  email: company.email,
  address: company.offices.main,
  branchAddress: company.offices.branch,
};

export default function ContactContent() {
  return (
    <SectionEditor
      title="Contact Information"
      subtitle="Edit the phone, email, and office addresses shown on the public Contact page."
      section="contact"
      defaults={defaults}
      fields={[
        { key: "phone", label: "Phone number" },
        { key: "email", label: "Email address", type: "email" },
        { key: "address", label: "Main office address", multiline: true },
        {
          key: "branchAddress",
          label: "Branch office address",
          multiline: true,
        },
      ]}
    />
  );
}
