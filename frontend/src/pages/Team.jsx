import { Users, UserCheck } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { workforce } from "../data/operations";
import { useLanguage } from "../context/LanguageContext";
import { useContentSection } from "../data/contentStore";

export default function Team() {
  const { t, lang } = useLanguage();
  const savedMembers = useContentSection("teamMembers", []);
  const members = savedMembers.filter((member) => member.isPublished !== false);
  // Pull translated workforce lists from the dictionary.
  const engineeringRoles = t("workforce.engineering");
  const skilledRoles = t("workforce.skilled");
  const engineeringList = Array.isArray(engineeringRoles)
    ? engineeringRoles
    : workforce.engineering;
  const skilledList = Array.isArray(skilledRoles)
    ? skilledRoles
    : workforce.skilledLabor;

  return (
    <>
      <PageHero
        eyebrow={t("team.heroEyebrow")}
        title={t("team.heroTitle")}
        subtitle={t("team.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.team") }]}
      />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader
            align="center"
            eyebrow={t("team.eyebrow")}
            title={t("team.title")}
            subtitle={t("team.subtitle")}
          />
          {members.length > 0 && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <article
                  key={member.id}
                  className="overflow-hidden rounded-xl border border-charcoal-100 bg-white"
                >
                  {member.photo && (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-64 w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-charcoal-900">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-smsorange-700">
                      {member.role}
                    </p>
                    {member.department && (
                      <p className="mt-1 text-xs text-charcoal-500">
                        {member.department}
                      </p>
                    )}
                    {member.bio && (
                      <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl bg-navy-800 text-white p-8">
                <div className="flex items-center gap-3">
                  <span className="h-12 w-12 rounded-md bg-smsorange-500/20 text-smsorange-400 grid place-items-center">
                    <Users className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-smsgold-400 font-semibold">
                      {t("team.engineeringLabel")}
                    </div>
                    <h3 className="mt-1 font-display text-2xl font-bold">
                      {t("team.engineeringTitle")}
                    </h3>
                  </div>
                </div>
                <ul className="mt-6 grid sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                  {engineeringList.map((r) => (
                    <li key={`eng-${lang}-${r}`} className="flex gap-2">
                      <span className="text-smsorange-400">›</span>
                      <span className="text-white/85">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl bg-navy-800 text-white p-8">
                <div className="flex items-center gap-3">
                  <span className="h-12 w-12 rounded-md bg-smsgold-400/15 text-smsgold-400 grid place-items-center">
                    <UserCheck className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-smsgold-400 font-semibold">
                      {t("team.skilledLabel")}
                    </div>
                    <h3 className="mt-1 font-display text-2xl font-bold">
                      {t("team.skilledTitle")}
                    </h3>
                  </div>
                </div>
                <ul className="mt-6 grid sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                  {skilledList.map((r) => (
                    <li key={`skl-${lang}-${r}`} className="flex gap-2">
                      <span className="text-smsorange-400">›</span>
                      <span className="text-white/85">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <CTASection title={t("team.ctaTitle")} subtitle={t("team.ctaSubtitle")} />
    </>
  );
}
