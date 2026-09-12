import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="notfound-page page">
      <div className="container notfound-page__inner">
        <div className="notfound-page__content">
          <span className="notfound-page__code" aria-hidden="true">404</span>
          <h1 className="heading-lg notfound-page__heading">
            This Piece<br />Doesn't Exist.
          </h1>
          <p className="notfound-page__sub">
            The page you're looking for has been moved, deleted, or never existed.
            Head back to the collection.
          </p>
          <div className="notfound-page__actions">
            <Link to="/" className="btn btn-primary">Return Home</Link>
            <Link to="/products" className="btn btn-outline">Shop Collection</Link>
          </div>
        </div>
        <div className="notfound-page__deco" aria-hidden="true">
          <div className="notfound-page__line notfound-page__line--1" />
          <div className="notfound-page__line notfound-page__line--2" />
          <div className="notfound-page__line notfound-page__line--3" />
        </div>
      </div>
    </main>
  );
}
