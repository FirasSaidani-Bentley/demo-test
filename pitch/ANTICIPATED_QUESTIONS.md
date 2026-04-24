# Anticipated Questions

## Technical questions

---

**Q: Why not use an existing viewer like the iTwin.js viewer or Bentley's own WebGL tools?**

A: Those viewers are the production destination. This prototype is the wedge — it proves the concept in the simplest possible way, with zero dependencies on platform APIs, so we can iterate at hackathon speed. The architecture is deliberately designed to connect upward: the parametric model in `chalet.js` can be replaced with iTwin project data, and the annotation layer stays intact. We chose to prove the client-facing interaction model first, then integrate.

---

**Q: Can this scale beyond a single chalet type? What about multi-storey buildings, or non-residential structures?**

A: The current parametric builder (`chalet.js`) handles walls, roof, floor, and overhang as composable geometry. Adding new building types means adding new builder modules following the same pattern — `buildChalet(params)` is the interface contract. The slider-to-geometry pipeline is geometry-agnostic. A multi-storey module, a warehouse module, or a bridge cross-section would plug in without changing the rendering or annotation layers.

---

**Q: What happens when the geometry gets more complex? Will the sub-100ms rebuild hold?**

A: At current complexity (a chalet with ~20 mesh objects), rebuild is well under 100ms. For significantly more complex geometry — full BIM-scale models — the rebuild-from-scratch approach would need to shift to incremental updates or level-of-detail strategies. That is a known architectural decision documented in the codebase. For the client-validation use case (presenting a design, not engineering a structure), current complexity is sufficient.

---

**Q: There's no backend and no persistence. Isn't that a limitation?**

A: For the prototype, it is a feature. Zero backend means zero infrastructure, zero security surface, and zero latency. It also means it works in a client meeting with no Wi-Fi. Persistence (URL state encoding, cloud save) is explicitly listed as the next-iteration feature. The decision to exclude it now was deliberate — adding URL state before the slider event model was stable would have introduced complexity without client-facing value.

---

**Q: Why vanilla JS instead of React or TypeScript?**

A: At this scale, framework overhead adds build complexity and slows initial development without providing client-facing benefit. Each JS module has a single responsibility and is independently readable. TypeScript would add value in production; at hackathon scale it slows the initial build. Any Bentley engineer familiar with the web stack can open any file and understand it in minutes — that matters for handoff.

---

## Business questions

---

**Q: Who would actually pay for this, and at what price point?**

A: The primary buyer is the architecture and construction firm, not the individual user. The value proposition is reducing rework cost — which averages 5–10% of project value. On a €500K chalet project, that is €25K–€50K at risk. A tool that prevents even one major revision cycle pays for itself in a single engagement. Pricing models could range from a per-seat SaaS add-on to Bentley's existing OpenBuildings offering, to a white-label module embedded in client-facing portals.

---

**Q: How is this different from SketchUp or any other 3D tool the architect already has?**

A: SketchUp is a modelling tool for trained users — it requires knowing how to model, not just how to adjust. This is a presentation tool for non-technical clients. The key differentiator is **parametric live annotations**: the client does not navigate a 3D scene to find dimensions — the dimensions are anchored to the geometry and update in real time. No competitor in the current market combines browser-based delivery, parametric control, and live dimension annotations in a zero-install package.

---

**Q: What is the adoption path? How do you get an architect to change their workflow?**

A: The tool has zero friction by design. The architect opens a URL (or an HTML file) and shares their screen. There is no account to create, no file to export, no software to install on the client's machine. The adoption path is: use it once in a meeting, watch the client engage, never go back to emailing PDFs. The initial wedge is the demo itself — which is why the tool had to work in a browser with no install as a hard requirement.

---

**Q: What's the ROI model for Bentley specifically?**

A: Three vectors. First, **product extension**: a lightweight parametric viewer extends Bentley's OpenBuildings and iTwin offerings into the client-facing layer — a space currently unserved. Second, **competitive differentiation**: no other infrastructure software vendor offers this experience out of the box. Third, **data entry point**: every dimension a client validates through this tool is a data point that can feed back into the engineering model — closing the loop between client intent and design execution.

---

## Scope questions

---

**Q: What's missing from the prototype that would be needed for production?**

A: Four things, in priority order:
1. **URL state persistence** — share a link with the exact configuration, not just a blank start state.
2. **More building typologies** — the parametric engine supports it; the geometry modules need to be written.
3. **Mobile optimization** — OrbitControls work on touch, but the slider panel layout needs responsive CSS.
4. **iTwin data connector** — replace the static `presets.json` with real project data from iTwin APIs.
None of these require architectural changes. They are additive layers on a stable foundation.

---

**Q: Why a chalet? Is this too niche?**

A: The chalet is a deliberately constrained scope — it let us validate the full pipeline (parametric geometry → live annotations → client interaction) in a single hackathon sprint without scope creep. The architectural choice that matters is not the building type; it is the pattern: any parametric building type can plug into the same slider-to-geometry-to-annotation pipeline. The chalet is the proof of concept. The pattern is the product.

---

**Q (hard): This is a prototype built in a hackathon. Why should Bentley invest engineering resources in productizing it rather than just buying a startup that already does this?**

A: Two reasons. First, no startup in this space combines parametric live annotations, browser-based zero-install delivery, and Bentley design system integration in a single package — we checked the competitive landscape. The closest alternatives (SketchUp Web, custom Three.js demos) are either too general or too bespoke to productize. Second, the architectural foundation is already aligned with Bentley's platform: the annotation and geometry layers are designed to connect to iTwin APIs, not to compete with them. Building this internally means the data model, the UX, and the integration path are owned by Bentley from day one — not negotiated through an acquisition.
