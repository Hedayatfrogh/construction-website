import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { safetyTopics, qualityTopics } from "../data/safety";

export default function SafetyQuality() {
  return (
    <>
      <PageHero eyebrow="Safety & Quality" title="Zero-harm culture, three-stage quality control"
        subtitle="Safety and quality are non-negotiable at SMS — embedded in every drawing, every site, and every handover."
        breadcrumbs={[{ label: "Safety & Quality" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
            <Reveal>
              <div className="rounded-2xl bg-navy-800 text-white p-8 md:p-10 h-full">
                <div className="sms-eyebrow !text-smsorange-400">Safety</div>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">A safe site is a productive site</h2>
                <p className="mt-4 text-white/70 leading-relaxed">SMS applies strict OHS regulations and UN safety standards across every project — risk assessments, hazard identification, PPE enforcement, training, drills, on-site safety officers, accident prevention, and unsafe practice prevention.</p>
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  {safetyTopics.map((t) => (
                    <div key={t.title} className="flex items-start gap-2 rounded-md bg-white/5 px-3 py-2.5">
                      <IconByName name={t.icon} className="h-4 w-4 mt-0.5 text-smsorange-400 flex-shrink-0" />
                      <span className="text-sm">{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-charcoal-50 border border-charcoal-100 p-8 md:p-10 h-full">
                <div className="sms-eyebrow">Quality</div>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-charcoal-900">Built right, verified at every stage</h2>
                <p className="mt-4 text-charcoal-600 leading-relaxed">Our quality framework follows ISO and international standards, Afghan National Building Code compliance, material verification, three-stage quality control (pre/during/post-construction), third-party QA, as-built documentation, compliance checks, and continuous improvement.</p>
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  {qualityTopics.map((t) => (
                    <div key={t.title} className="flex items-start gap-2 rounded-md bg-white px-3 py-2.5 border border-charcoal-100">
                      <IconByName name={t.icon} className="h-4 w-4 mt-0.5 text-smsgold-600 flex-shrink-0" />
                      <span className="text-sm text-charcoal-800">{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sms-section bg-navy-800 text-white">
        <div className="sms-container">
          <SectionHeader light align="center" eyebrow="Three-Stage Quality Control" title="Pre-construction · During · Post-construction" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Pre-Construction",   d: "Quality planning, method statements, material specifications, supplier qualification." },
              { t: "During Construction", d: "Daily inspections, material testing, stage inspections, third-party QA, schedule and cost control." },
              { t: "Post-Construction",  d: "Final inspections, as-built documentation, snagging, commissioning, defects liability." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <div className="h-full rounded-xl bg-white/5 border border-white/10 p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-smsgold-400 font-semibold">Stage {i+1}</div>
                  <h3 className="mt-2 font-display text-xl font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Discuss safety and quality for your project" />
    </>
  );
}
