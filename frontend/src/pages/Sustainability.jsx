import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { sustainabilityPillars } from "../data/safety";
import { useLanguage } from "../context/LanguageContext";

export default function Sustainability() {
  const { t, lang } = useLanguage();
  return (
    <>
      <PageHero eyebrow={t("sustainability.heroEyebrow")} title={t("sustainability.heroTitle")}
        subtitle={t("sustainability.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.sustainability") }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader align="center" eyebrow={t("sustainability.eyebrow")} title={t("sustainability.title")} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {sustainabilityPillars.map((p, i) => {
              const cardTitle = t(`sustainabilityPillars.${p.title}.title`);
              const points = p.points.map((_pt, idx) =>
                t(`sustainabilityPillars.${p.title}.points.${idx}`)
              );
              return (
                <Reveal key={`${lang}-${p.title}`} delay={i * 0.05}>
                  <div className="h-full rounded-xl border border-charcoal-100 bg-white p-6 hover:border-smsgold-400/60 hover:shadow-sms-strong transition">
                    <div className="h-12 w-12 rounded-md bg-smsgold-400/15 text-smsgold-600 grid place-items-center"><IconByName name={p.icon} className="h-6 w-6" /></div>
                    <h3 className="mt-4 font-display font-bold text-charcoal-900 text-lg">{cardTitle}</h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-charcoal-600">
                      {points.map((pt, idx) => (
                        <li key={`${lang}-${p.title}-p-${idx}-${pt}`} className="flex gap-2"><span className="text-smsgold-500">›</span>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection title={t("sustainability.ctaTitle")} subtitle={t("sustainability.ctaSubtitle")} />
    </>
  );
}
