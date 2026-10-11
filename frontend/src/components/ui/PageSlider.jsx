import MediaSlider from "./MediaSlider";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "../../context/LanguageContext";
import construction from "../../assets/Sliders Photos/Constraction.jpg";
import civil from "../../assets/Sliders Photos/Civil mintnance.jpg";
import maintenance from "../../assets/Sliders Photos/Maintnance managment.jpg";
import material from "../../assets/Sliders Photos/material-handling.webp";
import management from "../../assets/Sliders Photos/project management.jpg";
import technical from "../../assets/Sliders Photos/technical services.webp";
import preventive from "../../assets/Sliders Photos/Preventive Mintnance.jpg";
import vision from "../../assets/Sliders Photos/Our vision.jpg";
import mission from "../../assets/Sliders Photos/mission.jpg";

export const photos = { construction, civil, maintenance, material, management, technical, preventive, vision, mission };

/** Matches home section backgrounds: charcoal-50, white, or navy-800 */
const SLIDER_THEMES = {
  charcoal: {
    section: "bg-charcoal-50 border-y border-charcoal-100",
    headerLight: false,
    surface: "light",
  },
  white: {
    section: "bg-white border-y border-charcoal-100",
    headerLight: false,
    surface: "light",
  },
  navy: {
    section: "bg-navy-800 border-y border-white/10",
    headerLight: true,
    eyebrowClassName: "!text-smsgold-400",
    surface: "dark",
  },
};

// Media band under a home section — use `theme` to match the section above.
export default function PageSlider({ eyebrow, items, theme = "charcoal" }) {
  const { t } = useLanguage();
  const tone = SLIDER_THEMES[theme] || SLIDER_THEMES.charcoal;
  if (!items?.length) return null;
  return (
    <section className={`sms-section ${tone.section}`}>
      <div className="sms-container">
        <div className="mb-10">
          <SectionHeader
            align="center"
            titleSize="lg"
            light={tone.headerLight}
            eyebrowClassName={tone.eyebrowClassName || ""}
            eyebrow={eyebrow || t("home.mediaEyebrow")}
            title={t("home.mediaTitle")}
          />
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <MediaSlider
          items={items.map((it) => ({ type: "image", alt: it.caption, ...it }))}
          interval={10000}
          surface={tone.surface}
          prevLabel={t("home.mediaPrev")}
          nextLabel={t("home.mediaNext")}
        />
      </div>
    </section>
  );
}
