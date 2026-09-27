import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { methodologySteps } from "../../data/content";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";

export default function Methodology() {
  return (
    <section className="sms-section bg-white">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            align="center"
            titleSize="lg"
            eyebrow="Our Methodology"
            title="A six-step process for predictable delivery"
            subtitle="From feasibility to handover, every SMS project follows a clear, repeatable, and quality-driven process."
          />
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-charcoal-200 to-transparent" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {methodologySteps.map((m, i) => (
              <Reveal key={m.step} delay={i * 0.05}>
                <div className="sms-hover-card sms-hover-card--light group relative h-full min-w-0 rounded-xl border border-charcoal-100 bg-white p-6 shadow-sms-soft">
                  <div className="flex items-center justify-between">
                    <div className="sms-hover-target sms-hover-target--icon h-11 w-11 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center">
                      <IconByName name={m.icon} className="h-6 w-6" />
                    </div>
                    <span className="sms-hover-target sms-hover-target--watermark font-display text-3xl font-extrabold text-charcoal-100">0{m.step}</span>
                  </div>
                  <h3 className="sms-hover-target sms-hover-target--title mt-4 font-display font-bold text-charcoal-900">{m.title}</h3>
                  <p className="mt-2 text-sm text-charcoal-500 leading-relaxed">{m.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/methodology" className="sms-btn-ghost">
            See Full Methodology <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
