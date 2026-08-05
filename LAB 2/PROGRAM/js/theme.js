/**
 * Sumukh Ravikumar Portfolio - Theme Management (Dark / Light Mode)
 * Default theme: Dark (#000000 base)
 * Stores user choice in localStorage.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'sumukh_portfolio_theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  // Determine initial theme
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? THEME_LIGHT
      : THEME_DARK;
  }

  // Apply theme to document element
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleAriaLabel(theme);
  }

  function updateToggleAriaLabel(theme) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      const nextTheme = theme === THEME_DARK ? 'light' : 'dark';
      toggleBtn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    }
  }

  // Initialize theme on script load
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  // Set up event listeners once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        setTheme(newTheme);
      });
    }

    // Listen for OS theme preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setTheme(e.matches ? THEME_DARK : THEME_LIGHT);
        }
      });
    }
  });
})();
