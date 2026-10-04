import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../data/content";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { useLanguage } from "../context/LanguageContext";
import { useContentSection } from "../data/contentStore";

export default function Services() {
  const { t, lang } = useLanguage();
  const savedServices = useContentSection("services", null);
  const hasSavedServices = Array.isArray(savedServices);
  const serviceList = hasSavedServices ? savedServices : services;
  // Resolve the translated items array for a given service slug. We try the
  // dictionary first (`t(\`services.${slug}.items\`)`); if the dictionary has
  // no translation yet, `t` falls back to the English string. To avoid
  // rendering English strings when language is Dari, we then substitute the
  // *Dari* items from the dictionary when available. This makes the cards
  // respond to the language switcher for every bullet point.
  const trItems = (service, count) => {
    if (hasSavedServices && lang === "en")
      return (service.items || []).slice(0, count);
    const slug = service.slug;
    const raw = t(`services.${slug}.items`);
    if (Array.isArray(raw)) return raw.slice(0, count);
    // Fallback to the static English list if the dictionary entry is missing.
    const fallback = services.find((s) => s.slug === slug)?.items || [];
    return fallback.slice(0, count);
  };
  return (
    <>
      <PageHero
        eyebrow={t("servicesPage.heroEyebrow")}
        title={t("servicesPage.heroTitle")}
        subtitle={t("servicesPage.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.services") }]}
      />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader
            align="center"
            eyebrow={t("servicesPage.eyebrow")}
            title={t("servicesPage.title")}
            subtitle={t("servicesPage.subtitle")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceList.map((s, i) => {
              const items = trItems(s, 6);
              return (
                <Reveal key={s.slug} delay={i * 0.05}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="sms-card group h-full flex flex-col p-7"
                  >
                    <div className="h-12 w-12 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center group-hover:bg-smsorange-500 group-hover:text-white transition">
                      <IconByName name={s.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-charcoal-900 group-hover:text-smsorange-600 transition">
                      {hasSavedServices && lang === "en"
                        ? s.title
                        : t(`services.${s.slug}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-charcoal-500 leading-relaxed flex-1">
                      {hasSavedServices && lang === "en"
                        ? s.description || s.summary
                        : t(`services.${s.slug}.description`)}
                    </p>
                    <ul className="mt-4 grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-charcoal-600">
                      {items.map((it, idx) => (
                        <li
                          key={`${s.slug}-${idx}-${it}`}
                          className="flex gap-1"
                        >
                          <span className="text-smsorange-500">›</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-smsorange-600">
                      {t("servicesPage.learnMore")}{" "}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 rtl-flip-x" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection
        title={t("servicesPage.ctaTitle")}
        subtitle={t("servicesPage.ctaSubtitle")}
      />
    </>
  );
}
