const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Generate a high-resolution dark Power BI Placement Analytics preview
const width = 1200;
const height = 675;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0f19"/>
      <stop offset="100%" stop-color="#141829"/>
    </linearGradient>
    <linearGradient id="cardBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#19223c" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#111827" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <linearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Top Power BI Ribbon / Header -->
  <rect x="0" y="0" width="${width}" height="64" fill="#0d1322"/>
  <rect x="0" y="63" width="${width}" height="1" fill="#1f293d"/>

  <!-- Power BI icon & title -->
  <rect x="28" y="16" width="32" height="32" rx="8" fill="#f59e0b"/>
  <path d="M38 38V26M44 38V22M50 38V30" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
  <text x="72" y="38" fill="#f8fafc" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="700">BuildX // College Placement Data Analytics Dashboard</text>
  <text x="72" y="52" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">REPORT VIEW • LIVE DATA MODEL • DAX MEASURES</text>

  <!-- Filter chips -->
  <rect x="800" y="20" width="100" height="26" rx="13" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="822" y="37" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="11">Year: 2024</text>

  <rect x="910" y="20" width="110" height="26" rx="13" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="926" y="37" fill="#cbd5e1" font-family="'JetBrains Mono', monospace" font-size="11">Dept: All (6)</text>

  <rect x="1030" y="20" width="140" height="26" rx="13" fill="#7c3aed" fill-opacity="0.3" stroke="#8b5cf6" stroke-width="1"/>
  <text x="1046" y="37" fill="#e9d5ff" font-family="'JetBrains Mono', monospace" font-size="11">Filter: Placed &gt; 80%</text>

  <!-- KPI Cards Row -->
  <!-- KPI 1 -->
  <rect x="30" y="85" width="265" height="105" rx="16" fill="url(#cardBg)" stroke="#2e3852" stroke-width="1"/>
  <text x="50" y="115" fill="#94a3b8" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500">Total Eligible Students</text>
  <text x="50" y="155" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="800">1,420</text>
  <text x="170" y="152" fill="#10b981" font-family="'JetBrains Mono', monospace" font-size="12">+14.2% YoY</text>

  <!-- KPI 2 -->
  <rect x="315" y="85" width="265" height="105" rx="16" fill="url(#cardBg)" stroke="#2e3852" stroke-width="1"/>
  <text x="335" y="115" fill="#94a3b8" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500">Overall Placement Rate</text>
  <text x="335" y="155" fill="#c084fc" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="800">86.4%</text>
  <text x="475" y="152" fill="#8b5cf6" font-family="'JetBrains Mono', monospace" font-size="12">Target: 85%</text>

  <!-- KPI 3 -->
  <rect x="600" y="85" width="265" height="105" rx="16" fill="url(#cardBg)" stroke="#2e3852" stroke-width="1"/>
  <text x="620" y="115" fill="#94a3b8" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500">Highest Package (LPA)</text>
  <text x="620" y="155" fill="#f472b6" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="800">₹28.5 L</text>
  <text x="770" y="152" fill="#ec4899" font-family="'JetBrains Mono', monospace" font-size="12">Tier-1 MNC</text>

  <!-- KPI 4 -->
  <rect x="885" y="85" width="285" height="105" rx="16" fill="url(#cardBg)" stroke="#2e3852" stroke-width="1"/>
  <text x="905" y="115" fill="#94a3b8" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500">Average Compensation</text>
  <text x="905" y="155" fill="#38bdf8" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="800">₹7.2 LPA</text>
  <text x="1050" y="152" fill="#0284c7" font-family="'JetBrains Mono', monospace" font-size="12">DAX Median</text>

  <!-- Main Chart Left: Branch-wise Placement & Offers (Bar Chart) -->
  <rect x="30" y="210" width="670" height="435" rx="18" fill="url(#cardBg)" stroke="#2e3852" stroke-width="1"/>
  <text x="56" y="246" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="17" font-weight="700">Branch-wise Placement % &amp; Total Offers</text>
  <text x="56" y="268" fill="#94a3b8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Aggregated across CSE, ECE, EEE, ME, CE &amp; AI/DS</text>

  <!-- Bars -->
  <!-- CSE -->
  <text x="56" y="318" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600">CSE</text>
  <rect x="110" y="302" width="460" height="24" rx="6" fill="url(#accent)"/>
  <text x="580" y="319" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700">94.8% (420)</text>

  <!-- AI / DS -->
  <text x="56" y="368" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600">AI/DS</text>
  <rect x="110" y="352" width="440" height="24" rx="6" fill="url(#accent)" opacity="0.9"/>
  <text x="560" y="369" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700">91.2% (180)</text>

  <!-- ECE -->
  <text x="56" y="418" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600">ECE</text>
  <rect x="110" y="402" width="405" height="24" rx="6" fill="url(#tealGrad)"/>
  <text x="525" y="419" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700">84.5% (260)</text>

  <!-- EEE -->
  <text x="56" y="468" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600">EEE</text>
  <rect x="110" y="452" width="370" height="24" rx="6" fill="url(#tealGrad)" opacity="0.85"/>
  <text x="490" y="469" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700">77.8% (195)</text>

  <!-- ME -->
  <text x="56" y="518" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600">ME</text>
  <rect x="110" y="502" width="345" height="24" rx="6" fill="#64748b"/>
  <text x="465" y="519" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700">72.4% (210)</text>

  <!-- CE -->
  <text x="56" y="568" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600">CE</text>
  <rect x="110" y="552" width="320" height="24" rx="6" fill="#475569"/>
  <text x="440" y="569" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700">68.1% (155)</text>

  <!-- Bottom DAX Formula Preview box -->
  <rect x="56" y="600" width="615" height="30" rx="8" fill="#0f172a" stroke="#1e293b"/>
  <text x="70" y="620" fill="#a78bfa" font-family="'JetBrains Mono', monospace" font-size="11">DAX Measure: PlacementRate = DIVIDE([TotalPlacedStudents], [TotalEligibleStudents], 0)</text>

  <!-- Right Chart: Salary Distribution Donut & Recruiter Tiers -->
  <rect x="720" y="210" width="450" height="435" rx="18" fill="url(#cardBg)" stroke="#2e3852" stroke-width="1"/>
  <text x="746" y="246" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="17" font-weight="700">Recruiter Sector Breakdown</text>
  <text x="746" y="268" fill="#94a3b8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Distribution across hiring industry segments</text>

  <!-- Stylized Donut graphic -->
  <circle cx="945" cy="380" r="85" fill="none" stroke="#8b5cf6" stroke-width="26" stroke-dasharray="280 260" stroke-dashoffset="0"/>
  <circle cx="945" cy="380" r="85" fill="none" stroke="#ec4899" stroke-width="26" stroke-dasharray="140 400" stroke-dashoffset="-280"/>
  <circle cx="945" cy="380" r="85" fill="none" stroke="#06b6d4" stroke-width="26" stroke-dasharray="90 450" stroke-dashoffset="-420"/>
  <circle cx="945" cy="380" r="85" fill="none" stroke="#f59e0b" stroke-width="26" stroke-dasharray="35 500" stroke-dashoffset="-510"/>
  <text x="945" y="375" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="800">120+</text>
  <text x="945" y="398" text-anchor="middle" fill="#94a3b8" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Companies</text>

  <!-- Legend -->
  <rect x="746" y="505" width="12" height="12" rx="3" fill="#8b5cf6"/>
  <text x="766" y="516" fill="#cbd5e1" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">IT &amp; Product (52%)</text>

  <rect x="946" y="505" width="12" height="12" rx="3" fill="#ec4899"/>
  <text x="966" y="516" fill="#cbd5e1" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">FinTech &amp; BFSI (26%)</text>

  <rect x="746" y="540" width="12" height="12" rx="3" fill="#06b6d4"/>
  <text x="766" y="551" fill="#cbd5e1" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Analytics &amp; Consulting (15%)</text>

  <rect x="946" y="540" width="12" height="12" rx="3" fill="#f59e0b"/>
  <text x="966" y="551" fill="#cbd5e1" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">Core Eng &amp; R&amp;D (7%)</text>

  <!-- Bottom metric pill -->
  <rect x="746" y="585" width="398" height="42" rx="12" fill="#0f172a" stroke="#1e293b"/>
  <text x="766" y="611" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-size="12">⚡ Built with Power BI Desktop &amp; DAX by Ameena Sherin</text>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(__dirname, '..', 'public', 'projects', 'project-placement.png'))
  .then(info => console.log('Generated project-placement.png:', info))
  .catch(err => console.error(err));
