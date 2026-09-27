import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import Reveal from "./Reveal";

export default function CTASection({ title, subtitle, primaryLabel = "Request a Consultation", primaryTo = "/contact", secondaryLabel, secondaryTo }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-800 text-white">
      <div className="absolute inset-0 opacity-25"
           style={{ backgroundImage: "radial-gradient(circle at 10% 30%, rgba(247,107,10,0.6), transparent 45%), radial-gradient(circle at 90% 70%, rgba(29,44,76,0.7), transparent 50%)" }} />
      <div className="sms-container relative py-16 md:py-24">
        <Reveal>
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {title || "Ready to build something exceptional?"}
              </h2>
              {subtitle && <p className="mt-4 text-white/70 max-w-xl">{subtitle}</p>}
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to={primaryTo} className="sms-btn-primary">
                {primaryLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              {secondaryLabel && (
                <Link to={secondaryTo || "/contact"} className="sms-btn-secondary">
                  <Phone className="h-4 w-4" /> {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
