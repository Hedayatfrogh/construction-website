import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { workforce } from "../../data/operations";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

export default function Workforce() {
  return (
    <section className="sms-section bg-white">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            align="center"
            titleSize="lg"
            eyebrow="Our Workforce"
            title="Engineers, specialists, and skilled tradespeople"
            subtitle="Our combined engineering & technical teams plus skilled labor cover every discipline needed to deliver complex projects."
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl bg-navy-800 text-white p-8">
              <div className="text-xs uppercase tracking-[0.2em] text-smsgold-400 font-semibold">Engineering & Technical</div>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {workforce.engineering.map((r) => (
                  <div key={r} className="flex gap-2"><span className="text-smsorange-400">›</span><span className="text-white/85">{r}</span></div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-xl bg-navy-800 text-white p-8">
              <div className="text-xs uppercase tracking-[0.2em] text-smsgold-400 font-semibold">Skilled Labor</div>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {workforce.skilledLabor.map((r) => (
                  <div key={r} className="flex gap-2"><span className="text-smsorange-400">›</span><span className="text-white/85">{r}</span></div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/team" className="sms-btn-ghost">
            Meet The Team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
