import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { methodologySteps } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function Methodology() {
  const { t, lang } = useLanguage();
  return (
    <>
      <PageHero eyebrow={t("methodology.heroEyebrow")} title={t("methodology.heroTitle")}
        subtitle={t("methodology.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.methodology") }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-charcoal-200 to-transparent" />
            <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-6">
              {methodologySteps.map((m, i) => {
                // Translated card heading, description, and bullet points.
                const cardTitle = t(`methodologySteps.${m.step}.title`);
                const cardDesc  = t(`methodologySteps.${m.step}.description`);
                const points = m.points.map((_p, idx) =>
                  t(`methodologySteps.${m.step}.points.${idx}`)
                );
                return (
                  <Reveal key={`${lang}-${m.step}`} delay={i * 0.05}>
                    <div className="relative h-full rounded-xl border border-charcoal-100 bg-white p-6 hover:border-smsorange-300 hover:shadow-sms-strong transition">
                      <div className="flex items-center justify-between">
                        <div className="h-11 w-11 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center"><IconByName name={m.icon} className="h-6 w-6" /></div>
                        <span className="font-display text-3xl font-extrabold text-charcoal-100">0{m.step}</span>
                      </div>
                      <h3 className="mt-4 font-display font-bold text-charcoal-900">{cardTitle}</h3>
                      <p className="mt-2 text-sm text-charcoal-500 leading-relaxed">{cardDesc}</p>
                      <ul className="mt-4 space-y-1.5 text-sm text-charcoal-600">
                        {points.map((p, idx) => (
                          <li key={`${lang}-${m.step}-p-${idx}-${p}`} className="flex gap-2"><span className="text-smsorange-500">›</span>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <CTASection title={t("methodology.ctaTitle")} subtitle={t("methodology.ctaSubtitle")} />
    </>
  );
}
