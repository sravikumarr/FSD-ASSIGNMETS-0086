import React, { useState } from 'react';

export default function Header({ onOpenSavedBuilds, savedBuildsCount = 0, onResetView, activeSection, onSelectCategory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="mb-header">
      {/* Top utility sub-bar */}
      <div className="mb-header-top">
        <div className="mb-container mb-header-top-inner">
          <div className="mb-header-locations">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Find a Dealer: <strong>Beverly Hills, CA 90210</strong></span>
          </div>
          <div className="mb-header-top-links">
            <a href="#special-offers" onClick={(e) => { e.preventDefault(); alert("Exclusive Lease & APR Offers available for qualified customers."); }}>Special Offers</a>
            <span className="divider">|</span>
            <a href="#cpo" onClick={(e) => { e.preventDefault(); alert("Certified Pre-Owned Mercedes-Benz with Unlimited-Mileage Warranty."); }}>Certified Pre-Owned</a>
            <span className="divider">|</span>
            <button className="saved-builds-btn" onClick={onOpenSavedBuilds}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Saved Builds</span>
              {savedBuildsCount > 0 && <span className="saved-count-badge">{savedBuildsCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="mb-header-main">
        <div className="mb-container mb-header-main-inner">
          {/* Logo & Wordmark */}
          <div className="mb-logo-wrap" onClick={onResetView} role="button" tabIndex={0} title="Mercedes-Benz USA">
            <img src="/star.svg" alt="Mercedes-Benz Logo" className="mb-star-logo" />
            <div className="mb-wordmark">
              <span className="mb-brand-title">Mercedes-Benz</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="mb-nav-links">
            <button 
              className={`nav-link ${activeSection === 'all' ? 'active' : ''}`}
              onClick={() => { onResetView(); onSelectCategory('all'); }}
            >
              Vehicles
            </button>
            <button 
              className={`nav-link ${activeSection === 'evs' ? 'active' : ''}`}
              onClick={() => { onResetView(); onSelectCategory('evs'); }}
            >
              <span className="electric-dot"></span>
              Electric / EQ
            </button>
            <button 
              className="nav-link active-highlight"
              onClick={onResetView}
            >
              Build Your Own
            </button>
            <button 
              className={`nav-link ${activeSection === 'suvs' ? 'active' : ''}`}
              onClick={() => { onResetView(); onSelectCategory('suvs'); }}
            >
              SUVs
            </button>
            <button 
              className={`nav-link ${activeSection === 'sedans' ? 'active' : ''}`}
              onClick={() => { onResetView(); onSelectCategory('sedans'); }}
            >
              Sedans
            </button>
            <button 
              className={`nav-link ${activeSection === 'coupes' ? 'active' : ''}`}
              onClick={() => { onResetView(); onSelectCategory('coupes'); }}
            >
              Coupes & AMG
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="mb-header-actions">
            <div className={`mb-search-box ${searchOpen ? 'expanded' : ''}`}>
              <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} title="Search Models">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              {searchOpen && (
                <input 
                  type="text" 
                  placeholder="Search GLC, AMG GT, S-Class..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              )}
            </div>

            <button className="icon-btn mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mb-mobile-nav">
          <div className="mobile-nav-inner">
            <button onClick={() => { onResetView(); onSelectCategory('all'); setMobileMenuOpen(false); }}>All Vehicles</button>
            <button onClick={() => { onResetView(); onSelectCategory('evs'); setMobileMenuOpen(false); }}>Electric / EQ</button>
            <button onClick={() => { onResetView(); onSelectCategory('suvs'); setMobileMenuOpen(false); }}>SUVs</button>
            <button onClick={() => { onResetView(); onSelectCategory('sedans'); setMobileMenuOpen(false); }}>Sedans & Wagons</button>
            <button onClick={() => { onResetView(); onSelectCategory('coupes'); setMobileMenuOpen(false); }}>Coupes & AMG</button>
            <button onClick={() => { onResetView(); onSelectCategory('convertibles'); setMobileMenuOpen(false); }}>Convertibles & Roadsters</button>
            <div className="mobile-divider"></div>
            <button onClick={() => { onOpenSavedBuilds(); setMobileMenuOpen(false); }}>Saved Builds ({savedBuildsCount})</button>
          </div>
        </div>
      )}
    </header>
  );
}
