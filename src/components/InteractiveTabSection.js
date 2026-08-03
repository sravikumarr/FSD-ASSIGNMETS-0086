import React, { useState } from 'react';

const tabsData = [
  {
    id: 'grid',
    label: '📐 CSS Grid vs Flexbox',
    title: 'Choosing Between CSS Grid and Flexbox',
    description: 'Modern CSS provides two complementary layout engines. Grid is tailored for 2D layouts (rows + columns), while Flexbox excels at 1D alignment.',
    features: [
      'CSS Grid: Two-dimensional layout control (rows and columns simultaneously)',
      'Flexbox: One-dimensional layout control (content alignment along single axis)',
      'Grid Auto-fit & Minmax: Responsive cards without rigid pixel breakpoints',
      'Flexbox Gap & Auto Margins: Clean toolbar and navbar layouts'
    ],
    codeSnippet: `.responsive-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}`
  },
  {
    id: 'tokens',
    label: '🎨 Design Tokens & Themes',
    title: 'Design Tokens & State Management',
    description: 'Combining CSS Custom Properties with crisp document tokens produces high-contrast, scalable user interfaces across Dark and Light mode themes.',
    features: [
      'CSS Custom Properties: Unified design tokens for colors, gaps, and shadows',
      'Instant Dark/Light Mode Theme Switching without re-rendering',
      'Solid Contrast Ratios: Compliant with WCAG accessibility guidelines',
      'Clean Elevation: Natural soft shadows for interactive depth'
    ],
    codeSnippet: `:root {\n  --bg-primary: #0f172a;\n  --bg-secondary: #1e293b;\n  --accent-primary: #6366f1;\n}`
  },
  {
    id: 'media',
    label: '📱 Mobile Breakpoints & Drawer',
    title: 'Mobile-First Responsive Breakpoints',
    description: 'Ensuring fluid scaling across all devices using mobile-first CSS media queries, responsive navigation drawers, and flexible touch targets.',
    features: [
      'Mobile Drawer Menu: Slide-in navigation drawer for viewports < 768px',
      'Touch-friendly Control Areas: Minimum 44px touch targets',
      'Fluid Typography: Clamp() functions for smooth viewport font scaling',
      'Fast Performance: Smooth 60fps scrolling and layout reflows'
    ],
    codeSnippet: `@media (max-width: 768px) {\n  .desktop-nav { display: none; }\n  .mobile-menu-btn { display: block; }\n}`
  }
];

const InteractiveTabSection = () => {
  const [activeTabId, setActiveTabId] = useState('grid');
  const currentTab = tabsData.find((t) => t.id === activeTabId) || tabsData[0];

  return (
    <section id="tabs-section" className="section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Interactive UI Components</span>
          <h2 className="section-title">
            Interactive Tabbed <span className="gradient-text">Layout Engine</span>
          </h2>
          <p className="section-subtitle">
            Switch between tabs to inspect modern layout concepts, CSS code snippets, and structural feature lists.
          </p>
        </div>

        <div className="tabs-container">
          {/* Tab Selection Row */}
          <div className="tab-buttons-row">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTabId === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Content Grid */}
          <div className="tab-content-grid">
            <div className="tab-text-content">
              <h3>{currentTab.title}</h3>
              <p>{currentTab.description}</p>

              <ul className="tab-feature-list">
                {currentTab.features.map((feat, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code / CSS Rule Preview Box */}
            <div className="tab-preview-box">
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
                CSS Code Snippet
              </div>
              <pre style={{ overflowX: 'auto' }}>
                <code>{currentTab.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTabSection;
