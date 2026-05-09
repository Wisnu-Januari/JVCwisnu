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
  Zap,
  Globe,
  Settings,
  Droplets,
  Flame,
  CircleDot
} from 'lucide-react';
import { 
  MOTOR_PRESETS, 
  CVT_STANDARD_SUGGESTIONS,
  CVT_BOREUP_SUGGESTIONS,
  GEAR_SUGGESTIONS,
  FUEL_SUGGESTIONS,
  TRANSLATIONS,
  type MotorPreset 
} from './constants';

export default function App() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [bore, setBore] = useState<string>('');
  const [stroke, setStroke] = useState<string>('');
  const [cylinders, setCylinders] = useState<string>('1');
  const [result, setResult] = useState<number | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [tuningTab, setTuningTab] = useState<'cvt' | 'gear' | 'cr' | 'fuel'>('cvt');
  const [cvtType, setCvtType] = useState<'standard' | 'boreup'>('boreup');
  
  // CR Calculation States
  const [headVol, setHeadVol] = useState<string>('');
  const [crResult, setCrResult] = useState<number | null>(null);

  const t = TRANSLATIONS[lang];

  const calculateCC = () => {
    const b = parseFloat(bore);
    const s = parseFloat(stroke);
    const c = parseInt(cylinders);

    if (b > 0 && s > 0 && c > 0) {
      const cc = (Math.PI * Math.pow(b / 2, 2) * s * c) / 1000;
      setResult(parseFloat(cc.toFixed(2)));
    }
  };

  const calculateCR = () => {
    const b = parseFloat(bore);
    const s = parseFloat(stroke);
    const hv = parseFloat(headVol);

    if (b > 0 && s > 0 && hv > 0) {
      const cylinderVol = (Math.PI * Math.pow(b / 2, 2) * s) / 1000;
      const cr = (cylinderVol + hv) / hv;
      setCrResult(parseFloat(cr.toFixed(1)));
    }
  };

  const resetFields = () => {
    setBore('');
    setStroke('');
    setCylinders('1');
    setResult(null);
    setCrResult(null);
    setHeadVol('');
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
      <header className="racing-gradient pt-6 pb-16 px-4 md:px-8 border-b border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        {/* Lang Toggle */}
        <div className="max-w-6xl mx-auto flex justify-end mb-4 relative z-20">
          <button 
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-xs font-bold transition-all uppercase tracking-widest"
          >
            <Globe size={14} className="text-brand-300" />
            {lang === 'id' ? 'English' : 'Bahasa'}
          </button>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                <Bike className="w-8 h-8 text-brand-300" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl italic uppercase">
                {t.title.split(' ')[0]} <span className="text-brand-300">{t.title.split(' ')[1]}</span>
              </h1>
            </div>
            <p className="text-brand-100/80 font-medium max-w-md">
              {t.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl backdrop-blur-md border border-white/5">
            <Gauge className="text-brand-400 w-10 h-10" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">{t.statusLabel}</p>
              <p className="text-xl font-mono font-bold tracking-wider"> {t.statusValue}</p>
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
              <h2 className="text-xl font-bold uppercase tracking-tight">{t.calcTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider block">
                  {t.boreLabel} <span className="text-brand-400">mm</span>
                </label>
                <input
                  id="bore-input"
                  type="number"
                  placeholder={lang === 'id' ? "Contoh: 58" : "e.g., 58"}
                  value={bore}
                  onChange={(e) => setBore(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-xl font-mono focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider block">
                  {t.strokeLabel} <span className="text-brand-400">mm</span>
                </label>
                <input
                  id="stroke-input"
                  type="number"
                  placeholder={lang === 'id' ? "Contoh: 58.7" : "e.g., 58.7"}
                  value={stroke}
                  onChange={(e) => setStroke(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-xl font-mono focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider block">
                  {t.cylLabel}
                </label>
                <select
                  id="cylinders-select"
                  value={cylinders}
                  onChange={(e) => setCylinders(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-lg font-mono focus:ring-2 focus:ring-brand-500 outline-none appearance-none"
                >
                  <option value="1">1 {lang === 'id' ? 'Silinder (Single)' : 'Cylinder (Single)'}</option>
                  <option value="2">2 {lang === 'id' ? 'Silinder (Twin)' : 'Cylinders (Twin)'}</option>
                  <option value="3">3 {lang === 'id' ? 'Silinder (Triple)' : 'Cylinders (Triple)'}</option>
                  <option value="4">4 {lang === 'id' ? 'Silinder (Inline-4)' : 'Cylinders (Inline-4)'}</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                id="calculate-btn"
                onClick={calculateCC}
                className="flex-1 racing-gradient hover:brightness-110 active:scale-[0.98] py-4 rounded-xl font-bold text-lg shadow-xl shadow-brand-900/20 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="fill-current" /> {t.calculateBtn}
              </button>
              <button
                id="reset-btn"
                onClick={resetFields}
                className="px-6 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all flex items-center justify-center"
                title={t.resetBtn}
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
                  <p className="text-sm font-bold text-brand-400 uppercase tracking-[0.2em] mb-2 text-center">{t.resultLabel}</p>
                  <div className="text-7xl font-black font-mono italic flex items-baseline justify-center gap-2">
                    {result}
                    <span className="text-3xl text-brand-400">CC</span>
                  </div>
                  {activePreset && (
                    <p className="mt-4 text-slate-400 font-medium">
                      {t.basedOn} <span className="text-brand-300">{activePreset}</span>
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tuning Menu Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-3xl overflow-hidden border-brand-500/20 shadow-2xl"
          >
            {/* Menu Header / Tabs */}
            <div className="flex bg-slate-900/50 border-b border-white/5 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setTuningTab('cvt')}
                className={`flex-1 py-4 px-2 flex flex-col items-center gap-1 transition-all relative ${tuningTab === 'cvt' ? 'bg-brand-500/10 text-brand-300' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Wrench className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-tighter">CVT</span>
                {tuningTab === 'cvt' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500" />}
              </button>
              <button 
                onClick={() => setTuningTab('cr')}
                className={`flex-1 py-4 px-2 flex flex-col items-center gap-1 transition-all relative ${tuningTab === 'cr' ? 'bg-brand-500/10 text-brand-300' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <CircleDot className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-tighter">COMP</span>
                {tuningTab === 'cr' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500" />}
              </button>
              <button 
                onClick={() => setTuningTab('fuel')}
                className={`flex-1 py-4 px-2 flex flex-col items-center gap-1 transition-all relative ${tuningTab === 'fuel' ? 'bg-brand-500/10 text-brand-300' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Droplets className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-tighter">FUEL</span>
                {tuningTab === 'fuel' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500" />}
              </button>
              <button 
                onClick={() => setTuningTab('gear')}
                className={`flex-1 py-4 px-2 flex flex-col items-center gap-1 transition-all relative ${tuningTab === 'gear' ? 'bg-brand-500/10 text-brand-300' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Settings className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-tighter">GEAR</span>
                {tuningTab === 'gear' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500" />}
              </button>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {tuningTab === 'cvt' && (
                  <motion.div 
                    key="cvt"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="font-bold italic text-slate-400 text-[10px] tracking-widest">{t.cvtTitle}</h3>
                       <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                          <button 
                            onClick={() => setCvtType('standard')}
                            className={`px-3 py-1 text-[9px] font-bold rounded-md transition-all ${cvtType === 'standard' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}
                          >
                            {t.standardLabel}
                          </button>
                          <button 
                            onClick={() => setCvtType('boreup')}
                            className={`px-3 py-1 text-[9px] font-bold rounded-md transition-all ${cvtType === 'boreup' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}
                          >
                            {t.boreUpLabel}
                          </button>
                       </div>
                    </div>
                    {(cvtType === 'standard' ? CVT_STANDARD_SUGGESTIONS : CVT_BOREUP_SUGGESTIONS).map((item, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <h4 className="font-bold text-indigo-400 text-[10px] mb-1 uppercase tracking-widest">{item.component}</h4>
                        <p className="text-[10px] text-slate-300 leading-relaxed">{item.description[lang]}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {tuningTab === 'cr' && (
                  <motion.div 
                    key="cr"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="font-bold italic text-slate-400 text-[10px] tracking-widest uppercase">{t.compressionTitle}</h3>
                    <div className="space-y-2">
                       <label className="text-[9px] font-bold text-slate-500 uppercase">{t.crLabel}</label>
                       <div className="flex gap-2">
                          <input 
                            type="number"
                            value={headVol}
                            placeholder="e.g. 12"
                            onChange={(e) => setHeadVol(e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono outline-none focus:ring-1 focus:ring-brand-500"
                          />
                          <button 
                            onClick={calculateCR}
                            className="px-4 bg-brand-600 hover:bg-brand-500 rounded-lg text-xs font-bold"
                          >
                            GO
                          </button>
                       </div>
                    </div>
                    {crResult && (
                      <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-xl text-center">
                         <p className="text-[9px] font-bold text-brand-400 uppercase mb-1">{t.crResult}</p>
                         <p className="text-3xl font-black font-mono tracking-tighter">{crResult}:1</p>
                      </div>
                    )}
                    <p className="text-[9px] text-slate-500 italic p-2 bg-black/20 rounded-lg leading-relaxed">
                      *Ideal Harian: 10.5 - 11.5 : 1 <br/>
                      *Ideal Balap (Pertamax Turbo/Race): 12.5 - 14.5 : 1
                    </p>
                  </motion.div>
                )}

                {tuningTab === 'fuel' && (
                  <motion.div 
                    key="fuel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3"
                  >
                    <h3 className="font-bold italic text-slate-400 text-[10px] tracking-widest uppercase">{t.fuelTitle}</h3>
                    {FUEL_SUGGESTIONS.map((item, i) => (
                      <div key={i} className={`p-3 rounded-xl border border-white/5 transition-all ${result && result >= item.cc - 15 && result <= item.cc + 20 ? 'bg-orange-500/20 border-orange-500/30' : 'bg-white/5'}`}>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-orange-400 text-[10px] uppercase">{item.cc}cc Class</h4>
                          {result && result >= item.cc - 15 && result <= item.cc + 20 && <Flame size={12} className="text-orange-500" />}
                        </div>
                        <p className="text-[10px] font-mono text-slate-200 mb-1">{item.carb}</p>
                        <p className="text-[9px] text-slate-400 leading-tight italic">{item.spec}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {tuningTab === 'gear' && (
                  <motion.div 
                    key="gear"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                       <h3 className="font-bold italic text-slate-400 text-[10px] tracking-widest">{t.gearTitle}</h3>
                    </div>
                    {GEAR_SUGGESTIONS.map((item, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <h4 className="font-mono font-bold text-emerald-400 text-xs mb-1 tracking-widest">{item.setup}</h4>
                        <p className="text-[10px] text-slate-300 leading-relaxed">{item.description[lang]}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex gap-4 items-start">
                <Zap size={16} className="text-orange-400 shrink-0 mt-1" />
                <p className="text-[11px] text-orange-200/80 italic leading-snug">
                  <strong>{t.tipTitle}</strong> {t.tipCvt}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Right Column: Presets */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sticky top-8 border-brand-500/10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-slate-400">
                <Dna className="w-4 h-4 text-brand-400" />
                {t.presetTitle}
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-full">{MOTOR_PRESETS.length} {t.presetSub}</span>
            </div>
            
            <div className="space-y-3 max-h-[660px] overflow-y-auto pr-2 custom-scrollbar">
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
                  <div className="space-y-1 text-left">
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
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] px-2 italic">{t.proTipTitle}</h4>
              <p className="text-xs text-slate-400 px-2 leading-relaxed italic">
                {t.proTipDesc}
              </p>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 text-center opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-xs font-mono tracking-widest uppercase mb-2">{t.footerTop}</p>
        <p className="text-[8px] tracking-[0.4em]">{t.footerBottom}</p>
      </footer>
    </div>
  );
}
