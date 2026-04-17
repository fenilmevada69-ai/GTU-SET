# Design System Strategy: Agentic MCP Gateway

## 1. Overview & Creative North Star: "The Neural Nexus"
The creative direction for this design system is **"The Neural Nexus."** We are moving away from the static, boxy layouts of traditional SaaS and toward a fluid, sentient interface that feels like an extension of the AI models it manages. 

The goal is to evoke the precision of a high-end IDE (like Linear) with the cinematic depth of a futuristic command center. We achieve this through **intentional asymmetry**, where the interface "breathes" with varying content densities, and **optical depth**, using light-refracting surfaces rather than flat containers. The UI doesn't just display data; it orchestrates it through a hierarchy of light and shadow.

---

## 2. Color & Atmospheric Surfaces
The palette is rooted in a deep, void-like foundation, punctuated by vibrant data-driven accents.

### Color Tokens
*   **Foundation:** `background` (#0f131e) / `surface` (#0f131e)
*   **Primary (Indigo-Core):** `primary` (#c0c1ff) | `primary_container` (#8083ff)
*   **Secondary (Cyan-Pulse):** `secondary` (#5de6ff) | `secondary_container` (#00cbe6)
*   **Semantic:** `success/tertiary` (#4edea3) | `error` (#ffb4ab)

### The "No-Line" Rule
To maintain a premium, editorial feel, **1px solid borders for sectioning are strictly prohibited.** 
*   **Structural Definition:** Use the `surface-container` scale. A sidebar should be `surface-container-low`, while the main workspace is `surface`. 
*   **In-Page Sectioning:** Separate content using tonal shifts (e.g., a `surface-container-highest` module sitting inside a `surface-container-low` panel).

### Glassmorphism & Surface Hierarchy
We treat the UI as a series of stacked, semi-transparent layers:
*   **Nesting:** Place `surface-container-lowest` elements inside `surface-container` to create "recessed" zones for secondary metadata.
*   **The Glass Effect:** For floating modals or navigation bars, use `surface_variant` at 60% opacity with a `20px` backdrop-blur. This allows the primary/secondary glow of background "blobs" to bleed through, creating a sense of environmental light.

---

## 3. Typography: Editorial Precision
We utilize **Inter** with a focus on tight tracking and deliberate scale contrasts to drive the "Agentic" persona.

*   **Display (The Statement):** Use `display-lg` (3.5rem) for high-impact AI status metrics. Set with -0.02em letter spacing to feel dense and authoritative.
*   **Headlines (The Context):** `headline-sm` (1.5rem) should be used for section headers. Avoid bold weights; use Medium (500) to maintain a sophisticated "Stripe-like" lightness.
*   **Body (The Intelligence):** `body-md` (0.875rem) is the workhorse. For AI-generated logs, use a Monospace font variant if available, or stay with Inter for high legibility.
*   **Labels (The Metadata):** Use `label-sm` (0.6875rem) in All-Caps with +0.05em tracking for category tags and technical parameters.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are a last resort. Depth is a product of light, not ink.

*   **The Layering Principle:** 
    1.  **Level 0 (Base):** `surface`
    2.  **Level 1 (Cards):** `surface-container-low`
    3.  **Level 2 (Active States):** `surface-container-high`
*   **Ambient Shadows:** For high-floating elements (Popovers), use a shadow: `0 24px 48px -12px rgba(0, 0, 0, 0.5)`. The "shadow" should feel like a natural occlusion of light in a dark room.
*   **The "Ghost Border" Fallback:** If a boundary is required for accessibility, use `outline-variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components & Interface Patterns

### Buttons: The Kinetic Core
*   **Primary (Action):** Gradient background from `primary` (#c0c1ff) to `primary_container` (#8083ff). No border. White text (`on_primary`).
*   **Secondary (Utility):** `surface-container-highest` background. Subtle `outline-variant` (20% opacity) "Ghost Border."
*   **Tertiary (Ghost):** No background. Interaction revealed by a shift to `surface-container-low` on hover.

### Input Fields: The Neural Entry
*   **Default State:** `surface-container-lowest` background. 
*   **Active State:** Soft glow using a 1px `secondary` (Cyan) "Ghost Border" and a subtle cyan outer-shadow (4% opacity).
*   **Validation:** Error states use `error` (#ffb4ab) text with a `error_container` background tint at 10% opacity.

### Cards & Lists: The Stream
*   **No Dividers:** Forbid the use of line dividers between list items. Use **8px (md) or 12px (xl)** vertical padding and background color shifts to define list rows.
*   **MCP Chips:** Use `secondary_container` for active AI agents. Corners should be `full` (9999px) to contrast with the `md` (0.375rem) corners of the main containers.

### Innovative Component: The "Agent Pulse"
A custom status indicator for active MCP connections. A `secondary` (Cyan) dot with a multi-layered CSS animation: one static core and two expanding rings (10% and 5% opacity) to signify a live, "thinking" connection.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use whitespace as a structural element. If a section feels crowded, increase the gap rather than adding a line.
*   **DO** use "Primary-to-Secondary" gradients sparingly—only for high-level AI health metrics or "Run" buttons.
*   **DO** ensure all glassmorphic layers have a minimum of `12px` backdrop-blur to maintain text legibility.

### Don’t
*   **DON'T** use pure black (#000) or pure white (#FFF). Always use the themed neutrals (`surface` and `on_surface`).
*   **DON'T** use 100% opaque borders. They break the "Neural Nexus" immersion and make the UI look like a legacy enterprise tool.
*   **DON'T** use standard "drop shadows" on cards. Rely on background color nesting for 90% of your elevation needs.