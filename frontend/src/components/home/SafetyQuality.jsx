import { Link } from "react-router-dom";
import { ShieldCheck, BadgeCheck, ArrowRight } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";
import { safetyTopics, qualityTopics } from "../../data/safety";
import { useLanguage } from "../../context/LanguageContext";

export default function SafetyQuality() {
  const { t } = useLanguage();
  return (
    <section className="sms-section bg-white">
      <div className="sms-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal>
            <div className="sms-hover-card sms-hover-card--dark group rounded-2xl bg-navy-800 text-white p-8 md:p-10 h-full border border-white/10">
              <div className="flex items-center gap-3">
                <span className="sms-hover-target sms-hover-target--icon h-11 w-11 rounded-md bg-smsorange-500/20 text-smsorange-400 grid place-items-center">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <div className="sms-eyebrow !text-smsorange-400">{t("safetyQuality.safetyEyebrow")}</div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mt-1">{t("home.sqSafetyTitle")}</h3>
                </div>
              </div>
              <p className="mt-5 text-white/70">{t("home.sqSafetyBody")}</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {safetyTopics.slice(0, 8).map((tp) => (
                  <div
                    key={tp.title}
                    className="group/item relative flex items-start gap-2 rounded-md bg-white/5 px-3 py-2.5 border border-white/5
                               cursor-default
                               transition-all duration-300 ease-out
                               will-change-transform
                               hover:bg-white/10 hover:border-smsorange-400/60 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgba(255,138,0,0.55)]
                               before:content-[''] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[2px] before:rounded-full before:bg-smsorange-400 before:scale-y-0 before:origin-center before:transition-transform before:duration-300 before:ease-out
                               hover:before:scale-y-100"
                  >
                    <IconByName
                      name={tp.icon}
                      className="h-4 w-4 mt-0.5 text-smsorange-400 flex-shrink-0 transition-all duration-300 ease-out group-hover/item:text-smsorange-300 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_6px_rgba(255,138,0,0.45)]"
                    />
                    <span className="text-sm transition-colors duration-300 ease-out group-hover/item:text-white">
                      {t(`safetyTopics.${tp.title}`)}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/safety-quality" className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-smsorange-400 hover:text-smsorange-300">
                {t("home.sqSafetyReadMore")} <ArrowRight className="h-4 w-4 rtl-flip-x" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sms-hover-card sms-hover-card--light group rounded-2xl bg-charcoal-50 border border-charcoal-100 p-8 md:p-10 h-full">
              <div className="flex items-center gap-3">
                <span className="sms-hover-target sms-hover-target--icon h-11 w-11 rounded-md bg-smsgold-400/15 text-smsgold-600 grid place-items-center">
                  <BadgeCheck className="h-6 w-6" />
                </span>
                <div>
                  <div className="sms-eyebrow !text-smsgold-600">{t("safetyQuality.qualityEyebrow")}</div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mt-1 text-charcoal-900">{t("home.sqQualityTitle")}</h3>
                </div>
              </div>
              <p className="mt-5 text-charcoal-600">{t("home.sqQualityBody")}</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {qualityTopics.slice(0, 8).map((tp) => (
                  <div
                    key={tp.title}
                    className="group/item relative flex items-start gap-2 rounded-md bg-white px-3 py-2.5 border border-charcoal-100
                               cursor-default
                               transition-all duration-300 ease-out
                               will-change-transform
                               hover:bg-smsorange-50/70 hover:border-smsorange-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgba(255,138,0,0.45)]
                               before:content-[''] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[2px] before:rounded-full before:bg-smsorange-500 before:scale-y-0 before:origin-center before:transition-transform before:duration-300 before:ease-out
                               hover:before:scale-y-100"
                  >
                    <IconByName
                      name={tp.icon}
                      className="h-4 w-4 mt-0.5 text-smsgold-600 flex-shrink-0 transition-all duration-300 ease-out group-hover/item:text-smsorange-500 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_6px_rgba(255,138,0,0.45)]"
                    />
                    <span className="text-sm text-charcoal-800 transition-colors duration-300 ease-out group-hover/item:text-charcoal-900">
                      {t(`qualityTopics.${tp.title}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/safety-quality" className="sms-btn-ghost">
            {t("home.sqSeeQuality")} <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>
    </section>
  );
}
