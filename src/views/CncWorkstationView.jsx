import React, { useState } from 'react';
import { 
  ArrowLeft, Cpu, Gauge, Clock, 
  Sliders, Scissors, Layers, CheckCircle2, Play, Pause, RotateCcw, 
  Plus, AlertTriangle, Thermometer, Wind, ChevronRight, QrCode, Download
} from 'lucide-react';


const STAGED_JOBS = [
  {
    id: '#CUT-8821',
    client: 'Elena Vasiliev',
    garment: 'Structured Obsidian Wool Blazer (Sz 40 • Charcoal Melange)',
    bolt: 'Loro Piana 130s #LP-W884',
    yieldPct: '92.6%',
    progress: 68,
    timeLeft: '1m 12s left',
    status: 'IN PROGRESS',
    statusColor: 'text-emerald-700 bg-emerald-100',
    active: true
  },
  {
    id: '#CUT-8822',
    client: 'Camille Laurent',
    garment: 'Silk Column Slip Dress (Sz 38 Replacement)',
    bolt: 'Como Mulberry Silk Satin 32mm #SLK-09',
    yieldPct: '94.1%',
    progress: 0,
    timeLeft: 'Est: 2m 45s',
    status: 'NEXT IN QUEUE • READY',
    statusColor: 'text-[#4b41e1] bg-[#eaedff]',
    active: false
  },
  {
    id: '#CUT-8823',
    client: 'Alexandre Dumas',
    garment: 'Double-Breasted Cashmere Overcoat (+1.5cm Sleeve Mod)',
    bolt: 'Heather Camel Pure Cashmere #CSH-401',
    yieldPct: '89.8%',
    progress: 0,
    timeLeft: 'Est: 4m 10s',
    status: 'CALIBRATING WEFT BIAS',
    statusColor: 'text-amber-800 bg-amber-100',
    active: false
  },
  {
    id: '#CUT-8824',
    client: 'Sophia Lorenzi',
    garment: 'Sculpted Leather Handbag Lining Pattern',
    bolt: 'Japanese Cupro Black #CUP-02',
    yieldPct: '96.2%',
    progress: 0,
    timeLeft: 'Est: 1m 55s',
    status: 'AWAITING PROBE',
    statusColor: 'text-[#45464d] bg-[#f2f3ff]',
    active: false
  }
];

export default function CncWorkstationView({ onBackToStore, onGoToDispatch, onGoToVault }) {
  const [activeJobId, setActiveJobId] = useState('#CUT-8821');
  const [isRunning, setIsRunning] = useState(true);
  const activeJob = STAGED_JOBS.find((j) => j.id === activeJobId) || STAGED_JOBS[0];

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#151b2d] flex flex-col selection:bg-[#4b41e1]/20 selection:text-[#4b41e1]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 lg:px-8 bg-white/90 backdrop-blur-md border-b border-[#c6c6cd]/30 shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToStore}
            className="p-2 -ml-2 rounded-full text-[#45464d] hover:text-[#151b2d] hover:bg-[#f2f3ff] transition-all"
            title="Return to Storefront"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2f3ff] border border-[#c6c6cd]/40 text-xs font-semibold text-[#151b2d]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SoHo Flagship Workshop &amp; Vault #01 • NYC</span>
          </div>

          <span className="text-[#c6c6cd] hidden sm:inline">|</span>

          <span className="text-xs font-mono text-[#45464d] hidden sm:inline">
            Workstation: <strong className="text-[#151b2d]">Laser Micro-Cut Array (CNC-02)</strong>
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Emergency Laser E-Stop engaged! Optical shutter closed.')}
            className="h-9 px-3.5 rounded-full border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Emergency Laser E-Stop</span>
          </button>

          <button
            onClick={onGoToDispatch}
            className="h-9 px-4 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>Dispatch Fleet</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* KPI Stat Strip */}
      <section className="bg-white border-b border-[#c6c6cd]/30 px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#c6c6cd]/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#4b41e1]">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#45464d] uppercase font-bold">CNC Laser Array</span>
              <div className="text-sm font-bold text-[#151b2d]">3/3 Nodes Active <span className="text-[11px] text-emerald-600 font-normal">• 99.4% Cal</span></div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 md:pt-0 pl-0 md:pl-4">
            <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#4b41e1]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#45464d] uppercase font-bold">Nest Efficiency</span>
              <div className="text-sm font-bold text-[#151b2d]">92.6% Yield <span className="text-[11px] text-emerald-600 font-semibold">(+4.1%)</span></div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 md:pt-0 pl-0 md:pl-4">
            <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#151b2d]">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#45464d] uppercase font-bold">Bed Vacuum Chamber</span>
              <div className="text-sm font-bold font-mono text-[#151b2d]">-84.2 kPa <span className="text-[11px] text-emerald-600 font-normal">• Hermetic</span></div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 md:pt-0 pl-0 md:pl-4">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#45464d] uppercase font-bold">Micro-Delta Stage</span>
              <div className="text-sm font-bold text-[#151b2d]">8 Staged <span className="text-[11px] text-[#45464d] font-normal">• 3m 40s avg</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dual Zone Grid: Zone A (7 Cols Interactive Bed) vs Zone B (5 Cols Staged Queue) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ZONE A: Primary Workspace - CNC Laser Bed (7 Cols) */}
        <section className="lg:col-span-7 bg-white rounded-2xl border border-[#c6c6cd]/40 overflow-hidden shadow-xs flex flex-col justify-between">
          {/* Active Job Header */}
          <div className="p-4 border-b border-[#c6c6cd]/30 flex items-center justify-between gap-3 bg-[#faf8ff]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#000000] text-white flex items-center justify-center font-mono font-bold text-xs">
                #8821
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#151b2d]">{activeJob.client}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#000000] text-white">
                    VIP-ELN-88390
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    RUNNING {activeJob.progress}%
                  </span>
                </div>
                <p className="text-[11px] text-[#45464d] mt-0.5">{activeJob.garment}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="h-8 px-3 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all shadow-xs"
              >
                {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isRunning ? 'Pause' : 'Resume'}</span>
              </button>
            </div>
          </div>

          {/* SVG Visualizer Bed */}
          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#45464d]">
              <span>BED: 3200mm × 1800mm (Z: 45mm)</span>
              <span>BEAM: 120W CO2 Pulsed @ 80kHz</span>
              <span>KERF: 0.12mm COMP</span>
            </div>

            {/* Dark SVG Canvas */}
            <div className="relative w-full h-[360px] bg-[#0c101c] rounded-xl border border-neutral-800 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full p-2" viewBox="0 0 960 480" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cncGridPatt" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cncGridPatt)" />
                <rect x="30" y="30" width="900" height="420" rx="6" fill="#141824" stroke="#2a324b" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="45" y="55" fill="#76777d" fontFamily="Plus Jakarta Sans" fontSize="10" letterSpacing="1">
                  BOLT #LP-W884 • LORO PIANA 130S VIRGIN WOOL (152cm WIDTH)
                </text>

                {/* Pattern Pieces */}
                <g opacity="0.9">
                  {/* P-01 Front Right */}
                  <path d="M 70 80 L 220 80 L 260 140 L 250 320 L 190 350 L 90 340 L 70 200 Z" fill="rgba(30, 41, 59, 0.75)" stroke="#10b981" strokeWidth="1.8" />
                  <text x="110" y="150" fill="#f8fafc" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600">P-01: FRONT RIGHT</text>
                  <line x1="250" y1="230" x2="262" y2="230" stroke="#f59e0b" strokeWidth="2" />
                  <text x="268" y="233" fill="#f59e0b" fontFamily="Plus Jakarta Sans" fontSize="8">WAIST NOTCH -18mm</text>

                  {/* P-02 Front Left */}
                  <path d="M 280 80 L 430 80 L 450 200 L 430 340 L 330 350 L 270 320 L 260 140 Z" fill="rgba(30, 41, 59, 0.75)" stroke="#10b981" strokeWidth="2" />
                  <text x="310" y="150" fill="#f8fafc" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600">P-02: FRONT LEFT</text>

                  {/* P-03 Back Panel */}
                  <path d="M 470 90 L 640 70 L 670 190 L 650 350 L 480 350 L 460 210 Z" fill="rgba(30, 41, 59, 0.65)" stroke="#10b981" strokeWidth="1.5" />
                  <text x="520" y="160" fill="#f8fafc" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600">P-03: BACK PANEL</text>

                  {/* P-04 / P-05 Sleeves */}
                  <path d="M 690 80 Q 780 60 870 80 L 880 240 L 810 250 L 690 230 Z" fill="rgba(30, 41, 59, 0.65)" stroke="#10b981" strokeWidth="1.5" />
                  <text x="740" y="140" fill="#f8fafc" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600">P-04: SLEEVE L (MOD)</text>

                  <path d="M 690 260 Q 780 240 870 260 L 880 410 L 810 420 L 690 400 Z" fill="rgba(30, 41, 59, 0.65)" stroke="#10b981" strokeWidth="1.5" />
                  <text x="740" y="320" fill="#f8fafc" fontFamily="Plus Jakarta Sans" fontSize="10" fontWeight="600">P-05: SLEEVE R (MOD)</text>
                </g>

                {/* Laser Head Carriage */}
                <g transform="translate(426, 267)">
                  <circle cx="0" cy="0" r="14" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="5" fill="#4b41e1" className="animate-ping" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  <rect x="18" y="-22" width="130" height="24" rx="3" fill="rgba(15, 23, 42, 0.9)" stroke="#4b41e1" strokeWidth="0.75" />
                  <text x="24" y="-7" fill="#ffffff" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="600">HEAD: X 1420.5 | Y 890.2</text>
                </g>
              </svg>
            </div>

            {/* Telemetry Strip */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/30">
                <span className="text-[10px] text-[#45464d] block">Feed Velocity</span>
                <strong className="text-[#151b2d]">450 mm/s</strong>
              </div>
              <div className="p-2 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/30">
                <span className="text-[10px] text-[#45464d] block">Focal Depth</span>
                <strong className="text-[#151b2d]">1.50 mm</strong>
              </div>
              <div className="p-2 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/30">
                <span className="text-[10px] text-[#45464d] block">N₂ Pressure</span>
                <strong className="text-[#151b2d]">4.2 bar</strong>
              </div>
              <div className="p-2 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/30">
                <span className="text-[10px] text-[#45464d] block">Bed Temp</span>
                <strong className="text-[#151b2d]">21.4 °C</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ZONE B: Staged Laser Queue & Pattern Spec (5 Cols) */}
        <section className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-[#c6c6cd]/40 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[#151b2d]">Staged Laser Queue</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#eaedff] text-[#4b41e1] font-bold">
                  4 Active
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              {STAGED_JOBS.map((job) => {
                const isSelected = activeJobId === job.id;
                return (
                  <div
                    key={job.id}
                    onClick={() => setActiveJobId(job.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-2 border-[#000000] bg-[#f2f3ff] shadow-xs'
                        : 'border-[#c6c6cd]/40 bg-white hover:border-[#76777d]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#151b2d]">{job.id}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${job.statusColor}`}>
                        {job.status}
                      </span>
                    </div>
                    <strong className="text-xs text-[#151b2d] block">{job.client}</strong>
                    <p className="text-[11px] text-[#45464d] line-clamp-1">{job.garment}</p>
                    <div className="mt-2 pt-1.5 border-t border-[#c6c6cd]/20 flex items-center justify-between text-[10px] font-mono text-[#45464d]">
                      <span>Bolt: {job.bolt}</span>
                      <span className="text-emerald-700 font-bold">Yield: {job.yieldPct}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pattern Spec & Hardware Lock Panel */}
          <div className="bg-white rounded-2xl border border-[#c6c6cd]/40 p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
              <span className="text-xs font-bold text-[#151b2d]">Pattern Spec &amp; Hardware Lock</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                ZKP-NFC VERIFIED
              </span>
            </div>

            <div className="p-3 bg-[#f2f3ff] rounded-xl text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-[#45464d]">Pattern Hash:</span>
                <strong className="text-[#151b2d]">0x39af...e4b9</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#45464d]">Tailor Ticket:</span>
                <span className="text-[#4b41e1] font-semibold">Mathilde B. (#ALT-401)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#45464d]">Kerf Comp:</span>
                <span className="text-emerald-700 font-semibold">+0.12mm verified</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => alert('Dispatched cut panels to Hand Basting Workshop Bench #02.')}
                className="w-full h-10 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] text-xs font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-xs"
              >
                <span>Send to Hand Basting Workshop (Bench #02)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => alert('Exporting DXF / AAMA CAD Specification...')}
                  className="h-8 rounded-full border border-[#c6c6cd]/60 hover:bg-[#f2f3ff] text-[11px] font-semibold text-[#151b2d] flex items-center justify-center gap-1 transition-all"
                >
                  <Download className="w-3 h-3" />
                  <span>DXF Spec</span>
                </button>
                <button
                  onClick={() => alert('Printing Garment Tag QR...')}
                  className="h-8 rounded-full border border-[#c6c6cd]/60 hover:bg-[#f2f3ff] text-[11px] font-semibold text-[#151b2d] flex items-center justify-center gap-1 transition-all"
                >
                  <QrCode className="w-3 h-3" />
                  <span>Tag QR</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
