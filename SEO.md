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

## Build real backlinks

Backlinks exist on other websites; adding files or outbound links here cannot create them.

- Set the GitHub profile website to the production URL. Replace the repository About section's obsolete Vercel deployment URL with it.
- The repository README includes a portfolio link, which becomes public when pushed. Add a relevant link to the GitHub profile README as well.
- Add the portfolio to LinkedIn contact information and Featured, and any other professional profiles you actually use.
- Publish useful project case studies with the problem, your contribution, implementation choices and verifiable results. With permission, ask collaborators or organizations to credit your contribution with a relevant link.
- Avoid purchased links, bulk directory submissions and automated comment spam. [Google link spam policy](https://developers.google.com/search/docs/essentials/spam-policies#link-spam)

Ready-to-paste profile README link:

```markdown
[Explore my portfolio and projects](https://www.aflahsidhique.in/)
```

## AEO and GEO expectations

Clear factual text, consistent identity, useful project evidence and crawlable HTML support discovery by search and answer systems. Google states that its AI search features use existing SEO fundamentals and have no additional technical requirements; inclusion is not guaranteed. [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)

`llms.txt` is an optional [community proposal](https://llmstxt.org/) for machine-readable context. It does not guarantee ingestion, citations or rankings. Google explicitly states that these files do not affect its Search visibility or rankings. [Google's June 2026 clarification](https://developers.google.com/search/updates#june-2026)

The visible FAQ provides concise answers, with matching FAQPage markup for compatible consumers. Google discontinued FAQ rich results in 2026, so this portfolio should not expect an FAQ rich result. [Google Search documentation update](https://developers.google.com/search/updates#june-2026)
