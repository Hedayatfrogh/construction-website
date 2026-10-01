// Home page composition — preserves the import path used by App.jsx (`./components/Slider`)
import { useLanguage } from "../context/LanguageContext";
import Hero from "./home/Hero";
import Stats from "./home/Stats";
import ServicesGrid from "./home/ServicesGrid";
import WhySMS from "./home/WhySMS";
import SafetyQuality from "./home/SafetyQuality";
import Sustainability from "./home/Sustainability";
import Methodology from "./home/Methodology";
import EquipmentShowcase from "./home/EquipmentShowcase";
import Workforce from "./home/Workforce";
import Upcoming from "./home/Upcoming";
import Clients from "./home/Clients";
import CTASection from "./ui/CTASection";

export default function Slider() {
  const { t } = useLanguage();
  return (
    <main>
      <Hero />
      <Stats />
      <ServicesGrid />
      <WhySMS />
      <SafetyQuality />
      <Sustainability />
      <Methodology />
      <EquipmentShowcase />
      <Workforce />
      <Upcoming />
      <Clients />
      <CTASection
        title={t('home.ctaTitle')}
        subtitle={t('home.ctaSubtitle')}
      />
    </main>
  );
}
