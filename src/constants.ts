export interface MotorPreset {
  name: string;
  brand: string;
  bore: number;
  stroke: number;
  cylinders: number;
  category: 'Matic' | 'Sport' | 'Bebek';
}

export const MOTOR_PRESETS: MotorPreset[] = [
  // Matic (CVT)
  { name: "Honda Beat / Scoopy FI", brand: "Honda", bore: 50, stroke: 55.1, cylinders: 1, category: "Matic" },
  { name: "Honda Genio / New Beat", brand: "Honda", bore: 47, stroke: 63.1, cylinders: 1, category: "Matic" },
  { name: "Honda Vario 125/150", brand: "Honda", bore: 52.4, stroke: 57.9, cylinders: 1, category: "Matic" },
  { name: "Honda Vario 160 / PCX 160", brand: "Honda", bore: 60, stroke: 55.5, cylinders: 1, category: "Matic" },
  { name: "Honda PCX 150 / ADV 150", brand: "Honda", bore: 57.3, stroke: 57.9, cylinders: 1, category: "Matic" },
  { name: "Yamaha Mio / Soul / Fino", brand: "Yamaha", bore: 50, stroke: 57.9, cylinders: 1, category: "Matic" },
  { name: "Yamaha Gear / Freego 125", brand: "Yamaha", bore: 52.4, stroke: 57.9, cylinders: 1, category: "Matic" },
  { name: "Yamaha Lexi 125", brand: "Yamaha", bore: 52, stroke: 58.7, cylinders: 1, category: "Matic" },
  { name: "Yamaha NMAX / Aerox 155", brand: "Yamaha", bore: 58, stroke: 58.7, cylinders: 1, category: "Matic" },
  { name: "Yamaha XMAX 250", brand: "Yamaha", bore: 70, stroke: 64.9, cylinders: 1, category: "Matic" },
  { name: "Suzuki Nex II / Address", brand: "Suzuki", bore: 51, stroke: 55.2, cylinders: 1, category: "Matic" },
  { name: "Suzuki Burgman Street 125", brand: "Suzuki", bore: 52.5, stroke: 57.4, cylinders: 1, category: "Matic" },
  
  // Bebek (Auto Clutch / Kopling Otomatis)
  { name: "Honda Supra X 125", brand: "Honda", bore: 52.4, stroke: 57.9, cylinders: 1, category: "Bebek" },
  { name: "Yamaha Jupiter Z1", brand: "Yamaha", bore: 50, stroke: 57.9, cylinders: 1, category: "Bebek" },
  { name: "Yamaha Vega ZR", brand: "Yamaha", bore: 50, stroke: 54, cylinders: 1, category: "Bebek" },
  { name: "Honda Revo Fit", brand: "Honda", bore: 50, stroke: 55.6, cylinders: 1, category: "Bebek" },
  
  // Sport (Manual Clutch / Kopling Manual)
  { name: "Yamaha R15 / Vixion", brand: "Yamaha", bore: 57, stroke: 58.7, cylinders: 1, category: "Sport" },
  { name: "Honda CBR 150R", brand: "Honda", bore: 57.3, stroke: 57.8, cylinders: 1, category: "Sport" },
  { name: "Suzuki GSX-R150", brand: "Suzuki", bore: 62, stroke: 48.8, cylinders: 1, category: "Sport" },
  { name: "Satria FU 150 (Carb)", brand: "Suzuki", bore: 62, stroke: 48.8, cylinders: 1, category: "Sport" },
  { name: "Kawasaki KLX 150", brand: "Kawasaki", bore: 58, stroke: 54.4, cylinders: 1, category: "Sport" },
  { name: "Ninja 250 FI / Z250", brand: "Kawasaki", bore: 62, stroke: 41.2, cylinders: 2, category: "Sport" },
  { name: "Ninja ZX-25R", brand: "Kawasaki", bore: 50, stroke: 31.8, cylinders: 4, category: "Sport" },
  { name: "Yamaha R25", brand: "Yamaha", bore: 60, stroke: 44.1, cylinders: 2, category: "Sport" },
];

export interface CVTSuggestion {
  component: string;
  description: {
    id: string;
    en: string;
  };
}

export const CVT_STANDARD_SUGGESTIONS: CVTSuggestion[] = [
  { 
    component: "Roller", 
    description: {
      id: "Turunkan 1-2 gram dari standar untuk akselerasi lebih lincah tanpa mengorbankan top speed.",
      en: "Lower 1-2 grams from standard for more agile acceleration without sacrificing top speed."
    }
  },
  { 
    component: "Per CVT", 
    description: {
      id: "Gunakan 1000-1200 RPM agar bukaan power lebih awal dan merata.",
      en: "Use 1000-1200 RPM for earlier and smoother power delivery."
    }
  },
  { 
    component: "V-Belt", 
    description: {
      id: "Pastikan kondisi V-Belt original masih layak, ganti jika sudah retak.",
      en: "Ensure the original V-Belt is still in good condition, replace if cracked."
    }
  },
];

export const CVT_BOREUP_SUGGESTIONS: CVTSuggestion[] = [
  { 
    component: "Roller", 
    description: {
      id: "Gunakan 9g-11g (Matic 110-125cc) atau 12g-13g (Matic 150cc) untuk mengimbangi torsi besar.",
      en: "Use 9g-11g (110-125cc Matic) or 12g-13g (150cc Matic) to balance the high torque."
    }
  },
  { 
    component: "Per CVT & Sentri", 
    description: {
      id: "Wajib 1500 RPM agar tenaga tidak tertahan dan kopling tidak slip.",
      en: "Must use 1500 RPM to prevent power lag and clutch slippage."
    }
  },
  { 
    component: "Pulley & Kampas", 
    description: {
      id: "Bubut derajat pulley (13.5°) dan gunakan kampas ganda tipe high-grip/carbon.",
      en: "Modify pulley angle (13.5°) and use high-grip/carbon clutch linings."
    }
  },
];

export const FUEL_SUGGESTIONS = [
  { cc: 115, carb: "PE 24 / Injektor 4 Hole", spec: "Cocok untuk harian tune-up ringan." },
  { cc: 130, carb: "PE 26 / PWK 24 / Injektor 6 Hole", spec: "Akselerasi padat untuk stop and go." },
  { cc: 150, carb: "PE 28 / PWK 28 / Injektor 10 Hole", spec: "Spek legendaris untuk touring & balap." },
  { cc: 180, carb: "PWK 30-32 / Injektor 12 Hole", spec: "Butuh asupan bensin besar & stabil." },
  { cc: 200, carb: "PWK 34-38 / Injektor 16 Hole", spec: "Spek kompetisi, wajib pompa bensin deras." },
];

export interface GearSuggestion {
  setup: string;
  description: {
    id: string;
    en: string;
  };
}

export const GEAR_SUGGESTIONS: GearSuggestion[] = [
  {
    setup: "14 - 38",
    description: {
      id: "Standar akselerasi perkotaan untuk bebek 125cc-150cc.",
      en: "Standard city acceleration for 125cc-150cc cub bikes."
    }
  },
  {
    setup: "15 - 45",
    description: {
      id: "Rasio 'berat' untuk mengejar top speed pada motor sport bore-up.",
      en: "Heavy ratio to chase top speed on bore-up sport bikes."
    }
  },
  {
    setup: "13 - 48",
    description: {
      id: "Rasio 'ringan' cocok untuk trail/adventure atau sirkuit pendek.",
      en: "Light ratio suitable for trail/adventure or short circuits."
    }
  }
];

export const TRANSLATIONS = {
  id: {
    title: "MEKANIK DIGITAL",
    subtitle: "Kalkulator Bore Up Presisi & Panduan Setting Kirian Profesional.",
    statusLabel: "Status Mesin",
    statusValue: "SIAP BALAP",
    calcTitle: "Kalkulator Kapasitas Mesin",
    boreLabel: "Diameter Piston (Bore)",
    strokeLabel: "Langkah (Stroke)",
    cylLabel: "Jumlah Silinder",
    calculateBtn: "HITUNG SEKARANG",
    resetBtn: "Reset",
    resultLabel: "Hasil Kapasitas",
    basedOn: "Berdasarkan:",
    cvtTitle: "REKOMENDASI KIRIAN (CVT)",
    gearTitle: "SETTING GEAR (SPROKET)",
    compressionTitle: "RASIO KOMPRESI (CR)",
    fuelTitle: "SISTEM BAHAN BAKAR",
    standardLabel: "SETTING STANDAR",
    boreUpLabel: "SETTING BORE UP",
    tipTitle: "Tips Mekanik:",
    tipCvt: "Untuk bore up ekstrim, pastikan menggunakan per sentri yang lebih keras (1500-2000 RPM).",
    crLabel: "Volume Head (cc)",
    crResult: "Rasio Kompresi",
    fuelLabel: "Rekomendasi Karbu/Injek",
    presetTitle: "Data Standar Motor",
    presetSub: "MODELS",
    proTipTitle: "Tips Pro",
    proTipDesc: "Klik pada daftar motor untuk mengisi data standar. Modifikasi piston ke diameter lebih besar untuk performa.",
    footerTop: "Didesain untuk Skena Racing Balap Malam",
    footerBottom: "© 2026 JVC DIGITAL MECHANIC CALCULATOR"
  },
  en: {
    title: "DIGITAL MECHANIC",
    subtitle: "Precision Bore-Up Calculator & Professional CVT Tuning Guide.",
    statusLabel: "Engine Status",
    statusValue: "READY TO RACE",
    calcTitle: "Engine Capacity Calculator",
    boreLabel: "Piston Diameter (Bore)",
    strokeLabel: "Piston Stroke",
    cylLabel: "Number of Cylinders",
    calculateBtn: "CALCULATE NOW",
    resetBtn: "Reset",
    resultLabel: "Capacity Result",
    basedOn: "Based on:",
    cvtTitle: "CVT TUNING RECOMMENDATIONS",
    gearTitle: "GEAR SETTINGS (SPROCKET)",
    compressionTitle: "COMPRESSION RATIO (CR)",
    fuelTitle: "FUEL SYSTEM SETUP",
    standardLabel: "STANDARD SETUP",
    boreUpLabel: "BORE UP SETUP",
    tipTitle: "Mechanic Tip:",
    tipCvt: "For extreme bore-ups, ensure you use harder centripetal springs (1500-2000 RPM).",
    crLabel: "Combustion Chamber (cc)",
    crResult: "Compression Ratio",
    fuelLabel: "Carb/Injector Recommendation",
    presetTitle: "Standard Engine Data",
    presetSub: "MODELS",
    proTipTitle: "Pro Tip",
    proTipDesc: "Click on the motorcycle list to fill standard data. Modify piston to larger diameter for performance.",
    footerTop: "Designed for the Racing Community",
    footerBottom: "© 2026 JVC DIGITAL MECHANIC CALCULATOR"
  }
};
