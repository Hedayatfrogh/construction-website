import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { equipmentCategories } from "../data/operations";

export default function Equipment() {
  return (
    <>
      <PageHero eyebrow="Equipment" title="A modern fleet for every construction phase"
        subtitle="Our equipment categories cover earthmoving, concrete & roads, material handling, drilling & foundations, demolition & finishing, and supporting equipment."
        breadcrumbs={[{ label: "Equipment" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader eyebrow="Equipment Categories" title="Six categories, fully supported by the CMS"
            subtitle="Specific equipment items, models, quantities, and statuses are managed from the Admin Panel — we don't publish quantities that aren't verified." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {equipmentCategories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-charcoal-100 bg-white p-7 hover:border-smsorange-300 hover:shadow-sms-strong transition">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md bg-navy-700 text-smsgold-400 grid place-items-center"><IconByName name={cat.icon} className="h-6 w-6" /></div>
                    <h3 className="font-display font-bold text-charcoal-900 text-lg">{cat.title}</h3>
                  </div>
                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 text-sm text-charcoal-600">
                    {cat.items.map((it) => (<li key={it} className="flex gap-1.5"><span className="text-smsorange-500">›</span>{it}</li>))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Need equipment for your project?" subtitle="SMS offers equipment-as-part-of-contract for complex projects." />
    </>
  );
}
