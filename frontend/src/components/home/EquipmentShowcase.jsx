import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { equipmentCategories } from "../../data/operations";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";
import { useLanguage } from "../../context/LanguageContext";

export default function EquipmentShowcase() {
  const { t, lang } = useLanguage();
  return (
    <section className="sms-section bg-charcoal-50">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            align="center"
            titleSize="lg"
            eyebrow={t("home.equipEyebrow")}
            title={t("home.equipTitle")}
            subtitle={t("home.equipSubtitle")}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {equipmentCategories.map((cat, i) => {
            // Translated card heading + each equipment item.
            // Key shape:
            //   t(`equipmentCategories.${cat.title}.title`)
            //   t(`equipmentCategories.${cat.title}.items.${idx}`)
            // `cat.title` is the English title from data/operations.js, which
            // matches the dictionary keys.
            const cardTitle = t(`equipmentCategories.${cat.title}.title`);
            const translatedItems = cat.items.map((_it, idx) =>
              t(`equipmentCategories.${cat.title}.items.${idx}`)
            );
            // Each card is now a real <Link> to its dedicated detail page
            // (`/equipment/<slug>`), implemented by EquipmentCategory.jsx.
            // Browser back button works because we use react-router, not
            // a modal.
            return (
              <Reveal key={`${lang}-${cat.slug}-${cat.title}`} delay={i * 0.05}>
                <Link
                  to={`/equipment/${cat.slug}`}
                  className="sms-hover-card sms-hover-card--light group h-full rounded-xl bg-white p-6 border border-charcoal-100 shadow-sms-soft block focus:outline-none focus:ring-2 focus:ring-smsorange-400"
                  aria-label={cardTitle}
                >
                  <div className="flex items-center gap-3">
                    <div className="sms-hover-target sms-hover-target--icon h-11 w-11 rounded-md bg-navy-700 group-hover:bg-navy-600 text-smsgold-400 grid place-items-center">
                      <IconByName name={cat.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="sms-hover-target sms-hover-target--title font-display font-bold text-charcoal-900">{cardTitle}</h3>
                  </div>
                  <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-charcoal-600">
                    {translatedItems.map((it, idx) => (
                      <li key={`${lang}-${cat.slug}-${cat.title}-${idx}-${it}`} className="flex gap-1.5"><span className="text-smsorange-500">›</span>{it}</li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/equipment" className="sms-btn-ghost">
            {t("home.equipExplore")} <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>
    </section>
  );
}
