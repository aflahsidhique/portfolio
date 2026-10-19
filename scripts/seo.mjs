import { loadEnv } from 'vite';
import { site, toolkit, projects, faqs } from '../site.config.mjs';

export function getSiteUrl(mode = 'production') {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const url = new URL(env.SITE_URL || site.url);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be an HTTPS origin, such as https://www.aflahsidhique.in/');
  }
  return url.href;
}

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

function structuredData(url) {
  const personId = `${url}#person`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': personId, name: site.name, alternateName: site.shortName,
        url, jobTitle: 'Full-Stack Developer', description: site.description,
        email: `mailto:${site.email}`, sameAs: [site.github, site.linkedin],
        homeLocation: { '@type': 'Place', name: site.location }, knowsAbout: toolkit,
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Seethi Sahib Memorial Polytechnic College, Tirur' },
        subjectOf: { '@type': 'DigitalDocument', name: `${site.shortName} résumé`, url: new URL(site.resume, url).href, encodingFormat: 'application/pdf' },
      },
      {
        '@type': 'WebSite', '@id': `${url}#website`, url, name: `${site.shortName} — Portfolio`,
        description: site.description, inLanguage: 'en', publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage', '@id': `${url}#webpage`, url, name: site.title,
        description: site.description, inLanguage: 'en', mainEntity: { '@id': personId },
        isPartOf: { '@id': `${url}#website` },
        primaryImageOfPage: { '@type': 'ImageObject', url: new URL(site.image, url).href, width: 1200, height: 630 },
        hasPart: { '@id': `${url}#faq` },
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`, url: `${url}#faq`,
        isPartOf: { '@id': `${url}#webpage` }, about: { '@id': personId },
        mainEntity: faqs.map(({ question, answer }) => ({
          '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };
}

export function renderSeoHead(url) {
  const meta = (name, content, property = false) => `<meta ${property ? 'property' : 'name'}="${name}" content="${escapeHtml(content)}" />`;
  return [
    `<title>${escapeHtml(site.title)}</title>`,
    meta('description', site.description), meta('author', site.name),
    meta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'),
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    '<link rel="sitemap" type="application/xml" href="/sitemap.xml" />',
    '<link rel="describedby" href="/llms.txt" type="text/plain" />',
    `<link rel="me" href="${escapeHtml(site.github)}" />`, `<link rel="me" href="${escapeHtml(site.linkedin)}" />`,
    meta('og:type', 'profile', true), meta('og:site_name', `${site.shortName} — Portfolio`, true),
    meta('og:title', site.title, true), meta('og:description', site.description, true),
    meta('og:url', url, true), meta('og:locale', 'en_IN', true),
    meta('og:image', new URL(site.image, url).href, true), meta('og:image:type', 'image/png', true),
    meta('og:image:width', '1200', true), meta('og:image:height', '630', true), meta('og:image:alt', site.imageAlt, true),
    meta('twitter:card', 'summary_large_image'), meta('twitter:title', site.title),
    meta('twitter:description', site.description), meta('twitter:image', new URL(site.image, url).href), meta('twitter:image:alt', site.imageAlt),
    `<script type="application/ld+json">${JSON.stringify(structuredData(url)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}

export function createSeoFiles(url) {
  const profile = `# ${site.name}\n\n> ${site.description}\n\n## Profile\n\n- Name: ${site.name} (also known as ${site.shortName})\n- Role: Full-stack developer\n- Location: ${site.location}\n- Website: ${url}\n- Email: ${site.email}\n- GitHub: ${site.github}\n- LinkedIn: ${site.linkedin}\n- Résumé: ${new URL(site.resume, url).href}\n\n## Development\n\nAflah builds responsive frontends, APIs, database models and integrations. His toolkit includes ${toolkit.join(', ')}.\n\n## Selected work\n\nThe project previews on the portfolio are illustrative interface concepts based on Aflah's development experience.\n\n${projects.map(project => `### ${project.name}\n\n${project.description}\n\nTechnologies: ${project.tags.join(', ')}.\n\n${project.details.map(detail => `- ${detail}`).join('\n')}`).join('\n\n')}\n\n## Experience\n\n- Junior Software Developer, Infinio Technology Solutions, Thrissur, Kerala: February–December 2025.\n- Junior Software Developer, Techfriar Technologies, Infopark, Kochi: June 2024–June 2025.\n- Software Development Trainee, Techfriar Technologies, Infopark, Kochi: August 2023–March 2024.\n\n## Education\n\nDiploma in Computer Engineering, Seethi Sahib Memorial Polytechnic College, Tirur, 2022–2024. CGPA: 8.92.\n\n## Questions and answers\n\n${faqs.map(({ question, answer }) => `### ${question}\n\n${answer}`).join('\n\n')}\n\n## Contact\n\nEmail ${site.email} to discuss a project, opportunity or conversation.\n`;
  return {
    'robots.txt': `# Public portfolio: allow search and AI crawlers that honor robots.txt.\nUser-agent: *\nAllow: /\n\nSitemap: ${url}sitemap.xml\n`,
    'sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeHtml(url)}</loc>\n  </url>\n</urlset>\n`,
    'llms.txt': `# ${site.name}\n\n> ${site.description}\n\nThis is the official portfolio of ${site.name}, based in ${site.location}. The summaries below describe the same experience and projects shown on the website.\n\n## Portfolio\n\n- [Homepage](${url}): biography, selected work, experience and contact.\n- [Full text](${url}llms-full.txt): complete plain-text portfolio summary.\n- [Selected work](${url}#work): engineering job portal, fleet platform and NILA application.\n- [Questions and answers](${url}#faq): identity, technologies, projects and contact.\n- [Résumé](${new URL(site.resume, url).href}): downloadable PDF.\n\n## Profiles and contact\n\n- [GitHub](${site.github}): development profile.\n- [LinkedIn](${site.linkedin}): professional profile.\n- [Email](mailto:${site.email}): project and opportunity enquiries.\n\n## Optional\n\n- [Sitemap](${url}sitemap.xml): canonical indexable page.\n`,
    'llms-full.txt': profile,
  };
}
