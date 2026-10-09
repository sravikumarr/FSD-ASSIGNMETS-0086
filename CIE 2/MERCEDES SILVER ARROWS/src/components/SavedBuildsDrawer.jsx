import React from 'react';

export default function SavedBuildsDrawer({ isOpen, onClose, savedBuilds, onLoadBuild, onDeleteBuild }) {
  if (!isOpen) return null;

  const formatPrice = (val) => '$' + Number(val).toLocaleString('en-US');

  return (
    <div className="mb-drawer-backdrop" onClick={onClose}>
      <div className="mb-saved-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header-bar">
          <div className="drawer-title-group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <h3>Your Saved Mercedes Builds</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="drawer-body-list">
          {savedBuilds.length === 0 ? (
            <div className="drawer-empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <h4>No Saved Builds Yet</h4>
              <p>When customizing any Mercedes-Benz vehicle, click "Save Build" to store and compare your dream configurations here.</p>
            </div>
          ) : (
            savedBuilds.map((b) => (
              <div key={b.id} className="saved-build-card">
                <div className="saved-card-top">
                  <img src={b.vehicle.imgSrc} alt={b.vehicle.title} className="saved-car-thumb" />
                  <div className="saved-meta">
                    <span className="saved-date">Saved on {b.savedAt}</span>
                    <h4 className="saved-name">{b.trim?.name || b.vehicle.title}</h4>
                    <span className="saved-price">{formatPrice(b.totalPrice)}</span>
                  </div>
                </div>

                <div className="saved-specs-pills">
                  <span>Paint: {b.paint.name}</span>
                  <span>Wheels: {b.wheel.size}</span>
                  <span>Interior: {b.upholstery.name.split('/')[0]}</span>
                </div>

                <div className="saved-card-actions">
                  <button className="saved-btn-load" onClick={() => { onLoadBuild(b); onClose(); }}>
                    Load in Configurator
                  </button>
                  <button className="saved-btn-del" onClick={() => onDeleteBuild(b.id)} title="Delete build">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
