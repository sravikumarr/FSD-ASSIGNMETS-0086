import React from 'react';
import VehicleCard from './VehicleCard';
import { VEHICLE_CLASSES } from '../data/vehicles';

export default function VehicleGrid({ selectedCategory, searchQuery, fuelFilter, onStartConfigurator, onResetFilters }) {
  // Filter vehicles
  const filteredVehicles = VEHICLE_CLASSES.filter((vehicle) => {
    // 1. Category filter
    if (selectedCategory !== 'all') {
      const matchPrimary = vehicle.category === selectedCategory;
      const matchAlso = vehicle.alsoInCategories && vehicle.alsoInCategories.includes(selectedCategory);
      if (!matchPrimary && !matchAlso) return false;
    }

    // 2. Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = vehicle.title.toLowerCase().includes(q);
      const matchTagline = vehicle.tagline.toLowerCase().includes(q);
      const matchBody = vehicle.bodyStyle.toLowerCase().includes(q);
      const matchModels = vehicle.models.some((m) => m.name.toLowerCase().includes(q));
      if (!matchTitle && !matchTagline && !matchBody && !matchModels) return false;
    }

    // 3. Fuel filter
    if (fuelFilter !== 'all') {
      if (fuelFilter === 'electric' && !vehicle.fuelType.toLowerCase().includes('electric')) return false;
      if (fuelFilter === 'hybrid' && !vehicle.fuelType.toLowerCase().includes('hybrid')) return false;
      if (fuelFilter === 'gas' && (vehicle.fuelType.toLowerCase() === 'all-electric')) return false;
    }

    return true;
  });

  // Group vehicles by section if 'all' is selected and no search
  const showGrouped = selectedCategory === 'all' && !searchQuery.trim() && fuelFilter === 'all';

  const sections = [
    { id: 'evs', title: 'Mercedes-Benz Electric', subtitle: 'Leading the future of luxury zero-emission mobility' },
    { id: 'suvs', title: 'SUVs', subtitle: 'Versatility, commanding presence and state-of-the-art capability' },
    { id: 'sedans', title: 'Sedans & Wagons', subtitle: 'The timeless standard of aerodynamic luxury and refinement' },
    { id: 'coupes', title: 'Coupes & AMG Sports', subtitle: 'Unrivaled driving dynamics, athletic elegance and pulse-quickening power' },
    { id: 'convertibles', title: 'Convertibles & Roadsters', subtitle: 'Open-air exhilaration crafted with unmatched prestige' },
  ];

  if (filteredVehicles.length === 0) {
    return (
      <div className="mb-container no-results-container">
        <div className="no-results-box">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <h3>No matching vehicles found</h3>
          <p>Try searching for a different model name or resetting your powertrain filter.</p>
          <button className="reset-filter-btn" onClick={onResetFilters}>
            Reset All Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-grid-wrapper">
      <div className="mb-container">
        {showGrouped ? (
          // Grouped view by category sections
          sections.map((section) => {
            const sectionVehicles = filteredVehicles.filter(
              (v) => v.category === section.id || (v.alsoInCategories && v.alsoInCategories.includes(section.id))
            );
            if (sectionVehicles.length === 0) return null;

            return (
              <section key={section.id} className="category-group-section" id={`section-${section.id}`}>
                <div className="category-section-header">
                  <div className="cat-title-block">
                    <h2 className="cat-heading">{section.title}</h2>
                    <p className="cat-subheading">{section.subtitle}</p>
                  </div>
                  <span className="cat-count-pill">{sectionVehicles.length} Models</span>
                </div>
                <div className="vehicle-cards-grid">
                  {sectionVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onStartConfigurator={onStartConfigurator}
                    />
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          // Flat filtered view
          <div className="filtered-results-section">
            <div className="filtered-header">
              <h2>Showing {filteredVehicles.length} {filteredVehicles.length === 1 ? 'Vehicle' : 'Vehicles'}</h2>
              {(searchQuery || fuelFilter !== 'all' || selectedCategory !== 'all') && (
                <button className="clear-all-link" onClick={onResetFilters}>
                  Clear filters
                </button>
              )}
            </div>
            <div className="vehicle-cards-grid">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onStartConfigurator={onStartConfigurator}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
