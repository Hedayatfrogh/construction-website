import MediaSlider from "../ui/MediaSlider";
import { useLanguage } from "../../context/LanguageContext";
import buildingConstruction from "../../assets/AboutWork/01_building_construction.jpg";
import roadConstruction from "../../assets/AboutWork/02_road_construction.jpg";
import bridgeConstruction from "../../assets/AboutWork/03_bridge_construction.jpg";
import heavyMachinery from "../../assets/AboutWork/04_heavy_machinery.jpg";
import siteTeamBriefing from "../../assets/AboutHome/01_site_team_briefing.png";
import engineerOverseeingSite from "../../assets/AboutHome/02_engineer_overseeing_site.png";

const MEDIA = [
  { type: "image", src: siteTeamBriefing, alt: "Afghan construction engineers and crew reviewing work at a site" },
  { type: "image", src: buildingConstruction, alt: "Building construction site with an engineer overseeing progress" },
  { type: "image", src: roadConstruction, alt: "Road construction crew laying a road in an Afghan mountain valley" },
  { type: "image", src: bridgeConstruction, alt: "Bridge construction in progress across a mountain river" },
  { type: "image", src: heavyMachinery, alt: "Excavator and dump truck working at a construction site" },
  { type: "image", src: engineerOverseeingSite, alt: "Site engineer surveying a building project in Afghanistan" },
];

export default function MediaShowcase() {
  const { t } = useLanguage();
  return (
    <section className="sms-section bg-navy-950">
      <div className="sms-container">
        <div className="mb-10">
          <SectionHeader
            align="center"
            titleSize="lg"
            light
            eyebrowClassName="text-navy-300"
            eyebrow={t("home.mediaEyebrow")}
            title={t("home.mediaTitle")}
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MediaSlider
          surface="dark"
          items={MEDIA}
          interval={6000}
          frameClass="aspect-[4/3] sm:aspect-video"
          prevLabel={t("home.mediaPrev")}
          nextLabel={t("home.mediaNext")}
        />
      </div>
    </section>
  );
}
