import { Clock } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { upcomingProjectCategories } from "../data/operations";

export default function UpcomingProjects() {
  return (
    <>
      <PageHero eyebrow="Upcoming Projects" title="Planned & upcoming project focus areas"
        subtitle="The categories below reflect SMS's planned and upcoming project focus. They are listed as planned, not as completed work."
        breadcrumbs={[{ label: "Upcoming Projects" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <div className="rounded-2xl border border-charcoal-100 bg-charcoal-50 p-6 md:p-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-smsorange-600 font-semibold"><Clock className="h-4 w-4" /> Planned / Upcoming</div>
            <p className="mt-2 text-charcoal-600 max-w-3xl">As a forward-looking firm, SMS is positioned to participate in upcoming projects across these sectors:</p>
            <Reveal>
              <div className="mt-6 flex flex-wrap gap-2">
                {upcomingProjectCategories.map((c) => (
                  <span key={c} className="inline-flex items-center rounded-full border border-charcoal-200 bg-white px-3 py-1.5 text-sm font-semibold text-charcoal-800 hover:border-smsorange-300 transition">{c}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <SectionHeader className="mt-16" eyebrow="Important Note" title="Planned vs. completed"
            subtitle="We do not present planned projects as completed projects. Once projects are delivered, they are published on the Projects page with full details." />
        </div>
      </section>
      <CTASection title="Partner with SMS on upcoming national projects" />
    </>
  );
}
