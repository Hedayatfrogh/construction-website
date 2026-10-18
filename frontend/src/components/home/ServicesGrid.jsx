import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../../data/content";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";
import { useLanguage } from "../../context/LanguageContext";
import { useContentSection } from "../../data/contentStore";
import buildingConstruction from "../../assets/AboutWork/01_building_construction.jpg";
import roadConstruction from "../../assets/AboutWork/02_road_construction.jpg";
import bridgeConstruction from "../../assets/AboutWork/03_bridge_construction.jpg";
import heavyMachinery from "../../assets/AboutWork/04_heavy_machinery.jpg";
import siteTeamBriefing from "../../assets/AboutHome/01_site_team_briefing.png";
import engineerOverseeingSite from "../../assets/AboutHome/02_engineer_overseeing_site.png";
import constructionTeam from "../../assets/AboutHome/03_construction_team.png";

const SERVICE_IMAGES = {
  "building-construction": buildingConstruction,
  "infrastructure-development": roadConstruction,
  "rehabilitation-renovation": engineerOverseeingSite,
  "water-supply-irrigation": bridgeConstruction,
  "energy-solutions": siteTeamBriefing,
  "waste-management-sanitation": heavyMachinery,
  "landscaping-parks": constructionTeam,
};

export default function ServicesGrid() {
  const { t, lang } = useLanguage();
  const savedServices = useContentSection("services", null);
  const hasSavedServices = Array.isArray(savedServices);
  const serviceList = hasSavedServices ? savedServices : services;
  const tr = (slug, field) => t(`services.${slug}.${field}`);
  return (
    <section id="services" className="sms-section bg-navy-800 text-white scroll-mt-24">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            light
            align="center"
            titleSize="lg"
            eyebrow={t("home.servicesEyebrow")}
            eyebrowClassName="!text-smsorange-500"
            title={t("home.servicesTitle")}
            subtitle={t("home.servicesSubtitle")}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceList.map((s, i) => {
            const title =
              hasSavedServices && lang === "en"
                ? s.title
                : tr(s.slug, "title") !== `services.${s.slug}.title`
                  ? tr(s.slug, "title")
                  : s.title;
            const summary =
              hasSavedServices && lang === "en"
                ? s.summary
                : tr(s.slug, "summary") !== `services.${s.slug}.summary`
                  ? tr(s.slug, "summary")
                  : s.summary;
            const image = SERVICE_IMAGES[s.slug];
            return (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link
                  to={`/services/${s.slug}`}
                  state={{ from: "/#services" }}
                  className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-smsgold-400/60"
                >
                  {image && (
                    <img
                      src={image}
                      alt={title}
                      className="h-40 w-full object-cover sm:h-44"
                    />
                  )}
                  <div className="flex flex-1 flex-col px-5 pb-6">
                    <div className="-mt-6 mb-4 h-11 w-11 rounded-lg bg-smsorange-50 text-smsorange-600 grid place-items-center shadow-sms-soft ring-4 ring-navy-800 group-hover:bg-smsorange-500 group-hover:text-white transition">
                      <IconByName name={s.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-smsorange-400 transition">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed flex-1">
                      {summary}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-smsorange-500">
                      {t("home.servicesExplore")}{" "}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 rtl-flip-x" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/services" className="sms-btn-secondary">
            {t("home.servicesViewAll")}{" "}
            <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>
    </section>
  );
}
