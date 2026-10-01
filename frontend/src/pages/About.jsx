import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { company, vision, mission } from "../data/company";
import { values } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

// Maps the English infoRow labels in the original code to translation
// keys. Centralised so the labels stay in sync with `companyFacts`.
const infoRowKeys = {
  "Company Name":        "companyFacts.companyName",
  "Short Name":          "companyFacts.shortName",
  "Tagline":             "companyFacts.tagline",
  "Established":         "companyFacts.established",
  "Registration Number": "companyFacts.registrationNumber",
  "License Number":      "companyFacts.licenseNumber",
  "TIN Number":          "companyFacts.tinNumber",
  "UNGM Number":         "companyFacts.ungmNumber",
  "Phone":               "companyFacts.phone",
  "Email":               "companyFacts.email",
  "Main Office":         "companyFacts.mainOffice",
  "Branch Office":       "companyFacts.branchOffice",
};

const valueKeyMap = {
  "Quality":              "values.quality",
  "Safety":               "values.safety",
  "Innovation":           "values.innovation",
  "Professionalism":      "values.professionalism",
  "Sustainability":       "values.sustainability",
  "Client Collaboration": "values.clientCollaboration",
  "Social Responsibility":"values.socialResponsibility",
};

export default function About() {
  const { t } = useLanguage();
  const infoRows = [
    { label: "Company Name",       value: company.name },
    { label: "Short Name",         value: company.shortName },
    { label: "Tagline",            value: company.tagline },
    { label: "Established",        value: company.established },
    { label: "Registration Number",value: company.registrationNumber },
    { label: "License Number",     value: company.licenseNumber },
    { label: "TIN Number",         value: company.tinNumber },
    { label: "UNGM Number",        value: company.ungmNumber || t("about.editableInAdmin") },
    { label: "Phone",              value: company.phone },
    { label: "Email",              value: company.email || t("about.editableInAdmin") },
    { label: "Main Office",        value: company.offices.main },
    { label: "Branch Office",      value: company.offices.branch },
  ];
  return (
    <>
      <PageHero eyebrow={t("about.heroEyebrow")} title={t("about.heroTitle")}
        subtitle={t("about.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.about") }]} />
      <section className="sms-section bg-white">
        <div className="sms-container grid gap-12 xl:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <SectionHeader eyebrow={t("about.overviewEyebrow")} title={t("about.overviewTitle")} />
            <div className="mt-6 space-y-4 text-charcoal-600 leading-relaxed">
              <p>{t("about.overviewP1")}</p>
              <p>{t("about.overviewP2")}</p>
              <p>{t("about.overviewP3")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-charcoal-100 bg-charcoal-50 p-6">
              <div className="sms-eyebrow">{t("about.vision")}</div>
              <p className="mt-3 text-charcoal-800 leading-relaxed font-medium">{t("vision")}</p>
              <div className="mt-6 sms-eyebrow">{t("about.mission")}</div>
              <p className="mt-3 text-charcoal-800 leading-relaxed font-medium">{t("mission")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sms-section bg-charcoal-50">
        <div className="sms-container">
          <SectionHeader eyebrow={t("about.infoEyebrow")} title={t("about.infoTitle")}
            subtitle={t("about.infoSubtitle")} />
          <Reveal>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {infoRows.map((r) => (
                <div key={r.label} className="rounded-xl border border-charcoal-100 bg-white p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal-500 font-semibold">{t(infoRowKeys[r.label] || r.label)}</div>
                  <div className="mt-2 text-charcoal-900 font-semibold leading-snug">{r.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader align="center" eyebrow={t("about.valuesEyebrow")} title={t("about.valuesTitle")} subtitle={t("about.valuesSubtitle")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const k = valueKeyMap[v.title];
              const title = k ? t(`${k}.title`) : v.title;
              const desc  = k ? t(`${k}.description`) : v.description;
              return (
                <Reveal key={v.title} delay={i * 0.05}>
                  <div className="h-full rounded-xl border border-charcoal-100 bg-white p-6 hover:border-smsorange-300 hover:shadow-sms-strong transition">
                    <div className="font-display text-3xl font-extrabold text-smsorange-500">0{i+1}</div>
                    <h3 className="mt-2 font-display font-bold text-charcoal-900 text-lg">{title}</h3>
                    <p className="mt-2 text-sm text-charcoal-500 leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection title={t("about.ctaTitle")} subtitle={t("about.ctaSubtitle")} />
    </>
  );
}
