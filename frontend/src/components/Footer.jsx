import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { company } from "../data/company";
import { services } from "../data/content";
import { navLinks } from "../data/operations";
import "./Footer.css";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="sms-container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4 min-w-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-smsorange-500 text-white grid place-items-center font-display font-extrabold shrink-0">SMS</div>
              <div className="min-w-0">
                <div className="font-display font-bold">Sayed Musawer Sadat</div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">Construction &amp; Engineering</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/70 leading-relaxed">
              Building with Passion, Delivering with Pride. A premier Afghan construction and engineering firm delivering buildings, infrastructure, water &amp; irrigation, energy, and rehabilitation works across the country.
            </p>
            <div className="mt-6 flex gap-3">
              {company.social?.facebook  && <a href={company.social.facebook}  className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-smsorange-500 transition" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>}
              {company.social?.twitter   && <a href={company.social.twitter}   className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-smsorange-500 transition" aria-label="Twitter"><Twitter  className="h-4 w-4" /></a>}
              {company.social?.linkedin  && <a href={company.social.linkedin}  className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-smsorange-500 transition" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>}
              {company.social?.instagram && <a href={company.social.instagram} className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-smsorange-500 transition" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>}
            </div>
          </div>

          <div className="lg:col-span-2 min-w-0">
            <h3 className="font-display font-semibold text-sm tracking-widest uppercase text-smsgold-400">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/about"          className="footer-link">About</Link></li>
              <li><Link to="/services"       className="footer-link">Services</Link></li>
              <li><Link to="/projects"       className="footer-link">Projects</Link></li>
              <li><Link to="/team"           className="footer-link">Team</Link></li>
              <li><Link to="/contact"        className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3 min-w-0">
            <h3 className="font-display font-semibold text-sm tracking-widest uppercase text-smsgold-400">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="footer-link">
                    {s.title} <ArrowUpRight className="footer-link__arrow h-3 w-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 min-w-0">
            <h3 className="font-display font-semibold text-sm tracking-widest uppercase text-smsgold-400">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s+/g, "")}`}
                  className="footer-link footer-link--with-icon"
                  aria-label={`Call ${company.phone}`}
                >
                  <Phone className="footer-link__icon h-4 w-4 text-smsorange-500 shrink-0" />
                  <span className="break-all">{company.phone}</span>
                </a>
              </li>
              {company.email && (
                <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-smsorange-500 shrink-0" /><a href={`mailto:${company.email}`} className="hover:text-white break-all">{company.email}</a></li>
              )}
              <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-smsorange-500 shrink-0" /><span className="min-w-0"><span className="text-white/60">Kabul:</span> {company.offices.main}</span></li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-smsorange-500 shrink-0" /><span className="min-w-0"><span className="text-white/60">Nangarhar:</span> {company.offices.branch}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="sms-container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {year} Sayed Musawer Sadat Construction and Engineering Design Company. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/services" className="hover:text-white">Services</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/login" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
