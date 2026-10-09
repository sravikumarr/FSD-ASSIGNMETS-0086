import React from 'react';
import { VEHICLE_CATEGORIES } from '../data/vehicles';

export default function CategoryTabs({ selectedCategory, onSelectCategory, searchQuery, onSearchChange, fuelFilter, onFuelFilterChange }) {
  return (
    <div className="mb-filter-section">
      <div className="mb-container">
        {/* Category Pill Tabs */}
        <div className="mb-category-tabs-row">
          <div className="mb-category-tabs" role="tablist">
            {VEHICLE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`category-tab-btn ${isActive ? 'active' : ''} ${cat.isElectric ? 'is-electric' : ''}`}
                  onClick={() => onSelectCategory(cat.id)}
                >
                  {cat.isElectric && <span className="cat-eq-indicator">EQ</span>}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Secondary Filter Toolbar */}
        <div className="mb-filter-toolbar">
          <div className="filter-search-input-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search by class or model (e.g., GLC, AMG, S 580, G-Class)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="filter-search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => onSearchChange('')} title="Clear search">
                &times;
              </button>
            )}
          </div>

          <div className="filter-fuel-pills">
            <span className="filter-label">Powertrain:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'electric', label: '100% Electric' },
              { id: 'hybrid', label: 'Hybrid / PHEV' },
              { id: 'gas', label: 'Gas / Biturbo' },
            ].map((f) => (
              <button
                key={f.id}
                className={`fuel-pill-btn ${fuelFilter === f.id ? 'active' : ''}`}
                onClick={() => onFuelFilterChange(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
