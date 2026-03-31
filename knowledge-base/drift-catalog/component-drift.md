# Component Drift — AuraDKit Drift Catalog

> Component drift is when the same UI element looks and behaves differently across a site because it was built independently each time instead of from a shared component. Detected in 79% of analyzed sites with a drift score > 40.

## What Is Component Drift?

Component drift occurs when UI patterns are reimplemented ad-hoc rather than reused. The resulting site has five different button styles, three card layouts with different radius values, and form inputs that look subtly different on every page — not because of intentional variation, but because each was built without referencing the others.

---

## 1. Violation Signatures

### 1.1 Button Inconsistency

The most visible form of component drift. Different pages use different padding, radius, or weight for "the same" primary button.

```css
/* VIOLATION — same semantic button, three implementations */

/* Page A */
.btn-primary {
  background: #3b82f6;
  padding: 10px 20px;         /* off-grid */
  border-radius: 6px;         /* off-scale */
  font-weight: 600;
}

/* Page B (another developer) */
.btn-submit {
  background: var(--aurad-primary);
  padding: 12px 24px;         /* on-grid */
  border-radius: 8px;         /* correct */
  font-weight: 500;           /* different weight — visual inconsistency */
}

/* Page C (third developer) */
button[type="submit"] {
  background: oklch(0.55 0.15 250);   /* token value, not token */
  padding: 0.625rem 1.25rem;  /* rem instead of token */
  border-radius: 4px;         /* different radius */
  font-weight: 700;           /* yet another weight */
}
```

```css
/* CORRECT — single source of truth */
.btn-primary {
  background: var(--aurad-primary);
  color: var(--aurad-text-inverse);
  padding: var(--aurad-space-2) var(--aurad-space-4);   /* 8px 16px */
  border-radius: var(--aurad-radius-md);                 /* 8px */
  font-size: var(--aurad-text-sm);                       /* 14px */
  font-weight: var(--aurad-font-semibold);               /* 600 */
  border: none;
  cursor: pointer;
  transition: opacity var(--aurad-duration-fast) var(--aurad-ease-default);
}
.btn-primary:hover { opacity: 0.9; }
```

### 1.2 Card Radius Drift

Cards with different border-radius values across the same grid — the most common component drift after buttons.

```css
/* VIOLATION — four different radii in a card grid */
.product-card  { border-radius: 8px; }
.feature-card  { border-radius: 12px; }
.pricing-card  { border-radius: 16px; }
.blog-card     { border-radius: 6px; }    /* not even on scale */
```

```css
/* CORRECT — single card radius token */
.card { border-radius: var(--aurad-radius-lg); }   /* 12px — consistent across all card types */
```

Exception: hero cards or featured items may use `--aurad-radius-xl` (16px) to signal visual prominence — but this must be intentional and documented.

### 1.3 Form Input Inconsistency

Inputs that look different across pages because each form was built independently.

```css
/* VIOLATION — three different input implementations */

/* Login page */
input.form-control {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 16px;
}

/* Settings page */
input.setting-field {
  border: 1px solid var(--aurad-border);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
}

/* Onboarding */
.onboard-input {
  border: 2px solid #e2e8f0;   /* different border width */
  border-radius: 12px;          /* larger radius */
  padding: 12px 16px;
  font-size: 16px;
}
```

```css
/* CORRECT — single input base style */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="search"],
textarea,
select {
  border: 1px solid var(--aurad-border);
  border-radius: var(--aurad-radius-md);                    /* 8px */
  padding: var(--aurad-space-2) var(--aurad-space-3);       /* 8px 12px */
  font-size: var(--aurad-text-sm);                           /* 14px */
  color: var(--aurad-text);
  background: var(--aurad-surface-raised);
  transition: border-color var(--aurad-duration-fast) var(--aurad-ease-default),
              box-shadow var(--aurad-duration-fast) var(--aurad-ease-default);
}
input:focus {
  outline: none;
  border-color: var(--aurad-border-focus);
  box-shadow: var(--aurad-shadow-focus);
}
```

### 1.4 Missing States (Incomplete Component Contract)

Components that only implement the `default` state, leaving `loading`, `empty`, and `error` states unspecified — forcing each page to invent its own pattern.

```html
<!-- VIOLATION — card with no loading/empty/error states -->
<div class="user-card">
  <!-- Only the happy path exists -->
  <img src="{{ user.avatar }}" alt="{{ user.name }}">
  <h3>{{ user.name }}</h3>
</div>
```

```html
<!-- CORRECT — 4-state component contract -->
<article data-state="default"    aria-label="User card — {{ user.name }}">
  <img src="{{ user.avatar }}" alt="{{ user.name }}">
  <h3>{{ user.name }}</h3>
</article>

<article data-state="loading"    aria-busy="true" aria-label="Loading user">
  <div class="skeleton" style="inline-size: 48px; block-size: 48px;
              border-radius: var(--aurad-radius-full);"></div>
  <div class="skeleton" style="block-size: 16px; inline-size: 60%;
              border-radius: var(--aurad-radius-sm);"></div>
</article>

<article data-state="empty"      aria-label="No user selected">
  <p style="color: var(--aurad-text-muted); font-size: var(--aurad-text-sm);">
    No user selected
  </p>
</article>

<article data-state="error"      role="alert">
  <p style="color: var(--aurad-error); font-size: var(--aurad-text-sm);">
    Failed to load user
  </p>
  <button type="button" style="color: var(--aurad-primary); font-size: var(--aurad-text-xs);">
    Retry
  </button>
</article>
```

### 1.5 Badge/Status Inconsistency

Status indicators with different shape, size, or color conventions across pages.

```html
<!-- VIOLATION — three "active" badges on three different pages -->

<!-- Users list -->
<span style="background: #dcfce7; color: #16a34a; padding: 2px 8px; border-radius: 4px;">
  Active
</span>

<!-- Dashboard -->
<div style="background: green; color: white; padding: 4px 12px; border-radius: 9999px;">
  Active
</div>

<!-- Admin panel -->
<span class="badge-success">Active</span>
<!-- .badge-success defined differently than the other two -->
```

```html
<!-- CORRECT — single badge pattern -->
<span class="badge badge--success" role="status" aria-label="Status: Active">
  Active
</span>

<style>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px var(--aurad-space-2);       /* 2px 8px */
  border-radius: var(--aurad-radius-full);
  font-size: var(--aurad-text-xs);          /* 12px */
  font-weight: var(--aurad-font-medium);    /* 500 */
  line-height: 1.5;
}
.badge--success  { background: var(--aurad-success-subtle);  color: var(--aurad-success); }
.badge--error    { background: var(--aurad-error-subtle);    color: var(--aurad-error); }
.badge--warning  { background: var(--aurad-warning-subtle);  color: var(--aurad-warning); }
.badge--info     { background: var(--aurad-info-subtle);     color: var(--aurad-info); }
.badge--neutral  { background: var(--aurad-surface-sunken);  color: var(--aurad-text-muted); }
</style>
```

---

## 2. Compliance Measurement

The crawler measures component drift by detecting:

1. **Radius variance**: standard deviation of `border-radius` values for semantically similar elements (cards, buttons, inputs)
2. **Padding variance**: standard deviation of padding values for same-type elements
3. **Color instance count**: number of unique background-color values used for same-role elements
4. **State coverage**: percentage of interactive components with all 4 states implemented

```
componentDrift = (radiusVariancePenalty + paddingVariancePenalty + colorInstancePenalty + stateCoverageGap) / 4
```

| Component Consistency | Score Range | Description |
|----------------------|-------------|-------------|
| Highly consistent (σ < 2px) | 8.0–10 | Token-first component system |
| Mostly consistent (σ 2–6px) | 6.0–7.9 | Occasional ad-hoc reimplementation |
| Inconsistent (σ 6–12px) | 4.0–5.9 | Multiple independent implementations |
| Fragmented (σ > 12px) | 0–3.9 | No component system |

---

## 3. Atomic Design Compliance

Components must respect size boundaries to remain composable:

| Level | Max Lines | Role | Examples |
|-------|----------|------|---------|
| Atom | 30 lines | Single element | Button, Badge, Input, Avatar, Icon |
| Molecule | 80 lines | Composed of atoms | Search bar, Form field, Card header |
| Organism | 250 lines | Full UI section | Data table, Pricing card, Nav, Modal |

```
atomViolationRate = atoms_over_30_lines / total_atoms × 100
moleculeViolationRate = molecules_over_80_lines / total_molecules × 100
organismViolationRate = organisms_over_250_lines / total_organisms × 100
```

A component exceeding its size limit is a signal that it contains embedded logic that belongs in a child component.

---

## 4. Drift Correction Rules

| Drift Type | Detection Signal | Fix |
|-----------|----------------|-----|
| Button radius variance | σ > 2px across buttons | Standardize to `--aurad-radius-md` |
| Card radius variance | 3+ distinct values | Choose `--aurad-radius-lg` as canonical |
| Input padding variance | σ > 4px | Use `--aurad-space-2 --aurad-space-3` |
| Missing loading state | No skeleton/spinner on async element | Add `[data-state="loading"]` with skeleton |
| Missing error state | No retry pattern on async element | Add `[data-state="error"]` with role="alert" |
| Badge color variety | 5+ unique success-green values | Consolidate to `--aurad-success-subtle` / `--aurad-success` |
| Icon set mixture | Both Heroicons + Lucide + Material | Choose one; remove others |

---

## 5. Drift Score Contribution

```
componentDrift = radiusVariancePenalty + stateCoverageGap + duplicateImplementationCount
```

Where:
```
radiusVariancePenalty = min(standardDeviation_borderRadius × 1.5, 10)
stateCoverageGap = (1 - statesCovered / 4) × 10
duplicateImplementationCount = uniqueButtonImplementations > 1 ? (count - 1) × 3 : 0
```

- σ=0 radius, 4 states, 1 button impl → componentDrift ≈ 0 (excellent)
- σ=4 radius, 2 states, 2 button impl → componentDrift ≈ 6 + 5 + 3 = 14 (moderate)
- σ=10 radius, 1 state, 4 button impl → componentDrift ≈ 10 + 7.5 + 9 = 26.5 (critical)

Sites with componentDrift > 20 consistently test as "unprofessional" or "low quality" in user perception studies, even when individual components look acceptable in isolation.
