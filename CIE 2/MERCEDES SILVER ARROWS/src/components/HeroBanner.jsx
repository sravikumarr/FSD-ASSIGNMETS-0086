import React from 'react';

export default function HeroBanner({ onSelectCategory }) {
  return (
    <div className="mb-hero-section">
      <div className="mb-container hero-container">
        <div className="hero-content">
          <span className="hero-eyebrow">MERCEDES-BENZ VEHICLES</span>
          <h1 className="hero-title">Vehicles</h1>
          <p className="hero-subtitle">
            Explore our complete lineup of all-electric innovators, commanding SUVs, iconic sedans, handcrafted AMG coupes, and exhilarating open-air roadsters. Tailor your driving masterpiece.
          </p>
        </div>

        <div className="hero-quick-features">
          <div className="feature-pill" onClick={() => onSelectCategory('evs')}>
            <span className="feature-icon mb-star-icon-wrap">
              <img src="/star.svg" alt="Mercedes-Benz" className="feature-star-logo" />
            </span>
            <div>
              <strong>Mercedes Electric</strong>
              <span>Zero emissions, infinite luxury</span>
            </div>
          </div>
          <div className="feature-pill" onClick={() => onSelectCategory('suvs')}>
            <span className="feature-icon mb-star-icon-wrap">
              <img src="/star.svg" alt="Mercedes-Benz" className="feature-star-logo" />
            </span>
            <div>
              <strong>4MATIC® All-Wheel Drive</strong>
              <span>All-weather confidence</span>
            </div>
          </div>
          <div className="feature-pill" onClick={() => onSelectCategory('coupes')}>
            <span className="feature-icon mb-star-icon-wrap">
              <img src="/star.svg" alt="Mercedes-Benz" className="feature-star-logo" />
            </span>
            <div>
              <strong>Mercedes-AMG Performance</strong>
              <span>Handcrafted power</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
