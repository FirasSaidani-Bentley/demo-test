// presets.js — Named chalet configurations

export const PRESETS = {
  studio: {
    label: 'Studio',
    icon: '🏠',
    params: { width: 5, depth: 4, wallHeight: 2.4, roofPitch: 30, overhang: 0.5 },
  },
  chalet: {
    label: 'Chalet',
    icon: '🏔️',
    params: { width: 9, depth: 7, wallHeight: 3.2, roofPitch: 45, overhang: 0.8 },
  },
  lodge: {
    label: 'Lodge',
    icon: '🏡',
    params: { width: 14, depth: 10, wallHeight: 4.0, roofPitch: 35, overhang: 1.0 },
  },
};

export const DEFAULT_PRESET = 'chalet';
