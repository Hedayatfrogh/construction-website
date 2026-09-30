import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { methodologySteps } from "../../data/content";
import { methodologyDetails } from "../../data/methodologyDetails";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";
import MethodologyModal from "./MethodologyModal";
import { useLanguage } from "../../context/LanguageContext";

export default function Methodology() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  // Active step is the original `methodologySteps` array entry so we keep
  // the translated title consistent with the card the user clicked.
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section className="sms-section bg-white">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            align="center"
            titleSize="lg"
            eyebrow={t("home.methodEyebrow")}
            title={t("home.methodTitle")}
            subtitle={t("home.methodSubtitle")}
          />
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-charcoal-200 to-transparent" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {methodologySteps.map((m, i) => {
              const detail = methodologyDetails[m.step];
              // Translated card heading + description. Key shape:
              //   t(`methodologySteps.${m.step}.title`)
              //   t(`methodologySteps.${m.step}.description`)
              // `m.step` is the numeric step from data/content.js.
              const cardTitle = t(`methodologySteps.${m.step}.title`);
              const cardDesc  = t(`methodologySteps.${m.step}.description`);
              return (
                <Reveal key={`${lang}-${m.step}`} delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => detail && setActiveStep(m)}
                    disabled={!detail}
                    aria-label={`Learn more about step ${m.step}: ${cardTitle}`}
                    aria-haspopup={detail ? "dialog" : undefined}
                    className="sms-hover-card sms-hover-card--light group relative w-full text-left h-full min-w-0 rounded-xl border border-charcoal-100 bg-white p-6 shadow-sms-soft
                               cursor-pointer
                               transition active:scale-[0.98]
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-smsorange-400 focus-visible:ring-offset-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="sms-hover-target sms-hover-target--icon h-11 w-11 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center">
                        <IconByName name={m.icon} className="h-6 w-6" />
                      </div>
                      <span className="sms-hover-target sms-hover-target--watermark font-display text-3xl font-extrabold text-charcoal-100">0{m.step}</span>
                    </div>
                    <h3 className="sms-hover-target sms-hover-target--title mt-4 font-display font-bold text-charcoal-900">{cardTitle}</h3>
                    <p className="mt-2 text-sm text-charcoal-500 leading-relaxed">{cardDesc}</p>
                    {/* "Open" chevron — appears on hover to signal interactivity */}
                    <span className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-smsorange-500">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/methodology" className="sms-btn-ghost">
            {t("home.methodSeeFull")} <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>

      {/* ── Methodology step detail modal ─────────────────────── */}
      <MethodologyModal
        step={activeStep ? methodologyDetails[activeStep.step] : null}
        stepTitle={activeStep ? t(`methodologySteps.${activeStep.step}.title`) : null}
        stepNumber={activeStep ? activeStep.step : null}
        totalSteps={methodologySteps.length}
        onClose={() => setActiveStep(null)}
        onLearnMore={() => {
          setActiveStep(null);
          navigate("/methodology");
        }}
      />
    </section>
  );
}
