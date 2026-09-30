import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";
import { equipmentCategories } from "../data/operations";
import { useLanguage } from "../context/LanguageContext";

export default function Equipment() {
  const { t, lang } = useLanguage();
  return (
    <>
      <PageHero eyebrow={t("equipment.heroEyebrow")} title={t("equipment.heroTitle")}
        subtitle={t("equipment.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.equipment") }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader eyebrow={t("equipment.eyebrow")} title={t("equipment.title")}
            subtitle={t("equipment.subtitle")} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {equipmentCategories.map((cat, i) => {
              // Translated card heading + each equipment item.
              const cardTitle = t(`equipmentCategories.${cat.title}.title`);
              const translatedItems = cat.items.map((_it, idx) =>
                t(`equipmentCategories.${cat.title}.items.${idx}`)
              );
              // Each card is now a real <Link> to its dedicated detail page
              // (`/equipment/<slug>`), implemented by EquipmentCategory.jsx.
              return (
                <Reveal key={`${lang}-${cat.slug}-${cat.title}`} delay={i * 0.05}>
                  <Link
                    to={`/equipment/${cat.slug}`}
                    className="h-full rounded-xl border border-charcoal-100 bg-white p-7 hover:border-smsorange-300 hover:shadow-sms-strong transition block focus:outline-none focus:ring-2 focus:ring-smsorange-400"
                    aria-label={cardTitle}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md bg-navy-700 text-smsgold-400 grid place-items-center"><IconByName name={cat.icon} className="h-6 w-6" /></div>
                      <h3 className="font-display font-bold text-charcoal-900 text-lg">{cardTitle}</h3>
                    </div>
                    <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 text-sm text-charcoal-600">
                      {translatedItems.map((it, idx) => (
                        <li key={`${lang}-${cat.slug}-${cat.title}-${idx}-${it}`} className="flex gap-1.5"><span className="text-smsorange-500">›</span>{it}</li>
                      ))}
                    </ul>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection title={t("equipment.ctaTitle")} subtitle={t("equipment.ctaSubtitle")} />
    </>
  );
}
