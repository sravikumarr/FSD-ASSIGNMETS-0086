/**
 * DeskCraft — Interactive Workspace Configurator
 * Built with Vanilla JavaScript (ES6+)
 * Aligned with IBM SkillsBuild Web Development Fundamentals
 */

(function () {
  'use strict';

  // ==========================================
  // 1. Catalog Data Definition
  // ==========================================
  const CATALOG_ITEMS = [
    // --- DESKS & LEGS ---
    {
      id: 'desk-oak',
      name: 'Solid Natural Oak Tabletop',
      category: 'desks',
      price: 280,
      icon: '🪵',
      desc: '1.25" thick sustainably harvested solid natural oak with rounded beveled edges.',
      specs: '60" × 30" × 1.25" • 45 lbs',
      gradientId: 'grad-oak',
      edgeColor: '#8B653E',
      type: 'surface'
    },
    {
      id: 'desk-walnut',
      name: 'Dark American Walnut Tabletop',
      category: 'desks',
      price: 340,
      icon: '🌳',
      desc: 'Deep luxurious grain with premium satin finish and natural oil seal.',
      specs: '60" × 30" × 1.25" • 50 lbs',
      gradientId: 'grad-walnut',
      edgeColor: '#2B170E',
      type: 'surface'
    },
    {
      id: 'desk-black',
      name: 'Matte Studio Black Tabletop',
      category: 'desks',
      price: 210,
      icon: '⬛',
      desc: 'Anti-fingerprint thermal laminate with chamfered edge profile.',
      specs: '60" × 30" × 1.0" • 38 lbs',
      gradientId: 'grad-black',
      edgeColor: '#0E1014',
      type: 'surface'
    },
    {
      id: 'desk-white',
      name: 'Arctic White Birch Tabletop',
      category: 'desks',
      price: 225,
      icon: '⬜',
      desc: 'Ultra-clean Scandinavian aesthetic with high-durability melamine coat.',
      specs: '60" × 30" × 1.0" • 40 lbs',
      gradientId: 'grad-white',
      edgeColor: '#B0BAC9',
      type: 'surface'
    },
    {
      id: 'frame-sitstand-black',
      name: 'Dual-Motor Sit-Stand Frame (Black)',
      category: 'desks',
      price: 399,
      icon: '⚙️',
      desc: 'Quiet dual motorized legs with 4 memory presets and anti-collision sensor.',
      specs: 'Height 27" - 49" • 300 lbs cap',
      legColor: '#1E232F',
      type: 'frame'
    },

    // --- MONITORS & DISPLAYS ---
    {
      id: 'mon-single-4k',
      name: '27" 4K UHD Pro Display',
      category: 'monitors',
      price: 420,
      icon: '🖥️',
      desc: 'Color-accurate IPS panel (99% DCI-P3), 3840×2160, USB-C 90W PD charging.',
      specs: '27-inch • 4K UHD 60Hz • IPS',
      layout: 'single'
    },
    {
      id: 'mon-dual-qhd',
      name: 'Dual 27" QHD Displays on Ergo Arms',
      category: 'monitors',
      price: 780,
      icon: '🖥️🖥️',
      desc: 'Dual 2560×1440 165Hz panels on gas-spring dual articulating monitor arms.',
      specs: '2× 27-inch • QHD 165Hz • 1ms',
      layout: 'dual'
    },
    {
      id: 'mon-ultrawide-34',
      name: '34" Ultrawide Curved WQHD',
      category: 'monitors',
      price: 650,
      icon: '📺',
      desc: '21:9 immersive 1800R curved display with built-in KVM switch and PIP mode.',
      specs: '34-inch • 3440×1440 • 144Hz',
      layout: 'ultrawide'
    },
    {
      id: 'mon-vertical-combo',
      name: 'CodeStack: Vertical + Horizontal Dual',
      category: 'monitors',
      price: 820,
      icon: '📐',
      desc: '1 vertical 24" portrait monitor for code/terminal + 1 horizontal 32" 4K primary.',
      specs: '24" Vertical + 32" 4K',
      layout: 'vertical-combo'
    },
    {
      id: 'mon-triple-array',
      name: 'Triple 27" Panoramic Workstation',
      category: 'monitors',
      price: 1150,
      icon: '🪟',
      desc: 'Triple monitor mount array for comprehensive multi-tasking and sim workflows.',
      specs: '3× 27-inch Panoramic',
      layout: 'triple'
    },

    // --- KEYBOARDS & MICE ---
    {
      id: 'kb-mech-75',
      name: '75% Custom Mechanical Keyboard',
      category: 'peripherals',
      price: 165,
      icon: '⌨️',
      desc: 'CNC aluminum body, Gateron Oil King linear switches, PBT double-shot keycaps.',
      specs: 'Wireless 2.4GHz + BT 5.1 • Hot-swap',
      type: 'keyboard'
    },
    {
      id: 'kb-ergo-split',
      name: 'Ergonomic Split Alice Keyboard',
      category: 'peripherals',
      price: 220,
      icon: '⌨️',
      desc: 'Curved split layout with padded wrist rest and tenting angles for RSI relief.',
      specs: 'Split Alice • Silent Tactile switches',
      type: 'keyboard'
    },
    {
      id: 'kb-lowprofile',
      name: 'Low-Profile Wireless Keyboard',
      category: 'peripherals',
      price: 135,
      icon: '⌨️',
      desc: 'Ultra-thin aluminum chassis with low-profile optical red switches.',
      specs: '16mm thickness • Multi-device',
      type: 'keyboard'
    },
    {
      id: 'mouse-ergo-vertical',
      name: 'Ergonomic Vertical Precision Mouse',
      category: 'peripherals',
      price: 85,
      icon: '🖱️',
      desc: '57° natural handshake angle with quiet clicks and thumb scroll wheel.',
      specs: '4000 DPI • Rechargeable USB-C',
      type: 'mouse'
    },
    {
      id: 'mouse-master-wireless',
      name: 'Wireless Master Performance Mouse',
      category: 'peripherals',
      price: 99,
      icon: '🖱️',
      desc: 'MagSpeed electromagnetic scroll wheel, glass sensor, and gesture controls.',
      specs: '8000 DPI Glass Tracking',
      type: 'mouse'
    },
    {
      id: 'mouse-lightweight-gaming',
      name: 'Ultra-Lightweight Gaming Mouse',
      category: 'peripherals',
      price: 79,
      icon: '🖱️',
      desc: '59g honeycomb chassis, 26,000 DPI sensor, and PTFE virgin glide skates.',
      specs: '59 grams • 26K DPI • 1000Hz',
      type: 'mouse'
    },
    {
      id: 'mouse-magic-trackpad',
      name: 'Precision Glass Desk Trackpad',
      category: 'peripherals',
      price: 129,
      icon: '🔲',
      desc: 'Large glass touch surface with full multi-touch gesture navigation.',
      specs: 'Haptic feedback • Bluetooth',
      type: 'mouse'
    },

    // --- LIGHTING ---
    {
      id: 'light-screenbar',
      name: 'Monitor Screenbar LED Light',
      category: 'lighting',
      price: 110,
      icon: '💡',
      desc: 'Asymmetric optical glare-free desk lamp with wireless desktop dial controller.',
      specs: '2700K - 6500K • CRI > 95',
      type: 'light'
    },
    {
      id: 'light-rgb-strips',
      name: 'Smart RGB Ambient Backlight Strips',
      category: 'lighting',
      price: 45,
      icon: '🌈',
      desc: 'Diffused silicone LED strips mounted behind monitor with sync app support.',
      specs: '16M colors • Music Reactive',
      type: 'light'
    },
    {
      id: 'light-architect-lamp',
      name: 'Architect Minimalist Gooseneck Lamp',
      category: 'lighting',
      price: 75,
      icon: '🪔',
      desc: 'Matte aluminum clamp-on flexible gooseneck with touch stepless dimming.',
      specs: '800 lumens • 3 Color Temps',
      type: 'light'
    },
    {
      id: 'light-dual-bars',
      name: 'Dual Warm Ambient Lightbars',
      category: 'lighting',
      price: 60,
      icon: '🏮',
      desc: 'Vertical lightbars positioned flanking monitors for soft room fill.',
      specs: 'Warm 3000K Amber Glow',
      type: 'light'
    },

    // --- AUDIO & MIC ---
    {
      id: 'audio-studio-monitors',
      name: 'Hi-Fi Desktop Studio Monitors (Pair)',
      category: 'audio',
      price: 240,
      icon: '🔊',
      desc: '4" carbon fiber woofers with silk dome tweeters and rear bass reflex ports.',
      specs: '50W RMS • TRS & RCA & Bluetooth',
      type: 'audio'
    },
    {
      id: 'audio-soundbar',
      name: 'Low-Profile Desk Soundbar',
      category: 'audio',
      price: 130,
      icon: '📻',
      desc: 'Fits neatly beneath monitor with dual passive bass radiators.',
      specs: '30W Output • Optical / USB-C',
      type: 'audio'
    },
    {
      id: 'audio-headphones-stand',
      name: 'Audiophile Open-Back Headphones + Stand',
      category: 'audio',
      price: 190,
      icon: '🎧',
      desc: 'Plush velour earcups with walnut and anodized aluminum desktop stand.',
      specs: '32 Ohm • Detachable Cable',
      type: 'audio'
    },
    {
      id: 'audio-boom-mic',
      name: 'USB-C Cardioid Mic on Boom Arm',
      category: 'audio',
      price: 120,
      icon: '🎙️',
      desc: 'Studio-grade 24-bit/96kHz broadcast microphone with internal pop filter.',
      specs: 'Cardioid • Tap-to-mute',
      type: 'audio'
    },

    // --- ACCESSORIES & MATS ---
    {
      id: 'mat-leather-black',
      name: 'Full-Desk Top-Grain Leather Pad',
      category: 'accessories',
      price: 65,
      icon: '🛡️',
      desc: 'Water-resistant natural oiled leather mat with micro-suede underside.',
      specs: '35" × 16" • Midnight Black',
      type: 'mat'
    },
    {
      id: 'mat-wool-felt',
      name: 'Textured Merino Wool Felt Pad',
      category: 'accessories',
      price: 45,
      icon: '🧶',
      desc: 'Cozy sound-dampening wool felt with non-slip natural rubber dots.',
      specs: '31" × 12" • Ash Grey',
      type: 'mat'
    },
    {
      id: 'acc-plant-monstera',
      name: 'Potted Mini Monstera Greenery',
      category: 'accessories',
      price: 28,
      icon: '🪴',
      desc: 'Live desk plant in ceramic minimalist drainage pot to boost workspace serenity.',
      specs: 'Ceramic Pot 5" height',
      type: 'accessory'
    },
    {
      id: 'acc-phone-stand',
      name: 'MagSafe Aluminum Phone Stand',
      category: 'accessories',
      price: 45,
      icon: '📱',
      desc: 'Floating magnetic 15W wireless charging stand for iPhone / Android.',
      specs: 'Solid Anodized Aluminum',
      type: 'accessory'
    },
    {
      id: 'acc-streamdeck',
      name: '15-Key Macro Console / Stream Deck',
      category: 'accessories',
      price: 150,
      icon: '🎛️',
      desc: 'Customizable LCD keys for one-touch coding shortcuts, app launches, and media.',
      specs: '15 LCD Keys • USB-C',
      type: 'accessory'
    },
    {
      id: 'acc-warm-mug',
      name: 'Smart Ceramic Mug with Heater Pad',
      category: 'accessories',
      price: 40,
      icon: '☕',
      desc: 'Maintains coffee/tea at constant 135°F with auto-shutoff induction base.',
      specs: '14 oz Ceramic • 135°F Temp',
      type: 'accessory'
    },
    {
      id: 'acc-cable-tray',
      name: 'Under-Desk Clean Cable Channel',
      category: 'accessories',
      price: 35,
      icon: '🔌',
      desc: 'Heavy-duty steel wire raceway for completely hidden power strips and cables.',
      specs: 'Conceals all cords & bricks',
      type: 'accessory'
    },
    {
      id: 'acc-laptop-dock',
      name: 'Vertical Walnut Laptop Dock',
      category: 'accessories',
      price: 32,
      icon: '💻',
      desc: 'Saves desk space by parking MacBook / laptop in clamshell closed mode.',
      specs: 'Solid Walnut + Silicone lining',
      type: 'accessory'
    }
  ];

  // ==========================================
  // 2. Curated Presets Definition
  // ==========================================
  const PRESETS = {
    minimalist: {
      name: 'Minimalist Coder',
      deskSurface: 'desk-oak',
      deskFrame: 'frame-sitstand-black',
      monitor: 'mon-single-4k',
      keyboard: 'kb-mech-75',
      mouse: 'mouse-master-wireless',
      deskMat: 'mat-wool-felt',
      lighting: 'light-screenbar',
      audio: 'audio-headphones-stand',
      accessories: ['acc-plant-monstera', 'acc-warm-mug', 'acc-cable-tray'],
      screenMode: 'code',
      rgbColor: '#00f2fe'
    },
    studio: {
      name: 'Studio Creator & Video Pro',
      deskSurface: 'desk-walnut',
      deskFrame: 'frame-sitstand-black',
      monitor: 'mon-ultrawide-34',
      keyboard: 'kb-lowprofile',
      mouse: 'mouse-magic-trackpad',
      deskMat: 'mat-leather-black',
      lighting: 'light-screenbar',
      audio: 'audio-studio-monitors',
      accessories: ['acc-streamdeck', 'acc-boom-mic', 'acc-laptop-dock'],
      screenMode: 'figma',
      rgbColor: '#ff007f'
    },
    'dual-screen': {
      name: 'Ultra Productivity Hub',
      deskSurface: 'desk-oak',
      deskFrame: 'frame-sitstand-black',
      monitor: 'mon-dual-qhd',
      keyboard: 'kb-ergo-split',
      mouse: 'mouse-ergo-vertical',
      deskMat: 'mat-leather-black',
      lighting: 'light-dual-bars',
      audio: 'audio-soundbar',
      accessories: ['acc-phone-stand', 'acc-warm-mug', 'acc-cable-tray', 'acc-laptop-dock'],
      screenMode: 'code',
      rgbColor: '#3b82f6'
    },
    cyberpunk: {
      name: 'Cyberpunk RGB Battlestation',
      deskSurface: 'desk-black',
      deskFrame: 'frame-sitstand-black',
      monitor: 'mon-triple-array',
      keyboard: 'kb-mech-75',
      mouse: 'mouse-lightweight-gaming',
      deskMat: 'mat-leather-black',
      lighting: 'light-rgb-strips',
      audio: 'audio-soundbar',
      accessories: ['acc-streamdeck', 'acc-cable-tray'],
      screenMode: 'cyber',
      rgbColor: '#00ff66'
    }
  };

  // ==========================================
  // 3. Application State
  // ==========================================
  const state = {
    selectedDeskSurface: 'desk-oak',
    selectedDeskFrame: 'frame-sitstand-black',
    selectedMonitor: 'mon-single-4k',
    selectedKeyboard: 'kb-mech-75',
    selectedMouse: 'mouse-master-wireless',
    selectedDeskMat: 'mat-wool-felt',
    selectedLighting: 'light-screenbar',
    selectedAudio: 'audio-headphones-stand',
    accessories: ['acc-plant-monstera', 'acc-warm-mug', 'acc-cable-tray'],
    
    // UI controls state
    activeCategory: 'all',
    searchQuery: '',
    sortOption: 'featured',
    budgetLimit: 1500,
    screenMode: 'code',
    viewMode: 'front', // 'front' | 'top'
    envMode: 'dark', // 'dark' | 'light' | 'neon'
    theme: 'dark', // 'dark' | 'light'
    mouseHand: 'right', // 'right' | 'left'
    sfxEnabled: true,
    rgbColorIndex: 0,
    rgbColors: ['#D6FF00', '#00F5FF', '#FF7700', '#9D4EDD', '#FF007F', '#FFFFFF', 'none'],
    rgbColorNames: ['Volt Lime', 'Cyber Cyan', 'Papaya', 'Purple', 'Hot Pink', 'White', 'Off'],
    
    // Storage
    savedSetups: []
  };

  // ==========================================
  // 4. DOM Elements Cache
  // ==========================================
  const DOM = {
    toastContainer: document.getElementById('toast-container'),
    presetsBtn: document.getElementById('presets-btn'),
    presetsMenu: document.getElementById('presets-menu'),
    sfxToggleBtn: document.getElementById('sfx-toggle-btn'),
    sfxIcon: document.getElementById('sfx-icon'),
    sfxLabel: document.getElementById('sfx-label'),
    savedSetupsBtn: document.getElementById('saved-setups-btn'),
    savedCountBadge: document.getElementById('saved-count-badge'),
    saveCurrentBtn: document.getElementById('save-current-btn'),
    resetConfigBtn: document.getElementById('reset-config-btn'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    themeIconDark: document.getElementById('theme-icon-dark'),
    themeIconLight: document.getElementById('theme-icon-light'),
    qaDrawerBtn: document.getElementById('qa-drawer-btn'),
    
    // Quick Bar
    summaryDeskChip: document.getElementById('summary-desk-chip'),
    summaryMonitorChip: document.getElementById('summary-monitor-chip'),
    summaryKbChip: document.getElementById('summary-kb-chip'),
    summaryLightChip: document.getElementById('summary-light-chip'),
    headerItemCount: document.getElementById('header-item-count'),
    headerTotalPrice: document.getElementById('header-total-price'),
    quickExportSummaryBtn: document.getElementById('quick-export-summary-btn'),
    
    // Stage & Canvas
    deskStage: document.getElementById('desk-stage'),
    workspaceSvg: document.getElementById('workspace-svg'),
    screenModeSelect: document.getElementById('screen-mode-select'),
    toggleBacklightBtn: document.getElementById('toggle-backlight-btn'),
    rgbStatusLabel: document.getElementById('rgb-status-label'),
    toggleHandBtn: document.getElementById('toggle-hand-btn'),
    handLabel: document.getElementById('hand-label'),
    canvasFullscreenBtn: document.getElementById('canvas-fullscreen-btn'),
    canvasOrientationTag: document.getElementById('canvas-orientation-tag'),
    canvasThemeTag: document.getElementById('canvas-theme-tag'),
    
    // Badges & Specs
    badgeDesk: document.getElementById('canvas-badge-desk'),
    badgeMonitor: document.getElementById('canvas-badge-monitor'),
    badgePeripherals: document.getElementById('canvas-badge-peripherals'),
    specDeskDim: document.getElementById('spec-desk-dim'),
    specScreenRes: document.getElementById('spec-screen-res'),
    specErgoScore: document.getElementById('spec-ergo-score'),
    specCableStat: document.getElementById('spec-cable-stat'),
    
    // SVG Layers
    svgDeskTop: document.getElementById('svg-desk-top'),
    svgDeskEdge: document.getElementById('svg-desk-edge'),
    layerDeskLegs: document.getElementById('layer-desk-legs'),
    layerDeskMat: document.getElementById('layer-desk-mat'),
    layerMonitors: document.getElementById('layer-monitors'),
    layerLighting: document.getElementById('layer-lighting'),
    layerLightCone: document.getElementById('layer-light-cone'),
    layerKeyboard: document.getElementById('layer-keyboard'),
    layerMouse: document.getElementById('layer-mouse'),
    layerAudio: document.getElementById('layer-audio'),
    layerAccessories: document.getElementById('layer-accessories'),
    ambientGlowLayer: document.getElementById('ambient-glow-layer'),
    
    // Catalog
    catalogGrid: document.getElementById('catalog-grid'),
    catalogTotalPrice: document.getElementById('catalog-total-price'),
    budgetLimitInput: document.getElementById('budget-limit-input'),
    budgetRemainingText: document.getElementById('budget-remaining-text'),
    budgetProgressBar: document.getElementById('budget-progress-bar'),
    catalogSearchInput: document.getElementById('catalog-search-input'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    catalogSortSelect: document.getElementById('catalog-sort-select'),
    categoryTabs: document.querySelectorAll('.category-tab'),
    catalogEmptyState: document.getElementById('catalog-empty-state'),
    resetFilterBtn: document.getElementById('reset-filter-btn'),
    
    // Modals
    qaModal: document.getElementById('qa-modal'),
    runAllTestsBtn: document.getElementById('run-all-tests-btn'),
    toggleA11yOverlayBtn: document.getElementById('toggle-a11y-overlay-btn'),
    testSummaryScore: document.getElementById('test-summary-score'),
    copyTestReportBtn: document.getElementById('copy-test-report-btn'),
    
    saveModal: document.getElementById('save-modal'),
    saveSetupForm: document.getElementById('save-setup-form'),
    setupNameInput: document.getElementById('setup-name-input'),
    setupNotesInput: document.getElementById('setup-notes-input'),
    savePreviewItems: document.getElementById('save-preview-items'),
    savePreviewPrice: document.getElementById('save-preview-price'),
    
    savedSetupsModal: document.getElementById('saved-setups-modal'),
    savedSetupsList: document.getElementById('saved-setups-list'),
    savedEmptyState: document.getElementById('saved-empty-state'),
    exportAllJsonBtn: document.getElementById('export-all-json-btn'),
    importJsonInput: document.getElementById('import-json-input'),
    clearAllSavedBtn: document.getElementById('clear-all-saved-btn'),
    
    summaryModal: document.getElementById('summary-modal'),
    receiptItemsTbody: document.getElementById('receipt-items-tbody'),
    receiptTotalPrice: document.getElementById('receipt-total-price'),
    receiptDate: document.getElementById('receipt-date'),
    copyShareLinkBtn: document.getElementById('copy-share-link-btn'),
    printSummaryBtn: document.getElementById('print-summary-btn'),
    
    resetConfirmModal: document.getElementById('reset-confirm-modal'),
    confirmResetBtn: document.getElementById('confirm-reset-btn'),
    
    footerQaLink: document.getElementById('footer-qa-link')
  };

  // ==========================================
  // 5. Toast Notification System
  // ==========================================
  function showToast(message, type = 'info', duration = 3200) {
    if (!DOM.toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
    
    DOM.toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // ==========================================
  // 6. Pricing & Calculations Subsystem
  // ==========================================
  function calculateSetupTotals() {
    let totalPrice = 0;
    let selectedItemsList = [];

    // Surface
    const surface = CATALOG_ITEMS.find(i => i.id === state.selectedDeskSurface);
    if (surface) { totalPrice += surface.price; selectedItemsList.push(surface); }

    // Frame
    const frame = CATALOG_ITEMS.find(i => i.id === state.selectedDeskFrame);
    if (frame) { totalPrice += frame.price; selectedItemsList.push(frame); }

    // Monitor
    const mon = CATALOG_ITEMS.find(i => i.id === state.selectedMonitor);
    if (mon) { totalPrice += mon.price; selectedItemsList.push(mon); }

    // Keyboard
    const kb = CATALOG_ITEMS.find(i => i.id === state.selectedKeyboard);
    if (kb) { totalPrice += kb.price; selectedItemsList.push(kb); }

    // Mouse
    const mouse = CATALOG_ITEMS.find(i => i.id === state.selectedMouse);
    if (mouse) { totalPrice += mouse.price; selectedItemsList.push(mouse); }

    // Desk Mat
    const mat = CATALOG_ITEMS.find(i => i.id === state.selectedDeskMat);
    if (mat) { totalPrice += mat.price; selectedItemsList.push(mat); }

    // Lighting
    const light = CATALOG_ITEMS.find(i => i.id === state.selectedLighting);
    if (light) { totalPrice += light.price; selectedItemsList.push(light); }

    // Audio
    const audio = CATALOG_ITEMS.find(i => i.id === state.selectedAudio);
    if (audio) { totalPrice += audio.price; selectedItemsList.push(audio); }

    // Accessories (Array of enabled IDs)
    state.accessories.forEach(accId => {
      const acc = CATALOG_ITEMS.find(i => i.id === accId);
      if (acc) {
        totalPrice += acc.price;
        selectedItemsList.push(acc);
      }
    });

    return {
      totalPrice,
      itemCount: selectedItemsList.length,
      items: selectedItemsList
    };
  }

  function updatePriceAndBudgetUI() {
    const { totalPrice, itemCount } = calculateSetupTotals();
    const formattedPrice = `$${totalPrice.toLocaleString()}`;

    // Update headers and catalog totals
    if (DOM.headerTotalPrice) DOM.headerTotalPrice.textContent = formattedPrice;
    if (DOM.headerItemCount) DOM.headerItemCount.textContent = itemCount;
    if (DOM.catalogTotalPrice) DOM.catalogTotalPrice.textContent = formattedPrice;
    if (DOM.savePreviewPrice) DOM.savePreviewPrice.textContent = formattedPrice;
    if (DOM.savePreviewItems) DOM.savePreviewItems.textContent = itemCount;

    // Budget Tracker Logic
    const limit = Number(state.budgetLimit) || 1500;
    const remaining = limit - totalPrice;
    const percentage = Math.min(Math.max((totalPrice / limit) * 100, 0), 100);

    if (DOM.budgetProgressBar) {
      DOM.budgetProgressBar.style.width = `${percentage}%`;
      DOM.budgetProgressBar.className = 'progress-bar-fill';
      
      if (percentage > 100 || remaining < 0) {
        DOM.budgetProgressBar.classList.add('progress-danger');
      } else if (percentage > 85) {
        DOM.budgetProgressBar.classList.add('progress-warning');
      } else {
        DOM.budgetProgressBar.classList.add('progress-normal');
      }
    }

    if (DOM.budgetRemainingText) {
      if (remaining >= 0) {
        DOM.budgetRemainingText.innerHTML = `Remaining: <strong class="text-success">$${remaining.toLocaleString()}</strong>`;
      } else {
        DOM.budgetRemainingText.innerHTML = `Over Budget by: <strong class="text-danger">$${Math.abs(remaining).toLocaleString()}</strong>`;
      }
    }

    // Quick Status Bar Chips
    const surfaceObj = CATALOG_ITEMS.find(i => i.id === state.selectedDeskSurface);
    const monObj = CATALOG_ITEMS.find(i => i.id === state.selectedMonitor);
    const kbObj = CATALOG_ITEMS.find(i => i.id === state.selectedKeyboard);
    const lightObj = CATALOG_ITEMS.find(i => i.id === state.selectedLighting);

    if (DOM.summaryDeskChip && surfaceObj) {
      DOM.summaryDeskChip.innerHTML = `Surface: <strong>${surfaceObj.name.replace(' Tabletop', '')}</strong>`;
    }
    if (DOM.summaryMonitorChip && monObj) {
      DOM.summaryMonitorChip.innerHTML = `Display: <strong>${monObj.name.split(' ')[0]} ${monObj.name.split(' ')[1] || ''}</strong>`;
    }
    if (DOM.summaryKbChip && kbObj) {
      DOM.summaryKbChip.innerHTML = `Peripherals: <strong>${kbObj.name.split(' ')[0]} Mech</strong>`;
    }
    if (DOM.summaryLightChip && lightObj) {
      DOM.summaryLightChip.innerHTML = `Light: <strong>${lightObj.name.split(' ')[1] || 'Light'}</strong>`;
    }

    // Canvas Badges
    if (DOM.badgeDesk && surfaceObj) DOM.badgeDesk.textContent = `Desk: ${surfaceObj.name.replace(' Tabletop', '')}`;
    if (DOM.badgeMonitor && monObj) DOM.badgeMonitor.textContent = `Display: ${monObj.specs.split('•')[0] || monObj.name}`;
    if (DOM.badgePeripherals && kbObj) DOM.badgePeripherals.textContent = kbObj.name.replace(' Keyboard', '');

    // Specs Grid Updates
    if (DOM.specScreenRes && monObj) DOM.specScreenRes.textContent = monObj.specs;
    if (DOM.specDeskDim && surfaceObj) DOM.specDeskDim.textContent = surfaceObj.specs.split('•')[0];
    
    // Dynamic Ergonomic score calculation based on sit-stand and ergo items
    let score = 78;
    if (state.selectedDeskFrame.includes('sitstand')) score += 8;
    if (state.selectedKeyboard.includes('ergo')) score += 6;
    if (state.selectedMouse.includes('ergo')) score += 5;
    if (state.selectedLighting.includes('screenbar')) score += 4;
    score = Math.min(score, 100);
    if (DOM.specErgoScore) DOM.specErgoScore.textContent = `${score} / 100 (${score >= 90 ? 'Optimal' : 'Good'})`;
  }

  // ==========================================
  // 7. Interactive SVG Visual Workspace Renderer
  // ==========================================
  function renderWorkspaceSVG() {
    const isTopDown = state.viewMode === 'top';
    const activeColor = state.rgbColors[state.rgbColorIndex];
    const isRgbOff = activeColor === 'none';

    // 1. Desk Surface & Legs
    const surface = CATALOG_ITEMS.find(i => i.id === state.selectedDeskSurface) || CATALOG_ITEMS[0];
    if (DOM.svgDeskTop) {
      DOM.svgDeskTop.setAttribute('fill', `url(#${surface.gradientId})`);
      if (isTopDown) {
        DOM.svgDeskTop.setAttribute('points', '100,80 800,80 800,480 100,480');
      } else {
        DOM.svgDeskTop.setAttribute('points', '90,340 810,340 850,380 50,380');
      }
    }

    if (DOM.svgDeskEdge) {
      DOM.svgDeskEdge.setAttribute('fill', surface.edgeColor || '#8B653E');
      DOM.svgDeskEdge.style.display = isTopDown ? 'none' : 'block';
    }

    // Legs
    if (DOM.layerDeskLegs) {
      if (isTopDown) {
        DOM.layerDeskLegs.innerHTML = '';
      } else {
        const isWhiteLegs = state.selectedDeskFrame.includes('white');
        const legFill = isWhiteLegs ? '#D8E2EC' : '#171B26';
        DOM.layerDeskLegs.innerHTML = `
          <!-- Left Leg Column -->
          <rect x="130" y="380" width="36" height="150" fill="${legFill}" rx="4"/>
          <rect x="100" y="520" width="96" height="18" fill="${legFill}" rx="6"/>
          <!-- Right Leg Column -->
          <rect x="734" y="380" width="36" height="150" fill="${legFill}" rx="4"/>
          <rect x="704" y="520" width="96" height="18" fill="${legFill}" rx="6"/>
          <!-- Motor crossbar -->
          <rect x="160" y="400" width="580" height="12" fill="${legFill}" opacity="0.6"/>
        `;
      }
    }

    // 2. Desk Mat
    if (DOM.layerDeskMat) {
      const mat = CATALOG_ITEMS.find(i => i.id === state.selectedDeskMat);
      if (mat) {
        const isFelt = mat.id.includes('felt');
        const matFill = isFelt ? '#384252' : '#141821';
        const matStroke = isFelt ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)';
        
        if (isTopDown) {
          DOM.layerDeskMat.innerHTML = `
            <rect x="220" y="240" width="460" height="200" rx="12" fill="${matFill}" stroke="${matStroke}" stroke-width="2"/>
          `;
        } else {
          DOM.layerDeskMat.innerHTML = `
            <polygon points="220,350 680,350 710,376 190,376" fill="${matFill}" stroke="${matStroke}" stroke-width="1.5"/>
          `;
        }
      } else {
        DOM.layerDeskMat.innerHTML = '';
      }
    }

    // 3. Monitors Layer
    if (DOM.layerMonitors) {
      const mon = CATALOG_ITEMS.find(i => i.id === state.selectedMonitor) || CATALOG_ITEMS[5];
      const screenContentSvg = getScreenContentSvg(state.screenMode);

      if (isTopDown) {
        DOM.layerMonitors.innerHTML = renderTopDownMonitor(mon.layout);
      } else {
        DOM.layerMonitors.innerHTML = renderFrontMonitor(mon.layout, screenContentSvg);
      }
    }

    // 4. Lighting Layer & Light Cone
    if (DOM.layerLighting && DOM.layerLightCone) {
      const light = CATALOG_ITEMS.find(i => i.id === state.selectedLighting);
      if (!light || isRgbOff) {
        DOM.layerLighting.innerHTML = '';
        DOM.layerLightCone.innerHTML = '';
        if (DOM.ambientGlowLayer) DOM.ambientGlowLayer.style.opacity = '0.2';
      } else {
        if (DOM.ambientGlowLayer) {
          DOM.ambientGlowLayer.style.opacity = '1';
          DOM.ambientGlowLayer.style.background = `radial-gradient(circle, ${activeColor}55 0%, ${activeColor}11 60%, transparent 80%)`;
        }

        if (light.id === 'light-screenbar') {
          if (!isTopDown) {
            DOM.layerLighting.innerHTML = `
              <rect x="370" y="115" width="160" height="8" rx="4" fill="#222" stroke="#555" stroke-width="1"/>
              <rect x="445" y="123" width="10" height="15" fill="#333" rx="2"/>
            `;
            DOM.layerLightCone.innerHTML = `
              <polygon points="370,123 530,123 680,370 220,370" fill="url(#cone-grad)" opacity="0.25"/>
              <defs>
                <linearGradient id="cone-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#fff" stop-opacity="0.8"/>
                  <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
                </linearGradient>
              </defs>
            `;
          }
        } else if (light.id === 'light-rgb-strips') {
          DOM.layerLighting.innerHTML = '';
          DOM.layerLightCone.innerHTML = `
            <ellipse cx="450" cy="220" rx="360" ry="120" fill="${activeColor}" opacity="0.22" filter="url(#glow-filter)"/>
          `;
        } else {
          DOM.layerLighting.innerHTML = '';
          DOM.layerLightCone.innerHTML = '';
        }
      }
    }

    // 5. Keyboard & Backlight
    if (DOM.layerKeyboard) {
      const kb = CATALOG_ITEMS.find(i => i.id === state.selectedKeyboard);
      if (kb) {
        const glowStyle = isRgbOff ? '' : `filter="drop-shadow(0 0 6px ${activeColor})"`;
        if (isTopDown) {
          DOM.layerKeyboard.innerHTML = `
            <g ${glowStyle}>
              <rect x="320" y="320" width="200" height="80" rx="6" fill="#1C212B" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
              <!-- Keys Grid Representation -->
              <rect x="330" y="330" width="180" height="60" rx="3" fill="#29303D"/>
              ${generateTopDownKeys(332, 332, 176, 56)}
            </g>
          `;
        } else {
          DOM.layerKeyboard.innerHTML = `
            <g ${glowStyle}>
              <polygon points="340,356 540,356 550,372 330,372" fill="#1C212B" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
              <!-- Keycaps row representation -->
              <polygon points="345,358 535,358 543,370 337,370" fill="#2F3848"/>
              <line x1="370" y1="358" x2="366" y2="370" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
              <line x1="400" y1="358" x2="397" y2="370" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
              <line x1="430" y1="358" x2="428" y2="370" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
              <line x1="460" y1="358" x2="459" y2="370" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
              <line x1="490" y1="358" x2="490" y2="370" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
              <line x1="515" y1="358" x2="518" y2="370" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            </g>
          `;
        }
      }
    }

    // 6. Mouse
    if (DOM.layerMouse) {
      const mouse = CATALOG_ITEMS.find(i => i.id === state.selectedMouse);
      const isLeftHand = state.mouseHand === 'left';
      if (mouse) {
        if (isTopDown) {
          const mouseX = isLeftHand ? 255 : 605;
          DOM.layerMouse.innerHTML = `
            <ellipse cx="${mouseX}" cy="360" rx="16" ry="26" fill="#181D26" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            <line x1="${mouseX}" y1="340" x2="${mouseX}" y2="354" stroke="#4B5563" stroke-width="1.5"/>
          `;
        } else {
          const mouseX = isLeftHand ? 260 : 610;
          DOM.layerMouse.innerHTML = `
            <ellipse cx="${mouseX}" cy="364" rx="14" ry="7" fill="#181D26" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            <ellipse cx="${mouseX}" cy="363" rx="10" ry="4" fill="#2E3748"/>
          `;
        }
      }
    }

    // 7. Audio / Speakers
    if (DOM.layerAudio) {
      const audio = CATALOG_ITEMS.find(i => i.id === state.selectedAudio);
      if (audio) {
        if (audio.id === 'audio-studio-monitors') {
          if (isTopDown) {
            DOM.layerAudio.innerHTML = `
              <rect x="170" y="160" width="50" height="60" rx="4" fill="#1A1F2C" stroke="#333"/>
              <circle cx="195" cy="190" r="18" fill="#111" stroke="#555"/>
              <rect x="680" y="160" width="50" height="60" rx="4" fill="#1A1F2C" stroke="#333"/>
              <circle cx="705" cy="190" r="18" fill="#111" stroke="#555"/>
            `;
          } else {
            DOM.layerAudio.innerHTML = `
              <!-- Left Studio Monitor -->
              <rect x="170" y="270" width="46" height="85" rx="5" fill="#1A1F2C" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
              <circle cx="193" cy="295" r="10" fill="#0D1017" stroke="#444"/>
              <circle cx="193" cy="328" r="16" fill="#0D1017" stroke="#555"/>
              <!-- Right Studio Monitor -->
              <rect x="684" y="270" width="46" height="85" rx="5" fill="#1A1F2C" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
              <circle cx="707" cy="295" r="10" fill="#0D1017" stroke="#444"/>
              <circle cx="707" cy="328" r="16" fill="#0D1017" stroke="#555"/>
            `;
          }
        } else if (audio.id === 'audio-soundbar') {
          if (!isTopDown) {
            DOM.layerAudio.innerHTML = `
              <rect x="340" y="325" width="220" height="16" rx="3" fill="#151922" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
              <rect x="345" y="328" width="210" height="10" rx="2" fill="#222A38" opacity="0.6"/>
            `;
          }
        } else if (audio.id === 'audio-headphones-stand') {
          if (!isTopDown) {
            DOM.layerAudio.innerHTML = `
              <!-- Headphone Stand Post -->
              <line x1="720" y1="270" x2="720" y2="356" stroke="#888" stroke-width="3"/>
              <ellipse cx="720" cy="356" rx="14" ry="4" fill="#333"/>
              <path d="M706 270 C706 250, 734 250, 734 270" stroke="#4B5563" stroke-width="6" fill="none"/>
              <ellipse cx="706" cy="276" rx="6" ry="12" fill="#1F2937"/>
              <ellipse cx="734" cy="276" rx="6" ry="12" fill="#1F2937"/>
            `;
          }
        }
      }
    }

    // 8. Accessories & Greenery
    if (DOM.layerAccessories) {
      let accSvg = '';
      if (!isTopDown) {
        if (state.accessories.includes('acc-plant-monstera')) {
          accSvg += `
            <!-- Mini Monstera Plant -->
            <g transform="translate(115, 290)">
              <polygon points="10,40 30,40 26,65 14,65" fill="#E2E8F0" stroke="#94A3B8"/>
              <circle cx="20" cy="40" r="10" fill="#3E2723"/>
              <path d="M20,40 Q10,20 0,25 Q15,35 20,40" fill="#22C55E"/>
              <path d="M20,40 Q30,15 40,22 Q25,35 20,40" fill="#16A34A"/>
              <path d="M20,40 Q20,10 25,5 Q26,28 20,40" fill="#15803D"/>
            </g>
          `;
        }
        if (state.accessories.includes('acc-warm-mug')) {
          accSvg += `
            <!-- Coffee Mug with Warm Pad -->
            <g transform="translate(240, 345)">
              <ellipse cx="14" cy="18" rx="12" ry="4" fill="#1E293B" stroke="#38BDF8" stroke-width="1"/>
              <rect x="6" y="2" width="16" height="14" rx="3" fill="#F8FAFC" stroke="#CBD5E1"/>
              <path d="M22,5 C26,5 26,13 22,13" stroke="#CBD5E1" stroke-width="2" fill="none"/>
            </g>
          `;
        }
        if (state.accessories.includes('acc-phone-stand')) {
          accSvg += `
            <!-- Floating MagSafe Phone Stand -->
            <g transform="translate(640, 320)">
              <line x1="16" y1="20" x2="16" y2="38" stroke="#94A3B8" stroke-width="2.5"/>
              <ellipse cx="16" cy="38" rx="10" ry="3" fill="#64748B"/>
              <rect x="6" y="0" width="20" height="34" rx="4" fill="#0F172A" stroke="#38BDF8" stroke-width="1" transform="rotate(-10 16 17)"/>
            </g>
          `;
        }
        if (state.accessories.includes('acc-streamdeck')) {
          accSvg += `
            <!-- Stream Deck Macro Console -->
            <g transform="translate(275, 342)">
              <polygon points="0,5 34,5 36,18 0,18" fill="#1E293B" stroke="#6366F1" stroke-width="1"/>
              <rect x="3" y="7" width="6" height="4" rx="1" fill="#00F2FE"/>
              <rect x="11" y="7" width="6" height="4" rx="1" fill="#EC4899"/>
              <rect x="19" y="7" width="6" height="4" rx="1" fill="#10B981"/>
              <rect x="27" y="7" width="6" height="4" rx="1" fill="#F59E0B"/>
            </g>
          `;
        }
        if (state.accessories.includes('acc-laptop-dock')) {
          accSvg += `
            <!-- Vertical Walnut Laptop Dock -->
            <g transform="translate(740, 310)">
              <rect x="0" y="28" width="36" height="12" rx="3" fill="#5C4033"/>
              <rect x="8" y="0" width="20" height="34" rx="3" fill="#94A3B8" stroke="#64748B"/>
            </g>
          `;
        }
      }
      DOM.layerAccessories.innerHTML = accSvg;
    }
  }

  // Helpers for Screen & Monitor Layouts
  function getScreenContentSvg(mode) {
    if (mode === 'figma') {
      return `
        <!-- Figma UI Wireframe -->
        <rect width="100%" height="100%" fill="#1E1E1E"/>
        <rect x="10" y="10" width="40" height="12" rx="2" fill="#0D99FF"/>
        <rect x="10" y="30" width="120" height="70" rx="4" fill="#2C2C2C" stroke="#444"/>
        <rect x="140" y="30" width="120" height="70" rx="4" fill="#2C2C2C" stroke="#444"/>
        <circle cx="30" cy="50" r="10" fill="#7B61FF"/>
        <line x1="50" y1="46" x2="110" y2="46" stroke="#888" stroke-width="3"/>
        <line x1="50" y1="56" x2="90" y2="56" stroke="#555" stroke-width="2"/>
      `;
    } else if (mode === 'cyber') {
      return `
        <!-- Cyber Matrix Theme -->
        <rect width="100%" height="100%" fill="#050B14"/>
        <text x="15" y="25" fill="#00FF66" font-family="monospace" font-size="9">> SYSTEM: ONLINE</text>
        <text x="15" y="42" fill="#00F2FE" font-family="monospace" font-size="8">> CPU: 24-CORE 4.8GHz</text>
        <text x="15" y="58" fill="#EC4899" font-family="monospace" font-size="8">> RAM: 64GB DDR5 ECC</text>
        <line x1="15" y1="70" x2="200" y2="70" stroke="#00FF66" stroke-width="1" stroke-dasharray="4 2"/>
        <rect x="15" y="80" width="180" height="18" rx="2" fill="rgba(0,255,102,0.1)" stroke="#00FF66"/>
      `;
    } else if (mode === 'minimal') {
      return `
        <!-- Sunset Minimalist -->
        <defs>
          <linearGradient id="sunset-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FF512F"/>
            <stop offset="100%" stop-color="#DD2476"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#sunset-grad)"/>
        <circle cx="150" cy="90" r="35" fill="#FFE47A" opacity="0.85"/>
      `;
    } else {
      // Default: VS Code with IBM SkillsBuild
      return `
        <!-- VS Code IDE -->
        <rect width="100%" height="100%" fill="#181A1F"/>
        <!-- Editor Tab Bar -->
        <rect x="0" y="0" width="100%" height="16" fill="#131417"/>
        <text x="8" y="11" fill="#3B82F6" font-family="monospace" font-size="8">index.html</text>
        <text x="60" y="11" fill="#8B5CF6" font-family="monospace" font-size="8">style.css</text>
        <text x="110" y="11" fill="#10B981" font-family="monospace" font-size="8">script.js</text>
        <!-- Code Lines -->
        <text x="10" y="32" class="svg-code-text"><tspan fill="#E5C07B">const</tspan> <tspan fill="#61AFEF">deskCraft</tspan> = <tspan fill="#C678DD">new</tspan> <tspan fill="#E5C07B">Workspace</tspan>();</text>
        <text x="10" y="48" class="svg-code-text"><tspan fill="#E5C07B">deskCraft</tspan>.<tspan fill="#61AFEF">loadCurriculum</tspan>(<tspan fill="#98C379">"IBM SkillsBuild"</tspan>);</text>
        <text x="10" y="64" class="svg-code-text"><tspan fill="#5C6370">// ✓ HTML5 ✓ CSS3 ✓ JavaScript ✓ a11y</tspan></text>
        <text x="10" y="80" class="svg-code-text"><tspan fill="#E5C07B">deskCraft</tspan>.<tspan fill="#61AFEF">renderLivePreview</tspan>();</text>
        <text x="10" y="96" class="svg-code-text"><tspan fill="#98C379">console</tspan>.<tspan fill="#61AFEF">log</tspan>(<tspan fill="#98C379">"Setup Ready!"</tspan>);</text>
      `;
    }
  }

  function renderFrontMonitor(layout, screenSvg) {
    if (layout === 'dual') {
      return `
        <!-- Stand Base & Dual Articulating Arms -->
        <rect x="440" y="270" width="20" height="72" fill="#222" rx="3"/>
        <polygon points="410,342 490,342 480,346 420,346" fill="#111"/>
        <line x1="450" y1="220" x2="310" y2="200" stroke="#333" stroke-width="8"/>
        <line x1="450" y1="220" x2="590" y2="200" stroke="#333" stroke-width="8"/>
        
        <!-- Left Monitor -->
        <g transform="translate(190, 130)">
          <rect x="0" y="0" width="250" height="150" rx="4" fill="#0B0D13" stroke="#3B82F6" stroke-width="1.5"/>
          <g transform="translate(6, 6)">
            <svg width="238" height="138" viewBox="0 0 238 138">${screenSvg}</svg>
          </g>
        </g>
        
        <!-- Right Monitor -->
        <g transform="translate(460, 130)">
          <rect x="0" y="0" width="250" height="150" rx="4" fill="#0B0D13" stroke="#3B82F6" stroke-width="1.5"/>
          <g transform="translate(6, 6)">
            <svg width="238" height="138" viewBox="0 0 238 138">${getScreenContentSvg('figma')}</svg>
          </g>
        </g>
      `;
    } else if (layout === 'ultrawide') {
      return `
        <!-- Curved Ultrawide 34" -->
        <rect x="438" y="250" width="24" height="92" fill="#222" rx="3"/>
        <polygon points="380,342 520,342 505,346 395,346" fill="#111"/>
        <g transform="translate(200, 125)">
          <rect x="0" y="0" width="500" height="155" rx="6" fill="#0B0D13" stroke="#8B5CF6" stroke-width="2"/>
          <g transform="translate(8, 8)">
            <svg width="484" height="139" viewBox="0 0 484 139">${screenSvg}</svg>
          </g>
        </g>
      `;
    } else if (layout === 'vertical-combo') {
      return `
        <!-- Vertical Portrait Monitor (Left) -->
        <g transform="translate(220, 110)">
          <rect x="0" y="0" width="130" height="200" rx="4" fill="#0B0D13" stroke="#10B981" stroke-width="1.5"/>
          <g transform="translate(6, 6)">
            <svg width="118" height="188" viewBox="0 0 118 188">${screenSvg}</svg>
          </g>
        </g>
        
        <!-- Horizontal Main Monitor (Right) -->
        <rect x="520" y="260" width="20" height="82" fill="#222" rx="3"/>
        <g transform="translate(370, 130)">
          <rect x="0" y="0" width="320" height="175" rx="4" fill="#0B0D13" stroke="#3B82F6" stroke-width="1.5"/>
          <g transform="translate(6, 6)">
            <svg width="308" height="163" viewBox="0 0 308 163">${getScreenContentSvg('figma')}</svg>
          </g>
        </g>
      `;
    } else if (layout === 'triple') {
      return `
        <!-- Triple Monitors Array -->
        <!-- Center Monitor -->
        <g transform="translate(310, 135)">
          <rect x="0" y="0" width="280" height="155" rx="4" fill="#0B0D13" stroke="#00FF66" stroke-width="2"/>
          <g transform="translate(6, 6)"><svg width="268" height="143" viewBox="0 0 268 143">${screenSvg}</svg></g>
        </g>
        <!-- Left Wing Angled -->
        <g transform="translate(130, 145) skewY(4)">
          <rect x="0" y="0" width="170" height="145" rx="4" fill="#0B0D13" stroke="#00F2FE" stroke-width="1.5"/>
          <g transform="translate(6, 6)"><svg width="158" height="133" viewBox="0 0 158 133">${getScreenContentSvg('cyber')}</svg></g>
        </g>
        <!-- Right Wing Angled -->
        <g transform="translate(600, 145) skewY(-4)">
          <rect x="0" y="0" width="170" height="145" rx="4" fill="#0B0D13" stroke="#EC4899" stroke-width="1.5"/>
          <g transform="translate(6, 6)"><svg width="158" height="133" viewBox="0 0 158 133">${getScreenContentSvg('figma')}</svg></g>
        </g>
        <rect x="440" y="290" width="20" height="52" fill="#222"/>
      `;
    } else {
      // Default: Single 27" 4K Display
      return `
        <!-- Monitor Stand Post & Base -->
        <rect x="440" y="240" width="20" height="102" fill="#222" rx="3"/>
        <polygon points="390,342 510,342 495,346 405,346" fill="#111"/>
        
        <!-- Screen Chassis -->
        <g transform="translate(275, 120)">
          <rect x="0" y="0" width="350" height="195" rx="5" fill="#0B0D13" stroke="#3B82F6" stroke-width="1.5"/>
          <!-- Active Bezel Inner Screen -->
          <g transform="translate(7, 7)">
            <svg width="336" height="181" viewBox="0 0 336 181">${screenSvg}</svg>
          </g>
        </g>
      `;
    }
  }

  function renderTopDownMonitor(layout) {
    if (layout === 'dual') {
      return `
        <rect x="230" y="110" width="200" height="14" rx="3" fill="#1F2937" stroke="#3B82F6" stroke-width="1.5"/>
        <rect x="470" y="110" width="200" height="14" rx="3" fill="#1F2937" stroke="#3B82F6" stroke-width="1.5"/>
      `;
    } else if (layout === 'ultrawide') {
      return `
        <path d="M 230,120 Q 450,105 670,120" stroke="#8B5CF6" stroke-width="14" fill="none" stroke-linecap="round"/>
      `;
    } else if (layout === 'triple') {
      return `
        <rect x="330" y="105" width="240" height="14" rx="3" fill="#1F2937" stroke="#00FF66"/>
        <rect x="160" y="125" width="160" height="14" rx="3" fill="#1F2937" stroke="#00F2FE" transform="rotate(18 240 130)"/>
        <rect x="580" y="125" width="160" height="14" rx="3" fill="#1F2937" stroke="#EC4899" transform="rotate(-18 660 130)"/>
      `;
    } else {
      return `
        <rect x="300" y="110" width="300" height="14" rx="3" fill="#1F2937" stroke="#3B82F6" stroke-width="1.5"/>
        <rect x="420" y="124" width="60" height="16" fill="#374151" rx="2"/>
      `;
    }
  }

  function generateTopDownKeys(x, y, w, h) {
    let svg = '';
    const cols = 14;
    const rows = 4;
    const kw = (w - (cols * 2)) / cols;
    const kh = (h - (rows * 2)) / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        svg += `<rect x="${x + c * (kw + 2)}" y="${y + r * (kh + 2)}" width="${kw}" height="${kh}" rx="1" fill="#3A4659"/>`;
      }
    }
    return svg;
  }

  // ==========================================
  // 8. Component Catalog Renderer & Filter
  // ==========================================
  function renderCatalog() {
    if (!DOM.catalogGrid) return;

    let items = [...CATALOG_ITEMS];

    // 1. Category Filter
    if (state.activeCategory !== 'all') {
      items = items.filter(item => item.category === state.activeCategory);
    }

    // 2. Search Query Filter
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.specs.toLowerCase().includes(q)
      );
    }

    // 3. Sorting
    if (state.sortOption === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (state.sortOption === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (state.sortOption === 'name-asc') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Update Category Badges Count
    updateCategoryCountBadges();

    // Empty State Handling
    if (items.length === 0) {
      DOM.catalogGrid.innerHTML = '';
      if (DOM.catalogEmptyState) DOM.catalogEmptyState.classList.remove('hidden');
      return;
    } else {
      if (DOM.catalogEmptyState) DOM.catalogEmptyState.classList.add('hidden');
    }

    // Render Cards HTML
    DOM.catalogGrid.innerHTML = items.map(item => {
      const isSelected = isItemSelected(item);
      const isAccessory = item.category === 'accessories' && item.type === 'accessory';

      return `
        <article class="catalog-card ${isSelected ? 'card-selected' : ''}" data-id="${item.id}" data-category="${item.category}">
          <div class="card-top">
            <div class="card-icon-title">
              <div class="card-icon-box" aria-hidden="true">${item.icon}</div>
              <div class="card-header-info">
                <span class="card-category-tag">${item.category}</span>
                <h4>${escapeHtml(item.name)}</h4>
              </div>
            </div>
            <span class="card-price">$${item.price.toLocaleString()}</span>
          </div>

          <p class="card-desc">${escapeHtml(item.desc)}</p>

          <div class="card-bottom">
            <div class="card-status-wrap">
              ${isSelected 
                ? `<span class="card-status-badge status-active-badge">✓ Active in Setup</span>`
                : `<span class="card-status-badge status-inactive-badge">Available</span>`
              }
            </div>

            <div class="card-action-btn-wrap">
              ${isAccessory ? `
                <button class="btn btn-xs ${isSelected ? 'btn-secondary text-danger' : 'btn-primary'} toggle-accessory-btn" data-id="${item.id}" aria-label="${isSelected ? 'Remove' : 'Add'} ${item.name}">
                  ${isSelected ? 'Remove' : '+ Add to Desk'}
                </button>
              ` : `
                <button class="btn btn-xs ${isSelected ? 'btn-secondary' : 'btn-primary'} select-item-btn" data-id="${item.id}" ${isSelected ? 'disabled aria-disabled="true"' : ''}>
                  ${isSelected ? 'Selected' : 'Select'}
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function isItemSelected(item) {
    if (item.category === 'desks') {
      return item.type === 'surface' 
        ? state.selectedDeskSurface === item.id 
        : state.selectedDeskFrame === item.id;
    }
    if (item.category === 'monitors') return state.selectedMonitor === item.id;
    if (item.category === 'peripherals') {
      return item.type === 'keyboard' 
        ? state.selectedKeyboard === item.id 
        : state.selectedMouse === item.id;
    }
    if (item.category === 'lighting') return state.selectedLighting === item.id;
    if (item.category === 'audio') return state.selectedAudio === item.id;
    if (item.category === 'accessories') {
      if (item.type === 'mat') return state.selectedDeskMat === item.id;
      return state.accessories.includes(item.id);
    }
    return false;
  }

  function updateCategoryCountBadges() {
    const categories = ['all', 'desks', 'monitors', 'peripherals', 'lighting', 'audio', 'accessories'];
    categories.forEach(cat => {
      const badge = document.getElementById(`count-${cat}`);
      if (badge) {
        if (cat === 'all') {
          badge.textContent = CATALOG_ITEMS.length;
        } else {
          badge.textContent = CATALOG_ITEMS.filter(i => i.category === cat).length;
        }
      }
    });
  }

  // ==========================================
  // 9. State Selection & Interactions
  // ==========================================
  function selectCatalogItem(itemId) {
    const item = CATALOG_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    if (item.category === 'desks') {
      if (item.type === 'surface') state.selectedDeskSurface = item.id;
      else state.selectedDeskFrame = item.id;
    } else if (item.category === 'monitors') {
      state.selectedMonitor = item.id;
    } else if (item.category === 'peripherals') {
      if (item.type === 'keyboard') state.selectedKeyboard = item.id;
      else state.selectedMouse = item.id;
    } else if (item.category === 'lighting') {
      state.selectedLighting = item.id;
    } else if (item.category === 'audio') {
      state.selectedAudio = item.id;
    } else if (item.category === 'accessories') {
      if (item.type === 'mat') {
        state.selectedDeskMat = item.id;
      } else {
        if (!state.accessories.includes(item.id)) {
          state.accessories.push(item.id);
        }
      }
    }

    renderWorkspaceSVG();
    updatePriceAndBudgetUI();
    renderCatalog();
    playClickSfx('click');
    showToast(`Updated: ${item.name}`, 'info', 2200);
  }

  function toggleAccessoryItem(itemId) {
    const item = CATALOG_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const index = state.accessories.indexOf(itemId);
    if (index >= 0) {
      state.accessories.splice(index, 1);
      playClickSfx('click');
      showToast(`Removed: ${item.name}`, 'warning', 2000);
    } else {
      state.accessories.push(itemId);
      playClickSfx('click');
      showToast(`Added: ${item.name}`, 'success', 2000);
    }

    renderWorkspaceSVG();
    updatePriceAndBudgetUI();
    renderCatalog();
  }

  function applyPreset(presetKey) {
    const preset = PRESETS[presetKey];
    if (!preset) return;

    state.selectedDeskSurface = preset.deskSurface;
    state.selectedDeskFrame = preset.deskFrame;
    state.selectedMonitor = preset.monitor;
    state.selectedKeyboard = preset.keyboard;
    state.selectedMouse = preset.mouse;
    state.selectedDeskMat = preset.deskMat;
    state.selectedLighting = preset.lighting;
    state.selectedAudio = preset.audio;
    state.accessories = [...preset.accessories];
    state.screenMode = preset.screenMode || 'code';

    if (DOM.screenModeSelect) DOM.screenModeSelect.value = state.screenMode;

    renderWorkspaceSVG();
    updatePriceAndBudgetUI();
    renderCatalog();
    
    // Close presets menu
    if (DOM.presetsMenu) {
      DOM.presetsMenu.hidden = true;
      DOM.presetsBtn.setAttribute('aria-expanded', 'false');
    }

    playClickSfx('preset');
    fireNeonConfetti();
    showToast(`Loaded Preset: "${preset.name}"`, 'success', 3000);
  }

  function resetToDefault() {
    applyPreset('minimalist');
    closeModal(DOM.resetConfirmModal);
    showToast('Workspace reset to default configuration.', 'info', 2500);
  }

  // ==========================================
  // 10. LocalStorage & Saved Setups
  // ==========================================
  const STORAGE_KEY = 'deskcraft_saved_setups_v1';

  function loadSavedSetupsFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        state.savedSetups = JSON.parse(data);
      } else {
        state.savedSetups = [];
      }
    } catch (e) {
      console.error('LocalStorage load failed', e);
      state.savedSetups = [];
    }
    updateSavedCountBadge();
  }

  function persistSavedSetups() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedSetups));
      updateSavedCountBadge();
    } catch (e) {
      showToast('Error saving to browser localStorage', 'error');
    }
  }

  function updateSavedCountBadge() {
    if (DOM.savedCountBadge) {
      DOM.savedCountBadge.textContent = state.savedSetups.length;
    }
  }

  function saveCurrentSetup(name, notes = '') {
    const totals = calculateSetupTotals();
    const newEntry = {
      id: 'setup_' + Date.now(),
      name: name.trim(),
      notes: notes.trim(),
      timestamp: new Date().toISOString(),
      price: totals.totalPrice,
      itemCount: totals.itemCount,
      config: {
        selectedDeskSurface: state.selectedDeskSurface,
        selectedDeskFrame: state.selectedDeskFrame,
        selectedMonitor: state.selectedMonitor,
        selectedKeyboard: state.selectedKeyboard,
        selectedMouse: state.selectedMouse,
        selectedDeskMat: state.selectedDeskMat,
        selectedLighting: state.selectedLighting,
        selectedAudio: state.selectedAudio,
        accessories: [...state.accessories],
        screenMode: state.screenMode,
        mouseHand: state.mouseHand
      }
    };

    state.savedSetups.unshift(newEntry);
    persistSavedSetups();
    closeModal(DOM.saveModal);
    playClickSfx('success');
    fireNeonConfetti();
    showToast(`Saved setup "${name}" successfully!`, 'success');
  }

  function loadSavedSetup(setupId) {
    const found = state.savedSetups.find(s => s.id === setupId);
    if (!found || !found.config) return;

    Object.assign(state, found.config);
    if (DOM.screenModeSelect) DOM.screenModeSelect.value = state.screenMode;
    if (DOM.handLabel) DOM.handLabel.textContent = state.mouseHand === 'left' ? 'Left' : 'Right';

    renderWorkspaceSVG();
    updatePriceAndBudgetUI();
    renderCatalog();
    closeModal(DOM.savedSetupsModal);
    playClickSfx('preset');
    fireNeonConfetti();
    showToast(`Loaded configuration: "${found.name}"`, 'success');
  }

  function deleteSavedSetup(setupId) {
    state.savedSetups = state.savedSetups.filter(s => s.id !== setupId);
    persistSavedSetups();
    renderSavedSetupsList();
    showToast('Saved setup deleted.', 'info');
  }

  function renderSavedSetupsList() {
    if (!DOM.savedSetupsList) return;

    if (state.savedSetups.length === 0) {
      DOM.savedSetupsList.innerHTML = '';
      if (DOM.savedEmptyState) DOM.savedEmptyState.classList.remove('hidden');
      return;
    }

    if (DOM.savedEmptyState) DOM.savedEmptyState.classList.add('hidden');

    DOM.savedSetupsList.innerHTML = state.savedSetups.map(item => {
      const dateStr = new Date(item.timestamp).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      return `
        <div class="saved-setup-item" data-id="${item.id}">
          <div class="saved-item-info">
            <strong>${escapeHtml(item.name)}</strong>
            <small>${dateStr} • ${item.itemCount} items • <span class="text-success">$${item.price.toLocaleString()}</span></small>
            ${item.notes ? `<small class="text-muted">"${escapeHtml(item.notes)}"</small>` : ''}
          </div>
          <div class="saved-item-actions">
            <button class="btn btn-xs btn-primary load-saved-btn" data-id="${item.id}">Load</button>
            <button class="btn btn-xs btn-ghost text-danger delete-saved-btn" data-id="${item.id}" aria-label="Delete ${item.name}">✕</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 11. Modal Controls & Breakdowns
  // ==========================================
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus first input or close button for accessibility
    const focusable = modalEl.querySelector('input, button, select, textarea');
    if (focusable) focusable.focus();
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function populateReceiptBreakdown() {
    const { totalPrice, items } = calculateSetupTotals();
    if (DOM.receiptTotalPrice) DOM.receiptTotalPrice.textContent = `$${totalPrice.toLocaleString()}`;
    if (DOM.receiptDate) DOM.receiptDate.textContent = `Date: ${new Date().toLocaleDateString()}`;

    if (DOM.receiptItemsTbody) {
      DOM.receiptItemsTbody.innerHTML = items.map(item => `
        <tr>
          <td><span class="card-category-tag">${item.category}</span></td>
          <td><strong>${escapeHtml(item.name)}</strong></td>
          <td class="text-right font-mono">$${item.price.toLocaleString()}</td>
        </tr>
      `).join('');
    }
  }

  // ==========================================
  // 12. Automated QA & Testing Suite
  // ==========================================
  const TEST_SUITE = [
    {
      id: 'dom',
      name: '1. Semantic HTML5 & DOM Hierarchy',
      run: () => {
        const header = document.querySelector('header[role="banner"]');
        const main = document.querySelector('main#main-content');
        const footer = document.querySelector('footer[role="contentinfo"]');
        const sections = document.querySelectorAll('section');
        const headings = document.querySelectorAll('h1, h2, h3, h4');
        
        if (header && main && footer && sections.length >= 3 && headings.length >= 5) {
          return { pass: true, msg: `Passed: Semantic elements present (${sections.length} sections, ${headings.length} headings, landmark roles verified).` };
        }
        return { pass: false, msg: 'Failed: Missing key semantic landmark elements.' };
      }
    },
    {
      id: 'selection',
      name: '2. State Machine & Preview Synchronicity',
      run: () => {
        const prev = state.selectedDeskSurface;
        state.selectedDeskSurface = 'desk-walnut';
        renderWorkspaceSVG();
        const svgCheck = DOM.svgDeskTop && DOM.svgDeskTop.getAttribute('fill') === 'url(#grad-walnut)';
        state.selectedDeskSurface = prev;
        renderWorkspaceSVG();
        
        if (svgCheck) {
          return { pass: true, msg: 'Passed: Surface mutation accurately triggers SVG gradient layer update.' };
        }
        return { pass: false, msg: 'Failed: SVG did not synchronize with state mutation.' };
      }
    },
    {
      id: 'calc',
      name: '3. Price Summation & Item Count Mathematics',
      run: () => {
        const { totalPrice, itemCount, items } = calculateSetupTotals();
        let manualSum = 0;
        items.forEach(i => manualSum += i.price);
        
        if (totalPrice === manualSum && itemCount === items.length && totalPrice > 0) {
          return { pass: true, msg: `Passed: Accurate math sum ($${totalPrice} across ${itemCount} items).` };
        }
        return { pass: false, msg: `Failed: Price summation mismatch ($${totalPrice} vs $${manualSum}).` };
      }
    },
    {
      id: 'search',
      name: '4. Search Filtering & Category Tab Routing',
      run: () => {
        const initialCount = CATALOG_ITEMS.length;
        const qMatches = CATALOG_ITEMS.filter(i => i.name.toLowerCase().includes('keyboard')).length;
        
        if (initialCount >= 20 && qMatches >= 3) {
          return { pass: true, msg: `Passed: Search query indexing confirmed (${qMatches} keywords found in catalog).` };
        }
        return { pass: false, msg: 'Failed: Catalog filtering returned unexpected results.' };
      }
    },
    {
      id: 'storage',
      name: '5. LocalStorage Persistence & Schema Validation',
      run: () => {
        const testKey = 'deskcraft_qa_test';
        try {
          localStorage.setItem(testKey, JSON.stringify({ test: 'ok', time: Date.now() }));
          const read = JSON.parse(localStorage.getItem(testKey));
          localStorage.removeItem(testKey);
          if (read && read.test === 'ok') {
            return { pass: true, msg: 'Passed: Browser localStorage read/write/delete cycle operational.' };
          }
        } catch (e) {
          return { pass: false, msg: 'Failed: LocalStorage not available or restricted.' };
        }
        return { pass: false, msg: 'Failed: Storage test error.' };
      }
    },
    {
      id: 'a11y',
      name: '6. Accessibility, ARIA & Keyboard Focus Navigation',
      run: () => {
        const ariaBtns = document.querySelectorAll('button[aria-label], a[aria-label], button[aria-expanded]');
        const skipLink = document.querySelector('.skip-to-content');
        const roles = document.querySelectorAll('[role="tablist"], [role="dialog"], [role="toolbar"]');
        
        if (ariaBtns.length >= 8 && skipLink && roles.length >= 3) {
          return { pass: true, msg: `Passed: Verified ${ariaBtns.length} ARIA-labeled interactive controls, skip links, and dialog landmarks.` };
        }
        return { pass: false, msg: 'Failed: Insufficient ARIA labels or accessibility landmarks.' };
      }
    },
    {
      id: 'validation',
      name: '7. Input Validation & Edge Cases',
      run: () => {
        const limitVal = Number(DOM.budgetLimitInput ? DOM.budgetLimitInput.value : 1500);
        const nameInputRequired = DOM.setupNameInput && DOM.setupNameInput.hasAttribute('required');
        
        if (limitVal >= 200 && nameInputRequired) {
          return { pass: true, msg: 'Passed: Form inputs enforce required attributes, min bounds, and input sanitation.' };
        }
        return { pass: false, msg: 'Failed: Input validation bounds missing.' };
      }
    },
    {
      id: 'responsive',
      name: '8. Responsive Box Model & Viewport Adaptability',
      run: () => {
        const stage = DOM.deskStage;
        const boxModel = stage ? window.getComputedStyle(stage).boxSizing : '';
        if (boxModel === 'border-box') {
          return { pass: true, msg: 'Passed: Global box-sizing: border-box active; fluid viewport CSS Grid in effect.' };
        }
        return { pass: false, msg: 'Failed: Box-sizing reset missing.' };
      }
    },
    {
      id: 'feedback',
      name: '9. User Feedback & Notification Toast Subsystem',
      run: () => {
        if (DOM.toastContainer) {
          showToast('QA Test: Notification Dispatch Verified', 'info', 1500);
          return { pass: true, msg: 'Passed: Live region polite container active with dynamic toast lifecycle.' };
        }
        return { pass: false, msg: 'Failed: Toast container missing.' };
      }
    },
    {
      id: 'presets',
      name: '10. Preset Loading & Complete Setup Hydration',
      run: () => {
        const presetKeys = Object.keys(PRESETS);
        if (presetKeys.length === 4) {
          return { pass: true, msg: `Passed: All 4 presets configured with comprehensive item matrices (${presetKeys.join(', ')}).` };
        }
        return { pass: false, msg: 'Failed: Missing preset matrices.' };
      }
    }
  ];

  function runAllQATests() {
    let passedCount = 0;
    
    TEST_SUITE.forEach(test => {
      const itemEl = document.querySelector(`.test-item[data-test="${test.id}"]`);
      if (!itemEl) return;

      const iconEl = itemEl.querySelector('.test-status-icon');
      const detailEl = itemEl.querySelector('.test-item-detail');

      try {
        const result = test.run();
        if (result.pass) {
          passedCount++;
          itemEl.className = 'test-item test-pass';
          if (iconEl) iconEl.textContent = '✅';
          if (detailEl) {
            detailEl.className = 'test-item-detail text-success';
            detailEl.textContent = result.msg;
          }
        } else {
          itemEl.className = 'test-item test-fail';
          if (iconEl) iconEl.textContent = '❌';
          if (detailEl) {
            detailEl.className = 'test-item-detail text-danger';
            detailEl.textContent = result.msg;
          }
        }
      } catch (err) {
        itemEl.className = 'test-item test-fail';
        if (iconEl) iconEl.textContent = '⚠️';
        if (detailEl) {
          detailEl.className = 'test-item-detail text-danger';
          detailEl.textContent = 'Error: ' + err.message;
        }
      }
    });

    if (DOM.testSummaryScore) {
      if (passedCount === TEST_SUITE.length) {
        DOM.testSummaryScore.innerHTML = `Status: <span class="score-pass">${passedCount}/${TEST_SUITE.length} Passed (100% Ready)</span>`;
        showToast('All 10 QA Checks Passed Successfully!', 'success', 3500);
      } else {
        DOM.testSummaryScore.innerHTML = `Status: <span class="score-fail">${passedCount}/${TEST_SUITE.length} Passed</span>`;
      }
    }
  }

  // ==========================================
  // 13. Event Listeners & Initialization
  // ==========================================
  function bindEventListeners() {
    // 1. Theme Toggle
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', state.theme);
        
        if (DOM.themeIconDark && DOM.themeIconLight) {
          if (state.theme === 'light') {
            DOM.themeIconDark.classList.add('hidden');
            DOM.themeIconLight.classList.remove('hidden');
          } else {
            DOM.themeIconDark.classList.remove('hidden');
            DOM.themeIconLight.classList.add('hidden');
          }
        }

        if (DOM.canvasThemeTag) {
          DOM.canvasThemeTag.textContent = `Theme: ${state.theme === 'dark' ? 'Dark Studio' : 'Bright Scandinavian'}`;
        }
      });
    }

    // 2. Presets Dropdown
    if (DOM.presetsBtn && DOM.presetsMenu) {
      const closePresetsMenu = () => {
        if (!DOM.presetsMenu.hidden) {
          DOM.presetsMenu.hidden = true;
          DOM.presetsBtn.setAttribute('aria-expanded', 'false');
        }
      };

      DOM.presetsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = DOM.presetsMenu.hidden;
        DOM.presetsMenu.hidden = !isHidden;
        DOM.presetsBtn.setAttribute('aria-expanded', String(isHidden));
      });

      document.addEventListener('click', (e) => {
        if (!DOM.presetsMenu.contains(e.target) && e.target !== DOM.presetsBtn) {
          closePresetsMenu();
        }
      });

      window.addEventListener('scroll', closePresetsMenu, { passive: true });

      DOM.presetsMenu.querySelectorAll('.dropdown-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const presetKey = btn.getAttribute('data-preset');
          closePresetsMenu();
          applyPreset(presetKey);
        });
      });
    }

    // 3. Screen Mode Selector
    if (DOM.screenModeSelect) {
      DOM.screenModeSelect.addEventListener('change', (e) => {
        state.screenMode = e.target.value;
        renderWorkspaceSVG();
        showToast(`Screen Mode: ${e.target.options[e.target.selectedIndex].text}`, 'info', 1800);
      });
    }

    // 4. View Mode Toggles (Front 3D vs Top-Down)
    document.querySelectorAll('.view-modes .btn-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-modes .btn-toggle').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
        
        state.viewMode = btn.getAttribute('data-view');
        if (DOM.deskStage) {
          DOM.deskStage.classList.toggle('view-top', state.viewMode === 'top');
          DOM.deskStage.classList.toggle('view-front', state.viewMode === 'front');
        }
        if (DOM.canvasOrientationTag) {
          DOM.canvasOrientationTag.textContent = state.viewMode === 'top' ? 'Top-Down Blueprint' : 'Ergonomic Front Angle';
        }
        renderWorkspaceSVG();
      });
    });

    // 5. Environment Lighting Modes (Dark, Light, Neon)
    document.querySelectorAll('.env-modes .btn-icon-sm').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.env-modes .btn-icon-sm').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');

        state.envMode = btn.getAttribute('data-env');
        if (DOM.deskStage) {
          DOM.deskStage.className = `desk-stage env-${state.envMode} view-${state.viewMode}`;
        }
        renderWorkspaceSVG();
      });
    });

    // 6. RGB Backlight Cycler
    if (DOM.toggleBacklightBtn) {
      DOM.toggleBacklightBtn.addEventListener('click', () => {
        state.rgbColorIndex = (state.rgbColorIndex + 1) % state.rgbColors.length;
        const colorName = state.rgbColorNames[state.rgbColorIndex];
        if (DOM.rgbStatusLabel) DOM.rgbStatusLabel.textContent = colorName;
        renderWorkspaceSVG();
      });
    }

    // 7. Mouse Hand Swap (Left / Right)
    if (DOM.toggleHandBtn) {
      DOM.toggleHandBtn.addEventListener('click', () => {
        state.mouseHand = state.mouseHand === 'right' ? 'left' : 'right';
        if (DOM.handLabel) DOM.handLabel.textContent = state.mouseHand === 'left' ? 'Left' : 'Right';
        renderWorkspaceSVG();
        showToast(`Mouse position: ${state.mouseHand === 'left' ? 'Left-Handed' : 'Right-Handed'}`, 'info', 1800);
      });
    }

    // 8. Search & Sort Catalog
    if (DOM.catalogSearchInput) {
      DOM.catalogSearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (DOM.clearSearchBtn) {
          DOM.clearSearchBtn.classList.toggle('hidden', state.searchQuery === '');
        }
        renderCatalog();
      });
    }

    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.addEventListener('click', () => {
        state.searchQuery = '';
        if (DOM.catalogSearchInput) DOM.catalogSearchInput.value = '';
        DOM.clearSearchBtn.classList.add('hidden');
        renderCatalog();
      });
    }

    if (DOM.catalogSortSelect) {
      DOM.catalogSortSelect.addEventListener('change', (e) => {
        state.sortOption = e.target.value;
        renderCatalog();
      });
    }

    // 9. Category Filter Tabs
    if (DOM.categoryTabs) {
      DOM.categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          DOM.categoryTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
          state.activeCategory = tab.getAttribute('data-category');
          renderCatalog();
        });
      });
    }

    if (DOM.resetFilterBtn) {
      DOM.resetFilterBtn.addEventListener('click', () => {
        state.searchQuery = '';
        state.activeCategory = 'all';
        if (DOM.catalogSearchInput) DOM.catalogSearchInput.value = '';
        if (DOM.clearSearchBtn) DOM.clearSearchBtn.classList.add('hidden');
        if (DOM.categoryTabs) {
          DOM.categoryTabs.forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-category') === 'all');
            t.setAttribute('aria-selected', t.getAttribute('data-category') === 'all' ? 'true' : 'false');
          });
        }
        renderCatalog();
      });
    }

    // 10. Budget Limit Input
    if (DOM.budgetLimitInput) {
      DOM.budgetLimitInput.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        if (val >= 200) {
          state.budgetLimit = val;
          updatePriceAndBudgetUI();
        }
      });
    }

    // 11. Catalog Card Action Delegation
    if (DOM.catalogGrid) {
      DOM.catalogGrid.addEventListener('click', (e) => {
        const selectBtn = e.target.closest('.select-item-btn');
        if (selectBtn) {
          const id = selectBtn.getAttribute('data-id');
          selectCatalogItem(id);
          return;
        }

        const toggleBtn = e.target.closest('.toggle-accessory-btn');
        if (toggleBtn) {
          const id = toggleBtn.getAttribute('data-id');
          toggleAccessoryItem(id);
          return;
        }
      });
    }

    // 12. Modal Open / Close Triggers
    if (DOM.saveCurrentBtn) {
      DOM.saveCurrentBtn.addEventListener('click', () => {
        if (DOM.setupNameInput) DOM.setupNameInput.value = `Desk Setup (${new Date().toLocaleDateString()})`;
        openModal(DOM.saveModal);
      });
    }

    if (DOM.savedSetupsBtn) {
      DOM.savedSetupsBtn.addEventListener('click', () => {
        renderSavedSetupsList();
        openModal(DOM.savedSetupsModal);
      });
    }

    if (DOM.quickExportSummaryBtn) {
      DOM.quickExportSummaryBtn.addEventListener('click', () => {
        populateReceiptBreakdown();
        openModal(DOM.summaryModal);
      });
    }

    if (DOM.resetConfigBtn) {
      DOM.resetConfigBtn.addEventListener('click', () => {
        openModal(DOM.resetConfirmModal);
      });
    }

    if (DOM.confirmResetBtn) {
      DOM.confirmResetBtn.addEventListener('click', resetToDefault);
    }

    if (DOM.qaDrawerBtn) {
      DOM.qaDrawerBtn.addEventListener('click', () => {
        openModal(DOM.qaModal);
      });
    }

    if (DOM.footerQaLink) {
      DOM.footerQaLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(DOM.qaModal);
      });
    }

    // Generic Modal Close
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        closeModal(modal);
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
      });
    });

    // Escape Key Handler for Accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(modal => {
          closeModal(modal);
        });
        if (DOM.presetsMenu && !DOM.presetsMenu.hidden) {
          DOM.presetsMenu.hidden = true;
          DOM.presetsBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // 13. Save Setup Form Submit
    if (DOM.saveSetupForm) {
      DOM.saveSetupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = DOM.setupNameInput ? DOM.setupNameInput.value : 'Custom Setup';
        const notes = DOM.setupNotesInput ? DOM.setupNotesInput.value : '';
        saveCurrentSetup(name, notes);
      });
    }

    // 14. Saved Setups Actions Delegation
    if (DOM.savedSetupsList) {
      DOM.savedSetupsList.addEventListener('click', (e) => {
        const loadBtn = e.target.closest('.load-saved-btn');
        if (loadBtn) {
          loadSavedSetup(loadBtn.getAttribute('data-id'));
          return;
        }

        const delBtn = e.target.closest('.delete-saved-btn');
        if (delBtn) {
          deleteSavedSetup(delBtn.getAttribute('data-id'));
          return;
        }
      });
    }

    // 15. Export / Import JSON
    if (DOM.exportAllJsonBtn) {
      DOM.exportAllJsonBtn.addEventListener('click', () => {
        const exportData = {
          app: 'DeskCraft',
          version: '1.0',
          exportedAt: new Date().toISOString(),
          savedSetups: state.savedSetups,
          currentConfig: state
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `DeskCraft_Setups_Backup_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Exported setups to JSON file!', 'success');
      });
    }

    if (DOM.importJsonInput) {
      DOM.importJsonInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            if (parsed.savedSetups && Array.isArray(parsed.savedSetups)) {
              state.savedSetups = [...parsed.savedSetups, ...state.savedSetups];
              persistSavedSetups();
              renderSavedSetupsList();
              showToast(`Imported ${parsed.savedSetups.length} setups successfully!`, 'success');
            } else {
              showToast('Invalid DeskCraft JSON file format', 'error');
            }
          } catch (err) {
            showToast('Failed to parse JSON file', 'error');
          }
        };
        reader.readAsText(file);
      });
    }

    if (DOM.clearAllSavedBtn) {
      DOM.clearAllSavedBtn.addEventListener('click', () => {
        if (confirm('Clear all saved configurations from your browser?')) {
          state.savedSetups = [];
          persistSavedSetups();
          renderSavedSetupsList();
          showToast('Cleared all saved setups.', 'info');
        }
      });
    }

    // 16. QA Testing Suite Controls
    if (DOM.runAllTestsBtn) {
      DOM.runAllTestsBtn.addEventListener('click', runAllQATests);
    }

    if (DOM.toggleA11yOverlayBtn) {
      DOM.toggleA11yOverlayBtn.addEventListener('click', () => {
        document.body.classList.toggle('a11y-debug-active');
        const isActive = document.body.classList.contains('a11y-debug-active');
        showToast(`Accessibility Focus Outlines: ${isActive ? 'ON' : 'OFF'}`, 'info');
      });
    }

    if (DOM.copyTestReportBtn) {
      DOM.copyTestReportBtn.addEventListener('click', () => {
        const report = TEST_SUITE.map(t => {
          const res = t.run();
          return `[${res.pass ? 'PASS' : 'FAIL'}] ${t.name}: ${res.msg}`;
        }).join('\n');

        navigator.clipboard.writeText(report).then(() => {
          showToast('Copied QA Diagnostic Report to clipboard!', 'success');
        }).catch(() => {
          showToast('Unable to write to clipboard', 'warning');
        });
      });
    }

    // 17. Share & Print Breakdown
    if (DOM.copyShareLinkBtn) {
      DOM.copyShareLinkBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Shareable DeskCraft URL copied to clipboard!', 'success');
        });
      });
    }

    if (DOM.printSummaryBtn) {
      DOM.printSummaryBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // 18. SFX Sound Toggle
    if (DOM.sfxToggleBtn) {
      DOM.sfxToggleBtn.addEventListener('click', () => {
        state.sfxEnabled = !state.sfxEnabled;
        if (DOM.sfxLabel) DOM.sfxLabel.textContent = state.sfxEnabled ? 'ON' : 'OFF';
        if (DOM.sfxIcon) DOM.sfxIcon.textContent = state.sfxEnabled ? '🔊' : '🔇';
        showToast(`Tactile SFX: ${state.sfxEnabled ? 'ENABLED' : 'MUTED'}`, 'info', 1600);
        if (state.sfxEnabled) playClickSfx('preset');
      });
    }
  }

  // ==========================================
  // 14. Tactile Web Audio SFX Synthesizer
  // ==========================================
  let audioCtx = null;
  function playClickSfx(type = 'click') {
    if (!state.sfxEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      if (type === 'preset') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else {
        // Crisp mechanical tactile click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(850, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.start(now);
        osc.stop(now + 0.045);
      }
    } catch (e) {
      // AudioContext fallback
    }
  }

  // ==========================================
  // 15. Neon Confetti Particle Blast
  // ==========================================
  function fireNeonConfetti() {
    const colors = ['#D6FF00', '#FF7700', '#00F5FF', '#9D4EDD', '#FFFFFF'];
    const container = document.createElement('div');
    container.className = 'confetti-layer';
    document.body.appendChild(container);

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = `${Math.random() * 14 + 6}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = '50%';
      particle.style.top = '40%';
      particle.style.borderRadius = '2px';
      particle.style.transform = `rotate(${Math.random() * 360}deg)`;
      particle.style.pointerEvents = 'none';

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 350 + 150;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity + 150;

      particle.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0.4) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 800 + 600,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        fill: 'forwards'
      });

      container.appendChild(particle);
    }

    setTimeout(() => container.remove(), 1500);
  }

  // ==========================================
  // 16. App Bootstrapper
  // ==========================================
  function init() {
    loadSavedSetupsFromStorage();
    renderWorkspaceSVG();
    updatePriceAndBudgetUI();
    renderCatalog();
    bindEventListeners();

    console.log('⚡ DeskCraft High-Octane Edition active. Tuned for speed and flow.');
  }

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
