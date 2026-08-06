import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isPhotoLiked, setIsPhotoLiked] = useState(false);
  const [isPromptLiked, setIsPromptLiked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(25);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsSent, setSmsSent] = useState(false);

  // Audio simulation timer
  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleSmsSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setSmsSent(true);
      setTimeout(() => setSmsSent(false), 4000);
      setPhoneNumber('');
    }
  };

  return (
    <div className="app-container">
      {/* Header Navbar */}
      <header className="navbar">
        <div className="nav-brand">
          <a href="#hero" className="hinge-logo-text">
            hinge<span>.</span>
          </a>
        </div>

        <nav>
          <ul className="nav-links">
            <li><a href="#philosophy" className="nav-link">Designed to be Deleted</a></li>
            <li><a href="#experience" className="nav-link">The Experience</a></li>
            <li><a href="#stories" className="nav-link">Love Stories</a></li>
            <li><a href="#careers" className="nav-link">Careers</a></li>
            <li><a href="#support" className="nav-link">Support</a></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button className="btn-outline" onClick={() => setIsDownloadModalOpen(true)}>
            Sign In
          </button>
          <button className="btn-green" onClick={() => setIsDownloadModalOpen(true)}>
            Download App
          </button>
          <button 
            className="mobile-menu-btn" 
            aria-label="Toggle menu"
            onClick={() => setIsMobileNavOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${isMobileNavOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="hinge-logo-text">hinge<span>.</span></span>
          <button 
            style={{ color: 'white', fontSize: '1.8rem' }}
            onClick={() => setIsMobileNavOpen(false)}
          >
            ✕
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li><a href="#philosophy" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>Designed to be Deleted</a></li>
          <li><a href="#experience" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>The Experience</a></li>
          <li><a href="#stories" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>Love Stories</a></li>
          <li><a href="#careers" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>Careers</a></li>
          <li><a href="#support" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>Support</a></li>
        </ul>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="btn-green" style={{ width: '100%' }} onClick={() => { setIsMobileNavOpen(false); setIsDownloadModalOpen(true); }}>
            Get Hinge App
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-pill">
            <span>✨</span> Built for Real Relationships
          </div>

          <h1 className="hero-title">
            The dating app <em>designed to be deleted.</em>
          </h1>

          <p className="hero-description">
            Hinge is the relationship app for people who want to get off relationship apps. With thoughtful prompts, audio notes, and intentional matching, we help you find someone who gets you.
          </p>

          <div className="hero-ctas">
            <button className="btn-green" onClick={() => setIsDownloadModalOpen(true)}>
              Download Hinge
            </button>
            <button className="qr-trigger-btn" onClick={() => setIsDownloadModalOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Scan QR Code
            </button>
          </div>

          <div className="app-badges">
            <button className="store-badge-btn" onClick={() => setIsDownloadModalOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.02c.67-.82 1.12-1.95.99-3.09-.97.04-2.16.65-2.85 1.46-.62.72-1.16 1.88-1.01 3.01 1.09.09 2.2-.56 2.87-1.38z"/></svg>
              <div className="store-badge-text">
                <span className="store-badge-subtitle">Download on the</span>
                <span className="store-badge-title">App Store</span>
              </div>
            </button>

            <button className="store-badge-btn" onClick={() => setIsDownloadModalOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L14.81,13.12L4.96,22.97C5.23,23.06 5.5,23.07 5.78,22.95L16.81,15.12M16.81,8.88L5.78,1.05C5.5,0.93 5.23,0.94 4.96,1.03L14.81,10.88L16.81,8.88M20.16,10.81L17.93,12L20.16,13.19C20.68,13.47 21,14.02 21,14.65V9.35C21,9.98 20.68,10.53 20.16,10.81Z"/></svg>
              <div className="store-badge-text">
                <span className="store-badge-subtitle">Get it on</span>
                <span className="store-badge-title">Google Play</span>
              </div>
            </button>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img src="/assets/hinge_girl_hero.png" alt="Hinge Member Portrait" />
            
            {/* Top Floating Prompt */}
            <div className="floating-prompt-card top-right">
              <div className="prompt-label">Dating me is like</div>
              <div className="prompt-text">Finding the best vinyl record in a hidden thrift shop. 🎵</div>
              <div className="heart-badge">❤️</div>
            </div>

            {/* Bottom Floating Prompt */}
            <div className="floating-prompt-card bottom-left">
              <div className="prompt-label">My simple pleasures</div>
              <div className="prompt-text">Matcha lattes & Sunday morning farmers markets 🍵</div>
              <div className="heart-badge">❤️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Hinge App Experience Showcase */}
      <section id="experience" className="profile-showcase-section">
        <div className="section-header">
          <span className="section-tag">Interactive Preview</span>
          <h2 className="section-title">Designed for connection, not swiping</h2>
          <p className="section-subtitle">
            Hinge profiles give you a real glimpse into someone's personality through photos, voice notes, and unique response prompts. Try interacting with Maya's card below!
          </p>
        </div>

        <div className="phone-mockup-wrapper">
          <div className="phone-notch"></div>
          
          <div className="hinge-app-screen">
            {/* User Header Info */}
            <div className="app-screen-header">
              <div>
                <h3 className="user-name-title">Maya, 24</h3>
                <span className="user-location-tag">📍 Brooklyn, NY • UX Designer</span>
              </div>
              <span style={{ fontSize: '1.4rem' }}>✨</span>
            </div>

            {/* Photo Card with Interactive Heart */}
            <div className="app-photo-card">
              <img src="/assets/hinge_girl_profile_1.png" alt="Maya Hinge Profile" />
              <button 
                className={`photo-like-btn ${isPhotoLiked ? 'liked' : ''}`}
                onClick={() => setIsPhotoLiked(!isPhotoLiked)}
                aria-label="Like photo"
              >
                {isPhotoLiked ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Voice Prompt Player */}
            <div className="voice-prompt-card">
              <div className="voice-prompt-header">
                <span>🎙️</span> Voice Prompt
              </div>
              <div className="voice-prompt-title">
                "The secret ingredient to a perfect weekend..."
              </div>
              <div className="audio-player-bar">
                <button 
                  className="audio-play-btn" 
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                >
                  {isPlayingAudio ? '⏸' : '▶'}
                </button>
                <div className="audio-waveform">
                  {[40, 75, 50, 90, 30, 85, 60, 100, 45, 70, 95, 40, 80, 55, 65].map((height, i) => (
                    <div 
                      key={i} 
                      className={`waveform-bar ${i * 7 < audioProgress ? 'active' : ''}`} 
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <span className="audio-timer">0:{audioProgress < 10 ? `0${Math.floor(audioProgress/10)}` : Math.floor(audioProgress/7)}</span>
              </div>
            </div>

            {/* Response Prompt Card */}
            <div className="prompt-card">
              <span className="prompt-question">Together, we could...</span>
              <p className="prompt-answer">"Search for the best hand-pulled ramen noodles in the city and argue about sci-fi films."</p>
              <button 
                className={`photo-like-btn ${isPromptLiked ? 'liked' : ''}`}
                onClick={() => setIsPromptLiked(!isPromptLiked)}
                style={{ position: 'absolute', bottom: '16px', right: '16px' }}
              >
                {isPromptLiked ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Designed to be Deleted Philosophy */}
      <section id="philosophy" className="deleted-philosophy-section">
        <div className="section-header">
          <span className="section-tag">Our Philosophy</span>
          <h2 className="section-title">Why Hinge works differently</h2>
          <p className="section-subtitle">
            Most dating apps want you to stay swiping forever. We measure our success by how quickly you delete our app.
          </p>
        </div>

        <div className="philosophy-grid">
          <div className="philosophy-card">
            <div className="philosophy-icon">💬</div>
            <h3 className="philosophy-card-title">Prompts Over Swiping</h3>
            <p className="philosophy-card-desc">
              Comment on specific photos or prompts to start conversations naturally. No awkward baseline greetings required.
            </p>
          </div>

          <div className="philosophy-card">
            <div className="philosophy-icon">🎯</div>
            <h3 className="philosophy-card-title">Most Compatible</h3>
            <p className="philosophy-card-desc">
              Our Nobel Prize-winning Gale-Shapley algorithm pair matching surfaces one person each day we think you'll hit it off with.
            </p>
          </div>

          <div className="philosophy-card">
            <div className="philosophy-icon">💚</div>
            <h3 className="philosophy-card-title">We Met Feedback</h3>
            <p className="philosophy-card-desc">
              After going on a date, Hinge privately asks how it went so our recommendations get smarter over time for real chemistry.
            </p>
          </div>
        </div>
      </section>

      {/* Love Stories Section */}
      <section id="stories" className="stories-section">
        <div className="section-header" style={{ marginBottom: '48px' }}>
          <span className="section-tag">Real Connection</span>
          <h2 className="section-title">Couples who deleted Hinge</h2>
        </div>

        <div className="story-card-wrapper">
          <div className="story-image-container">
            <img src="/assets/hinge_couple_story.png" alt="Hinge Success Story Couple" />
          </div>

          <div className="story-content">
            <blockquote className="story-quote">
              "We bonded immediately over a voice prompt about seaside coffee shops. Three years later, we got married in Malibu!"
            </blockquote>
            <div>
              <div className="story-couple-names">Julian & Chloe</div>
              <div className="story-detail">Met on Hinge in 2023 • Married 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download SMS Banner */}
      <section className="download-banner-section">
        <div className="download-banner-content">
          <h2 className="section-title">Ready to find your person?</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Enter your phone number and we'll text you a direct link to download the Hinge app.
          </p>

          <form onSubmit={handleSmsSubmit} style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '460px' }}>
            <input 
              type="tel" 
              placeholder="(555) 000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{
                flex: 1,
                padding: '14px 20px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
                background: '#1A1A22',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />
            <button className="btn-green" type="submit">
              Send Link
            </button>
          </form>

          {smsSent && (
            <div style={{ color: 'var(--hinge-green)', fontSize: '0.95rem', fontWeight: '600' }}>
              ✓ Download link sent to your phone!
            </div>
          )}
        </div>
      </section>

      {/* Replicated Hinge Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            {/* Brand Column */}
            <div className="footer-brand-col">
              <a href="#hero" className="hinge-logo-text">
                hinge<span>.</span>
              </a>
              <p className="footer-slogan">
                The dating app designed to be deleted.
              </p>
              <div className="social-icons-row">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">📸</a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="TikTok">🎵</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter">🐦</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="YouTube">▶</a>
              </div>
            </div>

            {/* Column 1: Company */}
            <div>
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-link-list">
                <li><a href="#philosophy" className="footer-link">About Us</a></li>
                <li><a href="#careers" className="footer-link">Careers</a></li>
                <li><a href="#labs" className="footer-link">Hinge Labs</a></li>
                <li><a href="#press" className="footer-link">Newsroom</a></li>
                <li><a href="#impact" className="footer-link">Social Impact</a></li>
              </ul>
            </div>

            {/* Column 2: Community */}
            <div>
              <h4 className="footer-col-title">Community</h4>
              <ul className="footer-link-list">
                <li><a href="#stories" className="footer-link">Love Stories</a></li>
                <li><a href="#guidelines" className="footer-link">Member Guidelines</a></li>
                <li><a href="#safety" className="footer-link">Trust & Safety</a></li>
                <li><a href="#advice" className="footer-link">Dating Advice</a></li>
                <li><a href="#faq" className="footer-link">FAQ</a></li>
              </ul>
            </div>

            {/* Column 3: Legal & Support */}
            <div id="support">
              <h4 className="footer-col-title">Legal & Support</h4>
              <ul className="footer-link-list">
                <li><a href="#help" className="footer-link">Help Center</a></li>
                <li><a href="#terms" className="footer-link">Terms of Service</a></li>
                <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
                <li><a href="#cookies" className="footer-link">Cookie Policy</a></li>
                <li><a href="#consumer" className="footer-link">Consumer Health Privacy</a></li>
              </ul>
            </div>

            {/* Column 4: App Store */}
            <div>
              <h4 className="footer-col-title">Get the App</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Available on iOS and Android devices worldwide.
              </p>
              <button className="btn-green" style={{ width: '100%' }} onClick={() => setIsDownloadModalOpen(true)}>
                Download Now
              </button>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom">
            <div>
              © 2026 Hinge, Inc. All rights reserved. A Match Group Company.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <select className="language-select" aria-label="Select Language">
                <option value="en-US">English (US)</option>
                <option value="en-UK">English (UK)</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </footer>

      {/* QR Code / Download Modal */}
      {isDownloadModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDownloadModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsDownloadModalOpen(false)}>
              ✕
            </button>
            
            <span className="hinge-logo-text">hinge<span>.</span></span>
            
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px' }}>
                Scan to download
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Point your smartphone camera at the QR code below to get the Hinge app.
              </p>
            </div>

            <div className="qr-code-box">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://hinge.co/download" 
                alt="Hinge Download QR Code" 
              />
            </div>

            <button className="btn-green" style={{ width: '100%' }} onClick={() => setIsDownloadModalOpen(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
