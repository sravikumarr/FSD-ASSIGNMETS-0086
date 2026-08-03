import React from 'react';

const HeroSection = ({ onExploreClick }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Text & CTAs */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Modern Responsive Architecture (CSS Grid & Flexbox)
            </div>

            <h1 className="hero-title">
              Crafting <span className="gradient-text">Fluid Web Pages</span> With Modern Layouts.
            </h1>

            <p className="hero-description">
              Explore dynamic CSS Grid systems, flexible flexbox components, responsive design tokens, glassmorphism overlays, and smooth interactive web elements built for seamless adaptability across all viewport sizes.
            </p>

            <div className="hero-cta-group">
              <button className="cta-button" onClick={onExploreClick}>
                Explore Layout Grid <span>⚡</span>
              </button>

              <a href="#tabs-section" className="secondary-button">
                Interactive Showcase
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Card Stack */}
          <div className="hero-visual">
            <div className="hero-visual-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', fontWeight: '700' }}>
                  LIVE LAYOUT ENGINE
                </span>
                <span style={{ fontSize: '0.75rem', background: 'var(--bg-glass)', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                  100% Fluid
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>CSS Grid & Container Queries</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Automatically reflowing elements with <code style={{ color: 'var(--accent-pink)' }}>repeat(auto-fit, minmax(320px, 1fr))</code> without media query bloat.
              </p>

              {/* Interactive Stat Cards Grid inside Hero Visual */}
              <div className="interactive-stat-grid">
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Responsive</div>
                </div>

                <div className="stat-item">
                  <div className="stat-number">60 FPS</div>
                  <div className="stat-label">CSS Animations</div>
                </div>

                <div className="stat-item">
                  <div className="stat-number">0.2s</div>
                  <div className="stat-label">Theme Switch</div>
                </div>

                <div className="stat-item">
                  <div className="stat-number">Grid</div>
                  <div className="stat-label">Layout System</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
