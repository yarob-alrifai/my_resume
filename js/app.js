/* ============================================================
   Yarob Alrifai — CV App
   No server required · Data from cv-data.js
   ============================================================ */

'use strict';

// ── State ────────────────────────────────────────────────
let lang  = localStorage.getItem('cv-lang')  || 'en';
let theme = localStorage.getItem('cv-theme') || 'light';

// ── Helpers ──────────────────────────────────────────────
const t   = o => (!o ? '' : (typeof o === 'string' ? o : (o[lang] || o.en || '')));
const $   = (s, ctx = document) => ctx.querySelector(s);
const $$  = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const el  = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls)  e.className   = cls;
  if (html) e.innerHTML   = html;
  return e;
};

// ── SVG icons ────────────────────────────────────────────
const ic = {
  pin:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  mail:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7L22 7"/></svg>`,
  phone:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.59 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  tg:       `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.95 7.56-2.03 9.57c-.15.68-.54.84-1.09.52l-3-2.21-1.45 1.4c-.16.16-.29.29-.6.29l.21-3.03 5.5-4.97c.24-.21-.05-.33-.37-.12l-6.8 4.28-2.93-.92c-.64-.2-.65-.64.13-.95l11.44-4.41c.53-.19 1 .13.82.95z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
  github:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.03-1.6-4.03-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  behance:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.86 1.883 2.107 1.883.74 0 1.37-.417 1.582-1.013l2.067.159zM15.883 13h4.917c-.069-1.1-.719-1.853-2.313-1.853-1.405 0-2.306.72-2.604 1.853zM8.169 10.078c.456-.218.945-.558.945-1.42 0-1.653-1.195-2.158-2.912-2.158H0v10h6.299c1.86 0 3.3-.802 3.3-2.65 0-1.195-.612-1.906-1.43-2.272zm-5.63-.8h2.98c.572 0 1.062.19 1.062.9 0 .67-.404.942-1.1.942H2.539V9.278zm3.258 4.722H2.539v-2.17h3.286c.69 0 1.113.286 1.113 1.1 0 .756-.431 1.07-1.141 1.07z"/></svg>`,
  vk:       `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.6c-.6 0-.79-.48-1.87-1.57-1-.95-1.4-.95-1.64-.95-.27 0-.38.08-.38.44v1.44c0 .32-.1.5-1 .5-1.5 0-3.14-.9-4.3-2.6-1.75-2.47-2.23-4.33-2.23-4.7 0-.22.08-.42.44-.42h1.6c.33 0 .46.15.59.5.65 1.87 1.73 3.5 2.17 3.5.17 0 .24-.08.24-.5V9.57c-.05-.83-.48-1-.48-1.33 0-.16.13-.32.33-.32h2.52c.28 0 .38.15.38.47v2.52c0 .3.13.4.22.4.17 0 .3-.1.6-.4.9-.95 1.52-2.44 1.52-2.44.09-.22.27-.42.6-.42h1.6c.5 0 .6.25.5.5-.2.9-2.14 3.4-2.14 3.4-.17.27-.23.4 0 .7.17.22.73.73 1.1 1.17.68.73 1.2 1.33 1.33 1.75.15.4-.07.6-.47.6z"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  link:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  sun:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  menu:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  x:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  code:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  book:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  star:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  heart:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  box:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  globe:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
};

// ── SVG icons for export buttons ─────────────────────────
const icExport = {
  print: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  pdf:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  word:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="8 13 10 19 12 14 14 19 16 13"/></svg>`,
};

// ── i18n labels ──────────────────────────────────────────
const UI = {
  about:        { en: 'About Me',         ar: 'عن المرشح',         ru: 'О себе'           },
  skills:       { en: 'Technical Skills', ar: 'المهارات التقنية',  ru: 'Навыки'           },
  experience:   { en: 'Experience',       ar: 'الخبرة المهنية',    ru: 'Опыت работы'      },
  education:    { en: 'Education',        ar: 'التعليم',           ru: 'Образование'      },
  projects:     { en: 'Projects',         ar: 'المشاريع',          ru: 'Проекты'          },
  volunteering: { en: 'Volunteering',     ar: 'النشاط التطوعي',    ru: 'Волонтёрство'     },
  languages:    { en: 'Languages',        ar: 'اللغات',            ru: 'Языки'            },
  contact:      { en: 'Contact',          ar: 'تواصل معي',         ru: 'Контакты'         },
  nav:          { en: 'Navigate',         ar: 'التنقل',            ru: 'Навигация'        },
  current:      { en: 'Current',          ar: 'حالياً',            ru: 'Текущее'          },
  linkedin_cv:  { en: 'View LinkedIn',    ar: 'عرض LinkedIn',      ru: 'LinkedIn'         },
  exp_print:    { en: 'Print',            ar: 'طباعة',             ru: 'Печать'           },
  exp_pdf:      { en: 'Save PDF',         ar: 'حفظ PDF',           ru: 'PDF'              },
  exp_word:     { en: 'Word',             ar: 'Word',              ru: 'Word'             },
};
const ui = key => UI[key]?.[lang] || UI[key]?.en || key;

// ── Render: Sidebar ──────────────────────────────────────
function renderSidebar() {
  const D = window.CV_DATA;

  // Photo
  const avatarWrap = $('#avatar-wrap');
  avatarWrap.innerHTML = '';
  if (D.photo) {
    const img = document.createElement('img');
    img.className = 'avatar-img';
    img.alt = t(D.name);
    img.src = D.photo;
    img.onerror = () => {
      avatarWrap.innerHTML = `<div class="avatar-fallback">${initials(t(D.name))}</div>`;
    };
    avatarWrap.appendChild(img);
  } else {
    avatarWrap.innerHTML = `<div class="avatar-fallback">${initials(t(D.name))}</div>`;
  }

  $('#profile-name').textContent  = t(D.name);
  $('#profile-title').textContent = t(D.title);

  // Contact
  const cl = $('#contact-list');
  cl.innerHTML = [
    { ico: 'pin',      text: D.location },
    { ico: 'mail',     text: D.email,          href: `mailto:${D.email}` },
    { ico: 'phone',    text: D.phone,           href: `tel:${D.phone}` },
    { ico: 'tg',       text: '@' + D.telegram,  href: `https://t.me/${D.telegram}` },
    { ico: 'linkedin', text: 'LinkedIn',         href: D.links.linkedin },
    { ico: 'github',   text: 'GitHub',           href: D.links.github },
    { ico: 'behance',  text: 'Behance',          href: D.links.behance },
    { ico: 'vk',       text: 'VK',               href: D.links.vk },
  ].map(c => `
    <li class="c-item">
      <span class="ico">${ic[c.ico]}</span>
      ${c.href
        ? `<a href="${c.href}" target="_blank" rel="noopener" title="${c.text}">${c.text}</a>`
        : `<span>${c.text}</span>`}
    </li>`).join('');

  // Spoken languages
  const lb = $('#lang-badges');
  lb.innerHTML = D.spokenLanguages.map(l => `
    <div class="lang-row">
      <span>${t(l.name)}</span>
      <span class="badge">${t(l.level)}</span>
    </div>`).join('');

  // Nav
  renderNav();
}

function renderNav() {
  const navIco = { about:'star', skills:'code', experience:'book', education:'book', projects:'box', volunteering:'heart' };
  $('#sb-nav').innerHTML = Object.keys(navIco).map(key => `
    <div class="sb-nav-item" data-sec="${key}">
      ${ic[navIco[key]]}<span>${ui(key)}</span>
    </div>`).join('');

  $$('.sb-nav-item').forEach(it =>
    it.addEventListener('click', () => {
      $('#sec-' + it.dataset.sec)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu
      $('.sidebar')?.classList.remove('open');
    })
  );
}

// ── Render: Hero ─────────────────────────────────────────
function renderHero() {
  const D = window.CV_DATA;
  const parts = t(D.name).split(' ');
  $('#hero-name').innerHTML = parts.map((p, i) => i === parts.length - 1 ? `<em>${p}</em>` : p).join(' ');
  $('#hero-sub').textContent = t(D.title);
  $('#btn-linkedin').innerHTML = `${ic.link} ${ui('linkedin_cv')}`;
  $('#btn-contact').innerHTML  = `${ic.mail} ${ui('contact')}`;
  $('#btn-contact').href = `mailto:${D.email}`;
}

// ── Render: Sections ─────────────────────────────────────
function setSec(id, text) { $(`#sec-title-${id}`).textContent = text; }

function renderAbout() {
  setSec('about', ui('about'));
  $('#about-p').textContent = t(window.CV_DATA.about);
}

function renderSkills() {
  setSec('skills', ui('skills'));
  $('#skills-grid').innerHTML = window.CV_DATA.skills.map(cat => `
    <div class="skill-card">
      <div class="skill-cat">${t(cat.label)}</div>
      <div class="chips">${cat.items.map(i => `<span class="chip">${i}</span>`).join('')}</div>
    </div>`).join('');
}

function renderExperience() {
  setSec('experience', ui('experience'));
  $('#exp-timeline').innerHTML = window.CV_DATA.experience.map(e => {
    const company = typeof e.company === 'object' ? t(e.company) : e.company;
    const bullets = t(e.bullets) || [];
    const cur = e.current ? `<span class="current-badge">${ui('current')}</span>` : '';
    return `
    <div class="tl-item">
      <div class="tl-spine"><div class="tl-dot"></div><div class="tl-line"></div></div>
      <div class="tl-body">
        <div class="exp-meta">
          <span class="exp-title">${t(e.title)}${cur}</span>
          <span class="exp-period">${t(e.period)}</span>
        </div>
        <div class="exp-company"><b>${company}</b> · ${e.location}</div>
        <ul class="bullets">${bullets.map(b => `<li>${b}</li>`).join('')}</ul>
      </div>
    </div>`;
  }).join('');
}

function renderEducation() {
  setSec('education', ui('education'));
  $('#edu-list').innerHTML = window.CV_DATA.education.map(e => {
    const school = typeof e.school === 'object' ? t(e.school) : e.school;
    return `
    <div class="edu-card">
      <div>
        <div class="edu-degree">${t(e.degree)}</div>
        <div class="edu-school">${school} · ${e.location}</div>
      </div>
      <span class="edu-year">${t(e.year)}</span>
    </div>`;
  }).join('');
}

function renderProjects() {
  setSec('projects', ui('projects'));
  $('#projects-grid').innerHTML = window.CV_DATA.projects.map(p => `
    <div class="proj-card">
      <div class="proj-name">${p.name}</div>
      <div class="proj-desc">${t(p.desc)}</div>
      <div class="chips">${p.tech.map(tech => `<span class="chip">${tech}</span>`).join('')}</div>
    </div>`).join('');
}

function renderVolunteering() {
  setSec('volunteering', ui('volunteering'));
  $('#vol-list').innerHTML = window.CV_DATA.volunteering.map(v => `
    <div class="vol-card">
      <div class="vol-title">${t(v.title)}</div>
      <div class="vol-period">${t(v.period)}</div>
      <div class="vol-desc">${t(v.desc)}</div>
    </div>`).join('');
}

// ── Render: Export buttons ───────────────────────────────
function renderExportButtons() {
  const wrap = document.getElementById('export-btns');
  if (!wrap) return;
  wrap.innerHTML = `
    <button class="export-btn" id="exp-print" title="${UI.exp_print[lang]}">
      ${icExport.print}<span>${UI.exp_print[lang]}</span>
    </button>
    <button class="export-btn" id="exp-pdf" title="${UI.exp_pdf[lang]}">
      ${icExport.pdf}<span>${UI.exp_pdf[lang]}</span>
    </button>`;

  document.getElementById('exp-print').addEventListener('click', () => {
    if (typeof window.printCV === 'function') window.printCV();
    else window.print();
  });

  document.getElementById('exp-pdf').addEventListener('click', () => {
    if (typeof window.printCV === 'function') window.printCV();
    else window.print();
  });

}

// ── Render: All ──────────────────────────────────────────
function renderAll() {
  renderSidebar();
  renderHero();
  renderAbout();
  renderSkills();
  renderExperience();
  renderEducation();
  renderProjects();
  renderVolunteering();
  renderExportButtons();
}

// ── Language ─────────────────────────────────────────────
function setLang(l) {
  lang = l;
  localStorage.setItem('cv-lang', l);
  document.documentElement.lang = l;
  document.documentElement.dir  = l === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', l === 'ar');
  $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  renderAll();
}

// ── Theme ────────────────────────────────────────────────
function setTheme(th) {
  theme = th;
  localStorage.setItem('cv-theme', th);
  document.documentElement.dataset.theme = th;
  const ico = th === 'dark' ? ic.sun : ic.moon;
  ['theme-btn','theme-btn-mobile'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.innerHTML = ico;
  });
}
function toggleTheme() { setTheme(theme === 'dark' ? 'light' : 'dark'); }
window._toggleTheme = toggleTheme;

// ── Scroll spy ───────────────────────────────────────────
function initScrollSpy() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const id = en.target.dataset.secId;
        $$('.sb-nav-item').forEach(it => it.classList.toggle('active', it.dataset.sec === id));
      }
    });
  }, { threshold: 0.25 });
  $$('[data-sec-id]').forEach(s => obs.observe(s));
}

// ── Mobile menu ──────────────────────────────────────────
function initMobileMenu() {
  const toggle = $('#menu-toggle');
  const sidebar = $('.sidebar');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    toggle.innerHTML = open ? ic.x : ic.menu;
  });
}

// ── Utilities ────────────────────────────────────────────
function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ── Boot ─────────────────────────────────────────────────
function init() {
  if (!window.CV_DATA) {
    document.body.innerHTML = '<div style="padding:3rem;text-align:center;font-family:sans-serif;color:#f55">'
      + '<h2>⚠️ cv-data.js not loaded</h2>'
      + '<p>Make sure the file <code>data/cv-data.js</code> exists and is included in index.html</p></div>';
    return;
  }

  // Apply theme + lang immediately (before render, no flash)
  setTheme(theme);

  // Build lang switcher
  const sw = $('#lang-switch');
  ['en','ar','ru'].forEach(l => {
    const b = document.createElement('button');
    b.className = 'lang-btn' + (l === lang ? ' active' : '');
    b.dataset.lang = l;
    b.textContent = { en:'EN', ar:'عربي', ru:'RU' }[l];
    b.addEventListener('click', () => setLang(l));
    sw.appendChild(b);
  });

  // Theme buttons — both desktop & mobile wired via inline script in HTML

  // Apply initial lang
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', lang === 'ar');

  renderAll();
  initScrollSpy();
  initMobileMenu();

  // Keep topbar name in sync
  const obs = new MutationObserver(() => {
    const n = $('#profile-name');
    if (n) $('#topbar-name').textContent = n.textContent;
  });
  obs.observe(document.getElementById('profile-name'), { childList: true, characterData: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', init);
