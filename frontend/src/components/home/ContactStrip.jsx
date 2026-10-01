import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { company } from "../../data/company";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { useLanguage } from "../../context/LanguageContext";

export default function ContactStrip() {
  const { t } = useLanguage();
  const items = [
    { icon: Phone,  label: t("home.contactCallUs"),            value: company.phone,                                       href: `tel:${company.phone.replace(/\s+/g, "")}` },
    { icon: Mail,   label: t("home.contactEmail"),             value: company.email || t("home.contactEmailPlaceholder"), href: company.email ? `mailto:${company.email}` : null },
    { icon: MapPin, label: t("home.contactKabulOffice"),       value: company.offices.main,                                href: null },
    { icon: MapPin, label: t("home.contactNangarharOffice"),   value: company.offices.branch,                               href: null },
  ];
  return (
    <section className="bg-white">
      <div className="sms-container -mt-12 md:-mt-16 relative z-10">
        <Reveal>
          <div className="rounded-2xl bg-white shadow-sms-strong border border-charcoal-100 p-6 md:p-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => {
              const Icon = it.icon;
              const inner = (
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal-500 font-semibold">{it.label}</div>
                    <div className="mt-1 text-sm font-semibold text-charcoal-900">{it.value}</div>
                  </div>
                </div>
              );
              return it.href
                ? <a key={it.label} href={it.href} className="hover:text-smsorange-600 transition">{inner}</a>
                : <div key={it.label}>{inner}</div>;
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
