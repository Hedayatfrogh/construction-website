import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { methodologySteps } from "../data/content";

export default function Methodology() {
  return (
    <>
      <PageHero eyebrow="Methodology" title="Our six-step project methodology"
        subtitle="A clear, repeatable, quality-driven process — from feasibility to handover and aftercare."
        breadcrumbs={[{ label: "Methodology" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-charcoal-200 to-transparent" />
            <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-6">
              {methodologySteps.map((m, i) => (
                <Reveal key={m.step} delay={i * 0.05}>
                  <div className="relative h-full rounded-xl border border-charcoal-100 bg-white p-6 hover:border-smsorange-300 hover:shadow-sms-strong transition">
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center"><IconByName name={m.icon} className="h-6 w-6" /></div>
                      <span className="font-display text-3xl font-extrabold text-charcoal-100">0{m.step}</span>
                    </div>
                    <h3 className="mt-4 font-display font-bold text-charcoal-900">{m.title}</h3>
                    <p className="mt-2 text-sm text-charcoal-500 leading-relaxed">{m.description}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-charcoal-600">
                      {m.points.map((p) => (<li key={p} className="flex gap-2"><span className="text-smsorange-500">›</span>{p}</li>))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection title="Start with a feasibility study" subtitle="Our first methodology step is the foundation of every successful SMS project." />
    </>
  );
}
