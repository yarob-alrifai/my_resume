/* ============================================================
   export.js — Print · PDF · Word  (no server required)
   Word: uses docx.js loaded via CDN in index.html
   PDF/Print: uses browser print with print-optimised CSS
   ============================================================ */

'use strict';

/* ── helpers ─────────────────────────────────────────────── */
const tx = (o, l) => {
  if (!o) return '';
  if (typeof o === 'string') return o;
  return o[l] || o.en || '';
};

/* ════════════════════════════════════════════════════════════
   PRINT / PDF
   Opens the browser print dialog. The user can then
   "Save as PDF" or print to a physical printer.
════════════════════════════════════════════════════════════ */
window.printCV = function () {
  window.print();
};

/* ════════════════════════════════════════════════════════════
   WORD  (.docx)
   Builds a formatted Word document from CV_DATA
   using the docx.js library (loaded via CDN).
════════════════════════════════════════════════════════════ */
window.exportToWord = async function () {
  const D   = window.CV_DATA;
  const l   = localStorage.getItem('cv-lang') || 'en';
  const rtl = l === 'ar';

  if (!window.docx) {
    alert('Word export library is still loading. Please try again in a moment.');
    return;
  }

  const {
    Document, Packer, Paragraph, TextRun, HeadingLevel,
    AlignmentType, BorderStyle, ShadingType,
    TableRow, TableCell, Table, WidthType,
    convertInchesToTwip, UnderlineType
  } = window.docx;

  /* ── colour palette ── */
  const CLR_ACCENT  = '4361EE';
  const CLR_TEXT    = '1a1d2e';
  const CLR_MUTED   = '5a6075';
  const CLR_WHITE   = 'FFFFFF';
  const CLR_HEADER_BG = '4361EE';

  /* ── text direction ── */
  const dir = rtl
    ? { alignment: AlignmentType.RIGHT, bidirectional: true }
    : { alignment: AlignmentType.LEFT  };

  /* ── shortcut helpers ── */
  const bold = (text, sz = 24, color = CLR_TEXT) =>
    new TextRun({ text, bold: true, size: sz, color, font: 'Calibri' });

  const normal = (text, sz = 22, color = CLR_MUTED) =>
    new TextRun({ text, size: sz, color, font: 'Calibri' });

  const accent = (text, sz = 22) =>
    new TextRun({ text, bold: true, size: sz, color: CLR_ACCENT, font: 'Calibri' });

  const spacer = (before = 80, after = 80) =>
    new Paragraph({ children: [], spacing: { before, after } });

  /* ── section heading ── */
  const sectionHeading = (text) => [
    spacer(160, 40),
    new Paragraph({
      children: [
        new TextRun({
          text: text.toUpperCase(),
          bold: true,
          size: 22,
          color: CLR_ACCENT,
          font: 'Calibri',
        }),
      ],
      ...dir,
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: CLR_ACCENT },
      },
      spacing: { before: 160, after: 80 },
    }),
  ];

  /* ── bullet line ── */
  const bullet = (text) =>
    new Paragraph({
      children: [normal('▸  ' + text, 20)],
      ...dir,
      spacing: { before: 40, after: 40 },
      indent: { left: convertInchesToTwip(0.2) },
    });

  /* ══════════════════════════════════════════════════
     BUILD DOCUMENT
  ══════════════════════════════════════════════════ */
  const children = [];

  /* ── NAME (big header) ── */
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: tx(D.name, l),
          bold: true,
          size: 52,
          color: CLR_ACCENT,
          font: 'Calibri',
        }),
      ],
      ...dir,
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: tx(D.title, l),
          size: 24,
          color: CLR_MUTED,
          font: 'Calibri',
        }),
      ],
      ...dir,
      spacing: { before: 0, after: 160 },
    }),
  );

  /* ── CONTACT info row ── */
  const contactParts = [
    D.location,
    D.email,
    D.phone,
    '@' + D.telegram,
  ].filter(Boolean);

  children.push(
    new Paragraph({
      children: contactParts.flatMap((p, i) => [
        new TextRun({ text: p, size: 20, color: CLR_TEXT, font: 'Calibri' }),
        ...(i < contactParts.length - 1
          ? [new TextRun({ text: '   |   ', size: 20, color: CLR_MUTED, font: 'Calibri' })]
          : []),
      ]),
      ...dir,
      spacing: { before: 0, after: 40 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: D.links.linkedin, size: 20, color: CLR_ACCENT, font: 'Calibri' }),
        new TextRun({ text: '   |   ', size: 20, color: CLR_MUTED, font: 'Calibri' }),
        new TextRun({ text: D.links.github,   size: 20, color: CLR_ACCENT, font: 'Calibri' }),
        new TextRun({ text: '   |   ', size: 20, color: CLR_MUTED, font: 'Calibri' }),
        new TextRun({ text: D.links.behance,  size: 20, color: CLR_ACCENT, font: 'Calibri' }),
      ],
      ...dir,
      spacing: { before: 0, after: 40 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 4, color: 'e2e5ef' },
      },
    }),
  );

  /* ── ABOUT ── */
  const aboutLabels = { en: 'About Me', ar: 'عن المرشح', ru: 'О себе' };
  children.push(...sectionHeading(aboutLabels[l] || aboutLabels.en));
  children.push(
    new Paragraph({
      children: [normal(tx(D.about, l), 21, CLR_TEXT)],
      ...dir,
      spacing: { before: 60, after: 60 },
    }),
  );

  /* ── SKILLS ── */
  const skillLabels = { en: 'Technical Skills', ar: 'المهارات التقنية', ru: 'Технические навыки' };
  children.push(...sectionHeading(skillLabels[l] || skillLabels.en));

  for (const cat of D.skills) {
    children.push(
      new Paragraph({
        children: [
          accent(tx(cat.label, l) + ':  '),
          normal(cat.items.join('  ·  '), 20, CLR_TEXT),
        ],
        ...dir,
        spacing: { before: 60, after: 60 },
      }),
    );
  }

  /* ── EXPERIENCE ── */
  const expLabels = { en: 'Work Experience', ar: 'الخبرة المهنية', ru: 'Опыт работы' };
  children.push(...sectionHeading(expLabels[l] || expLabels.en));

  for (const exp of D.experience) {
    const company = typeof exp.company === 'object' ? tx(exp.company, l) : exp.company;
    const bullets  = tx(exp.bullets, l) || [];

    children.push(
      spacer(100, 20),
      new Paragraph({
        children: [
          bold(tx(exp.title, l), 23),
          new TextRun({ text: '   ', size: 23, font: 'Calibri' }),
          new TextRun({
            text: tx(exp.period, l),
            size: 20,
            color: CLR_ACCENT,
            font: 'Calibri',
          }),
        ],
        ...dir,
        spacing: { before: 0, after: 20 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: company + '  ·  ' + exp.location, size: 20, color: CLR_MUTED, font: 'Calibri' }),
        ],
        ...dir,
        spacing: { before: 0, after: 40 },
      }),
      ...bullets.map(b => bullet(b)),
    );
  }

  /* ── EDUCATION ── */
  const eduLabels = { en: 'Education', ar: 'التعليم', ru: 'Образование' };
  children.push(...sectionHeading(eduLabels[l] || eduLabels.en));

  for (const edu of D.education) {
    const school = typeof edu.school === 'object' ? tx(edu.school, l) : edu.school;
    children.push(
      spacer(80, 20),
      new Paragraph({
        children: [
          bold(tx(edu.degree, l), 22),
          new TextRun({ text: '  —  ', size: 22, color: CLR_MUTED, font: 'Calibri' }),
          accent(tx(edu.year, l), 22),
        ],
        ...dir,
        spacing: { before: 0, after: 20 },
      }),
      new Paragraph({
        children: [normal(school + '  ·  ' + edu.location, 20)],
        ...dir,
        spacing: { before: 0, after: 40 },
      }),
    );
  }

  /* ── PROJECTS ── */
  const projLabels = { en: 'Projects', ar: 'المشاريع', ru: 'Проекты' };
  children.push(...sectionHeading(projLabels[l] || projLabels.en));

  for (const proj of D.projects) {
    children.push(
      new Paragraph({
        children: [
          bold(proj.name + '  ', 22),
          new TextRun({ text: proj.tech.join('  ·  '), size: 20, color: CLR_ACCENT, font: 'Calibri' }),
        ],
        ...dir,
        spacing: { before: 80, after: 20 },
      }),
      new Paragraph({
        children: [normal(tx(proj.desc, l), 20, CLR_TEXT)],
        ...dir,
        spacing: { before: 0, after: 20 },
      }),
    );
  }

  /* ── VOLUNTEERING ── */
  const volLabels = { en: 'Volunteering', ar: 'النشاط التطوعي', ru: 'Волонтёрство' };
  children.push(...sectionHeading(volLabels[l] || volLabels.en));

  for (const vol of D.volunteering) {
    children.push(
      spacer(80, 20),
      new Paragraph({
        children: [
          bold(tx(vol.title, l), 22),
          new TextRun({ text: '   ' + tx(vol.period, l), size: 20, color: CLR_ACCENT, font: 'Calibri' }),
        ],
        ...dir,
        spacing: { before: 0, after: 20 },
      }),
      new Paragraph({
        children: [normal(tx(vol.desc, l), 20, CLR_TEXT)],
        ...dir,
        spacing: { before: 0, after: 20 },
      }),
    );
  }

  /* ── LANGUAGES ── */
  const langLabels = { en: 'Languages', ar: 'اللغات', ru: 'Языки' };
  children.push(...sectionHeading(langLabels[l] || langLabels.en));

  children.push(
    new Paragraph({
      children: D.spokenLanguages.flatMap((sl, i) => [
        bold(tx(sl.name, l) + ': ', 22),
        new TextRun({ text: tx(sl.level, l), size: 22, color: CLR_MUTED, font: 'Calibri' }),
        ...(i < D.spokenLanguages.length - 1
          ? [new TextRun({ text: '    |    ', size: 22, color: CLR_MUTED, font: 'Calibri' })]
          : []),
      ]),
      ...dir,
      spacing: { before: 60, after: 60 },
    }),
  );

  /* ══════════════════════════════════════════════════
     PACK + DOWNLOAD
  ══════════════════════════════════════════════════ */
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top:    convertInchesToTwip(0.9),
            bottom: convertInchesToTwip(0.9),
            left:   convertInchesToTwip(1.0),
            right:  convertInchesToTwip(1.0),
          },
        },
      },
      children,
    }],
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 22, color: CLR_TEXT },
          paragraph: { spacing: { line: 276 } },
        },
      },
    },
  });

  const blob = await Packer.toBlob(doc);
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `${tx(D.name, l).replace(/\s+/g, '_')}_CV.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
