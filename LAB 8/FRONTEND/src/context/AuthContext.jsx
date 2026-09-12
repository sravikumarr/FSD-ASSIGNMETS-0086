import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);

  // Rehydrate auth from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('lc_token');
    const savedUser  = localStorage.getItem('lc_user');
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('lc_token');
        localStorage.removeItem('lc_user');
      }
    }
  }, []);

  /**
   * Simple login — validates email format and password length.
   * Creates a base64-encoded JWT-like token for use with the backend.
   */
  const login = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !email.trim()) {
      throw new Error('Email is required.');
    }
    if (!emailRegex.test(email.trim())) {
      throw new Error('Enter a valid email address.');
    }
    if (!password) {
      throw new Error('Password is required.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const userData = {
      email: email.trim().toLowerCase(),
      name:  email.trim().split('@')[0]
    };

    // Base64-encode user payload — backend decodes this same token
    const tokenStr = btoa(JSON.stringify(userData));

    localStorage.setItem('lc_token', tokenStr);
    localStorage.setItem('lc_user', JSON.stringify(userData));

    setToken(tokenStr);
    setUser(userData);
    setIsAuthenticated(true);

    return userData;
  };

  const logout = () => {
    localStorage.removeItem('lc_token');
    localStorage.removeItem('lc_user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
