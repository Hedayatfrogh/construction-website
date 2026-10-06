import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import { company } from "../data/company";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useContentSection } from "../data/contentStore";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const { api } = useAuth();
  const { t, lang } = useLanguage();
  const companyContent = useContentSection("company", company);
  const contactContent = useContentSection("contact", null);
  const settings = useContentSection("settings", null);
  const phone =
    contactContent?.phone || settings?.contactPhone || companyContent.phone;
  const email =
    contactContent?.email || settings?.contactEmail || companyContent.email;
  const mainAddress =
    lang === "en"
      ? contactContent?.address ||
        settings?.addressLines?.[0] ||
        companyContent.offices?.main
      : t("contact.mainAddress");
  const branchAddress =
    lang === "en"
      ? contactContent?.branchAddress ||
        settings?.addressLines?.[1] ||
        companyContent.offices?.branch
      : t("contact.branchAddress");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ kind: "idle", text: "" });
  const [submitting, setSubmitting] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = t("contact.errFullName");
    if (!form.email.trim()) e.email = t("contact.errEmailRequired");
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = t("contact.errEmailInvalid");
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = t("contact.errMessage");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatus({ kind: "idle", text: "" });
    try {
      const [firstName, ...rest] = form.fullName.trim().split(/\s+/);
      const message = form.message.trim();
      await api.post("/messages", {
        firstName,
        lastName: rest.join(" "),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        description: form.subject.trim() ? `${form.subject.trim()}\n\n${message}` : message,
        websiteId: "azad_noori",
      });
      setStatus({ kind: "success", text: t("contact.successMessage") });
      setForm(initialForm);
    } catch {
      setStatus({ kind: "error", text: t("contact.errorMessage") });
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (err) =>
    `mt-1 block w-full rounded-md border ${err ? "border-red-300" : "border-charcoal-200"} px-3 py-2 text-sm shadow-sm focus:border-smsorange-400 focus:ring-2 focus:ring-smsorange-200 outline-none`;

  return (
    <>
      <PageHero
        eyebrow={t("contact.heroEyebrow")}
        title={t("contact.heroTitle")}
        subtitle={t("contact.heroSubtitle")}
        breadcrumbs={[{ label: t("contact.heroEyebrow") }]}
      />
      <section className="sms-section bg-white">
        <div className="sms-container grid gap-10 lg:grid-cols-1 xl:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="rounded-2xl bg-charcoal-50 border border-charcoal-100 p-7">
              <h2 className="font-display text-2xl font-bold text-charcoal-900">
                {t("contact.officesTitle")}
              </h2>
              <ul className="mt-5 space-y-5">
                <li className="flex gap-3">
                  <span className="h-10 w-10 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal-500 font-semibold">
                      {t("contact.mainLabel")}
                    </div>
                    <div className="mt-1 text-charcoal-900">{mainAddress}</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="h-10 w-10 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal-500 font-semibold">
                      {t("contact.branchLabel")}
                    </div>
                    <div className="mt-1 text-charcoal-900">
                      {branchAddress}
                    </div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="h-10 w-10 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal-500 font-semibold">
                      {t("contact.phoneLabel")}
                    </div>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="mt-1 block sms-link"
                    >
                      {phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="h-10 w-10 rounded-md bg-smsorange-50 text-smsorange-600 grid place-items-center flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal-500 font-semibold">
                      {t("contact.emailLabel")}
                    </div>
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="mt-1 block sms-link"
                      >
                        {email}
                      </a>
                    ) : (
                      <div className="mt-1 text-charcoal-500 text-sm">
                        {t("contact.emailConfigNote")}
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl bg-white border border-charcoal-100 shadow-sms-soft p-7"
            >
              <h2 className="font-display text-2xl font-bold text-charcoal-900">
                {t("contact.formTitle")}
              </h2>
              <p className="mt-2 text-sm text-charcoal-500">
                {t("contact.formSubtitle")}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className="block text-sm font-semibold text-charcoal-800"
                    htmlFor="fullName"
                  >
                    {t("contact.fullName")}
                  </label>
                  <input
                    id="fullName"
                    value={form.fullName}
                    onChange={update("fullName")}
                    placeholder={t("contact.fullNamePlaceholder")}
                    className={inputCls(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-charcoal-800"
                    htmlFor="email"
                  >
                    {t("contact.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder={t("contact.emailPlaceholder")}
                    className={inputCls(errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-charcoal-800"
                    htmlFor="phone"
                  >
                    {t("contact.phone")}
                  </label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder={t("contact.phonePlaceholder")}
                    className={inputCls()}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-charcoal-800"
                    htmlFor="company"
                  >
                    {t("contact.company")}
                  </label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={update("company")}
                    placeholder={t("contact.companyPlaceholder")}
                    className={inputCls()}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    className="block text-sm font-semibold text-charcoal-800"
                    htmlFor="subject"
                  >
                    {t("contact.subject")}
                  </label>
                  <input
                    id="subject"
                    value={form.subject}
                    onChange={update("subject")}
                    placeholder={t("contact.subjectPlaceholder")}
                    className={inputCls()}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    className="block text-sm font-semibold text-charcoal-800"
                    htmlFor="message"
                  >
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    placeholder={t("contact.messagePlaceholder")}
                    className={inputCls(errors.message)}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {status.kind !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 flex items-start gap-2 rounded-md p-3 text-sm ${
                      status.kind === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {status.kind === "success" ? (
                      <CheckCircle2 className="h-4 w-4 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 mt-0.5" />
                    )}
                    {status.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={submitting}
                className="sms-btn-primary mt-6 w-full justify-center disabled:opacity-50"
              >
                {submitting ? (
                  t("common.sending")
                ) : (
                  <>
                    {t("contact.sendButton")} <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
