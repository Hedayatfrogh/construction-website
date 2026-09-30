import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { strategicPlans } from "../data/operations";
import { useLanguage } from "../context/LanguageContext";

export default function StrategicPlans() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero eyebrow={t("strategicPlans.heroEyebrow")} title={t("strategicPlans.heroTitle")}
        subtitle={t("strategicPlans.heroSubtitle")}
        breadcrumbs={[{ label: t("strategicPlans.heroEyebrow") }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader align="center" eyebrow={t("strategicPlans.eyebrow")} title={t("strategicPlans.title")} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {strategicPlans.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-charcoal-100 bg-white p-7 hover:border-smsorange-300 hover:shadow-sms-strong transition">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md bg-navy-700 text-smsgold-400 grid place-items-center"><IconByName name={p.icon} className="h-6 w-6" /></div>
                    <h3 className="font-display font-bold text-charcoal-900 text-xl">{p.title}</h3>
                  </div>
                  <ul className="mt-5 grid gap-2 text-sm text-charcoal-600">
                    {p.points.map((pt) => (<li key={pt} className="flex gap-2"><span className="text-smsorange-500">›</span>{pt}</li>))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title={t("strategicPlans.ctaTitle")} />
    </>
  );
}
