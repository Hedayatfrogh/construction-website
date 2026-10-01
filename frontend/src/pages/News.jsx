import { Link } from "react-router-dom";
import { Newspaper, ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { useLanguage } from "../context/LanguageContext";

export default function News() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero eyebrow={t("news.heroEyebrow")} title={t("news.heroTitle")}
        subtitle={t("news.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.news") }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <Reveal>
            <div className="rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 p-10 md:p-14 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-smsorange-50 text-smsorange-600 grid place-items-center"><Newspaper className="h-7 w-7" /></div>
              <h3 className="mt-4 font-display text-2xl font-bold text-charcoal-900">{t("news.emptyTitle")}</h3>
              <p className="mt-2 text-charcoal-500 max-w-xl mx-auto">{t("news.emptyBody")}</p>
              <Link to="/contact" className="mt-6 sms-btn-ghost inline-flex">{t("news.subscribeCTA")} <ArrowRight className="h-4 w-4 rtl-flip-x" /></Link>
            </div>
          </Reveal>
        </div>
      </section>
      <CTASection title={t("news.ctaTitle")} />
    </>
  );
}
