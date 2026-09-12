import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CartItem.css';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [qtyError, setQtyError] = useState('');

  const handleDecrease = () => {
    setQtyError('');
    try {
      updateQuantity(item.id, item.quantity - 1, item.stock);
    } catch (err) {
      setQtyError(err.message);
    }
  };

  const handleIncrease = () => {
    setQtyError('');
    try {
      updateQuantity(item.id, item.quantity + 1, item.stock);
    } catch (err) {
      setQtyError(err.message);
    }
  };

  const handleRemove = () => removeFromCart(item.id);

  const subtotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(item.price * item.quantity);

  const unitPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(item.price);

  return (
    <article className="cart-item">
      <div className="cart-item__image-wrap">
        <img src={item.image} alt={item.name} className="cart-item__image" loading="lazy" />
      </div>

      <div className="cart-item__details">
        <div className="cart-item__header">
          <div>
            <span className="cart-item__category eyebrow">{item.category}</span>
            <h3 className="cart-item__name heading-sm">{item.name}</h3>
            <span className="cart-item__unit-price">{unitPrice} / unit</span>
          </div>
          <button className="cart-item__remove btn-ghost" onClick={handleRemove} aria-label={`Remove ${item.name}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cart-item__footer">
          <div className="qty-selector" role="group" aria-label="Quantity">
            <button
              className="qty-btn"
              onClick={handleDecrease}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="qty-display" aria-live="polite">{item.quantity}</span>
            <button
              className="qty-btn"
              onClick={handleIncrease}
              disabled={item.quantity >= item.stock}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <span className="cart-item__subtotal">{subtotal}</span>
        </div>

        {qtyError && <p className="form-error" style={{ marginTop: '0.35rem' }}>{qtyError}</p>}
      </div>
    </article>
  );
}
