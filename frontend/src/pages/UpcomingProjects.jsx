import { Clock } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { upcomingProjectCategories } from "../data/operations";
import { useLanguage } from "../context/LanguageContext";
import { useContentSection } from "../data/contentStore";

export default function UpcomingProjects() {
  const { t } = useLanguage();
  const savedProjects = useContentSection("upcomingProjects", []);
  const projects = savedProjects.filter(
    (project) => project.isPublished !== false,
  );
  return (
    <>
      <PageHero
        eyebrow={t("upcomingProjects.heroEyebrow")}
        title={t("upcomingProjects.heroTitle")}
        subtitle={t("upcomingProjects.heroSubtitle")}
        breadcrumbs={[{ label: t("upcomingProjects.heroEyebrow") }]}
      />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <div className="rounded-2xl border border-charcoal-100 bg-charcoal-50 p-6 md:p-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-smsorange-600 font-semibold">
              <Clock className="h-4 w-4" /> {t("common.planned")}
            </div>
            <p className="mt-2 text-charcoal-600 max-w-3xl">
              {t("upcomingProjects.intro")}
            </p>
            <Reveal>
              <div className="mt-6 flex flex-wrap gap-2">
                {upcomingProjectCategories.map((c) => (
                  <span
                    key={c.key}
                    className="inline-flex items-center rounded-full border border-charcoal-200 bg-white px-3 py-1.5 text-sm font-semibold text-charcoal-800 hover:border-smsorange-300 transition"
                  >
                    {/* `t(c.key)` swaps between Dari and English instantly
                        when the user toggles the navbar language switcher.
                        `c.label` is the English source string used by
                        `translate()` as a fallback if a key is ever missing. */}
                    {t(c.key)}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          {projects.length > 0 && (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-xl border border-charcoal-100 bg-white"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-charcoal-900">
                      {project.title}
                    </h3>
                    {project.location && (
                      <p className="mt-1 text-xs text-charcoal-500">
                        {project.location}
                      </p>
                    )}
                    {project.description && (
                      <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
                        {project.description}
                      </p>
                    )}
                    {project.targetDate && (
                      <p className="mt-3 text-xs font-semibold text-smsorange-700">
                        {project.targetDate}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
          <SectionHeader
            className="mt-16"
            eyebrow={t("upcomingProjects.noteEyebrow")}
            title={t("upcomingProjects.noteTitle")}
            subtitle={t("upcomingProjects.noteSubtitle")}
          />
        </div>
      </section>
      <CTASection title={t("upcomingProjects.ctaTitle")} />
    </>
  );
}
