import { Briefcase, MapPin } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import { useContentSection } from "../data/contentStore";

export default function Careers() {
  const jobs = useContentSection("jobs", []);
  const openJobs = jobs.filter((job) => job.isOpen !== false);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your future with SMS"
        subtitle="Explore current opportunities with our construction and engineering teams."
        breadcrumbs={[{ label: "Careers" }]}
      />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader
            eyebrow="Join our workforce"
            title="Open positions"
            subtitle="We welcome skilled professionals committed to safe, high-quality work."
          />
          {openJobs.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {openJobs.map((job) => (
                <article
                  key={job.id}
                  className="rounded-xl border border-charcoal-100 bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-xl font-bold text-charcoal-900">
                        {job.title}
                      </h2>
                      <p className="mt-1 text-sm text-charcoal-500">
                        {job.department}
                      </p>
                    </div>
                    <Briefcase className="h-5 w-5 shrink-0 text-smsorange-600" />
                  </div>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-charcoal-600">
                    <MapPin className="h-4 w-4 text-smsorange-600" />
                    {job.location} · {job.type}
                  </p>
                  {job.description && (
                    <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
                      {job.description}
                    </p>
                  )}
                  {job.requirements?.length > 0 && (
                    <ul className="mt-4 space-y-1 text-sm text-charcoal-600">
                      {job.requirements.map((requirement) => (
                        <li key={requirement}>• {requirement}</li>
                      ))}
                    </ul>
                  )}
                  <a
                    href="/contact"
                    className="mt-5 inline-flex text-sm font-semibold text-smsorange-700 hover:underline"
                  >
                    Contact us to apply
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-lg border border-charcoal-100 bg-charcoal-50 p-6 text-sm text-charcoal-600">
              There are no open positions right now. Please check again later.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
