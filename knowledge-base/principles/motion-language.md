# Motion Language — AuraDKit Design Principles

> Motion communicates state changes. Every animation should answer: what changed, why it changed, and where the user's attention should go next.

## Core Principle

Motion has a purpose hierarchy: **functional > meaningful > decorative**. Decorative animations should be the last thing added to a UI, not the first. Every animation must be disabled via `prefers-reduced-motion`.

---

## 1. The Three Motion Tiers

### Tier 1: CSS-Only (Default — Always Appropriate)
Zero JavaScript, zero dependencies. Works in every environment.

```css
/* State transitions */
.button {
  transition:
    background-color var(--aurad-duration-fast) var(--aurad-ease-default),
    box-shadow var(--aurad-duration-fast) var(--aurad-ease-default),
    transform var(--aurad-duration-fast) var(--aurad-ease-default);
}
.button:hover {
  transform: translateY(-1px);
  box-shadow: var(--aurad-shadow-md);
}

/* Skeleton loading */
@keyframes aurad-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.skeleton {
  animation: aurad-pulse 2s ease-in-out infinite;
}
```

### Tier 2: JS-Enhanced (Request-Based)
Browser APIs only. No npm packages.

```javascript
// IntersectionObserver for scroll-triggered reveals
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### Tier 3: Library (Explicit Request Only)
Framer Motion, GSAP, etc. **Never add without user request.**

---

## 2. Timing System

### 2.1 Duration Tokens
```css
:root {
  --aurad-duration-fast:   150ms;  /* micro: button hover, focus ring */
  --aurad-duration-normal: 250ms;  /* standard: dropdown, modal open */
  --aurad-duration-slow:   400ms;  /* rich: page transition, reveal */
}
```

### 2.2 Duration Rules
| Interaction | Duration | Reasoning |
|-------------|----------|-----------|
| Hover state | 100–150ms | Instant feedback |
| Focus ring | 100ms | Should feel immediate |
| Dropdown open | 200–250ms | Fast but perceivable |
| Modal open | 250–300ms | Weighted, purposeful |
| Page transition | 300–400ms | Slow enough to orient |
| Loading skeleton | 1500–2000ms pulse | Calming, not rushed |
| Counter/progress | 800–1200ms | Enough to track number |

**Rule**: Animations > 500ms feel slow. Animations < 100ms are imperceptible. Neither is useful.

### 2.3 Easing Functions
```css
:root {
  /* Natural deceleration — most common */
  --aurad-ease-default: cubic-bezier(0.4, 0, 0.2, 1);

  /* Decelerate (entering: slide-in, modal open) */
  --aurad-ease-out: cubic-bezier(0, 0, 0.2, 1);

  /* Accelerate (leaving: modal close, slide-out) */
  --aurad-ease-in: cubic-bezier(0.4, 0, 1, 1);

  /* Spring — for playful contexts only */
  --aurad-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 3. prefers-reduced-motion (MANDATORY)

This block is **required in every project** that uses any animation or transition.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Why**: Users with vestibular disorders (vertigo, nausea from motion) rely on this preference. Ignoring it is a WCAG 2.1 AA violation (Success Criterion 2.3.3 Animation from Interactions, AAA) and violates 2.2.2 Pause, Stop, Hide (AA) for persistent animations.

**Detection**: AuraDKit scans CSS for `prefers-reduced-motion: reduce` rules. Sites without this score ≤2 on `motion.reducedMotionSupport`.

---

## 4. Animation Properties

### 4.1 GPU-Composited Properties (Use These)
These properties trigger GPU compositing, not layout recalculation. 60fps is achievable.

```css
/* ✅ GPU-accelerated */
transform: translateX(8px) translateY(-2px) scale(1.02) rotate(180deg);
opacity: 0.5;
```

### 4.2 Layout-Triggering Properties (Avoid Animating)
These force the browser to recalculate layout, causing jank.

```css
/* ❌ Never animate these */
width, height
top, left, bottom, right
margin, padding
font-size
```

**Exception**: CSS Grid and Flexbox `gap` may be animated in modern browsers without layout thrashing when used with `display: grid/flex`. Test on target browsers.

### 4.3 Common Anti-Patterns
```css
/* ❌ Animating position */
.dropdown { transition: top 0.3s; }

/* ✅ Animating transform */
.dropdown { transition: transform 0.3s var(--aurad-ease-out), opacity 0.3s; }
.dropdown.hidden { transform: translateY(-8px); opacity: 0; }
.dropdown.visible { transform: translateY(0); opacity: 1; }
```

---

## 5. Pattern Library

### 5.1 Reveal (Scroll Trigger)
```css
[data-animate] {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity var(--aurad-duration-slow) var(--aurad-ease-out),
    transform var(--aurad-duration-slow) var(--aurad-ease-out);
}
[data-animate].visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 5.2 Modal Open/Close
```css
/* Overlay */
.modal-overlay {
  opacity: 0;
  transition: opacity var(--aurad-duration-normal) var(--aurad-ease-default);
}
.modal-overlay.open { opacity: 1; }

/* Panel */
.modal-panel {
  transform: scale(0.96) translateY(-4px);
  opacity: 0;
  transition:
    transform var(--aurad-duration-normal) var(--aurad-ease-out),
    opacity var(--aurad-duration-normal) var(--aurad-ease-out);
}
.modal-panel.open {
  transform: scale(1) translateY(0);
  opacity: 1;
}
```

### 5.3 Skeleton Pulse
```css
.skeleton {
  background: var(--aurad-surface-sunken);
  border-radius: var(--aurad-radius-sm);
  animation: aurad-pulse 1.8s ease-in-out infinite;
}

@keyframes aurad-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
}
```

### 5.4 Shimmer (Alternative Skeleton)
```css
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    var(--aurad-surface-sunken) 25%,
    var(--aurad-surface-raised) 50%,
    var(--aurad-surface-sunken) 75%
  );
  background-size: 200% 100%;
  animation: aurad-shimmer 1.5s infinite;
}

@keyframes aurad-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 6. Motion Anti-Patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| `transition: all` | Catches unexpected properties; performance risk | Enumerate specific properties |
| Width/height animation | Forces layout reflow | Use `max-height` with overflow clip, or `transform: scaleY` |
| Spinning on hover | Disorienting; no meaning | Reserve spin for loading states only |
| Continuous idle animation (bouncing arrow, pulsing CTA) | WCAG 2.2.2 violation if >5 sec | Add `animation-iteration-count: 3` limit or use scroll trigger |
| Animate everything simultaneously | Visual chaos | Stagger: 50–100ms offset per element |
| 1000ms+ transitions | Feels broken | Cap at 500ms for UI; 800ms max for narrative |
| `transition: none` with JS class swap | Flash/pop | Use requestAnimationFrame or add 10ms delay |

---

## 7. Score Thresholds

| Score | Characteristics |
|-------|----------------|
| 8.0–10 | `prefers-reduced-motion` present, GPU-only props, appropriate durations, meaningful motion |
| 6.0–7.9 | Mostly correct; some layout property animations or missing reduced-motion |
| 4.0–5.9 | `transition: all` or layout animation detected; no reduced-motion |
| 0–3.9 | No reduced-motion support, excessive/arbitrary animations, layout thrashing |
