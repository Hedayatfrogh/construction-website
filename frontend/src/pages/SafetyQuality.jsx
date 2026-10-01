import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { safetyTopics, qualityTopics } from "../data/safety";
import { useLanguage } from "../context/LanguageContext";

export default function SafetyQuality() {
  const { t } = useLanguage();
  const stages = [
    { t: t("safetyQuality.tqcStage1Title"), d: t("safetyQuality.tqcStage1Desc") },
    { t: t("safetyQuality.tqcStage2Title"), d: t("safetyQuality.tqcStage2Desc") },
    { t: t("safetyQuality.tqcStage3Title"), d: t("safetyQuality.tqcStage3Desc") },
  ];
  return (
    <>
      <PageHero eyebrow={t("safetyQuality.heroEyebrow")} title={t("safetyQuality.heroTitle")}
        subtitle={t("safetyQuality.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.safetyQuality") }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
            <Reveal>
              <div className="rounded-2xl bg-navy-800 text-white p-8 md:p-10 h-full">
                <div className="sms-eyebrow !text-smsorange-400">{t("safetyQuality.safetyEyebrow")}</div>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">{t("safetyQuality.safetyTitle")}</h2>
                <p className="mt-4 text-white/70 leading-relaxed">{t("safetyQuality.safetyBody")}</p>
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  {safetyTopics.map((tp) => (
                    <div key={tp.title} className="flex items-start gap-2 rounded-md bg-white/5 px-3 py-2.5">
                      <IconByName name={tp.icon} className="h-4 w-4 mt-0.5 text-smsorange-400 flex-shrink-0" />
                      <span className="text-sm">{t(`safetyTopics.${tp.title}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-charcoal-50 border border-charcoal-100 p-8 md:p-10 h-full">
                <div className="sms-eyebrow">{t("safetyQuality.qualityEyebrow")}</div>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-charcoal-900">{t("safetyQuality.qualityTitle")}</h2>
                <p className="mt-4 text-charcoal-600 leading-relaxed">{t("safetyQuality.qualityBody")}</p>
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  {qualityTopics.map((tp) => (
                    <div key={tp.title} className="flex items-start gap-2 rounded-md bg-white px-3 py-2.5 border border-charcoal-100">
                      <IconByName name={tp.icon} className="h-4 w-4 mt-0.5 text-smsgold-600 flex-shrink-0" />
                      <span className="text-sm text-charcoal-800">{t(`qualityTopics.${tp.title}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sms-section bg-navy-800 text-white">
        <div className="sms-container">
          <SectionHeader light align="center" eyebrow={t("safetyQuality.tqcEyebrow")} title={t("safetyQuality.tqcTitle")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {stages.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <div className="h-full rounded-xl bg-white/5 border border-white/10 p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-smsgold-400 font-semibold">{t("common.stage")} {i+1}</div>
                  <h3 className="mt-2 font-display text-xl font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title={t("safetyQuality.ctaTitle")} />
    </>
  );
}
