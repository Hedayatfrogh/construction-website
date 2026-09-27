import { Link } from "react-router-dom";
import { ArrowRight, Handshake } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

export default function Clients() {
  // The Company Profile contains a Major Clients section but does not provide actual client names.
  // We render an honest empty-state placeholder rather than fabricating names.
  return (
    <section className="sms-section bg-white">
      <div className="sms-container">
        <SectionHeader
          eyebrow="Our Clients"
          title="Trusted by partners across the public and private sector"
          subtitle="SMS serves a wide range of clients. The full client portfolio is configured from the Admin Panel."
          align="center"
          titleSize="lg"
        />
        <Reveal>
          <div className="mt-12 rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 p-10 md:p-14 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-smsorange-50 text-smsorange-600 grid place-items-center">
              <Handshake className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-charcoal-900">Client portfolio to be added</h3>
            <p className="mt-2 text-charcoal-500 max-w-xl mx-auto">
              The Company Profile includes a Major Clients section, but actual client names are not listed in the available text.
              Please add your clients (name, logo, website, category) through the Admin Panel so they appear here.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 flex justify-end">
          <Link to="/clients" className="sms-btn-ghost">
            Go to Clients Page <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
