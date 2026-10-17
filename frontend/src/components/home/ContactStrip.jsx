import { Phone, Mail, MapPin } from "lucide-react";
import { company } from "../../data/company";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { useLanguage } from "../../context/LanguageContext";
import { useContentSection } from "../../data/contentStore";
import PhoneNumber from "../ui/PhoneNumber";
import { telHref } from "../../utils/phoneDisplay";

export default function ContactStrip() {
  const { t, lang } = useLanguage();
  const companyContent = useContentSection("company", company);
  const settings = useContentSection("settings", null);
  const phone = settings?.contactPhone || companyContent.phone;
  const email = settings?.contactEmail || companyContent.email;
  const mainAddress =
    lang === "en"
      ? settings?.addressLines?.[0] || companyContent.offices?.main
      : t("contact.mainAddress");
  const branchAddress =
    lang === "en"
      ? settings?.addressLines?.[1] || companyContent.offices?.branch
      : t("contact.branchAddress");
  const items = [
    { icon: Phone,  label: t("home.contactCallUs"),            value: phone,                                       href: telHref(phone) },
    { icon: Mail,   label: t("home.contactEmail"),             value: email || t("home.contactEmailPlaceholder"), href: email ? `mailto:${email}` : null },
    { icon: MapPin, label: t("home.contactKabulOffice"),       value: mainAddress,                                href: null },
    { icon: MapPin, label: t("home.contactNangarharOffice"),   value: branchAddress,                               href: null },
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
                    <div className="mt-1 text-sm font-semibold text-charcoal-900">
                      {it.href?.startsWith("tel:") ? <PhoneNumber value={it.value} /> : it.value}
                    </div>
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
