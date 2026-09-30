import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { upcomingProjectCategories } from "../../data/operations";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { useLanguage } from "../../context/LanguageContext";

export default function Upcoming() {
  const { t } = useLanguage();
  return (
    <section className="sms-section bg-charcoal-50">
      <div className="sms-container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <SectionHeader
            align="center"
            titleSize="lg"
            eyebrow={t("home.upcomingEyebrow")}
            title={t("home.upcomingTitle")}
            subtitle={t("home.upcomingSubtitle")}
          />
        </div>
        <div className="sms-hover-card sms-hover-card--light group rounded-xl border border-charcoal-100 bg-white p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-smsorange-600 font-semibold">
            <Clock className="h-4 w-4" /> {t("common.planned")}
          </div>
          <p className="mt-2 text-sm text-charcoal-500 max-w-3xl">{t("home.upcomingBody")}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {upcomingProjectCategories.map((c) => (
              <span
                key={c.key}
                className="sms-hover-pill inline-flex items-center rounded-full border border-charcoal-200 bg-white px-3 py-1.5 text-xs font-semibold text-charcoal-700"
              >
                {/* `t(c.key)` swaps between Dari and English instantly
                    when the user toggles the navbar language switcher.
                    `c.label` is the English source string used by
                    `translate()` as a fallback if a key is ever missing. */}
                {t(c.key)}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/upcoming-projects" className="sms-btn-ghost">
            {t("home.upcomingSeeAll")} <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>
    </section>
  );
}
