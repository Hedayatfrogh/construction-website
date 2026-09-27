import { Link } from "react-router-dom";
import { ShieldCheck, BadgeCheck, ArrowRight } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import IconByName from "../ui/IconByName";
import { safetyTopics, qualityTopics } from "../../data/safety";

export default function SafetyQuality() {
  return (
    <section className="sms-section bg-white">
      <div className="sms-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal>
            <div className="rounded-2xl bg-navy-800 text-white p-8 md:p-10 h-full">
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-md bg-smsorange-500/20 text-smsorange-400 grid place-items-center">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <div className="sms-eyebrow !text-smsorange-400">Safety</div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mt-1">Zero-harm culture on every site</h3>
                </div>
              </div>
              <p className="mt-5 text-white/70">
                Strict OHS compliance, UN safety standards, risk assessments, hazard identification, PPE, training, drills, on-site safety officers, and accident prevention — applied to every project we deliver.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {safetyTopics.slice(0, 8).map((t) => (
                  <div key={t.title} className="flex items-start gap-2 rounded-md bg-white/5 px-3 py-2.5">
                    <IconByName name={t.icon} className="h-4 w-4 mt-0.5 text-smsorange-400 flex-shrink-0" />
                    <span className="text-sm">{t.title}</span>
                  </div>
                ))}
              </div>
              <Link to="/safety-quality" className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-smsorange-400 hover:text-smsorange-300">
                Read our safety program <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-charcoal-50 border border-charcoal-100 p-8 md:p-10 h-full">
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-md bg-smsgold-400/15 text-smsgold-600 grid place-items-center">
                  <BadgeCheck className="h-6 w-6" />
                </span>
                <div>
                  <div className="sms-eyebrow !text-smsgold-600">Quality</div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mt-1 text-charcoal-900">Three-stage quality control</h3>
                </div>
              </div>
              <p className="mt-5 text-charcoal-600">
                ISO and international quality standards, Afghan National Building Code compliance, material testing, pre/during/post-construction QA, third-party audits, and continuous improvement.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {qualityTopics.slice(0, 8).map((t) => (
                  <div key={t.title} className="flex items-start gap-2 rounded-md bg-white px-3 py-2.5 border border-charcoal-100">
                    <IconByName name={t.icon} className="h-4 w-4 mt-0.5 text-smsgold-600 flex-shrink-0" />
                    <span className="text-sm text-charcoal-800">{t.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 flex justify-end">
          <Link to="/safety-quality" className="sms-btn-ghost">
            See our quality approach <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
