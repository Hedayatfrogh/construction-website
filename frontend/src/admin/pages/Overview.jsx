// admin/pages/Overview.jsx
// ─────────────────────────────────────────────────────────────────────────────
// /admin landing page: a quick "what needs my attention today" snapshot.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban, Users, Building2, Newspaper, Briefcase, Wrench,
  MessageSquare, Globe, ArrowRight,
} from "lucide-react";
import { PageHeader, Card } from "../adminUI";
import { useContentSection } from "../../data/contentStore";
import { useAuth } from "../../context/AuthContext";

function StatCard({ icon: Icon, label, count, to, tone = "brand" }) {
  const tones = {
    brand:   "bg-smsorange-50 text-smsorange-700 border-smsorange-200",
    navy:    "bg-navy-50 text-navy-700 border-navy-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <Link to={to} className={`block rounded-xl border ${tones[tone] || tones.brand} p-4 hover:shadow-sms-soft transition`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] font-semibold opacity-80">{label}</div>
          <div className="mt-1 text-3xl font-extrabold">{count}</div>
        </div>
        <Icon className="h-6 w-6 opacity-60" />
      </div>
      <div className="mt-3 inline-flex items-center text-xs font-semibold opacity-80">
        Manage <ArrowRight className="h-3 w-3 ml-1" />
      </div>
    </Link>
  );
}

export default function Overview() {
  const { user, api } = useAuth();
  const [unreadMessages, setUnreadMessages] = useState(null);

  const projects = useContentSection("projects", []);
  const team     = useContentSection("teamMembers", []);
  const clients  = useContentSection("clients", []);
  const news     = useContentSection("newsArticles", []);
  const jobs     = useContentSection("jobs", []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: json } = await api.get("/messages/azad_noori");
        if (cancelled) return;
        const unread = (json.data || []).filter((m) => !m.isRead).length;
        setUnreadMessages(unread);
      } catch (_) {
        if (!cancelled) setUnreadMessages(0);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user?.name || "Admin"}`}
        subtitle="Manage every section of the SMS Construction & Engineering website from one place."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={MessageSquare} label="Unread messages" count={unreadMessages == null ? "—" : unreadMessages} to="/admin/messages" tone="warning" />
        <StatCard icon={FolderKanban}   label="Projects"          count={projects.length}            to="/admin/projects" tone="brand" />
        <StatCard icon={Users}          label="Team members"      count={team.filter((m) => m.isPublished !== false).length} to="/admin/team" tone="navy" />
        <StatCard icon={Building2}      label="Clients"           count={clients.filter((m) => m.isPublished !== false).length} to="/admin/clients" tone="success" />
        <StatCard icon={Newspaper}      label="News articles"      count={news.filter((m) => m.isPublished).length} to="/admin/news" tone="brand" />
        <StatCard icon={Briefcase}      label="Open jobs"          count={jobs.filter((m) => m.isOpen).length} to="/admin/jobs" tone="success" />
        <StatCard icon={Wrench}         label="Equipment"          count="6"   to="/admin/equipment" tone="navy" />
        <StatCard icon={Globe}          label="Homepage"           count="Edit" to="/admin/homepage" tone="warning" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Site content">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between py-1"><span>Homepage hero, stats & sections</span><Link to="/admin/homepage" className="text-smsorange-600 font-semibold hover:underline">Edit →</Link></li>
            <li className="flex items-center justify-between py-1"><span>Services (the seven core areas)</span><Link to="/admin/services" className="text-smsorange-600 font-semibold hover:underline">Edit →</Link></li>
            <li className="flex items-center justify-between py-1"><span>Equipment categories & items</span><Link to="/admin/equipment" className="text-smsorange-600 font-semibold hover:underline">Edit →</Link></li>
            <li className="flex items-center justify-between py-1"><span>Careers / open positions</span><Link to="/admin/jobs" className="text-smsorange-600 font-semibold hover:underline">Edit →</Link></li>
            <li className="flex items-center justify-between py-1"><span>Media library (images, docs)</span><Link to="/admin/media" className="text-smsorange-600 font-semibold hover:underline">Open →</Link></li>
            <li className="flex items-center justify-between py-1"><span>Global site settings</span><Link to="/admin/settings" className="text-smsorange-600 font-semibold hover:underline">Open →</Link></li>
          </ul>
        </Card>

        <Card title="Tips for getting started">
          <ol className="list-decimal pl-5 space-y-2 text-sm text-charcoal-700 leading-relaxed">
            <li>Start by adding <strong>Projects</strong>. They power the public <code>/projects</code> page and the project portfolio.</li>
            <li>Add <strong>Team members</strong> so the <code>/team</code> page reflects your real staff.</li>
            <li>Publish <strong>News</strong> articles so visitors see fresh content.</li>
            <li>Reply to incoming <strong>Messages</strong> from the contact form on the public site.</li>
            <li>All edits are saved to the local database. Use the <strong>Reset all CMS overrides</strong> button in the top bar to restore the static defaults anytime.</li>
          </ol>
        </Card>
      </div>
    </>
  );
}
