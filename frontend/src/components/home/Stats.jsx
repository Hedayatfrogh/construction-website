import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, FileText, Shield, Building2 } from "lucide-react";
import { verifiedStats } from "../../data/company";
import Reveal from "../ui/Reveal";

const iconMap = { Calendar, FileText, Shield, Building2 };

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
  return (
    <section className="bg-navy-800 text-white">
      <div className="sms-container py-14 md:py-20">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {verifiedStats.map((s, i) => {
              const Icon = iconMap[s.icon] || Building2;
              const numeric = Number(String(s.value).replace(/\D/g, ""));
              const isNumeric = numeric > 0 && String(numeric) === String(s.value);
              return (
                <div key={s.label} className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:border-smsorange-500/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-smsorange-500/15 grid place-items-center text-smsorange-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">{s.label}</div>
                  </div>
                  <div className="mt-4 font-display text-3xl md:text-4xl font-extrabold">
                    {isNumeric ? <Counter to={numeric} /> : s.value}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-white/50 max-w-3xl">
            We display only verified company facts from the Company Profile. Project counts, employee totals, and client counts are intentionally not stated and can be configured by the Admin Panel.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
