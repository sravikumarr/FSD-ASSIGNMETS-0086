import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

function StockBadge({ stock }) {
  if (stock === 0) return <span className="badge badge-out-of-stock">Out of Stock</span>;
  if (stock <= 3)  return <span className="badge badge-low-stock">Only {stock} left</span>;
  return <span className="badge badge-in-stock">In Stock — {stock} available</span>;
}

export default function ProductDetails() {
  const { id }            = useParams();
  const navigate          = useNavigate();
  const { addToCart }     = useCart();

  const [product, setProduct]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [quantity, setQuantity]   = useState(1);
  const [feedback, setFeedback]   = useState('');
  const [addError, setAddError]   = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    setQuantity(1);
    setFeedback('');
    setAddError('');

    fetch(`/api/products/${id}`)
      .then((res) => {
        if (res.status === 404) throw new Error('NOT_FOUND');
        if (!res.ok) throw new Error('SERVER_ERROR');
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        if (err.message === 'NOT_FOUND') {
          setError('not_found');
        } else {
          setError('server_error');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => {
    if (product && quantity < product.stock) setQuantity((q) => q + 1);
  };

  const handleAddToCart = () => {
    setAddError('');
    setFeedback('');
    if (!product || product.stock === 0) return;

    try {
      addToCart(product, quantity);
      setFeedback(`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`);
      setTimeout(() => setFeedback(''), 3000);
    } catch (err) {
      setAddError(err.message);
    }
  };

  const formattedPrice = product
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
      }).format(product.price)
    : '';

  /* ── Loading ── */
  if (loading) {
    return (
      <main className="page">
        <div className="loading-state">
          <div className="loading-track" />
          <span className="eyebrow">Loading…</span>
        </div>
      </main>
    );
  }

  /* ── Not Found ── */
  if (error === 'not_found') {
    return (
      <main className="page">
        <div className="state-container">
          <span className="eyebrow" style={{ color: 'var(--error)' }}>404</span>
          <h1 className="heading-lg">Product Not Found</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: 380, textAlign: 'center' }}>
            This piece doesn't exist in our catalogue. It may have been removed or the URL is incorrect.
          </p>
          <Link to="/products" className="btn btn-primary">Back to Collection</Link>
        </div>
      </main>
    );
  }

  /* ── Server Error ── */
  if (error === 'server_error') {
    return (
      <main className="page">
        <div className="state-container">
          <h1 className="heading-md" style={{ color: 'var(--error)' }}>Unable to Load Product</h1>
          <button className="btn btn-outline" onClick={() => navigate(0)}>Retry</button>
        </div>
      </main>
    );
  }

  /* ── Product ── */
  return (
    <main className="product-details page">
      {/* Breadcrumb */}
      <div className="container product-details__breadcrumb">
        <Link to="/products" className="product-details__back">← Collection</Link>
        <span style={{ color: 'var(--text-dim)' }}>/</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{product.name}</span>
      </div>

      <div className="container product-details__body">
        {/* Image */}
        <div className="product-details__image-panel">
          <div className="product-details__image-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="product-details__image"
            />
          </div>
        </div>

        {/* Info */}
        <div className="product-details__info">
          <div className="product-details__meta">
            <span className="eyebrow">{product.category}</span>
            <StockBadge stock={product.stock} />
          </div>

          <h1 className="heading-lg product-details__name">{product.name}</h1>

          <p className="product-details__price">{formattedPrice}</p>

          <p className="product-details__description">{product.description}</p>

          <div className="divider" />

          {/* Quantity + Add */}
          {product.stock > 0 ? (
            <div className="product-details__purchase">
              <div className="product-details__qty-row">
                <span className="form-label">Quantity</span>
                <div className="qty-selector" role="group" aria-label="Select quantity">
                  <button className="qty-btn" onClick={handleDecrease} disabled={quantity <= 1} aria-label="Decrease">−</button>
                  <span className="qty-display" aria-live="polite">{quantity}</span>
                  <button className="qty-btn" onClick={handleIncrease} disabled={quantity >= product.stock} aria-label="Increase">+</button>
                </div>
              </div>

              <button
                id="add-to-cart-btn"
                className={`btn btn-full${feedback ? ' product-details__btn--success' : ' btn-primary'}`}
                onClick={handleAddToCart}
              >
                {feedback || 'Add to Cart'}
              </button>

              {addError && (
                <div className="alert alert-error">{addError}</div>
              )}

              <Link to="/cart" className="btn btn-outline btn-full">
                View Cart
              </Link>
            </div>
          ) : (
            <div className="product-details__purchase">
              <button className="btn btn-primary btn-full" disabled>
                Sold Out
              </button>
            </div>
          )}

          {/* Stock note */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="product-details__stock-warn">
              ⚠ Low stock — order soon.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
