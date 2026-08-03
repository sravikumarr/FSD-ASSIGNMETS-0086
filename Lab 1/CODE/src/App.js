import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ResponsiveGridSection from './components/ResponsiveGridSection';
import InteractiveTabSection from './components/InteractiveTabSection';
import AccordionSection from './components/AccordionSection';
import CardModal from './components/CardModal';
import Footer from './components/Footer';

function App() {
  // Theme State: Dark or Light
  const [theme, setTheme] = useState('dark');

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Navbar Section Indicator
  const [activeTab, setActiveTab] = useState('features');

  // Modal Inspector Card State
  const [selectedCard, setSelectedCard] = useState(null);

  // Update theme on document root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleExploreClick = () => {
    const featuresEl = document.getElementById('features');
    if (featuresEl) {
      featuresEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper">
      {/* Responsive Navigation Bar & Drawer */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Sections */}
      <main>
        {/* Split Hero Section */}
        <HeroSection onExploreClick={handleExploreClick} />

        {/* Responsive CSS Grid Feature Cards */}
        <ResponsiveGridSection onSelectCard={(card) => setSelectedCard(card)} />

        {/* Interactive Tabbed Content Section */}
        <InteractiveTabSection />

        {/* Responsive Interactive Accordion Section */}
        <AccordionSection />
      </main>

      {/* Modal Inspector Component */}
      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />

      {/* Responsive Footer */}
      <Footer />
    </div>
  );
}

export default App;
