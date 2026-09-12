import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { cartCount }            = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate                 = useNavigate();
  const [menuOpen, setMenuOpen]  = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  // Detect scroll for border appearance
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  const handleNavClick = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        {/* Brand */}
        <Link to="/" className="navbar__brand" onClick={handleNavClick}>
          <span className="navbar__brand-label">Label</span>
          <span className="navbar__brand-collection">Collection</span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'} onClick={handleNavClick}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'} onClick={handleNavClick}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'} onClick={handleNavClick}>
              Orders
            </NavLink>
          </li>
        </ul>

        {/* Right cluster */}
        <div className="navbar__right">
          {isAuthenticated ? (
            <button className="navbar__link navbar__link--ghost" onClick={handleLogout} title="Log out">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'} onClick={handleNavClick}>
              Account
            </NavLink>
          )}

          <NavLink to="/cart" className={({ isActive }) => `navbar__cart${isActive ? ' navbar__cart--active' : ''}`} onClick={handleNavClick} aria-label={`Cart, ${cartCount} items`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="navbar__cart-count">{cartCount}</span>
            )}
          </NavLink>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`} aria-hidden={!menuOpen}>
        <NavLink to="/" end className="navbar__mobile-link" onClick={handleNavClick}>Home</NavLink>
        <NavLink to="/products" className="navbar__mobile-link" onClick={handleNavClick}>Shop</NavLink>
        <NavLink to="/orders" className="navbar__mobile-link" onClick={handleNavClick}>Orders</NavLink>
        {isAuthenticated ? (
          <button className="navbar__mobile-link navbar__mobile-link--btn" onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login" className="navbar__mobile-link" onClick={handleNavClick}>Account</NavLink>
        )}
        <NavLink to="/cart" className="navbar__mobile-link" onClick={handleNavClick}>
          Cart {cartCount > 0 && `(${cartCount})`}
        </NavLink>
      </div>
    </nav>
  );
}
