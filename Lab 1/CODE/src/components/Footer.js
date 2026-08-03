import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <a href="#hero" className="brand-logo">
              <div className="logo-icon">D</div>
              <span>DevFlex<span className="gradient-text">.UI</span></span>
            </a>
            <p>
              Designing and developing fluid, responsive web pages using modern HTML, CSS, and interactive layout techniques.
            </p>
          </div>

          {/* Nav Links Col 1 */}
          <div className="footer-col">
            <h4>Layout System</h4>
            <ul>
              <li><a href="#features">CSS Grid Gallery</a></li>
              <li><a href="#features">Auto-Fit Columns</a></li>
              <li><a href="#features">Flexbox Alignment</a></li>
              <li><a href="#hero">Responsive Badges</a></li>
            </ul>
          </div>

          {/* Nav Links Col 2 */}
          <div className="footer-col">
            <h4>Interactive UI</h4>
            <ul>
              <li><a href="#tabs-section">Tabbed Views</a></li>
              <li><a href="#accordion-section">Accordion Disclosure</a></li>
              <li><a href="#hero">Theme Switcher</a></li>
              <li><a href="#features">Modal Inspectors</a></li>
            </ul>
          </div>

          {/* Nav Links Col 3 */}
          <div className="footer-col">
            <h4>Design Tokens</h4>
            <ul>
              <li><a href="#hero">Glassmorphism Blur</a></li>
              <li><a href="#hero">Gradient Typography</a></li>
              <li><a href="#hero">CSS Variables</a></li>
              <li><a href="#hero">Dark/Light Themes</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 DevFlex UI. Designed with HTML, CSS Grid, Flexbox, and Modern Responsive Layout Techniques.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
