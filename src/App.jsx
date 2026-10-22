import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, Plus, Minus, X, Menu, Github, Linkedin, Copy, Check, Download, Command, MapPin, Layers, Code2, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { site, projects, toolkit, faqs, profiles, roles } from '../site.config.mjs';
import DecorativeStar from './DecorativeStar.jsx';

const Sculpture = lazy(() => import('./Sculpture.jsx'));
gsap.registerPlugin(ScrollTrigger);
const email = site.email;

function ProjectPreview({ type }) {
  if (type === 'portal') return <div className="project-art portal-art" aria-hidden="true"><div className="art-grid" /><div className="portal-window"><div className="mock-nav"><strong><span className="tiny-star"><DecorativeStar /></span> core<span className="brand-period">.</span></strong><span>Find a job　　For companies</span><span className="mock-nav-button">Get started ↗</span></div><div className="portal-content"><div className="mock-eyebrow">BUILT FOR THE BUILDERS.</div><h4>Your next chapter.<br /><span>Engineered better.</span></h4><p>Meaningful careers for the people shaping our world.</p><div className="mock-search"><span>Job title or keyword</span><span className="mock-search-button">Find your next move ↗</span></div><div className="mock-categories"><span>Mechanical ↗</span><span>Civil & structural ↗</span><span>Electrical ↗</span></div></div><div className="portal-sticker"><ArrowUpRight size={35} /><span>BUILD<br />WHAT’S NEXT.</span></div></div><span className="art-caption">A BETTER CONNECTION.</span><div className="art-orbit" /></div>;
  if (type === 'fleet') return <div className="project-art fleet-art" aria-hidden="true"><div className="fleet-window"><aside className="mock-sidebar"><strong><Command size={16} /> fleet<span>wise</span></strong><span className="mock-active">◫　Overview</span><span>▱　Vehicles</span><span>⌁　Live tracking</span><span>◷　Maintenance</span><span>▤　Reports</span><div className="mock-sidebar-bottom">● All systems operational</div></aside><div className="fleet-content"><div className="fleet-heading"><strong>Fleet overview</strong><span>Today⌄　　↗</span></div><p>Your operations, at a glance.</p><div className="fleet-stats"><div><span>Total vehicles</span><strong>48 <small>↗ 8.2%</small></strong></div><div><span>On the move</span><strong>36 <i /></strong></div><div><span>Fleet efficiency</span><strong>94<small>%</small></strong></div></div><div className="fleet-map"><svg viewBox="0 0 500 240"><g fill="none" stroke="#29423c" strokeWidth="14"><path d="M-10 55 150 120 370 80 510 150M80-10 170 110 160 250M360-10 310 100 390 250M-10 205 210 155 510 180" /></g><path d="m95 70 73 40 150-27 49 106" fill="none" stroke="#b6ed7d" strokeWidth="3" strokeDasharray="5 4"/><g fill="#bcf889" stroke="#234b36" strokeWidth="5"><circle cx="95" cy="70" r="8"/><circle cx="318" cy="83" r="8"/><circle cx="367" cy="189" r="8"/></g></svg><span className="map-label">⌁ Live fleet tracking <i /></span><span className="map-tooltip">VH–028　 <strong>On route ↗</strong></span></div></div></div><span className="art-caption">CLARITY IN EVERY MILE.</span></div>;
  return <div className="project-art nila-art" aria-hidden="true"><div className="nila-orb">n<span><DecorativeStar variant="sparkle" /></span></div><div className="nila-word">play. earn. repeat.</div><div className="phone"><div className="phone-top"><span>9:41</span><span>● ▰</span></div><div className="phone-brand">NILA <span><DecorativeStar variant="sparkle" /></span></div><small>YOUR TOTAL BALANCE</small><strong className="coin-balance">24,680 <span>N</span></strong><div className="phone-coin">n<span><DecorativeStar variant="sparkle" /></span></div><div className="phone-energy">ϟ 850 / 1,000 <span>Boost ↗</span></div><div className="phone-tabs"><span>◈<br />Earn</span><span>♧<br />Friends</span><span>▱<br />Wallet</span></div></div><span className="art-caption">A LITTLE PLAY. A LOT OF POSSIBILITY.</span></div>;
}

function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, []);
  return <dialog ref={dialog} className="project-dialog" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="project-title" data-lenis-prevent><button className="dialog-close icon-button" aria-label="Close project" onClick={onClose}><X /></button><ProjectPreview type={project.theme} /><div className="dialog-content"><span className="eyebrow">{project.type}</span><h2 id="project-title">{project.name}</h2><p>{project.description}</p><ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p className="preview-note">Illustrative interface concept. Project details are based on my development experience.</p><a className="button dark-button" href={`mailto:${email}?subject=${encodeURIComponent(`Let's talk about ${project.name}`)}`}>Let’s talk about this project <ArrowUpRight size={18} /></a></div></dialog>;
}

function useReducedMotion() {
  // Keep the server and initial hydration render identical, and only enable
  // motion after the browser's preference has been read.
  const [reduced, setReduced] = useState(true);
  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  return reduced;
}

function ClientSculpture({ reducedMotion }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const fallback = <div className="sculpture" aria-hidden="true"><div className="sculpture-fallback" /></div>;
  // WebGL is decorative. Render its fallback in the HTML, then load the canvas
  // after hydration so renderToString never needs to resolve this lazy module.
  return mounted ? <Suspense fallback={fallback}><Sculpture reducedMotion={reducedMotion} /></Suspense> : fallback;
}

function CursorFollower({ disabled }) {
  const cursor = useRef(null);
  useEffect(() => {
    if (disabled || !window.matchMedia('(pointer: fine)').matches) return;
    const element = cursor.current;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    let initialized = false;
    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const move = event => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!initialized) {
        currentX = targetX;
        currentY = targetY;
        initialized = true;
      }
      element.classList.add('is-visible');
      element.classList.toggle('is-active', Boolean(event.target.closest?.('a, button, input, textarea, select, summary, [role="button"]')));
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const hide = () => element.classList.remove('is-visible');
    const press = () => element.classList.add('is-pressed');
    const release = () => element.classList.remove('is-pressed');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });
    window.addEventListener('pointerup', release, { passive: true });
    window.addEventListener('blur', hide);
    document.documentElement.addEventListener('mouseleave', hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('blur', hide);
      document.documentElement.removeEventListener('mouseleave', hide);
    };
  }, [disabled]);
  return <div className="cursor-follower" ref={cursor} aria-hidden="true"><span /></div>;
}

export default function App() {
  const root = useRef(null);
  const lenis = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [openRole, setOpenRole] = useState(0);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const smooth = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true });
    lenis.current = smooth;
    smooth.on('scroll', ScrollTrigger.update);
    const tick = time => smooth.raf(time * 1000);
    gsap.ticker.add(tick);
    const context = gsap.context(() => {
      gsap.from('.hero-line > span', { yPercent: 105, rotate: 2, duration: 1.15, stagger: 0.13, ease: 'power4.out', delay: 0.1 });
      gsap.from('.hero-meta, .hero-description, .hero-actions, .hero-foot', { y: 18, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.55 });
      gsap.from('.hero-art', { scale: 0.86, opacity: 0, duration: 1.6, ease: 'power3.out', delay: 0.25 });
      gsap.utils.toArray('[data-reveal]').forEach(element => gsap.from(element, { y: 45, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 91%', once: true } }));
      gsap.to('.hero-art-inner', { y: 75, rotation: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.to('.marquee-track', { xPercent: -20, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    }, root);
    return () => { context.revert(); gsap.ticker.remove(tick); smooth.destroy(); lenis.current = null; };
  }, [reducedMotion]);

  useEffect(() => {
    if (menuOpen || project) lenis.current?.stop(); else lenis.current?.start();
  }, [menuOpen, project, reducedMotion]);
  useEffect(() => { ScrollTrigger.refresh(); }, [openRole]);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = e => { if (e.key === 'Escape') { setMenuOpen(false); document.getElementById('menu-toggle')?.focus(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [menuOpen]);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); clearTimeout(copyTimer.current); copyTimer.current = setTimeout(() => setCopied(false), 2500); }
    catch { window.location.href = `mailto:${email}`; }
  };

  return <div ref={root}>
    <CursorFollower disabled={reducedMotion} />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="brand" href="#home" aria-label="Aflah Sidhique home">aflah<span className="brand-dot">.</span><span className="brand-asterisk"><DecorativeStar /></span></a><nav className={menuOpen ? 'navigation is-open' : 'navigation'} id="navigation" aria-label="Main navigation">{[['Work', 'work'], ['About', 'about'], ['Experience', 'experience']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<span className="nav-dot" /></a>)}<a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={17} /></a></nav><button id="menu-toggle" className="menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></header>
    <main id="main">
      <section className="hero section-shell" id="home">
        <div className="hero-meta"><span className="eyebrow">INDEPENDENT MIND. FULL-STACK DEVELOPER.</span><span className="availability"><i /> Open to opportunities</span></div>
        <div className="hero-main"><div className="hero-copy"><h1><span className="hero-name">{site.name}</span><span className="hero-line"><span>Thoughtful code.</span></span><span className="hero-line"><span>Distinctive</span></span><span className="hero-line accent-line"><span>experiences<span className="title-period">.</span></span></span></h1><p className="hero-description">Hi, I am Aflah Sidhique MK, a full-stack developer and CTO in Kerala, India.<br /> I turn complex problems into simple, human experiences.</p><div className="hero-actions"><a className="button dark-button" href="#work">Explore my work <ArrowDown size={17} /></a><a className="text-link" href="#about">A little about me <ArrowUpRight size={17} /></a></div></div><div className="hero-art"><div className="art-cross cross-top">+</div><div className="hero-art-inner"><ClientSculpture reducedMotion={reducedMotion} /></div><div className="sculpture-shadow" /><div className="object-label"><span className="object-label-line" /><span>LOGIC MEETS A LITTLE MAGIC.</span></div><div className="art-cross cross-bottom">+</div><span className="art-coordinate">FIG. 01 — ALWAYS EVOLVING</span></div></div>
        <div className="hero-foot"><span><span className="location-dot" /> BASED IN KERALA, INDIA <span className="muted">/ AVAILABLE WORLDWIDE</span></span><a href="#work">SCROLL TO EXPLORE <ArrowDown size={14} /></a><span className="folio-edition">PORTFOLIO — 2026</span></div>
      </section>

      <section className="work-section section-shell" id="work"><div className="section-heading" data-reveal><div><span className="eyebrow"><span className="section-index">01 /</span> SELECTED WORK</span><h2>Ideas, made real<span className="orange">.</span></h2></div><p>A few things I’ve helped bring to life.<br />Built with purpose. Crafted with care.</p></div><div className="projects-grid">{projects.map((item, index) => <button className="project-card" key={item.id} onClick={() => setProject(item)} data-reveal aria-label={`View project: ${item.name}`}><div className="project-image"><ProjectPreview type={item.theme} /><span className="project-open"><ArrowUpRight size={23} /></span><span className="project-number">0{index + 1}</span></div><div className="project-info"><div><span className="eyebrow">{item.type}</span><h3>{item.name}</h3></div><ArrowUpRight size={22} /></div><p className="project-description">{item.description}</p><div className="project-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></button>)}</div><div className="work-bottom"><span>Good things happen when curiosity meets code.</span><a className="text-link" href={site.github} target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={17} /></a></div></section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track">CREATIVE THINKING <span><DecorativeStar /></span> CLEAN CODE <span><DecorativeStar /></span> REAL IMPACT <span><DecorativeStar /></span> CREATIVE THINKING <span><DecorativeStar /></span> CLEAN CODE <span><DecorativeStar /></span></div></div>

      <section className="about-section section-shell" id="about"><div className="about-top" data-reveal><div className="about-label"><span className="eyebrow"><span className="section-index">02 /</span> THE PERSON BEHIND THE PIXELS</span><div className="about-symbol" aria-hidden="true">a<span><DecorativeStar /></span></div><span className="about-location"><MapPin size={14} /> Kerala, India. Building for everywhere.</span></div><div className="about-copy"><h2>A developer’s mind.<br />A maker’s <span className="orange">curiosity.</span></h2><p>I am Aflah Sidhique MK, a full-stack developer and Chief Technology Officer at Greeny Rewards. I also work as a freelance Full-Stack Developer at Axio Flux Technologies.</p><p>From the first wireframe to the final API, I connect the dots between design and engineering. I’ve worked with teams to build everything from career platforms to real-time fleet dashboards — always with a focus on thoughtful details and dependable foundations.</p><a className="text-link resume-link" href="/aflah-sidhique-resume.pdf" download>Download my résumé <Download size={17} /></a><nav className="profile-links" aria-label="Aflah Sidhique profiles">{profiles.map(profile => <a key={profile.url} href={profile.url} target="_blank" rel="me noopener noreferrer">{profile.name}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</nav></div></div><div className="capabilities" data-reveal><div><Code2 /><span>01 / DEVELOPMENT</span><h3>Built from end to end.</h3><p>Responsive frontends, robust APIs, and the architecture that brings them together.</p></div><div><Layers /><span>02 / SYSTEMS</span><h3>Made to go further.</h3><p>Clean data models, secure integrations, and applications designed to scale.</p></div><div><Sparkles /><span>03 / CRAFT</span><h3>Details make the difference.</h3><p>Thoughtful interactions and performance that make the everyday feel effortless.</p></div></div><div className="toolbox" data-reveal><span className="eyebrow">MY EVERYDAY TOOLKIT</span><div>{toolkit.map(tech => <span key={tech}>{tech}</span>)}</div></div></section>

      <section className="experience-section section-shell" id="experience"><div className="section-heading" data-reveal><div><span className="eyebrow"><span className="section-index">03 /</span> THE JOURNEY SO FAR</span><h2>Always building.<br />Always learning<span className="orange">.</span></h2></div><p>Real teams. Real challenges.<br />A little better with every project.</p></div><div className="experience-list" data-reveal>{roles.map((role, index) => <article className={`experience-row ${openRole === index ? 'expanded' : ''}`} key={index}><button className="experience-toggle" onClick={() => setOpenRole(openRole === index ? null : index)} aria-expanded={openRole === index} aria-controls={`role-${index}`}><span className="experience-date">{role.period}</span><span className="experience-title"><strong>{role.company}</strong><span>{role.role}</span></span><span className="experience-plus">{openRole === index ? <Minus size={20} /> : <Plus size={20} />}</span></button><div className="experience-detail" id={`role-${index}`} hidden={openRole !== index}><p>{role.body}</p><span><MapPin size={13} /> {role.place}</span></div></article>)}</div><div className="education" data-reveal><span className="eyebrow">THE FOUNDATION</span><div><strong>Diploma in Computer Engineering</strong><span>Seethi Sahib Memorial Polytechnic College, Tirur</span></div><span>2022 — 2024 <span className="education-grade">CGPA 8.92</span></span></div></section>

      <section className="faq-section section-shell" id="faq" aria-labelledby="faq-heading"><div className="section-heading" data-reveal><div><span className="eyebrow">A LITTLE MORE ABOUT MY WORK</span><h2 id="faq-heading">A few things, answered<span className="orange">.</span></h2></div></div><div className="faq-list" data-reveal>{faqs.map(({ question, answer }) => <details className="faq-item" key={question}><summary>{question}<Plus size={20} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div><a className="text-link faq-contact" href={`mailto:${email}`}>Have another question? Get in touch <ArrowUpRight size={17} /></a></section>

      <section className="contact-section section-shell" id="contact"><div className="contact-top" data-reveal><span className="eyebrow"><span className="section-index">04 /</span> GOOD THINGS START WITH A HELLO</span><span className="availability"><i /> Open to opportunities</span></div><div className="contact-heading" data-reveal><h2>Have something<br />in <span>mind?</span></h2><a className="contact-arrow" href={`mailto:${email}`} aria-label="Email Aflah"><ArrowUpRight /></a></div><div className="contact-bottom" data-reveal><p>A project, an opportunity, or a good conversation.<br />I’d love to hear from you.</p><div className="email-group"><a href={`mailto:${email}`}>{email}</a><button className="icon-button copy-button" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'}>{copied ? <Check size={19} /> : <Copy size={19} />}</button><span className="copy-feedback" role="status">{copied ? 'Copied to clipboard' : ''}</span></div></div></section>
    </main>
    <footer className="site-footer section-shell"><a className="brand" href="#home">aflah<span className="brand-dot">.</span></a><span>© {new Date().getFullYear()} Aflah Sidhique. Built with intention.</span><div><a href={site.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a><a href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} /></a><a className="back-top" href="#home" aria-label="Back to top"><ArrowRight size={19} /></a></div></footer>
    {project && <ProjectDialog project={project} onClose={() => setProject(null)} />}
  </div>;
}
