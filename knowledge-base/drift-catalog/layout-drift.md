# Layout Drift — AuraDKit Drift Catalog

> Layout drift is when the structural grid breaks down — containers have different max-widths across pages, column counts change arbitrarily, and section padding is inconsistent. Detected in 55% of analyzed sites with a drift score > 40.

## What Is Layout Drift?

Layout drift occurs when the structural scaffolding of a site is reimplemented per-page rather than shared. Each page has a different container width, section padding values are inconsistent, and the responsive breakpoint behavior differs between sections. The result is a site that "jiggles" as users navigate between pages.

---

## 1. Violation Signatures

### 1.1 Container Width Anarchy

Different pages use different max-width constraints, producing layout width jumps during navigation.

```css
/* VIOLATION — four different container widths across one site */
.landing-container  { max-width: 1200px; margin: 0 auto; }
.blog-container     { max-width: 1100px; margin: 0 auto; }
.dashboard-wrapper  { max-width: 1440px; margin: 0 auto; }
.settings-wrap      { max-width: 960px;  margin: 0 auto; }
```

```css
/* CORRECT — tiered container system */
:root {
  --aurad-container-sm:  680px;   /* prose, auth pages */
  --aurad-container-md:  960px;   /* settings, narrow dashboards */
  --aurad-container-lg:  1280px;  /* standard page content */
  --aurad-container-xl:  1536px;  /* wide dashboards, data tables */
}

.container-prose     { max-inline-size: var(--aurad-container-sm);  margin-inline: auto; }
.container-narrow    { max-inline-size: var(--aurad-container-md);  margin-inline: auto; }
.container           { max-inline-size: var(--aurad-container-lg);  margin-inline: auto; }
.container-wide      { max-inline-size: var(--aurad-container-xl);  margin-inline: auto; }
```

### 1.2 Section Padding Collapse

Section-level vertical padding that matches or falls below component padding — destroying page rhythm.

```css
/* VIOLATION — section padding at card level */
.hero-section    { padding-block: 24px; }  /* same as card padding */
.features        { padding-block: 32px; }  /* only 2× card padding */
.cta-section     { padding-block: 16px; }  /* less than card padding — collapsed */
```

```css
/* CORRECT — section spacing 3–4× component spacing */
.section-sm     { padding-block: var(--aurad-space-12); }  /* 48px — compact */
.section        { padding-block: var(--aurad-space-16); }  /* 64px — standard */
.section-lg     { padding-block: var(--aurad-space-20); }  /* 80px — spacious */
.section-hero   { padding-block: var(--aurad-space-24); }  /* 96px — hero */
```

### 1.3 Grid Column Inconsistency

Card grids that use different column counts on the same viewport width across pages.

```css
/* VIOLATION — inconsistent grid definitions */

/* Products page */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);   /* fixed 4 columns */
  gap: 24px;
}

/* Blog page */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* fixed 3 columns — why? */
  gap: 16px;                               /* different gap */
}

/* Features section */
.features-grid {
  display: flex;           /* flex instead of grid */
  flex-wrap: wrap;
  gap: 20px;               /* different gap again */
}
```

```css
/* CORRECT — shared grid pattern */
/* Primary content grid: auto-fill, min 280px */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--aurad-space-6);   /* 24px */
}

/* Wide content grid: auto-fill, min 360px */
.grid-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: var(--aurad-space-6);
}

/* Feature grid: always 3-column on desktop */
.grid-features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--aurad-space-8);   /* 32px — features need breathing room */
}
```

### 1.4 Page Horizontal Padding Drift

The gutters between the container and the viewport edge differ across pages.

```css
/* VIOLATION — three different horizontal gutter values */
.landing   { padding-inline: 16px; }   /* on mobile */
.dashboard { padding-inline: 24px; }
.blog      { padding-inline: 32px; }
```

```css
/* CORRECT — consistent horizontal gutters */
/* Apply to all containers */
.container,
.container-prose,
.container-narrow,
.container-wide {
  padding-inline: var(--aurad-space-4);   /* 16px — mobile */
}

@media (min-width: 640px) {
  .container, .container-prose, .container-narrow, .container-wide {
    padding-inline: var(--aurad-space-6);   /* 24px — tablet */
  }
}

@media (min-width: 1024px) {
  .container, .container-prose, .container-narrow, .container-wide {
    padding-inline: var(--aurad-space-8);   /* 32px — desktop */
  }
}
```

### 1.5 Sidebar Width Drift

Sidebar-based layouts with different sidebar widths across pages.

```css
/* VIOLATION — dashboard and settings use different sidebar widths */
.dashboard-sidebar { width: 240px; }
.settings-sidebar  { width: 200px; }
.admin-nav         { width: 280px; }
```

```css
/* CORRECT — single sidebar width token */
:root {
  --aurad-sidebar-width:       220px;   /* standard sidebar */
  --aurad-sidebar-width-wide:  280px;   /* expanded/admin sidebar */
  --aurad-sidebar-width-mini:  64px;    /* icon-only collapsed state */
}
```

---

## 2. Compliance Measurement

The crawler measures layout drift by extracting:
1. All `max-width` / `max-inline-size` values on container-level elements
2. All `padding-block` / `padding-block-start` / `padding-block-end` values on section-level elements
3. All `grid-template-columns` / `gap` values on grid containers
4. Standard deviation across these values within semantic element groups

```
layoutConsistency = 1 - (stdDev_containerWidths / meanContainerWidth)
```

| Consistency Score | Score Range | Description |
|------------------|-------------|-------------|
| ≥ 0.95 | 8.0–10 | Grid system enforced consistently |
| 0.85–0.94 | 6.0–7.9 | Mostly consistent; occasional deviation |
| 0.70–0.84 | 4.0–5.9 | Noticeable layout variation across pages |
| < 0.70 | 0–3.9 | No layout system |

---

## 3. Responsive Breakpoint Compliance

Sites with layout drift frequently implement breakpoints inconsistently:

```css
/* VIOLATION — different breakpoints on same site */
@media (max-width: 767px)  { /* mobile — page A */ }
@media (max-width: 768px)  { /* mobile — page B (1px off) */ }
@media (min-width: 992px)  { /* desktop — page C */ }
@media (min-width: 1024px) { /* desktop — page D */ }
```

```css
/* CORRECT — mobile-first, fixed breakpoints */
/* sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px */

/* Always mobile-first: base styles = smallest screen */
.nav { display: none; }

@media (min-width: 1024px) {
  .nav { display: flex; }   /* show on desktop */
}
```

---

## 4. Dashboard Layout Standard

The canonical two-column dashboard layout:

```html
<div style="min-block-size: 100vh; display: flex;">

  <!-- Sidebar -->
  <aside style="inline-size: var(--aurad-sidebar-width);  /* 220px */
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
                background: var(--aurad-surface-raised);
                border-inline-end: 1px solid var(--aurad-border);">
    <!-- nav items -->
  </aside>

  <!-- Main area -->
  <div style="flex: 1; min-inline-size: 0; display: flex; flex-direction: column;">

    <!-- Top bar -->
    <header style="block-size: 56px;
                   flex-shrink: 0;
                   display: flex;
                   align-items: center;
                   padding-inline: var(--aurad-space-6);
                   background: var(--aurad-surface-raised);
                   border-block-end: 1px solid var(--aurad-border);">
    </header>

    <!-- Content -->
    <main style="flex: 1; overflow-y: auto; padding: var(--aurad-space-6);">
      <div style="max-inline-size: var(--aurad-container-lg); margin-inline: auto;">
        <!-- page content -->
      </div>
    </main>

  </div>
</div>
```

---

## 5. Z-Index Layer Compliance

Layout drift extends to stacking context — z-index values hardcoded without tokens cause overlap failures.

```css
/* VIOLATION — arbitrary z-index values */
.sticky-header { z-index: 100; }
.dropdown      { z-index: 99; }    /* lower than header — dropdown hides behind header! */
.modal-overlay { z-index: 9999; }
.tooltip       { z-index: 10000; }
```

```css
/* CORRECT — z-index token stack */
:root {
  --aurad-z-base:     0;
  --aurad-z-raised:   10;
  --aurad-z-dropdown: 100;
  --aurad-z-sticky:   200;
  --aurad-z-overlay:  300;
  --aurad-z-modal:    400;
  --aurad-z-toast:    500;
  --aurad-z-tooltip:  600;
}
```

---

## 6. Drift Score Contribution

```
layoutDrift = containerWidthVariancePenalty + sectionPaddingVariancePenalty + gridInconsistencyPenalty
```

Where:
```
containerWidthVariancePenalty = min(uniqueContainerWidths × 2, 12)
sectionPaddingVariancePenalty = min(stdDev_sectionPaddingBlock / 8, 10)
gridInconsistencyPenalty      = min(uniqueGapValues × 1.5, 8)
```

- 1 container width, σ=0 section padding, 1 gap → layoutDrift ≈ 2 (excellent)
- 3 container widths, σ=16px, 3 gaps → layoutDrift ≈ 6 + 2 + 4.5 = 12.5 (moderate)
- 5+ container widths, σ=40px, 5+ gaps → layoutDrift ≈ 12 + 5 + 8 = 25 (critical)

Sites with layoutDrift > 15 cause measurable user orientation loss when navigating between pages — eye-tracking studies show users re-anchor their gaze after each navigation, increasing cognitive load.
