import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: true }],
      ['media:thumbnail', 'mediaThumbnail'],
    ],
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  }
});

const FEEDS = {
  football: [
    "https://www.skysports.com/rss/12040",
    "http://feeds.bbci.co.uk/sport/football/rss.xml",
    "https://www.uefa.com/rss/index.xml",
  ],
  motorsport: [
    "https://www.skysports.com/rss/12433",
    "https://www.motorsport.com/rss/f1/news/",
  ],
  bouncing: [
    "https://www.skysports.com/rss/12000",
    "https://www.espn.com/espn/rss/nba/news",
  ],
  mind: [
    "https://www.cardplayer.com/rss/news",
    "https://pokerfuse.com/feed/",
  ]
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "football";

  // @ts-ignore
  const urls = FEEDS[category as keyof typeof FEEDS] || FEEDS.football;

  try {
    const feedPromises = urls.map((url: string) => 
      parser.parseURL(url).catch(err => {
        console.error(`Error fetching ${url}:`, err);
        return null;
      })
    );

    const results = await Promise.all(feedPromises);
    
    const items = results
      .filter((feed): feed is Parser.Output<any> => !!feed)
      .flatMap((feed: Parser.Output<any>) => {
        return (feed.items || []).map((item: any) => {
          let image = FALLBACK_IMAGE;
          
          if (item.mediaContent && item.mediaContent[0]?.$.url) {
            image = item.mediaContent[0].$.url;
          } else if (item.mediaThumbnail && item.mediaThumbnail.$.url) {
            image = item.mediaThumbnail.$.url;
          } else if (item.enclosure?.url) {
            image = item.enclosure.url;
          } else if (item.content) {
            const imgReg = /<img[^>]+src="([^">]+)"/;
            const match = item.content.match(imgReg);
            if (match && match[1]) image = match[1];
          } else if (item.contentSnippet) {
             const imgReg = /<img[^>]+src="([^">]+)"/;
             const match = item.contentSnippet.match(imgReg);
             if (match && match[1]) image = match[1];
          }

          return {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source: feed.title || "Sports News",
            image: image,
            description: item.contentSnippet?.slice(0, 150) + "..." || "",
          };
        });
      })
      .sort((a: any, b: any) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime())
      .slice(0, 24);

    return NextResponse.json(items);
  } catch (error) {
    console.error("News API Error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
