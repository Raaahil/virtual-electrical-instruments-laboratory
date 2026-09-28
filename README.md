# Virtual Electrical Instruments Laboratory

A student-friendly virtual electrical engineering laboratory simulator for practicing measurements using virtual instruments without physical hardware.

---

## ⚡ Core Design Principle: Virtual Measurement Derivations

The simulator distinguishes between **Measuring Instruments** and **Source Instruments**:

- **Measuring Instruments**: The student sets realistic source/circuit/component conditions (e.g. supply voltage, resistance network, component reactances, counted zero-crossings). The virtual instrument calculates and displays the exact measured quantity with step-by-step mathematical proofs. The student is **never** asked to directly enter the quantity being measured.
- **Source Instruments** (*Function Generator*, *DC Power Supply*): The student configures excitation settings (voltage, waveform, frequency, current limit), and the simulator calculates the resulting electrical behavior and load regulation (e.g. CV vs. CC clamping).

---

## 🎛️ 12 Virtual Electrical Instruments

| No. | Instrument | Category | Student Inputs (Circuit Conditions) | Virtual Calculation & Mathematical Output |
|---|---|---|---|---|
| 1 | **Digital Multimeter (DMM)** | Voltage & Current | Function (DCV, DCA, Resistance, ACV, Continuity, Diode) with circuit divider, load resistance, or semiconductor junction conditions | `DCV: V = Vs × R_x / (R1+R2)`, `DCA: I = Vs / R`, `Ω: R = V_test / I_test`, `Continuity (≤50Ω)` |
| 2 | **Voltmeter** | Voltage & Current | Supply Voltage $V_s$, divider resistors $R_1$, $R_2$, probe location (Across $R_1$ or $R_2$), scale range | `V = Vs × R_x / (R1 + R2)` DC with step-by-step calculation and overload protection |
| 3 | **Ammeter** | Voltage & Current | Supply Voltage $V_s$, total loop resistance $R$, scale range | `I = Vs / R` (A / mA DC) using Ohm's Law with overload protection |
| 4 | **Wattmeter** | Power & Energy | RMS Voltage $V$, RMS Current $I$, displacement Power Factor $\cos(\varphi)$ | `P = V × I × cos(φ)` (Watts/kW), `S = V × I` (VA), `Q = √(S² - P²)` (VAR) |
| 5 | **Energy Meter** | Power & Energy | Load Voltage $V$, Current $I$, Power Factor $\cos(\varphi)$, operating time $t$ (hours), meter constant $K$ | `P = V × I × cos(φ)`, `Energy = (P × t) / 1000` (kWh), plus pulse/revolution counter |
| 6 | **Ohmmeter** | Resistance & Components | Internal test voltage $V_{\text{test}}$, measured test current $I_{\text{test}}$ | `R = V_test / I_test` (Ω, kΩ, MΩ) with open-circuit ($I = 0 \to 0\text{L}$) and short-circuit detection |
| 7 | **Oscilloscope (CRO)** | Waveforms & Signals | Waveform type (Sine, Square, Triangle), Peak Amplitude $V_p$, frequency $f$, Volts/Div, Time/Div | Calibrated graticule display plotting waveform, `Vpp = 2 × Vp`, `Vrms = Vp / √2 (Sine) / Vp (Square) / Vp / √3 (Triangle)`, `T = 1 / f` |
| 8 | **Function Generator** | Waveforms & Signals | Waveform (Sine, Square, Triangle, Sawtooth), frequency, multiplier, amplitude $V_{pp}$, DC offset | Signal synthesis with real-time waveform preview, $V_p = V_{pp} / 2$, $V_{\text{rms}}$, Period $T$ |
| 9 | **Frequency Counter** | Waveforms & Signals | Counted signal cycles $N$, measurement gate time $T_{\text{gate}}$, input coupling | `f = N / T_gate` (Hz / kHz / MHz) and `T_period = 1 / f` |
| 10 | **LCR Meter** | Resistance & Components | Component type (L, C, R), test frequency $f$, measured reactance ($X_L$ or $X_C$), series ESR $R_s$ | `L = XL / (2πf)`, `C = 1 / (2πfXC)`, `R = V / I`, and Quality factor $Q$ |
| 11 | **Power Factor Meter** | Power & Energy | Method A: $V$, $I$, Real Power $P$ ; Method B: Phase Angle $\phi$ ; Load nature (Lagging/Leading) | `PF = P / (V × I)` or `PF = cos(φ)` with lagging/leading characterization |
| 12 | **DC Power Supply** | Power Supply | Target voltage $V_{\text{set}}$, current limit $I_{\text{limit}}$, load resistance $R_{\text{load}}$, output switch | Regulated output with automatic transition between Constant Voltage (CV) and Constant Current (CC) clamping |

---

## 🛠️ File Structure

The project strictly follows the clean 4-file architecture:

- `index.html` — Semantic HTML structure (Home, Instruments catalog, dedicated workspace, About).
- `styles.css` — Professional laboratory styling with clean white background and engineering blue accents.
- `script.js` — Core application controller, deterministic calculation engine, and HTML5 canvas waveform renderers.
- `README.md` — Project documentation and instrumentation reference.

---

## 🚀 How to Run Locally

1. Open `index.html` directly in any modern web browser, or
2. Run a simple local HTTP server from the project directory:
   ```bash
   python -m http.server 8000
   ```
3. Navigate to:
   ```
   http://localhost:8000/
   ```

Zero backend or external libraries are required.
