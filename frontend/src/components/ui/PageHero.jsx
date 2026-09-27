import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="relative isolate overflow-hidden bg-sms-gradient text-white">
      <div className="absolute inset-0 opacity-30 pointer-events-none"
           style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(247,107,10,0.4), transparent 50%), radial-gradient(circle at 80% 60%, rgba(210,165,53,0.25), transparent 50%)" }} />
      <div className="sms-container relative py-20 md:py-28">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link to="/" className="hover:text-white transition">Home</Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 opacity-60" />
                {b.to ? <Link to={b.to} className="hover:text-white transition">{b.label}</Link> : <span className="text-white">{b.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          {eyebrow && (
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-smsorange-300">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] max-w-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-base md:text-lg text-white/80 max-w-3xl">{subtitle}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
