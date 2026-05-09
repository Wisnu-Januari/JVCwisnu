export interface MotorPreset {
  name: string;
  brand: string;
  bore: number;
  stroke: number;
  cylinders: number;
  category: 'Matic' | 'Sport' | 'Bebek';
}

export const MOTOR_PRESETS: MotorPreset[] = [
  { name: "Honda Beat / Scoopy FI", brand: "Honda", bore: 50, stroke: 55.1, cylinders: 1, category: "Matic" },
  { name: "Honda Vario 125/150", brand: "Honda", bore: 52.4, stroke: 57.9, cylinders: 1, category: "Matic" },
  { name: "Honda Vario 160 / PCX 160", brand: "Honda", bore: 60, stroke: 55.5, cylinders: 1, category: "Matic" },
  { name: "Yamaha Mio / Soul / Fino", brand: "Yamaha", bore: 50, stroke: 57.9, cylinders: 1, category: "Matic" },
  { name: "Yamaha NMAX / Aerox 155", brand: "Yamaha", bore: 58, stroke: 58.7, cylinders: 1, category: "Matic" },
  { name: "Yamaha Jupiter Z", brand: "Yamaha", bore: 51, stroke: 54, cylinders: 1, category: "Bebek" },
  { name: "Satria FU 150", brand: "Suzuki", bore: 62, stroke: 48.8, cylinders: 1, category: "Sport" },
  { name: "Kawasaki KLX 150", brand: "Kawasaki", bore: 58, stroke: 54.4, cylinders: 1, category: "Sport" },
  { name: "Ninja 250 FI", brand: "Kawasaki", bore: 62, stroke: 41.2, cylinders: 2, category: "Sport" },
];

export interface CVTSuggestion {
  component: string;
  description: string;
}

export const CVT_SUGGESTIONS: CVTSuggestion[] = [
  { component: "Roller", description: "Gunakan 9g-11g untuk tarikan bawah responsif, atau seling (mix) untuk top speed." },
  { component: "Per CVT", description: "1500 RPM untuk mesin bore-up harian agar tenaga tidak tertahan." },
  { component: "Kampas Ganda", description: "Tipe Carbon/Relining untuk gigitan lebih kuat & anti gereget (vibrasi)." },
  { component: "Pulley Custom", description: "Kerok jalur roller & bubut derajat (13.5° - 13.8°) untuk akselerasi instan." },
];
