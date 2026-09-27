import { Link } from "react-router-dom";
import { Handshake, ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";

export default function Clients() {
  return (
    <>
      <PageHero eyebrow="Clients" title="Our client portfolio"
        subtitle="SMS serves public and private sector clients across Afghanistan. Client logos and details are managed from the Admin Panel."
        breadcrumbs={[{ label: "Clients" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader align="center" eyebrow="Major Clients" title="Trusted across multiple sectors"
            subtitle="The Company Profile includes a Major Clients section, but does not list specific client names. We do not fabricate names." />
          <Reveal>
            <div className="mt-12 rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 p-10 md:p-14 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-smsorange-50 text-smsorange-600 grid place-items-center"><Handshake className="h-7 w-7" /></div>
              <h3 className="mt-4 font-display text-2xl font-bold text-charcoal-900">Client portfolio to be added</h3>
              <p className="mt-2 text-charcoal-500 max-w-xl mx-auto">Add clients (name, logo, website, description, category, display order) via the Admin Panel so they appear on this page.</p>
              <Link to="/contact" className="mt-6 sms-btn-ghost inline-flex">Become a client <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>
      <CTASection title="Become a client of SMS" subtitle="Let's discuss your construction or engineering project." />
    </>
  );
}
