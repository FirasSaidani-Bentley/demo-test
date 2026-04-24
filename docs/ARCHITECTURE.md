# Architecture

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| 3D rendering | Three.js (via CDN) | r165 |
| Annotations | Three.js CSS2DRenderer | bundled with Three.js |
| UI controls | Vanilla HTML + CSS custom properties | — |
| Styling tokens | `tokens.css` (CSS variables) | — |
| No build step | Single `index.html` entry point | — |
| No backend | All state in memory, zero server | — |

---

## File structure

```
src/
├── index.html          # Entry point — loads all scripts and styles
├── css/
│   ├── tokens.css      # Bentley design tokens (colors, spacing, radius)
│   └── layout.css      # Panel layout, card styles, slider components
├── js/
│   ├── scene.js        # Three.js scene, camera, lights, renderer setup
│   ├── chalet.js       # Parametric geometry builder (walls, roof, floor, overhang)
│   ├── annotations.js  # CSS2DRenderer labels, dimension lines (Three.js Line)
│   ├── controls.js     # Slider bindings → calls chalet.js + annotations.js
│   └── presets.js      # Named configurations (small / large / studio)
└── data/
    └── presets.json    # Default dimension values per preset
```

---

## Why this stack

- **Three.js via CDN** — zero build step, runs by opening `index.html`; r165 includes CSS2DRenderer natively.
- **CSS2DRenderer for annotations** — renders HTML `<div>` labels anchored to 3D world positions; stays readable at any camera angle without custom shaders.
- **Vanilla JS modules** — no framework overhead, no compilation, no node_modules; each file has one responsibility.
- **CSS custom properties in `tokens.css`** — single source of truth for Bentley colors and spacing; the UI agent can restyle without touching JS.
- **`presets.json`** — static data file keeps dimension defaults out of code; easy to extend without touching logic.

---

## Key decisions

### Parametric model rebuilt on every slider change
`chalet.js` exposes a single `buildChalet(params)` function. Every slider change disposes the previous geometry and rebuilds from scratch. This is simpler than morphing geometry and fast enough at this scale (under 100ms on a standard laptop).

### Dimension annotations as CSS2D HTML elements
Annotations are `<div>` elements positioned in 3D space via `CSS2DRenderer`. This means they are always legible (anti-aliased, correct font), can be styled with `tokens.css`, and do not require any canvas drawing or text geometry.

### Dimension lines as Three.js `Line` objects
Each annotation has a companion `Line` drawn between the two measured points. Lines are rebuilt alongside the geometry so they always match the current dimensions.

### Camera: OrbitControls, no first-person
`OrbitControls` is the right choice for a building viewer — the user orbits around the object. First-person would disorient non-technical clients.

### No persistence, no URL state in prototype
State lives in JS memory only. URL encoding (feature 9) is a next-iteration feature; adding it now would complicate the slider event model before the core is stable.

### What was deliberately excluded
- No React, Vue, or any framework — adds build complexity with no benefit at this scale.
- No WebGL shaders — Three.js standard materials are sufficient; custom shaders require GPU expertise.
- No backend — prototype must run offline and without a server.
- No TypeScript — type safety is valuable in production; at hackathon scale it slows initial build speed.

---

## Data flow

```
User moves slider
      │
      ▼
controls.js reads all slider values → params object
      │
      ▼
chalet.js.buildChalet(params) → disposes old meshes, builds new geometry
      │
      ▼
annotations.js.updateAnnotations(params) → repositions labels and lines
      │
      ▼
Three.js render loop → frame drawn
```

---

## Performance targets

| Action | Target |
|--------|--------|
| Initial load | < 2 seconds |
| Geometry rebuild on slider change | < 100ms |
| Annotation reposition | < 16ms (within one frame) |
| Works on | Standard laptop, no GPU required |
