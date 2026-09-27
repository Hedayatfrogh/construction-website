import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";
import { sustainabilityPillars } from "../../data/safety";

export default function Sustainability() {
  return (
    <section className="sms-section bg-navy-800 text-white">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            light
            align="center"
            titleSize="lg"
            eyebrow="Sustainability"
            eyebrowClassName="!text-smsorange-500"
            title="Built responsibly — for communities and the planet"
            subtitle="From low-carbon concrete to rainwater harvesting and solar energy, sustainability is engineered into every SMS project."
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {sustainabilityPillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="sms-hover-card sms-hover-card--dark group h-full min-w-0 rounded-xl bg-white/5 border border-white/10 p-6">
                <div className="sms-hover-target sms-hover-target--icon h-11 w-11 rounded-md bg-smsgold-400/15 text-smsgold-400 grid place-items-center">
                  <IconByName name={p.icon} className="h-6 w-6" />
                </div>
                <h3 className="sms-hover-target sms-hover-target--title mt-4 font-display font-bold text-lg">{p.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-white/75">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2"><span className="text-smsgold-400">›</span>{pt}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/sustainability" className="sms-btn-secondary">
            Our Sustainability Program <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
