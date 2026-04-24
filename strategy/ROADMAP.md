# Roadmap

---

## Prototype scope (today) — Must-have
> Achievable in one day. Every feature traces back to the core problem: clients cannot visualize dimension changes in real time.

| # | Feature | Why it matters |
|---|---------|----------------|
| 1 | **Parametric chalet in 3D** — gabled roof, walls, floor rendered with Three.js | Without the 3D base, nothing else works |
| 2 | **Dimension sliders** — width, depth, wall height, roof pitch, overhang (4–6 controls) | This is the core interaction: change a number, see it live |
| 3 | **Live dimension annotations** — lines and labels in meters drawn on the 3D model | Solves the client comprehension problem; replaces the flat 2D plan |
| 4 | **Annotations update in real time** — no reload, no lag, under 100ms | Without this, it's just a static render with labels |
| 5 | **Bentley visual identity** — primary blue #004B87, card UI, system-ui typography | Required for a credible Bentley demo |
| 6 | **Runs in browser, zero install** — single HTML file, no backend | Removes the friction of any setup during a client meeting |

---

## Next iteration — Nice-to-have
> Each feature independently valuable. Build in order if time allows today, otherwise ship in v2.

| # | Feature | Why it matters |
|---|---------|----------------|
| 7 | **Door and window placement** — sliders for position and size on each wall | Makes the model feel like a real building, not a box |
| 8 | **Preset configurations** — small chalet, large chalet, studio as one-click starting points | Reduces time to first meaningful state for a client |
| 9 | **Shareable URL** — encode configuration as query parameters | Client can send a link to their partner; no file attachment |
| 10 | **PDF export** — annotated orthographic views (front, side, top) | Bridges the gap to the paper world; client keeps a record |
| 11 | **Mobile-friendly layout** — responsive controls panel | Useful for on-site walkthroughs on a tablet |

---

## Long-term vision — Post-hackathon
> Requires backend work or Bentley platform integration. Out of prototype scope.

| # | Feature | Why it matters |
|---|---------|----------------|
| 12 | **iTwin data connection** — load real project geometry from Bentley's platform | Turns the prototype into a product |
| 13 | **MicroStation sync** — write dimension changes back to the source model via API | Closes the loop between client validation and engineering |
| 14 | **Multi-user session** — client and architect see the same model simultaneously | Transforms the tool from a viewer into a collaboration space |
| 15 | **Material and finish selector** — timber, cladding, roofing with cost estimate | Adds commercial value to the design conversation |
| 16 | **Embed in Bentley client portal** — iframe or micro-frontend integration | Makes the tool accessible without a separate URL |
