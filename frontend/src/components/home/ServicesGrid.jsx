import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../../data/content";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";
import { useLanguage } from "../../context/LanguageContext";

export default function ServicesGrid() {
  const { t, lang } = useLanguage();
  // Look up translated service titles/summaries from the dictionary, falling
  // back to the English data file values when a key is missing.
  const tr = (slug, field) => t(`services.${slug}.${field}`);
  return (
    <section id="services" className="sms-section bg-white scroll-mt-24">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            align="center"
            titleSize="lg"
            eyebrow={t("home.servicesEyebrow")}
            title={t("home.servicesTitle")}
            subtitle={t("home.servicesSubtitle")}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => {
            const title = tr(s.slug, "title") !== `services.${s.slug}.title` ? tr(s.slug, "title") : s.title;
            const summary = tr(s.slug, "summary") !== `services.${s.slug}.summary` ? tr(s.slug, "summary") : s.summary;
            return (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link to={`/services/${s.slug}`} state={{ from: "/#services" }} className="sms-card group h-full flex flex-col p-6">
                  <div className="h-12 w-12 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center group-hover:bg-smsorange-500 group-hover:text-white transition">
                    <IconByName name={s.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-charcoal-900 group-hover:text-smsorange-600 transition">{title}</h3>
                  <p className="mt-2 text-sm text-charcoal-500 leading-relaxed flex-1">{summary}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-smsorange-600">
                    {t("home.servicesExplore")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 rtl-flip-x" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/services" className="sms-btn-ghost">
            {t("home.servicesViewAll")} <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>
    </section>
  );
}
