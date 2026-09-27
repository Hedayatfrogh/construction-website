import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "../data/content";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import IconByName from "../components/ui/IconByName";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  return (
    <>
      <PageHero eyebrow="Service" title={service.title} subtitle={service.summary}
        breadcrumbs={[{ label: "Services", to: "/services" }, { label: service.title }]} />
      <section className="sms-section bg-white">
        <div className="sms-container grid gap-12 xl:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="inline-flex items-center gap-3">
              <span className="h-12 w-12 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center">
                <IconByName name={service.icon} className="h-6 w-6" />
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal-900">Overview</h2>
            </div>
            <p className="mt-5 text-charcoal-600 leading-relaxed">{service.description}</p>
            <h3 className="mt-10 font-display text-xl font-bold text-charcoal-900">Scope of Work</h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
              {service.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm text-charcoal-700">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-smsorange-500 flex-shrink-0" />{it}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="rounded-2xl bg-navy-800 text-white p-7 h-fit sticky top-28">
              <div className="sms-eyebrow !text-smsgold-400">Need this service?</div>
              <h3 className="mt-2 font-display text-xl font-bold">Request a consultation</h3>
              <p className="mt-3 text-white/70 text-sm">Tell us about your project and our engineering team will get back to you.</p>
              <Link to="/contact" className="mt-5 sms-btn-primary w-full justify-center">Contact Us <ArrowRight className="h-4 w-4" /></Link>
              <div className="mt-6 border-t border-white/10 pt-5 text-sm text-white/70">Or explore other services:</div>
              <ul className="mt-3 space-y-2 text-sm">
                {services.filter((s) => s.slug !== service.slug).slice(0, 5).map((s) => (
                  <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-white/80 hover:text-smsorange-400 inline-flex items-center gap-1.5"><ArrowRight className="h-3 w-3" />{s.title}</Link></li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>
      <CTASection title={`Plan your ${service.title.toLowerCase()} project`} subtitle="Engage SMS for technical assessment and a tailored proposal." />
    </>
  );
}
