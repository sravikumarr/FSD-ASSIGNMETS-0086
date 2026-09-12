import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function StockBadge({ stock }) {
  if (stock === 0) return <span className="badge badge-out-of-stock">Out of Stock</span>;
  if (stock <= 3)  return <span className="badge badge-low-stock">Only {stock} left</span>;
  return <span className="badge badge-in-stock">In Stock</span>;
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [feedback, setFeedback]   = useState('');
  const [addError, setAddError]   = useState('');

  const handleAddToCart = (e) => {
    e.preventDefault(); // don't navigate
    setAddError('');
    setFeedback('');

    if (product.stock === 0) {
      setAddError('Out of stock');
      return;
    }

    try {
      addToCart(product, 1);
      setFeedback('Added!');
      setTimeout(() => setFeedback(''), 2000);
    } catch (err) {
      setAddError(err.message);
      setTimeout(() => setAddError(''), 3000);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(product.price);

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__image-link" aria-label={product.name}>
        <div className="product-card__image-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
          <div className="product-card__image-overlay">
            <span className="product-card__quick-view">View Details</span>
          </div>
        </div>
      </Link>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__category eyebrow">{product.category}</span>
          <StockBadge stock={product.stock} />
        </div>

        <Link to={`/products/${product.id}`} className="product-card__name heading-sm">
          {product.name}
        </Link>

        <div className="product-card__footer">
          <span className="product-card__price">{formattedPrice}</span>

          <button
            className={`product-card__add btn btn-sm${feedback ? ' product-card__add--success' : ''}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label={`Add ${product.name} to cart`}
          >
            {feedback || (product.stock === 0 ? 'Sold Out' : '+ Add')}
          </button>
        </div>

        {addError && (
          <p className="product-card__error">{addError}</p>
        )}
      </div>
    </article>
  );
}
