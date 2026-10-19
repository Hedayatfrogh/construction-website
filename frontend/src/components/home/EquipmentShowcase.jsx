import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { equipmentCategories } from "../../data/operations";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";
import { useLanguage } from "../../context/LanguageContext";
import { useContentSection } from "../../data/contentStore";
import equipmentExcavator from "../../assets/Equipment/03_excavator.png";
import equipmentConcreteMixer from "../../assets/Equipment/01_concrete_mixer.png";
import equipmentWheelLoader from "../../assets/Equipment/02_wheel_loader.png";
import siteCrane from "../../assets/OurWork/01_construction_site_crane.png";
import heavyMachinery from "../../assets/AboutWork/04_heavy_machinery.jpg";
import excavatorAndTruck from "../../assets/OurWork/03_excavator_and_truck.png";

const CATEGORY_IMAGES = {
  earthmoving: equipmentExcavator,
  "concrete-road": equipmentConcreteMixer,
  "material-handling": siteCrane,
  "drilling-foundation": heavyMachinery,
  "demolition-finishing": excavatorAndTruck,
  "other-equipment": equipmentWheelLoader,
};

export default function EquipmentShowcase() {
  const { t, lang } = useLanguage();
  const savedCategories = useContentSection("equipmentCategories", null);
  const categories = Array.isArray(savedCategories)
    ? savedCategories
    : equipmentCategories;
  return (
    <section className="sms-section bg-navy-800 text-white">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            light
            align="center"
            titleSize="lg"
            eyebrow={t("home.equipEyebrow")}
            eyebrowClassName="!text-smsorange-500"
            title={t("home.equipTitle")}
            subtitle={t("home.equipSubtitle")}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            // Translated card heading + each equipment item.
            // Key shape:
            //   t(`equipmentCategories.${cat.title}.title`)
            //   t(`equipmentCategories.${cat.title}.items.${idx}`)
            // `cat.title` is the English title from data/operations.js, which
            // matches the dictionary keys.
            const cardTitle =
              lang === "en" && Array.isArray(savedCategories)
                ? cat.title
                : t(`equipmentCategories.${cat.title}.title`);
            const translatedItems = cat.items.map((item, idx) =>
              lang === "en" && Array.isArray(savedCategories)
                ? item
                : t(`equipmentCategories.${cat.title}.items.${idx}`),
            );
            // Each card is now a real <Link> to its dedicated detail page
            // (`/equipment/<slug>`), implemented by EquipmentCategory.jsx.
            // Browser back button works because we use react-router, not
            // a modal.
            const image = CATEGORY_IMAGES[cat.slug];
            return (
              <Reveal key={`${lang}-${cat.slug}-${cat.title}`} delay={i * 0.05}>
                <Link
                  to={`/equipment/${cat.slug}`}
                  className="sms-hover-card sms-hover-card--dark group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-smsorange-400 focus:ring-offset-2 focus:ring-offset-navy-800"
                  aria-label={cardTitle}
                >
                  {image && (
                    <img
                      src={image}
                      alt={cardTitle}
                      className="h-40 w-full object-cover sm:h-44"
                    />
                  )}
                  <div className="flex flex-1 flex-col px-5 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="sms-hover-target sms-hover-target--icon -mt-6 h-11 w-11 shrink-0 rounded-md bg-navy-700 text-smsgold-400 grid place-items-center shadow-sms-soft ring-4 ring-navy-800 group-hover:bg-navy-600">
                        <IconByName name={cat.icon} className="h-5 w-5" />
                      </div>
                      <h3 className="sms-hover-target sms-hover-target--title mt-4 font-display font-bold text-white">
                        {cardTitle}
                      </h3>
                    </div>
                    <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-white/70">
                      {translatedItems.map((it, idx) => (
                        <li
                          key={`${lang}-${cat.slug}-${cat.title}-${idx}-${it}`}
                          className="flex gap-1.5"
                        >
                          <span className="text-smsorange-500">›</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/equipment" className="sms-btn-secondary">
            {t("home.equipExplore")}{" "}
            <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>
    </section>
  );
}
