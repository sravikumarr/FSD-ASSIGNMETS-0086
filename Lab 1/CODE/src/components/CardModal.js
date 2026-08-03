import React from 'react';

const CardModal = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div className="card-icon-box" style={{ marginBottom: 0 }}>
            {card.icon}
          </div>
          <div>
            <span style={{
              fontSize: '0.75rem',
              background: 'var(--badge-bg)',
              color: 'var(--badge-text)',
              border: '1px solid var(--badge-border)',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: '600'
            }}>
              {card.tag}
            </span>
            <h3 style={{ fontSize: '1.4rem', marginTop: '0.35rem' }}>{card.title}</h3>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.65' }}>
          {card.details}
        </p>

        <div style={{
          background: 'var(--bg-primary)',
          padding: '1.15rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '1.5rem'
        }}>
          <h4 style={{ fontSize: '0.875rem', marginBottom: '0.4rem', color: 'var(--accent-primary)', fontWeight: '700' }}>
            Layout Rule Overview
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            This element uses standard responsive CSS variables, flex container properties, and auto-fit minmax constraints to stay accessible across all viewport sizes (375px - 1920px+).
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="secondary-button" onClick={onClose}>
            Close Inspector
          </button>
          <button className="cta-button" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
