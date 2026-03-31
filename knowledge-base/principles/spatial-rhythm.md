# Spatial Rhythm — AuraDKit Design Principles

> Spatial rhythm is the consistent, predictable pattern of spacing that makes layouts feel intentional rather than arbitrary.

## Core Principle

Every spacing value in a design system is a multiple of 4px. This creates invisible grid lines that align elements without explicit borders, making designs feel "locked in" even without visible structure.

---

## 1. The 4px Grid

### 1.1 Base Unit
**4px** is the fundamental unit. All spacing is `4 × N` where N is a positive integer.

```
4px   → micro gaps (icon padding, tag padding)
8px   → tight gaps (label-field, badge inner)
12px  → small gaps (list item spacing)
16px  → standard gap (form fields, card content)
24px  → comfortable gap (card padding, nav items)
32px  → section sub-gap (features in a row)
48px  → section gap (sections on mobile)
64px  → page section gap (desktop sections)
96px  → hero breathing room
```

### 1.2 Compliance Measurement
AuraDKit measures the **4px compliance rate**: percentage of unique spacing values that are multiples of 4 (±1px tolerance for sub-pixel rendering).

| Rate | Score | Interpretation |
|------|-------|----------------|
| ≥ 90% | 8–10 | Systematic spacing; design token likely in use |
| 70–89% | 6–7.9 | Mostly systematic; a few exceptions |
| 50–69% | 4–5.9 | Inconsistent; partial token adoption |
| < 50% | 0–3.9 | Arbitrary spacing; no system |

### 1.3 Token Mapping
```css
:root {
  --aurad-space-1:  0.25rem;  /*  4px — micro */
  --aurad-space-2:  0.5rem;   /*  8px — tight */
  --aurad-space-3:  0.75rem;  /* 12px — small */
  --aurad-space-4:  1rem;     /* 16px — base */
  --aurad-space-6:  1.5rem;   /* 24px — comfortable */
  --aurad-space-8:  2rem;     /* 32px — generous */
  --aurad-space-12: 3rem;     /* 48px — section-sm */
  --aurad-space-16: 4rem;     /* 64px — section */
  --aurad-space-24: 6rem;     /* 96px — hero */
  --aurad-space-32: 8rem;     /* 128px — hero-xl */
}
```

---

## 2. Rhythm Patterns

### 2.1 Consistent Intra-Component Spacing
Within a card/component, use a **single spacing value** for internal rhythm, stepped up for groups.

```html
<!-- ✅ Consistent rhythm -->
<article class="p-6">                          <!-- 24px perimeter -->
  <h3 class="mb-2">Title</h3>                 <!-- 8px below heading -->
  <p class="mb-4 text-muted">Description</p> <!-- 16px below description -->
  <div class="flex gap-2">                     <!-- 8px between tags -->
    <span class="tag">Tag A</span>
    <span class="tag">Tag B</span>
  </div>
</article>

<!-- ❌ Inconsistent rhythm -->
<article style="padding: 18px 22px;">          <!-- 18px/22px: not 4px multiples -->
  <h3 style="margin-bottom: 7px;">Title</h3>  <!-- 7px: arbitrary -->
  <p style="margin-bottom: 13px;">...</p>     <!-- 13px: arbitrary -->
</article>
```

### 2.2 Progressive Spacing Scale
Moving outward from content → container → page, spacing should **increase** in steps:

```
text line-height       → 1.5 × font-size (implicit rhythm)
inline gap             → --aurad-space-2  (8px)
field-to-field         → --aurad-space-4  (16px)
card padding           → --aurad-space-6  (24px)
card-to-card gap       → --aurad-space-6  (24px)
section padding-block  → --aurad-space-16 (64px)
```

### 2.3 Rhythm Inversion (Anti-Pattern)
**Never** make outer spacing smaller than inner spacing:

```
❌ card padding: 8px, section gap: 4px
✅ card padding: 24px, section gap: 48px
```

---

## 3. Grid Alignment

### 3.1 CSS Grid Patterns
Reference sites use a **12-column grid** for content layouts, CSS Grid or Flexbox with gap.

```css
/* Page layout */
.layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--aurad-space-6);  /* 24px */
}

/* Card grid — auto-responsive */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--aurad-space-6);
}
```

### 3.2 Baseline Grid (Optional Enhancement)
For editorial layouts, use `line-height` as an 8px baseline:

```css
body {
  font-size: 1rem;         /* 16px */
  line-height: 1.5;        /* 24px — 6 baseline units */
}
h2 {
  font-size: 1.875rem;     /* 30px */
  line-height: 1.2;        /* 36px — 9 baseline units */
  margin-block-end: 1rem;  /* 16px — 4 baseline units */
}
```

---

## 4. Density Modes

### 4.1 Compact (Data-Dense UIs)
For dashboards, admin panels, data tables:
- Apply `× 0.75` multiplier to spacing scale
- Minimum touch target: 32px (reduced from 44px)
- Use smaller text: `--aurad-text-sm` as body

### 4.2 Comfortable (Default)
Standard spacing scale as defined in tokens.

### 4.3 Spacious (Marketing/Hero)
For landing pages, hero sections:
- Apply `× 1.25` multiplier
- Section padding: `--aurad-space-24` (96px+)
- Card padding: `--aurad-space-8` (32px)

---

## 5. Common Violations (Detected Sites)

### Arbitrary Pixel Syndrome
**Description**: 3px, 7px, 11px, 13px values scattered throughout.
**Root cause**: CSS written without a spacing system; direct pixel values from design tools.
**Fix**: Audit every margin/padding/gap; replace with nearest 4px-multiple token.

### Density Inversion
**Description**: Above-fold section is tightly packed (low padding), but footer has huge spacing.
**Fix**: Establish section padding tokens and apply consistently.

### Mixed Spacing Approaches
**Description**: Some elements use Tailwind classes (`p-4`, `gap-6`), others use inline px values (`padding: 18px`).
**Fix**: Choose one system; never mix Tailwind utilities with raw px values in production.

### Padding-Only Rhythm
**Description**: Spacing created entirely with padding; no margin or gap — creates visual stacking without breathing room between elements.
**Fix**: Use `gap` in flex/grid containers for spacing between siblings.

---

## 6. Score Thresholds

| Score | Characteristics |
|-------|----------------|
| 8.0–10 | ≥90% 4px compliance, consistent intra-component rhythm, progressive scale |
| 6.0–7.9 | 70–89% compliance, mostly consistent with occasional outliers |
| 4.0–5.9 | 50–69% compliance, some rhythm present |
| 0–3.9 | <50% compliance, arbitrary spacing throughout |
