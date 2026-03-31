# AI Slop Detection Rules — AuraDKit

> AI Slop Score measures how much a site resembles the statistical average of AI-generated UIs — the generic, over-polished, identity-free output that floods the web when teams ship the first LLM draft. Score: 0–100. Sites scoring > 60 are indistinguishable from each other.

## What Is AI Slop?

AI slop is the convergence of AI-generated UIs toward a single aesthetic: purple-blue gradients, rounded cards, Heroicons, Inter font, 3-column feature grids, glowing hero sections, and floating dashboard widgets. No individual choice is wrong — the combination is a signature. When every SaaS looks identical, none of them communicates brand identity.

---

## Detection Rule Set

### SLOP-01: Purple-Blue Gradient Hero

**Signal**: `background: linear-gradient` or `background: radial-gradient` in a hero or header element, where gradient stops include purple (H: 270–320°) and blue (H: 220–260°) in OKLCH.

```css
/* SLOP — detected pattern */
.hero {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
}

/* Also detected */
.hero {
  background: linear-gradient(to right, rgb(99, 102, 241), rgb(168, 85, 247));
}
```

**Detection heuristic**:
```
gradientHeroScore = heroElements with linear/radial-gradient × 15
```

Penalty caps at 30 (2 gradient heroes = maximum score in this dimension).

**Why it's slop**: The purple-to-blue gradient was the default Tailwind UI hero style in 2022. LLMs trained on 2022–2023 code output it reflexively. It carries no brand signal.

---

### SLOP-02: Generic Icon Set Without Brand Customization

**Signal**: Detecting Heroicons, Lucide, Phosphor, or Material Icons SVG path signatures in 20+ icon instances without any custom SVG icons present.

```html
<!-- SLOP — Heroicons outline style detected via path signature -->
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
     stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="..."/>
</svg>
<!-- 47 instances of the same library detected. 0 custom icons. -->
```

**Detection heuristic**:
```
genericIconScore = (genericIconCount / totalIconCount) > 0.95 ? 10 : 0
```

Pure icon set usage is not slop — it becomes slop signal when:
- All icons are from the same library
- No logo, no custom illustration, no brand mark exists
- The icon set is one of the top-5 most common (Heroicons, Lucide, Phosphor, Material, Font Awesome)

---

### SLOP-03: The 3-Column Feature Grid

**Signal**: `grid-template-columns: repeat(3, 1fr)` or `repeat(auto-fill, minmax(280px–320px, 1fr))` where each cell contains an icon + heading + description paragraph, with no variation in card height or content weight.

```html
<!-- SLOP — generic feature grid -->
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
  <div>
    <svg><!-- generic icon --></svg>
    <h3>Fast Performance</h3>
    <p>Our platform delivers blazing fast results every time.</p>
  </div>
  <div>
    <svg><!-- generic icon --></svg>
    <h3>Secure by Default</h3>
    <p>Enterprise-grade security built into every layer.</p>
  </div>
  <div>
    <svg><!-- generic icon --></svg>
    <h3>Easy to Use</h3>
    <p>Get started in minutes with our intuitive interface.</p>
  </div>
</div>
```

**Detection heuristic**:
```
featureGridScore = (3-column-icon-h3-p grids found) × 8
```

The pattern itself is not slop. It's slop when:
- All cells have identical content structure (icon + h3 + p)
- No visual hierarchy variation exists (all same size, same weight)
- Descriptions use generic SaaS language ("blazing fast", "secure by default", "easy to use")

**Text slop detection** (bonus signal):
```
slopTerms = ["blazing fast", "seamless", "robust", "cutting-edge", "state-of-the-art",
             "easy to use", "intuitive", "powerful", "secure by default", "built for scale"]
textSlopScore = occurrences of slopTerms in visible text × 2
```

---

### SLOP-04: Floating Dashboard UI Screenshot

**Signal**: A `<img>` or `<div>` inside a hero section styled with `box-shadow: 0 ... px rgba(...)` and `border-radius: 12px+` and `transform: perspective(...)` or `rotate`, typically labeled as a "product screenshot" or "dashboard preview".

```html
<!-- SLOP — floating dashboard widget in hero -->
<div style="position: relative;">
  <img src="/dashboard-screenshot.png"
       alt="Dashboard"
       style="border-radius: 16px;
              box-shadow: 0 40px 80px rgba(0,0,0,0.3);
              transform: perspective(1000px) rotateX(5deg);">
</div>
```

**Detection heuristic**:
```
floatingUIScore = heroImages with perspective-transform AND shadow > 20px ? 10 : 0
```

Floating UI screenshots aren't inherently slop — they become slop when:
- The screenshot is a generic dashboard (charts, stats cards, data tables)
- Combined with gradient hero background (SLOP-01)
- The screenshot contains no identifiable product-specific content

---

### SLOP-05: Glowing Orb / Blur Background

**Signal**: Elements with `filter: blur(60px+)` or `backdrop-filter: blur(20px+)` used as decorative background elements, often absolutely positioned circles with gradient fills.

```css
/* SLOP — decorative glowing orb */
.hero::before {
  content: '';
  position: absolute;
  inline-size: 600px;
  block-size: 600px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent);
  filter: blur(80px);
  border-radius: 50%;
  inset-block-start: -200px;
  inset-inline-end: -100px;
}
```

**Detection heuristic**:
```
glowOrbScore = elements with filter:blur > 40px AND radial-gradient AND position:absolute ? 12 : 0
```

---

### SLOP-06: Testimonial Carousel with Stars

**Signal**: A `role="region"` or section containing multiple elements with:
- `★★★★★` or 5 SVG star icons
- Avatar images with `border-radius: 9999px`
- Quote text in `<p>` or `<blockquote>`
- Navigation dots or prev/next buttons

```html
<!-- SLOP — boilerplate testimonial section -->
<section>
  <div>
    <div>★★★★★</div>
    <p>"This product changed our business completely. Highly recommended!"</p>
    <img src="/avatar1.jpg" style="border-radius: 9999px;">
    <p>Jane Doe, CEO at Example Corp</p>
  </div>
</section>
```

**Detection heuristic**:
```
testimonialSlopScore = (5-star + quote + avatar + role title) patterns × 5
```

Testimonials are valid — the slop signal fires when:
- Generic business language ("changed our business", "highly recommended")
- Generic stock-photo avatars (detected by common stock photo URL patterns)
- No specific metrics cited ("23% increase in conversions" vs. "changed our business")

---

### SLOP-07: Pill Badge Hero Label

**Signal**: A `<span>` or `<div>` immediately above the hero `<h1>`, styled with `border-radius: 9999px`, `border: 1px solid`, and containing text like "New", "Introducing", "Now available", "✨ Announcing", etc.

```html
<!-- SLOP — AI-generated hero label -->
<div style="display: inline-flex; align-items: center; gap: 8px;
            border: 1px solid rgba(99,102,241,0.3);
            border-radius: 9999px;
            padding: 4px 12px;
            margin-bottom: 16px;">
  <span>✨</span>
  <span style="font-size: 14px; color: #6366f1;">Introducing AuraKit 2.0</span>
</div>
<h1>The Design Intelligence Engine</h1>
```

**Detection heuristic**:
```
pillBadgeScore = pill-shaped element immediately before h1 in hero × 6
```

Not penalized if: the badge links to a changelog, a specific feature, or a numbered version with actual content.

---

## Composite AI Slop Score

```
aiSlopScore = gradientHeroScore
            + genericIconScore
            + featureGridScore
            + textSlopScore
            + floatingUIScore
            + glowOrbScore
            + testimonialSlopScore
            + pillBadgeScore
```

Capped at 100.

| Score Range | Classification | Description |
|------------|---------------|-------------|
| 0–20 | Authentic | Strong brand identity; original design decisions |
| 21–40 | Influenced | Some common patterns; recognizable origin |
| 41–60 | Generic | Indistinguishable category design; no differentiation |
| 61–80 | AI-Default | Identifiable as first-draft AI output |
| 81–100 | Full Slop | Template clone; zero brand signal |

---

## Score Reporting Format

```
AI Slop Score: 58/100 — Generic

Breakdown:
  SLOP-01 Gradient hero:          +15  (purple-to-blue gradient detected in hero)
  SLOP-02 Generic icon set:       +10  (94 Heroicons, 0 custom icons)
  SLOP-03 Feature grid:           +8   (3-column icon/h3/p grid detected)
  SLOP-05 Glow orb:               +12  (2 blur-80px radial gradient orbs)
  SLOP-07 Pill badge:             +6   ("✨ Introducing" label above h1)
  Text slop terms:                +7   (7 slopTerms in visible text)

Top recommendation: Replace gradient hero with solid surface + product screenshot.
  → Expected score drop: −15 (SLOP-01) − 12 (SLOP-05) = −27 points
```
