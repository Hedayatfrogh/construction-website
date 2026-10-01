import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { workforce } from "../../data/operations";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { useLanguage } from "../../context/LanguageContext";

// ── RoleItem ──────────────────────────────────────────────────────────
// One hoverable row inside a Workforce card. Each role gets its own
// micro-interaction so the long lists feel scannable and interactive.
//
// Hover behaviour:
//   • bg lifts from transparent → white/10 (local to this row only —
//     does NOT affect the parent card, so card text stays readable)
//   • subtle orange border reveals
//   • -translate-y-0.5 lift with smooth ease
//   • soft orange-tinted glow shadow
//   • sliding left-bar accent (`::before` scale-y animation)
//   • arrow `›` scales to 1.25× and brightens to vivid orange
//   • text brightens from white/85 → pure white
//
// Uses Tailwind named `group/role` so the arrow's `group-hover/role:`
// only fires for THIS item (not the whole card).
function RoleItem({ role }) {
  return (
    <div
      className="group/role relative flex items-center gap-2 rounded-md px-2 py-1.5
                 border border-transparent
                 cursor-default
                 transition-all duration-300 ease-out
                 will-change-transform
                 will-change-transform
                 hover:bg-white/10 hover:border-smsorange-400/50 hover:-translate-y-0.5
                 hover:shadow-[0_6px_16px_-10px_rgba(255,138,0,0.55)]
                 before:content-[''] before:absolute before:left-0 before:top-1.5 before:bottom-1.5
                 before:w-[2px] before:rounded-full before:bg-smsorange-400
                 before:scale-y-0 before:origin-center
                 before:transition-transform before:duration-300 before:ease-out
                 hover:before:scale-y-100"
    >
      <span className="text-smsorange-400 font-bold leading-none transition-all duration-300 ease-out
                       group-hover/role:scale-125 group-hover/role:text-smsorange-300
                       group-hover/role:translate-x-0.5 group-hover/role:drop-shadow-[0_0_6px_rgba(255,138,0,0.55)]">
        ›
      </span>
      {/* Explicit `text-white` (fully opaque) ensures the role text
          stays fully readable regardless of any future parent-card
          hover background changes. */}
      <span className="text-white/90 transition-colors duration-300 ease-out group-hover/role:text-white">
        {role}
      </span>
    </div>
  );
}

export default function Workforce() {
  const { t, lang } = useLanguage();
  // Use the translated workforce list from the dictionary. In EN, both
  // lists match the raw data — in FA, they are the proper Dari strings.
  // The dictionary key shape: workforce.engineering[N] / workforce.skilled[N].
  const engineeringRoles = t("workforce.engineering");
  const skilledRoles = t("workforce.skilled");

  // The dictionary always returns an array for these keys in both
  // languages — but we fall back to the raw data array defensively
  // if a key is ever missing.
  const engineeringList = Array.isArray(engineeringRoles)
    ? engineeringRoles
    : workforce.engineering;
  const skilledList = Array.isArray(skilledRoles)
    ? skilledRoles
    : workforce.skilledLabor;

  return (
    <section className="sms-section bg-white">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            align="center"
            titleSize="lg"
            eyebrow={t("home.workforceEyebrow")}
            title={t("home.workforceTitle")}
            subtitle={t("home.workforceSubtitle")}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ── Engineering & Technical card ─────────────────────── */}
          <Reveal>
            <div className="sms-hover-card sms-hover-card--dark group h-full rounded-xl bg-navy-800 text-white p-8 border border-white/15">
              <div className="text-xs uppercase tracking-[0.2em] text-smsgold-400 font-semibold">
                {t("team.engineeringLabel")}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                {engineeringList.map((r) => (
                  <RoleItem key={`eng-${lang}-${r}`} role={r} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Skilled Labor card ───────────────────────────────── */}
          <Reveal delay={0.1}>
            <div className="sms-hover-card sms-hover-card--dark group h-full rounded-xl bg-navy-800 text-white p-8 border border-white/15">
              <div className="text-xs uppercase tracking-[0.2em] text-smsgold-400 font-semibold">
                {t("team.skilledLabel")}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                {skilledList.map((r) => (
                  <RoleItem key={`skl-${lang}-${r}`} role={r} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/team" className="sms-btn-ghost">
            {t("home.workforceMeetTeam")} <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>
    </section>
  );
}
