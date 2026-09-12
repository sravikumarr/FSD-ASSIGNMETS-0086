import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="state-container">
        <p className="heading-md" style={{ color: 'var(--text-muted)' }}>No products found.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
