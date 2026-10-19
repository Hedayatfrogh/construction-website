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
import plansAndSafety from "../../assets/AboutHome/04_plans_and_safety.png";
import engineersPlanning from "../../assets/OurWork/02_engineers_planning.png";
import equipmentExcavator from "../../assets/Equipment/03_excavator.png";
import buildingConstruction from "../../assets/AboutWork/01_building_construction.jpg";
import qualityControl from "../../assets/SafetyQuality/02_quality_control.png";
import engineerOverseeingSite from "../../assets/AboutHome/02_engineer_overseeing_site.png";

const STEP_IMAGES = {
  1: plansAndSafety,
  2: engineersPlanning,
  3: equipmentExcavator,
  4: buildingConstruction,
  5: qualityControl,
  6: engineerOverseeingSite,
};

export default function Methodology() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  // Active step is the original `methodologySteps` array entry so we keep
  // the translated title consistent with the card the user clicked.
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section className="sms-section bg-navy-800 text-white">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            light
            align="center"
            titleSize="lg"
            eyebrow={t("home.methodEyebrow")}
            eyebrowClassName="!text-smsorange-500"
            title={t("home.methodTitle")}
            subtitle={t("home.methodSubtitle")}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {methodologySteps.map((m, i) => {
              const detail = methodologyDetails[m.step];
              const cardTitle = t(`methodologySteps.${m.step}.title`);
              const cardDesc  = t(`methodologySteps.${m.step}.description`);
              const image = STEP_IMAGES[m.step];
              const highlighted = m.step === 3;
              return (
                <Reveal key={`${lang}-${m.step}`} delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => detail && setActiveStep(m)}
                    disabled={!detail}
                    aria-label={`Learn more about step ${m.step}: ${cardTitle}`}
                    aria-haspopup={detail ? "dialog" : undefined}
                    className={`sms-hover-card sms-hover-card--dark group relative flex h-full min-w-0 w-full flex-col overflow-hidden rounded-xl border bg-white/5 text-left
                               cursor-pointer
                               transition active:scale-[0.98]
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-smsorange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800 ${
                                 highlighted
                                   ? "border-smsorange-500 shadow-[0_0_0_1px_rgba(249,115,22,0.45)]"
                                   : "border-white/10"
                               }`}
                  >
                    {image && (
                      <img
                        src={image}
                        alt={cardTitle}
                        className="h-32 w-full object-cover sm:h-36"
                      />
                    )}
                    <div className="relative flex flex-1 flex-col px-4 pb-10 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="sms-hover-target sms-hover-target--icon -mt-5 h-11 w-11 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center shadow-sms-soft ring-4 ring-navy-800">
                          <IconByName name={m.icon} className="h-5 w-5" />
                        </div>
                        <span className="sms-hover-target sms-hover-target--watermark mt-3 font-display text-3xl font-extrabold text-white/15">0{m.step}</span>
                      </div>
                      <h3 className="sms-hover-target sms-hover-target--title mt-3 font-display font-bold text-white">{cardTitle}</h3>
                      <p className="mt-2 text-sm text-white/70 leading-relaxed">{cardDesc}</p>
                    </div>
                    <span className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-smsorange-500">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </Reveal>
              );
            })}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/methodology" className="sms-btn-secondary">
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
