import type { APIRoute } from 'astro';

// robots.txt généré au build (AUT-11) : la ligne `Sitemap:` suit le `site`
// configuré (SITE_URL / CF_PAGES_URL / défaut matoulab.com) au lieu d'être
// codée en dur — sinon un blog déployé sur *.pages.dev pointerait Google vers
// le sitemap d'un domaine qui ne résout pas. Le reste (accès IA/GEO, exclusion
// de l'espace éditorial) est inchangé par rapport à l'ancien public/robots.txt.
const RULES = `# Matoulab — robots.txt
# L'espace éditorial n'est jamais indexé.
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /uploads/

# GEO : on autorise explicitement les robots des moteurs génératifs / IA
# (pour être cité dans ChatGPT, Perplexity, Google AI Overviews, Claude...).
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /`;

export const GET: APIRoute = ({ site }) => {
  // `site` = l'URL configurée dans astro.config (SITE_URL/CF_PAGES_URL/défaut).
  const sitemap = new URL('sitemap-index.xml', site).href;
  return new Response(`${RULES}\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
