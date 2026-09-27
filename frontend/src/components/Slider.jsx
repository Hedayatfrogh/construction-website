// Home page composition — preserves the import path used by App.jsx (`./components/Slider`)
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
        title="Let's plan your next construction or engineering project."
        subtitle="Whether a high-rise building, infrastructure corridor, irrigation scheme, or solar installation — SMS brings the engineering, equipment, and people to deliver it."
      />
    </main>
  );
}
