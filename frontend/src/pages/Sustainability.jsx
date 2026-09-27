import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { sustainabilityPillars } from "../data/safety";

export default function Sustainability() {
  return (
    <>
      <PageHero eyebrow="Sustainability" title="Built responsibly — for communities and the planet"
        subtitle="SMS designs sustainability into every project through energy efficiency, responsible materials, water stewardship, renewable energy, and environmental care."
        breadcrumbs={[{ label: "Sustainability" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader align="center" eyebrow="Five Pillars" title="How we engineer sustainability into every project" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {sustainabilityPillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-charcoal-100 bg-white p-6 hover:border-smsgold-400/60 hover:shadow-sms-strong transition">
                  <div className="h-12 w-12 rounded-md bg-smsgold-400/15 text-smsgold-600 grid place-items-center"><IconByName name={p.icon} className="h-6 w-6" /></div>
                  <h3 className="mt-4 font-display font-bold text-charcoal-900 text-lg">{p.title}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-charcoal-600">
                    {p.points.map((pt) => (<li key={pt} className="flex gap-2"><span className="text-smsgold-500">›</span>{pt}</li>))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Build greener with SMS" subtitle="Discuss your project's sustainability goals with our engineering team." />
    </>
  );
}
