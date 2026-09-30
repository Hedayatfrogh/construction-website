// EquipmentCategory.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Reusable equipment detail page. One component, six routes:
//
//   /equipment/earthmoving
//   /equipment/concrete-road
//   /equipment/material-handling
//   /equipment/drilling-foundation
//   /equipment/demolition-finishing
//   /equipment/other-equipment
//
// The route's URL slug is resolved via `getEquipmentCategoryBySlug(slug)`
// from data/operations.js. The same data source feeds the home-page
// EquipmentShowcase card list and the /equipment page card grid, so all
// three views stay in sync automatically.
//
// All visible text comes from the existing i18n dictionary via
// `useLanguage()`. No hard-coded strings. Language changes are immediate
// because LanguageContext re-renders every consumer on every toggle.
// ─────────────────────────────────────────────────────────────────────────────

import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import IconByName from "../components/ui/IconByName";
import CTASection from "../components/ui/CTASection";
import { getEquipmentCategoryBySlug } from "../data/operations";
import { useLanguage } from "../context/LanguageContext";

export default function EquipmentCategory() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();

  // Resolve the category from the URL slug. If the slug is unknown
  // (typo, stale bookmark, etc.) we render a friendly 404 state in the
  // current language instead of crashing.
  const category = getEquipmentCategoryBySlug(slug);

  if (!category) {
    return (
      <>
        <PageHero
          eyebrow={t("equipmentDetail.notFoundTitle")}
          title={t("equipmentDetail.notFoundTitle")}
          subtitle={t("equipmentDetail.notFoundBody")}
          breadcrumbs={[
            { label: t("nav.equipment"), to: "/equipment" },
            { label: t("equipmentDetail.notFoundTitle") },
          ]}
        />
        <section className="sms-section bg-white">
          <div className="sms-container text-center">
            <Link
              to="/equipment"
              className="sms-btn-ghost inline-flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4 rtl-flip-x" />
              {t("equipmentDetail.backToEquipmentCategory")}
            </Link>
          </div>
        </section>
      </>
    );
  }

  // Look up translated copy for this category. The dictionary key uses
  // the English `category.title` as the prefix — that's the contract the
  // existing EquipmentShowcase + Equipment grid already follow.
  const catKey = `equipmentCategories.${category.title}`;
  const catTitle = t(`${catKey}.title`);
  const itemNames = category.items.map((_it, i) => t(`${catKey}.items.${i}`));
  const itemDescriptions = category.items.map((_it, i) =>
    t(`${catKey}.descriptions.${i}`)
  );
  const itemSpecs = category.items.map((_it, i) => t(`${catKey}.specs.${i}`));
  const itemAvailability = category.items.map((_it, i) =>
    t(`${catKey}.availability.${i}`)
  );

  return (
    <>
      <PageHero
        eyebrow={catTitle}
        title={catTitle}
        subtitle={`${itemNames.length} ${t("equipmentDetail.itemsInThisCategory")}`}
        breadcrumbs={[
          { label: t("nav.equipment"), to: "/equipment" },
          { label: catTitle },
        ]}
      />

      <section className="sms-section bg-white">
        <div className="sms-container">
          {/* Back link */}
          <div className="mb-6">
            <Link
              to="/equipment"
              className="inline-flex items-center gap-2 text-sm font-semibold text-smsorange-600 hover:text-smsorange-700 transition rtl:flex-row-reverse"
            >
              <ChevronLeft className="h-4 w-4 rtl-flip-x" />
              {t("equipmentDetail.backToEquipmentCategory")}
            </Link>
          </div>

          {/* Category summary card */}
          <div className="rounded-2xl border border-charcoal-100 bg-charcoal-50 p-6 md:p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-lg bg-navy-700 text-smsgold-400 grid place-items-center shrink-0">
                <IconByName name={category.icon} className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display font-bold text-xl md:text-2xl text-charcoal-900">
                  {catTitle}
                </h2>
                <p className="mt-1 text-sm text-charcoal-500">
                  {itemNames.length} {t("equipmentDetail.itemsInThisCategory")}
                </p>
              </div>
            </div>
          </div>

          {/* Equipment table */}
          <div className="rounded-2xl border border-charcoal-100 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" dir={lang === "fa" ? "rtl" : "ltr"}>
                <thead className="bg-charcoal-50 text-charcoal-500 text-[11px] uppercase tracking-[0.18em]">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-left rtl:text-right w-16">#</th>
                    <th className="px-4 py-3 font-semibold text-left rtl:text-right">{t("equipmentDetail.tableImage")}</th>
                    <th className="px-4 py-3 font-semibold text-left rtl:text-right">{t("equipmentDetail.tableEquipmentName")}</th>
                    <th className="px-4 py-3 font-semibold text-left rtl:text-right">{t("equipmentDetail.tableCategory")}</th>
                    <th className="px-4 py-3 font-semibold text-left rtl:text-right">{t("equipmentDetail.tableDescription")}</th>
                    <th className="px-4 py-3 font-semibold text-left rtl:text-right whitespace-nowrap">{t("equipmentDetail.tableAvailability")}</th>
                    <th className="px-4 py-3 font-semibold text-left rtl:text-right">{t("equipmentDetail.tableSpecifications")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-100">
                  {category.items.map((_raw, i) => (
                    <tr key={`${lang}-${category.slug}-${i}`} className="hover:bg-charcoal-50/40">
                      <td className="px-4 py-4 align-top text-charcoal-400 font-mono text-xs">{i + 1}</td>
                      <td className="px-4 py-4 align-top">
                        {/* Placeholder image tile — neutral gradient that
                            adapts to dark/light mode. No user-facing copy. */}
                        <div
                          className="h-12 w-12 rounded-md bg-gradient-to-br from-navy-700 to-navy-900 grid place-items-center text-smsgold-400"
                          aria-hidden="true"
                        >
                          <IconByName name={category.icon} className="h-6 w-6" />
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <span className="font-display font-bold text-charcoal-900 whitespace-nowrap">
                          {itemNames[i]}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top text-charcoal-700 whitespace-nowrap">
                        {catTitle}
                      </td>
                      <td className="px-4 py-4 align-top text-charcoal-600 max-w-xs">
                        {itemDescriptions[i]}
                      </td>
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <span
                          className={[
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                            itemAvailability[i] === t("equipmentDetail.statusAvailable")
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "h-1.5 w-1.5 rounded-full",
                              itemAvailability[i] === t("equipmentDetail.statusAvailable")
                                ? "bg-emerald-500"
                                : "bg-amber-500",
                            ].join(" ")}
                          />
                          {itemAvailability[i]}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top text-charcoal-600 text-xs leading-relaxed max-w-sm">
                        {itemSpecs[i]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Back link below the table for long tables */}
          <div className="mt-8">
            <Link to="/equipment" className="sms-btn-ghost inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 rtl-flip-x" />
              {t("equipmentDetail.backToAll")}
            </Link>
          </div>
        </div>
      </section>

      <CTASection title={t("equipment.ctaTitle")} subtitle={t("equipment.ctaSubtitle")} />
    </>
  );
}
