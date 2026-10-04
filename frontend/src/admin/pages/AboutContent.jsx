import { useLanguage } from "../../context/LanguageContext";
import SectionEditor from "./SectionEditor";

export default function AboutContent() {
  const { t } = useLanguage();
  const defaults = {
    overviewP1: t("about.overviewP1"),
    overviewP2: t("about.overviewP2"),
    overviewP3: t("about.overviewP3"),
  };
  return (
    <SectionEditor
      title="About Us"
      subtitle="Edit the overview copy shown on the public About page."
      section="about"
      defaults={defaults}
      fields={[
        {
          key: "overviewP1",
          label: "Overview paragraph 1",
          multiline: true,
          wide: true,
        },
        {
          key: "overviewP2",
          label: "Overview paragraph 2",
          multiline: true,
          wide: true,
        },
        {
          key: "overviewP3",
          label: "Overview paragraph 3",
          multiline: true,
          wide: true,
        },
      ]}
    />
  );
}
