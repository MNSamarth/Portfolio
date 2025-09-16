# Space Portfolio (anime.js)

A space-themed, single-file portfolio using anime.js (via CDN), a canvas starfield, and rotating planets. Includes a responsive grid with 12+ project cards and multiple LinkedIn links.

## Quick start

- Double-click `index.html` to open it in your browser, or on Windows CMD run:

```cmd
start "" index.html
```

No build or installs needed.

## Customize

- LinkedIn: Replace all `https://www.linkedin.com/` with your profile URL.
- Email: Replace `your.name@example.com`.
- Projects: Update each card title, description, tags, and links.
- Colors: Edit CSS variables at the top of the `<style>` block.

## Libraries / installs

- anime.js is loaded from a CDN in `<head>`. No local installation required.
- Everything else is plain HTML/CSS/JS in a single file.

## Notes

- The starfield density adapts to the viewport. If it feels heavy on low-end devices, reduce density inside `initStars()`.
- Orbits and planets use anime.js for continuous rotation; durations are adjustable in `spinOrbits()`.
