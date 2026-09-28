/**
 * Virtual Electrical Instruments Laboratory - Core Controller
 * Production-Ready Final Pass: Fully Validated, Mathematically & Electrically Accurate
 */

// --- 1. INSTRUMENTS REGISTRY (12 INSTRUMENTS) ---
const INSTRUMENTS_DATA = [
  {
    id: 'voltmeter',
    name: 'Voltmeter',
    category: 'voltage-current',
    categoryName: 'Voltage & Current',
    badge: 'V',
    purpose: 'Measures potential difference across a selected circuit element in a voltage divider network.',
    howTo: [
      'Enter the circuit DC supply voltage (Vs).',
      'Enter the resistance values for divider components R1 and R2.',
      'Select probe measurement location: Across R1 or Across R2.',
      'Choose the voltmeter measurement range (2V, 20V, 200V, or 1000V).',
      'Click "Measure" to compute V = Vs × R_x / (R1 + R2) and observe the step-by-step reading.'
    ]
  },
  {
    id: 'ammeter',
    name: 'Ammeter',
    category: 'voltage-current',
    categoryName: 'Voltage & Current',
    badge: 'A',
    purpose: 'Measures series current flowing through a circuit branch using Ohm\'s Law (I = Vs / R).',
    howTo: [
      'Enter the applied source voltage (Vs).',
      'Enter the total series circuit resistance (R).',
      'Select the ammeter full-scale range (20mA, 200mA, 2A, or 10A).',
      'Click "Measure" to compute loop current I = Vs / R.',
      'Observe the reading, calculation steps, and overload (0L) protection.'
    ]
  },
  {
    id: 'dmm',
    name: 'Digital Multimeter (DMM)',
    category: 'voltage-current',
    categoryName: 'Voltage & Current',
    badge: 'DMM',
    purpose: 'Multi-function bench instrument for measuring DCV, ACV, DCA, Resistance (V/I), Continuity, and Diodes.',
    howTo: [
      'Select the rotary function: DCV, ACV, DCA, Resistance (Ω), Continuity, or Diode test.',
      'Provide the corresponding circuit excitation and component conditions.',
      'Select the proper measurement range.',
      'Click "Measure" to calculate the measured parameter.',
      'Use the "Hold" button to freeze/unfreeze the displayed measurement.'
    ]
  },
  {
    id: 'wattmeter',
    name: 'Wattmeter',
    category: 'power-energy',
    categoryName: 'Power & Energy',
    badge: 'W',
    purpose: 'Measures real active electrical power consumed by a load using P = V × I × cos(φ).',
    howTo: [
      'Enter the circuit RMS Voltage (V) and RMS Current (I).',
      'Enter the circuit operating Power Factor (PF between 0.00 and 1.00).',
      'Select the voltage and current coil measurement ranges.',
      'Click "Measure" to calculate active power P = V × I × PF (W/kW).',
      'Review additional apparent power (VA) and reactive power (VAR) calculations.'
    ]
  },
  {
    id: 'energy-meter',
    name: 'Energy Meter',
    category: 'power-energy',
    categoryName: 'Power & Energy',
    badge: 'kWh',
    purpose: 'Measures cumulative energy consumed: Energy = (V × I × PF × Time) / 1000.',
    howTo: [
      'Enter the load RMS Voltage (V) and Current (I).',
      'Enter the circuit Power Factor (PF) and operating duration in hours.',
      'Select the meter constant (e.g. 3200 imp/kWh).',
      'Click "Measure" to calculate total kilowatt-hours (kWh) and meter pulses.',
      'Observe the simulated digital cyclometer register and calculation formula.'
    ]
  },
  {
    id: 'power-factor-meter',
    name: 'Power Factor Meter',
    category: 'power-energy',
    categoryName: 'Power & Energy',
    badge: 'cosφ',
    purpose: 'Measures the ratio of real power to apparent power: PF = P / (V × I) or PF = cos(φ).',
    howTo: [
      'Choose Method A (from circuit values V, I, P) or Method B (from phase angle φ).',
      'Enter the circuit parameters.',
      'Select load nature: Lagging (Inductive), Leading (Capacitive), or Unity.',
      'Click "Measure" to calculate the power factor.',
      'Inspect the derived power factor value and mathematical proof.'
    ]
  },
  {
    id: 'ohmmeter',
    name: 'Ohmmeter',
    category: 'resistance-components',
    categoryName: 'Resistance & Components',
    badge: 'Ω',
    purpose: 'Measures component resistance from internal test excitation: R = V_test / I_test.',
    howTo: [
      'Enter the internal test voltage (V_test).',
      'Enter the resulting measured test current (I_test).',
      'Select the ohmmeter range (200 Ω to 20 MΩ).',
      'Click "Measure" to compute R = V / I.',
      'Observe open-circuit (0L) and short-circuit conditions.'
    ]
  },
  {
    id: 'lcr-meter',
    name: 'LCR Meter',
    category: 'resistance-components',
    categoryName: 'Resistance & Components',
    badge: 'LCR',
    purpose: 'Measures inductance L = XL / (2πf), capacitance C = 1 / (2πfXC), and resistance R = V / I.',
    howTo: [
      'Select component mode: Inductor (L), Capacitor (C), or Resistor (R).',
      'For L: enter test frequency f and measured reactance XL to calculate L = XL / (2πf).',
      'For C: enter test frequency f and measured reactance XC to calculate C = 1 / (2πfXC).',
      'For R: enter test voltage and current to calculate R = V / I.',
      'Click "Measure" to view calculated component values and Q-factor.'
    ]
  },
  {
    id: 'oscilloscope',
    name: 'Oscilloscope (CRO)',
    category: 'waveforms-signals',
    categoryName: 'Waveforms & Signals',
    badge: 'CRO',
    purpose: 'Observes an incoming electrical signal and calculates waveform-dependent Vpp, Vrms, and Period T = 1 / f.',
    howTo: [
      'Select the input signal waveform type: Sine, Square, or Triangle.',
      'Enter the peak amplitude Vp and signal frequency f.',
      'Adjust Volts/Div and Time/Div scales for screen calibration.',
      'Click "Measure / Update Scope" to generate the trace and compute Vpp, Vrms, and T.',
      'Observe that Vrms correctly adapts: Vp / √2 (Sine), Vp (Square), or Vp / √3 (Triangle).'
    ]
  },
  {
    id: 'function-generator',
    name: 'Function Generator',
    category: 'waveforms-signals',
    categoryName: 'Waveforms & Signals',
    badge: 'FG',
    purpose: 'Source instrument: synthesizes standard test signals (Sine, Square, Triangle, Sawtooth).',
    howTo: [
      'Choose the desired output waveform function.',
      'Set the base frequency and multiplier range.',
      'Set the peak-to-peak amplitude (Vp-p) and DC offset.',
      'Click "Measure / Generate" to simulate signal generation.',
      'Inspect the generated waveform characteristics and real-time output graph.'
    ]
  },
  {
    id: 'frequency-counter',
    name: 'Frequency Counter',
    category: 'waveforms-signals',
    categoryName: 'Waveforms & Signals',
    badge: 'Hz',
    purpose: 'Measures signal repetition rate from counted cycles and gate interval: f = N / T_gate.',
    howTo: [
      'Enter the number of signal cycles counted (N).',
      'Select the measurement gate time interval (T_gate).',
      'Select input coupling (AC or DC).',
      'Click "Measure" to compute f = N / T and signal period T = 1 / f.',
      'Observe the high-precision digital frequency display.'
    ]
  },
  {
    id: 'dc-power-supply',
    name: 'DC Power Supply',
    category: 'power-supply',
    categoryName: 'Power Supply',
    badge: 'DC',
    purpose: 'Source instrument: provides regulated DC voltage/current with automatic CV/CC mode transitions.',
    howTo: [
      'Set the target output voltage (0 to 30 V).',
      'Set the maximum current limit (0.05 to 5.0 A).',
      'Set the connected load resistance (Ω).',
      'Toggle Output to ON and click "Apply / Update".',
      'Observe automatic regulation in Constant Voltage (CV) or Constant Current (CC) mode.'
    ]
  }
];

// --- 2. GLOBAL STATE ---
let currentSection = 'home';
let currentActiveInstrument = null;
let currentFilter = 'all';
let searchQuery = '';
let dmmHold = false;
let dmmHeldData = null;
let psOutputOn = true;

// Helper: Query selector
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// --- 3. TOAST NOTIFICATIONS ---
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// --- 4. NAVIGATION HANDLER ---
function switchSection(sectionId) {
  currentSection = sectionId;
  $$('.page-section').forEach(sec => sec.classList.remove('active'));
  $$('.nav-link').forEach(btn => btn.classList.remove('active'));

  const activeSec = $('#' + sectionId);
  if (activeSec) activeSec.classList.add('active');

  const activeBtn = $(`.nav-link[data-target="${sectionId}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  if (sectionId === 'instruments' && !currentActiveInstrument) {
    backToInstrumentsList();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 5. RENDER INSTRUMENT CARDS (12 INSTRUMENTS) ---
function renderInstrumentGrid() {
  const grid = $('#instrumentGrid');
  if (!grid) return;

  const filtered = INSTRUMENTS_DATA.filter(inst => {
    const matchesCat = currentFilter === 'all' || inst.category === currentFilter;
    const matchesSearch = !searchQuery || 
      inst.name.toLowerCase().includes(searchQuery) ||
      inst.purpose.toLowerCase().includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-search">
        <h4>No Instruments Found</h4>
        <p>No instrument matched your search "${searchQuery}". Please check your search term or select another category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(inst => `
    <div class="instrument-card" data-id="${inst.id}">
      <div>
        <div class="card-top">
          <span class="card-badge">${inst.badge}</span>
          <span class="card-cat-tag">${inst.categoryName}</span>
        </div>
        <h3 class="card-name">${inst.name}</h3>
        <p class="card-purpose">${inst.purpose}</p>
      </div>
      <button class="btn btn-outline" style="width: 100%;" onclick="openInstrumentWorkspace('${inst.id}')">
        Open Instrument
      </button>
    </div>
  `).join('');
}

// --- 6. WORKSPACE OPEN & BACK HANDLERS ---
function openInstrumentWorkspace(instrumentId) {
  const inst = INSTRUMENTS_DATA.find(i => i.id === instrumentId);
  if (!inst) return;

  currentActiveInstrument = inst;
  dmmHold = false;
  dmmHeldData = null;

  switchSection('instruments');

  $('#instrumentsListing').style.display = 'none';
  const ws = $('#instrumentWorkspace');
  ws.classList.add('active');

  $('#wsInstrumentName').textContent = inst.name;
  $('#wsInstrumentCategory').textContent = `${inst.categoryName} • Virtual Laboratory Instrument`;
  $('#wsHowToUseTitle').textContent = inst.name;

  const howToContent = $('#wsHowToUseContent');
  howToContent.innerHTML = `
    <ol>
      ${inst.howTo.map(step => `<li>${step}</li>`).join('')}
    </ol>
  `;

  renderWorkspaceContent(inst);
  measureActiveInstrument();

  window.scrollTo({ top: 120, behavior: 'smooth' });
}

function backToInstrumentsList() {
  currentActiveInstrument = null;
  $('#instrumentsListing').style.display = 'block';
  $('#instrumentWorkspace').classList.remove('active');
  renderInstrumentGrid();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 7. DEDICATED WORKSPACE RENDERERS ---
function renderWorkspaceContent(inst) {
  const controls = $('#wsControlsContainer');
  const display = $('#wsDisplayContainer');

  switch (inst.id) {
    case 'voltmeter':
      renderVoltmeter(controls, display);
      break;
    case 'ammeter':
      renderAmmeter(controls, display);
      break;
    case 'dmm':
      renderDMM(controls, display);
      break;
    case 'wattmeter':
      renderWattmeter(controls, display);
      break;
    case 'energy-meter':
      renderEnergyMeter(controls, display);
      break;
    case 'power-factor-meter':
      renderPowerFactorMeter(controls, display);
      break;
    case 'ohmmeter':
      renderOhmmeter(controls, display);
      break;
    case 'lcr-meter':
      renderLCRMeter(controls, display);
      break;
    case 'oscilloscope':
      renderOscilloscope(controls, display);
      break;
    case 'function-generator':
      renderFunctionGenerator(controls, display);
      break;
    case 'frequency-counter':
      renderFrequencyCounter(controls, display);
      break;
    case 'dc-power-supply':
      renderDCPowerSupply(controls, display);
      break;
    default:
      controls.innerHTML = '<p>Instrument controls under maintenance.</p>';
      display.innerHTML = '';
  }
}

// -------------------------------------------------------------
// 7.1 VOLTMETER (Calculates V = Vs × R_x / (R1 + R2))
// -------------------------------------------------------------
function renderVoltmeter(controls, display) {
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>Circuit Setup:</strong> Two-resistor voltage divider connected across DC source Vs. The voltmeter probes measure potential difference across the chosen resistor.
    </div>
    <div class="section-subtitle">Circuit Source & Components</div>
    <div class="form-group">
      <label for="vm-vs">DC Supply Voltage Vs (V)</label>
      <input type="number" id="vm-vs" min="0" step="0.5" value="12.00" oninput="measureActiveInstrument()">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="vm-r1">Resistor R1 (Ω)</label>
        <input type="number" id="vm-r1" min="0" step="10" value="1000" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="vm-r2">Resistor R2 (Ω)</label>
        <input type="number" id="vm-r2" min="0" step="10" value="2000" oninput="measureActiveInstrument()">
      </div>
    </div>
    <div class="section-subtitle">Measurement Probe Placement</div>
    <div class="form-group">
      <label>Measure Voltage Across:</label>
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" name="vm-loc" value="R2" checked onchange="measureActiveInstrument()"> Across R2
        </label>
        <label class="radio-label">
          <input type="radio" name="vm-loc" value="R1" onchange="measureActiveInstrument()"> Across R1
        </label>
      </div>
    </div>
    <div class="section-subtitle">Voltmeter Scale Range</div>
    <div class="form-group">
      <label for="vm-range">Full-Scale Range</label>
      <select id="vm-range" onchange="measureActiveInstrument()">
        <option value="2">2.000 V</option>
        <option value="20" selected>20.00 V</option>
        <option value="200">200.0 V</option>
        <option value="1000">1000 V</option>
      </select>
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Measure</button>
      <button class="btn btn-secondary" onclick="resetVoltmeter()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>VIRTUAL DC VOLTMETER</span>
        <span class="screen-indicator" id="vm-screen-ind">● READY</span>
      </div>
      <div class="meter-screen-main">
        <div class="screen-readout" id="vm-readout">0.00 V</div>
        <div class="screen-status-line" id="vm-subline">POTENTIAL DIFFERENCE</div>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Mathematical Calculation:</span>
        <span class="calc-formula" id="vm-calc-formula">V = Vs × R2 / (R1 + R2)</span>
        <span class="calc-steps" id="vm-calc-steps">12 × 2000 / (1000 + 2000) = 8.00 V</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Selected Range</span>
          <span class="metric-value" id="vm-meta-range">20.00 V</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Total Resistance</span>
          <span class="metric-value" id="vm-meta-rtot">3000 Ω</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Divider Current</span>
          <span class="metric-value" id="vm-meta-current">4.00 mA</span>
        </div>
      </div>
    </div>
  `;
}

function calculateVoltmeter() {
  const vsInput = $('#vm-vs');
  const r1Input = $('#vm-r1');
  const r2Input = $('#vm-r2');
  const locInput = $('input[name="vm-loc"]:checked');
  const rangeInput = $('#vm-range');
  if (!vsInput || !r1Input || !r2Input || !locInput || !rangeInput) return;

  const vs = parseFloat(vsInput.value);
  const r1 = parseFloat(r1Input.value);
  const r2 = parseFloat(r2Input.value);
  const loc = locInput.value;
  const range = parseFloat(rangeInput.value);

  const readout = $('#vm-readout');
  const subline = $('#vm-subline');
  const ind = $('#vm-screen-ind');
  const calcFormula = $('#vm-calc-formula');
  const calcSteps = $('#vm-calc-steps');
  const metaRange = $('#vm-meta-range');
  const metaRtot = $('#vm-meta-rtot');
  const metaCurrent = $('#vm-meta-current');
  const badge = $('#wsStatusBadge');

  // Strict Validation: Vs >= 0, R1 >= 0, R2 >= 0, R1 + R2 > 0
  if (isNaN(vs) || isNaN(r1) || isNaN(r2) || vs < 0 || r1 < 0 || r2 < 0 || (r1 + r2) <= 0) {
    readout.textContent = 'ERR';
    readout.className = 'screen-readout overload';
    subline.textContent = 'INVALID CIRCUIT CONDITIONS (R1 + R2 MUST BE > 0)';
    calcFormula.textContent = 'Condition Error: Total resistance must be > 0';
    calcSteps.textContent = 'Cannot compute voltage division.';
    metaRtot.textContent = '—';
    metaCurrent.textContent = '—';
    ind.className = 'screen-indicator error';
    ind.textContent = '● ERROR';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● ERROR: INVALID PARAMETERS';
    return;
  }

  const rTotal = r1 + r2;
  const loopCurrent = vs / rTotal; // Amps
  const rx = loc === 'R2' ? r2 : r1;
  const rxName = loc;
  const vMeasured = vs * (rx / rTotal);

  metaRange.textContent = `${range.toFixed(range <= 20 ? 2 : 0)} V`;
  metaRtot.textContent = rTotal >= 1000 ? `${(rTotal / 1000).toFixed(2)} kΩ` : `${rTotal.toFixed(0)} Ω`;
  metaCurrent.textContent = loopCurrent === 0 ? '0.00 mA' : loopCurrent < 0.01 ? `${(loopCurrent * 1000).toFixed(2)} mA` : `${loopCurrent.toFixed(3)} A`;

  calcFormula.textContent = `V_${rxName} = Vs × ${rxName} / (R1 + R2)`;
  calcSteps.textContent = `${vs.toFixed(2)} × ${rx} / (${r1} + ${r2}) = ${vMeasured.toFixed(2)} V`;

  if (vMeasured > range) {
    readout.textContent = '0L';
    readout.className = 'screen-readout overload';
    subline.textContent = `OVER RANGE: Measured ${vMeasured.toFixed(2)}V exceeds ${range}V scale`;
    ind.className = 'screen-indicator error';
    ind.textContent = '● OVER RANGE';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● OVER RANGE / 0L';
  } else {
    const decimals = range <= 2 ? 3 : 2;
    readout.textContent = `${vMeasured.toFixed(decimals)} V DC`;
    readout.className = 'screen-readout';
    subline.textContent = `MEASURED POTENTIAL DIFFERENCE ACROSS ${rxName}`;
    ind.className = 'screen-indicator';
    ind.textContent = '● NORMAL';
    badge.className = 'ws-status-badge status-normal';
    badge.textContent = '● STATUS: NORMAL';
  }
}

function resetVoltmeter() {
  $('#vm-vs').value = '12.00';
  $('#vm-r1').value = '1000';
  $('#vm-r2').value = '2000';
  $('input[name="vm-loc"][value="R2"]').checked = true;
  $('#vm-range').value = '20';
  measureActiveInstrument();
  showToast('Voltmeter reset to default circuit conditions');
}

// -------------------------------------------------------------
// 7.2 AMMETER (Calculates I = Vs / R)
// -------------------------------------------------------------
function renderAmmeter(controls, display) {
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>Circuit Setup:</strong> DC voltage source Vs connected in series with total circuit load resistance R. The ammeter measures loop current I = Vs / R.
    </div>
    <div class="section-subtitle">Circuit Source & Load Conditions</div>
    <div class="form-group">
      <label for="am-vs">DC Supply Voltage Vs (V)</label>
      <input type="number" id="am-vs" min="0" step="0.5" value="12.00" oninput="measureActiveInstrument()">
    </div>
    <div class="form-group">
      <label for="am-r">Total Circuit Resistance R (Ω)</label>
      <input type="number" id="am-r" min="0.01" step="0.5" value="6.0" oninput="measureActiveInstrument()">
    </div>
    <div class="section-subtitle">Ammeter Scale Range</div>
    <div class="form-group">
      <label for="am-range">Full-Scale Range</label>
      <select id="am-range" onchange="measureActiveInstrument()">
        <option value="0.02">20.00 mA</option>
        <option value="0.2">200.0 mA</option>
        <option value="2">2.000 A</option>
        <option value="10" selected>10.00 A</option>
      </select>
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Measure</button>
      <button class="btn btn-secondary" onclick="resetAmmeter()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>VIRTUAL DC AMMETER</span>
        <span class="screen-indicator" id="am-screen-ind">● READY</span>
      </div>
      <div class="meter-screen-main">
        <div class="screen-readout" id="am-readout">0.000 A DC</div>
        <div class="screen-status-line" id="am-subline">SERIES LOOP CURRENT</div>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Mathematical Calculation:</span>
        <span class="calc-formula" id="am-calc-formula">I = Vs / R (Ohm's Law)</span>
        <span class="calc-steps" id="am-calc-steps">12.00 V / 6.00 Ω = 2.000 A</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Selected Range</span>
          <span class="metric-value" id="am-meta-range">10.00 A</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Current in mA</span>
          <span class="metric-value" id="am-meta-ma">2000.0 mA</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Load Power (P = V×I)</span>
          <span class="metric-value" id="am-meta-power">24.00 W</span>
        </div>
      </div>
    </div>
  `;
}

function calculateAmmeter() {
  const vsInput = $('#am-vs');
  const rInput = $('#am-r');
  const rangeInput = $('#am-range');
  if (!vsInput || !rInput || !rangeInput) return;

  const vs = parseFloat(vsInput.value);
  const r = parseFloat(rInput.value);
  const range = parseFloat(rangeInput.value);

  const readout = $('#am-readout');
  const subline = $('#am-subline');
  const ind = $('#am-screen-ind');
  const calcFormula = $('#am-calc-formula');
  const calcSteps = $('#am-calc-steps');
  const metaRange = $('#am-meta-range');
  const metaMa = $('#am-meta-ma');
  const metaPower = $('#am-meta-power');
  const badge = $('#wsStatusBadge');

  if (isNaN(vs) || isNaN(r) || vs < 0 || r <= 0) {
    readout.textContent = 'ERR';
    readout.className = 'screen-readout overload';
    subline.textContent = 'ENTER POSITIVE VOLTAGE AND RESISTANCE > 0';
    calcFormula.textContent = 'Condition Error: R must be > 0';
    calcSteps.textContent = 'Cannot divide by zero resistance.';
    metaMa.textContent = '—';
    metaPower.textContent = '—';
    ind.className = 'screen-indicator error';
    ind.textContent = '● ERROR';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● ERROR: INVALID INPUT';
    return;
  }

  const currentAmps = vs / r;
  const powerWatts = vs * currentAmps;

  metaRange.textContent = range >= 1 ? `${range.toFixed(2)} A` : `${(range * 1000).toFixed(0)} mA`;
  metaMa.textContent = `${(currentAmps * 1000).toFixed(2)} mA`;
  metaPower.textContent = `${powerWatts.toFixed(2)} W`;

  calcFormula.textContent = 'I = Vs / R (Ohm\'s Law) ; P = Vs × I';
  calcSteps.textContent = `I = ${vs.toFixed(2)} V / ${r.toFixed(2)} Ω = ${currentAmps.toFixed(3)} A ; P = ${powerWatts.toFixed(2)} W`;

  if (currentAmps > range) {
    readout.textContent = '0L';
    readout.className = 'screen-readout overload';
    subline.textContent = `OVER RANGE: Measured ${currentAmps.toFixed(3)}A exceeds ${metaRange.textContent} scale`;
    ind.className = 'screen-indicator error';
    ind.textContent = '● OVER RANGE';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● OVER RANGE / 0L';
  } else {
    readout.className = 'screen-readout';
    if (range < 1) {
      readout.textContent = `${(currentAmps * 1000).toFixed(2)} mA DC`;
    } else {
      readout.textContent = `${currentAmps.toFixed(3)} A DC`;
    }
    subline.textContent = 'SERIES LOOP CURRENT MEASURED';
    ind.className = 'screen-indicator';
    ind.textContent = '● NORMAL';
    badge.className = 'ws-status-badge status-normal';
    badge.textContent = '● STATUS: NORMAL';
  }
}

function resetAmmeter() {
  $('#am-vs').value = '12.00';
  $('#am-r').value = '6.0';
  $('#am-range').value = '10';
  measureActiveInstrument();
  showToast('Ammeter reset to default circuit conditions');
}

// -------------------------------------------------------------
// 7.3 DIGITAL MULTIMETER (DMM)
// -------------------------------------------------------------
function renderDMM(controls, display) {
  controls.innerHTML = `
    <div class="section-subtitle">DMM Rotary Function Selector</div>
    <div class="form-group">
      <label for="dmm-mode">Measurement Mode</label>
      <select id="dmm-mode" onchange="onDMMModeChange()">
        <option value="DCV" selected>DC Voltage (Divider Circuit: Vs × R2 / [R1+R2])</option>
        <option value="ACV">AC Voltage (AC Source RMS Divider)</option>
        <option value="DCA">DC Current (Ohm's Law: Vs / R)</option>
        <option value="OHM">Resistance (V_test / I_test)</option>
        <option value="CONT">Continuity Test (Path Resistance ≤ 50 Ω)</option>
        <option value="DIODE">Diode Test (Forward Bias Check)</option>
      </select>
    </div>
    <div id="dmm-dynamic-controls">
      <!-- Dynamically populated based on mode -->
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Measure</button>
      <button class="btn btn-outline" id="btnDmmHold" onclick="toggleDMMHold()">Hold</button>
      <button class="btn btn-secondary" onclick="resetDMM()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span id="dmm-screen-mode">DMM • DC VOLTAGE</span>
        <span class="screen-indicator" id="dmm-screen-ind">● READY</span>
      </div>
      <div class="meter-screen-main">
        <div class="screen-readout" id="dmm-readout">0.00 V</div>
        <div class="screen-status-line" id="dmm-subline">READY FOR MEASUREMENT</div>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">DMM Calculation:</span>
        <span class="calc-formula" id="dmm-calc-formula">V = Vs × R2 / (R1 + R2)</span>
        <span class="calc-steps" id="dmm-calc-steps">12 × 2000 / (1000 + 2000) = 8.00 V</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Function</span>
          <span class="metric-value" id="dmm-meta-func">DCV</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Hold State</span>
          <span class="metric-value" id="dmm-meta-hold">OFF</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Active Scale</span>
          <span class="metric-value" id="dmm-meta-scale">20 V</span>
        </div>
      </div>
    </div>
  `;

  onDMMModeChange();
}

function onDMMModeChange() {
  const mode = $('#dmm-mode').value;
  const dyn = $('#dmm-dynamic-controls');
  if (!dyn) return;

  // Clear HOLD state on mode change to avoid stale frozen readings
  dmmHold = false;
  dmmHeldData = null;
  const holdBtn = $('#btnDmmHold');
  if (holdBtn) {
    holdBtn.classList.remove('btn-primary');
    holdBtn.classList.add('btn-outline');
  }
  const metaHold = $('#dmm-meta-hold');
  if (metaHold) metaHold.textContent = 'OFF';

  if (mode === 'DCV') {
    dyn.innerHTML = `
      <div class="circuit-condition-card">
        ⚡ Measures DC voltage across selected divider resistor from supply Vs.
      </div>
      <div class="form-group">
        <label for="dmm-vs">DC Supply Voltage Vs (V)</label>
        <input type="number" id="dmm-vs" min="0" step="0.5" value="12.00" oninput="measureActiveInstrument()">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="dmm-r1">Resistor R1 (Ω)</label>
          <input type="number" id="dmm-r1" min="0" step="10" value="1000" oninput="measureActiveInstrument()">
        </div>
        <div class="form-group">
          <label for="dmm-r2">Resistor R2 (Ω)</label>
          <input type="number" id="dmm-r2" min="0" step="10" value="2000" oninput="measureActiveInstrument()">
        </div>
      </div>
      <div class="form-group">
        <label>Probe Placement</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="dmm-vloc" value="R2" checked onchange="measureActiveInstrument()"> Across R2
          </label>
          <label class="radio-label">
            <input type="radio" name="dmm-vloc" value="R1" onchange="measureActiveInstrument()"> Across R1
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="dmm-range">Range</label>
        <select id="dmm-range" onchange="measureActiveInstrument()">
          <option value="2">2.000 V</option>
          <option value="20" selected>20.00 V</option>
          <option value="200">200.0 V</option>
          <option value="1000">1000 V</option>
        </select>
      </div>
    `;
  } else if (mode === 'ACV') {
    dyn.innerHTML = `
      <div class="circuit-condition-card">
        ⚡ Measures AC RMS voltage across divider: V_rms = Vs_rms × R_x / (R1 + R2).
      </div>
      <div class="form-group">
        <label for="dmm-vs-ac">AC Supply Voltage Vs (V RMS)</label>
        <input type="number" id="dmm-vs-ac" min="0" step="1" value="230.0" oninput="measureActiveInstrument()">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="dmm-r1-ac">Resistor R1 (Ω)</label>
          <input type="number" id="dmm-r1-ac" min="0" step="10" value="1000" oninput="measureActiveInstrument()">
        </div>
        <div class="form-group">
          <label for="dmm-r2-ac">Resistor R2 (Ω)</label>
          <input type="number" id="dmm-r2-ac" min="0" step="10" value="1000" oninput="measureActiveInstrument()">
        </div>
      </div>
      <div class="form-group">
        <label>Probe Placement</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="dmm-acloc" value="R2" checked onchange="measureActiveInstrument()"> Across R2
          </label>
          <label class="radio-label">
            <input type="radio" name="dmm-acloc" value="R1" onchange="measureActiveInstrument()"> Across R1
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="dmm-range">Range</label>
        <select id="dmm-range" onchange="measureActiveInstrument()">
          <option value="20">20.00 V AC</option>
          <option value="200">200.0 V AC</option>
          <option value="750" selected>750 V AC</option>
        </select>
      </div>
    `;
  } else if (mode === 'DCA') {
    dyn.innerHTML = `
      <div class="circuit-condition-card">
        ⚡ Measures series branch current: I = Vs / R.
      </div>
      <div class="form-group">
        <label for="dmm-vs-dca">Supply Voltage Vs (V)</label>
        <input type="number" id="dmm-vs-dca" min="0" step="0.5" value="12.00" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="dmm-r-dca">Circuit Resistance R (Ω)</label>
        <input type="number" id="dmm-r-dca" min="0.1" step="1" value="24.0" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="dmm-range">Range</label>
        <select id="dmm-range" onchange="measureActiveInstrument()">
          <option value="0.02">20.00 mA</option>
          <option value="0.2">200.0 mA</option>
          <option value="2" selected>2.000 A</option>
          <option value="10">10.00 A</option>
        </select>
      </div>
    `;
  } else if (mode === 'OHM') {
    dyn.innerHTML = `
      <div class="circuit-condition-card">
        ⚡ Measures resistance from internal DMM test ratio: R = V_test / I_test.
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="dmm-vtest">Internal Test Voltage (V)</label>
          <input type="number" id="dmm-vtest" min="0.1" step="0.1" value="3.0" oninput="measureActiveInstrument()">
        </div>
        <div class="form-group">
          <label for="dmm-itest">Measured Test Current (A)</label>
          <input type="number" id="dmm-itest" min="0" step="0.001" value="0.020" oninput="measureActiveInstrument()">
        </div>
      </div>
      <div class="form-group">
        <label for="dmm-range">Range</label>
        <select id="dmm-range" onchange="measureActiveInstrument()">
          <option value="200" selected>200.0 Ω</option>
          <option value="2000">2.000 kΩ</option>
          <option value="20000">20.00 kΩ</option>
          <option value="200000">200.0 kΩ</option>
          <option value="2000000">2.000 MΩ</option>
        </select>
      </div>
    `;
  } else if (mode === 'CONT') {
    dyn.innerHTML = `
      <div class="circuit-condition-card">
        ⚡ Continuity buzzer engages if tested circuit path resistance is ≤ 50 Ω.
      </div>
      <div class="form-group">
        <label for="dmm-rcont">Tested Path Resistance (Ω)</label>
        <input type="number" id="dmm-rcont" min="0" step="0.5" value="1.5" oninput="measureActiveInstrument()">
      </div>
    `;
  } else if (mode === 'DIODE') {
    dyn.innerHTML = `
      <div class="circuit-condition-card">
        ⚡ Applies forward bias test and checks semiconductor junction threshold.
      </div>
      <div class="form-group">
        <label for="dmm-vbias">Applied Test Bias (V)</label>
        <input type="number" id="dmm-vbias" min="0.5" max="5.0" step="0.1" value="3.3" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="dmm-diode-type">Diode Junction Condition</label>
        <select id="dmm-diode-type" onchange="measureActiveInstrument()">
          <option value="0.65" selected>Silicon Diode (1N4007) [Vf ≈ 0.65 V]</option>
          <option value="0.28">Germanium Diode (1N34A) [Vf ≈ 0.28 V]</option>
          <option value="0.22">Schottky Diode (BAT41) [Vf ≈ 0.22 V]</option>
          <option value="1.95">Standard Red LED [Vf ≈ 1.95 V]</option>
          <option value="OL">Reverse Biased / Open Junction [0L]</option>
        </select>
      </div>
    `;
  }

  measureActiveInstrument();
}

function calculateDMM() {
  if (dmmHold && dmmHeldData) {
    return;
  }

  const mode = $('#dmm-mode').value;
  const readout = $('#dmm-readout');
  const subline = $('#dmm-subline');
  const ind = $('#dmm-screen-ind');
  const screenMode = $('#dmm-screen-mode');
  const metaFunc = $('#dmm-meta-func');
  const metaScale = $('#dmm-meta-scale');
  const calcFormula = $('#dmm-calc-formula');
  const calcSteps = $('#dmm-calc-steps');
  const badge = $('#wsStatusBadge');

  metaFunc.textContent = mode;
  screenMode.textContent = `DMM • ${mode}`;

  if (mode === 'DCV') {
    const vsInput = $('#dmm-vs');
    const r1Input = $('#dmm-r1');
    const r2Input = $('#dmm-r2');
    const locInput = $('input[name="dmm-vloc"]:checked');
    const rangeInput = $('#dmm-range');
    if (!vsInput || !r1Input || !r2Input || !locInput || !rangeInput) return;

    const vs = parseFloat(vsInput.value);
    const r1 = parseFloat(r1Input.value);
    const r2 = parseFloat(r2Input.value);
    const loc = locInput.value;
    const range = parseFloat(rangeInput.value);

    metaScale.textContent = `${range} V`;
    if (isNaN(vs) || isNaN(r1) || isNaN(r2) || vs < 0 || r1 < 0 || r2 < 0 || (r1 + r2) <= 0) {
      readout.textContent = 'ERR';
      readout.className = 'screen-readout overload';
      subline.textContent = 'INVALID DIVIDER PARAMETERS (R1+R2 > 0)';
      calcFormula.textContent = 'Condition Error: Total resistance must be > 0';
      calcSteps.textContent = 'Invalid parameters.';
      ind.className = 'screen-indicator error';
      ind.textContent = '● ERROR';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● ERROR: INVALID PARAMETERS';
      return;
    }

    const rx = loc === 'R2' ? r2 : r1;
    const vMeasured = vs * (rx / (r1 + r2));
    calcFormula.textContent = `V_${loc} = Vs × ${loc} / (R1 + R2)`;
    calcSteps.textContent = `${vs.toFixed(2)} × ${rx} / (${r1} + ${r2}) = ${vMeasured.toFixed(2)} V`;

    if (vMeasured > range) {
      readout.textContent = '0L';
      readout.className = 'screen-readout overload';
      subline.textContent = `OVER RANGE: Measured ${vMeasured.toFixed(2)}V exceeds ${range}V scale`;
      ind.className = 'screen-indicator error';
      ind.textContent = '● OVER RANGE';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● OVER RANGE / 0L';
    } else {
      readout.className = 'screen-readout';
      readout.textContent = `${vMeasured.toFixed(range <= 2 ? 3 : 2)} V DC`;
      subline.textContent = `DC VOLTAGE ACROSS ${loc}`;
      ind.className = 'screen-indicator';
      ind.textContent = '● NORMAL';
      badge.className = 'ws-status-badge status-normal';
      badge.textContent = '● STATUS: NORMAL';
    }
  } else if (mode === 'ACV') {
    const vsInput = $('#dmm-vs-ac');
    const r1Input = $('#dmm-r1-ac');
    const r2Input = $('#dmm-r2-ac');
    const locInput = $('input[name="dmm-acloc"]:checked');
    const rangeInput = $('#dmm-range');
    if (!vsInput || !r1Input || !r2Input || !locInput || !rangeInput) return;

    const vs = parseFloat(vsInput.value);
    const r1 = parseFloat(r1Input.value);
    const r2 = parseFloat(r2Input.value);
    const loc = locInput.value;
    const range = parseFloat(rangeInput.value);

    metaScale.textContent = `${range} V AC`;
    if (isNaN(vs) || isNaN(r1) || isNaN(r2) || vs < 0 || r1 < 0 || r2 < 0 || (r1 + r2) <= 0) {
      readout.textContent = 'ERR';
      readout.className = 'screen-readout overload';
      subline.textContent = 'INVALID AC DIVIDER PARAMETERS (R1+R2 > 0)';
      calcFormula.textContent = 'Condition Error';
      calcSteps.textContent = 'Invalid parameters.';
      return;
    }

    const rx = loc === 'R2' ? r2 : r1;
    const vrmsOut = vs * (rx / (r1 + r2));
    calcFormula.textContent = `V_${loc}(RMS) = Vs_rms × ${loc} / (R1 + R2)`;
    calcSteps.textContent = `${vs.toFixed(1)} V × ${rx} / (${r1} + ${r2}) = ${vrmsOut.toFixed(2)} V AC (RMS)`;

    if (vrmsOut > range) {
      readout.textContent = '0L';
      readout.className = 'screen-readout overload';
      subline.textContent = `OVER RANGE: Measured ${vrmsOut.toFixed(2)}V exceeds ${range} V AC scale`;
      ind.className = 'screen-indicator error';
      ind.textContent = '● OVER RANGE';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● OVER RANGE / 0L';
    } else {
      readout.className = 'screen-readout';
      readout.textContent = `${vrmsOut.toFixed(2)} V AC`;
      subline.textContent = `RMS AC VOLTAGE ACROSS ${loc}`;
      ind.className = 'screen-indicator';
      ind.textContent = '● NORMAL';
      badge.className = 'ws-status-badge status-normal';
      badge.textContent = '● STATUS: NORMAL';
    }
  } else if (mode === 'DCA') {
    const vsInput = $('#dmm-vs-dca');
    const rInput = $('#dmm-r-dca');
    const rangeInput = $('#dmm-range');
    if (!vsInput || !rInput || !rangeInput) return;

    const vs = parseFloat(vsInput.value);
    const r = parseFloat(rInput.value);
    const range = parseFloat(rangeInput.value);

    metaScale.textContent = range >= 1 ? `${range} A` : `${range * 1000} mA`;
    if (isNaN(vs) || isNaN(r) || vs < 0 || r <= 0) {
      readout.textContent = 'ERR';
      subline.textContent = 'INVALID VOLTAGE OR RESISTANCE (R MUST BE > 0)';
      return;
    }

    const i = vs / r;
    calcFormula.textContent = 'I = Vs / R (Ohm\'s Law)';
    calcSteps.textContent = `${vs.toFixed(2)} V / ${r.toFixed(2)} Ω = ${i.toFixed(3)} A`;

    if (i > range) {
      readout.textContent = '0L';
      readout.className = 'screen-readout overload';
      subline.textContent = `OVER RANGE: Exceeds ${metaScale.textContent}`;
      ind.className = 'screen-indicator error';
      ind.textContent = '● OVER RANGE';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● OVER RANGE / 0L';
    } else {
      readout.className = 'screen-readout';
      readout.textContent = range < 1 ? `${(i * 1000).toFixed(2)} mA DC` : `${i.toFixed(3)} A DC`;
      subline.textContent = 'DC CURRENT MEASURED';
      ind.className = 'screen-indicator';
      ind.textContent = '● NORMAL';
      badge.className = 'ws-status-badge status-normal';
      badge.textContent = '● STATUS: NORMAL';
    }
  } else if (mode === 'OHM') {
    const vtestInput = $('#dmm-vtest');
    const itestInput = $('#dmm-itest');
    const rangeInput = $('#dmm-range');
    if (!vtestInput || !itestInput || !rangeInput) return;

    const vtest = parseFloat(vtestInput.value);
    const itest = parseFloat(itestInput.value);
    const range = parseFloat(rangeInput.value);

    metaScale.textContent = range >= 1e6 ? `${range / 1e6} MΩ` : range >= 1e3 ? `${range / 1e3} kΩ` : `${range} Ω`;
    if (isNaN(vtest) || isNaN(itest) || vtest < 0 || itest < 0) {
      readout.textContent = 'ERR';
      subline.textContent = 'ENTER POSITIVE V_TEST AND I_TEST';
      return;
    }

    calcFormula.textContent = 'R = V_test / I_test';

    if (itest === 0) {
      readout.textContent = '0L';
      readout.className = 'screen-readout overload';
      subline.textContent = 'OPEN CIRCUIT: NO CURRENT DETECTED';
      calcSteps.textContent = `${vtest} V / 0 A = ∞ (Open Circuit)`;
      ind.className = 'screen-indicator error';
      ind.textContent = '● OPEN';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● OPEN CIRCUIT (0L)';
      return;
    }

    const R = vtest / itest;
    calcSteps.textContent = `${vtest.toFixed(2)} V / ${itest.toFixed(3)} A = ${R.toFixed(1)} Ω`;

    if (R > range) {
      readout.textContent = '0L';
      readout.className = 'screen-readout overload';
      subline.textContent = `OVER RANGE: Exceeds ${metaScale.textContent}`;
      ind.className = 'screen-indicator error';
      ind.textContent = '● OVER RANGE';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● OVER RANGE / 0L';
    } else {
      readout.className = 'screen-readout';
      readout.textContent = R >= 1e3 ? `${(R / 1e3).toFixed(2)} kΩ` : `${R.toFixed(1)} Ω`;
      subline.textContent = 'RESISTANCE MEASURED';
      ind.className = 'screen-indicator';
      ind.textContent = '● NORMAL';
      badge.className = 'ws-status-badge status-normal';
      badge.textContent = '● STATUS: NORMAL';
    }
  } else if (mode === 'CONT') {
    const rcontInput = $('#dmm-rcont');
    if (!rcontInput) return;
    const rcont = parseFloat(rcontInput.value);
    metaScale.textContent = 'Threshold: 50 Ω';
    if (isNaN(rcont) || rcont < 0) {
      readout.textContent = 'ERR';
      return;
    }

    calcFormula.textContent = 'Condition: R_path ≤ 50 Ω ? CONTINUITY : OPEN';
    if (rcont <= 50) {
      readout.textContent = `${rcont.toFixed(1)} Ω`;
      readout.className = 'screen-readout';
      subline.textContent = '🔊 BUZZER ACTIVE: CONTINUITY DETECTED (CLOSED CIRCUIT)';
      calcSteps.textContent = `${rcont.toFixed(1)} Ω ≤ 50 Ω → CLOSED PATH OK`;
      ind.className = 'screen-indicator';
      ind.textContent = '● CLOSED PATH';
      badge.className = 'ws-status-badge status-normal';
      badge.textContent = '● CONTINUITY OK';
    } else {
      readout.textContent = '0L';
      readout.className = 'screen-readout';
      subline.textContent = 'OPEN CIRCUIT (RESISTANCE > 50 Ω)';
      calcSteps.textContent = `${rcont.toFixed(1)} Ω > 50 Ω → OPEN CIRCUIT`;
      ind.className = 'screen-indicator';
      ind.textContent = '● OPEN';
      badge.className = 'ws-status-badge status-warning';
      badge.textContent = '● OPEN CIRCUIT (0L)';
    }
  } else if (mode === 'DIODE') {
    const vbiasInput = $('#dmm-vbias');
    const typeInput = $('#dmm-diode-type');
    if (!vbiasInput || !typeInput) return;
    const vbias = parseFloat(vbiasInput.value);
    const type = typeInput.value;
    metaScale.textContent = '2.000 V Diode Scale';

    if (type === 'OL') {
      readout.textContent = '0L';
      readout.className = 'screen-readout';
      subline.textContent = 'REVERSE BIASED: NO CONDUCTION';
      calcFormula.textContent = 'Junction: Reverse Biased / Infinite Resistance';
      calcSteps.textContent = 'Measured Vf = 0L (Junction Open / Reverse Biased)';
      ind.className = 'screen-indicator';
      ind.textContent = '● REVERSE';
      badge.className = 'ws-status-badge status-normal';
      badge.textContent = '● REVERSE BIASED';
    } else {
      const vf = parseFloat(type);
      if (vbias >= vf) {
        calcFormula.textContent = 'Junction: Forward Biased (V_test ≥ Vf)';
        calcSteps.textContent = `Applied ${vbias.toFixed(1)}V ≥ ${vf.toFixed(2)}V → Clamped at Vf = ${vf.toFixed(3)} V`;
        readout.textContent = `${vf.toFixed(3)} V`;
        readout.className = 'screen-readout';
        subline.textContent = 'FORWARD BIASED / CONDUCTING';
        ind.className = 'screen-indicator';
        ind.textContent = '● CONDUCTING';
        badge.className = 'ws-status-badge status-normal';
        badge.textContent = '● FORWARD BIASED';
      } else {
        calcFormula.textContent = 'Junction: Sub-threshold (V_test < Vf)';
        calcSteps.textContent = `Applied ${vbias.toFixed(1)}V < threshold ${vf.toFixed(2)}V → Non-conducting`;
        readout.textContent = '0L';
        readout.className = 'screen-readout';
        subline.textContent = 'BELOW FORWARD BARRIER THRESHOLD';
        ind.className = 'screen-indicator warning';
        ind.textContent = '● SUB-THRESHOLD';
        badge.className = 'ws-status-badge status-warning';
        badge.textContent = '● SUB-THRESHOLD';
      }
    }
  }
}

function toggleDMMHold() {
  dmmHold = !dmmHold;
  const btn = $('#btnDmmHold');
  const metaHold = $('#dmm-meta-hold');
  if (dmmHold) {
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-outline');
    metaHold.textContent = 'HOLD ON';
    dmmHeldData = true;
    showToast('Display reading frozen (HOLD ON)');
  } else {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
    metaHold.textContent = 'OFF';
    dmmHeldData = null;
    showToast('Display reading unfrozen (HOLD OFF)');
    measureActiveInstrument();
  }
}

function resetDMM() {
  dmmHold = false;
  dmmHeldData = null;
  const btn = $('#btnDmmHold');
  if (btn) {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  }
  $('#dmm-meta-hold').textContent = 'OFF';
  $('#dmm-mode').value = 'DCV';
  onDMMModeChange();
  showToast('Digital Multimeter reset to default values');
}

// -------------------------------------------------------------
// 7.4 WATTMETER (Calculates P = V × I × PF)
// -------------------------------------------------------------
function renderWattmeter(controls, display) {
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>Circuit Excitation:</strong> Single-phase load connected to source with measured RMS voltage V, RMS current I, and circuit displacement power factor cos(φ).
    </div>
    <div class="section-subtitle">Circuit Source & Load Conditions</div>
    <div class="form-row">
      <div class="form-group">
        <label for="wm-v">RMS Voltage V (V)</label>
        <input type="number" id="wm-v" min="0" step="1" value="230" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="wm-i">RMS Current I (A)</label>
        <input type="number" id="wm-i" min="0" step="0.1" value="5.0" oninput="measureActiveInstrument()">
      </div>
    </div>
    <div class="form-group">
      <label for="wm-pf">Power Factor cos(φ) [0.00 to 1.00]</label>
      <input type="number" id="wm-pf" min="0" max="1" step="0.01" value="0.85" oninput="measureActiveInstrument()">
    </div>
    <div class="section-subtitle">Instrument Coil Ranges</div>
    <div class="form-row">
      <div class="form-group">
        <label for="wm-vrange">Voltage Coil Range</label>
        <select id="wm-vrange" onchange="measureActiveInstrument()">
          <option value="150">150 V</option>
          <option value="300" selected>300 V</option>
          <option value="600">600 V</option>
        </select>
      </div>
      <div class="form-group">
        <label for="wm-irange">Current Coil Range</label>
        <select id="wm-irange" onchange="measureActiveInstrument()">
          <option value="5" selected>5.0 A</option>
          <option value="10">10.0 A</option>
        </select>
      </div>
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Measure</button>
      <button class="btn btn-secondary" onclick="resetWattmeter()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>ELECTRODYNAMIC WATTMETER</span>
        <span class="screen-indicator" id="wm-screen-ind">● READY</span>
      </div>
      <div class="meter-screen-main">
        <div class="screen-readout" id="wm-readout">0.00 W</div>
        <div class="screen-status-line" id="wm-subline">REAL ACTIVE POWER</div>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Mathematical Calculation:</span>
        <span class="calc-formula" id="wm-calc-formula">P = V × I × cos(φ)</span>
        <span class="calc-steps" id="wm-calc-steps">230.0 V × 5.00 A × 0.85 = 977.50 W</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Apparent (S = V×I)</span>
          <span class="metric-value" id="wm-meta-s">1150.0 VA</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Reactive (Q)</span>
          <span class="metric-value" id="wm-meta-q">605.8 VAR</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Phase Angle φ</span>
          <span class="metric-value" id="wm-meta-phi">31.8°</span>
        </div>
      </div>
    </div>
  `;
}

function calculateWattmeter() {
  const vInput = $('#wm-v');
  const iInput = $('#wm-i');
  const pfInput = $('#wm-pf');
  const vRangeInput = $('#wm-vrange');
  const iRangeInput = $('#wm-irange');
  if (!vInput || !iInput || !pfInput || !vRangeInput || !iRangeInput) return;

  const v = parseFloat(vInput.value);
  const i = parseFloat(iInput.value);
  const pf = parseFloat(pfInput.value);
  const vRange = parseFloat(vRangeInput.value);
  const iRange = parseFloat(iRangeInput.value);

  const readout = $('#wm-readout');
  const subline = $('#wm-subline');
  const ind = $('#wm-screen-ind');
  const calcFormula = $('#wm-calc-formula');
  const calcSteps = $('#wm-calc-steps');
  const metaS = $('#wm-meta-s');
  const metaQ = $('#wm-meta-q');
  const metaPhi = $('#wm-meta-phi');
  const badge = $('#wsStatusBadge');

  if (isNaN(v) || isNaN(i) || isNaN(pf) || v < 0 || i < 0 || pf < 0 || pf > 1) {
    readout.textContent = 'ERR';
    readout.className = 'screen-readout overload';
    subline.textContent = 'ENTER V ≥ 0, I ≥ 0, AND 0 ≤ PF ≤ 1';
    calcFormula.textContent = 'Validation Error: Check input bounds';
    calcSteps.textContent = 'Invalid input parameters.';
    metaS.textContent = '—';
    metaQ.textContent = '—';
    metaPhi.textContent = '—';
    ind.className = 'screen-indicator error';
    ind.textContent = '● ERROR';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● ERROR: INVALID INPUT';
    return;
  }

  const S = v * i; // Apparent power VA
  const P = S * pf; // Active power W
  const phiRad = Math.acos(pf);
  const phiDeg = (phiRad * 180) / Math.PI;
  const Q = S * Math.sin(phiRad); // Reactive power VAR

  metaS.textContent = `${S.toFixed(1)} VA`;
  metaQ.textContent = `${Q.toFixed(1)} VAR`;
  metaPhi.textContent = `${phiDeg.toFixed(1)}°`;

  calcFormula.textContent = 'P = V × I × cos(φ) ; S = V × I ; Q = S × sin(φ)';
  calcSteps.textContent = `P = ${v.toFixed(1)}V × ${i.toFixed(2)}A × ${pf.toFixed(2)} = ${P.toFixed(2)} W ; Q = ${Q.toFixed(1)} VAR`;

  if (v > vRange || i > iRange) {
    readout.textContent = '0L';
    readout.className = 'screen-readout overload';
    subline.textContent = `COIL OVERLOAD: ${v > vRange ? `Voltage (${v}V > ${vRange}V)` : `Current (${i}A > ${iRange}A)`}`;
    ind.className = 'screen-indicator error';
    ind.textContent = '● OVERLOAD';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● COIL OVERLOAD / 0L';
  } else {
    readout.className = 'screen-readout';
    readout.textContent = P >= 1000 ? `${(P / 1000).toFixed(3)} kW` : `${P.toFixed(2)} W`;
    subline.textContent = 'ACTIVE REAL POWER MEASURED';
    ind.className = 'screen-indicator';
    ind.textContent = '● NORMAL';
    badge.className = 'ws-status-badge status-normal';
    badge.textContent = '● STATUS: NORMAL';
  }
}

function resetWattmeter() {
  $('#wm-v').value = '230';
  $('#wm-i').value = '5.0';
  $('#wm-pf').value = '0.85';
  $('#wm-vrange').value = '300';
  $('#wm-irange').value = '5';
  measureActiveInstrument();
  showToast('Wattmeter reset to default values');
}

// -------------------------------------------------------------
// 7.5 ENERGY METER (Calculates P = V × I × PF; Energy = P × t / 1000)
// -------------------------------------------------------------
function renderEnergyMeter(controls, display) {
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>Circuit Setup:</strong> Load consumes power P = V × I × PF over duration t (hours). Energy = P × Time / 1000 (kWh).
    </div>
    <div class="section-subtitle">Load Operating Conditions</div>
    <div class="form-row">
      <div class="form-group">
        <label for="em-v">Load Voltage V (V)</label>
        <input type="number" id="em-v" min="0" step="1" value="230" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="em-i">Load Current I (A)</label>
        <input type="number" id="em-i" min="0" step="0.1" value="5.0" oninput="measureActiveInstrument()">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="em-pf">Power Factor cos(φ)</label>
        <input type="number" id="em-pf" min="0" max="1" step="0.01" value="0.85" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="em-t">Operating Time (Hours)</label>
        <input type="number" id="em-t" min="0" step="0.5" value="4.0" oninput="measureActiveInstrument()">
      </div>
    </div>
    <div class="section-subtitle">Meter Specification</div>
    <div class="form-group">
      <label for="em-k">Meter Constant</label>
      <select id="em-k" onchange="measureActiveInstrument()">
        <option value="3200" selected>3200 Impulses / kWh</option>
        <option value="1600">1600 Impulses / kWh</option>
        <option value="750">750 Rev / kWh</option>
      </select>
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Measure</button>
      <button class="btn btn-secondary" onclick="resetEnergyMeter()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>SINGLE-PHASE ENERGY METER</span>
        <span class="screen-indicator" id="em-screen-ind">● RECORDING</span>
      </div>
      <div class="meter-screen-main">
        <div class="screen-readout" id="em-readout">0003.91 kWh</div>
        <div class="screen-status-line" id="em-subline">ACCUMULATED ENERGY</div>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Mathematical Calculation:</span>
        <span class="calc-formula" id="em-calc-formula">P = V × I × PF ; Energy = (P × Time) / 1000</span>
        <span class="calc-steps" id="em-calc-steps">P = 230 × 5 × 0.85 = 977.5 W ; E = (977.5 × 4) / 1000 = 3.91 kWh</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Load Power (P)</span>
          <span class="metric-value" id="em-meta-p">977.5 W</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Energy in Wh</span>
          <span class="metric-value" id="em-meta-wh">3910.0 Wh</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Total Pulses</span>
          <span class="metric-value" id="em-meta-pulses">12,512 imp</span>
        </div>
      </div>
    </div>
  `;
}

function calculateEnergyMeter() {
  const vInput = $('#em-v');
  const iInput = $('#em-i');
  const pfInput = $('#em-pf');
  const tInput = $('#em-t');
  const kInput = $('#em-k');
  if (!vInput || !iInput || !pfInput || !tInput || !kInput) return;

  const v = parseFloat(vInput.value);
  const i = parseFloat(iInput.value);
  const pf = parseFloat(pfInput.value);
  const t = parseFloat(tInput.value);
  const k = parseFloat(kInput.value);

  const readout = $('#em-readout');
  const subline = $('#em-subline');
  const ind = $('#em-screen-ind');
  const calcFormula = $('#em-calc-formula');
  const calcSteps = $('#em-calc-steps');
  const metaP = $('#em-meta-p');
  const metaWh = $('#em-meta-wh');
  const metaPulses = $('#em-meta-pulses');
  const badge = $('#wsStatusBadge');

  if (isNaN(v) || isNaN(i) || isNaN(pf) || isNaN(t) || v < 0 || i < 0 || pf < 0 || pf > 1 || t < 0) {
    readout.textContent = 'ERR';
    readout.className = 'screen-readout overload';
    subline.textContent = 'ENTER NON-NEGATIVE VOLTAGE, CURRENT, TIME, AND 0 ≤ PF ≤ 1';
    calcFormula.textContent = 'Validation Error: Check input conditions';
    calcSteps.textContent = 'Cannot compute energy.';
    metaP.textContent = '—';
    metaWh.textContent = '—';
    metaPulses.textContent = '—';
    ind.className = 'screen-indicator error';
    ind.textContent = '● ERROR';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● ERROR: INVALID PARAMETERS';
    return;
  }

  // 1. Calculate Active Power P = V * I * PF (W)
  const P = v * i * pf;
  // 2. Calculate Energy = (P * t) / 1000 (kWh)
  const kWh = (P * t) / 1000;
  const Wh = P * t;
  const pulses = Math.round(kWh * k);

  metaP.textContent = P >= 1000 ? `${(P / 1000).toFixed(3)} kW` : `${P.toFixed(1)} W`;
  metaWh.textContent = `${Wh.toFixed(1)} Wh`;
  metaPulses.textContent = `${pulses.toLocaleString()} imp`;

  calcFormula.textContent = 'P = V × I × PF ; Energy = (P × Time) / 1000';
  calcSteps.textContent = `P = ${v.toFixed(1)}V × ${i.toFixed(2)}A × ${pf.toFixed(2)} = ${P.toFixed(1)} W ; E = (${P.toFixed(1)} W × ${t.toFixed(2)} h) / 1000 = ${kWh.toFixed(2)} kWh`;

  const formatted = kWh.toFixed(2).padStart(7, '0');
  readout.className = 'screen-readout';
  readout.textContent = `${formatted} kWh`;

  if (t === 0) {
    subline.textContent = 'STANDBY: 0.0 HOURS ELAPSED (NO ENERGY RECORDED)';
    ind.className = 'screen-indicator';
    ind.textContent = '● STANDBY';
    badge.className = 'ws-status-badge status-normal';
    badge.textContent = '● STATUS: STANDBY';
  } else {
    subline.textContent = `ACCUMULATED OVER ${t.toFixed(1)} HOURS OF OPERATION`;
    ind.className = 'screen-indicator';
    ind.textContent = '● RECORDING';
    badge.className = 'ws-status-badge status-normal';
    badge.textContent = '● ENERGY ACCUMULATED';
  }
}

function resetEnergyMeter() {
  $('#em-v').value = '230';
  $('#em-i').value = '5.0';
  $('#em-pf').value = '0.85';
  $('#em-t').value = '4.0';
  $('#em-k').value = '3200';
  measureActiveInstrument();
  showToast('Energy meter reset to default values');
}

// -------------------------------------------------------------
// 7.6 POWER FACTOR METER (Methods A: P / (V×I) and B: cos(φ))
// -------------------------------------------------------------
function renderPowerFactorMeter(controls, display) {
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>Operating Principle:</strong> Determines displacement ratio PF = P / (V × I) or PF = cos(φ) and load characteristic.
    </div>
    <div class="section-subtitle">Measurement Method</div>
    <div class="form-group">
      <label>Method</label>
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" name="pf-method" value="vip" checked onchange="onPFMethodChange()"> Method A: Load Values (V, I, P)
        </label>
        <label class="radio-label">
          <input type="radio" name="pf-method" value="angle" onchange="onPFMethodChange()"> Method B: Phase Angle (φ)
        </label>
      </div>
    </div>
    <div id="pf-inputs-container">
      <!-- Dynamically filled -->
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Measure PF</button>
      <button class="btn btn-secondary" onclick="resetPowerFactorMeter()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>ELECTRODYNAMIC POWER FACTOR METER</span>
        <span class="screen-indicator" id="pf-screen-ind">● BALANCED</span>
      </div>
      <div class="meter-screen-main">
        <div class="screen-readout" id="pf-readout">0.850 Lagging</div>
        <div class="screen-status-line" id="pf-subline">POWER FACTOR RATIO</div>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Mathematical Calculation:</span>
        <span class="calc-formula" id="pf-calc-formula">PF = P / (V × I)</span>
        <span class="calc-steps" id="pf-calc-steps">977.5 W / (230 V × 5 A) = 0.850</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Phase Angle φ</span>
          <span class="metric-value" id="pf-meta-angle">31.8°</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Apparent Power (S)</span>
          <span class="metric-value" id="pf-meta-s">1150.0 VA</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Load Characteristic</span>
          <span class="metric-value" id="pf-meta-load">Inductive (Lagging)</span>
        </div>
      </div>
    </div>
  `;

  onPFMethodChange();
}

function onPFMethodChange() {
  const method = $('input[name="pf-method"]:checked').value;
  const container = $('#pf-inputs-container');
  if (!container) return;

  if (method === 'vip') {
    container.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label for="pf-v">RMS Voltage V (V)</label>
          <input type="number" id="pf-v" min="0.1" step="1" value="230" oninput="measureActiveInstrument()">
        </div>
        <div class="form-group">
          <label for="pf-i">RMS Current I (A)</label>
          <input type="number" id="pf-i" min="0.1" step="0.1" value="5.0" oninput="measureActiveInstrument()">
        </div>
      </div>
      <div class="form-group">
        <label for="pf-p">Real Active Power P (W)</label>
        <input type="number" id="pf-p" min="0" step="5" value="977.5" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label>Load Nature</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="pf-nature" value="Lagging" checked onchange="measureActiveInstrument()"> Lagging (Inductive)
          </label>
          <label class="radio-label">
            <input type="radio" name="pf-nature" value="Leading" onchange="measureActiveInstrument()"> Leading (Capacitive)
          </label>
          <label class="radio-label">
            <input type="radio" name="pf-nature" value="Unity" onchange="measureActiveInstrument()"> Unity
          </label>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="form-group">
        <label for="pf-angle">Phase Angle φ between V and I (degrees) [0° to 90°]</label>
        <input type="number" id="pf-angle" min="0" max="90" step="0.5" value="31.8" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label>Load Nature</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="pf-nature" value="Lagging" checked onchange="measureActiveInstrument()"> Lagging (Inductive)
          </label>
          <label class="radio-label">
            <input type="radio" name="pf-nature" value="Leading" onchange="measureActiveInstrument()"> Leading (Capacitive)
          </label>
          <label class="radio-label">
            <input type="radio" name="pf-nature" value="Unity" onchange="measureActiveInstrument()"> Unity
          </label>
        </div>
      </div>
    `;
  }
  measureActiveInstrument();
}

function calculatePowerFactorMeter() {
  const methodInput = $('input[name="pf-method"]:checked');
  if (!methodInput) return;
  const method = methodInput.value;
  let nature = $('input[name="pf-nature"]:checked')?.value || 'Lagging';

  const readout = $('#pf-readout');
  const subline = $('#pf-subline');
  const ind = $('#pf-screen-ind');
  const calcFormula = $('#pf-calc-formula');
  const calcSteps = $('#pf-calc-steps');
  const metaAngle = $('#pf-meta-angle');
  const metaS = $('#pf-meta-s');
  const metaLoad = $('#pf-meta-load');
  const badge = $('#wsStatusBadge');

  let pf = 1.0;
  let angleDeg = 0.0;
  let apparentPower = 0;

  if (method === 'vip') {
    const v = parseFloat($('#pf-v').value);
    const i = parseFloat($('#pf-i').value);
    const p = parseFloat($('#pf-p').value);

    if (isNaN(v) || isNaN(i) || isNaN(p) || v <= 0 || i <= 0 || p < 0) {
      readout.textContent = 'ERR';
      readout.className = 'screen-readout overload';
      subline.textContent = 'ENTER POSITIVE VOLTAGE, CURRENT, AND POWER';
      calcFormula.textContent = 'Validation Error: Check input conditions';
      calcSteps.textContent = 'Invalid parameters.';
      metaAngle.textContent = '—';
      metaS.textContent = '—';
      metaLoad.textContent = '—';
      ind.className = 'screen-indicator error';
      ind.textContent = '● ERROR';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● ERROR';
      return;
    }

    apparentPower = v * i;
    if (p > apparentPower + 0.1) {
      readout.textContent = 'ERR';
      readout.className = 'screen-readout overload';
      subline.textContent = 'REAL POWER P CANNOT EXCEED APPARENT POWER S = V × I';
      calcFormula.textContent = 'Constraint Violation: P > S = V × I';
      calcSteps.textContent = `P (${p.toFixed(1)} W) > S (${apparentPower.toFixed(1)} VA) is physically impossible!`;
      metaAngle.textContent = '—';
      metaS.textContent = `${apparentPower.toFixed(1)} VA`;
      ind.className = 'screen-indicator error';
      ind.textContent = '● P > S ERROR';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● ERROR: P > VI';
      return;
    }

    pf = Math.min(1.0, p / apparentPower);
    angleDeg = (Math.acos(pf) * 180) / Math.PI;

    calcFormula.textContent = 'PF = P / (V × I) ; φ = acos(PF)';
    calcSteps.textContent = `PF = ${p.toFixed(1)} W / (${v.toFixed(1)} V × ${i.toFixed(2)} A) = ${pf.toFixed(3)} ; φ = ${angleDeg.toFixed(1)}°`;
  } else {
    angleDeg = parseFloat($('#pf-angle').value);
    if (isNaN(angleDeg) || angleDeg < 0 || angleDeg > 90) {
      readout.textContent = 'ERR';
      readout.className = 'screen-readout overload';
      subline.textContent = 'ENTER ANGLE BETWEEN 0° AND 90°';
      calcFormula.textContent = 'Validation Error: 0° ≤ φ ≤ 90°';
      calcSteps.textContent = 'Invalid phase angle.';
      ind.className = 'screen-indicator error';
      ind.textContent = '● ERROR';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● ERROR';
      return;
    }
    const rad = (angleDeg * Math.PI) / 180;
    pf = Math.cos(rad);
    apparentPower = 0;

    calcFormula.textContent = 'PF = cos(φ)';
    calcSteps.textContent = `PF = cos(${angleDeg.toFixed(1)}°) = ${pf.toFixed(3)}`;
  }

  if (pf >= 0.999 || angleDeg <= 0.1) {
    nature = 'Unity';
  }

  metaAngle.textContent = `${angleDeg.toFixed(1)}°`;
  metaS.textContent = apparentPower > 0 ? `${apparentPower.toFixed(1)} VA` : '—';
  metaLoad.textContent = nature === 'Lagging' ? 'Inductive (Lagging)' : nature === 'Leading' ? 'Capacitive (Leading)' : 'Resistive (Unity)';

  readout.className = 'screen-readout';
  readout.textContent = `${pf.toFixed(3)} ${nature}`;
  subline.textContent = `DISPLACEMENT POWER FACTOR: cos(${angleDeg.toFixed(1)}°)`;
  ind.className = 'screen-indicator';
  ind.textContent = '● BALANCED';

  badge.className = 'ws-status-badge status-normal';
  badge.textContent = `● PF: ${pf.toFixed(3)} (${nature.toUpperCase()})`;
}

function resetPowerFactorMeter() {
  const methodRadio = $('input[name="pf-method"][value="vip"]');
  if (methodRadio) methodRadio.checked = true;
  onPFMethodChange();
  const natureRadio = $('input[name="pf-nature"][value="Lagging"]');
  if (natureRadio) natureRadio.checked = true;
  $('#pf-v').value = '230';
  $('#pf-i').value = '5.0';
  $('#pf-p').value = '977.5';
  measureActiveInstrument();
  showToast('Power factor meter reset to default values');
}

// -------------------------------------------------------------
// 7.7 OHMMETER (Calculates R = V / I)
// -------------------------------------------------------------
function renderOhmmeter(controls, display) {
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>Operating Principle:</strong> The ohmmeter injects an internal test voltage V_test and measures resulting loop current I_test. Resistance is calculated using R = V_test / I_test.
    </div>
    <div class="section-subtitle">Internal Test Conditions</div>
    <div class="form-row">
      <div class="form-group">
        <label for="ohm-v">Test Voltage V_test (V)</label>
        <input type="number" id="ohm-v" min="0" step="0.5" value="3.0" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="ohm-i">Measured Test Current I_test</label>
        <input type="number" id="ohm-i" min="0" step="0.001" value="0.020" oninput="measureActiveInstrument()">
      </div>
    </div>
    <div class="form-group">
      <label for="ohm-iunit">Current Unit</label>
      <select id="ohm-iunit" onchange="measureActiveInstrument()">
        <option value="1" selected>Amperes (A)</option>
        <option value="0.001">Milliamperes (mA)</option>
      </select>
    </div>
    <div class="section-subtitle">Ohmmeter Range</div>
    <div class="form-group">
      <label for="ohm-range">Full-Scale Range</label>
      <select id="ohm-range" onchange="measureActiveInstrument()">
        <option value="200" selected>200.0 Ω</option>
        <option value="2000">2.000 kΩ</option>
        <option value="20000">20.00 kΩ</option>
        <option value="200000">200.0 kΩ</option>
        <option value="2000000">2.000 MΩ</option>
        <option value="20000000">20.00 MΩ</option>
      </select>
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Measure</button>
      <button class="btn btn-secondary" onclick="resetOhmmeter()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>PRECISION OHMMETER</span>
        <span class="screen-indicator" id="ohm-screen-ind">● READY</span>
      </div>
      <div class="meter-screen-main">
        <div class="screen-readout" id="ohm-readout">150.0 Ω</div>
        <div class="screen-status-line" id="ohm-subline">RESISTANCE DERIVED FROM V / I</div>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Mathematical Calculation:</span>
        <span class="calc-formula" id="ohm-calc-formula">R = V_test / I_test</span>
        <span class="calc-steps" id="ohm-calc-steps">3.00 V / 0.020 A = 150.0 Ω</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Selected Range</span>
          <span class="metric-value" id="ohm-meta-range">200.0 Ω</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Circuit State</span>
          <span class="metric-value" id="ohm-meta-state">Closed Circuit</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Test Power (P = V×I)</span>
          <span class="metric-value" id="ohm-meta-p">0.060 W</span>
        </div>
      </div>
    </div>
  `;
}

function calculateOhmmeter() {
  const vInput = $('#ohm-v');
  const iInput = $('#ohm-i');
  const iUnitInput = $('#ohm-iunit');
  const rangeInput = $('#ohm-range');
  if (!vInput || !iInput || !iUnitInput || !rangeInput) return;

  const v = parseFloat(vInput.value);
  const rawI = parseFloat(iInput.value);
  const iUnit = parseFloat(iUnitInput.value);
  const range = parseFloat(rangeInput.value);

  const readout = $('#ohm-readout');
  const subline = $('#ohm-subline');
  const ind = $('#ohm-screen-ind');
  const calcFormula = $('#ohm-calc-formula');
  const calcSteps = $('#ohm-calc-steps');
  const metaRange = $('#ohm-meta-range');
  const metaState = $('#ohm-meta-state');
  const metaP = $('#ohm-meta-p');
  const badge = $('#wsStatusBadge');

  if (isNaN(v) || isNaN(rawI) || v < 0 || rawI < 0) {
    readout.textContent = 'ERR';
    readout.className = 'screen-readout overload';
    subline.textContent = 'ENTER NON-NEGATIVE VOLTAGE AND CURRENT';
    calcFormula.textContent = 'Validation Error: Values must be ≥ 0';
    calcSteps.textContent = 'Invalid parameters.';
    metaState.textContent = 'Error';
    metaP.textContent = '—';
    ind.className = 'screen-indicator error';
    ind.textContent = '● ERROR';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● ERROR: INVALID INPUT';
    return;
  }

  const iAmps = rawI * iUnit;
  metaRange.textContent = range >= 1e6 ? `${range / 1e6} MΩ` : range >= 1e3 ? `${range / 1e3} kΩ` : `${range} Ω`;

  calcFormula.textContent = 'R = V_test / I_test ; P_test = V_test × I_test';

  if (iAmps === 0) {
    readout.textContent = '0L';
    readout.className = 'screen-readout overload';
    subline.textContent = 'OPEN CIRCUIT: NO CURRENT DETECTED';
    calcSteps.textContent = `${v.toFixed(2)} V / 0 A = ∞ Ω (Open Circuit / 0L)`;
    ind.className = 'screen-indicator error';
    ind.textContent = '● OPEN';
    metaState.textContent = 'Open Circuit';
    metaP.textContent = '0.00 W';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● OPEN CIRCUIT (0L)';
    return;
  }

  const R = v / iAmps;
  const P = v * iAmps;
  metaP.textContent = P >= 1 ? `${P.toFixed(2)} W` : `${(P * 1000).toFixed(1)} mW`;

  calcSteps.textContent = `R = ${v.toFixed(2)} V / ${iAmps.toFixed(4)} A = ${R.toFixed(1)} Ω ; P = ${metaP.textContent}`;

  if (R > range) {
    readout.textContent = '0L';
    readout.className = 'screen-readout overload';
    subline.textContent = `OVER RANGE: Measured ${R.toFixed(1)}Ω exceeds ${metaRange.textContent} scale`;
    ind.className = 'screen-indicator error';
    ind.textContent = '● OVER RANGE';
    metaState.textContent = 'Over Range';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● OVER RANGE / 0L';
  } else if (R < 0.05) {
    readout.className = 'screen-readout';
    readout.textContent = '0.00 Ω';
    subline.textContent = 'SHORT CIRCUIT DETECTED (R ≈ 0 Ω)';
    metaState.textContent = 'Short Circuit';
    ind.className = 'screen-indicator';
    ind.textContent = '● SHORT';
    badge.className = 'ws-status-badge status-normal';
    badge.textContent = '● SHORT CIRCUIT';
  } else {
    readout.className = 'screen-readout';
    if (R >= 1e6) {
      readout.textContent = `${(R / 1e6).toFixed(3)} MΩ`;
    } else if (R >= 1e3) {
      readout.textContent = `${(R / 1e3).toFixed(2)} kΩ`;
    } else {
      readout.textContent = `${R.toFixed(1)} Ω`;
    }
    subline.textContent = 'RESISTANCE MEASURED';
    ind.className = 'screen-indicator';
    ind.textContent = '● NORMAL';
    metaState.textContent = 'Closed Circuit';
    badge.className = 'ws-status-badge status-normal';
    badge.textContent = '● STATUS: NORMAL';
  }
}

function resetOhmmeter() {
  $('#ohm-v').value = '3.0';
  $('#ohm-i').value = '0.020';
  $('#ohm-iunit').value = '1';
  $('#ohm-range').value = '200';
  measureActiveInstrument();
  showToast('Ohmmeter reset to default values');
}

// -------------------------------------------------------------
// 7.8 LCR METER (Inductor L = XL / 2πf, Capacitor C = 1 / 2πfXC, Resistor R = V / I)
// -------------------------------------------------------------
function renderLCRMeter(controls, display) {
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>AC Component Bridge:</strong> Measures primary element parameters using AC excitation: L = XL / (2πf), C = 1 / (2πfXC), and R = V / I.
    </div>
    <div class="section-subtitle">Component Under Test</div>
    <div class="form-group">
      <label for="lcr-mode">Component Type</label>
      <select id="lcr-mode" onchange="onLCRModeChange()">
        <option value="L" selected>Inductor: L = XL / (2πf)</option>
        <option value="C">Capacitor: C = 1 / (2πfXC)</option>
        <option value="R">Resistor: R = V / I</option>
      </select>
    </div>
    <div id="lcr-dyn-inputs">
      <!-- Dynamic inputs -->
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Measure Component</button>
      <button class="btn btn-secondary" onclick="resetLCRMeter()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>DIGITAL LCR COMPONENT BRIDGE</span>
        <span class="screen-indicator" id="lcr-screen-ind">● BALANCED</span>
      </div>
      <div class="meter-screen-main">
        <div class="screen-readout" id="lcr-readout">10.00 mH</div>
        <div class="screen-status-line" id="lcr-subline">CALCULATED INDUCTANCE</div>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Mathematical Calculation:</span>
        <span class="calc-formula" id="lcr-calc-formula">L = XL / (2π × f)</span>
        <span class="calc-steps" id="lcr-calc-steps">62.83 Ω / (2π × 1000 Hz) = 10.00 mH</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label" id="lcr-metric1-lbl">Quality Factor (Q)</span>
          <span class="metric-value" id="lcr-meta-q">31.42</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label" id="lcr-metric2-lbl">Reactance / ESR</span>
          <span class="metric-value" id="lcr-meta-x">XL: 62.83 Ω</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Test Frequency</span>
          <span class="metric-value" id="lcr-meta-freq">1.00 kHz</span>
        </div>
      </div>
    </div>
  `;

  onLCRModeChange();
}

function onLCRModeChange() {
  const mode = $('#lcr-mode').value;
  const dyn = $('#lcr-dyn-inputs');
  if (!dyn) return;

  if (mode === 'L') {
    dyn.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label for="lcr-f">Test Frequency f (Hz)</label>
          <input type="number" id="lcr-f" min="1" step="100" value="1000" oninput="measureActiveInstrument()">
        </div>
        <div class="form-group">
          <label for="lcr-xl">Measured Reactance XL (Ω)</label>
          <input type="number" id="lcr-xl" min="0.01" step="1" value="62.83" oninput="measureActiveInstrument()">
        </div>
      </div>
      <div class="form-group">
        <label for="lcr-esr">Series Resistance ESR (Ω)</label>
        <input type="number" id="lcr-esr" min="0.01" step="0.5" value="2.0" oninput="measureActiveInstrument()">
      </div>
    `;
  } else if (mode === 'C') {
    dyn.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label for="lcr-f">Test Frequency f (Hz)</label>
          <input type="number" id="lcr-f" min="1" step="100" value="1000" oninput="measureActiveInstrument()">
        </div>
        <div class="form-group">
          <label for="lcr-xc">Measured Reactance XC (Ω)</label>
          <input type="number" id="lcr-xc" min="0.01" step="10" value="1591.55" oninput="measureActiveInstrument()">
        </div>
      </div>
      <div class="form-group">
        <label for="lcr-esr">Series Resistance ESR (Ω)</label>
        <input type="number" id="lcr-esr" min="0.01" step="0.5" value="1.5" oninput="measureActiveInstrument()">
      </div>
    `;
  } else {
    dyn.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label for="lcr-v">Test Voltage V (V)</label>
          <input type="number" id="lcr-v" min="0.1" step="0.5" value="5.0" oninput="measureActiveInstrument()">
        </div>
        <div class="form-group">
          <label for="lcr-i">Test Current I (A)</label>
          <input type="number" id="lcr-i" min="0.0001" step="0.001" value="0.005" oninput="measureActiveInstrument()">
        </div>
      </div>
    `;
  }

  measureActiveInstrument();
}

function calculateLCRMeter() {
  const mode = $('#lcr-mode').value;
  const readout = $('#lcr-readout');
  const subline = $('#lcr-subline');
  const ind = $('#lcr-screen-ind');
  const calcFormula = $('#lcr-calc-formula');
  const calcSteps = $('#lcr-calc-steps');
  const metric1Lbl = $('#lcr-metric1-lbl');
  const metric2Lbl = $('#lcr-metric2-lbl');
  const metaQ = $('#lcr-meta-q');
  const metaX = $('#lcr-meta-x');
  const metaFreq = $('#lcr-meta-freq');
  const badge = $('#wsStatusBadge');

  if (mode === 'L') {
    const f = parseFloat($('#lcr-f').value);
    const xl = parseFloat($('#lcr-xl').value);
    const esr = parseFloat($('#lcr-esr').value) || 0.1;

    if (isNaN(f) || isNaN(xl) || f <= 0 || xl <= 0 || esr <= 0) {
      readout.textContent = 'ERR';
      readout.className = 'screen-readout overload';
      subline.textContent = 'ENTER POSITIVE FREQUENCY, REACTANCE, AND ESR';
      calcFormula.textContent = 'Validation Error: Positive values required';
      calcSteps.textContent = 'Cannot compute inductance.';
      ind.className = 'screen-indicator error';
      ind.textContent = '● ERROR';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● ERROR';
      return;
    }

    const L = xl / (2 * Math.PI * f); // Henries
    const Q = Math.round((xl / esr) * 100) / 100;

    calcFormula.textContent = 'L = XL / (2π × f) ; Q = XL / ESR';
    calcSteps.textContent = `L = ${xl.toFixed(2)} Ω / (2π × ${f} Hz) = ${(L * 1000).toFixed(2)} mH ; Q = ${Q.toFixed(2)}`;

    readout.className = 'screen-readout';
    if (L >= 1) readout.textContent = `${L.toFixed(3)} H`;
    else if (L >= 0.001) readout.textContent = `${(L * 1000).toFixed(2)} mH`;
    else readout.textContent = `${(L * 1e6).toFixed(1)} µH`;

    subline.textContent = `INDUCTANCE DERIVED FROM XL @ ${f} Hz`;
    metric1Lbl.textContent = 'Quality Factor (Q)';
    metric2Lbl.textContent = 'Reactance / ESR';
    metaQ.textContent = Q.toFixed(2);
    metaX.textContent = `XL: ${xl.toFixed(2)} Ω`;
    metaFreq.textContent = f >= 1000 ? `${(f / 1000).toFixed(2)} kHz` : `${f} Hz`;
  } else if (mode === 'C') {
    const f = parseFloat($('#lcr-f').value);
    const xc = parseFloat($('#lcr-xc').value);
    const esr = parseFloat($('#lcr-esr').value) || 0.1;

    if (isNaN(f) || isNaN(xc) || f <= 0 || xc <= 0 || esr <= 0) {
      readout.textContent = 'ERR';
      readout.className = 'screen-readout overload';
      subline.textContent = 'ENTER POSITIVE FREQUENCY, REACTANCE, AND ESR';
      calcFormula.textContent = 'Validation Error: Positive values required';
      calcSteps.textContent = 'Cannot compute capacitance.';
      ind.className = 'screen-indicator error';
      ind.textContent = '● ERROR';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● ERROR';
      return;
    }

    const C = 1 / (2 * Math.PI * f * xc); // Farads
    const D = 2 * Math.PI * f * C * esr;
    const Q = 1 / Math.max(0.0001, D);

    calcFormula.textContent = 'C = 1 / (2π × f × XC) ; D = 2π × f × C × ESR';
    calcSteps.textContent = `C = 1 / (2π × ${f} × ${xc.toFixed(2)}) = ${(C * 1e9).toFixed(1)} nF ; D = ${D.toFixed(4)}`;

    readout.className = 'screen-readout';
    if (C >= 1e-6) readout.textContent = `${(C * 1e6).toFixed(2)} µF`;
    else if (C >= 1e-9) readout.textContent = `${(C * 1e9).toFixed(1)} nF`;
    else readout.textContent = `${(C * 1e12).toFixed(1)} pF`;

    subline.textContent = `CAPACITANCE DERIVED FROM XC @ ${f} Hz`;
    metric1Lbl.textContent = 'Dissipation (D)';
    metric2Lbl.textContent = 'Reactance / ESR';
    metaQ.textContent = D.toFixed(4);
    metaX.textContent = `XC: ${xc.toFixed(2)} Ω`;
    metaFreq.textContent = f >= 1000 ? `${(f / 1000).toFixed(2)} kHz` : `${f} Hz`;
  } else {
    const v = parseFloat($('#lcr-v').value);
    const i = parseFloat($('#lcr-i').value);

    if (isNaN(v) || isNaN(i) || v <= 0 || i <= 0) {
      readout.textContent = 'ERR';
      readout.className = 'screen-readout overload';
      subline.textContent = 'ENTER POSITIVE VOLTAGE AND CURRENT';
      calcFormula.textContent = 'Validation Error';
      calcSteps.textContent = 'Cannot compute resistance.';
      ind.className = 'screen-indicator error';
      ind.textContent = '● ERROR';
      badge.className = 'ws-status-badge status-danger';
      badge.textContent = '● ERROR';
      return;
    }

    const R = v / i;
    calcFormula.textContent = 'R = V / I (Ohm\'s Law)';
    calcSteps.textContent = `R = ${v.toFixed(2)} V / ${i.toFixed(4)} A = ${R.toFixed(1)} Ω`;

    readout.className = 'screen-readout';
    readout.textContent = R >= 1000 ? `${(R / 1000).toFixed(2)} kΩ` : `${R.toFixed(1)} Ω`;
    subline.textContent = 'RESISTANCE DERIVED FROM V / I';
    metric1Lbl.textContent = 'Phase Angle';
    metric2Lbl.textContent = 'ESR Equivalent';
    metaQ.textContent = '0.0° (Pure R)';
    metaX.textContent = '0.0 Ω';
    metaFreq.textContent = 'DC / AC Test';
  }

  ind.className = 'screen-indicator';
  ind.textContent = '● BALANCED';
  badge.className = 'ws-status-badge status-normal';
  badge.textContent = '● MEASUREMENT COMPLETE';
}

function resetLCRMeter() {
  $('#lcr-mode').value = 'L';
  onLCRModeChange();
  showToast('LCR meter reset to default values');
}

// -------------------------------------------------------------
// 7.9 OSCILLOSCOPE (CRO - Waveform-dependent RMS calculation)
// -------------------------------------------------------------
function renderOscilloscope(controls, display) {
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>Signal Observation:</strong> Automatic waveform-dependent calculation: Vpp = 2 × Vp, Vrms = Vp / √2 (Sine), Vp (Square), or Vp / √3 (Triangle), and Period T = 1 / f.
    </div>
    <div class="section-subtitle">Incoming Signal Parameters</div>
    <div class="form-group">
      <label for="cro-wave">Waveform Function</label>
      <select id="cro-wave" onchange="measureActiveInstrument()">
        <option value="sine" selected>Sine Wave (Vrms = Vp / √2)</option>
        <option value="square">Square Wave (Vrms = Vp)</option>
        <option value="triangle">Triangular Wave (Vrms = Vp / √3)</option>
      </select>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="cro-amp">Peak Voltage Vp (V)</label>
        <input type="number" id="cro-amp" min="0.1" step="0.5" value="5.0" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="cro-freq">Frequency f (Hz)</label>
        <input type="number" id="cro-freq" min="1" step="50" value="1000" oninput="measureActiveInstrument()">
      </div>
    </div>
    <div class="section-subtitle">Scope Graticule Calibration</div>
    <div class="form-row">
      <div class="form-group">
        <label for="cro-vdiv">Volts / Division</label>
        <select id="cro-vdiv" onchange="measureActiveInstrument()">
          <option value="0.5">0.5 V / div</option>
          <option value="1">1.0 V / div</option>
          <option value="2" selected>2.0 V / div</option>
          <option value="5">5.0 V / div</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cro-tdiv">Time / Division</label>
        <select id="cro-tdiv" onchange="measureActiveInstrument()">
          <option value="0.0001">0.1 ms / div</option>
          <option value="0.0002" selected>0.2 ms / div</option>
          <option value="0.0005">0.5 ms / div</option>
          <option value="0.001">1.0 ms / div</option>
        </select>
      </div>
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Update Scope</button>
      <button class="btn btn-secondary" onclick="resetOscilloscope()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>CATHODE RAY OSCILLOSCOPE (CRO)</span>
        <span class="screen-indicator" id="cro-screen-ind">● TRIGGER: CH1 AUTO</span>
      </div>
      <div class="canvas-container">
        <canvas id="scopeCanvas" class="scope-canvas" width="560" height="220"></canvas>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Waveform-Dependent Math:</span>
        <span class="calc-formula" id="cro-calc-formula">Vpp = 2 × Vp ; Vrms = Vp / √2 ; T = 1 / f</span>
        <span class="calc-steps" id="cro-calc-steps">Vpp = 10.00 V ; Vrms = 3.54 V ; T = 1.000 ms</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Peak-to-Peak (Vpp)</span>
          <span class="metric-value" id="cro-meta-vpp">10.00 V</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">RMS Voltage</span>
          <span class="metric-value" id="cro-meta-vrms">3.54 V</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Signal Period T</span>
          <span class="metric-value" id="cro-meta-t">1.000 ms</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Screen Span</span>
          <span class="metric-value" id="cro-meta-divs">5.0 divs</span>
        </div>
      </div>
    </div>
  `;
}

function calculateOscilloscope() {
  const waveInput = $('#cro-wave');
  const ampInput = $('#cro-amp');
  const freqInput = $('#cro-freq');
  const vDivInput = $('#cro-vdiv');
  const tDivInput = $('#cro-tdiv');
  if (!waveInput || !ampInput || !freqInput || !vDivInput || !tDivInput) return;

  const wave = waveInput.value;
  const Vp = parseFloat(ampInput.value);
  const freq = parseFloat(freqInput.value);
  const vDiv = parseFloat(vDivInput.value);
  const tDiv = parseFloat(tDivInput.value);

  const calcFormula = $('#cro-calc-formula');
  const calcSteps = $('#cro-calc-steps');
  const metaVpp = $('#cro-meta-vpp');
  const metaVrms = $('#cro-meta-vrms');
  const metaT = $('#cro-meta-t');
  const metaDivs = $('#cro-meta-divs');
  const badge = $('#wsStatusBadge');

  if (isNaN(Vp) || isNaN(freq) || Vp <= 0 || freq <= 0) {
    calcFormula.textContent = 'Validation Error: Peak voltage and frequency must be > 0';
    calcSteps.textContent = 'Invalid signal.';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● ERROR: INVALID SIGNAL';
    return;
  }

  const Vpp = 2 * Vp;
  const periodSec = 1 / freq;
  const periodMs = periodSec * 1000;

  // Waveform-specific RMS calculations
  let vrms = 0;
  let rmsFormulaStr = '';
  let rmsCalcStr = '';

  if (wave === 'sine') {
    vrms = Vp / Math.SQRT2;
    rmsFormulaStr = 'Vrms = Vp / √2';
    rmsCalcStr = `${Vp.toFixed(2)}V / 1.414 = ${vrms.toFixed(2)} V`;
  } else if (wave === 'square') {
    vrms = Vp;
    rmsFormulaStr = 'Vrms = Vp';
    rmsCalcStr = `${Vp.toFixed(2)} V`;
  } else if (wave === 'triangle') {
    vrms = Vp / Math.sqrt(3);
    rmsFormulaStr = 'Vrms = Vp / √3';
    rmsCalcStr = `${Vp.toFixed(2)}V / 1.732 = ${vrms.toFixed(2)} V`;
  }

  const divsOcc = Vpp / vDiv;

  metaVpp.textContent = `${Vpp.toFixed(2)} V`;
  metaVrms.textContent = `${vrms.toFixed(2)} V`;
  metaT.textContent = periodMs >= 1 ? `${periodMs.toFixed(3)} ms` : `${(periodSec * 1e6).toFixed(1)} µs`;
  metaDivs.textContent = `${divsOcc.toFixed(1)} divs`;

  calcFormula.textContent = `Vpp = 2 × Vp ; ${rmsFormulaStr} ; T = 1 / f`;
  calcSteps.textContent = `Vpp = 2 × ${Vp.toFixed(2)}V = ${Vpp.toFixed(2)}V ; ${rmsCalcStr} ; T = 1 / ${freq}Hz = ${periodMs.toFixed(3)} ms`;

  badge.className = divsOcc > 8 ? 'ws-status-badge status-danger' : 'ws-status-badge status-normal';
  badge.textContent = divsOcc > 8 ? '● CLIPPING: EXCEEDS SCREEN' : '● SIGNAL LOCKED';

  drawScopeWaveform(wave, Vp, freq, vDiv, tDiv);
}

function drawScopeWaveform(wave, Vp, freq, vDiv, tDiv) {
  const canvas = $('#scopeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, W, H);

  const xDivs = 10;
  const yDivs = 8;
  const dx = W / xDivs;
  const dy = H / yDivs;

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;

  for (let i = 0; i <= xDivs; i++) {
    ctx.beginPath();
    ctx.moveTo(i * dx, 0);
    ctx.lineTo(i * dx, H);
    ctx.stroke();
  }
  for (let j = 0; j <= yDivs; j++) {
    ctx.beginPath();
    ctx.moveTo(0, j * dy);
    ctx.lineTo(W, j * dy);
    ctx.stroke();
  }

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(W / 2, 0);
  ctx.lineTo(W / 2, H);
  ctx.stroke();

  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2.2;
  ctx.beginPath();

  const totalTime = xDivs * tDiv;
  const centerY = H / 2;

  for (let px = 0; px < W; px++) {
    const t = (px / W) * totalTime;
    let voltage = 0;

    if (wave === 'sine') {
      voltage = Vp * Math.sin(2 * Math.PI * freq * t);
    } else if (wave === 'square') {
      voltage = Math.sin(2 * Math.PI * freq * t) >= 0 ? Vp : -Vp;
    } else if (wave === 'triangle') {
      const phase = (freq * t) % 1;
      voltage = phase < 0.5 ? -Vp + 4 * Vp * phase : 3 * Vp - 4 * Vp * phase;
    }

    const py = centerY - (voltage / vDiv) * dy;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
}

function resetOscilloscope() {
  $('#cro-wave').value = 'sine';
  $('#cro-amp').value = '5.0';
  $('#cro-freq').value = '1000';
  $('#cro-vdiv').value = '2';
  $('#cro-tdiv').value = '0.0002';
  measureActiveInstrument();
  showToast('Oscilloscope reset to default parameters');
}

// -------------------------------------------------------------
// 7.10 FUNCTION GENERATOR (SOURCE INSTRUMENT)
// -------------------------------------------------------------
function renderFunctionGenerator(controls, display) {
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>Signal Synthesizer (Source):</strong> Generates reference test waveforms. Settings define the synthesized output parameters.
    </div>
    <div class="section-subtitle">Synthesized Waveform Settings</div>
    <div class="form-group">
      <label for="fg-wave">Waveform Function</label>
      <select id="fg-wave" onchange="measureActiveInstrument()">
        <option value="sine" selected>Sine Wave</option>
        <option value="square">Square Wave</option>
        <option value="triangle">Triangular Wave</option>
      </select>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="fg-freq">Base Frequency (Hz)</label>
        <input type="number" id="fg-freq" min="1" step="10" value="1000" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="fg-mult">Frequency Multiplier</label>
        <select id="fg-mult" onchange="measureActiveInstrument()">
          <option value="1" selected>× 1 (Hz)</option>
          <option value="10">× 10</option>
          <option value="100">× 100</option>
          <option value="1000">× 1k (kHz)</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="fg-amp">Amplitude V_pp (V)</label>
        <input type="number" id="fg-amp" min="0.1" max="20" step="0.5" value="10.0" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="fg-offset">DC Offset (V)</label>
        <input type="number" id="fg-offset" min="-5" max="5" step="0.5" value="0.0" oninput="measureActiveInstrument()">
      </div>
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Generate Signal</button>
      <button class="btn btn-secondary" onclick="resetFunctionGenerator()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>FUNCTION GENERATOR 50Ω</span>
        <span class="screen-indicator" id="fg-screen-ind">● OUTPUT ACTIVE</span>
      </div>
      <div class="meter-screen-main">
        <div class="screen-readout" id="fg-readout">1.000 kHz</div>
        <div class="screen-status-line" id="fg-subline">SINE WAVE • 10.00 Vpp</div>
      </div>
      <div class="canvas-container">
        <canvas id="fgCanvas" class="scope-canvas" width="560" height="150"></canvas>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Output Signal Math:</span>
        <span class="calc-formula" id="fg-calc-formula">Vp = Vpp / 2 ; Vrms = Vp / √2 ; T = 1 / f</span>
        <span class="calc-steps" id="fg-calc-steps">Vp = 5.00 V ; Vrms = 3.54 V ; T = 1.000 ms</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Peak Voltage Vp</span>
          <span class="metric-value" id="fg-meta-vp">5.00 V</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">RMS Voltage (True)</span>
          <span class="metric-value" id="fg-meta-vrms">3.54 V</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Period T</span>
          <span class="metric-value" id="fg-meta-t">1.000 ms</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Output Impedance</span>
          <span class="metric-value">50 Ω Standard</span>
        </div>
      </div>
    </div>
  `;
}

function calculateFunctionGenerator() {
  const waveInput = $('#fg-wave');
  const baseFreqInput = $('#fg-freq');
  const multInput = $('#fg-mult');
  const ampInput = $('#fg-amp');
  const offsetInput = $('#fg-offset');
  if (!waveInput || !baseFreqInput || !multInput || !ampInput || !offsetInput) return;

  const wave = waveInput.value;
  const baseFreq = parseFloat(baseFreqInput.value);
  const mult = parseFloat(multInput.value);
  const Vpp = parseFloat(ampInput.value);
  const offset = parseFloat(offsetInput.value);

  const readout = $('#fg-readout');
  const subline = $('#fg-subline');
  const calcFormula = $('#fg-calc-formula');
  const calcSteps = $('#fg-calc-steps');
  const metaVp = $('#fg-meta-vp');
  const metaVrms = $('#fg-meta-vrms');
  const metaT = $('#fg-meta-t');
  const badge = $('#wsStatusBadge');

  if (isNaN(baseFreq) || isNaN(Vpp) || isNaN(offset) || baseFreq <= 0 || Vpp <= 0) {
    calcFormula.textContent = 'Validation Error: Check frequency and amplitude bounds';
    calcSteps.textContent = 'Invalid signal parameters.';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● ERROR: INVALID PARAMETERS';
    return;
  }

  const effectiveFreq = baseFreq * mult;
  const Vp = Vpp / 2;
  const period = 1 / effectiveFreq;

  // Waveform-dependent AC RMS
  let vacRms = 0;
  let rmsFormulaStr = '';

  if (wave === 'sine') {
    vacRms = Vp / Math.SQRT2;
    rmsFormulaStr = 'Vp / √2';
  } else if (wave === 'square') {
    vacRms = Vp;
    rmsFormulaStr = 'Vp';
  } else if (wave === 'triangle') {
    vacRms = Vp / Math.sqrt(3);
    rmsFormulaStr = 'Vp / √3';
  }

  // Total True RMS including DC offset: √(Vac_rms² + V_offset²)
  const vrmsTotal = Math.sqrt(vacRms * vacRms + offset * offset);

  if (effectiveFreq >= 1e6) {
    readout.textContent = `${(effectiveFreq / 1e6).toFixed(3)} MHz`;
  } else if (effectiveFreq >= 1e3) {
    readout.textContent = `${(effectiveFreq / 1e3).toFixed(3)} kHz`;
  } else {
    readout.textContent = `${effectiveFreq.toFixed(1)} Hz`;
  }

  subline.textContent = `${wave.toUpperCase()} WAVE • ${Vpp.toFixed(2)} Vpp (Offset: ${offset >= 0 ? '+' : ''}${offset.toFixed(1)}V)`;
  metaVp.textContent = `${Vp.toFixed(2)} V`;
  metaVrms.textContent = `${vrmsTotal.toFixed(2)} V`;
  metaT.textContent = period >= 0.001 ? `${(period * 1000).toFixed(3)} ms` : `${(period * 1e6).toFixed(1)} µs`;

  if (Math.abs(offset) < 0.01) {
    calcFormula.textContent = `Vp = Vpp / 2 ; Vrms = ${rmsFormulaStr} ; T = 1 / f`;
    calcSteps.textContent = `Vp = ${Vp.toFixed(2)} V ; Vrms = ${vrmsTotal.toFixed(2)} V ; T = 1 / ${effectiveFreq} Hz = ${(period * 1000).toFixed(3)} ms`;
  } else {
    calcFormula.textContent = `Vp = Vpp / 2 ; Vrms_total = √(Vac_rms² + V_offset²) ; T = 1 / f`;
    calcSteps.textContent = `Vac = ${vacRms.toFixed(2)} V, Offset = ${offset.toFixed(1)} V → Vrms = √(${vacRms.toFixed(2)}² + ${offset.toFixed(1)}²) = ${vrmsTotal.toFixed(2)} V`;
  }

  badge.className = 'ws-status-badge status-normal';
  badge.textContent = '● SIGNAL GENERATION ACTIVE';

  drawFGPreview(wave, Vpp, offset);
}

function drawFGPreview(wave, Vpp, offset) {
  const canvas = $('#fgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#1e293b';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.beginPath();

  const cycles = 3;
  const maxAmp = 20;
  const centerY = H / 2 - (offset / maxAmp) * (H * 0.4);

  for (let px = 0; px < W; px++) {
    const phase = ((px / W) * cycles) % 1;
    let val = 0;

    if (wave === 'sine') {
      val = Math.sin(phase * 2 * Math.PI);
    } else if (wave === 'square') {
      val = phase < 0.5 ? 1 : -1;
    } else if (wave === 'triangle') {
      val = phase < 0.5 ? -1 + 4 * phase : 3 - 4 * phase;
    }

    const py = centerY - val * (Vpp / maxAmp) * (H * 0.4);
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
}

function resetFunctionGenerator() {
  $('#fg-wave').value = 'sine';
  $('#fg-freq').value = '1000';
  $('#fg-mult').value = '1';
  $('#fg-amp').value = '10.0';
  $('#fg-offset').value = '0.0';
  measureActiveInstrument();
  showToast('Function generator reset to default values');
}

// -------------------------------------------------------------
// 7.11 FREQUENCY COUNTER (Calculates f = N / T_gate)
// -------------------------------------------------------------
function renderFrequencyCounter(controls, display) {
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>Signal Counting Principle:</strong> Counts input waveform zero-crossing cycles N over calibrated gate time T_gate: f = N / T_gate.
    </div>
    <div class="section-subtitle">Incoming Periodic Signal Conditions</div>
    <div class="form-group">
      <label for="fc-cycles">Number of Cycles Counted (N)</label>
      <input type="number" id="fc-cycles" min="0" step="100" value="5000" oninput="measureActiveInstrument()">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="fc-gate">Measurement Gate Time (T_gate in s)</label>
        <select id="fc-gate" onchange="measureActiveInstrument()">
          <option value="0.1">0.10 s (Fast Update)</option>
          <option value="0.5">0.50 s</option>
          <option value="1.0" selected>1.00 s (Standard)</option>
          <option value="2.0">2.00 s</option>
          <option value="10.0">10.0 s (High Precision)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="fc-coupling">Input Coupling</label>
        <select id="fc-coupling" onchange="measureActiveInstrument()">
          <option value="AC" selected>AC Coupling</option>
          <option value="DC">DC Coupling</option>
        </select>
      </div>
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Measure Frequency</button>
      <button class="btn btn-secondary" onclick="resetFrequencyCounter()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>DIGITAL FREQUENCY COUNTER</span>
        <span class="screen-indicator" id="fc-screen-ind">● GATE OPEN: COUNTING</span>
      </div>
      <div class="meter-screen-main">
        <div class="screen-readout" id="fc-readout">5.000 kHz</div>
        <div class="screen-status-line" id="fc-subline">SIGNAL REPETITION RATE</div>
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Mathematical Calculation:</span>
        <span class="calc-formula" id="fc-calc-formula">f = N / T_gate ; T_period = 1 / f</span>
        <span class="calc-steps" id="fc-calc-steps">5000 cycles / 1.00 s = 5000 Hz (5.000 kHz)</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Signal Period (T)</span>
          <span class="metric-value" id="fc-meta-t">200.0 µs</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Gate Interval</span>
          <span class="metric-value" id="fc-meta-gate">1.00 s</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Cycles Counted</span>
          <span class="metric-value" id="fc-meta-n">5,000 cycles</span>
        </div>
      </div>
    </div>
  `;
}

function calculateFrequencyCounter() {
  const cyclesInput = $('#fc-cycles');
  const gateInput = $('#fc-gate');
  if (!cyclesInput || !gateInput) return;

  const N = parseFloat(cyclesInput.value);
  const gateTime = parseFloat(gateInput.value);

  const readout = $('#fc-readout');
  const subline = $('#fc-subline');
  const ind = $('#fc-screen-ind');
  const calcFormula = $('#fc-calc-formula');
  const calcSteps = $('#fc-calc-steps');
  const metaT = $('#fc-meta-t');
  const metaGate = $('#fc-meta-gate');
  const metaN = $('#fc-meta-n');
  const badge = $('#wsStatusBadge');

  if (isNaN(N) || isNaN(gateTime) || N < 0 || gateTime <= 0) {
    readout.textContent = 'ERR';
    readout.className = 'screen-readout overload';
    subline.textContent = 'CYCLES MUST BE ≥ 0 AND GATE TIME > 0';
    calcFormula.textContent = 'Validation Error';
    calcSteps.textContent = 'Invalid parameters.';
    metaT.textContent = '—';
    metaN.textContent = '—';
    ind.className = 'screen-indicator error';
    ind.textContent = '● ERROR';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● ERROR';
    return;
  }

  // Frequency f = N / T_gate
  const f = N / gateTime;

  metaGate.textContent = `${gateTime.toFixed(2)} s`;
  metaN.textContent = `${N.toLocaleString()} cycles`;

  if (N === 0) {
    metaT.textContent = '— (No Signal)';
    calcFormula.textContent = 'f = N / T_gate = 0 / T_gate = 0 Hz';
    calcSteps.textContent = '0 cycles counted in gate interval → f = 0 Hz';
    readout.className = 'screen-readout';
    readout.textContent = '0.000 Hz';
    subline.textContent = 'NO INPUT SIGNAL DETECTED (0 CYCLES)';
    ind.className = 'screen-indicator warning';
    ind.textContent = '● NO SIGNAL';
    badge.className = 'ws-status-badge status-ready';
    badge.textContent = '● ZERO FREQUENCY';
    return;
  }

  const period = 1 / f;
  metaT.textContent = period >= 0.001 ? `${(period * 1000).toFixed(3)} ms` : `${(period * 1e6).toFixed(2)} µs`;

  calcFormula.textContent = 'f = N / T_gate ; T_period = 1 / f';
  calcSteps.textContent = `${N.toLocaleString()} cycles / ${gateTime.toFixed(2)} s = ${f.toFixed(3)} Hz ; T = ${metaT.textContent}`;

  readout.className = 'screen-readout';
  if (f >= 1e6) {
    readout.textContent = `${(f / 1e6).toFixed(6)} MHz`;
  } else if (f >= 1e3) {
    readout.textContent = `${(f / 1e3).toFixed(4)} kHz`;
  } else {
    readout.textContent = `${f.toFixed(3)} Hz`;
  }

  subline.textContent = `PULSE ACCUMULATOR: ${N.toLocaleString()} ZERO-CROSSINGS IN ${gateTime}s GATE`;
  ind.className = 'screen-indicator';
  ind.textContent = '● LOCKED';
  badge.className = 'ws-status-badge status-normal';
  badge.textContent = '● FREQUENCY LOCKED';
}

function resetFrequencyCounter() {
  $('#fc-cycles').value = '5000';
  $('#fc-gate').value = '1.0';
  $('#fc-coupling').value = 'AC';
  measureActiveInstrument();
  showToast('Frequency counter reset to default values');
}

// -------------------------------------------------------------
// 7.12 DC POWER SUPPLY (SOURCE INSTRUMENT - CV / CC Regulation)
// -------------------------------------------------------------
function renderDCPowerSupply(controls, display) {
  psOutputOn = true;
  controls.innerHTML = `
    <div class="circuit-condition-card">
      ⚡ <strong>Bench Source & Regulation:</strong> Delivers V_set until load demands current exceeding I_limit, at which point CC mode clamps output current.
    </div>
    <div class="section-subtitle">Supply Regulation Limits</div>
    <div class="form-row">
      <div class="form-group">
        <label for="ps-v">Target Voltage V_set (0 - 30 V)</label>
        <input type="number" id="ps-v" min="0" max="30" step="0.5" value="12.0" oninput="measureActiveInstrument()">
      </div>
      <div class="form-group">
        <label for="ps-i">Current Limit I_limit (0.05 - 5.0 A)</label>
        <input type="number" id="ps-i" min="0.05" max="5.0" step="0.1" value="2.0" oninput="measureActiveInstrument()">
      </div>
    </div>
    <div class="section-subtitle">Connected Circuit Load</div>
    <div class="form-group">
      <label for="ps-r">Load Resistance R_load (Ω)</label>
      <input type="number" id="ps-r" min="0" step="0.5" value="10.0" oninput="measureActiveInstrument()">
    </div>
    <div class="form-group">
      <label>Power Output Switch</label>
      <div class="radio-group">
        <button class="btn btn-primary" id="btnPsOutput" onclick="togglePSOutput()">
          Output: ON
        </button>
      </div>
    </div>
    <div class="btn-group-actions">
      <button class="btn btn-primary" onclick="measureActiveInstrument()">Apply / Update</button>
      <button class="btn btn-secondary" onclick="resetDCPowerSupply()">Reset</button>
    </div>
  `;

  display.innerHTML = `
    <div class="meter-display-box">
      <div class="meter-screen-header">
        <span>BENCHTOP REGULATED DC POWER SUPPLY</span>
        <span class="screen-indicator" id="ps-screen-ind">● CV MODE (REGULATED)</span>
      </div>
      <div class="meter-screen-main" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div>
          <div style="font-size: 11px; color: #94a3b8; letter-spacing: 1px;">ACTUAL OUTPUT VOLTAGE</div>
          <div class="screen-readout" id="ps-readout-v">12.00 V</div>
        </div>
        <div>
          <div style="font-size: 11px; color: #94a3b8; letter-spacing: 1px;">ACTUAL OUTPUT CURRENT</div>
          <div class="screen-readout" id="ps-readout-i">1.200 A</div>
        </div>
      </div>
      <div class="screen-status-line" id="ps-subline" style="text-align: center;">
        CONSTANT VOLTAGE (CV) REGULATION ACTIVE
      </div>
      <div class="meter-calculation-box">
        <span class="calc-label">Regulation Derivation:</span>
        <span class="calc-formula" id="ps-calc-formula">I_req = V_set / R_load</span>
        <span class="calc-steps" id="ps-calc-steps">12.00 V / 10.0 Ω = 1.200 A ≤ 2.00 A limit (CV Active)</span>
      </div>
      <div class="meter-screen-footer">
        <div class="footer-metric">
          <span class="metric-label">Delivered Power</span>
          <span class="metric-value" id="ps-meta-p">14.40 W</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Operating Mode</span>
          <span class="metric-value" id="ps-meta-mode">CV (Constant Voltage)</span>
        </div>
        <div class="footer-metric">
          <span class="metric-label">Protection State</span>
          <span class="metric-value" id="ps-meta-prot">Safe</span>
        </div>
      </div>
    </div>
  `;
}

function togglePSOutput() {
  psOutputOn = !psOutputOn;
  const btn = $('#btnPsOutput');
  if (btn) {
    if (psOutputOn) {
      btn.textContent = 'Output: ON';
      btn.className = 'btn btn-primary';
      showToast('DC Power Supply Output: ON');
    } else {
      btn.textContent = 'Output: OFF';
      btn.className = 'btn btn-secondary';
      showToast('DC Power Supply Output: OFF');
    }
  }
  measureActiveInstrument();
}

function calculateDCPowerSupply() {
  const vSetInput = $('#ps-v');
  const iLimInput = $('#ps-i');
  const rLoadInput = $('#ps-r');
  if (!vSetInput || !iLimInput || !rLoadInput) return;

  const vSet = parseFloat(vSetInput.value);
  const iLim = parseFloat(iLimInput.value);
  const rLoad = parseFloat(rLoadInput.value);

  const readoutV = $('#ps-readout-v');
  const readoutI = $('#ps-readout-i');
  const subline = $('#ps-subline');
  const ind = $('#ps-screen-ind');
  const calcFormula = $('#ps-calc-formula');
  const calcSteps = $('#ps-calc-steps');
  const metaP = $('#ps-meta-p');
  const metaMode = $('#ps-meta-mode');
  const metaProt = $('#ps-meta-prot');
  const badge = $('#wsStatusBadge');

  if (isNaN(vSet) || isNaN(iLim) || isNaN(rLoad) || vSet < 0 || iLim <= 0 || rLoad < 0) {
    readoutV.textContent = 'ERR';
    readoutI.textContent = 'ERR';
    subline.textContent = 'ENTER POSITIVE SETTINGS (R_LOAD MUST BE ≥ 0)';
    calcFormula.textContent = 'Validation Error';
    calcSteps.textContent = 'Invalid parameters.';
    ind.className = 'screen-indicator error';
    ind.textContent = '● ERROR';
    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● ERROR';
    return;
  }

  if (!psOutputOn) {
    readoutV.textContent = '0.00 V';
    readoutI.textContent = '0.000 A';
    readoutV.className = 'screen-readout';
    readoutI.className = 'screen-readout';
    subline.textContent = 'OUTPUT TERMINALS DISABLED (STANDBY)';
    calcFormula.textContent = 'Output Switch = OFF';
    calcSteps.textContent = 'V_out = 0.00 V ; I_out = 0.000 A (Standby / Isolated)';
    ind.className = 'screen-indicator warning';
    ind.textContent = '● OUTPUT OFF';
    metaP.textContent = '0.00 W';
    metaMode.textContent = 'Standby (OFF)';
    metaProt.textContent = 'Terminals Isolated';
    badge.className = 'ws-status-badge status-ready';
    badge.textContent = '● OUTPUT OFF';
    return;
  }

  // Handle R_load = 0 (Output Short Circuit condition)
  if (rLoad === 0) {
    const vOut = 0.00;
    const iOut = iLim;
    const pOut = 0.00;

    readoutV.className = 'screen-readout';
    readoutI.className = 'screen-readout';
    readoutV.textContent = '0.00 V';
    readoutI.textContent = `${iOut.toFixed(3)} A`;

    subline.textContent = 'CC ACTIVE: SHORT CIRCUIT DETECTED (CURRENT CLAMPED AT LIMIT)';
    calcFormula.textContent = 'Short Circuit (R = 0 Ω) → CC Clamped: I_out = I_limit, V_out = 0 V';
    calcSteps.textContent = `Short circuit detected → Output clamped at ${iLim.toFixed(2)} A limit ; V_out = 0.00 V`;

    ind.className = 'screen-indicator error';
    ind.textContent = '● CC SHORT (RED)';
    metaP.textContent = '0.00 W';
    metaMode.textContent = 'CC (Short Circuit)';
    metaProt.textContent = 'Short Protected';

    badge.className = 'ws-status-badge status-danger';
    badge.textContent = '● CC MODE: SHORT CIRCUIT';
    return;
  }

  // Required current under constant voltage: I = V_set / R_load
  const iReq = vSet / rLoad;

  if (iReq <= iLim) {
    // CV (Constant Voltage) Mode
    const vOut = vSet;
    const iOut = iReq;
    const pOut = vOut * iOut;

    readoutV.className = 'screen-readout';
    readoutI.className = 'screen-readout';
    readoutV.textContent = `${vOut.toFixed(2)} V`;
    readoutI.textContent = `${iOut.toFixed(3)} A`;

    subline.textContent = `CONSTANT VOLTAGE (CV): ${vOut.toFixed(2)}V across ${rLoad.toFixed(1)}Ω load`;
    calcFormula.textContent = 'I_req = V_set / R_load ≤ I_limit → CV Mode Active';
    calcSteps.textContent = `${vSet.toFixed(2)} V / ${rLoad.toFixed(1)} Ω = ${iReq.toFixed(3)} A ≤ ${iLim.toFixed(2)} A (V_out = ${vOut.toFixed(2)} V)`;

    ind.className = 'screen-indicator';
    ind.textContent = '● CV ACTIVE (GREEN)';
    metaP.textContent = `${pOut.toFixed(2)} W`;
    metaMode.textContent = 'CV (Constant Voltage)';
    metaProt.textContent = 'Normal';

    badge.className = 'ws-status-badge status-normal';
    badge.textContent = '● MODE: CV (REGULATED)';
  } else {
    // CC (Constant Current) Mode
    const iOut = iLim;
    const vOut = iLim * rLoad;
    const pOut = vOut * iOut;

    readoutV.className = 'screen-readout';
    readoutI.className = 'screen-readout';
    readoutV.textContent = `${vOut.toFixed(2)} V`;
    readoutI.textContent = `${iOut.toFixed(3)} A`;

    subline.textContent = `CONSTANT CURRENT (CC): Load demands ${iReq.toFixed(2)}A > ${iLim.toFixed(2)}A limit!`;
    calcFormula.textContent = 'I_req > I_limit → CC Mode Clamped (V_out = I_limit × R_load)';
    calcSteps.textContent = `Demand ${iReq.toFixed(2)} A > ${iLim.toFixed(2)} A limit → I_out = ${iLim.toFixed(3)} A, V_out = ${vOut.toFixed(2)} V`;

    ind.className = 'screen-indicator warning';
    ind.textContent = '● CC ACTIVE (AMBER)';
    metaP.textContent = `${pOut.toFixed(2)} W`;
    metaMode.textContent = 'CC (Current Clamped)';
    metaProt.textContent = 'Current Clamped';

    badge.className = 'ws-status-badge status-warning';
    badge.textContent = '● MODE: CC (CURRENT CLAMPED)';
  }
}

function resetDCPowerSupply() {
  psOutputOn = true;
  const btn = $('#btnPsOutput');
  if (btn) {
    btn.textContent = 'Output: ON';
    btn.className = 'btn btn-primary';
  }
  $('#ps-v').value = '12.0';
  $('#ps-i').value = '2.0';
  $('#ps-r').value = '10.0';
  measureActiveInstrument();
  showToast('DC power supply reset to default settings');
}

// --- 8. CENTRAL DISPATCH FOR MEASUREMENTS ---
function measureActiveInstrument() {
  if (!currentActiveInstrument) return;

  switch (currentActiveInstrument.id) {
    case 'voltmeter':
      calculateVoltmeter();
      break;
    case 'ammeter':
      calculateAmmeter();
      break;
    case 'dmm':
      calculateDMM();
      break;
    case 'wattmeter':
      calculateWattmeter();
      break;
    case 'energy-meter':
      calculateEnergyMeter();
      break;
    case 'power-factor-meter':
      calculatePowerFactorMeter();
      break;
    case 'ohmmeter':
      calculateOhmmeter();
      break;
    case 'lcr-meter':
      calculateLCRMeter();
      break;
    case 'oscilloscope':
      calculateOscilloscope();
      break;
    case 'function-generator':
      calculateFunctionGenerator();
      break;
    case 'frequency-counter':
      calculateFrequencyCounter();
      break;
    case 'dc-power-supply':
      calculateDCPowerSupply();
      break;
  }
}

// --- 9. EVENT LISTENERS SETUP ---
function setupEventListeners() {
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchSection(link.dataset.target);
    });
  });

  const brand = $('#brandHome');
  if (brand) {
    brand.addEventListener('click', () => switchSection('home'));
  }

  const btnExplore = $('#btnExplore');
  if (btnExplore) {
    btnExplore.addEventListener('click', () => {
      currentFilter = 'all';
      updateFilterButtons();
      switchSection('instruments');
    });
  }

  $$('.feature-box').forEach(box => {
    box.addEventListener('click', () => {
      const cat = box.dataset.cat;
      if (cat) {
        currentFilter = cat;
        updateFilterButtons();
        switchSection('instruments');
      }
    });
  });

  const searchInput = $('#instrumentSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderInstrumentGrid();
    });
  }

  $$('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      updateFilterButtons();
      renderInstrumentGrid();
    });
  });

  const backBtn = $('#btnBackToList');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      backToInstrumentsList();
    });
  }
}

function updateFilterButtons() {
  $$('.cat-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === currentFilter);
  });
}

// --- 10. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderInstrumentGrid();
  switchSection('home');
});
