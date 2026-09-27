import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { equipmentCategories } from "../../data/operations";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";

export default function EquipmentShowcase() {
  return (
    <section className="sms-section bg-charcoal-50">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            align="center"
            titleSize="lg"
            eyebrow="Equipment & Machinery"
            title="A modern fleet, ready for any terrain"
            subtitle="From earthmoving to finishing, our equipment categories cover the full lifecycle of a construction project."
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {equipmentCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.05}>
              <div className="sms-hover-card sms-hover-card--light group h-full rounded-xl bg-white p-6 border border-charcoal-100 shadow-sms-soft">
                <div className="flex items-center gap-3">
                  <div className="sms-hover-target sms-hover-target--icon h-11 w-11 rounded-md bg-navy-700 group-hover:bg-navy-600 text-smsgold-400 grid place-items-center">
                    <IconByName name={cat.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="sms-hover-target sms-hover-target--title font-display font-bold text-charcoal-900">{cat.title}</h3>
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-charcoal-600">
                  {cat.items.map((it) => (
                    <li key={it} className="flex gap-1.5"><span className="text-smsorange-500">›</span>{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/equipment" className="sms-btn-ghost">
            Explore All Equipment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
