# Narrative

## Act 1 — The Problem: A Conversation That Keeps Breaking Down

Picture the final review meeting before a chalet project breaks ground.

The architect has spent three days preparing a PDF package — floor plans, elevations, section cuts. The client sits across the table, squinting at a flat drawing, and asks: *"What does it look like if we widen the living area by two meters? And lower the roof pitch a bit — it feels too steep."*

The architect knows the answer requires a CAD redraw. That is 30 to 90 minutes of work, a new export, a new email thread, and another meeting to reconvene. So they say: *"I'll get that to you by Thursday."*

Thursday becomes next week. Next week becomes a revision cycle. The revision cycle becomes rework on the construction site — because a dimension that was never visually confirmed turned out to mean something different to the client than it did on paper. Industry data puts rework at 5–10% of total project cost.

The tools that exist today make this worse, not better. Full BIM suites like Revit or MicroStation require trained operators and hours of model setup — they are not something you hand to a client in a meeting. SketchUp offers 3D but no live dimension control. PDF exports from MicroStation are static, 2D, and require a full re-export for every change. None of these let a non-technical client move a slider and immediately see what they are approving.

The problem is not that architects lack tools. The gap between *design tool* and *client conversation* has never been bridged. Every revision cycle is the price of that gap.

---

## Act 2 — The Shift: What If the Model Was the Conversation?

Now imagine the same meeting with one change: the architect opens a browser tab.

No software to install. No file to download. No GPU required. Just a 3D model of the chalet, live in the browser, with labeled dimensions anchored directly to the geometry.

The client asks the same question — *"Wider living area, lower roof"* — and the architect moves two sliders. In under 100 milliseconds, the model rebuilds. The annotations update. The new width appears on the geometry itself, not in a legend, not in a table — *on the wall, in the model*. The client sees the change happen. They say yes or no on the spot.

That is the shift: from *"trust the drawing"* to *"see it live."*

This is not a replacement for BIM. It is the front door — a zero-friction visualization layer that collapses the client sign-off loop from days to minutes. Browser-based 3D rendering has matured. Three.js and WebGL now run on standard laptops with no infrastructure behind them.

Bentley already serves over 5,000 infrastructure and construction firms globally. Every client-facing meeting those firms run is an opportunity to replace a static PDF with an interactive model. The parametric viewer is the wedge — lightweight enough to adopt immediately, and architecturally positioned to connect to iTwin data as complexity grows.

---

## Act 3 — The Prototype: Built, Running, Measurable Today

What we built is not a concept. It is a working parametric 3D chalet viewer that runs by opening a single HTML file.

**Four sliders. Real-time geometry. Live annotations.**

- **Width, Depth, Height, Roof Pitch** — every slider change rebuilds the full 3D model in under 100ms on a standard laptop.
- **CSS2D dimension labels** — anchored to the geometry in 3D space, always legible at any camera angle, styled with Bentley design tokens.
- **Three presets** — Small Chalet, Large Chalet, Studio — selectable in one click to demonstrate the range of use cases.
- **OrbitControls** — the client can rotate, zoom, and inspect the model from any angle without any training.
- **Zero install, zero backend, zero server** — the entire tool lives in a browser tab.

**Measured performance on a standard laptop:**
| Action | Result |
|---|---|
| Initial load | < 2 seconds |
| Geometry rebuild per slider change | < 100ms |
| Annotation repositioning | < 16ms (within one frame) |

The architecture is deliberate: vanilla JS modules, no framework, no build step. This means any Bentley engineer can open the source, understand it in minutes, and extend it — connecting it to real project data, adding more geometry types, or embedding it inside an iTwin workflow.

The prototype proves the thesis: a non-technical client can validate building dimensions in a live meeting, without a CAD operator, without waiting for a redraw, and without installing anything. That is the conversation that changes the economics of the design phase.
