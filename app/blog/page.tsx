import { Metadata } from "next";
import { fetchNews, NewsItem } from "@/src/lib/news";
import { BlogContent } from "@/components/modules/BlogContent";

export const revalidate = 900; // Revalidate every 15 minutes (900 seconds)

export const metadata: Metadata = {
  title: "Notícias & Blog | World Sports Hub",
  description: "Acompanhe as últimas notícias do mundo dos esportes, do futebol à Fórmula 1, agregadas em tempo real.",
};

export default async function BlogPage() {
  // Fetch news for all categories in parallel
  const [footballNews, pavilionNews, beachNews, actionNews, othersNews] = await Promise.all([
    fetchNews("football"),
    fetchNews("pavilion"),
    fetchNews("beach"),
    fetchNews("action"),
    fetchNews("others"),
  ]);

  // Combine and sort by date descending
  const allNews: NewsItem[] = [
    ...footballNews,
    ...pavilionNews,
    ...beachNews,
    ...actionNews,
    ...othersNews,
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[#FF8C00] text-xs font-black uppercase tracking-[0.4em]">
            Real-Time Feed
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            World <span className="text-stroke-white text-transparent">Sports</span> Hub
          </h1>
          <p className="text-white/40 text-xl font-light leading-relaxed">
            Onde a performance encontra a informação.
          </p>
        </div>

        {/* Client Component for Filtering and Interaction */}
        <BlogContent initialNews={allNews} />
      </div>
    </main>
  );
}
