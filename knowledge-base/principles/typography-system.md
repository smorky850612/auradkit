# Typography System — AuraDKit Design Principles

> Typography accounts for 70% of a screen's visual content. Systematic typography is the single highest-ROI design investment.

## Core Principle

A typography system has three components: a **scale** (limited set of sizes), a **stack** (font family choices), and **rhythm** (consistent line-height and spacing). All three must be defined before writing any component.

---

## 1. The Modular Scale

### 1.1 Standard Scale (7 steps)
Reference sites converge on this scale. Deviating without purpose creates drift.

```
12px  → xs    (captions, badges, timestamps)
14px  → sm    (secondary text, table data, labels)
16px  → base  (body text — MINIMUM for readable prose)
18px  → lg    (card body, form fields, prominent labels)
20px  → xl    (sub-heading, lead paragraph)
24px  → 2xl   (h3, card title, section intro)
30px  → 3xl   (h2, page section heading)
36px  → 4xl   (h1, feature title)
48px  → 5xl   (hero title — large viewports)
```

### 1.2 Off-Scale Sizes (Drift Indicators)
The following values appear in **low-score sites** as arbitrary choices:
`13px`, `15px`, `17px`, `19px`, `22px`, `26px`, `28px`, `33px`

When these appear more than once, they signal no typography system is in place.

### 1.3 Token Implementation
```css
:root {
  --aurad-text-xs:   0.75rem;    /* 12px */
  --aurad-text-sm:   0.875rem;   /* 14px */
  --aurad-text-base: 1rem;       /* 16px */
  --aurad-text-lg:   1.125rem;   /* 18px */
  --aurad-text-xl:   1.25rem;    /* 20px */
  --aurad-text-2xl:  1.5rem;     /* 24px */
  --aurad-text-3xl:  1.875rem;   /* 30px */
  --aurad-text-4xl:  2.25rem;    /* 36px */
  --aurad-text-5xl:  3rem;       /* 48px */
}
```

---

## 2. Font Stack

### 2.1 System Font (Default — Zero Load)
```css
--aurad-font-sans: system-ui, -apple-system, BlinkMacSystemFont,
                   "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--aurad-font-mono: ui-monospace, "Cascadia Code", "Fira Code",
                   "Jetbrains Mono", monospace;
```

System fonts render at native quality, load instantly, and match OS conventions. For most business software, they are the correct choice.

### 2.2 Custom Font Guidance
If a custom font is used:
- Maximum **2 families**: one for headings, one for body (or single family for both)
- Prefer variable fonts (`wght` axis) to reduce HTTP requests
- Always include `font-display: swap`
- Limit weights loaded: typically 400 + 600 + 700 (3 max)

```html
<!-- ✅ Efficient Google Fonts load -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
      rel="stylesheet">
```

### 2.3 Font Family Violation Threshold
Using **4+ font families** on a single site is a high-severity drift signal (detected via `cssTokens.fontFamilies.length`). It creates visual incoherence with no user benefit.

---

## 3. Line Height

### 3.1 Recommended Values

| Context | Line Height | Token |
|---------|-----------|-------|
| Heading (large) | 1.1–1.2 | `--aurad-leading-tight` |
| Heading (small) | 1.25–1.35 | `--aurad-leading-tight` |
| Body prose | 1.5–1.75 | `--aurad-leading-normal` |
| UI labels | 1.0–1.2 | none (single line) |
| Long-form content | 1.7–1.8 | `--aurad-leading-loose` |

```css
:root {
  --aurad-leading-none:   1;
  --aurad-leading-tight:  1.25;
  --aurad-leading-normal: 1.5;
  --aurad-leading-loose:  1.75;
}
```

### 3.2 Cramped Text Violation
Line height **below 1.3** for any body text is a drift indicator. It creates text that appears "pasted" and significantly reduces reading speed.

```css
/* ❌ Detected in low-score sites */
p { line-height: 1.2; }

/* ✅ */
p { line-height: var(--aurad-leading-normal); }  /* 1.5 */
```

---

## 4. Reading Width (Measure)

### 4.1 Optimal Line Length
The optimal line length for prose is **60–80 characters** (45–75ch). Beyond 80 characters, readers lose their place. Below 40 characters, rhythm is disrupted.

```css
/* Prose container */
.prose {
  max-inline-size: 65ch;
}

/* Article container */
article {
  max-inline-size: 72ch;
  margin-inline: auto;
}
```

### 4.2 Viewport-Width Text (Anti-Pattern)
Full-viewport-width text blocks (no max-width) are detected in low-score sites. Even on mobile (390px), `max-width: 100%` on text produces poor readability.

---

## 5. Weight System

### 5.1 Weight Scale

```css
:root {
  --aurad-font-normal:   400;  /* body, descriptions */
  --aurad-font-medium:   500;  /* labels, navigation */
  --aurad-font-semibold: 600;  /* card titles, h3 */
  --aurad-font-bold:     700;  /* h1, h2, CTA */
}
```

### 5.2 Semantic Weight Usage
| Element | Weight | Reasoning |
|---------|--------|-----------|
| Hero h1 | 700–800 | Maximum visual impact |
| Page h2 | 600–700 | Strong but not dominant |
| Card h3 | 600 | Clear hierarchy below h2 |
| Labels | 500 | Slightly prominent |
| Body text | 400 | Maximum readability |
| Captions | 400 | Same as body; size carries distinction |

**Violation**: Using weight 600+ for body text creates visual fatigue and reduces heading contrast.

---

## 6. Responsive Typography

### 6.1 Fluid Type (Optional)
For hero headings that need to scale between mobile and desktop:

```css
.hero-title {
  font-size: clamp(
    var(--aurad-text-3xl),   /* 30px min */
    5vw,                      /* fluid */
    var(--aurad-text-5xl)    /* 48px max */
  );
}
```

### 6.2 Step-Down Approach (Simpler)
Most reference sites use breakpoint-based size reduction:

```css
h1 {
  font-size: var(--aurad-text-3xl);  /* 30px mobile */
}
@media (min-width: 768px) {
  h1 { font-size: var(--aurad-text-4xl); }  /* 36px tablet */
}
@media (min-width: 1280px) {
  h1 { font-size: 3rem; }  /* 48px desktop */
}
```

---

## 7. Typography Anti-Patterns (Real Data)

| Pattern | Frequency in Low Scores | Fix |
|---------|------------------------|-----|
| `font-size: 15px` or `17px` | High | Use 14px or 16px token |
| `line-height: 1.1` on body | Medium | Set to 1.5 minimum |
| 4+ font families | Medium | Reduce to 1–2 |
| `font-size: 10px` or `11px` | Low | Minimum 12px for any text |
| All-caps body text | Low | Reserve all-caps for labels/badges only |
| No heading hierarchy (all same size) | High | Apply 3-step scale minimum |

---

## 8. Score Thresholds

| Score | Characteristics |
|-------|----------------|
| 8.0–10 | ≤6 font sizes, ≥90% on-scale, line-height ≥1.5 on body, ≤2 font families |
| 6.0–7.9 | 7–8 sizes, 70–89% on-scale, mostly appropriate line-height |
| 4.0–5.9 | 9–12 sizes, 50–69% on-scale, some cramped text |
| 0–3.9 | 12+ sizes, arbitrary scale, line-height violations, 4+ families |
