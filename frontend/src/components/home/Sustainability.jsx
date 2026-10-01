import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";
import { sustainabilityPillars } from "../../data/safety";
import { sustainabilityDetails } from "../../data/sustainabilityDetails";
import SustainabilityModal from "./SustainabilityModal";
import { useLanguage } from "../../context/LanguageContext";

export default function Sustainability() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  // Active pillar is the original `sustainabilityPillars` array entry so we
  // keep the translated title consistent with the card the user clicked.
  const [activePillar, setActivePillar] = useState(null);

  const activeOrdinal = activePillar
    ? `0${sustainabilityPillars.findIndex((p) => p.title === activePillar.title) + 1}`
    : null;

  return (
    <section className="sms-section bg-navy-800 text-white">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            light
            align="center"
            titleSize="lg"
            eyebrow={t("home.sustainEyebrow")}
            eyebrowClassName="!text-smsorange-500"
            title={t("home.sustainTitle")}
            subtitle={t("home.sustainSubtitle")}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {sustainabilityPillars.map((p, i) => {
            const detail = sustainabilityDetails[p.title];
            // Translated card heading + each bullet point. Key shape:
            //   t(`sustainabilityPillars.${p.title}.title`)
            //   t(`sustainabilityPillars.${p.title}.points.${idx}`)
            // `p.title` is the English title from data/safety.js, which
            // matches the dictionary keys.
            const cardTitle = t(`sustainabilityPillars.${p.title}.title`);
            return (
              <Reveal key={p.title} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => detail && setActivePillar(p)}
                  disabled={!detail}
                  aria-label={t("cards.learnMoreAbout", cardTitle)}
                  aria-haspopup={detail ? "dialog" : undefined}
                  className="sms-hover-card sms-hover-card--dark group relative w-full text-left h-full min-w-0 rounded-xl bg-white/5 border border-white/10 p-6
                             cursor-pointer
                             transition active:scale-[0.98]
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-smsorange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="sms-hover-target sms-hover-target--icon h-11 w-11 rounded-md bg-smsgold-400/15 text-smsgold-400 grid place-items-center">
                      <IconByName name={p.icon} className="h-6 w-6" />
                    </div>
                    {/* "Open" chevron — appears on hover to signal interactivity */}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-smsgold-400 mt-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="sms-hover-target sms-hover-target--title mt-4 font-display font-bold text-lg">
                    {cardTitle}
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-white/75">
                    {p.points.map((_pt, idx) => (
                      <li
                        key={`${p.title}-${idx}`}
                        className="flex gap-2"
                      >
                        <span className="text-smsgold-400">›</span>
                        <span>{t(`sustainabilityPillars.${p.title}.points.${idx}`)}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/sustainability" className="sms-btn-secondary">
            {t("home.sustainReadMore")} <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>

      {/* ── Sustainability pillar detail modal ──────────────────── */}
      {/* Pass the TRANSLATED card title so the modal heading switches
          with the language. Previously we passed `activePillar.title`
          (the raw English key), which left the modal title in English
          even when the rest of the page was in Dari. */}
      <SustainabilityModal
        pillar={activePillar ? sustainabilityDetails[activePillar.title] : null}
        pillarTitle={
          activePillar
            ? t(`sustainabilityPillars.${activePillar.title}.title`)
            : null
        }
        ordinal={activeOrdinal}
        onClose={() => setActivePillar(null)}
        onLearnMore={() => {
          setActivePillar(null);
          navigate("/sustainability");
        }}
      />
    </section>
  );
}
