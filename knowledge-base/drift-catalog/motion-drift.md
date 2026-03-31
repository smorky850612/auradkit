# Motion Drift — AuraDKit Drift Catalog

> Motion drift is when animation timing, easing, and intensity are inconsistent — some elements snap, others crawl, others bounce unpredictably. Detected in 47% of analyzed sites with a drift score > 40.

## What Is Motion Drift?

Motion drift occurs when transition durations, easing curves, and animation distances are specified ad-hoc rather than from a motion token system. The result is a site where hovering over different buttons produces subtly different response times, where page transitions feel heavier than component transitions, and where the total animation budget is exceeded — causing motion sickness in sensitive users.

---

## 1. Violation Signatures

### 1.1 Inconsistent Transition Durations

The most common motion drift: developers pick "feels right" timing without a defined scale.

```css
/* VIOLATION — arbitrary durations across the same site */
.btn:hover          { transition: background 0.1s; }     /* 100ms */
.card:hover         { transition: transform 0.3s; }      /* 300ms */
.nav-link:hover     { transition: color 0.15s; }         /* 150ms — close but not token */
.input:focus        { transition: border-color 200ms; }  /* 200ms — ad-hoc */
.modal              { transition: opacity 0.4s; }        /* 400ms — ok for modal */
.dropdown           { transition: all 0.25s ease; }      /* 250ms — using 'all' is drift */
```

```css
/* CORRECT — motion token durations */
.btn:hover {
  transition: background-color var(--aurad-duration-fast) var(--aurad-ease-default);
  /* 150ms cubic-bezier(0.4, 0, 0.2, 1) */
}
.card:hover {
  transition: box-shadow var(--aurad-duration-normal) var(--aurad-ease-default),
              transform var(--aurad-duration-normal) var(--aurad-ease-default);
  /* 250ms — normal interactions */
}
.modal {
  transition: opacity var(--aurad-duration-normal) var(--aurad-ease-out);
  /* 250ms — entrances/exits */
}
```

### 1.2 Using `transition: all`

`transition: all` is a drift accelerant — it applies transition to every CSS property, including layout-triggering properties like `width`, `height`, and `margin`, causing jank.

```css
/* VIOLATION */
.card { transition: all 0.3s ease; }
.btn  { transition: all 0.2s; }
.nav  { transition: all 250ms ease-in-out; }
```

```css
/* CORRECT — explicit property list */
.card {
  transition: box-shadow var(--aurad-duration-normal) var(--aurad-ease-default),
              transform  var(--aurad-duration-normal) var(--aurad-ease-default);
}
.btn {
  transition: background-color var(--aurad-duration-fast) var(--aurad-ease-default),
              opacity          var(--aurad-duration-fast) var(--aurad-ease-default);
}
```

Only animate `transform` and `opacity` — they use GPU compositing and do not trigger layout recalculation.

### 1.3 Easing Curve Inconsistency

Different easing curves produce different motion "feels" — mixing them creates an incoherent kinetic identity.

```css
/* VIOLATION — four different easing curves */
.hero-enter    { animation-timing-function: ease-in-out; }
.modal-open    { animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }  /* spring bounce */
.btn-hover     { transition-timing-function: ease; }
.sidebar-slide { transition-timing-function: linear; }   /* feels mechanical */
```

```css
/* CORRECT — three token-defined curves for different contexts */
:root {
  --aurad-ease-default: cubic-bezier(0.4, 0, 0.2, 1);   /* standard — most interactions */
  --aurad-ease-in:      cubic-bezier(0.4, 0, 1, 1);     /* exits — elements leaving screen */
  --aurad-ease-out:     cubic-bezier(0, 0, 0.2, 1);     /* entrances — elements entering */
}
```

| Context | Curve | Why |
|---------|-------|-----|
| Button hover, card hover, input focus | `--aurad-ease-default` | Standard interaction feedback |
| Modal/panel open, dropdown enter | `--aurad-ease-out` | "Settle into place" feeling |
| Modal close, notification dismiss | `--aurad-ease-in` | "Accelerate away" feeling |
| Never use for UI | `linear` | Feels robotic |
| Never use for UI | `ease-in-out` | Too symmetric, lacks intent |

### 1.4 Animation Distance Inconsistency

Slide-in elements that translate different distances — some slide 4px, others 16px, others 32px.

```css
/* VIOLATION — arbitrary translate values */
.dropdown-enter    { animation: slideDown-1 0.2s; }
@keyframes slideDown-1 { from { transform: translateY(-4px); } }

.toast-enter       { animation: slideIn-toast 0.3s; }
@keyframes slideIn-toast { from { transform: translateY(20px); } }

.modal-enter       { animation: modal-in 0.25s; }
@keyframes modal-in { from { transform: translateY(-30px) scale(0.95); } }

.sidebar-enter     { animation: slideRight 0.4s; }
@keyframes slideRight { from { transform: translateX(-50px); } }
```

```css
/* CORRECT — standardized enter distances by element type */

/* Micro: dropdowns, tooltips, small popovers — 4–6px */
@keyframes aurad-slide-down-micro {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Standard: modals, dialogs, panels — 8px + subtle scale */
@keyframes aurad-slide-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Large: full-panel slides (sidebar, drawer) — use translateX at 100% */
/* These slide from off-screen — distance is not a variable, it's full-width */
```

### 1.5 Missing prefers-reduced-motion

The most critical motion drift violation: no accommodation for users with vestibular disorders.

```css
/* VIOLATION — no reduced motion handling */
.card:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}

@keyframes hero-entrance {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
```

```css
/* CORRECT — reduced motion block at global scope */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration:       0.01ms !important;
    animation-iteration-count: 1     !important;
    transition-duration:      0.01ms !important;
    scroll-behavior:          auto   !important;
  }
}

/* For complex animations: honor the preference per-component */
.hero-entrance {
  animation: hero-in var(--aurad-duration-slow) var(--aurad-ease-out) both;
}

@media (prefers-reduced-motion: reduce) {
  .hero-entrance {
    animation: hero-in-fade 0.01ms both;   /* only opacity, no transform */
  }
  @keyframes hero-in-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
```

### 1.6 Scroll-Triggered Animation Cascade

Multiple scroll-triggered animations with identical timing create a "marching ants" effect instead of organic reveal.

```css
/* VIOLATION — all 12 feature cards enter at same timing */
.feature-card {
  animation: fadeInUp 0.6s ease both;
  /* all cards start at the same time → synchronized wave */
}
```

```css
/* CORRECT — staggered delays within a bounded range */
.feature-card:nth-child(1) { animation-delay: 0ms; }
.feature-card:nth-child(2) { animation-delay: 60ms; }
.feature-card:nth-child(3) { animation-delay: 120ms; }
.feature-card:nth-child(4) { animation-delay: 180ms; }
/* Cap at 4 visible items — beyond 4, repeat cycle or use JS IntersectionObserver */
/* Maximum stagger delay: 200ms — beyond this, late items feel abandoned */
```

---

## 2. Compliance Measurement

The crawler measures motion drift by:

1. Extracting all `transition-duration` values in milliseconds
2. Computing standard deviation against token values [150, 250, 400]
3. Detecting `transition: all` usage count
4. Checking for `prefers-reduced-motion` block presence
5. Scanning for `linear` easing on visible UI elements

```
motionTokenRate = transitions_using_token_durations / total_transitions × 100
```

| Compliance Rate | Score Range | Description |
|----------------|-------------|-------------|
| ≥ 90% + reduced-motion present | 8.0–10 | Controlled motion system |
| 70–89% | 6.0–7.9 | Mostly consistent; occasional drift |
| 50–69% | 4.0–5.9 | Significant timing variation |
| < 50% or no reduced-motion | 0–3.9 | No motion system / accessibility risk |

---

## 3. Token Reference

```css
:root {
  /* Duration */
  --aurad-duration-fast:   150ms;   /* hover feedback, color changes */
  --aurad-duration-normal: 250ms;   /* component enter/exit, standard interactions */
  --aurad-duration-slow:   400ms;   /* page-level entrances, heavy panels */

  /* Easing */
  --aurad-ease-default: cubic-bezier(0.4, 0, 0.2, 1);   /* standard */
  --aurad-ease-in:      cubic-bezier(0.4, 0, 1, 1);     /* exits */
  --aurad-ease-out:     cubic-bezier(0, 0, 0.2, 1);     /* entrances */
}
```

### Duration Assignment

| Element Type | Token | Value |
|-------------|-------|-------|
| Button color/bg | `--aurad-duration-fast` | 150ms |
| Input border/shadow | `--aurad-duration-fast` | 150ms |
| Dropdown open | `--aurad-duration-fast` | 150ms |
| Card hover transform | `--aurad-duration-normal` | 250ms |
| Modal enter | `--aurad-duration-normal` | 250ms |
| Tooltip enter | `--aurad-duration-fast` | 150ms |
| Sidebar slide | `--aurad-duration-slow` | 400ms |
| Page hero entrance | `--aurad-duration-slow` | 400ms |
| Skeleton pulse | 2000ms | (not from duration tokens — loop animation) |

---

## 4. Motion Budget

The total animation budget for a page at any given moment:

```
maxSimultaneousAnimations = 3
maxAnimationDuration = 500ms (for any single animation)
maxStaggeredItems = 6 (beyond 6, use IntersectionObserver batched reveal)
```

Exceeding the motion budget causes competing visual attention — users cannot focus on the primary content.

---

## 5. Drift Score Contribution

```
motionDrift = durationVariancePenalty + reducedMotionMissing + transitionAllPenalty + easingVariancePenalty
```

Where:
```
durationVariancePenalty  = min((1 - motionTokenRate) × 15, 10)
reducedMotionMissing     = prefers-reduced-motion block absent ? 8 : 0
transitionAllPenalty     = min(transitionAllCount × 2, 6)
easingVariancePenalty    = min(uniqueEasingCurves > 3 ? (count - 3) × 2 : 0, 6)
```

- 95% token rate, reduced-motion present, no `all`, 2 curves → motionDrift ≈ 0.75 (excellent)
- 70% token rate, reduced-motion absent, 2 `all`, 4 curves → motionDrift ≈ 4.5 + 8 + 4 + 2 = 18.5 (severe)
- 40% token rate, reduced-motion absent, 8 `all`, 6 curves → motionDrift ≈ 10 + 8 + 6 + 6 = 30 (critical)

Sites with `reducedMotionMissing = 8` automatically receive an accessibility flag in the drift report, regardless of total score — this is a hard requirement, not a soft recommendation.
