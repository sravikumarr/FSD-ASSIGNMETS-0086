import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  // Redirect destination after login
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // If already logged in, redirect
  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page page">
      <div className="container login-page__container">
        <div className="login-page__left" aria-hidden="true">
          <div className="login-page__hero-img">
            <img src="/images/product-5.webp" alt="" />
          </div>
          <div className="login-page__hero-text">
            <h2 className="heading-xl">The Label<br />Awaits.</h2>
            <p className="login-page__hero-sub">
              Sign in to access your account, place orders, and track your collection.
            </p>
          </div>
        </div>

        <div className="login-page__right">
          <div className="login-page__form-wrap">
            <div className="login-page__form-header">
              <p className="eyebrow">Account</p>
              <h1 className="heading-lg login-page__form-title">Sign In</h1>
              <p className="login-page__form-sub">
                Enter any valid email and a password of 6+ characters.
              </p>
            </div>

            {serverError && (
              <div className="alert alert-error">{serverError}</div>
            )}

            <form
              id="login-form"
              className="login-page__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className={`form-input${errors.email ? ' has-error' : ''}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: '' })); }}
                  autoComplete="email"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className={`form-input${errors.password ? ' has-error' : ''}`}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })); }}
                  autoComplete="current-password"
                />
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                className="btn btn-primary btn-full"
                disabled={submitting}
              >
                {submitting ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="login-page__shop-link">
              Not ready?{' '}
              <Link to="/products" className="login-page__link">
                Browse the Collection →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
