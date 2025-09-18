# Portfolio

A multi-page, dark neon-themed portfolio featuring a canvas starfield, anime.js orbits, PDF overlay viewer, and responsive card grids for Projects, Experience, and Certifications.

## Quick start

- Double-click `index.html` to open it in your browser, or on Windows run:

```cmd
start "" index.html
```

No build/install steps are required.

## Pages

- `index.html` — Landing with animated starfield and rotating orbits
- `about.html` — Summary, right-aligned photo, and GitHub-style tech stack chips
- `projects.html` — Project cards with concise bullets and GitHub links
- `experience.html` — Roles with measurable bullets and meta
- `certifications.html` — 3-across certificate grid with PDF thumbnails and overlay viewer; includes Extracurriculars & Achievements
- `contact.html` — Contact methods with consistent navbar styling

## Customize

- Update links (LinkedIn, GitHub) and contact email in respective pages
- Add/remove certificates under `certifications.html` and PDFs in `docs/`
- Swap profile photo in `images/`
- Tweak theme colors via CSS variables near the top of each page

## Libraries

- anime.js (CDN) for orbit animations
- PDF.js (ESM) for PDF thumbnails and inline viewing

## Notes

- Starfield density scales with viewport to balance performance and visuals
- Overlay viewer provides consistent PDF viewing across pages