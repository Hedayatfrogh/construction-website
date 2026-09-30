import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { company } from "../data/company";
import { services } from "../data/content";
import { navLinks } from "../data/operations";
import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

const year = new Date().getFullYear();

// Local helper: maps a footer path to its translation key. Kept here so
// any future footer link additions stay co-located with the Footer.
const footerNavKey = (to) => {
  const map = {
    "/about":    "about",
    "/services": "services",
    "/projects": "projects",
    "/team":     "team",
    "/contact":  "contact",
  };
  return map[to] || to.replace(/^\/+/, "");
};

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-navy-900 text-white">
      <div className="sms-container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4 min-w-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-smsorange-500 text-white grid place-items-center font-display font-extrabold shrink-0">{t('brandShort')}</div>
              <div className="min-w-0">
                <div className="font-display font-bold">{t('brandName')}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">{t('brandLine')}</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/70 leading-relaxed">
              {/* Footer company description is fully translated.
                  Key `home.footerCompanyDescription` is defined in both
                  the EN and FA dictionaries. */}
              {t('home.footerCompanyDescription')}
            </p>
            <div className="mt-6 flex gap-3">
              {company.social?.facebook  && <a href={company.social.facebook}  className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-smsorange-500 transition" aria-label={t('social.facebook')}><Facebook className="h-4 w-4" /></a>}
              {company.social?.twitter   && <a href={company.social.twitter}   className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-smsorange-500 transition" aria-label={t('social.twitter')}><Twitter  className="h-4 w-4" /></a>}
              {company.social?.linkedin  && <a href={company.social.linkedin}  className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-smsorange-500 transition" aria-label={t('social.linkedin')}><Linkedin className="h-4 w-4" /></a>}
              {company.social?.instagram && <a href={company.social.instagram} className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-smsorange-500 transition" aria-label={t('social.instagram')}><Instagram className="h-4 w-4" /></a>}
            </div>
          </div>

          <div className="lg:col-span-2 min-w-0">
            <h3 className="font-display font-semibold text-sm tracking-widest uppercase text-smsgold-400">{t('footerAbout')}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/about"          className="footer-link">{t('nav.' + footerNavKey('/about'))}</Link></li>
              <li><Link to="/services"       className="footer-link">{t('nav.' + footerNavKey('/services'))}</Link></li>
              <li><Link to="/projects"       className="footer-link">{t('nav.' + footerNavKey('/projects'))}</Link></li>
              <li><Link to="/team"           className="footer-link">{t('nav.' + footerNavKey('/team'))}</Link></li>
              <li><Link to="/contact"        className="footer-link">{t('nav.' + footerNavKey('/contact'))}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3 min-w-0">
            <h3 className="font-display font-semibold text-sm tracking-widest uppercase text-smsgold-400">{t('footerOurServices')}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="footer-link">
                    {/* `s.titleKey` is the translation key (e.g. "home.buildingConstruction")
                        that resolves to the current language. `s.title` (the
                        English source string) is kept as a runtime fallback
                        so a missing dictionary entry can never crash the UI. */}
                    {t(s.titleKey) || s.title} <ArrowUpRight className="footer-link__arrow h-3 w-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 min-w-0">
            <h3 className="font-display font-semibold text-sm tracking-widest uppercase text-smsgold-400">{t('footerContactUs')}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s+/g, "")}`}
                  className="footer-link footer-link--with-icon"
                  aria-label={t('footerCallPhone', company.phone)}
                >
                  <Phone className="footer-link__icon h-4 w-4 text-smsorange-500 shrink-0" />
                  <span className="break-all">{company.phone}</span>
                </a>
              </li>
              {company.email && (
                <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-smsorange-500 shrink-0" /><a href={`mailto:${company.email}`} className="hover:text-white break-all">{company.email}</a></li>
              )}
              <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-smsorange-500 shrink-0" /><span className="min-w-0"><span className="text-white/60">{t('home.footerCityKabul')}</span> {company.offices.main}</span></li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-smsorange-500 shrink-0" /><span className="min-w-0"><span className="text-white/60">{t('home.footerCityNangarhar')}</span> {company.offices.branch}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="sms-container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {year} {company.name}. {t('footerRights')}</div>
          <div className="flex gap-5">
            <Link to="/about" className="hover:text-white">{t('nav.' + footerNavKey('/about'))}</Link>
            <Link to="/services" className="hover:text-white">{t('nav.' + footerNavKey('/services'))}</Link>
            <Link to="/contact" className="hover:text-white">{t('nav.' + footerNavKey('/contact'))}</Link>
            <Link to="/login" className="hover:text-white">{t('logIn')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
