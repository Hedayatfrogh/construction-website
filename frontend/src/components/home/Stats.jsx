import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, FileText, Shield, Building2 } from "lucide-react";
import { verifiedStats } from "../../data/company";
import Reveal from "../ui/Reveal";
import { useLanguage } from "../../context/LanguageContext";

const iconMap = { Calendar, FileText, Shield, Building2 };

// Map the English label keys in `verifiedStats` to translation keys, so
// the stats section picks up the right word in each language without
// duplicating the data file.
const labelKeyMap = {
  "Founded":          "stats.foundedLabel",
  "Registration No.": "stats.regLabel",
  "License No.":      "stats.licenseLabel",
  "TIN":              "stats.tinLabel",
};

function Counter({ from = 0, to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(from);
  const rounded = useTransform(value, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 1.6, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [inView, to, value, rounded]);

  return <span ref={ref}>{display}</span>;
}

export default function Stats() {
  const { t } = useLanguage();
  return (
    <section className="bg-navy-800 text-white">
      <div className="sms-container py-14 md:py-20">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {verifiedStats.map((s) => {
              const Icon = iconMap[s.icon] || Building2;
              const numeric = Number(String(s.value).replace(/\D/g, ""));
              const isNumeric = numeric > 0 && String(numeric) === String(s.value);
              const label = labelKeyMap[s.label] ? t(labelKeyMap[s.label]) : s.label;
              return (
                <div key={s.label} className="group min-w-0 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-6 hover:border-smsorange-500/50 transition">
                  <div className="flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-md bg-smsorange-500/15 grid place-items-center text-smsorange-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 break-normal text-[10px] uppercase tracking-[0.08em] text-white/60 sm:tracking-[0.2em]">{label}</div>
                  </div>
                  <div className="mt-3 min-w-0 whitespace-nowrap font-display text-[clamp(0.75rem,3.8vw,1.25rem)] leading-tight font-extrabold sm:mt-4 sm:text-3xl md:text-4xl">
                    {s.label === "Founded" ? (
                      s.value
                    ) : isNumeric ? (
                      <Counter to={numeric} />
                    ) : (
                      s.value
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-white/50 max-w-3xl">{t("home.statsFooter")}</p>
        </Reveal>
      </div>
    </section>
  );
}
