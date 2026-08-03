import React from 'react';

const Navbar = ({ theme, toggleTheme, mobileMenuOpen, setMobileMenuOpen, activeTab, setActiveTab }) => {
  return (
    <header className="header-nav">
      <div className="container header-container">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo">
          <div className="logo-icon">D</div>
          <span>DevFlex<span className="gradient-text">.UI</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <a
            href="#features"
            className={`nav-link ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Grid Layouts
          </a>
          <a
            href="#tabs-section"
            className={`nav-link ${activeTab === 'tabs' ? 'active' : ''}`}
            onClick={() => setActiveTab('tabs')}
          >
            Interactive Tabs
          </a>
          <a
            href="#accordion-section"
            className={`nav-link ${activeTab === 'accordion' ? 'active' : ''}`}
            onClick={() => setActiveTab('accordion')}
          >
            Responsive FAQ
          </a>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Interactive Light/Dark Theme Switcher */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <a href="#features" className="cta-button">
            Explore Demo <span>→</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <a
          href="#features"
          className="mobile-nav-link"
          onClick={() => { setActiveTab('features'); setMobileMenuOpen(false); }}
        >
          📐 Responsive Grid Layouts
        </a>
        <a
          href="#tabs-section"
          className="mobile-nav-link"
          onClick={() => { setActiveTab('tabs'); setMobileMenuOpen(false); }}
        >
          🗂️ Interactive Tabs & Views
        </a>
        <a
          href="#accordion-section"
          className="mobile-nav-link"
          onClick={() => { setActiveTab('accordion'); setMobileMenuOpen(false); }}
        >
          ❓ Responsive Accordion FAQ
        </a>

        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
          <button
            className="cta-button"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </header>
  );
};

export default Navbar;
