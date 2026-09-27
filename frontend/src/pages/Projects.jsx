import { Link } from "react-router-dom";
import { Folder, MapPin, Calendar, ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";

export default function Projects() {
  return (
    <>
      <PageHero eyebrow="Projects" title="Our project portfolio"
        subtitle="The SMS project portfolio is published and managed from the Admin Panel."
        breadcrumbs={[{ label: "Projects" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader align="center" eyebrow="Completed Projects" title="Project portfolio will appear here"
            subtitle="Per the Company Profile, completed project details are not currently published. The CMS supports project name, category, location, client, dates, status, description, images, and gallery." />
          <Reveal>
            <div className="mt-12 rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 p-10 md:p-14 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-smsorange-50 text-smsorange-600 grid place-items-center"><Folder className="h-7 w-7" /></div>
              <h3 className="mt-4 font-display text-2xl font-bold text-charcoal-900">No projects published yet</h3>
              <p className="mt-2 text-charcoal-500 max-w-xl mx-auto">Once the Admin publishes projects, they will appear here with cover image, category, location, client, dates, status, and a detail page with gallery.</p>
              <Link to="/contact" className="mt-6 sms-btn-ghost inline-flex">Discuss your project <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>
      <CTASection title="Have a project for SMS?" subtitle="Tell us about the scope, location, and timeline." />
    </>
  );
}
