import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { values } from "../../data/content";
import { pillarDetails } from "../../data/pillarDetails";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import PillarModal from "./PillarModal";
import { useLanguage } from "../../context/LanguageContext";

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
    <section className="sms-section bg-charcoal-50">
      <div className="sms-container">
        <SectionHeader
          eyebrow={t("home.whyEyebrow")}
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
            return (
              <Reveal key={v.title} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => detail && setActivePillar(v)}
                  disabled={!detail}
                  aria-label={t("cards.learnMoreAbout", title)}
                  aria-haspopup={detail ? "dialog" : undefined}
                  className="sms-hover-card sms-hover-card--light group relative w-full text-left h-full rounded-xl bg-white p-6 border border-charcoal-100 shadow-sm
                             cursor-pointer
                             transition active:scale-[0.98]
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-smsorange-400 focus-visible:ring-offset-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="sms-hover-target sms-hover-target--icon font-display text-2xl font-bold text-smsorange-500">0{i+1}</span>
                    <span className="sms-hover-target sms-hover-target--rule h-px flex-1 bg-charcoal-200" />
                    {/* "Open" chevron — appears on hover to signal interactivity */}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-smsorange-500">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="sms-hover-target sms-hover-target--title mt-4 font-display font-bold text-charcoal-900 text-lg">{title}</h3>
                  <p className="mt-2 text-sm text-charcoal-500 leading-relaxed">{desc}</p>
                </button>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/about" className="sms-btn-ghost">
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
