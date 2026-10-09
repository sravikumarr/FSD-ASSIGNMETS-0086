import React, { useState } from 'react';

export default function VehicleCard({ vehicle, onStartConfigurator }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Format currency
  const formatPrice = (val) => {
    if (!val || isNaN(val)) return 'Price Coming Soon';
    return '$' + Number(val).toLocaleString('en-US');
  };

  return (
    <div className={`mb-vehicle-card ${isOpen ? 'is-expanded' : ''}`}>
      {/* Top Media Area */}
      <div className="card-media-wrapper">
        <div className="card-badge-row">
          <span className={`body-style-badge ${vehicle.fuelType.toLowerCase().includes('electric') ? 'electric-badge' : ''}`}>
            {vehicle.categoryLabel || vehicle.bodyStyle}
          </span>
          {vehicle.title.includes('AMG') && <span className="amg-badge">AMG</span>}
          {vehicle.title.includes('Maybach') && <span className="maybach-badge">MAYBACH</span>}
        </div>

        <div className={`card-img-container ${!imgLoaded ? 'loading-shimmer' : ''}`}>
          <img
            src={vehicle.imgSrc}
            alt={vehicle.title}
            className="vehicle-main-img"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={(e) => {
              // Fallback placeholder with sleek vehicle vector
              e.target.src = 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/glc-class/suv/all-vehicles/2024-GLC-300-SUV-AVP-DR.png';
              setImgLoaded(true);
            }}
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="card-info">
        <div className="card-title-group">
          <h3 className="card-vehicle-title">{vehicle.title}</h3>
          <p className="card-tagline">{vehicle.tagline}</p>
        </div>

        <div className="card-pricing-row">
          <div className="price-label-group">
            <span className="price-subtext">Starting at</span>
            <span className="price-amount">{formatPrice(vehicle.priceStartingAt)} <span className="msrp-star">*</span></span>
          </div>
          <button 
            className="card-quick-build-btn"
            onClick={() => onStartConfigurator(vehicle, vehicle.models[0])}
            title={`Build your custom ${vehicle.title}`}
          >
            Build
          </button>
        </div>

        {/* Highlight Specs Bar */}
        {vehicle.models && vehicle.models[0] && (
          <div className="card-specs-row">
            <div className="spec-item">
              <span className="spec-val">{vehicle.models[0].hp}</span>
              <span className="spec-key">Power</span>
            </div>
            <div className="spec-divider"></div>
            <div className="spec-item">
              <span className="spec-val">{vehicle.models[0].acceleration}</span>
              <span className="spec-key">0-60 mph</span>
            </div>
            <div className="spec-divider"></div>
            <div className="spec-item">
              <span className="spec-val">{vehicle.models[0].range}</span>
              <span className="spec-key">{vehicle.fuelType.toLowerCase().includes('electric') ? 'Est. Range' : 'Efficiency'}</span>
            </div>
          </div>
        )}

        {/* 'Choose Models' Disclosure Button */}
        {vehicle.models && vehicle.models.length > 0 && (
          <button
            className={`card-disclosure-btn ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span>Choose Models ({vehicle.models.length})</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="chevron-icon"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}
      </div>

      {/* Expanded Trim Level Drawer */}
      {isOpen && vehicle.models && (
        <div className="card-models-drawer">
          <div className="models-drawer-header">
            <span>Available {vehicle.title} Trims</span>
          </div>
          <div className="models-list">
            {vehicle.models.map((model) => (
              <div key={model.id} className="model-row-item">
                <div className="model-details">
                  <h4 className="model-name">{model.name}</h4>
                  <div className="model-specs-micro">
                    <span>{model.hp}</span> • <span>0-60 in {model.acceleration}</span> • <span>{model.drivetrain.split('/')[0]}</span>
                  </div>
                </div>
                <div className="model-action-group">
                  <span className="model-price">{formatPrice(model.price)} <span className="msrp-star">*</span></span>
                  <button
                    className="model-build-btn"
                    onClick={() => onStartConfigurator(vehicle, model)}
                  >
                    Build
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
