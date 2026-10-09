import React, { useState, useEffect, useMemo } from 'react';
import { CONFIG_OPTIONS } from '../data/vehicles';
import ConfiguratorSummaryModal from './ConfiguratorSummaryModal';
import CarPhotoStage from './car/CarPhotoStage';
import { MBUSA_SWATCHES } from '../data/officialMercedesAssets';

export default function Configurator({ vehicle, model, onClose, onSaveBuild, isSaved }) {
  // Navigation tabs for configurator
  const STEPS = [
    { id: 'exterior', label: '1. Exterior' },
    { id: 'wheels', label: '2. Wheels' },
    { id: 'interior', label: '3. Interior' },
    { id: 'packages', label: '4. Packages' },
    { id: 'accessories', label: '5. Accessories' },
    { id: 'summary', label: '6. Summary' }
  ];

  const [activeStep, setActiveStep] = useState('exterior');
  const [selectedTrim, setSelectedTrim] = useState(model || vehicle.models[0]);
  
  // Customization State
  const [selectedPaint, setSelectedPaint] = useState(CONFIG_OPTIONS.paints[0]);
  const [selectedWheel, setSelectedWheel] = useState(CONFIG_OPTIONS.wheels[0]);
  const [selectedUpholstery, setSelectedUpholstery] = useState(CONFIG_OPTIONS.upholstery[0]);
  const [selectedTrimInlay, setSelectedTrimInlay] = useState(CONFIG_OPTIONS.trims[0]);
  const [selectedPackages, setSelectedPackages] = useState([CONFIG_OPTIONS.packages[0].id]); // default 1st package selected
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  
  // View states
  const [viewAngle, setViewAngle] = useState('front-34'); // 'front-34', 'side', 'rear-34', 'cockpit'
  const [studioLighting, setStudioLighting] = useState('day'); // 'day', 'night'
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [paymentMode, setPaymentMode] = useState('cash'); // 'cash', 'lease', 'finance'

  // Update view angle when navigating steps
  const handleStepChange = (stepId) => {
    setActiveStep(stepId);
    if (stepId === 'interior') {
      setViewAngle('cockpit');
    } else if (viewAngle === 'cockpit' && (stepId === 'exterior' || stepId === 'wheels')) {
      setViewAngle('front-34');
    }
  };

  // Update selectedTrim if initial prop changes
  useEffect(() => {
    if (model) setSelectedTrim(model);
  }, [model]);

  // Price calculations
  const destinationCharge = 1150;

  const optionsTotal = useMemo(() => {
    let total = 0;
    // Paint
    if (selectedPaint) total += selectedPaint.price;
    // Wheels
    if (selectedWheel) total += selectedWheel.price;
    // Upholstery
    if (selectedUpholstery) total += selectedUpholstery.price;
    // Trim Inlay
    if (selectedTrimInlay) total += selectedTrimInlay.price;
    // Packages
    selectedPackages.forEach((pkgId) => {
      const pkg = CONFIG_OPTIONS.packages.find((p) => p.id === pkgId);
      if (pkg) total += pkg.price;
    });
    // Accessories
    selectedAccessories.forEach((accId) => {
      const acc = CONFIG_OPTIONS.accessories.find((a) => a.id === accId);
      if (acc) total += acc.price;
    });
    return total;
  }, [selectedPaint, selectedWheel, selectedUpholstery, selectedTrimInlay, selectedPackages, selectedAccessories]);

  const totalMSRP = (selectedTrim?.price || vehicle.priceStartingAt) + optionsTotal + destinationCharge;

  // Monthly estimate calculations
  const monthlyLease = Math.round((totalMSRP * 0.0125));
  const monthlyFinance = Math.round((totalMSRP * 0.0185));

  const formatPrice = (val) => '$' + Number(val).toLocaleString('en-US');

  // Package toggle handler
  const togglePackage = (pkgId) => {
    if (selectedPackages.includes(pkgId)) {
      setSelectedPackages(selectedPackages.filter((id) => id !== pkgId));
    } else {
      setSelectedPackages([...selectedPackages, pkgId]);
    }
  };

  // Accessory toggle handler
  const toggleAccessory = (accId) => {
    if (selectedAccessories.includes(accId)) {
      setSelectedAccessories(selectedAccessories.filter((id) => id !== accId));
    } else {
      setSelectedAccessories([...selectedAccessories, accId]);
    }
  };

  // Save current build
  const handleSaveCurrentBuild = () => {
    const buildData = {
      id: 'build-' + Date.now(),
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      vehicle,
      trim: selectedTrim,
      paint: selectedPaint,
      wheel: selectedWheel,
      upholstery: selectedUpholstery,
      trimInlay: selectedTrimInlay,
      packages: selectedPackages.map((id) => CONFIG_OPTIONS.packages.find((p) => p.id === id)).filter(Boolean),
      accessories: selectedAccessories.map((id) => CONFIG_OPTIONS.accessories.find((a) => a.id === id)).filter(Boolean),
      totalPrice: totalMSRP,
      optionsTotal,
    };
    onSaveBuild(buildData);
    setSaveSuccessMsg('Build saved to your account!');
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  return (
    <div className="mb-configurator-overlay">
      {/* Top Configurator Header */}
      <div className="config-header-bar">
        <div className="config-header-left">
          <button className="config-back-btn" onClick={onClose} title="Return to vehicle catalog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>All Vehicles</span>
          </button>
          <div className="config-title-wrap">
            <span className="config-vehicle-year">{vehicle.year}</span>
            <h1 className="config-vehicle-name">{selectedTrim?.name || vehicle.title}</h1>
          </div>
        </div>

        <div className="config-header-center-tabs">
          {STEPS.map((step) => (
            <button
              key={step.id}
              className={`config-step-tab ${activeStep === step.id ? 'active' : ''}`}
              onClick={() => handleStepChange(step.id)}
            >
              {step.label}
            </button>
          ))}
        </div>

        <div className="config-header-right">
          {saveSuccessMsg && <span className="save-toast-msg">{saveSuccessMsg}</span>}
          <button className="save-build-pill-btn" onClick={handleSaveCurrentBuild}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Save Build
          </button>
          <button className="config-close-btn" onClick={onClose} aria-label="Close configurator">
            &times;
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Stage Visualizer, Right Options Panel */}
      <div className="config-body-layout">
        {/* LEFT: Dynamic Stage Visualizer */}
        <div className={`config-stage-canvas ${studioLighting === 'night' ? 'stage-night-mode' : ''}`}>
          {/* Visualizer Controls */}
          <div className="stage-overlay-controls">
            <div className="angle-toggles">
              <button 
                className={`angle-btn ${viewAngle === 'front-34' ? 'active' : ''}`}
                onClick={() => setViewAngle('front-34')}
              >
                3/4 View
              </button>
              <button 
                className={`angle-btn ${viewAngle === 'side' ? 'active' : ''}`}
                onClick={() => setViewAngle('side')}
              >
                Side
              </button>
              <button 
                className={`angle-btn ${viewAngle === 'rear-34' ? 'active' : ''}`}
                onClick={() => setViewAngle('rear-34')}
              >
                Rear
              </button>
              <button 
                className={`angle-btn ${viewAngle === 'cockpit' ? 'active' : ''}`}
                onClick={() => setViewAngle('cockpit')}
              >
                Cockpit
              </button>
            </div>

            <div className="lighting-toggle">
              <button
                className={`lighting-btn ${studioLighting === 'day' ? 'active' : ''}`}
                onClick={() => setStudioLighting('day')}
                title="Studio Daylight"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: '-2px' }}>
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                Studio
              </button>
              <button
                className={`lighting-btn ${studioLighting === 'night' ? 'active' : ''}`}
                onClick={() => setStudioLighting('night')}
                title="Night Ambient Lighting"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: '-2px' }}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                Night
              </button>
            </div>
          </div>

          {/* Real-Time Interactive Vehicle Photo Stage */}
          <div className="vehicle-stage-display">
            <CarPhotoStage
              vehicle={vehicle}
              paint={selectedPaint}
              wheel={selectedWheel}
              upholstery={selectedUpholstery}
              view={viewAngle}
              theme={studioLighting}
            />
          </div>

          {/* Stage Bottom Metadata */}
          <div className="stage-bottom-specs-badge">
            <div className="badge-stat">
              <span className="stat-val">{selectedTrim?.hp}</span>
              <span className="stat-lbl">Horsepower</span>
            </div>
            <div className="badge-stat">
              <span className="stat-val">{selectedTrim?.acceleration}</span>
              <span className="stat-lbl">0-60 MPH</span>
            </div>
            <div className="badge-stat">
              <span className="stat-val">{selectedTrim?.range}</span>
              <span className="stat-lbl">Range / Fuel</span>
            </div>
            <div className="badge-stat">
              <span className="stat-val">{selectedWheel.size}</span>
              <span className="stat-lbl">Wheels</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Step-by-Step Configuration Panel */}
        <div className="config-options-panel">
          {/* STEP 1: EXTERIOR */}
          {activeStep === 'exterior' && (
            <div className="config-step-content">
              <div className="step-section-header">
                <h2>Exterior Finish</h2>
                <p>Select from Mercedes-Benz high-metallic lacquers, solid tones, and exclusive MANUFAKTUR paintworks.</p>
              </div>

              {/* Trim Model Switcher within class */}
              {vehicle.models.length > 1 && (
                <div className="panel-trim-switcher">
                  <label className="panel-field-label">Selected Model & Powertrain</label>
                  <div className="trim-pill-select-grid">
                    {vehicle.models.map((m) => (
                      <button
                        key={m.id}
                        className={`trim-select-btn ${selectedTrim?.id === m.id ? 'active' : ''}`}
                        onClick={() => setSelectedTrim(m)}
                      >
                        <span className="trim-btn-name">{m.name}</span>
                        <span className="trim-btn-price">{formatPrice(m.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Paint Swatches Section */}
              <div className="panel-paints-group">
                <div className="swatch-header-info">
                  <label className="panel-field-label">Exterior Paint</label>
                  <span className="selected-swatch-name">
                    {selectedPaint.name} — <strong>{selectedPaint.price === 0 ? 'Included' : formatPrice(selectedPaint.price)}</strong>
                  </span>
                </div>
                <div className="paint-swatches-grid">
                  {CONFIG_OPTIONS.paints.map((paint) => {
                    const isSelected = selectedPaint.id === paint.id;
                    const swatchImg = MBUSA_SWATCHES.paints[paint.id];
                    return (
                      <button
                        key={paint.id}
                        className={`paint-swatch-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedPaint(paint)}
                        title={`${paint.name} (${paint.price === 0 ? 'Included' : formatPrice(paint.price)})`}
                      >
                        {swatchImg ? (
                          <img src={swatchImg} alt={paint.name} className="swatch-img-thumb" />
                        ) : (
                          <span 
                            className="swatch-circle"
                            style={{ backgroundColor: paint.hex }}
                          ></span>
                        )}
                        <span className="swatch-pill-label">{paint.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: WHEELS */}
          {activeStep === 'wheels' && (
            <div className="config-step-content">
              <div className="step-section-header">
                <h2>Wheels & Suspension</h2>
                <p>Precision-engineered Mercedes-Benz and AMG alloy wheels crafted for aerodynamic airflow and sports dynamics.</p>
              </div>

              <div className="wheels-selection-list">
                {CONFIG_OPTIONS.wheels.map((wheel) => {
                  const isSelected = selectedWheel.id === wheel.id;
                  const wheelImg = MBUSA_SWATCHES.wheels[wheel.id];
                  return (
                    <div
                      key={wheel.id}
                      className={`wheel-card-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedWheel(wheel)}
                    >
                      {wheelImg && (
                        <div className="wheel-thumb-col">
                          <img src={wheelImg} alt={wheel.name} className="wheel-swatch-img" />
                        </div>
                      )}
                      <div className="wheel-radio-col">
                        <span className={`radio-dot ${isSelected ? 'checked' : ''}`}></span>
                      </div>
                      <div className="wheel-info-col">
                        <div className="wheel-header-row">
                          <h4 className="wheel-title">{wheel.name}</h4>
                          <span className="wheel-price">{wheel.price === 0 ? 'Included' : formatPrice(wheel.price)}</span>
                        </div>
                        <span className="wheel-finish-badge">{wheel.finish}</span>
                        <p className="wheel-desc">{wheel.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: INTERIOR */}
          {activeStep === 'interior' && (
            <div className="config-step-content">
              <div className="step-section-header">
                <h2>Interior Upholstery & Trims</h2>
                <p>Tailored craftsmanship with hand-finished woods, ambient illumination, and supple leather appointments.</p>
              </div>

              {/* Upholstery Selection */}
              <div className="interior-upholstery-section">
                <div className="swatch-header-info">
                  <label className="panel-field-label">Seat Upholstery</label>
                  <span className="selected-swatch-name">
                    {selectedUpholstery.name} — <strong>{selectedUpholstery.price === 0 ? 'Included' : formatPrice(selectedUpholstery.price)}</strong>
                  </span>
                </div>

                <div className="upholstery-cards-grid">
                  {CONFIG_OPTIONS.upholstery.map((uph) => {
                    const isSelected = selectedUpholstery.id === uph.id;
                    const uphImg = MBUSA_SWATCHES.upholstery[uph.id];
                    return (
                      <div
                        key={uph.id}
                        className={`upholstery-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedUpholstery(uph)}
                      >
                        {uphImg ? (
                          <img src={uphImg} alt={uph.name} className="upholstery-thumb-img" />
                        ) : (
                          <div className="upholstery-color-strip" style={{ backgroundColor: uph.hex }}></div>
                        )}
                        <div className="uph-text-group">
                          <span className="uph-type-tag">{uph.type}</span>
                          <h4 className="uph-title">{uph.name}</h4>
                          <span className="uph-price">{uph.price === 0 ? 'Included' : formatPrice(uph.price)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trim Inlay Selection */}
              <div className="interior-trim-inlays-section">
                <div className="swatch-header-info">
                  <label className="panel-field-label">Dashboard & Center Console Inlays</label>
                  <span className="selected-swatch-name">
                    {selectedTrimInlay.name} — <strong>{selectedTrimInlay.price === 0 ? 'Included' : formatPrice(selectedTrimInlay.price)}</strong>
                  </span>
                </div>

                <div className="trim-inlays-list">
                  {CONFIG_OPTIONS.trims.map((trim) => {
                    const isSelected = selectedTrimInlay.id === trim.id;
                    return (
                      <div
                        key={trim.id}
                        className={`trim-inlay-row ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedTrimInlay(trim)}
                      >
                        <span className="trim-swatch-square" style={{ backgroundColor: trim.hex }}></span>
                        <span className="trim-inlay-name">{trim.name}</span>
                        <span className="trim-inlay-price">{trim.price === 0 ? 'Included' : formatPrice(trim.price)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PACKAGES */}
          {activeStep === 'packages' && (
            <div className="config-step-content">
              <div className="step-section-header">
                <h2>Equipment Packages</h2>
                <p>Curated suites of advanced digital technology, AMG styling, and acoustic comfort.</p>
              </div>

              <div className="packages-list-group">
                {CONFIG_OPTIONS.packages.map((pkg) => {
                  const isChecked = selectedPackages.includes(pkg.id);
                  return (
                    <div
                      key={pkg.id}
                      className={`package-card-item ${isChecked ? 'checked' : ''}`}
                      onClick={() => togglePackage(pkg.id)}
                    >
                      <div className="pkg-checkbox-col">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent onClick
                          className="mb-custom-checkbox"
                        />
                      </div>
                      <div className="pkg-details-col">
                        <div className="pkg-header-row">
                          <h4 className="pkg-name">{pkg.name}</h4>
                          <span className="pkg-price">{formatPrice(pkg.price)}</span>
                        </div>
                        <p className="pkg-description">{pkg.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: ACCESSORIES */}
          {activeStep === 'accessories' && (
            <div className="config-step-content">
              <div className="step-section-header">
                <h2>Genuine Mercedes-Benz Accessories</h2>
                <p>Authentic factory-engineered accessories tailored for your lifestyle and vehicle protection.</p>
              </div>

              <div className="accessories-list-group">
                {CONFIG_OPTIONS.accessories.map((acc) => {
                  const isChecked = selectedAccessories.includes(acc.id);
                  return (
                    <div
                      key={acc.id}
                      className={`accessory-card-item ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleAccessory(acc.id)}
                    >
                      <div className="acc-checkbox-col">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mb-custom-checkbox"
                        />
                      </div>
                      <div className="acc-details-col">
                        <div className="acc-header-row">
                          <h4 className="acc-name">{acc.name}</h4>
                          <span className="acc-price">{formatPrice(acc.price)}</span>
                        </div>
                        <p className="acc-description">{acc.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: SUMMARY */}
          {activeStep === 'summary' && (
            <div className="config-step-content">
              <div className="step-section-header">
                <h2>Build Summary</h2>
                <p>Review your tailored Mercedes-Benz specifications before connecting with a certified dealer.</p>
              </div>

              <div className="summary-breakdown-card">
                <div className="summary-header-badge">
                  <span>{vehicle.year} {selectedTrim?.name}</span>
                </div>

                <div className="summary-specs-table">
                  <div className="summary-row">
                    <span className="row-label">Base MSRP</span>
                    <span className="row-value">{formatPrice(selectedTrim?.price || vehicle.priceStartingAt)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="row-label">Exterior Color ({selectedPaint.name})</span>
                    <span className="row-value">{selectedPaint.price === 0 ? 'Included' : formatPrice(selectedPaint.price)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="row-label">Wheels ({selectedWheel.name})</span>
                    <span className="row-value">{selectedWheel.price === 0 ? 'Included' : formatPrice(selectedWheel.price)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="row-label">Interior ({selectedUpholstery.name})</span>
                    <span className="row-value">{selectedUpholstery.price === 0 ? 'Included' : formatPrice(selectedUpholstery.price)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="row-label">Trim Inlay ({selectedTrimInlay.name})</span>
                    <span className="row-value">{selectedTrimInlay.price === 0 ? 'Included' : formatPrice(selectedTrimInlay.price)}</span>
                  </div>
                  {selectedPackages.length > 0 && (
                    <div className="summary-row">
                      <span className="row-label">Equipment Packages ({selectedPackages.length})</span>
                      <span className="row-value">
                        {formatPrice(
                          selectedPackages.reduce((acc, id) => {
                            const p = CONFIG_OPTIONS.packages.find((pkg) => pkg.id === id);
                            return acc + (p ? p.price : 0);
                          }, 0)
                        )}
                      </span>
                    </div>
                  )}
                  {selectedAccessories.length > 0 && (
                    <div className="summary-row">
                      <span className="row-label">Accessories ({selectedAccessories.length})</span>
                      <span className="row-value">
                        {formatPrice(
                          selectedAccessories.reduce((acc, id) => {
                            const a = CONFIG_OPTIONS.accessories.find((item) => item.id === id);
                            return acc + (a ? a.price : 0);
                          }, 0)
                        )}
                      </span>
                    </div>
                  )}
                  <div className="summary-row">
                    <span className="row-label">Transportation & Handling</span>
                    <span className="row-value">{formatPrice(destinationCharge)}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total-highlight">
                    <span className="row-label">Total MSRP *</span>
                    <span className="row-value">{formatPrice(totalMSRP)}</span>
                  </div>
                </div>

                <div className="summary-action-buttons">
                  <button className="summary-modal-trigger-btn" onClick={() => setShowSummaryModal(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Full Spec Sheet & Print
                  </button>
                  <button className="summary-dealer-btn" onClick={() => alert("Connecting to authorized Mercedes-Benz dealership with your configuration code: MB-" + Math.floor(100000 + Math.random() * 900000))}>
                    Find Matching Inventory
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Price & Navigation Bar */}
      <div className="config-sticky-bottom-bar">
        <div className="mb-container bottom-bar-inner">
          <div className="bottom-price-breakdown">
            <div className="price-primary-block">
              <span className="bottom-price-label">Total MSRP *</span>
              <span className="bottom-price-val">{formatPrice(totalMSRP)}</span>
            </div>

            <div className="payment-calculator-pill">
              <div className="calc-toggle-group">
                <button 
                  className={`calc-btn ${paymentMode === 'cash' ? 'active' : ''}`}
                  onClick={() => setPaymentMode('cash')}
                >
                  MSRP
                </button>
                <button 
                  className={`calc-btn ${paymentMode === 'lease' ? 'active' : ''}`}
                  onClick={() => setPaymentMode('lease')}
                >
                  Lease Est.
                </button>
                <button 
                  className={`calc-btn ${paymentMode === 'finance' ? 'active' : ''}`}
                  onClick={() => setPaymentMode('finance')}
                >
                  Finance Est.
                </button>
              </div>
              <div className="calc-amount-display">
                {paymentMode === 'lease' && <span><strong>{formatPrice(monthlyLease)}</strong> / mo (36 mos, $4,999 down)</span>}
                {paymentMode === 'finance' && <span><strong>{formatPrice(monthlyFinance)}</strong> / mo (60 mos @ 4.99% APR)</span>}
                {paymentMode === 'cash' && <span>Includes {formatPrice(optionsTotal)} in added options</span>}
              </div>
            </div>
          </div>

          <div className="bottom-nav-actions">
            {activeStep !== 'exterior' && (
              <button
                className="step-nav-btn prev-btn"
                onClick={() => {
                  const idx = STEPS.findIndex((s) => s.id === activeStep);
                  if (idx > 0) setActiveStep(STEPS[idx - 1].id);
                }}
              >
                Previous Step
              </button>
            )}

            {activeStep !== 'summary' ? (
              <button
                className="step-nav-btn next-btn"
                onClick={() => {
                  const idx = STEPS.findIndex((s) => s.id === activeStep);
                  if (idx < STEPS.length - 1) setActiveStep(STEPS[idx + 1].id);
                }}
              >
                Next: {STEPS[STEPS.findIndex((s) => s.id === activeStep) + 1]?.label.split('. ')[1]}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            ) : (
              <button
                className="step-nav-btn complete-btn"
                onClick={() => setShowSummaryModal(true)}
              >
                Complete & Print Spec
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Summary Modal */}
      {showSummaryModal && (
        <ConfiguratorSummaryModal
          vehicle={vehicle}
          trim={selectedTrim}
          paint={selectedPaint}
          wheel={selectedWheel}
          upholstery={selectedUpholstery}
          trimInlay={selectedTrimInlay}
          packages={selectedPackages.map((id) => CONFIG_OPTIONS.packages.find((p) => p.id === id)).filter(Boolean)}
          accessories={selectedAccessories.map((id) => CONFIG_OPTIONS.accessories.find((a) => a.id === id)).filter(Boolean)}
          totalMSRP={totalMSRP}
          destinationCharge={destinationCharge}
          optionsTotal={optionsTotal}
          onClose={() => setShowSummaryModal(false)}
          onSave={handleSaveCurrentBuild}
        />
      )}
    </div>
  );
}
