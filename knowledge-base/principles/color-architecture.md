# Color Architecture — AuraDKit Design Principles

> A color system is not a palette. It is a semantic layer that maps intent to value — decoupling design decisions from implementation details.

## Core Principle

Use **semantic color tokens** (names that describe purpose, not appearance): `--aurad-primary`, `--aurad-surface`, `--aurad-error`. Never use literal color values in component code. This enables theming, dark mode, and brand updates with a single change.

---

## 1. The Semantic Layer

### 1.1 Required Token Set (Minimum)
Every project must define these 12 base tokens before writing any component:

```css
:root {
  /* Brand */
  --aurad-primary:        oklch(0.55 0.15 250);   /* #3b82f6 */
  --aurad-primary-hover:  oklch(0.50 0.15 250);   /* #2563eb */
  --aurad-primary-subtle: oklch(0.95 0.04 250);   /* #eff6ff */

  /* Surface */
  --aurad-surface:        oklch(0.98 0.005 250);  /* #f8fafc */
  --aurad-surface-raised: oklch(1.00 0.000 0);    /* #ffffff */
  --aurad-surface-sunken: oklch(0.96 0.005 250);  /* #f1f5f9 */

  /* Text */
  --aurad-text:           oklch(0.25 0.02 250);   /* #1e293b */
  --aurad-text-muted:     oklch(0.50 0.02 250);   /* #64748b */
  --aurad-text-inverse:   oklch(0.98 0.005 250);  /* #f8fafc */

  /* Border */
  --aurad-border:         oklch(0.85 0.01 250);   /* #cbd5e1 */
  --aurad-border-focus:   oklch(0.55 0.15 250);   /* #3b82f6 */

  /* Semantic */
  --aurad-error:          oklch(0.55 0.20 25);    /* #ef4444 */
  --aurad-success:        oklch(0.60 0.15 150);   /* #22c55e */
  --aurad-warning:        oklch(0.70 0.15 80);    /* #f59e0b */
}
```

### 1.2 OKLCH Advantage
OKLCH provides **perceptual uniformity**: equal chroma and lightness steps produce visually equal changes. This makes it possible to create color scales programmatically without manual correction.

```
oklch(L C H)
  L = Lightness  0–1     (0=black, 1=white)
  C = Chroma     0–0.4   (0=gray, 0.4=maximum saturation)
  H = Hue        0–360   (degrees, same as HSL)
```

**Creating a tint from a primary**:
```css
/* Primary */
--aurad-primary: oklch(0.55 0.15 250);

/* Tint: raise L, lower C */
--aurad-primary-subtle: oklch(0.95 0.04 250);

/* Shade: lower L, same C */
--aurad-primary-hover: oklch(0.50 0.15 250);
```

---

## 2. WCAG AA Compliance

### 2.1 Contrast Ratios
WCAG 2.1 AA requires:
- **4.5:1** for normal text (< 18pt regular or < 14pt bold)
- **3.0:1** for large text (≥ 18pt regular or ≥ 14pt bold)
- **3.0:1** for UI components and graphical elements

### 2.2 Pre-Validated Pairs (AuraDKit)

| Foreground | Background | Ratio | Grade |
|-----------|-----------|-------|-------|
| `--aurad-text` | `--aurad-surface` | 7.2:1 | AAA |
| `--aurad-text-inverse` | `--aurad-primary` | 4.8:1 | AA |
| `--aurad-primary` | `--aurad-surface` | 4.6:1 | AA |
| `--aurad-error` | `--aurad-surface` | 4.5:1 | AA |
| `--aurad-text-inverse` | `--aurad-error` | 5.1:1 | AA |

**NEVER use** (below AA):
- `--aurad-text-muted` on `--aurad-surface` → 3.9:1 (fails AA for normal text)
- `--aurad-primary-subtle` as text color on white → insufficient contrast
- Any placeholder text below 3.0:1

### 2.3 Validation Workflow
1. Define OKLCH tokens
2. Render in browser → DevTools → Computed tab → read RGB values
3. Paste RGB into WebAIM Contrast Checker
4. If AA pass → add to token docs
5. If fail → adjust L value ±0.05, repeat

---

## 3. Color Usage Rules

### 3.1 Frequency Rule
Prevent color overload by limiting primary color usage:

| Token | Max Coverage | Use For |
|-------|-------------|---------|
| `--aurad-primary` | 5% of pixels | CTAs, active states, links |
| `--aurad-error` | 2% | Error messages, destructive actions |
| `--aurad-success` | 2% | Success states, confirmations |
| `--aurad-surface` | 60%+ | Page backgrounds |
| `--aurad-surface-raised` | 30% | Cards, panels |

### 3.2 Color-Only Information Rule (WCAG 1.4.1)
**Never** convey information by color alone. Always pair color with:
- Text label ("Error: email is invalid")
- Icon (⚠, ✓, ✗)
- Pattern or shape change

```html
<!-- ❌ Color only -->
<input style="border-color: var(--aurad-error);">

<!-- ✅ Color + text + aria -->
<input style="border-color: var(--aurad-error);"
       aria-invalid="true" aria-describedby="email-err">
<p id="email-err" role="alert" style="color: var(--aurad-error);">
  ⚠ Invalid email format
</p>
```

---

## 4. Dark Mode Architecture

### 4.1 Token Swap Strategy
Dark mode should **only** change CSS custom property values, not class names or component structure.

```css
:root {
  --aurad-surface:        oklch(0.98 0.005 250);  /* light */
  --aurad-text:           oklch(0.25 0.02 250);
}

@media (prefers-color-scheme: dark) {
  :root {
    --aurad-surface:        oklch(0.12 0.01 250);  /* dark */
    --aurad-text:           oklch(0.95 0.005 250);
  }
}

/* Or data attribute for user toggle */
[data-theme="dark"] {
  --aurad-surface:        oklch(0.12 0.01 250);
  --aurad-text:           oklch(0.95 0.005 250);
}
```

### 4.2 Dark Mode WCAG
Dark backgrounds require **re-validation** of contrast ratios. Light-mode validated pairs do NOT automatically pass in dark mode.

---

## 5. AI Slop Color Patterns (Detected Data)

### 5.1 Purple-Blue Gradient Overuse
Hue range 220–310 (purple-blue) appearing as a gradient on hero backgrounds.

**Frequency in analyzed sites**: 34% of landing pages (high AI Slop signal)
**Detection**: `linear-gradient(purple, blue)` or combined stops in H:220–310 range
**Fix**: Use solid brand color or subtle texture instead

### 5.2 Generic Brand Palette
Sites with `--primary: #6366f1` (Tailwind indigo-500) or `--primary: #3b82f6` (Tailwind blue-500) without any customization are flagged as potential AI-generated defaults.

**Fix**: Shift hue by 10–30 degrees and adjust chroma to create brand distinction.

### 5.3 Color Token Explosion
High-score sites use **8–15 total tokens**. Low-score sites use 30–60+ hardcoded values with no token system.

---

## 6. Brand Color Customization

To differentiate from AI-slop defaults, apply these OKLCH adjustments:

| Personality | Primary Hue | Chroma | L |
|------------|------------|--------|---|
| Tech/SaaS (default) | 250 (blue) | 0.15 | 0.55 |
| Creative/Agency | 290 (violet) | 0.18 | 0.52 |
| Finance/Trust | 220 (deep blue) | 0.12 | 0.45 |
| Health/Wellness | 165 (teal) | 0.14 | 0.52 |
| Energy/Action | 35 (orange) | 0.20 | 0.62 |
| Premium/Dark | 85 (gold) | 0.12 | 0.78 |

---

## 7. Score Thresholds

| Score | Characteristics |
|-------|----------------|
| 8.0–10 | WCAG AA on all text, ≤15 unique colors, semantic tokens, OKLCH or CSS vars |
| 6.0–7.9 | WCAG AA mostly met, some hardcoding, partial token system |
| 4.0–5.9 | Some contrast violations, 20–40 unique colors, inconsistent token use |
| 0–3.9 | Contrast failures, 40+ hardcoded colors, no token system |
