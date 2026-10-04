import { Link } from "react-router-dom";
import { Folder, MapPin, Calendar, ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { useLanguage } from "../context/LanguageContext";
import { useContentSection } from "../data/contentStore";

export default function Projects() {
  const { t } = useLanguage();
  const savedProjects = useContentSection("projects", []);
  const projects = savedProjects.filter(
    (project) => project.isPublished !== false,
  );
  return (
    <>
      <PageHero
        eyebrow={t("projects.heroEyebrow")}
        title={t("projects.heroTitle")}
        subtitle={t("projects.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.projects") }]}
      />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader
            align="center"
            eyebrow={t("projects.eyebrow")}
            title={t("projects.title")}
            subtitle={t("projects.subtitle")}
          />
          {projects.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-xl border border-charcoal-100 bg-white"
                >
                  {project.coverImage && (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="h-52 w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-charcoal-500">
                      {project.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {project.location}
                        </span>
                      )}
                      {project.year && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {project.year}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-charcoal-900">
                      {project.title}
                    </h3>
                    {project.summary && (
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                        {project.summary}
                      </p>
                    )}
                    {project.status && (
                      <span className="mt-4 inline-block text-xs font-semibold text-smsorange-700">
                        {project.status}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mt-12 rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 p-10 md:p-14 text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-smsorange-50 text-smsorange-600 grid place-items-center">
                  <Folder className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-charcoal-900">
                  {t("projects.emptyTitle")}
                </h3>
                <p className="mt-2 text-charcoal-500 max-w-xl mx-auto">
                  {t("projects.emptyBody")}
                </p>
                <Link to="/contact" className="mt-6 sms-btn-ghost inline-flex">
                  {t("projects.discussCTA")}{" "}
                  <ArrowRight className="h-4 w-4 rtl-flip-x" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>
      <CTASection
        title={t("projects.ctaTitle")}
        subtitle={t("projects.ctaSubtitle")}
      />
    </>
  );
}
