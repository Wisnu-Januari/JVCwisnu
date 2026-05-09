/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings2, 
  RotateCcw, 
  Calculator, 
  Bike, 
  Gauge, 
  ChevronRight, 
  Wrench,
  Dna,
  Zap
} from 'lucide-react';
import { MOTOR_PRESETS, CVT_SUGGESTIONS, type MotorPreset } from './constants';

export default function App() {
  const [bore, setBore] = useState<string>('');
  const [stroke, setStroke] = useState<string>('');
  const [cylinders, setCylinders] = useState<string>('1');
  const [result, setResult] = useState<number | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const calculateCC = () => {
    const b = parseFloat(bore);
    const s = parseFloat(stroke);
    const c = parseInt(cylinders);

    if (b > 0 && s > 0 && c > 0) {
      // Formula: (π * (bore/2)^2 * stroke * cylinders) / 1000
      const cc = (Math.PI * Math.pow(b / 2, 2) * s * c) / 1000;
      setResult(parseFloat(cc.toFixed(2)));
    }
  };

  const resetFields = () => {
    setBore('');
    setStroke('');
    setCylinders('1');
    setResult(null);
    setActivePreset(null);
  };

  const applyPreset = (preset: MotorPreset) => {
    setBore(preset.bore.toString());
    setStroke(preset.stroke.toString());
    setCylinders(preset.cylinders.toString());
    setActivePreset(preset.name);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12 selection:bg-brand-500/30">
      {/* Header */}
      <header className="racing-gradient pt-8 pb-16 px-4 md:px-8 border-b border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                <Bike className="w-8 h-8 text-brand-300" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl italic">
                MEKANIK <span className="text-brand-300">DIGITAL</span>
              </h1>
            </div>
            <p className="text-brand-100/80 font-medium max-w-md">
              Kalkulator Bore Up Presisi & Panduan Setting Kirian Profesional.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl backdrop-blur-md border border-white/5">
            <Gauge className="text-brand-400 w-10 h-10" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Status Mesin</p>
              <p className="text-xl font-mono font-bold tracking-wider"> READY TO RACE</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Calculator */}
        <section className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
              <Calculator className="text-brand-400" />
              <h2 className="text-xl font-bold uppercase tracking-tight">Kalkulator Kapasitas Mesin</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider block">
                  Diameter Piston (Bore) <span className="text-brand-400">mm</span>
                </label>
                <input
                  id="bore-input"
                  type="number"
                  placeholder="Contoh: 58"
                  value={bore}
                  onChange={(e) => setBore(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-xl font-mono focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider block">
                  Langkah (Stroke) <span className="text-brand-400">mm</span>
                </label>
                <input
                  id="stroke-input"
                  type="number"
                  placeholder="Contoh: 58.7"
                  value={stroke}
                  onChange={(e) => setStroke(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-xl font-mono focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider block">
                  Jumlah Silinder
                </label>
                <select
                  id="cylinders-select"
                  value={cylinders}
                  onChange={(e) => setCylinders(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-lg font-mono focus:ring-2 focus:ring-brand-500 outline-none appearance-none"
                >
                  <option value="1">1 Silinder (Single)</option>
                  <option value="2">2 Silinder (Twin)</option>
                  <option value="3">3 Silinder (Triple)</option>
                  <option value="4">4 Silinder (Inline-4)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                id="calculate-btn"
                onClick={calculateCC}
                className="flex-1 racing-gradient hover:brightness-110 active:scale-[0.98] py-4 rounded-xl font-bold text-lg shadow-xl shadow-brand-900/20 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="fill-current" /> HITUNG SEKARANG
              </button>
              <button
                id="reset-btn"
                onClick={resetFields}
                className="px-6 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all flex items-center justify-center"
                title="Reset"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            <AnimatePresence>
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-10 p-8 bg-brand-500/10 border-2 border-brand-500/50 rounded-2xl text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-500 animate-[pulse_2s_infinite]" />
                  <p className="text-sm font-bold text-brand-400 uppercase tracking-[0.2em] mb-2 text-center">Hasil Kapasitas</p>
                  <div className="text-7xl font-black font-mono italic flex items-baseline justify-center gap-2">
                    {result}
                    <span className="text-3xl text-brand-400">CC</span>
                  </div>
                  {activePreset && (
                    <p className="mt-4 text-slate-400 font-medium">
                      Based on: <span className="text-brand-300">{activePreset}</span>
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CVT Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Wrench className="text-indigo-400" />
              <h2 className="text-xl font-bold italic tracking-tight">SETTING KIRIAN (CVT) MATIC</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CVT_SUGGESTIONS.map((item, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
                      <Settings2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-indigo-300 text-sm mb-1 uppercase tracking-wide">{item.component}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex gap-4 items-start">
              <div className="p-2 bg-orange-500/20 text-orange-400 rounded-full shrink-0">
                <Zap size={18} />
              </div>
              <p className="text-sm text-orange-200/80 italic">
                <strong>Tips Mekanik:</strong> Untuk bore up ekstrim, pastikan menggunakan per sentri yang lebih keras (1500-2000 RPM) agar start lebih bertenaga tanpa delay.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Right Column: Presets */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sticky top-8 border-brand-500/10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-slate-400">
                <Dna className="w-4 h-4 text-brand-400" />
                Data Standar Motor
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-full">{MOTOR_PRESETS.length} MODELS</span>
            </div>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {MOTOR_PRESETS.map((motor, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(motor)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between group ${
                    activePreset === motor.name 
                    ? 'bg-brand-600 border-brand-400 shadow-lg shadow-brand-900/40 text-white' 
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${activePreset === motor.name ? 'text-brand-100' : 'text-brand-400'}`}>
                      {motor.brand} • {motor.category}
                    </p>
                    <h3 className="font-extrabold text-sm tracking-tight">{motor.name}</h3>
                    <div className="flex gap-3 mt-1">
                      <div className="text-[10px] flex items-center gap-1 font-mono">
                        <span className="opacity-60 italic">B:</span> {motor.bore}
                      </div>
                      <div className="text-[10px] flex items-center gap-1 font-mono">
                        <span className="opacity-60 italic">S:</span> {motor.stroke}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${activePreset === motor.name ? 'translate-x-1 text-white' : 'text-slate-600 group-hover:text-brand-400'}`} />
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] px-2 italic">Pro Tip</h4>
              <p className="text-xs text-slate-400 px-2 leading-relaxed italic">
                Klik pada daftar motor di atas untuk langsung mengisi data standar. Modifikasi piston ke diameter lebih besar (Bore Up) untuk meningkatkan performa.
              </p>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 text-center opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-xs font-mono tracking-widest uppercase mb-2">Designed for the Underground Racing Scene</p>
        <p className="text-[8px] tracking-[0.4em]">© 2026 DIGITAL MEKANIK CORE CALCULATOR</p>
      </footer>
    </div>
  );
}
