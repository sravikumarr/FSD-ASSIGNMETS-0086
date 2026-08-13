import React, { useState } from 'react';
import './App.css';

// Form Regular Expressions
const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_ -]{2,29}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,64}$/;

function App() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Validate Name using Regular Expression
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name or username is required';
    }
    if (!/^[a-zA-Z]/.test(name)) {
      return 'Name must start with a letter';
    }
    if (name.length < 3 || name.length > 30) {
      return 'Name must be between 3 and 30 characters';
    }
    if (!NAME_REGEX.test(name)) {
      return 'Only letters, numbers, hyphens, and underscores are allowed';
    }
    return '';
  };

  // Validate Password using Regular Expression
  const validatePassword = (pass) => {
    if (!pass) {
      return 'Password is required';
    }
    if (pass.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(pass)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(pass)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(pass)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pass)) {
      return 'Password must contain at least one special character';
    }
    if (!PASSWORD_REGEX.test(pass)) {
      return 'Password does not meet security requirements';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear error as user types if field was touched
    if (touched[name]) {
      const errorMsg = name === 'name' ? validateName(fieldValue) : validatePassword(fieldValue);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = name === 'name' ? validateName(value) : validatePassword(value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const passwordError = validatePassword(formData.password);

    setTouched({ name: true, password: true });
    setErrors({ name: nameError, password: passwordError });

    if (nameError || passwordError) {
      return;
    }

    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ name: '', password: '', rememberMe: false });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {!isLoggedIn ? (
          <>
            <div className="login-header">
              <div className="logo-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="login-title">Sign in</h1>
              <p className="login-subtitle">Welcome back! Please enter your details.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Name Field */}
              <div className="input-group">
                <label htmlFor="name" className="input-label">
                  Name or Username
                </label>
                <div className="input-wrapper">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`text-input ${touched.name && errors.name ? 'has-error' : ''}`}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="username"
                  />
                </div>
                {touched.name && errors.name && (
                  <span className="error-message" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="input-group">
                <div className="label-row">
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                </div>
                <div className="input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`text-input password-input ${touched.password && errors.password ? 'has-error' : ''}`}
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <span className="error-message" role="alert">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Options Row */}
              <div className="options-row">
                <label className="remember-checkbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Remember for 30 days</span>
                </label>
                <button type="button" className="forgot-password-link">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="button-loader">
                    <span className="spinner"></span>
                    <span>Signing in...</span>
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            <div className="footer-prompt">
              <span>Don't have an account?</span>
              <button type="button" className="signup-link">
                Sign up
              </button>
            </div>
          </>
        ) : (
          /* Clean Logged-in State */
          <div className="success-state">
            <div className="success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="success-title">Welcome, {formData.name}!</h2>
            <p className="success-subtitle">You have successfully signed in to your account.</p>

            <div className="account-details-card">
              <div className="detail-row">
                <span className="detail-label">Account</span>
                <span className="detail-val">{formData.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status</span>
                <span className="detail-status">Active</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Remember Session</span>
                <span className="detail-val">{formData.rememberMe ? 'Yes' : 'No'}</span>
              </div>
            </div>

            <button type="button" className="signout-button" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
