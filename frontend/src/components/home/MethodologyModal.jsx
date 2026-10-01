// components/home/MethodologyModal.jsx
// ─────────────────────────────────────────────────────────────────────────────
// A rich, LIGHT-themed modal opened from the "Our Methodology" section on
// the Home page. Each of the six steps opens its own modal with unique
// content.
//
// Visual treatment differs from the dark Why SMS / Sustainability modals
// because the Methodology section sits on a light (white) background.
// We keep the same dark navy header band for visual contrast, but use a
// softer, more "blueprint-y" treatment that matches the section's numbered
// step aesthetic.
//
// Modal sections:
//   • Header — large step number, icon, title, tagline
//   • Body — description, stat strip, duration, highlights,
//            activities, deliverables, responsibilities, tools
//   • Footer — Back to Methodology + See Full Methodology CTA
//
// Closes on ESC + backdrop click; locks body scroll while open.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, ArrowLeft, Clock, Wrench, FileCheck2, Users, Sparkles } from "lucide-react";
import IconByName from "../ui/IconByName";
import { useLanguage } from "../../context/LanguageContext";

export default function MethodologyModal({ step, stepTitle, stepNumber, totalSteps, onClose, onLearnMore }) {
  const { t } = useLanguage();
  // Close on ESC + lock body scroll while open.
  useEffect(() => {
    if (!step) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [step, onClose]);

  return (
    <AnimatePresence>
      {step && (
        <motion.div
          key="methodology-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="methodology-modal-title"
        >
          <div
            className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <ModalPanel
            step={step}
            stepTitle={stepTitle}
            stepNumber={stepNumber}
            totalSteps={totalSteps}
            onClose={onClose}
            onLearnMore={onLearnMore}
            t={t}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── ModalPanel ────────────────────────────────────────────────────────
function ModalPanel({ step, stepTitle, stepNumber, totalSteps, onClose, onLearnMore, t }) {
  const ordinal = `0${stepNumber}`;
  // Look up translated content for this step. The dictionary shape is
  // `methodologyDetails.${stepNumber}` with tagline, description, activities,
  // deliverables, responsibilities, stats, highlights, duration, tools.
  const detailKey = `methodologyDetails.${stepNumber}`;
  const tagline = t(`${detailKey}.tagline`);
  const description = t(`${detailKey}.description`);
  // For arrays / nested objects, fall back to the raw `step` data if the
  // translated value is missing or equal to the key itself.
  const rawActivities = step.activities || [];
  const rawDeliverables = step.deliverables || [];
  const rawResponsibilities = step.responsibilities || [];
  const rawStats = step.stats || [];
  const rawHighlights = step.highlights || [];
  const rawTools = step.tools || [];

  // Helper: try a translated list; if any item returns the same string as
  // the fallback key, treat it as "no translation" and render the English.
  // For simplicity we just call t() per-item and trust the dictionary.
  const items = (field, raw) => {
    const list = [];
    for (let i = 0; i < raw.length; i++) {
      const translated = t(`${detailKey}.${field}.${i}`);
      // If t() falls back to the dotted key (because a nested array lookup
      // failed), use the English source so we never display a raw key.
      list.push(
        translated && translated !== `${detailKey}.${field}.${i}` ? translated : raw[i]
      );
    }
    return list;
  };
  const activities = items("activities", rawActivities);
  const deliverables = items("deliverables", rawDeliverables);
  const highlights = items("highlights", rawHighlights);
  const tools = items("tools", rawTools);

  // Stats and responsibilities are arrays of objects; we translate label
  // values individually (the `value` field is mostly English units and
  // remains the same in both languages).
  const stats = rawStats.map((s) => ({
    value: s.value,
    label: (() => {
      const tr = t(`${detailKey}.stats.${rawStats.indexOf(s)}.label`);
      return tr && tr !== `${detailKey}.stats.${rawStats.indexOf(s)}.label` ? tr : s.label;
    })(),
  }));
  const responsibilities = rawResponsibilities.map((r, idx) => ({
    role: (() => {
      const tr = t(`${detailKey}.responsibilities.${idx}.role`);
      return tr && tr !== `${detailKey}.responsibilities.${idx}.role` ? tr : r.role;
    })(),
    description: (() => {
      const tr = t(`${detailKey}.responsibilities.${idx}.description`);
      return tr && tr !== `${detailKey}.responsibilities.${idx}.description` ? tr : r.description;
    })(),
  }));

  const duration = (() => {
    const tr = t(`${detailKey}.duration`);
    return tr && tr !== `${detailKey}.duration` ? tr : step.duration;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full sm:max-w-3xl lg:max-w-4xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl
                 max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
    >
      {/* ── Light header band — orange/blueprint treatment ────────── */}
      <div className="relative bg-gradient-to-br from-smsorange-50 via-white to-charcoal-50 text-charcoal-900 px-6 sm:px-8 pt-7 sm:pt-8 pb-8 overflow-hidden border-b border-charcoal-100">
        {/* Soft decorative orbs */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-smsorange-200/40 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-smsgold-400/15 blur-3xl" aria-hidden="true" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Large step number watermark + icon tile */}
            <div className="relative">
              <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-xl ${step.accent.chip} grid place-items-center shadow-sm ring-1 ${step.accent.ring}`}>
                <IconByName name={step.icon} className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
              </div>
              {/* Small step badge bottom-right of the icon tile */}
              <span className={`absolute -bottom-2 -right-2 h-7 min-w-7 px-1.5 rounded-full ${step.accent.bar} text-white text-xs font-bold grid place-items-center shadow-md tabular-nums`}>
                {ordinal}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-smsorange-600 font-semibold">
                <span>{t("modals.stepProgress")} {ordinal} {t("modals.of")} 0{totalSteps}</span>
                <span className="h-1 w-1 rounded-full bg-smsorange-400/60" />
                <span>{t("home.methodEyebrow")}</span>
              </div>
              <h2 id="methodology-modal-title" className="mt-1 font-display text-2xl sm:text-3xl font-bold leading-tight text-charcoal-900">
                {stepTitle}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-charcoal-600 italic">
                {tagline}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 h-9 w-9 rounded-md grid place-items-center text-charcoal-500 hover:text-charcoal-900
                       bg-white hover:bg-charcoal-50 border border-charcoal-200 transition
                       focus:outline-none focus:ring-2 focus:ring-smsorange-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step progress bar (light) */}
        <div className="relative mt-6 flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i + 1 <= stepNumber ? step.accent.bar : "bg-charcoal-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Body (scrollable) ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-7">
          <StepBody
            step={step}
            description={description}
            stats={stats}
            highlights={highlights}
            activities={activities}
            deliverables={deliverables}
            responsibilities={responsibilities}
            duration={duration}
            tools={tools}
            t={t}
          />
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-4 border-t border-charcoal-100 bg-charcoal-50/40">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-charcoal-700
                     border border-charcoal-200 bg-white hover:border-navy-400 hover:text-navy-700 transition
                     focus:outline-none focus:ring-2 focus:ring-navy-300"
        >
          <ArrowLeft className="h-4 w-4 rtl-flip-x" />
          {t("modals.backToMethodology")}
        </button>
        <button
          type="button"
          onClick={onLearnMore}
          className="inline-flex items-center gap-2 rounded-md bg-smsorange-500 hover:bg-smsorange-600 px-4 py-2 text-sm font-semibold text-white
                     shadow-sms-soft transition
                     focus:outline-none focus:ring-2 focus:ring-smsorange-400 focus:ring-offset-2"
        >
          {t("modals.seeFullMethodology")}
          <ArrowRight className="h-4 w-4 rtl-flip-x" />
        </button>
      </div>
    </motion.div>
  );
}

// ── StepBody ─────────────────────────────────────────────────────────
// All unique content for one step. Includes methodology-specific
// sections: Activities, Deliverables, Responsibilities, Tools, Duration.
function StepBody({ step, description, stats, highlights, activities, deliverables, responsibilities, duration, tools, t }) {
  return (
    <>
      <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed">
        {description}
      </p>

      {/* Duration + stats combined row */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-[auto_1fr] items-stretch">
        <div className="rounded-xl border border-smsorange-200 bg-smsorange-50/60 p-4 sm:p-5 flex items-center gap-3">
          <span className="h-10 w-10 rounded-md bg-white grid place-items-center shadow-sm">
            <Clock className={`h-5 w-5 ${step.accent.stat}`} />
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-smsorange-700 font-semibold">{t("modals.typicalDuration")}</div>
            <div className="font-display font-bold text-charcoal-900 text-lg">{duration}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-charcoal-100 bg-white p-3 sm:p-4 text-center
                         transition hover:border-smsorange-300 hover:shadow-sms-soft"
            >
              <div className={`font-display text-xl sm:text-2xl font-extrabold ${step.accent.stat}`}>
                {s.value}
              </div>
              <div className="mt-0.5 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-charcoal-500 font-semibold leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlight chips */}
      <div>
        <SectionLabel icon={<Sparkles className="h-3.5 w-3.5" />}>{t("modals.highlights")}</SectionLabel>
        <div className="mt-3 flex flex-wrap gap-2">
          {highlights.map((h) => (
            <span
              key={h}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${step.accent.chip}`}
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div>
        <SectionLabel icon={<Check className="h-3.5 w-3.5" />}>{t("modals.activitiesProcesses")}</SectionLabel>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2.5">
          {activities.map((a) => (
            <li
              key={a}
              className="flex items-start gap-2.5 rounded-lg bg-white border border-charcoal-100 p-3
                         transition hover:border-smsorange-300 hover:shadow-sms-soft"
            >
              <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${step.accent.chip}`}>
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-sm text-charcoal-800 leading-relaxed">{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Deliverables */}
      <div>
        <SectionLabel icon={<FileCheck2 className="h-3.5 w-3.5" />}>{t("modals.whatYouReceive")}</SectionLabel>
        <ul className="mt-3 rounded-xl border border-charcoal-100 bg-white divide-y divide-charcoal-100">
          {deliverables.map((d) => (
            <li
              key={d}
              className="flex items-start gap-3 p-3 sm:p-3.5 transition hover:bg-smsorange-50/40"
            >
              <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${step.accent.chip}`}>
                <ArrowRight className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-sm text-charcoal-800 leading-relaxed">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Responsibilities */}
      <div>
        <SectionLabel icon={<Users className="h-3.5 w-3.5" />}>{t("modals.whoDoesWhat")}</SectionLabel>
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          {responsibilities.map((r) => (
            <div
              key={r.role}
              className="rounded-xl border border-charcoal-100 bg-white p-4
                         transition hover:border-smsorange-300 hover:shadow-sms-soft hover:-translate-y-0.5"
            >
              <h4 className={`font-display font-bold text-sm ${step.accent.stat}`}>
                {r.role}
              </h4>
              <p className="mt-1 text-sm text-charcoal-600 leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <SectionLabel icon={<Wrench className="h-3.5 w-3.5" />}>{t("modals.toolsStandards")}</SectionLabel>
        <div className="mt-3 flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-1.5 rounded-md bg-charcoal-50 border border-charcoal-100 px-2.5 py-1.5 text-xs font-medium text-charcoal-700"
            >
              <Wrench className="h-3 w-3 text-charcoal-400" />
              {tool}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

// ── SectionLabel ──────────────────────────────────────────────────────
function SectionLabel({ children, icon }) {
  return (
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-charcoal-500 font-semibold">
      {icon}
      <span>{children}</span>
      <span className="h-px flex-1 bg-charcoal-200" />
    </div>
  );
}
