import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { values } from "../../data/content";
import { pillarDetails } from "../../data/pillarDetails";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import PillarModal from "./PillarModal";
import { useLanguage } from "../../context/LanguageContext";
import qualityControl from "../../assets/SafetyQuality/02_quality_control.png";
import safetyBriefing from "../../assets/SafetyQuality/03_safety_briefing.png";
import plansAndSafety from "../../assets/AboutHome/04_plans_and_safety.png";
import engineerOverseeingSite from "../../assets/AboutHome/02_engineer_overseeing_site.png";
import mountainValley from "../../assets/Sustainability/sustainability-mountain-valley.png";
import engineersPlanning from "../../assets/OurWork/02_engineers_planning.png";
import constructionTeam from "../../assets/AboutHome/03_construction_team.png";

const PILLAR_IMAGES = {
  Quality: qualityControl,
  Safety: safetyBriefing,
  Innovation: plansAndSafety,
  Professionalism: engineerOverseeingSite,
  Sustainability: mountainValley,
  "Client Collaboration": engineersPlanning,
  "Social Responsibility": constructionTeam,
};

// Map English value titles to translation keys so each value renders in the
// active language without duplicating the data array.
const valueKeyMap = {
  "Quality":              "values.quality",
  "Safety":               "values.safety",
  "Innovation":           "values.innovation",
  "Professionalism":      "values.professionalism",
  "Sustainability":       "values.sustainability",
  "Client Collaboration": "values.clientCollaboration",
  "Social Responsibility":"values.socialResponsibility",
};

export default function WhySMS() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  // Active pillar is the original `values` array entry (so we keep the
  // translated title & description consistent with the card the user clicked).
  const [activePillar, setActivePillar] = useState(null);

  const activeOrdinal = activePillar
    ? `0${values.findIndex((v) => v.title === activePillar.title) + 1}`
    : null;

  return (
    <section className="sms-section bg-navy-800 text-white">
      <div className="sms-container">
        <SectionHeader
          light
          eyebrow={t("home.whyEyebrow")}
          eyebrowClassName="!text-smsorange-500"
          title={t("home.whyTitle")}
          subtitle={t("home.whySubtitle")}
          align="center"
          titleSize="lg"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const k = valueKeyMap[v.title];
            const title = k ? t(`${k}.title`) : v.title;
            const desc  = k ? t(`${k}.description`) : v.description;
            const detail = pillarDetails[v.title];
            const image = PILLAR_IMAGES[v.title];
            return (
              <Reveal key={v.title} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => detail && setActivePillar(v)}
                  disabled={!detail}
                  aria-label={t("cards.learnMoreAbout", title)}
                  aria-haspopup={detail ? "dialog" : undefined}
                  className="sms-hover-card sms-hover-card--dark group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left
                             cursor-pointer
                             transition active:scale-[0.98]
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-smsorange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800"
                >
                  {image && (
                    <img
                      src={image}
                      alt={title}
                      className="h-36 w-full object-cover sm:h-40"
                    />
                  )}
                  <div className="relative flex flex-1 flex-col px-5 pb-6">
                    <div className="flex items-center gap-3">
                      <span className="sms-hover-target sms-hover-target--icon -mt-5 inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-md bg-smsorange-500 px-2 font-display text-lg font-bold text-white shadow-sms-soft ring-4 ring-navy-800">
                        0{i + 1}
                      </span>
                      <span className="sms-hover-target sms-hover-target--rule mt-3 h-px flex-1 bg-white/15" />
                      <span className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-smsorange-500">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                    <h3 className="sms-hover-target sms-hover-target--title mt-4 font-display font-bold text-white text-lg">{title}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/about" className="sms-btn-secondary">
            {t("home.whyLearnMore")} <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>

      {/* ── Pillar detail modal ──────────────────────────────────── */}
      {/* `activePillar` is the original `values` entry; its `title` matches
          a `pillarDetails.*` dictionary key AND a `pillarDetails[v.title]`
          entry in data/pillarDetails.js. We pass both: the data object
          (for icon, accent, features, benefits, stats, highlights) and the
          resolved translation key (for the modal to translate tagline,
          description, features[i], benefits[i], stats[i].label, highlights[i]
          in the current language). The modal's lookup uses `pillar.title`,
          which we now guarantee is set in data/pillarDetails.js. */}
      <PillarModal
        pillar={activePillar ? pillarDetails[activePillar.title] : null}
        pillarTitle={
          activePillar
            ? (valueKeyMap[activePillar.title]
                ? t(`${valueKeyMap[activePillar.title]}.title`)
                : activePillar.title)
            : null
        }
        ordinal={activeOrdinal}
        onClose={() => setActivePillar(null)}
        onLearnMore={() => {
          setActivePillar(null);
          navigate("/about");
        }}
      />
    </section>
  );
}
