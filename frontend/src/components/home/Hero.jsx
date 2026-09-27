import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, PlayCircle } from "lucide-react";
import { company, heroIntro } from "../../data/company";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80"
          alt="Construction site at dusk"
          className="h-full w-full object-cover opacity-50"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/85 via-charcoal-900/75 to-charcoal-950/95" />
        <div className="absolute inset-0 opacity-30"
             style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(247,107,10,0.35), transparent 50%), radial-gradient(circle at 80% 60%, rgba(29,44,76,0.6), transparent 50%)" }} />
      </div>

      <div className="sms-container relative py-24 md:py-36 lg:py-44">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-smsgold-300 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-smsorange-500 animate-pulse" />
          {company.shortName} · Established {company.established}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] max-w-5xl"
        >
          <span className="block">{company.tagline.split(",")[0]},</span>
          <span className="block bg-gradient-to-r from-smsorange-400 via-smsgold-300 to-smsgold-400 bg-clip-text text-transparent">
            {company.tagline.split(",")[1]?.trim()}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-base md:text-lg text-white/75 max-w-2xl leading-relaxed"
        >
          {heroIntro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link to="/services" className="sms-btn-primary">
            Explore Our Services <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/projects" className="sms-btn-secondary">
            <PlayCircle className="h-4 w-4" /> View Our Projects
          </Link>
          <Link to="/contact" className="text-sm font-semibold text-white/80 hover:text-white inline-flex items-center gap-2 ml-1">
            <Phone className="h-4 w-4" /> Contact Us
          </Link>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
        >
          {[
            { k: "Founded", v: company.established },
            { k: "Reg. No.", v: company.registrationNumber },
            { k: "License", v: company.licenseNumber },
            { k: "TIN", v: company.tinNumber },
          ].map((it) => (
            <div key={it.k} className="rounded-md border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.2em] text-smsgold-300">{it.k}</div>
              <div className="mt-1 font-display font-bold text-lg">{it.v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
