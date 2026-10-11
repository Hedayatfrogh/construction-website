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

// Separate media section (same layout as the home "Our Work" slider) placed under a page's content.
// items: [{ src, caption }] or [{ type: "video", src, poster, caption }]
export default function PageSlider({ eyebrow, items }) {
  const { t } = useLanguage();
  if (!items?.length) return null;
  return (
    <section className="sms-section bg-charcoal-50 border-y border-charcoal-100">
      <div className="sms-container">
        <div className="mb-10">
          <SectionHeader align="center" titleSize="lg" eyebrow={eyebrow || t("home.mediaEyebrow")} title={t("home.mediaTitle")} />
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <MediaSlider
          items={items.map((it) => ({ type: "image", alt: it.caption, ...it }))}
          interval={10000}
          prevLabel={t("home.mediaPrev")}
          nextLabel={t("home.mediaNext")}
        />
      </div>
    </section>
  );
}
