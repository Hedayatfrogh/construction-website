import { Link } from "react-router-dom";
import { ArrowRight, Handshake } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { useLanguage } from "../../context/LanguageContext";
import { useContentSection } from "../../data/contentStore";

export default function Clients() {
  const { t } = useLanguage();
  const savedClients = useContentSection("clients", []);
  const clients = savedClients.filter((client) => client.isPublished !== false);
  return (
    <section className="sms-section bg-white">
      <div className="sms-container">
        <SectionHeader
          eyebrow={t("home.clientsEyebrow")}
          title={t("home.clientsTitle")}
          subtitle={t("home.clientsSubtitle")}
          align="center"
          titleSize="lg"
        />
        {clients.length ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clients.slice(0, 8).map((client) => (
              <div
                key={client.id}
                className="flex min-h-24 items-center justify-center rounded-xl border border-charcoal-100 bg-white p-5"
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-16 max-w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-display font-semibold text-charcoal-800">
                    {client.name || <Handshake className="h-6 w-6" />}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="mt-12 rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 p-10 md:p-14 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-smsorange-50 text-smsorange-600 grid place-items-center">
                <Handshake className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-charcoal-900">
                {t("home.clientsEmptyTitle")}
              </h3>
              <p className="mt-2 text-charcoal-500 max-w-xl mx-auto">
                {t("home.clientsEmptyBody")}
              </p>
            </div>
          </Reveal>
        )}
        <div className="mt-10 flex justify-end">
          <Link to="/clients" className="sms-btn-ghost">
            {t("home.clientsGoTo")}{" "}
            <ArrowRight className="h-4 w-4 rtl-flip-x" />
          </Link>
        </div>
      </div>
    </section>
  );
}
