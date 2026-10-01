// components/home/PillarModal.jsx
// ─────────────────────────────────────────────────────────────────────────────
// A rich, dark-themed modal opened from the "Why SMS" section on the Home
// page. Each of the seven pillars opens its own modal with unique content.
// Closes on ESC + backdrop click; locks body scroll while open.
// Uses Framer Motion for the slide-up / fade-in entrance.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, ArrowLeft, Sparkles } from "lucide-react";
import IconByName from "../ui/IconByName";
import { useLanguage } from "../../context/LanguageContext";

export default function PillarModal({ pillar, pillarTitle, ordinal, onClose, onLearnMore }) {
  const { t } = useLanguage();
  // Close on ESC + lock body scroll while open.
  useEffect(() => {
    if (!pillar) return undefined;
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
  }, [pillar, onClose]);

  return (
    <AnimatePresence>
      {pillar && (
        <motion.div
          key="pillar-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pillar-modal-title"
        >
          <div
            className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <ModalPanel pillar={pillar} pillarTitle={pillarTitle} ordinal={ordinal} onClose={onClose} onLearnMore={onLearnMore} t={t} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── ModalPanel ────────────────────────────────────────────────────────
// The sliding panel itself — extracted so the parent component stays
// focused on open/close concerns (scroll lock, ESC).
function ModalPanel({ pillar, pillarTitle, ordinal, onClose, onLearnMore, t }) {
  // Look up translated content for this pillar. The dictionary shape is
  // `pillarDetails.${pillar.title}` with tagline, description, features,
  // benefits, stats, highlights.
  // `pillar` is the pillar object keyed by the value title.
  //
  // Defensive: if `pillar.title` is somehow missing we deliberately skip
  // the dictionary lookup (return empty strings) instead of producing
  // the "pillarDetails.undefined.*" string. The modal header (which uses
  // `pillarTitle`, an already-translated prop) keeps working either way.
  const title = pillar && pillar.title ? pillar.title : null;
  const detailKey = title ? `pillarDetails.${title}` : "";
  const tagline = detailKey ? t(`${detailKey}.tagline`) : "";
  const description = detailKey ? t(`${detailKey}.description`) : "";
  const features = (pillar.features || []).map((f, i) => {
    const tr = t(`${detailKey}.features.${i}`);
    return tr && tr !== `${detailKey}.features.${i}` ? tr : f;
  });
  const benefits = (pillar.benefits || []).map((b, i) => ({
    title: (() => {
      const tr = t(`${detailKey}.benefits.${i}.title`);
      return tr && tr !== `${detailKey}.benefits.${i}.title` ? tr : b.title;
    })(),
    description: (() => {
      const tr = t(`${detailKey}.benefits.${i}.description`);
      return tr && tr !== `${detailKey}.benefits.${i}.description` ? tr : b.description;
    })(),
  }));
  const stats = (pillar.stats || []).map((s, i) => ({
    value: s.value,
    label: (() => {
      const tr = t(`${detailKey}.stats.${i}.label`);
      return tr && tr !== `${detailKey}.stats.${i}.label` ? tr : s.label;
    })(),
  }));
  const highlights = (pillar.highlights || []).map((h, i) => {
    const tr = t(`${detailKey}.highlights.${i}`);
    return tr && tr !== `${detailKey}.highlights.${i}` ? tr : h;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full sm:max-w-3xl lg:max-w-4xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl
                 max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
    >
      {/* ── Dark navy header band ─────────────────────────────── */}
      <div className="relative bg-navy-800 text-white px-6 sm:px-8 pt-7 sm:pt-8 pb-8 overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-smsorange-500/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-smsgold-400/10 blur-3xl" aria-hidden="true" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-xl ${pillar.accent.chip} grid place-items-center shadow-lg ring-1 ${pillar.accent.ring}`}>
              <IconByName name={pillar.icon} className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-smsgold-400 font-semibold">
                {/* "Pillar 01" label — translated via modals.pillar so the
                    word "Pillar" switches between "Pillar" (en) and "ستون" (fa)
                    instantly when the user toggles the language. The ordinal
                    stays as-is (a numeric position, language-neutral). */}
                <span>{t("modals.pillar")} {ordinal}</span>
                <span className="h-1 w-1 rounded-full bg-smsgold-400/60" />
                <span>{t("home.whyEyebrow")}</span>
              </div>
              <h2 id="pillar-modal-title" className="mt-1 font-display text-2xl sm:text-3xl font-bold leading-tight">
                {pillarTitle}
              </h2>
              <p className="mt-1 text-sm sm:text-base text-smsgold-300/90 italic">
                {tagline}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("modals.close")}
            className="shrink-0 h-9 w-9 rounded-md grid place-items-center text-white/70 hover:text-white
                       bg-white/5 hover:bg-white/10 border border-white/10 transition
                       focus:outline-none focus:ring-2 focus:ring-smsorange-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Body (scrollable) ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto bg-charcoal-50">
        <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-7">
          <PillarBody
            pillar={pillar}
            description={description}
            features={features}
            stats={stats}
            highlights={highlights}
            benefits={benefits}
            t={t}
          />
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-4 border-t border-charcoal-100 bg-white">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-charcoal-700
                     border border-charcoal-200 hover:border-navy-400 hover:text-navy-700 transition
                     focus:outline-none focus:ring-2 focus:ring-navy-300"
        >
          <ArrowLeft className="h-4 w-4 rtl-flip-x" />
          {t("modals.backToWhy")}
        </button>
        <button
          type="button"
          onClick={onLearnMore}
          className="inline-flex items-center gap-2 rounded-md bg-smsorange-500 hover:bg-smsorange-600 px-4 py-2 text-sm font-semibold text-white
                     shadow-sms-soft transition
                     focus:outline-none focus:ring-2 focus:ring-smsorange-400 focus:ring-offset-2"
        >
          {t("modals.learnMoreWhy")}
          <ArrowRight className="h-4 w-4 rtl-flip-x" />
        </button>
      </div>
    </motion.div>
  );
}

// ── PillarBody ────────────────────────────────────────────────────────
// All unique content lives in this sub-component so the parent stays
// focused on chrome (open, close, scroll lock).
function PillarBody({ pillar, description, features, stats, highlights, benefits, t }) {
  return (
    <>
      <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed">
        {description}
      </p>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-charcoal-100 bg-white p-4 sm:p-5 text-center
                       transition hover:border-smsorange-300 hover:shadow-sms-soft"
          >
            <div className={`font-display text-2xl sm:text-3xl font-extrabold ${pillar.accent.stat}`}>
              {s.value}
            </div>
            <div className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-charcoal-500 font-semibold">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div>
        <SectionLabel icon={<Sparkles className="h-3.5 w-3.5" />}>{t("modals.highlights")}</SectionLabel>
        <div className="mt-3 flex flex-wrap gap-2">
          {highlights.map((h) => (
            <span
              key={h}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${pillar.accent.chip}`}
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>{t("modals.keyFeatures")}</SectionLabel>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2.5">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 rounded-lg bg-white border border-charcoal-100 p-3
                         transition hover:border-smsorange-300 hover:shadow-sms-soft"
            >
              <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${pillar.accent.chip}`}>
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-sm text-charcoal-800 leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <SectionLabel>{t("modals.benefitsForYou")}</SectionLabel>
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-charcoal-100 bg-white p-4 sm:p-5
                         transition hover:border-smsorange-300 hover:shadow-sms-soft hover:-translate-y-0.5"
            >
              <h4 className={`font-display font-bold text-base ${pillar.accent.stat}`}>
                {b.title}
              </h4>
              <p className="mt-1.5 text-sm text-charcoal-600 leading-relaxed">
                {b.description}
              </p>
            </div>
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
