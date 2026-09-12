import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import './Products.css';

const ALL_CATEGORIES = 'All';

export default function Products() {
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const fetchProducts = () => {
    setLoading(true);
    setError('');
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setError('UNABLE TO LOAD PRODUCTS.'))
      .finally(() => setLoading(false));
  };

  // Fetch on every mount (satisfies "refresh triggers API request" requirement)
  useEffect(() => {
    fetchProducts();
  }, []);

  // Derive unique categories
  const categories = [
    ALL_CATEGORIES,
    ...Array.from(new Set(products.map((p) => p.category)))
  ];

  const filteredProducts =
    activeCategory === ALL_CATEGORIES
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="products-page page">
      <div className="container">
        {/* Page header */}
        <div className="products-page__header">
          <div>
            <p className="eyebrow">SS — 2025</p>
            <h1 className="heading-lg products-page__title">The Collection</h1>
          </div>
          <p className="products-page__count">
            {loading ? '—' : `${filteredProducts.length} piece${filteredProducts.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Category filter */}
        {!loading && !error && products.length > 0 && (
          <div className="filter-tabs" role="tablist" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* States */}
        {loading && (
          <div className="loading-state">
            <div className="loading-track" />
            <span className="eyebrow">Loading Collection…</span>
          </div>
        )}

        {error && !loading && (
          <div className="state-container">
            <p className="heading-md" style={{ color: 'var(--error)' }}>{error}</p>
            <button className="btn btn-outline" onClick={fetchProducts}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </main>
  );
}
