import MediaSlider from "../ui/MediaSlider";
import { useLanguage } from "../../context/LanguageContext";
import constructionCrane from "../../assets/OurWork/01_construction_site_crane.png";
import engineerPlanning from "../../assets/OurWork/02_engineers_planning.png";
import excavatorTruck from "../../assets/OurWork/03_excavator_and_truck.png";
import hardhatBlueprints from "../../assets/OurWork/04_sms_hardhat_blueprints.png";
import bridgeConstruction from "../../assets/OurWork/06_bridge_construction.png";

// Add more slides here. Videos: { type: "video", src: "/videos/site.mp4", poster: someImage }
const MEDIA = [
  { type: "image", src: constructionCrane, alt: "Construction site crane and building under development" },
  { type: "image", src: engineerPlanning, alt: "Engineers reviewing plans at a construction site" },
  { type: "image", src: excavatorTruck, alt: "Excavator loading soil into a truck at a construction site" },
  { type: "image", src: hardhatBlueprints, alt: "Safety helmet and project blueprints at a worksite" },
  { type: "image", src: bridgeConstruction, alt: "Bridge construction in progress over a river" },
];

export default function MediaShowcase() {
  const { t } = useLanguage();
  return (
    <section className="pt-2 pb-16 bg-white md:pt-4 md:pb-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <MediaSlider surface="light" items={MEDIA} interval={10000} prevLabel={t("home.mediaPrev")} nextLabel={t("home.mediaNext")} />
      </div>
    </section>
  );
}
