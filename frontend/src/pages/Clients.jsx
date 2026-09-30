import { Link } from "react-router-dom";
import { Handshake, ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { useLanguage } from "../context/LanguageContext";

export default function Clients() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero eyebrow={t("clients.heroEyebrow")} title={t("clients.heroTitle")}
        subtitle={t("clients.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.clients") }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader align="center" eyebrow={t("clients.eyebrow")} title={t("clients.title")}
            subtitle={t("clients.subtitle")} />
          <Reveal>
            <div className="mt-12 rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 p-10 md:p-14 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-smsorange-50 text-smsorange-600 grid place-items-center"><Handshake className="h-7 w-7" /></div>
              <h3 className="mt-4 font-display text-2xl font-bold text-charcoal-900">{t("clients.emptyTitle")}</h3>
              <p className="mt-2 text-charcoal-500 max-w-xl mx-auto">{t("clients.emptyBody")}</p>
              <Link to="/contact" className="mt-6 sms-btn-ghost inline-flex">{t("clients.becomeCTA")} <ArrowRight className="h-4 w-4 rtl-flip-x" /></Link>
            </div>
          </Reveal>
        </div>
      </section>
      <CTASection title={t("clients.ctaTitle")} subtitle={t("clients.ctaSubtitle")} />
    </>
  );
}
