import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Orders.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day:   'numeric',
    month: 'long',
    year:  'numeric'
  });
}

function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style:    'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
}

export default function Orders() {
  const { isAuthenticated, token } = useAuth();
  const location                   = useLocation();

  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // Show newly-placed order banner
  const newOrder = location.state?.newOrder;

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError('');

    fetch('/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load orders');
        return res.json();
      })
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setError('Unable to load orders. Please try again.'))
      .finally(() => setLoading(false));
  }, [isAuthenticated, token]);

  /* ── Not logged in ── */
  if (!isAuthenticated) {
    return (
      <main className="orders-page page">
        <div className="container">
          <div className="state-container">
            <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>Orders</span>
            <h1 className="heading-lg">Log In to View<br />Your Orders.</h1>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: 340 }}>
              Sign in to access your order history and track your purchases.
            </p>
            <Link to="/login" className="btn btn-primary">Log In</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page page">
      <div className="container">
        <div className="orders-page__header">
          <h1 className="heading-lg">Order History</h1>
        </div>

        {/* Success banner for newly placed order */}
        {newOrder && (
          <div className="alert alert-success orders-page__new-banner">
            ✓ Order <strong>{newOrder.id}</strong> placed successfully! Total: {formatPrice(newOrder.total)}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-state">
            <div className="loading-track" />
            <span className="eyebrow">Loading Orders…</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="state-container">
            <div className="alert alert-error">{error}</div>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="state-container">
            <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>No Orders Yet</span>
            <h2 className="heading-md">Your order history is empty.</h2>
            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
          </div>
        )}

        {/* Orders list */}
        {!loading && !error && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order) => (
              <article key={order.id} className="order-card">
                <div className="order-card__header">
                  <div className="order-card__id-group">
                    <span className="eyebrow">Order</span>
                    <span className="order-card__id heading-sm">{order.id}</span>
                  </div>
                  <div className="order-card__meta">
                    <span className="order-card__date">{formatDate(order.createdAt)}</span>
                    <span className="badge badge-placed">{order.status}</span>
                  </div>
                </div>

                <div className="order-card__items">
                  {order.items.map((item) => (
                    <div key={item.productId} className="order-card__item">
                      <div className="order-card__item-img-wrap">
                        <img src={item.image} alt={item.name} className="order-card__item-img" />
                      </div>
                      <div className="order-card__item-info">
                        <span className="eyebrow" style={{ fontSize: '0.65rem' }}>{item.category}</span>
                        <p className="order-card__item-name">{item.name}</p>
                        <p className="order-card__item-qty">Qty: {item.quantity}</p>
                      </div>
                      <span className="order-card__item-subtotal">{formatPrice(item.subtotal)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-card__footer">
                  <span className="form-label">Order Total</span>
                  <span className="order-card__total">{formatPrice(order.total)}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
