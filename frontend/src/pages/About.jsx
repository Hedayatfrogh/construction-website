import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { company, vision, mission } from "../data/company";
import { values } from "../data/content";

const infoRows = [
  { label: "Company Name",       value: company.name },
  { label: "Short Name",         value: company.shortName },
  { label: "Tagline",            value: company.tagline },
  { label: "Established",        value: company.established },
  { label: "Registration Number",value: company.registrationNumber },
  { label: "License Number",     value: company.licenseNumber },
  { label: "TIN Number",         value: company.tinNumber },
  { label: "UNGM Number",        value: company.ungmNumber || "Editable in Admin" },
  { label: "Phone",              value: company.phone },
  { label: "Email",              value: company.email || "Editable in Admin" },
  { label: "Main Office",        value: company.offices.main },
  { label: "Branch Office",      value: company.offices.branch },
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About SMS" title="Building Afghanistan's future, one project at a time."
        subtitle="SMS is an Afghan construction and engineering firm delivering buildings, infrastructure, water systems, energy, and rehabilitation works."
        breadcrumbs={[{ label: "About" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container grid gap-12 xl:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <SectionHeader eyebrow="Company Overview" title="Who we are" />
            <div className="mt-6 space-y-4 text-charcoal-600 leading-relaxed">
              <p>Sayed Musawer Sadat Construction and Engineering Design Company (SMS) is an Afghan construction and engineering firm providing full-scope design, build, and rehabilitation services for public and private clients.</p>
              <p>Our capabilities span building construction (villas to high-rises), infrastructure development (roads, highways, bridges, culverts), rehabilitation and renovation, water supply &amp; irrigation systems, renewable energy, waste management &amp; sanitation, and landscaping &amp; parks.</p>
              <p>We combine an experienced engineering &amp; technical workforce with skilled trades, modern equipment, and a strict quality, safety, and sustainability framework.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-charcoal-100 bg-charcoal-50 p-6">
              <div className="sms-eyebrow">Vision</div>
              <p className="mt-3 text-charcoal-800 leading-relaxed font-medium">{vision}</p>
              <div className="mt-6 sms-eyebrow">Mission</div>
              <p className="mt-3 text-charcoal-800 leading-relaxed font-medium">{mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sms-section bg-charcoal-50">
        <div className="sms-container">
          <SectionHeader eyebrow="Company Information" title="The verified facts about SMS"
            subtitle="Drawn directly from the Company Profile. Empty fields are intentionally left blank for the Admin to fill in." />
          <Reveal>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {infoRows.map((r) => (
                <div key={r.label} className="rounded-xl border border-charcoal-100 bg-white p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal-500 font-semibold">{r.label}</div>
                  <div className="mt-2 text-charcoal-900 font-semibold leading-snug">{r.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader align="center" eyebrow="Our Values" title="The principles that guide every project" subtitle="Seven values shape our culture and our work." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-charcoal-100 bg-white p-6 hover:border-smsorange-300 hover:shadow-sms-strong transition">
                  <div className="font-display text-3xl font-extrabold text-smsorange-500">0{i+1}</div>
                  <h3 className="mt-2 font-display font-bold text-charcoal-900 text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm text-charcoal-500 leading-relaxed">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Want to know more about SMS?" subtitle="Talk to our team about your construction or engineering project." />
    </>
  );
}
