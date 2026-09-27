import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { expansionGoals } from "../data/operations";

export default function ExpansionGoals() {
  return (
    <>
      <PageHero eyebrow="Expansion Goals" title="Where we are growing"
        subtitle="SMS is investing in geographical growth, service diversification, capacity enhancement, and public-private partnerships."
        breadcrumbs={[{ label: "Expansion Goals" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader align="center" eyebrow="Four Pillars of Expansion" title="How we scale to serve Afghanistan's development" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {expansionGoals.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-charcoal-100 bg-white p-7 hover:border-smsorange-300 hover:shadow-sms-strong transition">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center"><IconByName name={g.icon} className="h-6 w-6" /></div>
                    <h3 className="font-display font-bold text-charcoal-900 text-xl">{g.title}</h3>
                  </div>
                  <p className="mt-4 text-charcoal-600 leading-relaxed">{g.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Invest or partner with SMS" subtitle="Discuss expansion and partnership opportunities with our leadership." />
    </>
  );
}
