import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import CTASection from "../components/ui/CTASection";
import { organizationChart } from "../data/operations";

export default function Organization() {
  return (
    <>
      <PageHero eyebrow="Organization" title="Our organizational structure"
        subtitle="A clear chain of command and dedicated departments — from executive leadership to HSE, technical, supply chain, and HR."
        breadcrumbs={[{ label: "Organization" }]} />
      <section className="sms-section bg-white">
        <div className="sms-container">
          <SectionHeader eyebrow="Departments & Leadership" title="From the CEO to every specialist on site" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {organizationChart.map((node, i) => {
              const hasChildren = !!node.children?.length;
              const isCEO = node.role === "Chief Executive Officer";
              return (
                <Reveal key={node.role + i} delay={i * 0.03}>
                  <div className={`h-full rounded-xl border p-5 ${isCEO ? "border-smsorange-300 bg-smsorange-50/60" : "border-charcoal-100 bg-white"} hover:shadow-sms-soft transition`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-2 py-0.5 rounded-full ${isCEO ? "bg-smsorange-500 text-white" : "bg-charcoal-100 text-charcoal-700"}`}>{node.department}</span>
                      {isCEO && <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-smsorange-600">Top</span>}
                    </div>
                    <h3 className="mt-3 font-display font-bold text-charcoal-900">{node.role}</h3>
                    {hasChildren && (
                      <ul className="mt-3 grid gap-1.5 text-sm text-charcoal-600">
                        {node.children.map((c) => (<li key={c.role} className="flex gap-2"><span className="text-smsorange-500">›</span>{c.role}</li>))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection title="Want to work with our team?" subtitle="Talk to SMS about your engineering or construction project." />
    </>
  );
}
