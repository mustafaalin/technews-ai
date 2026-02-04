import { Context } from "https://edge.netlify.com";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_ANON_KEY");

const BOT_USER_AGENTS = [
  "Twitterbot",
  "Twitter",
  "facebookexternalhit",
  "WhatsApp",
  "LinkedInBot",
  "Slackbot",
  "TelegramBot",
  "Discordbot",
  "SkypeUriPreview",
  "Pinterest",
  "bitlybot",
];

function isBotRequest(userAgent: string): boolean {
  return BOT_USER_AGENTS.some((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
}

async function fetchPostFromSupabase(
  pathname: string
): Promise<any | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Supabase credentials not found");
    return null;
  }

  try {
    const normalizedPath = pathname.startsWith("/")
      ? pathname.slice(1)
      : pathname;

    const langMatch = normalizedPath.match(/^(tr|en)\//);
    const language = langMatch ? langMatch[1] : "tr";

    const urlField = language === "en" ? "full_url_en" : "full_url_tr";

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?${urlField}=eq.${normalizedPath}&is_published=eq.true&select=id,title,title_en,summary,summary_en,content,content_en,image_url,author,publish_date,categories(name,name_en)`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Supabase fetch failed:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      console.log("No post found for path:", normalizedPath);
      return null;
    }

    return { post: data[0], language };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

function injectMetaTags(html: string, post: any, language: string, fullUrl: string): string {
  const title = language === "en" ? (post.title_en || post.title) : post.title;
  const summary = language === "en" ? (post.summary_en || post.summary) : post.summary;
  const categoryName = language === "en"
    ? (post.categories?.name_en || post.categories?.name || "Tech News")
    : (post.categories?.name || "Teknoloji Haberleri");

  const siteName = "Pulse of Tech";
  const siteUrl = "https://pulseoftech.net";
  const imageUrl = post.image_url || `${siteUrl}/favicon.png`;

  const metaTags = `
    <!-- Primary Meta Tags -->
    <title>${title} | ${siteName}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${summary}">
    <meta name="author" content="${post.author || 'Mustafa ALIN'}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${siteUrl}/${fullUrl}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${summary}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:site_name" content="${siteName}">
    <meta property="article:author" content="${post.author || 'Mustafa ALIN'}">
    <meta property="article:section" content="${categoryName}">
    ${post.publish_date ? `<meta property="article:published_time" content="${post.publish_date}">` : ''}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${siteUrl}/${fullUrl}">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${summary}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:site" content="@pulseoftech">
    <meta name="twitter:creator" content="@pulseoftech">
  `;

  return html.replace("</head>", `${metaTags}\n  </head>`);
}

export default async (request: Request, context: Context) => {
  const userAgent = request.headers.get("user-agent") || "";
  const url = new URL(request.url);
  const pathname = url.pathname;

  const isPostPage = pathname.match(/^\/(tr|en)\/post\/.+/);

  if (isPostPage && isBotRequest(userAgent)) {
    console.log(`Bot detected: ${userAgent} on ${pathname}`);

    const result = await fetchPostFromSupabase(pathname);

    if (result && result.post) {
      const response = await context.next();
      const html = await response.text();

      const modifiedHtml = injectMetaTags(
        html,
        result.post,
        result.language,
        pathname.slice(1)
      );

      return new Response(modifiedHtml, {
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      });
    }
  }

  return context.next();
};
