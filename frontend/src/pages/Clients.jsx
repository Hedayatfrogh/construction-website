import { Link } from "react-router-dom";
import { Handshake, ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { useLanguage } from "../context/LanguageContext";
import { useContentSection } from "../data/contentStore";

export default function Clients() {
  const { t } = useLanguage();
  const savedClients = useContentSection("clients", []);
  const clients = savedClients.filter((client) => client.isPublished !== false);
  return (
    <>
      <PageHero
        eyebrow={t("clients.heroEyebrow")}
        title={t("clients.heroTitle")}
        subtitle={t("clients.heroSubtitle")}
        breadcrumbs={[{ label: t("nav.clients") }]}
      />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader
            align="center"
            eyebrow={t("clients.eyebrow")}
            title={t("clients.title")}
            subtitle={t("clients.subtitle")}
          />
          {clients.length ? (
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((client) => (
                <article
                  key={client.id}
                  className="flex min-h-28 items-center gap-5 rounded-xl border border-charcoal-100 bg-white p-5"
                >
                  <div className="grid h-16 w-20 shrink-0 place-items-center overflow-hidden rounded-md bg-charcoal-50">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <Handshake className="h-7 w-7 text-charcoal-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-charcoal-900">
                      {client.name}
                    </h3>
                    {client.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-charcoal-500">
                        {client.description}
                      </p>
                    )}
                    {client.website && (
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-xs font-semibold text-smsorange-600 hover:underline"
                      >
                        Visit website
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mt-12 rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 p-10 md:p-14 text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-smsorange-50 text-smsorange-600 grid place-items-center">
                  <Handshake className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-charcoal-900">
                  {t("clients.emptyTitle")}
                </h3>
                <p className="mt-2 text-charcoal-500 max-w-xl mx-auto">
                  {t("clients.emptyBody")}
                </p>
                <Link to="/contact" className="mt-6 sms-btn-ghost inline-flex">
                  {t("clients.becomeCTA")}{" "}
                  <ArrowRight className="h-4 w-4 rtl-flip-x" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>
      <CTASection
        title={t("clients.ctaTitle")}
        subtitle={t("clients.ctaSubtitle")}
      />
    </>
  );
}
