import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { values } from "../../data/content";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

export default function WhySMS() {
  return (
    <section className="sms-section bg-charcoal-50">
      <div className="sms-container">
        <SectionHeader
          eyebrow="Why SMS"
          title="Engineering excellence, built on seven pillars"
          subtitle="Our values shape every drawing, every site, and every handover."
          align="center"
          titleSize="lg"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="sms-hover-card sms-hover-card--light group h-full rounded-xl bg-white p-6 border border-charcoal-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="sms-hover-target sms-hover-target--icon font-display text-2xl font-bold text-smsorange-500">0{i+1}</span>
                  <span className="sms-hover-target sms-hover-target--rule h-px flex-1 bg-charcoal-200" />
                </div>
                <h3 className="sms-hover-target sms-hover-target--title mt-4 font-display font-bold text-charcoal-900 text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-charcoal-500 leading-relaxed">{v.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/about" className="sms-btn-ghost">
            Learn More About SMS <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
