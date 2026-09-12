import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Home.css';

const TICKER_ITEMS = [
  'New Drop', 'Label Collection', 'Independent Streetwear',
  'New Drop', 'Label Collection', 'Independent Streetwear',
  'New Drop', 'Label Collection', 'Independent Streetwear',
  'New Drop', 'Label Collection', 'Independent Streetwear',
];

const HERO_SLIDES = [
  { src: '/images/hero-1.jpg', position: '60% center' },
  { src: '/images/hero-2.jpg', position: '45% center' },
  { src: '/images/hero-3.jpg', position: '55% 30%'   },
];

const SLIDE_DURATION = 5000;

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured]   = useState(true);
  const [activeSlide, setActiveSlide]           = useState(0);
  const [prevSlide, setPrevSlide]               = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((cur) => {
        const next = (cur + 1) % HERO_SLIDES.length;
        setPrevSlide(cur);
        return next;
      });
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => setFeaturedProducts(Array.isArray(d) ? d.slice(0, 6) : []))
      .catch(() => setFeaturedProducts([]))
      .finally(() => setLoadingFeatured(false));
  }, []);

  return (
    <main className="home page">

      {/* ── Cinematic Hero ── */}
      <section className="home__hero">

        {/* Slides */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`home__slide ${i === activeSlide ? 'home__slide--active' : ''} ${i === prevSlide ? 'home__slide--prev' : ''}`}
            aria-hidden={i !== activeSlide}
          >
            <img
              src={slide.src}
              alt=""
              className="home__slide-img"
              style={{ objectPosition: slide.position }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Overlays */}
        <div className="home__hero-vignette"  aria-hidden="true" />
        <div className="home__hero-grain"     aria-hidden="true" />
        <div className="home__hero-gradient"  aria-hidden="true" />

        {/* Content */}
        <div className="container home__hero-content">
          <p className="eyebrow home__hero-eyebrow">SS — 2025 Collection</p>
          <h1 className="heading-hero home__hero-headline">
            Wear<br />
            <em className="home__hero-italic">the</em><br />
            Label.
          </h1>
          <p className="home__hero-sub">
            Premium independent streetwear.<br />
            Considered cuts. Deliberate details.
          </p>
          <div className="home__hero-actions">
            <Link to="/products" className="btn btn-primary">Shop Collection</Link>
            <Link to="/products" className="btn btn-outline">View Lookbook →</Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="home__hero-dots" role="tablist" aria-label="Slideshow navigation">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`home__hero-dot${i === activeSlide ? ' home__hero-dot--active' : ''}`}
              onClick={() => { setPrevSlide(activeSlide); setActiveSlide(i); }}
              role="tab"
              aria-selected={i === activeSlide}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="home__scroll-hint" aria-hidden="true">
          <span className="home__scroll-label">Scroll</span>
          <div className="home__scroll-line" />
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="ticker-line" aria-hidden="true">
        <div className="ticker-inner">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i}>— {item}</span>
          ))}
        </div>
      </div>

      {/* ── Featured Products ── */}
      <section className="home__featured">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-lg">Featured Drops</h2>
            <Link to="/products" className="btn btn-ghost">View All →</Link>
          </div>

          {loadingFeatured ? (
            <div className="loading-state">
              <div className="loading-track" />
              <span className="eyebrow">Loading Collection…</span>
            </div>
          ) : (
            <div className="home__featured-grid">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Editorial Section ── */}
      <section className="home__editorial">
        <div className="container home__editorial-inner">
          <div className="home__editorial-text">
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>About the Label</p>
            <h2 className="heading-lg home__editorial-heading">
              Built for those<br />who move<br />with intent.
            </h2>
            <p className="home__editorial-body">
              Label Collection is an independent streetwear label focused on
              heavyweight fabrics, considered silhouettes, and a restrained
              design philosophy. Every piece is built to last — and to look
              better with every wear.
            </p>
            <p className="home__editorial-body">No seasons. No excess. Just the label.</p>
            <Link to="/products" className="btn btn-outline" style={{ marginTop: '2rem' }}>
              Explore All Pieces
            </Link>
          </div>

          <div className="home__editorial-image-stack" aria-hidden="true">
            <div className="home__editorial-img home__editorial-img--1">
              <img src="/images/product-4.webp" alt="Washed Denim Jacket" />
            </div>
            <div className="home__editorial-img home__editorial-img--2">
              <img src="/images/product-2.webp" alt="Oversized Hoodie" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="home__cta">
        <div className="container home__cta-inner">
          <div>
            <h2 className="heading-xl home__cta-heading">The Full<br />Collection.</h2>
            <p className="home__cta-sub">10 pieces. Zero compromise.</p>
          </div>
          <Link to="/products" className="btn btn-primary home__cta-btn">Shop Now</Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home__footer">
        <div className="container home__footer-inner">
          <span className="home__footer-brand"><strong>Label</strong> Collection</span>
          <span className="home__footer-legal">© 2025 — All rights reserved</span>
        </div>
      </footer>
    </main>
  );
}
