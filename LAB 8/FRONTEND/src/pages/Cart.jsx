import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

export default function Cart() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { isAuthenticated, token }           = useAuth();
  const navigate                             = useNavigate();

  const [placing, setPlacing]     = useState(false);
  const [orderError, setOrderError] = useState('');
  const [authPrompt, setAuthPrompt] = useState(false);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(cartTotal);

  const handlePlaceOrder = async () => {
    setOrderError('');
    setAuthPrompt(false);

    // Guard: must be logged in
    if (!isAuthenticated) {
      setAuthPrompt(true);
      return;
    }

    // Guard: cart must not be empty
    if (cartItems.length === 0) {
      setOrderError('Your cart is empty.');
      return;
    }

    setPlacing(true);

    const payload = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity:  item.quantity
      }))
    };

    try {
      const res = await fetch('/api/orders', {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order.');
      }

      clearCart();
      navigate('/orders', { state: { newOrder: data } });
    } catch (err) {
      setOrderError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  /* ── Empty cart ── */
  if (cartItems.length === 0) {
    return (
      <main className="cart-page page">
        <div className="container">
          <div className="state-container">
            <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>Cart</span>
            <h1 className="heading-lg">Your Cart is Empty.</h1>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: 360 }}>
              Add some pieces from the collection to get started.
            </p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page page">
      <div className="container">
        <div className="cart-page__header">
          <h1 className="heading-lg">Your Cart</h1>
          <span className="cart-page__count eyebrow">{cartItems.reduce((s, i) => s + i.quantity, 0)} Items</span>
        </div>

        <div className="cart-page__layout">
          {/* Items */}
          <section className="cart-page__items" aria-label="Cart items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </section>

          {/* Summary */}
          <aside className="cart-page__summary">
            <h2 className="heading-sm" style={{ marginBottom: '1.5rem' }}>Order Summary</h2>

            <div className="cart-summary__lines">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-summary__line">
                  <span className="cart-summary__line-name">{item.name} × {item.quantity}</span>
                  <span>
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="divider" style={{ margin: '1.25rem 0' }} />

            <div className="cart-summary__total">
              <span className="heading-sm">Total</span>
              <span className="cart-summary__total-amount">{formattedTotal}</span>
            </div>

            <p className="cart-summary__note">Taxes and shipping calculated at checkout.</p>

            {/* Auth prompt */}
            {authPrompt && (
              <div className="alert alert-info cart-page__auth-prompt">
                <div>
                  <strong>Please log in to place your order.</strong>
                  <br />
                  <Link to="/login" state={{ from: { pathname: '/cart' } }} className="cart-page__login-link">
                    Go to Login →
                  </Link>
                </div>
              </div>
            )}

            {/* Order error */}
            {orderError && (
              <div className="alert alert-error">{orderError}</div>
            )}

            <button
              id="place-order-btn"
              className="btn btn-primary btn-full"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? 'Placing Order…' : 'Place Order'}
            </button>

            <button
              className="btn btn-ghost btn-full"
              onClick={clearCart}
              style={{ marginTop: '0.5rem' }}
            >
              Clear Cart
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
