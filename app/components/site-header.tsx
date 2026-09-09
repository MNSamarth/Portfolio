'use client';

import { useState } from 'react';

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleTheme() {
    const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('samarth-theme', next);
  }

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>SAMARTH<span>.</span></a>
        <button className="menu-toggle mono" type="button" aria-expanded={menuOpen} aria-controls="primary-links" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
        <div id="primary-links" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>WORK</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href={`${assetBase}/samarth-mandagere-resume.pdf`} target="_blank" rel="noreferrer">RÉSUMÉ ↗</a>
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle color theme">
            <span className="theme-dot" aria-hidden="true" />
            <span>THEME</span>
          </button>
        </div>
      </nav>
    </header>
  );
}