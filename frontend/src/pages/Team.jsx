import { Users, UserCheck } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { workforce } from "../data/operations";

export default function Team() {
  return (
    <>
      <PageHero eyebrow="Team" title="Our people make SMS"
        subtitle="An engineering & technical team supported by skilled tradespeople — covering every discipline needed to deliver complex construction projects."
        breadcrumbs={[{ label: "Team" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader align="center" eyebrow="Our Workforce" title="Engineering & technical, plus skilled labor"
            subtitle="Specific team members (name, photo, position, department, biography, contact) are managed from the Admin Panel." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl bg-navy-800 text-white p-8">
                <div className="flex items-center gap-3">
                  <span className="h-12 w-12 rounded-md bg-smsorange-500/20 text-smsorange-400 grid place-items-center"><Users className="h-6 w-6" /></span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-smsgold-400 font-semibold">Engineering & Technical</div>
                    <h3 className="mt-1 font-display text-2xl font-bold">Technical team roles</h3>
                  </div>
                </div>
                <ul className="mt-6 grid sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                  {workforce.engineering.map((r) => (<li key={r} className="flex gap-2"><span className="text-smsorange-400">›</span><span className="text-white/85">{r}</span></li>))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl bg-navy-800 text-white p-8">
                <div className="flex items-center gap-3">
                  <span className="h-12 w-12 rounded-md bg-smsgold-400/15 text-smsgold-400 grid place-items-center"><UserCheck className="h-6 w-6" /></span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-smsgold-400 font-semibold">Skilled Labor</div>
                    <h3 className="mt-1 font-display text-2xl font-bold">Skilled trade roles</h3>
                  </div>
                </div>
                <ul className="mt-6 grid sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                  {workforce.skilledLabor.map((r) => (<li key={r} className="flex gap-2"><span className="text-smsorange-400">›</span><span className="text-white/85">{r}</span></li>))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <CTASection title="Join the SMS team" subtitle="We're always looking for skilled engineers and tradespeople." />
    </>
  );
}
