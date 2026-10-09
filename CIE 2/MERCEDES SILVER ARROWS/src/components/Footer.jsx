import React from 'react';

export default function Footer() {
  return (
    <footer className="mb-footer">
      <div className="mb-container">
        {/* Top Disclaimer / Legal Section */}
        <div className="mb-footer-disclaimer">
          <p className="disclaimer-text">
            * Base MSRP excludes transportation and handling charges, destination fees, taxes, title, registration, preparation and documentary fees, tags, labor and installation charges, insurance, and optional equipment, products, packages and accessories. Options, model availability and actual dealer price may vary. See dealer for details, costs and terms.
          </p>
          <p className="disclaimer-text">
            EPA estimated fuel economy values and EV driving ranges are for comparison purposes only. Actual mileage and battery range will vary based on driving style, road and terrain conditions, weather, passenger and cargo load, battery age and temperature.
          </p>
        </div>

        {/* Footer Navigation Columns */}
        <div className="mb-footer-nav-grid">
          <div className="footer-col">
            <h4>Vehicles</h4>
            <ul>
              <li><a href="#all-vehicles">All Vehicles</a></li>
              <li><a href="#electric">Mercedes Electric (EQ)</a></li>
              <li><a href="#suvs">SUVs</a></li>
              <li><a href="#sedans">Sedans & Wagons</a></li>
              <li><a href="#coupes">Coupes</a></li>
              <li><a href="#convertibles">Convertibles & Roadsters</a></li>
              <li><a href="#amg">Mercedes-AMG Performance</a></li>
              <li><a href="#maybach">Mercedes-Maybach</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Shopping Tools</h4>
            <ul>
              <li><a href="#byo">Build Your Own</a></li>
              <li><a href="#inventory">Search Inventory</a></li>
              <li><a href="#special-offers">Special Offers & Incentives</a></li>
              <li><a href="#trade-in">Value Your Trade-In</a></li>
              <li><a href="#payment-calc">Estimate Payments</a></li>
              <li><a href="#cpo">Certified Pre-Owned</a></li>
              <li><a href="#find-dealer">Find a Certified Dealer</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Owners & Technology</h4>
            <ul>
              <li><a href="#mercedes-me">Mercedes me connect App</a></li>
              <li><a href="#mbux">MBUX Multimedia & AI</a></li>
              <li><a href="#charging">Charging & Public Networks</a></li>
              <li><a href="#driver-assist">Driver Assistance Technology</a></li>
              <li><a href="#service">Schedule Service & Maintenance</a></li>
              <li><a href="#manuals">Operator Manuals & Warranties</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>About Mercedes-Benz</h4>
            <ul>
              <li><a href="#brand">The Star & Legacy</a></li>
              <li><a href="#sustainability">Ambition 2039 Sustainability</a></li>
              <li><a href="#motorsport">Mercedes-AMG F1 Motorsport</a></li>
              <li><a href="#careers">Careers & Diversity</a></li>
              <li><a href="#news">Newsroom & Press Releases</a></li>
              <li><a href="#contact">Contact Mercedes-Benz USA</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Star */}
        <div className="mb-footer-bottom-bar">
          <div className="footer-bottom-left">
            <img src="/star.svg" alt="Mercedes Star" className="footer-star-logo" />
            <span className="copyright-text">© {new Date().getFullYear()} Mercedes-Benz USA, LLC. All rights reserved.</span>
          </div>

          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#legal">Legal Notice</a>
            <span>•</span>
            <a href="#do-not-sell">Your Privacy Choices</a>
            <span>•</span>
            <a href="#accessibility">Accessibility</a>
            <span>•</span>
            <a href="#sitemap">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
