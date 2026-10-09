import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryTabs from './components/CategoryTabs';
import VehicleGrid from './components/VehicleGrid';
import Configurator from './components/Configurator';
import SavedBuildsDrawer from './components/SavedBuildsDrawer';
import Footer from './components/Footer';
import { VEHICLE_CLASSES } from './data/vehicles';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fuelFilter, setFuelFilter] = useState('all');
  
  // Configurator state
  const [activeConfigVehicle, setActiveConfigVehicle] = useState(null);
  const [activeConfigModel, setActiveConfigModel] = useState(null);

  // Saved builds drawer state
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [savedBuilds, setSavedBuilds] = useState(() => {
    try {
      const stored = localStorage.getItem('mb_saved_builds');
      return stored ? JSON.parse(stored) : [];
    } catch (_) {
      return [];
    }
  });

  // Save builds to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mb_saved_builds', JSON.stringify(savedBuilds));
    } catch (_) {}
  }, [savedBuilds]);

  // URL query synchronization on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const buildId = params.get('build');
    const trimId = params.get('trim');

    if (cat) {
      setSelectedCategory(cat);
    }

    if (buildId) {
      const foundVehicle = VEHICLE_CLASSES.find((v) => v.id === buildId);
      if (foundVehicle) {
        const foundTrim = trimId ? foundVehicle.models.find((m) => m.id === trimId) : foundVehicle.models[0];
        setActiveConfigVehicle(foundVehicle);
        setActiveConfigModel(foundTrim);
      }
    }
  }, []);

  // Handlers
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    // Update URL without full refresh
    const url = new URL(window.location);
    if (catId === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', catId);
    }
    window.history.pushState({}, '', url);

    // Smooth scroll to top of content
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleStartConfigurator = (vehicle, model) => {
    setActiveConfigVehicle(vehicle);
    setActiveConfigModel(model || vehicle.models[0]);

    const url = new URL(window.location);
    url.searchParams.set('build', vehicle.id);
    if (model) url.searchParams.set('trim', model.id);
    window.history.pushState({}, '', url);
  };

  const handleCloseConfigurator = () => {
    setActiveConfigVehicle(null);
    setActiveConfigModel(null);

    const url = new URL(window.location);
    url.searchParams.delete('build');
    url.searchParams.delete('trim');
    window.history.pushState({}, '', url);
  };

  const handleSaveBuild = (buildData) => {
    setSavedBuilds((prev) => [buildData, ...prev.filter((b) => b.id !== buildData.id)]);
  };

  const handleDeleteBuild = (buildId) => {
    setSavedBuilds((prev) => prev.filter((b) => b.id !== buildId));
  };

  const handleLoadSavedBuild = (buildData) => {
    setActiveConfigVehicle(buildData.vehicle);
    setActiveConfigModel(buildData.trim);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setFuelFilter('all');
    const url = new URL(window.location);
    url.searchParams.delete('category');
    window.history.pushState({}, '', url);
  };

  const handleResetView = () => {
    handleCloseConfigurator();
    handleResetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mb-app-root">
      {/* Top Header */}
      <Header
        onOpenSavedBuilds={() => setIsSavedDrawerOpen(true)}
        savedBuildsCount={savedBuilds.length}
        onResetView={handleResetView}
        activeSection={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Hero Section */}
      <HeroBanner onSelectCategory={handleSelectCategory} />

      {/* Category Tabs & Filter Toolbar */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        fuelFilter={fuelFilter}
        onFuelFilterChange={setFuelFilter}
      />

      {/* Vehicles Grid */}
      <main id="contentTop">
        <VehicleGrid
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          fuelFilter={fuelFilter}
          onStartConfigurator={handleStartConfigurator}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Configurator Overlay Mode */}
      {activeConfigVehicle && (
        <Configurator
          vehicle={activeConfigVehicle}
          model={activeConfigModel}
          onClose={handleCloseConfigurator}
          onSaveBuild={handleSaveBuild}
        />
      )}

      {/* Saved Builds Drawer */}
      <SavedBuildsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedBuilds={savedBuilds}
        onLoadBuild={handleLoadSavedBuild}
        onDeleteBuild={handleDeleteBuild}
      />
    </div>
  );
}

export default App;
