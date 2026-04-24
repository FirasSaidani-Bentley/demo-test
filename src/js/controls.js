// controls.js — Slider bindings, stats updates, preset buttons

import { buildChalet } from './chalet.js';
import { updateAnnotations, setAnnotationsVisible } from './annotations.js';
import { PRESETS, DEFAULT_PRESET } from './presets.js';

// Current params — start with default preset
let params = { ...PRESETS[DEFAULT_PRESET].params };

// Slider config: id → { key, unit, decimals }
const SLIDERS = [
  { id: 'slider-width',       key: 'width',       unit: 'm', decimals: 1 },
  { id: 'slider-depth',       key: 'depth',       unit: 'm', decimals: 1 },
  { id: 'slider-wallHeight',  key: 'wallHeight',  unit: 'm', decimals: 1 },
  { id: 'slider-roofPitch',   key: 'roofPitch',   unit: '°', decimals: 0 },
  { id: 'slider-overhang',    key: 'overhang',    unit: 'm', decimals: 1 },
];

function rebuild() {
  buildChalet(params);
  updateAnnotations(params);
  updateStats();
}

function updateStats() {
  const area = (params.width * params.depth).toFixed(1);
  const roofH = ((params.width / 2) * Math.tan((params.roofPitch * Math.PI) / 180)).toFixed(1);
  const totalH = (params.wallHeight + parseFloat(roofH)).toFixed(1);

  const areaEl = document.getElementById('stat-area');
  const roofEl = document.getElementById('stat-roofheight');
  const totalEl = document.getElementById('stat-totalheight');
  if (areaEl)   areaEl.textContent   = `${area} m²`;
  if (roofEl)   roofEl.textContent   = `${roofH} m`;
  if (totalEl)  totalEl.textContent  = `${totalH} m`;
}

function applyPreset(presetKey) {
  params = { ...PRESETS[presetKey].params };

  // Update all sliders and value displays
  SLIDERS.forEach(({ id, key, decimals }) => {
    const slider = document.getElementById(id);
    const valueEl = document.getElementById(id + '-value');
    if (slider) slider.value = params[key];
    if (valueEl) {
      const val = params[key];
      valueEl.textContent = Number.isInteger(val) || decimals === 0
        ? Math.round(val) + ''
        : val.toFixed(decimals);
    }
  });

  // Update slider fills
  SLIDERS.forEach(({ id }) => {
    const slider = document.getElementById(id);
    if (slider) updateSliderFill(slider);
  });

  // Update active button
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === presetKey);
  });

  rebuild();
}

function updateSliderFill(slider) {
  const min = parseFloat(slider.min);
  const max = parseFloat(slider.max);
  const val = parseFloat(slider.value);
  const pct = ((val - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(to right, var(--color-primary) ${pct}%, var(--color-surface-3) ${pct}%)`;
}

export function initControls() {
  // Sliders
  SLIDERS.forEach(({ id, key, unit, decimals }) => {
    const slider = document.getElementById(id);
    const valueEl = document.getElementById(id + '-value');
    if (!slider) return;

    // Set initial value
    slider.value = params[key];
    if (valueEl) {
      valueEl.textContent = decimals === 0
        ? Math.round(params[key])
        : params[key].toFixed(decimals);
    }
    updateSliderFill(slider);

    slider.addEventListener('input', () => {
      params[key] = parseFloat(slider.value);
      if (valueEl) {
        valueEl.textContent = decimals === 0
          ? Math.round(params[key])
          : params[key].toFixed(decimals);
      }
      updateSliderFill(slider);

      // Deselect presets when manually editing
      document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));

      rebuild();
    });
  });

  // Preset buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
  });

  // Annotations toggle
  const toggle = document.getElementById('toggle-annotations');
  if (toggle) {
    toggle.addEventListener('change', () => {
      setAnnotationsVisible(toggle.checked);
    });
  }

  // Apply default preset
  applyPreset(DEFAULT_PRESET);
}
