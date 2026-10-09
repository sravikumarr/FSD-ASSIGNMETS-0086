import React from 'react';

export default function ConfiguratorSummaryModal({
  vehicle,
  trim,
  paint,
  wheel,
  upholstery,
  trimInlay,
  packages,
  accessories,
  totalMSRP,
  destinationCharge,
  optionsTotal,
  onClose,
  onSave
}) {
  const formatPrice = (val) => '$' + Number(val).toLocaleString('en-US');
  const buildCode = 'MB-' + (trim?.name?.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4) || 'EQS') + '-' + Math.floor(1000 + Math.random() * 9000);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mb-modal-backdrop">
      <div className="mb-summary-modal-content">
        <div className="modal-top-bar">
          <div className="modal-title-lockup">
            <img src="/star.svg" alt="Mercedes Star" className="modal-star-icon" />
            <div>
              <h3>Vehicle Order Specification</h3>
              <span className="build-code-sub">Reference Code: <strong>{buildCode}</strong></span>
            </div>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        </div>

        <div className="modal-body-scrollable">
          {/* Top Hero Overview */}
          <div className="modal-vehicle-overview">
            <div className="overview-car-visual">
              <img src={vehicle.imgSrc} alt={vehicle.title} className="overview-car-img" />
            </div>
            <div className="overview-meta">
              <span className="overview-year-badge">{vehicle.year} MODEL YEAR</span>
              <h2 className="overview-model-name">{trim?.name || vehicle.title}</h2>
              <p className="overview-tagline">"{vehicle.tagline}"</p>
              <div className="overview-quick-stats">
                <div><span>Power:</span> <strong>{trim?.hp}</strong></div>
                <div><span>0-60 MPH:</span> <strong>{trim?.acceleration}</strong></div>
                <div><span>Drivetrain:</span> <strong>{trim?.drivetrain?.split('/')[0]}</strong></div>
              </div>
            </div>
          </div>

          {/* Detailed Itemized Specification Table */}
          <div className="modal-specs-section">
            <h4 className="specs-section-title">Selected Factory Options</h4>
            <div className="specs-table-group">
              <div className="spec-table-row">
                <span className="spec-cat">Base Vehicle MSRP</span>
                <span className="spec-detail">{trim?.name}</span>
                <span className="spec-cost">{formatPrice(trim?.price || vehicle.priceStartingAt)}</span>
              </div>
              <div className="spec-table-row">
                <span className="spec-cat">Exterior Paint</span>
                <span className="spec-detail">{paint.name} ({paint.type})</span>
                <span className="spec-cost">{paint.price === 0 ? 'Included' : formatPrice(paint.price)}</span>
              </div>
              <div className="spec-table-row">
                <span className="spec-cat">Wheels</span>
                <span className="spec-detail">{wheel.name} ({wheel.size})</span>
                <span className="spec-cost">{wheel.price === 0 ? 'Included' : formatPrice(wheel.price)}</span>
              </div>
              <div className="spec-table-row">
                <span className="spec-cat">Upholstery</span>
                <span className="spec-detail">{upholstery.name}</span>
                <span className="spec-cost">{upholstery.price === 0 ? 'Included' : formatPrice(upholstery.price)}</span>
              </div>
              <div className="spec-table-row">
                <span className="spec-cat">Interior Trim Inlay</span>
                <span className="spec-detail">{trimInlay.name}</span>
                <span className="spec-cost">{trimInlay.price === 0 ? 'Included' : formatPrice(trimInlay.price)}</span>
              </div>

              {packages.map((pkg) => (
                <div key={pkg.id} className="spec-table-row">
                  <span className="spec-cat">Package</span>
                  <span className="spec-detail">{pkg.name}</span>
                  <span className="spec-cost">{formatPrice(pkg.price)}</span>
                </div>
              ))}

              {accessories.map((acc) => (
                <div key={acc.id} className="spec-table-row">
                  <span className="spec-cat">Accessory</span>
                  <span className="spec-detail">{acc.name}</span>
                  <span className="spec-cost">{formatPrice(acc.price)}</span>
                </div>
              ))}

              <div className="spec-table-row">
                <span className="spec-cat">Destination & Handling</span>
                <span className="spec-detail">Standard US Port Transit</span>
                <span className="spec-cost">{formatPrice(destinationCharge)}</span>
              </div>

              <div className="spec-table-row total-row">
                <span className="spec-cat">TOTAL ESTIMATED MSRP *</span>
                <span className="spec-detail">All Selected Equipment Included</span>
                <span className="spec-cost total-price-val">{formatPrice(totalMSRP)}</span>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <p className="modal-disclaimer-text">
            * Base MSRP excludes transportation and handling charges, destination fees, taxes, title, registration, preparation and documentary fees, tags, labor and installation charges, insurance, and optional equipment, products, packages and accessories. Actual dealer prices may vary.
          </p>
        </div>

        <div className="modal-footer-actions">
          <button className="modal-action-btn secondary" onClick={handlePrint}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print Spec Sheet
          </button>

          <button className="modal-action-btn secondary" onClick={() => { onSave(); onClose(); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Save to Profile
          </button>

          <button className="modal-action-btn primary" onClick={() => { alert(`Thank you! Reference code ${buildCode} was submitted to your local dealer.`); onClose(); }}>
            Request Dealer Contact
          </button>
        </div>
      </div>
    </div>
  );
}
