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

export default function Slider() {
  const { t } = useLanguage();
  return (
    <main>
      <Hero />
      <Stats />
      <ServicesGrid />
      <MediaShowcase />
      <WhySMS />
      <PageSlider eyebrow={t("nav.about")} items={[{ src: photos.vision, caption: t("about.vision") }, { src: photos.mission, caption: t("about.mission") }, { src: photos.construction, caption: t("about.overviewTitle") }, { src: photos.management, caption: t("about.valuesTitle") }]} />
      <SafetyQuality />
      <PageSlider eyebrow={t("nav.safetyQuality")} items={[{ src: photos.technical, caption: t("safetyQuality.safetyTitle") }, { src: photos.preventive, caption: t("safetyQuality.qualityTitle") }, { src: photos.construction, caption: t("nav.safetyQuality") }]} />
      <Sustainability />
      <PageSlider eyebrow={t("nav.sustainability")} items={[{ src: photos.construction, caption: t("sustainabilityPillars.Sustainable Construction.title") }, { src: photos.civil, caption: t("sustainabilityPillars.Water Conservation.title") }, { src: photos.maintenance, caption: t("sustainabilityPillars.Waste Management.title") }]} />
      <Methodology />
      <PageSlider eyebrow={t("nav.methodology")} items={["management", "maintenance", "material", "construction", "technical", "civil"].map((p, i) => ({ src: photos[p], caption: t(`methodologySteps.${i + 1}.title`) }))} />
      <EquipmentShowcase />
      <PageSlider eyebrow={t("nav.equipment")} items={[{ src: photos.material, caption: t("equipmentCategories.Material Handling.title") }, { src: photos.construction, caption: t("equipmentCategories.Earthmoving Equipment.title") }, { src: photos.civil, caption: t("equipmentCategories.Concrete & Road Equipment.title") }]} />
      <Workforce />
      <PageSlider eyebrow={t("nav.team")} items={[{ src: photos.technical, caption: t("team.engineeringTitle") }, { src: photos.preventive, caption: t("team.skilledTitle") }, { src: photos.construction, caption: t("team.title") }]} />
      <Upcoming />
      <Clients />
      <CTASection
        title={t('home.ctaTitle')}
        subtitle={t('home.ctaSubtitle')}
      />
    </main>
  );
}
