# Portfolio search and discovery

Production URL: **https://www.aflahsidhique.in/**

## Included

- Build-time HTML prerendering exposes portfolio text without waiting for JavaScript.
- Canonical, Open Graph and Twitter metadata use the production URL, with `/og-image.png` for link previews.
- JSON-LD describes the person, website, profile page and the FAQ shown on the page.
- `/robots.txt` advertises `/sitemap.xml`; `/llms.txt` and `/llms-full.txt` provide readable portfolio information for tools that support them.

## Maintain and validate

1. Keep identity, URLs, projects and FAQ answers accurate in `site.config.mjs` and the visible portfolio. Structured data must agree with visible content. [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)
2. The default origin is `https://www.aflahsidhique.in/`. Set `SITE_URL` in `.env.local` or the hosting environment only when changing the public origin, then rebuild.
3. Vite refreshes the generated public files automatically when running `npm run dev` or `npm run build`.
4. Run `npm run build`, then `npm run preview` to inspect the production page and crawl files.
5. Add future indexable pages to the sitemap when they have real URLs. Homepage anchors such as `#work` are sections of the same page. Include canonical page URLs and use `lastmod` only for actual significant content updates. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
6. The social preview is a static PNG. Update it if the branding or domain changes.

After deployment, verify these public endpoints return HTTP 200 and their actual content, rather than the app's HTML fallback:

| Endpoint | Expected response |
| --- | --- |
| `/` | HTML containing the name, portfolio text, canonical URL and JSON-LD in the server response |
| `/robots.txt` | `text/plain`, including the production sitemap URL |
| `/sitemap.xml` | XML content type, valid XML and production URLs |
| `/llms.txt`, `/llms-full.txt` | Plain text |
| `/og-image.png` | `image/png`, usable as a link preview |

Check that HTTP and non-www domain variants redirect to the preferred HTTPS www URL. Ensure hosting protection does not block public crawlers. Use Google's [Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/) to inspect markup; valid schema alone does not guarantee a search feature.

## Submit after deployment

1. Add and verify the domain in [Google Search Console](https://search.google.com/search-console). Open **Sitemaps** and submit `https://www.aflahsidhique.in/sitemap.xml`. Use URL Inspection on the homepage to test the live page and request indexing. Submission helps discovery but does not guarantee indexing. [Google submission documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#submit)
2. Add and verify the site in [Bing Webmaster Tools](https://www.bing.com/webmasters/), or import the verified Search Console site. Open **Sitemaps** and submit the same URL. Monitor processing and indexing errors. [Bing sitemap documentation](https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed)
3. Review indexing, queries, impressions and clicks after crawling begins, then periodically. Fix broken URLs and keep project evidence current.

These account submissions and external profile edits have not been performed by the repository changes.

## Priorities from your Google results

Live checks on **19 October 2026 (Asia/Calcutta)** found the www homepage, robots.txt, sitemap and llms.txt responding with HTTP 200. The homepage already serves prerendered content, an index/follow directive and the correct www canonical.

1. **Fix the bare domain.** `http://aflahsidhique.in/` returned HTTP 409 and HTTPS failed the TLS handshake from the audit environment. DNS returned A records `216.24.57.1` and `216.198.79.1`. Check the domain's required values in Vercel Project Settings → Domains, correct the DNS/certificate configuration and redirect it to `https://www.aflahsidhique.in/`. Use the values Vercel shows for this project; do not change records solely from this observation. HTTP www already redirects to HTTPS www. [Vercel domain setup](https://vercel.com/docs/domains/set-up-custom-domain), [redirects](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting)
2. **Check Google's index directly.** In Search Console, inspect `https://www.aflahsidhique.in/`, test the live URL, check Google's selected canonical and any exclusion reason, then request indexing after fixes. Submit `https://www.aflahsidhique.in/sitemap.xml`. A missing result in the screenshot or a `site:` search alone does not establish indexing status. [URL Inspection documentation](https://support.google.com/webmasters/answer/9012289?hl=en)
3. **Align your identity.** Keep “Aflah Sidhique MK” / “Aflah Sidhique”, Kerala and your website consistent across profiles. Your confirmed current roles are Chief Technology Officer at Greeny Rewards (full-time, June 2026–present) and freelance Full Stack Developer at Axio Flux Technologies (March 2026–present). Deploy the updated portfolio and keep your résumé and external profiles consistent with these roles. Refresh any outdated student descriptions. Review your older [LinkedIn account](https://www.linkedin.com/in/aflah-sidhique-85713518b/) and consolidate or update it if outdated.
4. **Review the closed business listing carefully.** Reopen it only if it represents the same legitimate, currently operating business and the closure label is wrong. Google says not to reopen a listing closed because of a location or name change. [Google reopening guidance](https://support.google.com/business/answer/15300571?hl=en)

## Build real backlinks

Backlinks must point **from another website to this portfolio**. The local profile links and `sameAs` entries help identify you; they do not create those incoming links. No external account updates or Search Console submissions have been performed, and no account integration is connected for these edits.

| Your profile | Add or update |
| --- | --- |
| [GitHub](https://github.com/aflahsidhique) | The Website field is empty: set it to the production URL. Add the link below to your existing [profile README](https://github.com/aflahsidhique/aflahsidhique/blob/main/README.md). The portfolio repository's About website is already correct. |
| [LinkedIn](https://www.linkedin.com/in/aflahsidhique/) | Add the portfolio in Contact info and Featured with a short description. Optionally add a relevant portfolio/project link to your [NodeSweep post](https://www.linkedin.com/posts/aflahsidhique_nodesweep-nodejs-npm-activity-7512872205454815234-vBYa) where it helps readers. |
| [Instagram](https://www.instagram.com/aflahsidhique/) | Add the URL through Edit profile → Links. Your GitHub profile links to `/aflah_sidhique`, while your confirmed profile is `/aflahsidhique`; make that reference consistent. |
| [Facebook](https://www.facebook.com/aflah.sidhique) | Add the portfolio to your profile's website/contact details. |
| [HackerOne](https://hackerone.com/psychojan) | Add the portfolio to the website field if offered, or a relevant public biography field. |

[GitHub profile README instructions](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme). AeroLeads and Facebook's generic people-search result are not owned profile backlink fields; do not copy every result into your site.

Ready-to-paste biography and README link:

```text
Aflah Sidhique MK is a full-stack developer based in Kerala, India, Chief Technology Officer at Greeny Rewards and a freelance Full Stack Developer at Axio Flux Technologies.
Explore my projects and experience: https://www.aflahsidhique.in/
```

```markdown
[Explore my portfolio and projects](https://www.aflahsidhique.in/)
```

Publish useful project case studies with your contribution and verifiable results, then seek relevant credits from collaborators with their permission. Avoid purchased links, bulk directories and automated comment spam. [Google link spam policy](https://developers.google.com/search/docs/essentials/spam-policies#link-spam)

These steps can improve discovery and identity consistency, but cannot guarantee a #1 position. Monitor impressions, clicks and position for “aflah sidhique” and name variants in Search Console over the following weeks. [Google SEO guidance](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## AEO and GEO expectations

Clear factual text, consistent identity, useful project evidence and crawlable HTML support discovery by search and answer systems. Google states that its AI search features use existing SEO fundamentals and have no additional technical requirements; inclusion is not guaranteed. [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)

`llms.txt` is an optional [community proposal](https://llmstxt.org/) for machine-readable context. It does not guarantee ingestion, citations or rankings. Google explicitly states that these files do not affect its Search visibility or rankings. [Google's June 2026 clarification](https://developers.google.com/search/updates#june-2026)

The visible FAQ provides concise answers, with matching FAQPage markup for compatible consumers. Google discontinued FAQ rich results in 2026, so this portfolio should not expect an FAQ rich result. [Google Search documentation update](https://developers.google.com/search/updates#june-2026)
