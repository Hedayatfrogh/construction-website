import SectionHeader from "../ui/SectionHeader";
import MediaSlider from "../ui/MediaSlider";
import { useLanguage } from "../../context/LanguageContext";
import constructionSite from "../../assets/Sliders Photos/Constraction.jpg";
import civilWorks from "../../assets/Sliders Photos/Civil mintnance.jpg";
import materialHandling from "../../assets/Sliders Photos/material-handling.webp";
import engineering from "../../assets/Sliders Photos/Maintnance managment.jpg";

// Add more slides here. Videos: { type: "video", src: "/videos/site.mp4", poster: someImage }
const MEDIA = [
  { type: "image", src: constructionSite, alt: "Engineers reviewing a building under construction" },
  { type: "image", src: civilWorks, alt: "Site engineers on a concrete deck beneath a tower crane" },
  { type: "image", src: materialHandling, alt: "Material handling with a forklift" },
  { type: "image", src: engineering, alt: "Engineering equipment and digital monitoring" },
];

export default function MediaShowcase() {
  const { t } = useLanguage();
  return (
    <section className="sms-section bg-charcoal-50 border-y border-charcoal-100">
      <div className="sms-container">
        <div className="mb-10">
          <SectionHeader
            align="center"
            titleSize="lg"
            eyebrow={t("home.mediaEyebrow")}
            title={t("home.mediaTitle")}
          />
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <MediaSlider items={MEDIA} interval={10000} prevLabel={t("home.mediaPrev")} nextLabel={t("home.mediaNext")} />
      </div>
    </section>
  );
}
