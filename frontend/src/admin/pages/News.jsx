// admin/pages/News.jsx
import CrudManager from "./CrudManager";
import { Field, TextInput, TextArea, Select, Checkbox, TagInput, Badge } from "../adminUI";
import { EMPTY_NEWS_ARTICLE, NEWS_CATEGORIES } from "../../data/adminSeed";
import { Newspaper } from "lucide-react";
import { format } from "date-fns";

const columns = [
  { key: "coverImage", label: "Cover", render: (a) => (
    <div className="h-10 w-16 rounded-md bg-charcoal-100 overflow-hidden border border-charcoal-200">
      {a.coverImage ? <img src={a.coverImage} alt="" className="h-full w-full object-cover" /> : <Newspaper className="h-full w-full p-2 text-charcoal-400" />}
    </div>
  ) },
  { key: "title", label: "Title", render: (a) => <div>
    <div className="font-semibold text-charcoal-900 line-clamp-1">{a.title || <em className="text-charcoal-400">Untitled</em>}</div>
    <div className="text-[11px] text-charcoal-500">{a.slug}</div>
  </div> },
  { key: "category", label: "Category", render: (a) => <Badge tone="info">{a.category}</Badge> },
  { key: "publishedAt", label: "Published", render: (a) => <span className="text-xs text-charcoal-500">{a.publishedAt ? format(new Date(a.publishedAt), "PP") : "—"}</span> },
  { key: "isPublished", label: "Status", render: (a) => a.isPublished ? <Badge tone="success">Published</Badge> : <Badge tone="warning">Draft</Badge> },
];

function ArticleForm({ item, setItem }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title" required>
          <TextInput value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} />
        </Field>
        <Field label="Slug (URL)">
          <TextInput value={item.slug} onChange={(e) => setItem({ ...item, slug: e.target.value })} placeholder="auto-from-title" />
        </Field>
        <Field label="Category">
          <Select value={item.category} onChange={(e) => setItem({ ...item, category: e.target.value })}>
            {NEWS_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Author">
          <TextInput value={item.author} onChange={(e) => setItem({ ...item, author: e.target.value })} />
        </Field>
        <Field label="Publish date">
          <TextInput type="datetime-local" value={item.publishedAt ? item.publishedAt.slice(0, 16) : ""} onChange={(e) => setItem({ ...item, publishedAt: e.target.value ? new Date(e.target.value).toISOString() : "" })} />
        </Field>
        <Field label="Cover image URL">
          <TextInput value={item.coverImage} onChange={(e) => setItem({ ...item, coverImage: e.target.value })} />
        </Field>
      </div>
      <Field label="Excerpt" hint="One or two sentences shown in article lists">
        <TextArea rows={2} value={item.excerpt} onChange={(e) => setItem({ ...item, excerpt: e.target.value })} />
      </Field>
      <Field label="Body" hint="Plain text or markdown">
        <TextArea rows={8} value={item.body} onChange={(e) => setItem({ ...item, body: e.target.value })} />
      </Field>
      <Field label="Tags" hint="Press Enter after each tag">
        <TagInput value={item.tags || []} onChange={(arr) => setItem({ ...item, tags: arr })} placeholder="construction, kabul, infrastructure" />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="SEO title">
          <TextInput value={item.seoTitle} onChange={(e) => setItem({ ...item, seoTitle: e.target.value })} />
        </Field>
        <Field label="SEO description">
          <TextInput value={item.seoDescription} onChange={(e) => setItem({ ...item, seoDescription: e.target.value })} />
        </Field>
      </div>
      <Checkbox label="Published (visible to public)" checked={item.isPublished} onChange={(v) => setItem({ ...item, isPublished: v })} />
    </>
  );
}

export default function News() {
  return (
    <CrudManager
      sectionKey="newsArticles"
      initialItem={EMPTY_NEWS_ARTICLE}
      title="News & Insights"
      subtitle="Publish articles, project announcements, and engineering insights."
      searchFields={["title", "category", "author", "excerpt"]}
      columns={columns}
      renderForm={(item, setItem) => <ArticleForm item={item} setItem={setItem} />}
      emptyTitle="No articles yet"
      emptyHint="Click ‘Add new’ to publish your first article."
      addLabel="Add article"
      emptyIcon={Newspaper}
    />
  );
}
