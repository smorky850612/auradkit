# Typography Drift — AuraDKit Drift Catalog

> Typography drift is the second most common design system violation. It manifests as off-scale font sizes, inconsistent line heights, and uncontrolled font family proliferation. Detected in 61% of analyzed sites with a drift score > 40.

## What Is Typography Drift?

Typography drift occurs when font sizes, weights, and line heights do not conform to a defined type scale, or when font families multiply beyond the 2-family maximum. Instead of using scale values like 12, 14, 16, 18, 20, 24, 30px, drifting sites show values like 13, 15, 17, 19, 22, 26, 28, 33px — numbers that exist between scale points.

---

## 1. Violation Signatures

### 1.1 Off-Scale Font Sizes

The most common pattern: developers pick "comfortable-looking" sizes without consulting the type scale.

```css
/* VIOLATION — detected off-scale values */
.label    { font-size: 13px; }   /* should be 12px (--aurad-text-xs) */
.caption  { font-size: 15px; }   /* should be 14px (--aurad-text-sm) */
.body     { font-size: 17px; }   /* should be 16px (--aurad-text-base) */
.subtitle { font-size: 19px; }   /* should be 18px (--aurad-text-lg) */
.subhead  { font-size: 22px; }   /* should be 20px (--aurad-text-xl) */
.heading  { font-size: 26px; }   /* should be 24px (--aurad-text-2xl) */
.display  { font-size: 28px; }   /* should be 30px (--aurad-text-3xl) */
.hero     { font-size: 33px; }   /* should be 30px or 36px */
```

```css
/* CORRECT */
.label    { font-size: var(--aurad-text-xs); }    /* 12px */
.caption  { font-size: var(--aurad-text-sm); }    /* 14px */
.body     { font-size: var(--aurad-text-base); }  /* 16px */
.subtitle { font-size: var(--aurad-text-lg); }    /* 18px */
.subhead  { font-size: var(--aurad-text-xl); }    /* 20px */
.heading  { font-size: var(--aurad-text-2xl); }   /* 24px */
.display  { font-size: var(--aurad-text-3xl); }   /* 30px */
```

### 1.2 Line Height Violations

Line height below 1.3 on body text crushes legibility. Above 2.0 destroys reading flow.

```css
/* VIOLATION — too tight for body text */
.body { line-height: 1.2; }    /* heading territory — violates body readability */
.card-text { line-height: 1.1; }   /* nearly impossible to read at small sizes */

/* VIOLATION — too loose */
.label { line-height: 2.2; }   /* excessive; creates visual gaps between lines */
```

```css
/* CORRECT — line height by text role */
/* Display / Heading */
h1, h2 { line-height: var(--aurad-leading-tight); }    /* 1.25 */

/* Subheadings / UI text */
h3, h4, .label { line-height: var(--aurad-leading-snug); }   /* 1.375 */

/* Body copy */
p, li { line-height: var(--aurad-leading-normal); }    /* 1.5 */

/* Long-form article prose */
.prose p { line-height: var(--aurad-leading-loose); }  /* 1.75 */
```

### 1.3 Font Family Proliferation

More than two font families in a single project creates visual noise and increases network load.

```css
/* VIOLATION — 4 font families */
.hero-title  { font-family: 'Playfair Display', serif; }
.body        { font-family: 'Inter', sans-serif; }
.code        { font-family: 'JetBrains Mono', monospace; }
.pull-quote  { font-family: 'Merriweather', serif; }  /* fourth family — drift */
```

```css
/* CORRECT — 2-family maximum */
:root {
  --aurad-font-sans: system-ui, -apple-system, BlinkMacSystemFont,
                     "Segoe UI", Roboto, sans-serif;
  --aurad-font-mono: ui-monospace, "Cascadia Code", "Fira Code", monospace;
}

/* Optional: single display face for branding */
:root[data-font="editorial"] {
  --aurad-font-display: 'Playfair Display', Georgia, serif;
}
/* body and UI always use --aurad-font-sans */
/* Only headings may use --aurad-font-display when explicitly configured */
```

### 1.4 Weight Without Scale

Using raw weight numbers instead of semantic weight tokens creates inconsistency.

```css
/* VIOLATION — raw weight numbers */
.title  { font-weight: 600; }   /* bypasses scale */
.button { font-weight: 450; }   /* non-standard value */
.muted  { font-weight: 350; }   /* not widely supported */
```

```css
/* CORRECT */
.title  { font-weight: var(--aurad-font-semibold); }  /* 600 */
.button { font-weight: var(--aurad-font-medium); }    /* 500 */
.muted  { font-weight: var(--aurad-font-normal); }    /* 400 */
```

### 1.5 Missing font-display: swap

Web fonts without `font-display: swap` cause invisible text (FOIT) during loading, degrading perceived performance.

```css
/* VIOLATION — no font-display */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
}
```

```css
/* CORRECT */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;   /* prevents FOIT; shows fallback immediately */
  font-weight: 400 700; /* variable font range */
}
```

### 1.6 Letter Spacing Applied to Body

`letter-spacing` on body copy forces the browser to override the font designer's kern pairs — degrading readability.

```css
/* VIOLATION — letter-spacing on body text */
p { letter-spacing: 0.05em; }       /* destroys kern pairs */
.description { letter-spacing: 1px; }  /* absolute spacing compounds at scale */
```

```css
/* CORRECT — letter-spacing only for display text */
h1 { letter-spacing: -0.02em; }   /* tight for large headings — reduces optical spacing */
h2 { letter-spacing: -0.01em; }   /* slight tightening */

.badge      { letter-spacing: 0.05em; }   /* uppercase badges ONLY */
.overline   { letter-spacing: 0.08em; text-transform: uppercase; }

/* body, descriptions, labels: never touch letter-spacing */
```

---

## 2. Compliance Measurement

The crawler measures type scale compliance from computed CSS font-size values:

```
typeScale compliance = values_on_scale / total_fontsize_values × 100
```

Defined scale values (px): 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72

| Compliance Rate | Score Range | Description |
|----------------|-------------|-------------|
| ≥ 90% | 8.0–10 | Controlled type system |
| 70–89% | 6.0–7.9 | Mostly on-scale; occasional ad-hoc values |
| 50–69% | 4.0–5.9 | Significant drift; multiple off-scale values |
| < 50% | 0–3.9 | No visible type system |

---

## 3. Token Reference

```css
:root {
  /* Font Scale */
  --aurad-text-xs:   0.75rem;    /* 12px — badge, caption, meta */
  --aurad-text-sm:   0.875rem;   /* 14px — secondary label, table cell */
  --aurad-text-base: 1rem;       /* 16px — body copy (browser default) */
  --aurad-text-lg:   1.125rem;   /* 18px — lead paragraph, card subtitle */
  --aurad-text-xl:   1.25rem;    /* 20px — subheading, large UI label */
  --aurad-text-2xl:  1.5rem;     /* 24px — section heading */
  --aurad-text-3xl:  1.875rem;   /* 30px — page heading */
  --aurad-text-4xl:  2.25rem;    /* 36px — hero heading */
  --aurad-text-5xl:  3rem;       /* 48px — display */
  --aurad-text-6xl:  3.75rem;    /* 60px — large display */
  --aurad-text-7xl:  4.5rem;     /* 72px — hero display */

  /* Font Weight */
  --aurad-font-thin:      100;
  --aurad-font-light:     300;
  --aurad-font-normal:    400;
  --aurad-font-medium:    500;
  --aurad-font-semibold:  600;
  --aurad-font-bold:      700;
  --aurad-font-extrabold: 800;
  --aurad-font-black:     900;

  /* Line Height */
  --aurad-leading-none:   1;
  --aurad-leading-tight:  1.25;   /* headings */
  --aurad-leading-snug:   1.375;  /* subheadings, UI */
  --aurad-leading-normal: 1.5;    /* body copy minimum */
  --aurad-leading-loose:  1.75;   /* long-form prose */
  --aurad-leading-relaxed: 2;     /* maximum (use sparingly) */

  /* Font Family */
  --aurad-font-sans: system-ui, -apple-system, BlinkMacSystemFont,
                     "Segoe UI", Roboto, sans-serif;
  --aurad-font-mono: ui-monospace, "Cascadia Code", "Fira Code",
                     monospace;
}
```

---

## 4. Drift Correction Rules

### Font Size Mapping

| Observed Value | Replace With | Token |
|---------------|--------------|-------|
| 11px | 12px | `--aurad-text-xs` |
| 13px | 12px | `--aurad-text-xs` |
| 15px | 14px | `--aurad-text-sm` |
| 17px | 16px | `--aurad-text-base` |
| 19px | 18px | `--aurad-text-lg` |
| 21px | 20px | `--aurad-text-xl` |
| 22px | 20px | `--aurad-text-xl` |
| 23px | 24px | `--aurad-text-2xl` |
| 26px | 24px | `--aurad-text-2xl` |
| 28px | 30px | `--aurad-text-3xl` |
| 33px | 30px | `--aurad-text-3xl` |
| 34px | 36px | `--aurad-text-4xl` |

### Line Height Correction

| Observed Value | Context | Replace With | Token |
|---------------|---------|--------------|-------|
| < 1.3 | body text | 1.5 | `--aurad-leading-normal` |
| < 1.2 | subheadings | 1.375 | `--aurad-leading-snug` |
| > 2.0 | any | 1.75 | `--aurad-leading-loose` |
| 1.0 | body text | 1.5 | `--aurad-leading-normal` |

### Font Family Audit

| Family Count | Severity | Action |
|-------------|---------|--------|
| 2 | None | Acceptable |
| 3 | Warning | Remove lowest-use family |
| 4+ | Critical | Consolidate to 2 maximum |

---

## 5. Responsive Typography

Fluid headings prevent layout breaks across viewport widths:

```css
/* CORRECT — fluid hero heading */
.hero-heading {
  font-size: clamp(
    var(--aurad-text-3xl),   /* 1.875rem — minimum (mobile) */
    5vw,                      /* fluid scaling */
    var(--aurad-text-5xl)    /* 3rem — maximum (desktop) */
  );
}

/* CORRECT — fluid section heading */
.section-heading {
  font-size: clamp(
    var(--aurad-text-2xl),   /* 1.5rem */
    3.5vw,
    var(--aurad-text-4xl)    /* 2.25rem */
  );
}
```

```css
/* VIOLATION — fixed px at hero scale */
.hero-heading { font-size: 48px; }   /* breaks on mobile without media query */
```

---

## 6. Drift Score Contribution

Typography drift contributes to the overall Design Drift Score:

```
typoDrift = (1 - complianceRate) × 25
```

- 90% compliance → typoDrift = 2.5 (minimal)
- 70% compliance → typoDrift = 7.5 (moderate)
- 50% compliance → typoDrift = 12.5 (severe)
- 30% compliance → typoDrift = 17.5 (critical)

Typography drift is weighted at ×25 vs spacing's ×40 because off-scale font sizes are less perceptually jarring than off-grid spacing — users notice uneven spacing before they notice a 2px font deviation.

Combined with font family count penalty:
```
typoDrift += max(0, fontFamilyCount - 2) × 5
```

- 2 families → no penalty
- 3 families → +5
- 4 families → +10
- 5+ families → +15 (capped)
