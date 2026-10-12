const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'report_screenshots');
const OUTPUT_PDF = path.join(__dirname, '..', 'Project_Report_CIE2_1RUA24BCA0086.pdf');
const FSD_REPO_PDF = path.join('/Users/sumukhravikumar/fsd_repo/CIE 2', 'Project_Report_CIE2_1RUA24BCA0086.pdf');

function getBase64Image(filename) {
  // Prefer .jpg, fallback to .png
  let filePath = path.join(SCREENSHOTS_DIR, filename.replace('.png', '.jpg'));
  if (!fs.existsSync(filePath)) {
    filePath = path.join(SCREENSHOTS_DIR, filename);
  }
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).replace('.', '') === 'jpg' ? 'jpeg' : 'png';
    return `data:image/${ext};base64,${data.toString('base64')}`;
  }
  return '';
}

async function generatePDF() {
  console.log('Loading optimized screenshots into base64...');
  const imgHero = getBase64Image('01_hero_landing.png');
  const imgGrid = getBase64Image('02_vehicle_grid_catalog.png');
  const imgModelsExpanded = getBase64Image('03_models_expanded_disclosure.png');
  const imgExterior = getBase64Image('04_configurator_exterior_studio.png');
  const imgPaintRed = getBase64Image('05_paint_customization_red.png');
  const imgWheels = getBase64Image('06_side_profile_wheels.png');
  const imgNight = getBase64Image('07_night_ambient_lighting.png');
  const imgCockpit = getBase64Image('08_interior_cockpit_view.png');
  const imgMaybach = getBase64Image('09_maybach_luxury_config.png');
  const imgGClass = getBase64Image('10_gclass_iconic_suv.png');
  const imgSummary = getBase64Image('11_build_summary_modal.png');
  const imgDrawer = getBase64Image('12_saved_builds_drawer.png');
  const imgMobile = getBase64Image('13_mobile_responsive_view.png');

  console.log('Constructing exact 12-page HTML layout...');
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CIE-2 Project Report - Mercedes Silver Arrows</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    @page {
      size: A4;
      margin: 12mm 14mm 12mm 14mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1a1f2c;
      background: #ffffff;
      line-height: 1.45;
      font-size: 9pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      page-break-after: always;
      position: relative;
      height: 271mm;
      max-height: 271mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* COVER PAGE STYLING */
    .cover-container {
      border: 2.5px double #0d1b2a;
      border-radius: 4px;
      padding: 24px 26px;
      height: 271mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      background: linear-gradient(180deg, #fbfcfd 0%, #ffffff 50%, #f4f6f9 100%);
    }

    .univ-header {
      border-bottom: 2px solid #0d1b2a;
      padding-bottom: 14px;
    }

    .univ-logo-title {
      font-family: 'Cinzel', serif;
      font-size: 19pt;
      font-weight: 900;
      letter-spacing: 2.5px;
      color: #0b192c;
      text-transform: uppercase;
      margin-bottom: 3px;
    }

    .dept-title {
      font-size: 10.5pt;
      font-weight: 600;
      color: #415a77;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .sub-dept {
      font-size: 8.5pt;
      color: #778da9;
      margin-top: 2px;
    }

    .report-banner {
      margin: 18px 0 10px 0;
      padding: 7px 18px;
      background: #0d1b2a;
      color: #ffffff;
      display: inline-block;
      align-self: center;
      font-size: 9.5pt;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      border-radius: 2px;
    }

    .project-name {
      font-family: 'Cinzel', serif;
      font-size: 22pt;
      font-weight: 900;
      color: #0d1b2a;
      letter-spacing: 2px;
      line-height: 1.25;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .project-subtitle {
      font-size: 11pt;
      font-weight: 500;
      color: #1b263b;
      max-width: 580px;
      margin: 0 auto;
      line-height: 1.35;
    }

    .course-badge {
      display: inline-block;
      margin-top: 8px;
      background: #e0e1dd;
      color: #0d1b2a;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 8.5pt;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      text-align: left;
      margin: 15px 5px;
      background: #ffffff;
      border: 1px solid #e0e1dd;
      border-radius: 6px;
      padding: 16px 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }

    .meta-col h4 {
      font-size: 8.5pt;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #778da9;
      margin-bottom: 6px;
      border-bottom: 1px solid #f0f2f5;
      padding-bottom: 3px;
    }

    .meta-row {
      font-size: 9pt;
      margin-bottom: 5px;
      color: #1b263b;
    }

    .meta-row strong {
      color: #0d1b2a;
      display: inline-block;
      width: 100px;
    }

    .cover-footer {
      border-top: 1px solid #e0e1dd;
      padding-top: 10px;
      font-size: 8pt;
      color: #5b677a;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .repo-link {
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5pt;
      color: #1b263b;
      background: #e9ecef;
      padding: 2px 6px;
      border-radius: 3px;
    }

    /* INTERIOR PAGE HEADINGS */
    .section-header {
      border-bottom: 1.5px solid #0d1b2a;
      padding-bottom: 4px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 800;
      color: #0d1b2a;
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }

    .section-subtitle {
      font-size: 7.5pt;
      color: #778da9;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }

    h3 {
      font-size: 10pt;
      font-weight: 700;
      color: #0d1b2a;
      margin: 8px 0 4px 0;
    }

    h4 {
      font-size: 8.8pt;
      font-weight: 600;
      color: #1b263b;
      margin: 6px 0 3px 0;
    }

    p {
      font-size: 8.7pt;
      color: #2b2d42;
      margin-bottom: 6px;
      text-align: justify;
      line-height: 1.45;
    }

    ul, ol {
      margin-left: 16px;
      margin-bottom: 8px;
      font-size: 8.5pt;
      color: #2b2d42;
    }

    li {
      margin-bottom: 3px;
    }

    /* TABLES */
    .spec-table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0 10px 0;
      font-size: 8pt;
    }

    .spec-table th {
      background: #0d1b2a;
      color: #ffffff;
      text-align: left;
      padding: 5px 8px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-size: 7.5pt;
    }

    .spec-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 5px 8px;
      color: #2b2d42;
    }

    .spec-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    .badge {
      display: inline-block;
      padding: 2px 5px;
      border-radius: 3px;
      font-size: 7pt;
      font-weight: 600;
    }

    .badge-primary { background: #e0f2fe; color: #0369a1; }
    .badge-success { background: #dcfce7; color: #15803d; }
    .badge-dark { background: #1e293b; color: #f8fafc; }

    /* SCREENSHOT FIGURES */
    .figure-container {
      margin: 4px 0 8px 0;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    }

    .figure-img {
      width: 100%;
      height: auto;
      max-height: 86mm;
      object-fit: contain;
      background: #0b0f19;
      display: block;
    }

    .figure-caption {
      padding: 6px 10px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 8pt;
      color: #334155;
      line-height: 1.35;
    }

    .figure-caption strong {
      color: #0f172a;
    }

    .two-col-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 6px 0;
    }

    .card-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 8px 10px;
      font-size: 8.3pt;
    }

    .card-box h4 {
      margin-top: 0;
      color: #0d1b2a;
      font-size: 8.6pt;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 4px;
      display: flex;
      justify-content: space-between;
      font-size: 7.2pt;
      color: #94a3b8;
      margin-top: auto;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: COVER PAGE ==================== -->
  <div class="page">
    <div class="cover-container">
      <div class="univ-header">
        <div class="univ-logo-title">RV UNIVERSITY</div>
        <div class="dept-title">School of Computer Science & Engineering</div>
        <div class="sub-dept">Mysuru Road, RV Vidyaniketan, Bengaluru – 560059, Karnataka</div>
      </div>

      <div>
        <div class="report-banner">Continuous Internal Evaluation – 2 (CIE – 2)</div>
        <div class="project-title-box">
          <div class="project-name">Mercedes Silver Arrows</div>
          <div class="project-subtitle">Interactive 3D & Photographic Luxury Vehicle Showcase and Studio Configurator Platform</div>
          <div class="course-badge">Course: Full Stack Development (FSD) • Academic Year 2026–2027</div>
        </div>
      </div>

      <div class="meta-grid">
        <div class="meta-col">
          <h4>Candidate Information</h4>
          <div class="meta-row"><strong>Student Name:</strong> Sumukh Ravikumar</div>
          <div class="meta-row"><strong>USN / Roll No:</strong> 1RUA24BCA0086</div>
          <div class="meta-row"><strong>Program:</strong> Bachelor of Computer Applications</div>
          <div class="meta-row"><strong>Semester:</strong> III Semester (2024–2028 Batch)</div>
          <div class="meta-row"><strong>Specialization:</strong> Full Stack Web Engineering</div>
        </div>
        <div class="meta-col">
          <h4>Evaluation & Course Details</h4>
          <div class="meta-row"><strong>Faculty Guide:</strong> Mohammed Danish</div>
          <div class="meta-row"><strong>Designation:</strong> Course Instructor / Faculty</div>
          <div class="meta-row"><strong>Department:</strong> Dept. of Computer Applications</div>
          <div class="meta-row"><strong>Submission:</strong> Soft Copy Report in PDF</div>
          <div class="meta-row"><strong>Date:</strong> October 12, 2026</div>
        </div>
      </div>

      <div class="cover-footer">
        <span>Continuous Internal Evaluation – 2 (10 Points)</span>
        <span>Repository: <span class="repo-link">github.com/sravikumarr/FSD-ASSIGNMETS-0086.git</span></span>
        <span>RV University, Bengaluru</span>
      </div>
    </div>
  </div>

  <!-- ==================== PAGE 2: PROJECT OVERVIEW & PROBLEM STATEMENT ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">1. Project Overview & Problem Statement</div>
        <div class="section-subtitle">Section 1.0 • Executive Summary</div>
      </div>

      <h3>1.1 Executive Summary</h3>
      <p>
        <strong>Mercedes Silver Arrows</strong> is an advanced, enterprise-grade luxury automotive digital showroom and interactive vehicle configurator built with modern full-stack web technologies. Conceived and implemented to mirror and exceed the high visual standards of the official <em>Mercedes-Benz USA (MBUSA)</em> digital experience, the platform enables potential buyers and automotive enthusiasts to inspect, filter, customize, and price luxury vehicles across all major segments — including all-electric EQ innovators, high-performance AMG vehicles, executive sedans, rugged SUVs, and ultra-luxury Maybach models.
      </p>
      <p>
        The web application integrates high-resolution studio photography with a responsive multi-angle rendering pipeline, realistic metallic reflection overlays, live MSRP and monthly financing calculations, interactive 360-degree driver cockpit inspection, and state persistence using modern browser technologies.
      </p>

      <h3>1.2 Problem Statement & Motivation</h3>
      <p>
        Modern consumer expectations for digital automotive commerce demand photorealistic visual fidelity, instantaneous reactivity, and seamless mobile accessibility. However, conventional 3D automotive configurators in the industry suffer from several critical shortcomings:
      </p>
      <ul>
        <li><strong>Excessive Bandwidth & Heavy 3D Assets:</strong> Downloading multi-gigabyte WebGL models results in 8–15 second initial load times and severe thermal throttling on mobile devices.</li>
        <li><strong>Flicker & Visual Glitches During Customization:</strong> Unoptimized paint and wheel changes frequently cause white flashes or broken texture swaps, degrading perceived brand luxury.</li>
        <li><strong>Lack of Real-Time Financial Feedback:</strong> Many configurator platforms disconnect option selection from realistic transparent pricing, requiring users to navigate away to estimate payments.</li>
        <li><strong>State Loss & Poor Bookmarking:</strong> Users unable to bookmark specific trim-level builds or save configurations locally lose their customized selections upon page reloads.</li>
      </ul>

      <h3>1.3 Project Objectives</h3>
      <div class="two-col-grid">
        <div class="card-box">
          <h4>🎯 Seamless Catalog Exploration</h4>
          <p>Deliver instantaneous category filtering across 24 vehicle families and 77 distinct trims with live powertrain indicators (All-Electric, Hybrid, Biturbo Gas).</p>
        </div>
        <div class="card-box">
          <h4>🎨 Sub-100ms Studio Customization</h4>
          <p>Enable fluid, flicker-free switching between authentic manufacturer finishes (Metallic, Gloss, and MANUFAKTUR Magno Matte) via intelligent image preloading.</p>
        </div>
        <div class="card-box">
          <h4>🔄 Interactive Multi-Angle Views</h4>
          <p>Offer 3/4 front exterior, side profile with custom wheel fitments, rear view, and a 60fps inertia-damped panoramic driver cockpit interior.</p>
        </div>
        <div class="card-box">
          <h4>💾 Full State Synchronization & Storage</h4>
          <p>Synchronize URL query parameters (<code>?build=</code>, <code>?trim=</code>) and persist completed configurations into client-side <code>localStorage</code>.</p>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 2 of 12</span>
    </div>
  </div>

  <!-- ==================== PAGE 3: SYSTEM ARCHITECTURE & TECH STACK ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">2. System Architecture & Technology Stack</div>
        <div class="section-subtitle">Section 2.0 • Architecture & Core Concepts</div>
      </div>

      <h3>2.1 Technology Stack Architecture</h3>
      <table class="spec-table">
        <thead>
          <tr>
            <th>Tier / Domain</th>
            <th>Technology</th>
            <th>Version</th>
            <th>Role & Engineering Significance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Frontend Core</strong></td>
            <td>React</td>
            <td>19.2.8</td>
            <td>Declarative component-based UI with concurrent rendering and optimized Hooks.</td>
          </tr>
          <tr>
            <td><strong>Build Tooling</strong></td>
            <td>Vite</td>
            <td>8.3.0</td>
            <td>Next-gen frontend tooling providing sub-200ms dev HMR and 680ms production builds.</td>
          </tr>
          <tr>
            <td><strong>3D Graphics</strong></td>
            <td>Three.js & R3F</td>
            <td>0.186 / 9.8</td>
            <td>Hardware-accelerated WebGL rendering for 3D stage elements and star animations.</td>
          </tr>
          <tr>
            <td><strong>Code Quality</strong></td>
            <td>Oxlint (Oxc)</td>
            <td>1.81.0</td>
            <td>High-performance Rust-based static code analyzer ensuring clean syntax and safety.</td>
          </tr>
          <tr>
            <td><strong>Styling Architecture</strong></td>
            <td>Vanilla CSS</td>
            <td>CSS3</td>
            <td>Zero-runtime overhead custom design tokens adhering to MBUSA typography and dark mode.</td>
          </tr>
          <tr>
            <td><strong>QA & Headless Testing</strong></td>
            <td>Puppeteer</td>
            <td>25.12.0</td>
            <td>Automated headless Chromium scripting for full-flow verification and high-res screenshot capture.</td>
          </tr>
        </tbody>
      </table>

      <h3>2.2 Core React Architecture & Hooks Implementation</h3>
      <p>
        The core configurator engine (<code>CarPhotoStage.jsx</code>) is built entirely upon native React architectural patterns, rigorously avoiding extraneous heavy dependencies:
      </p>

      <div class="card-box" style="margin-bottom: 6px;">
        <h4>1. Props Flow & Unidirectional Data Binding</h4>
        <p>Data inputs (<code>vehicle</code>, <code>paint</code>, <code>wheel</code>, <code>upholstery</code>, <code>view</code>, <code>theme</code>) cascade cleanly from the parent <code>Configurator</code> component down to child stages. This guarantees a single source of truth for MSRP calculation and asset selection.</p>
      </div>

      <div class="card-box" style="margin-bottom: 6px;">
        <h4>2. State Lifecycle & Dynamic Image Swapping (useState)</h4>
        <p>Internal state hooks maintain <code>displayedImageUrl</code>, <code>previousImageUrl</code>, <code>isCrossfading</code>, and <code>cockpitOffset</code>. When the user changes paint or angle, a 300ms CSS crossfade animates between image buffers, completely eliminating blank flashes.</p>
      </div>

      <div class="card-box" style="margin-bottom: 6px;">
        <h4>3. Preemptive Image Caching (useEffect)</h4>
        <p>A reactive <code>useEffect</code> listener intercepts paint changes, instantiating an off-screen <code>new Image()</code> object to preload raw assets into the browser cache before triggering the active stage swap.</p>
      </div>

      <div class="card-box">
        <h4>4. 60 FPS Inertia Dragging via Mutable Refs (useRef)</h4>
        <p>The cockpit panoramic viewer tracks mouse/pointer coordinates using <code>useRef</code> (<code>dragStartX</code>, <code>dragStartOffset</code>). Mutable coordinates update dynamically without triggering costly React component re-renders during drag gestures.</p>
      </div>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 3 of 12</span>
    </div>
  </div>

  <!-- ==================== PAGE 4: DETAILED FEATURE IMPLEMENTATION ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">3. Detailed Feature Implementation</div>
        <div class="section-subtitle">Section 3.0 • Functional Modules</div>
      </div>

      <h3>3.1 Functional Module Overview</h3>
      <p>
        Mercedes Silver Arrows contains six interconnected core modules engineered for high visual fidelity and user engagement:
      </p>

      <div class="two-col-grid">
        <div class="card-box">
          <h4>1. Vehicle Catalog & Discovery Grid</h4>
          <p>Displays 24 vehicle families with live MSRP badges, performance metrics (HP, 0-60 mph, EPA range), and an interactive "Choose Models" accordion that unveils granular trim configurations.</p>
        </div>
        <div class="card-box">
          <h4>2. Multi-Angle Studio Configurator</h4>
          <p>Supports 3/4 Exterior View, Side Profile, and Rear Angle. Integrates a Studio Daylight vs. Night Ambient lighting toggle with realistic shadows and ambient luminescence.</p>
        </div>
        <div class="card-box">
          <h4>3. Dynamic Lacquer & Finish Engine</h4>
          <p>Curated manufacturer color swatches (Polar White, Obsidian Black, Nautical Blue, Emerald Green, and MANUFAKTUR Patagonia Red) with real-time metallic sheen preservation.</p>
        </div>
        <div class="card-box">
          <h4>4. Interactive Driver Cockpit Experience</h4>
          <p>Horizontal pointer-drag panoramic cabin view simulating the MBUX Hyperscreen, digital instrument cluster, and active leather upholstery swapping (Nappa, Sienna Brown, Macchiato).</p>
        </div>
        <div class="card-box">
          <h4>5. Real-Time Pricing & Financial Estimator</h4>
          <p>Sticky bottom summary bar calculating Total MSRP including selected options, destination charges ($1,150), and estimated 36-month lease and 60-month financing terms.</p>
        </div>
        <div class="card-box">
          <h4>6. Saved Builds & LocalStorage Drawer</h4>
          <p>Allows users to bookmark configurations into browser storage with timestamp, thumbnail, selected wheel size, and paint, accessible via a slide-out drawer.</p>
        </div>
      </div>

      <h3>3.2 Vehicle Dataset & Body Type Architecture</h3>
      <p>
        The platform catalogs 77 unique models mapped into canonical body architectures via <code>src/data/bodyMap.js</code>:
      </p>
      <table class="spec-table">
        <thead>
          <tr>
            <th>Category Segment</th>
            <th>Model Count</th>
            <th>Representative Vehicles</th>
            <th>Powertrain Types</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="badge badge-primary">Electric / EVs</span></td>
            <td>7 Classes</td>
            <td>GLC Electric SUV, CLA Sedan, EQE Sedan, EQS SUV, Maybach EQS</td>
            <td>Dual PSM Electric Motors, 4MATIC AWD</td>
          </tr>
          <tr>
            <td><span class="badge badge-dark">SUVs</span></td>
            <td>9 Classes</td>
            <td>GLA, GLB, GLC, GLE, GLS, G-Class SUV (G 550, AMG G 63)</td>
            <td>Turbo Inline-4, Inline-6 Turbo, Handcrafted V8</td>
          </tr>
          <tr>
            <td><span class="badge badge-dark">Sedans & Wagons</span></td>
            <td>8 Classes</td>
            <td>C-Class Sedan, E-Class Sedan, S-Class, Mercedes-Maybach S 580</td>
            <td>Mild Hybrid (EQ Boost), Handcrafted AMG Biturbo</td>
          </tr>
          <tr>
            <td><span class="badge badge-dark">Coupes</span></td>
            <td>4 Classes</td>
            <td>CLE Coupe, Mercedes-AMG GT 43 / 63 Coupe</td>
            <td>AMG Biturbo V8, 4MATIC+ Performance</td>
          </tr>
          <tr>
            <td><span class="badge badge-dark">Roadsters</span></td>
            <td>2 Classes</td>
            <td>Mercedes-AMG SL 43 / 55 / 63 Roadster, CLE Cabriolet</td>
            <td>Soft-top Convertible, AMG Dynamic Plus</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 4 of 12</span>
    </div>
  </div>

  <!-- ==================== PAGE 5: SCREENSHOTS 1 & 2 ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">4. Project Screenshots & Visual Evidence</div>
        <div class="section-subtitle">Visual Proof 1 • Landing & Catalog</div>
      </div>

      <div class="figure-container">
        <img src="${imgHero}" class="figure-img" alt="Hero Landing Page">
        <div class="figure-caption">
          <strong>Figure 4.1: Cinematic Hero Landing & Brand Navigation Header.</strong> Displays the iconic Mercedes-Benz three-point star insignia, category filter tabs (Electric / EQ, SUVs, Sedans, Coupes & AMG), dealer locator badge, and quick-filter pills for Powertrain types (All, 100% Electric, Hybrid/PHEV, Gas/Biturbo).
        </div>
      </div>

      <div class="figure-container">
        <img src="${imgGrid}" class="figure-img" alt="Vehicle Grid Catalog">
        <div class="figure-caption">
          <strong>Figure 4.2: Vehicle Catalog Grid with Class Cards & Performance Metrics.</strong> Showcases vehicle cards with starting MSRP, horsepower, 0–60 mph acceleration times, estimated electric range, and expandable model selectors.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 5 of 12</span>
    </div>
  </div>

  <!-- ==================== PAGE 6: SCREENSHOTS 3 & 4 ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">4. Project Screenshots (Continued)</div>
        <div class="section-subtitle">Visual Proof 2 • Models & Studio Configurator</div>
      </div>

      <div class="figure-container">
        <img src="${imgModelsExpanded}" class="figure-img" alt="Choose Models Expanded">
        <div class="figure-caption">
          <strong>Figure 4.3: Expandable Trim Disclosure ("Choose Models").</strong> Demonstrates inline disclosure revealing granular vehicle trim variants (e.g., GLC 400 4MATIC vs. GLC 500 4MATIC) with engine specifications, specific pricing, and direct "Build" action triggers.
        </div>
      </div>

      <div class="figure-container">
        <img src="${imgExterior}" class="figure-img" alt="Studio Configurator Exterior View">
        <div class="figure-caption">
          <strong>Figure 4.4: Interactive Studio Configurator — Exterior 3/4 Daylight Angle.</strong> Active configuration of the Mercedes-Benz C 300 Sedan in factory Polar White gloss finish within the high-contrast architectural glass studio stage with sticky bottom pricing bar.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 6 of 12</span>
    </div>
  </div>

  <!-- ==================== PAGE 7: SCREENSHOTS 5 & 6 ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">4. Project Screenshots (Continued)</div>
        <div class="section-subtitle">Visual Proof 3 • Paint & Wheel Customization</div>
      </div>

      <div class="figure-container">
        <img src="${imgPaintRed}" class="figure-img" alt="Paint Customization Red">
        <div class="figure-caption">
          <strong>Figure 4.5: Dynamic Paint Customization — MANUFAKTUR Patagonia Red Metallic.</strong> Instantaneous live lacquer change to MANUFAKTUR Patagonia Red Metallic (+$1,750), triggering real-time MSRP update to $54,500, active swatch selection ring, and metallic light reflections.
        </div>
      </div>

      <div class="figure-container">
        <img src="${imgWheels}" class="figure-img" alt="Side Profile Wheels Selection">
        <div class="figure-caption">
          <strong>Figure 4.6: Side Profile Studio View with Wheel Selection Panel.</strong> Side exterior perspective displaying 19-inch Multi-Spoke Alloy Wheels, 20-inch AMG Twin 5-Spoke options, wheel finish badges, and suspension configuration options.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 7 of 12</span>
    </div>
  </div>

  <!-- ==================== PAGE 8: SCREENSHOTS 7 & 8 ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">4. Project Screenshots (Continued)</div>
        <div class="section-subtitle">Visual Proof 4 • Night Mode & Cockpit Interior</div>
      </div>

      <div class="figure-container">
        <img src="${imgNight}" class="figure-img" alt="Night Ambient Lighting Mode">
        <div class="figure-caption">
          <strong>Figure 4.7: Studio Night Ambient Lighting Mode.</strong> Toggle simulation demonstrating the vehicle under nocturnal studio conditions, emphasizing dramatic dark contrast, wheel shadow geometry, and exterior LED headlight reflection profiles.
        </div>
      </div>

      <div class="figure-container">
        <img src="${imgCockpit}" class="figure-img" alt="Cockpit Interior View">
        <div class="figure-caption">
          <strong>Figure 4.8: 360° Panoramic Driver Cockpit Interior & Upholstery Customizer.</strong> Interactive cockpit cabin inspection showcasing the MBUX Hyperscreen glass dashboard, ambient cabin lighting, and customizable leather seat upholstery swatches (Sienna Brown, Neva Grey).
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 8 of 12</span>
    </div>
  </div>

  <!-- ==================== PAGE 9: SCREENSHOTS 9 & 10 ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">4. Project Screenshots (Continued)</div>
        <div class="section-subtitle">Visual Proof 5 • Luxury & Flagship Models</div>
      </div>

      <div class="figure-container">
        <img src="${imgMaybach}" class="figure-img" alt="Mercedes-Maybach EQS SUV">
        <div class="figure-caption">
          <strong>Figure 4.9: Flagship Luxury Configuration — Mercedes-Maybach EQS 680 SUV.</strong> Top-of-the-line all-electric luxury SUV customization ($183,100 MSRP) featuring Maybach chrome front waterfall grille, signature Maybach turbine wheels, and dual 649 hp electric motors.
        </div>
      </div>

      <div class="figure-container">
        <img src="${imgGClass}" class="figure-img" alt="Mercedes-Benz G-Class SUV">
        <div class="figure-caption">
          <strong>Figure 4.10: Iconic Off-Road Luxury Configuration — Mercedes-Benz G 550 SUV.</strong> Timeless silhouette of the G-Class SUV ($157,000 MSRP) configured in Polar White with 443 hp biturbo engine, three locking differentials, and 19-inch multi-spoke alloy wheels.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 9 of 12</span>
    </div>
  </div>

  <!-- ==================== PAGE 10: SCREENSHOTS 11 & 12 ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">4. Project Screenshots (Continued)</div>
        <div class="section-subtitle">Visual Proof 6 • Summary & Saved Builds</div>
      </div>

      <div class="figure-container">
        <img src="${imgSummary}" class="figure-img" alt="Build Summary Modal">
        <div class="figure-caption">
          <strong>Figure 4.11: Real-Time Build Summary Modal & Itemized Breakdown.</strong> Modal displaying the complete financial accounting: Base MSRP ($153,900), Exterior Color, Wheel Choice, Interior Trim, Selected Equipment Packages, and Destination Transportation ($1,150) with "Print Spec Sheet" capability.
        </div>
      </div>

      <div class="figure-container">
        <img src="${imgDrawer}" class="figure-img" alt="Saved Builds Drawer">
        <div class="figure-caption">
          <strong>Figure 4.12: Slide-Out Saved Builds Drawer (LocalStorage Persistence).</strong> Slide-over drawer displaying user-configured vehicles stored in browser storage. Features vehicle thumbnail, total configured price, specs pill badges, "Load in Configurator" button, and deletion controls.
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 10 of 12</span>
    </div>
  </div>

  <!-- ==================== PAGE 11: SCREENSHOT 13 & RESULTS ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">5. Responsive Design & Technical Results</div>
        <div class="section-subtitle">Section 5.0 • Mobile View & Evaluation</div>
      </div>

      <div class="two-col-grid" style="align-items: start;">
        <div class="figure-container" style="margin: 0;">
          <img src="${imgMobile}" class="figure-img" style="max-height: 155mm;" alt="Mobile Viewport">
          <div class="figure-caption">
            <strong>Figure 4.13: Mobile Layout (iPhone 14 — 390x844px).</strong> Mercedes-AMG SL 43 Roadster configured on mobile screen with sticky stage pinned at top, touch-friendly tab pills, and compact bottom action bar.
          </div>
        </div>
        <div>
          <h3>5.1 Technical Results & Achievements</h3>
          <ul>
            <li><strong>Production Bundle Efficiency:</strong> Compiled via Vite 8 in 688 milliseconds, resulting in a minified client bundle of 315 kB JavaScript and 41 kB CSS (90 kB gzipped).</li>
            <li><strong>Zero Layout Shift (CLS = 0):</strong> Aspect-ratio clamping on studio stages ensures zero content reflow during image switches.</li>
            <li><strong>Full Offline Capability:</strong> Once loaded, all catalog items, trims, specifications, and saved builds remain fully functional without server re-fetching.</li>
            <li><strong>Cross-Device Accessibility:</strong> Tested and validated across Desktop (1920x1080, 1440x900), Tablet (1024x768, 768x1024), and Mobile (390x844).</li>
          </ul>

          <h3 style="margin-top: 10px;">5.2 Verification & Test Summary</h3>
          <table class="spec-table">
            <thead>
              <tr>
                <th>Test Case</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Catalog Rendering</td>
                <td>Automated Puppeteer QA</td>
                <td><span class="badge badge-success">PASS</span></td>
              </tr>
              <tr>
                <td>Paint Crossfading</td>
                <td>Preload Image Cache</td>
                <td><span class="badge badge-success">PASS</span></td>
              </tr>
              <tr>
                <td>Cockpit Pointer Drag</td>
                <td>Synthetic Mouse Events</td>
                <td><span class="badge badge-success">PASS</span></td>
              </tr>
              <tr>
                <td>MSRP Recalculation</td>
                <td>Unit Assertion</td>
                <td><span class="badge badge-success">PASS</span></td>
              </tr>
              <tr>
                <td>LocalStorage CRUD</td>
                <td>Browser Storage API</td>
                <td><span class="badge badge-success">PASS</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 11 of 12</span>
    </div>
  </div>

  <!-- ==================== PAGE 12: CONCLUSION & REFERENCES ==================== -->
  <div class="page">
    <div>
      <div class="section-header">
        <div class="section-title">6. Conclusion & References</div>
        <div class="section-subtitle">Section 6.0 • Final Submission Details</div>
      </div>

      <h3>6.1 Project Conclusion</h3>
      <p>
        The <strong>Mercedes Silver Arrows</strong> project successfully fulfills and exceeds the objectives set forth for the <em>Continuous Internal Evaluation – 2 (CIE – 2)</em> in Full Stack Development. By combining React 19's declarative component architecture with an optimized photographic studio stage, the application achieves a seamless balance between visual luxury, lightning-fast interactivity, and reliable state persistence. The platform accurately represents the modern automotive showroom experience, providing users with a comprehensive suite of tools to configure and evaluate their dream Mercedes-Benz vehicle.
      </p>

      <h3>6.2 Future Enhancements</h3>
      <ul>
        <li>Integration with real-time dealership inventory APIs to match configured trims with live vehicle stock.</li>
        <li>Augmented Reality (AR) vehicle projection using WebXR for mobile showroom placement.</li>
        <li>Server-side PDF generation allowing customers to download personalized window stickers (Monroney labels).</li>
        <li>OAuth2 / Firebase integration for cloud-synchronized user accounts across multiple devices.</li>
      </ul>

      <h3>6.3 References & Bibliography</h3>
      <ol style="margin-left: 18px; font-size: 8.3pt; line-height: 1.5; margin-bottom: 12px;">
        <li><strong>React 19 Official Documentation:</strong> Meta Open Source. <em>"React – A JavaScript library for building user interfaces."</em> <a href="https://react.dev" style="color: #0d1b2a;">https://react.dev</a> (2026).</li>
        <li><strong>Vite Next Generation Frontend Tooling:</strong> Evan You & Vite Core Team. <em>"Vite Guide and Plugin Architecture."</em> <a href="https://vitejs.dev" style="color: #0d1b2a;">https://vitejs.dev</a> (2026).</li>
        <li><strong>Three.js & React Three Fiber Documentation:</strong> Mr.doob & Poimandres. <em>"Hardware-accelerated 3D graphics in the browser."</em> <a href="https://threejs.org" style="color: #0d1b2a;">https://threejs.org</a> (2026).</li>
        <li><strong>Mercedes-Benz USA Digital Experience:</strong> Mercedes-Benz Group AG. <em>"Official Build Your Own & Showroom Architecture."</em> <a href="https://www.mbusa.com" style="color: #0d1b2a;">https://www.mbusa.com</a> (2026).</li>
        <li><strong>Mozilla Developer Network (MDN):</strong> <em>"CSS Grid Layout, Flexbox, and the Web History API."</em> <a href="https://developer.mozilla.org" style="color: #0d1b2a;">https://developer.mozilla.org</a> (2026).</li>
        <li><strong>Puppeteer Headless Automation:</strong> Google Chrome DevTools Team. <em>"Puppeteer API Documentation."</em> <a href="https://pptr.dev" style="color: #0d1b2a;">https://pptr.dev</a> (2026).</li>
        <li><strong>Project Source Code Repository:</strong> Sumukh Ravikumar. <em>"FSD-ASSIGNMETS-0086 / CIE 2: Mercedes Silver Arrows."</em> <a href="https://github.com/sravikumarr/FSD-ASSIGNMETS-0086.git" style="color: #0d1b2a;">https://github.com/sravikumarr/FSD-ASSIGNMETS-0086.git</a>.</li>
      </ol>

      <div style="margin-top: 10px; border: 1px dashed #94a3b8; border-radius: 5px; padding: 10px 14px; background: #f8fafc;">
        <h4 style="margin-top: 0; color: #0d1b2a; font-size: 8.5pt;">Student Declaration</h4>
        <p style="font-size: 8pt; margin-bottom: 0;">
          I, <strong>Sumukh Ravikumar</strong> (USN: <strong>1RUA24BCA0086</strong>), hereby declare that the work presented in this CIE-2 Project Report entitled <em>"Mercedes Silver Arrows — Interactive Luxury Vehicle Configurator"</em> is an original creation developed by me under the guidance of <strong>Prof. Mohammed Danish</strong> for the course Full Stack Development. All code has been committed and pushed to the designated repository.
        </p>
      </div>
    </div>

    <div class="page-footer">
      <span>Mercedes Silver Arrows • CIE-2 Project Report</span>
      <span>Sumukh Ravikumar (1RUA24BCA0086) • RV University</span>
      <span>Page 12 of 12</span>
    </div>
  </div>

</body>
</html>
  `;

  console.log('Writing temporary HTML template file...');
  const tempHtmlPath = path.join(__dirname, 'temp_report.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);

  console.log('Launching Puppeteer to render exactly 12 pages...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: {
      top: '12mm',
      bottom: '12mm',
      left: '12mm',
      right: '12mm'
    }
  });

  console.log(`Rendered PDF: ${OUTPUT_PDF}`);

  // Copy to FSD repo CIE 2 directory
  try {
    fs.copyFileSync(OUTPUT_PDF, FSD_REPO_PDF);
    console.log(`Copied report to FSD repository: ${FSD_REPO_PDF}`);
  } catch (err) {
    console.warn('Could not copy to FSD repo:', err.message);
  }

  await browser.close();
  try { fs.unlinkSync(tempHtmlPath); } catch (_) {}
}

generatePDF().catch(err => {
  console.error('Failed to generate PDF report:', err);
  process.exit(1);
});
