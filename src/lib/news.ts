import Parser from "rss-parser";

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  imageUrl: string;
  source: string;
  category: "football" | "pavilion" | "beach" | "action" | "others";
}

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["enclosure", "enclosure", { keepArray: true }],
      ["image", "image"],
    ],
  },
});

const CATEGORY_FEEDS = {
  football: [
    { name: "Record (PT)", url: "https://www.record.pt/rss" },
    { name: "A Bola (PT)", url: "https://www.abola.pt/rss/futebol" },
    { name: "GE Globo (BR)", url: "http://globoesporte.globo.com/servico/semantico/editorias/video/futebol/rss.xml" },
  ],
  pavilion: [
    { name: "Futsal", url: "https://www.record.pt/rss/futsal" },
    { name: "Andebol", url: "https://www.record.pt/rss/andebol" },
    { name: "Voleibol", url: "https://www.record.pt/rss/voleibol" },
    { name: "A Bola Pavilhão", url: "https://www.abola.pt/rss/modalidades" },
  ],
  beach: [
    { name: "Futebol de Praia", url: "https://www.record.pt/rss/futebol-de-praia" },
    { name: "Record Mais", url: "https://www.record.pt/rss/mais-desporto" },
  ],
  action: [
    { name: "Motorsport F1", url: "https://www.motorsport.com/rss/f1/news/" },
    { name: "MotoGP", url: "https://www.motorsport.com/rss/motogp/news/" },
    { name: "Red Bull", url: "https://www.redbull.com/pt-pt/rss" },
  ],
  others: [
    { name: "NBA News", url: "https://www.nba.com/news/rss.xml" },
    { name: "Record Geral", url: "https://www.record.pt/rss/mais-desporto" },
    { name: "A Bola Geral", url: "https://www.abola.pt/rss/internacional" },
  ],
};

const CATEGORY_FALLBACK_IMAGES = {
  football: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200",
  pavilion: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
  action: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200",
  others: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=1200",
};

function cleanString(str: string): string {
  if (!str) return "";
  return str
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .trim();
}

export async function fetchNews(category: keyof typeof CATEGORY_FEEDS = "football"): Promise<NewsItem[]> {
  const feeds = CATEGORY_FEEDS[category];
  const allNews: NewsItem[] = [];

  const fetchPromises = feeds.map(async (feed) => {
    try {
      // Use a timeout and more robust fetch for RSS
      const parsedFeed = await parser.parseURL(feed.url);
      
      return parsedFeed.items.map((item) => {
        // Image extraction logic
        let imageUrl = CATEGORY_FALLBACK_IMAGES[category];
        
        if (item.mediaContent && item.mediaContent[0] && item.mediaContent[0].$) {
          imageUrl = item.mediaContent[0].$.url;
        } else if (item.enclosure && item.enclosure[0] && item.enclosure[0].url) {
          imageUrl = item.enclosure[0].url;
        } else if (item.image) {
          imageUrl = item.image;
        } else {
          // Try to extract from content if possible
          const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) imageUrl = imgMatch[1];
        }

        return {
          id: item.guid || item.link || Math.random().toString(36),
          title: cleanString(item.title || "No Title"),
          link: item.link || "#",
          pubDate: item.pubDate || new Date().toISOString(),
          content: item.content || "",
          contentSnippet: cleanString(item.contentSnippet || "").slice(0, 160) + "...",
          imageUrl,
          source: feed.name,
          category,
        };
      });
    } catch (error) {
      console.warn(`Error fetching feed ${feed.url}:`, error);
      return [];
    }
  });

  const results = await Promise.all(fetchPromises);
  results.forEach((items) => allNews.push(...items));

  // Remove duplicates based on ID or Title
  const seen = new Set();
  const uniqueNews = allNews.filter((item) => {
    const duplicate = seen.has(item.title);
    seen.add(item.title);
    return !duplicate;
  });

  // Sort by date descending
  return uniqueNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}
