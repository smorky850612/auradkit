# Visual Hierarchy — AuraDKit Design Principles

> Derived from crawl analysis. Sites scoring 8.0+ on visualHierarchy axis share these patterns.

## Core Principle

Visual hierarchy is the arrangement of elements so the eye travels in an intentional order: most important → supporting → supplementary. Every screen has exactly one primary focal point.

---

## 1. Size Contrast Rules

### 1.1 Heading-to-Body Ratio
Reference sites maintain a **minimum 2.5× size ratio** between h1 and body text.

| Element | Min Size | Recommended | Notes |
|---------|----------|-------------|-------|
| H1 hero | 36px | 48–72px | `--aurad-text-4xl` or larger |
| H1 page | 30px | 36px | `--aurad-text-3xl` |
| H2 section | 24px | 28–30px | `--aurad-text-2xl` |
| H3 card | 18px | 20px | `--aurad-text-xl` |
| Body | 16px | 16px | `--aurad-text-base` (never below 14px) |
| Caption | 12px | 12–14px | `--aurad-text-xs` |

**Violation pattern** (detected in low-score sites):
- H1 and body are the same size or differ by less than 4px
- More than 5 distinct font sizes used across a single page

### 1.2 Weight Contrast
- Hero heading: `font-weight: 700–900`
- Section heading: `font-weight: 600–700`
- Body: `font-weight: 400`
- Caption/label: `font-weight: 400–500`

> Do NOT use semibold (600) for body text to create emphasis — use a heavier heading instead.

---

## 2. Focal Point Architecture

### 2.1 One Primary CTA Per Viewport
Every above-fold section should have exactly one primary button/action. Secondary actions use ghost or outline variant.

```html
<!-- ✅ Correct: one primary, one secondary -->
<div class="flex gap-3">
  <button style="background: var(--aurad-primary); color: var(--aurad-text-inverse);">
    Start free trial
  </button>
  <button style="background: transparent; border: 1px solid var(--aurad-border);
                 color: var(--aurad-text);">
    View demo
  </button>
</div>

<!-- ❌ Wrong: two primary buttons compete -->
<div class="flex gap-3">
  <button class="btn-primary">Start free trial</button>
  <button class="btn-primary">Contact sales</button>
</div>
```

### 2.2 Z-Depth as Hierarchy
Use elevation to signal importance. Reference sites follow this pattern:

| Layer | Shadow | Use Case |
|-------|--------|---------|
| Base | none | Body content, sections |
| Raised | `--aurad-shadow-sm` | Cards, inputs |
| Floating | `--aurad-shadow-md` | Dropdowns, popovers |
| Overlay | `--aurad-shadow-lg` | Modals, drawers |
| Critical | `--aurad-shadow-xl` | Onboarding, announcements |

---

## 3. Color as Signal

### 3.1 Primary Color Frequency
Reference sites use `--aurad-primary` for **3–5% of pixels**, not as background coverage.

Pattern:
- CTA buttons: ✅ primary fill
- Navigation active state: ✅ primary
- Section backgrounds: ❌ avoid primary fill (creates visual noise)
- Body text: ❌ never primary

### 3.2 Muted-to-Primary Contrast
Good hierarchy requires clear distinction between `--aurad-text-muted` (supporting info) and `--aurad-text` (primary content). The 2:1+ lightness difference must be preserved.

---

## 4. Whitespace as Structure

### 4.1 Section Separation
The gap between sections must be **larger** than the gap between elements within a section.

```
Page sections:      padding-block: 64–96px  (--aurad-space-16 / --aurad-space-24)
Card grid gaps:     gap: 24–32px            (--aurad-space-6 / --aurad-space-8)
Card internal:      padding: 16–24px        (--aurad-space-4 / --aurad-space-6)
Label-value pairs:  gap: 4–8px              (--aurad-space-1 / --aurad-space-2)
```

**Violation**: Section gap equals card-to-card gap → sections blend together.

### 4.2 Breathing Room Index
Top reference sites have an average of **35–55% whitespace** by area. Cramped layouts (< 25%) score below 5.0 on spatialRhythm.

---

## 5. Reading Flow Patterns

### 5.1 F-Pattern (Content-Heavy Pages)
For dashboards and docs: place critical info in the first two rows and left column.

```
┌──────────────────────────────────┐
│ █████████████████████████████    │  ← full width scan
│ █████████████████                │  ← partial scan
│ ████                             │  ← vertical scan begins
│ ████                             │
│ ████                             │
└──────────────────────────────────┘
```

### 5.2 Z-Pattern (Landing Pages)
For marketing pages: place brand top-left, CTA top-right, supporting info bottom-left, conversion bottom-right.

---

## 6. Hierarchy Anti-Patterns (Real Detections)

| Pattern | Detection Signal | Fix |
|---------|-----------------|-----|
| Flat hierarchy | All text 14–16px, same weight | Add 2+ size steps, vary weight |
| Purple-blue hero | `linear-gradient(purple, blue)` + center-aligned h1 | Use brand-specific color, offset layout |
| Icon inflation | 48px+ icons next to 14px body text | Size icons at 1.25× body text or use 24px |
| Button uniformity | Multiple equal-weight CTAs | One primary, remaining secondary/ghost |
| Border overuse | Every element bordered | Remove 70% of borders; use whitespace instead |

---

## 7. Score Thresholds

| Score | Characteristics |
|-------|----------------|
| 8.0–10 | Clear primary focal point, 3+ size steps, consistent weight hierarchy, strategic color use |
| 6.0–7.9 | Hierarchy exists but inconsistent; some competing elements |
| 4.0–5.9 | Flat hierarchy; hard to know where to look |
| 0–3.9 | No discernible hierarchy; visual chaos |
