// Home page composition — preserves the import path used by App.jsx (`./components/Slider`)
import { useLanguage } from "../context/LanguageContext";
import Hero from "./home/Hero";
import Stats from "./home/Stats";
import ServicesGrid from "./home/ServicesGrid";
import MediaShowcase from "./home/MediaShowcase";
import WhySMS from "./home/WhySMS";
import SafetyQuality from "./home/SafetyQuality";
import Sustainability from "./home/Sustainability";
import Methodology from "./home/Methodology";
import EquipmentShowcase from "./home/EquipmentShowcase";
import Workforce from "./home/Workforce";
import Upcoming from "./home/Upcoming";
import Clients from "./home/Clients";
import CTASection from "./ui/CTASection";
import PageSlider, { photos } from "./ui/PageSlider";
import safetyInspection from "../assets/SafetyQuality/01_safety_inspection (2).png";
import qualityControl from "../assets/SafetyQuality/02_quality_control.png";
import safetyBriefing from "../assets/SafetyQuality/03_safety_briefing.png";
import sustainabilityAfghanMountains from "../assets/Sustainability/sustainability-afghan-mountains.png";
import sustainabilityMountainValley from "../assets/Sustainability/sustainability-mountain-valley.png";
import sustainabilityGreenerFuture from "../assets/Sustainability/sustainability-greener-mountain-future.png";
import buildingConstruction from "../assets/AboutWork/01_building_construction.jpg";
import heavyMachinery from "../assets/AboutWork/04_heavy_machinery.jpg";
import equipmentConcreteMixer from "../assets/Equipment/01_concrete_mixer.png";
import equipmentWheelLoader from "../assets/Equipment/02_wheel_loader.png";
import equipmentExcavator from "../assets/Equipment/03_excavator.png";
import aboutTeamBriefing from "../assets/AboutHome/01_site_team_briefing.png";
import aboutEngineerOverseeingSite from "../assets/AboutHome/02_engineer_overseeing_site.png";
import engineersPlanning from "../assets/OurWork/02_engineers_planning.png";
import aboutPlansAndSafety from "../assets/AboutHome/04_plans_and_safety.png";

export default function Slider() {
  const { t } = useLanguage();
  return (
    <main>
      <Hero />
      <Stats />
      <ServicesGrid />
      <MediaShowcase />
      <WhySMS />
      <PageSlider theme="charcoal" eyebrow={t("nav.about")} items={[
        { src: aboutTeamBriefing, caption: t("team.title") },
        { src: aboutEngineerOverseeingSite, caption: t("about.overviewTitle") },
        { src: engineersPlanning, caption: t("team.engineeringTitle") },
        { src: aboutPlansAndSafety, caption: t("methodologySteps.1.title") },
      ]} />
      <SafetyQuality />
      <PageSlider theme="white" eyebrow={t("nav.safetyQuality")} items={[
        { src: safetyInspection, caption: t("safetyQuality.safetyTitle") },
        { src: qualityControl, caption: t("safetyQuality.qualityTitle") },
        { src: safetyBriefing, caption: t("nav.safetyQuality") },
      ]} />
      <Sustainability />
      <PageSlider theme="navy" eyebrow={t("nav.sustainability")} items={[
        { src: sustainabilityAfghanMountains, caption: t("sustainabilityPillars.Sustainable Construction.title") },
        { src: sustainabilityMountainValley, caption: t("sustainabilityPillars.Water Conservation.title") },
        { src: sustainabilityGreenerFuture, caption: t("sustainabilityPillars.Waste Management.title") },
      ]} />
      <Methodology />
      <PageSlider theme="white" eyebrow={t("nav.methodology")} items={[
        { src: aboutPlansAndSafety, caption: t("methodologySteps.1.title") },
        { src: engineersPlanning, caption: t("methodologySteps.2.title") },
        { src: heavyMachinery, caption: t("methodologySteps.3.title") },
        { src: buildingConstruction, caption: t("methodologySteps.4.title") },
        { src: qualityControl, caption: t("methodologySteps.5.title") },
        { src: aboutEngineerOverseeingSite, caption: t("methodologySteps.6.title") },
      ]} />
      <EquipmentShowcase />
      <PageSlider theme="charcoal" eyebrow={t("nav.equipment")} items={[
        { src: equipmentConcreteMixer, caption: t("equipmentCategories.Concrete & Road Equipment.title") },
        { src: equipmentWheelLoader, caption: t("equipmentCategories.Material Handling.title") },
        { src: equipmentExcavator, caption: t("equipmentCategories.Earthmoving Equipment.title") },
      ]} />
      <Workforce />
      <PageSlider theme="white" eyebrow={t("nav.team")} items={[{ src: photos.technical, caption: t("team.engineeringTitle") }, { src: photos.preventive, caption: t("team.skilledTitle") }, { src: photos.construction, caption: t("team.title") }]} />
      <Upcoming />
      <Clients />
      <CTASection
        title={t('home.ctaTitle')}
        subtitle={t('home.ctaSubtitle')}
      />
    </main>
  );
}
