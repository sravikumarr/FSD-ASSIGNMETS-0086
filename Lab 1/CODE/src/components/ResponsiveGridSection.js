import React from 'react';

const cardData = [
  {
    id: 'grid-autofit',
    icon: '📐',
    title: 'CSS Grid Auto-Fit',
    description: 'Dynamic grid layouts that gracefully fit cards into available horizontal space using minmax() calculations without breaking breakpoint rules.',
    details: 'CSS Grid auto-fit ensures that grid columns stretch to fill any remaining space in the container while staying above a specified minimum width threshold (e.g. 320px). This provides ultra-clean responsive layouts across any screen width.',
    tag: 'Grid Layout'
  },
  {
    id: 'flexbox-alignment',
    icon: '⚡',
    title: 'Flexbox Alignment & Wrapping',
    description: '1D flex container alignment for toolbars, hero buttons, and headers with auto-wrapping support for small viewports.',
    details: 'Flexbox handles one-dimensional component layouts such as navigation bars, action buttons, and card headers. Using properties like space-between, flex-wrap, and align-items, flex components adjust seamlessly to mobile viewports.',
    tag: 'Flexbox'
  },
  {
    id: 'design-system',
    icon: '🎨',
    title: 'Crisp Design Tokens',
    description: 'High-contrast color palettes, clean borders, structured typography scales, and natural drop shadow elevations.',
    details: 'Storing design tokens like --bg-primary, --bg-card, and --accent-primary as CSS custom properties creates a clean, predictable, state-driven styling system.',
    tag: 'Design System'
  },
  {
    id: 'theme-variables',
    icon: '🌓',
    title: 'CSS Custom Properties (Variables)',
    description: 'Dynamic light and dark mode color tokens managed seamlessly at the root document level with zero re-renders.',
    details: 'By storing design tokens like --bg-primary, --text-primary, and --accent-primary as CSS custom properties, switching between Dark and Light mode is instant and computationally lightweight.',
    tag: 'CSS Variables'
  },
  {
    id: 'micro-animations',
    icon: '✨',
    title: 'Fluid Micro-Animations',
    description: 'Hardware-accelerated CSS hover elevation transforms and smooth cubic-bezier transition curves.',
    details: 'Interactive UI elements utilize subtle hover scaling (transform: translateY(-4px)), clean shadow elevation, and fast transition curves to deliver responsive feedback to user input.',
    tag: 'Animations'
  },
  {
    id: 'responsive-modal',
    icon: '🪟',
    title: 'Interactive Modal Overlays',
    description: 'Accessible overlay dialog containers centered using flexbox for detailed content viewing.',
    details: 'Modal components utilize fixed positioning, flexbox centering, and subtle elevation shadows for interactive detail views.',
    tag: 'Interactive'
  }
];

const ResponsiveGridSection = ({ onSelectCard }) => {
  return (
    <section id="features" className="section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Modern Layout Techniques</span>
          <h2 className="section-title">
            Responsive CSS Grid <span className="gradient-text">& Feature Gallery</span>
          </h2>
          <p className="section-subtitle">
            Every card below is positioned using a fluid CSS Grid container. Resize your browser window to observe dynamic auto-fit reflows!
          </p>
        </div>

        {/* Responsive CSS Grid Container */}
        <div className="responsive-card-grid">
          {cardData.map((card) => (
            <div key={card.id} className="feature-card">
              <div>
                <div className="card-icon-box">{card.icon}</div>
                <div style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  background: 'var(--badge-bg)',
                  color: 'var(--badge-text)',
                  border: '1px solid var(--badge-border)',
                  padding: '0.2rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '0.85rem',
                  fontWeight: '600'
                }}>
                  {card.tag}
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>

              <button
                className="card-action-btn"
                onClick={() => onSelectCard(card)}
              >
                Inspect Layout <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResponsiveGridSection;
