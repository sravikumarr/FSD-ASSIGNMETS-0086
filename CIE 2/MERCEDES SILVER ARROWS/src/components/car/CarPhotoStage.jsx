import React, { useState, useEffect, useRef, useMemo } from 'react';
import { resolveVehicleBodyType } from '../../data/bodyMap';
import { getOfficialCarImageUrl } from '../../data/officialMercedesAssets';

/**
 * CarPhotoStage Component
 * Renders high-fidelity official Mercedes-Benz studio photography with live paint recolor,
 * wheel options, panoramic interactive Cockpit view, and Studio/Night illumination.
 */
export default function CarPhotoStage({
  vehicle,
  paint,
  wheel,
  upholstery,
  view = 'front-34',
  theme = 'day',
}) {
  const bodyType = useMemo(() => resolveVehicleBodyType(vehicle), [vehicle]);

  // Compute the current target image URL
  const currentImageUrl = useMemo(() => {
    return getOfficialCarImageUrl({
      vehicle,
      paint,
      wheel,
      upholstery,
      view,
      theme,
      bodyType,
    });
  }, [vehicle, paint, wheel, upholstery, view, theme, bodyType]);

  // Image loading & crossfade states
  const [displayedImageUrl, setDisplayedImageUrl] = useState(currentImageUrl);
  const [previousImageUrl, setPreviousImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Cockpit panoramic viewer drag state
  const [cockpitOffset, setCockpitOffset] = useState(0); // Offset in percentage (-30% to +30%)
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const cockpitContainerRef = useRef(null);

  // Preload and smoothly crossfade images
  useEffect(() => {
    if (!currentImageUrl) return;
    if (currentImageUrl === displayedImageUrl) return;

    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    img.src = currentImageUrl;

    img.onload = () => {
      setPreviousImageUrl(displayedImageUrl);
      setDisplayedImageUrl(currentImageUrl);
      setIsLoading(false);

      const timer = setTimeout(() => {
        setPreviousImageUrl(null);
      }, 350);
      return () => clearTimeout(timer);
    };

    img.onerror = () => {
      const fallbackUrl = `/cars/vehicles/${vehicle?.id || 'c-class-sedan'}/base.png`;
      if (currentImageUrl !== fallbackUrl) {
        setDisplayedImageUrl(fallbackUrl);
      }
      setIsLoading(false);
      setHasError(false);
    };
  }, [currentImageUrl, displayedImageUrl, vehicle?.id]);

  // Handle pointer / drag interactions for Cockpit View
  const handlePointerDown = (e) => {
    if (view !== 'cockpit') return;
    setIsDragging(true);
    setHasDragged(true);
    dragStartX.current = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    dragStartOffset.current = cockpitOffset;
  };

  const handlePointerMove = (e) => {
    if (!isDragging || view !== 'cockpit') return;
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const deltaX = clientX - dragStartX.current;
    
    // Sensitivity factor
    const containerWidth = cockpitContainerRef.current?.offsetWidth || 800;
    const percentChange = (deltaX / containerWidth) * 50;
    
    // Clamp offset between -25% and +25%
    const newOffset = Math.max(-25, Math.min(25, dragStartOffset.current + percentChange));
    setCockpitOffset(newOffset);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation for Cockpit View
  const handleKeyDown = (e) => {
    if (view !== 'cockpit') return;
    if (e.key === 'ArrowLeft') {
      setHasDragged(true);
      setCockpitOffset((prev) => Math.min(25, prev + 5));
    } else if (e.key === 'ArrowRight') {
      setHasDragged(true);
      setCockpitOffset((prev) => Math.max(-25, prev - 5));
    }
  };

  // Angle transformation styles
  const angleTransformStyle = useMemo(() => {
    return { transform: 'scale(1)' };
  }, []);

  // Descriptive alt text for accessibility and SEO
  const altText = useMemo(() => {
    const vName = vehicle?.title || 'Mercedes-Benz';
    const pName = paint?.name || 'Cirrus Silver';
    const wName = wheel?.name || 'Alloy Wheels';
    const uName = upholstery?.name || 'Black Leather';
    if (view === 'cockpit') {
      return `${vName} interior cockpit view with ${uName} upholstery and digital MBUX display.`;
    }
    return `${vName} exterior in ${pName} with ${wName} from ${view} angle.`;
  }, [vehicle, paint, wheel, upholstery, view]);

  return (
    <div
      className={`car-photo-stage-wrapper ${theme === 'night' ? 'stage-theme-night' : 'stage-theme-day'}`}
      ref={cockpitContainerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={view === 'cockpit' ? 0 : -1}
      role={view === 'cockpit' ? 'region' : 'img'}
      aria-label={altText}
    >
      {/* Studio Floor Background & Dynamic Atmospheric Lighting */}
      <div className="stage-lighting-backdrop">
        <div className="stage-studio-vignette" />
        {theme === 'night' && <div className="stage-night-ambient-glow" />}
      </div>

      {/* Dev Banner for Missing Asset (Rule 3) */}
      {hasError && (
        <div className="stage-missing-asset-banner">
          <span className="banner-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </span>
          <span>Missing asset: {currentImageUrl}</span>
        </div>
      )}

      {/* Loading Shimmer Indicator */}
      {isLoading && (
        <div className="stage-loading-shimmer" aria-hidden="true">
          <div className="shimmer-pulse" />
        </div>
      )}

      {/* EXTERIOR STAGE VIEW */}
      {view !== 'cockpit' && (
        <div className="stage-exterior-layer-stack" style={angleTransformStyle}>
          {/* Shadow reflection beneath car */}
          <div className="car-ground-shadow" />

          {/* Previous Image Fading Out */}
          {previousImageUrl && (
            <img
              src={previousImageUrl}
              alt=""
              className="stage-car-layer layer-previous"
              aria-hidden="true"
            />
          )}

          {/* Current Active Image */}
          <img
            src={displayedImageUrl}
            alt={altText}
            className={`stage-car-layer layer-active ${isLoading ? 'is-loading' : 'is-loaded'} ${theme === 'night' ? 'car-night-filter' : ''}`}
          />

          {/* Active Paint HUD Badge */}
          <div className="stage-active-paint-hud">
            <span className="hud-dot" style={{ backgroundColor: paint?.hex || '#ccc' }} />
            <span className="hud-name">{paint?.name || 'Selected Paint'}</span>
            <span className="hud-finish">{paint?.finish || 'Metallic'}</span>
          </div>
        </div>
      )}

      {/* COCKPIT PANORAMIC INTERIOR VIEW */}
      {view === 'cockpit' && (
        <div className="stage-cockpit-viewer">
          <div
            className={`cockpit-pan-track ${isDragging ? 'is-dragging' : ''}`}
            style={{
              transform: `translateX(${cockpitOffset}%) scale(1.15)`,
            }}
          >
            {/* Previous Interior Fading Out */}
            {previousImageUrl && (
              <img
                src={previousImageUrl}
                alt=""
                className="cockpit-image layer-previous"
                aria-hidden="true"
              />
            )}

            {/* Current Active Interior */}
            <img
              src={displayedImageUrl}
              alt={altText}
              className={`cockpit-image layer-active ${theme === 'night' ? 'cockpit-night-filter' : ''}`}
              draggable={false}
            />
          </div>

          {/* Interactive Drag Hint Pill */}
          {!hasDragged && (
            <div className="cockpit-drag-hint-pill">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 16l-4-4m0 0l4-4m-4 4h18m-4 4l4-4m0 0l-4-4" />
              </svg>
              <span>Drag to look around cabin</span>
            </div>
          )}

          {/* Cockpit Active Upholstery Badge */}
          <div className="stage-active-upholstery-hud">
            <span className="hud-dot" style={{ backgroundColor: upholstery?.hex || '#1c1c1c' }} />
            <span className="hud-name">{upholstery?.name || 'Interior Cabin'}</span>
          </div>

          {/* Cockpit Subtle Compass / Navigation Markers */}
          <div className="cockpit-nav-dots" aria-hidden="true">
            <span className={`dot ${cockpitOffset > 8 ? 'active' : ''}`} />
            <span className={`dot ${Math.abs(cockpitOffset) <= 8 ? 'active' : ''}`} />
            <span className={`dot ${cockpitOffset < -8 ? 'active' : ''}`} />
          </div>
        </div>
      )}
    </div>
  );
}
