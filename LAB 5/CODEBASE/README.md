# DeskCraft — Interactive Workspace Configurator

**DeskCraft** is an interactive, responsive desk and workspace setup configurator built from scratch using **Semantic HTML5, Modern CSS3, and Vanilla JavaScript (ES6+)**. 

This project was built to demonstrate practical, real-world application of all competencies covered in the **IBM SkillsBuild Web Development Fundamentals** curriculum.

---

## 🌟 Live Features & Core Experience

1. **Interactive Real-Time Workspace Canvas (SVG & CSS Engine)**:
   - Dynamic vector rendering of desk tabletop finishes (*Solid Natural Oak, Dark American Walnut, Matte Studio Black, Arctic White Birch*).
   - Motorized sit-stand and fixed frame options.
   - Realistic multi-monitor configurations (*Single 4K UHD, Dual 27" QHD with Articulating Arms, Ultrawide 34" Curved, CodeStack Vertical+Horizontal, Triple Panoramic Array*).
   - Live monitor screen mode switcher (*VS Code Editor with live curriculum code, UI/UX Wireframe, Cyber Matrix, Sunset Minimalist*).
   - Ergonomic peripherals with RGB underglow cycling (*Cyan, Purple, Magenta, Emerald, Warm Amber, Studio White, Off*).
   - Studio audio monitors, desktop soundbars, open-back audiophile headphones on stand, broadcast microphone arm.
   - Workspace greenery and accessories (*Potted Monstera, Floating MagSafe Stand, Macro Console Stream Deck, Heated Mug, Laptop Dock*).
   - Multiple viewing perspectives (*Front 3D Ergonomic Angle vs. Top-Down Blueprint View*).
   - Room environment lighting ambiance (*Studio Dark, Bright Scandinavian Daylight, Neon Cyberpunk*).

2. **Component Catalog & State Engine**:
   - Categorized tabs (*All, Desks & Frame, Displays, Keyboards & Mice, Lighting, Audio, Accessories*).
   - Multi-field instant search & sort (*Price Low-to-High, High-to-Low, Alphabetical*).
   - Real-time price summation and active item count calculation.
   - Interactive budget tracker with editable target budget ($200–$10,000) and color-coded progress indicator (*Normal, Warning, Over-Budget*).
   - Add/Remove toggles and variant swatches.

3. **Curated 1-Click Presets**:
   - ⚡ **Minimalist Coder**: Solid Oak, Single 4K, 75% Mechanical, Glare-free Screenbar.
   - 🎨 **Studio Creator & Video Pro**: Walnut Surface, Ultrawide 34", Studio Monitors, Broadcast Mic Arm.
   - 🚀 **Ultra Productivity Hub**: Sit-Stand Base, Dual Displays, Split Ergonomic Keyboard, Vertical Mouse & Phone Stand.
   - 🎮 **Cyberpunk RGB Battlestation**: Matte Black, Triple Displays, RGB Glow, Soundbar & Gaming Peripherals.

4. **Persistence & Data Portability**:
   - `localStorage` multi-slot saved setups manager.
   - Export backup to `.json` file & Import configuration `.json`.
   - Copy shareable setup links and printable Itemized Specification Sheet / Receipt.
   - Safe configuration reset dialog with user confirmation.

5. **In-Browser Interactive QA & Testing Suite**:
   - Built-in live automated test suite executing **10 comprehensive tests**:
     1. Semantic HTML5 & DOM Hierarchy
     2. State Machine & Preview Synchronicity
     3. Price Summation & Item Count Mathematics
     4. Search Filtering & Category Tab Routing
     5. LocalStorage Persistence & Schema Validation
     6. Accessibility, ARIA & Keyboard Focus Navigation
     7. Input Validation & Edge Cases
     8. Responsive Box Model & Viewport Adaptability
     9. User Feedback & Notification Toast Subsystem
     10. Preset Loading & Complete Setup Hydration
   - Live visual test reporting with pass/fail badges and exportable diagnostic reports.
   - Interactive **Visual Focus Debugger** toggle overlay.

---

## 📚 IBM SkillsBuild Curriculum Mapping

| IBM Learning Module | Core Competency | DeskCraft Implementation Feature |
| :--- | :--- | :--- |
| **Module 1: Web Dev Basics** | Client vs. server architecture, web protocols, rendering loop | Client-side DOM execution, responsive rendering pipeline, browser event loop handling without heavy external abstractions. |
| **Module 2: Developing for the Web** | SDLC, Agile principles, responsive design strategies | Mobile-first and desktop-optimized side-by-side grid, modular CSS architecture, fluid typography with `clamp()`. |
| **Module 3: Intro to HTML & CSS** | Semantic elements, CSS Box Model, Flexbox/Grid | Semantic HTML5 structure (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, `<footer>`), custom CSS variables, accessible `:focus-visible` states. |
| **Module 4: JavaScript in Action** | DOM manipulation, state management, events, logic | Reactive vanilla JavaScript state machine managing selections, real-time SVG DOM updates, search/filter algorithms, and math budget calculations. |
| **Module 5: Testing & Deployment** | Visual/functional QA, Git, CI/CD, cloud hosting awareness | In-browser automated QA testing suite running 10 live test checks, clear deployment instructions for static cloud hosts. |
| **Module 6: Interactive Web Apps** | Wireframing, requirements analysis, storage persistence | `localStorage` save/load slots, JSON export/import backup, toast notification system, budget boundary validation. |
| **Module 7: Web Dev Careers** | Front-end workflows, professional clean code, accessibility standards | Clean, readable, well-commented code, WCAG AA contrast compliance, keyboard focus traps, portfolio-ready architecture. |

> **Project Notice**: This project demonstrates the practical technical competencies covered in the IBM SkillsBuild Web Development Fundamentals curriculum. Official credential completion is administered directly through the IBM SkillsBuild platform.

---

## 🛠️ Project Structure

```text
desk-craft/
├── index.html        # Semantic HTML5 page structure, modals, and SVG canvas layers
├── style.css         # Modern CSS3 design system, variables, Grid/Flexbox, animations
├── script.js         # Modular vanilla JavaScript state engine, catalog, QA runner
├── package.json      # Project metadata and lightweight dev scripts
└── README.md         # Architecture, curriculum mapping, and usage documentation
```

---

## 🚀 Running Locally

Because DeskCraft uses pure HTML5, CSS3, and Vanilla JavaScript, you can run it immediately without complex build tools:

1. **Direct in Browser**:
   - Double-click or open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

2. **Using a Local Server (Recommended for full feature support)**:
   ```bash
   # Using Python 3 built-in HTTP server:
   python3 -m http.server 8080
   # Then visit: http://localhost:8080
   ```
   Or using Node:
   ```bash
   npx serve .
   ```

---

## 🧪 Testing Protocol

1. Click the **"Testing & QA"** button in the top navigation bar.
2. Click **"Run All Automated Checks"**.
3. Inspect live diagnostic status for all 10 visual, functional, and accessibility test assertions.
4. Toggle the **"Visual Focus Debugger"** to verify keyboard `:focus-visible` accessibility rings across all interactive controls.
