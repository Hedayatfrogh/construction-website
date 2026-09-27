import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { upcomingProjectCategories } from "../../data/operations";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

export default function Upcoming() {
  return (
    <section className="sms-section bg-charcoal-50">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            align="center"
            titleSize="lg"
            eyebrow="Upcoming & Planned"
            title="Future projects across multiple sectors"
            subtitle="SMS is positioned to participate in upcoming projects across infrastructure, energy, healthcare, education, and smart urban development."
          />
        </div>
        <div className="sms-hover-card sms-hover-card--light group rounded-xl border border-charcoal-100 bg-white p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-smsorange-600 font-semibold">
            <Clock className="h-4 w-4" /> Planned / Upcoming
          </div>
          <p className="mt-2 text-sm text-charcoal-500 max-w-3xl">
            The categories below reflect SMS's planned and upcoming project focus. They are listed as planned, not as completed work.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {upcomingProjectCategories.map((c) => (
              <span key={c} className="sms-hover-pill inline-flex items-center rounded-full border border-charcoal-200 bg-white px-3 py-1.5 text-xs font-semibold text-charcoal-700">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/upcoming-projects" className="sms-btn-ghost">
            See All Categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
