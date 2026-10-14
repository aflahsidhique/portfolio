# Aflah Sidhique — Portfolio

A responsive React + Vite portfolio with GSAP/ScrollTrigger, Lenis smooth scrolling, and a pointer-responsive Three.js sculpture. Content is based on the supplied résumé. Project interfaces are illustrative concepts, identified as such in each project detail view.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the `dist` directory to any static host. Vercel can use its Vite preset with `npm run build` and output directory `dist`.

## Verification

```sh
npm run build
```

## Editing

- `src/App.jsx`: project and experience data, contact details, page sections, scroll animation setup, and cursor follower behavior.
- `src/styles.css`: responsive layouts, typography, color system, project interfaces, and cursor follower styling.
- `src/Sculpture.jsx`: lazy-loaded WebGL scene, pointer interaction, static fallback, and resource cleanup.
- `public/aflah-sidhique-resume.pdf`: downloadable résumé.

Fonts are served locally. System reduced-motion preferences disable smooth scrolling and animation. The 3D renderer pauses when offscreen or when the tab is hidden; a CSS sculpture is used when WebGL is unavailable. Contact opens the visitor’s email client; no backend or form service is required.
