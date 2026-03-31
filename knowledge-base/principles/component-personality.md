# Component Personality — AuraDKit Design Principles

> A component is not a visual element. It is a contract: a defined set of states, props, and behaviors that reliably communicates system feedback to users.

## Core Principle

Every component must handle the **4 states**: default, loading, empty, error. A component that doesn't handle all 4 states is not production-ready. The state itself (not just the data) must be represented in the DOM for accessibility.

---

## 1. The 4-State Contract

### 1.1 State Definitions

| State | When | User Need |
|-------|------|-----------|
| `default` | Data available | View/interact with content |
| `loading` | Data fetching | Know the system is working |
| `empty` | No data exists | Understand why empty; know next action |
| `error` | Fetch failed or invalid | Know something went wrong; retry option |

### 1.2 DOM Signal Pattern
```html
<section data-state="loading" aria-busy="true" aria-label="User list">
  <!-- Only render content matching data-state -->
</section>
```

CSS-only state switching:
```css
[data-state="loading"] .content  { display: none; }
[data-state="default"] .skeleton { display: none; }
[data-state="empty"]   .content  { display: none; }
[data-state="error"]   .content  { display: none; }
```

### 1.3 Full 4-State Example — Stats Card
```html
<!-- DEFAULT -->
<article data-state="default" role="region" aria-label="Monthly revenue">
  <p class="label">Monthly Revenue</p>
  <p class="value">₩12,340,000</p>
  <p class="delta positive">↑ 12.5% vs last month</p>
</article>

<!-- LOADING -->
<article data-state="loading" aria-busy="true" aria-label="Loading monthly revenue">
  <div class="skeleton h-4 w-24"></div>
  <div class="skeleton h-8 w-36 mt-2"></div>
  <div class="skeleton h-4 w-28 mt-2"></div>
</article>

<!-- EMPTY -->
<article data-state="empty">
  <p class="empty-message">No revenue data yet.</p>
  <a href="/connect" class="link">Connect your payment provider →</a>
</article>

<!-- ERROR -->
<article data-state="error" role="alert">
  <p class="error-message">Could not load revenue data.</p>
  <button type="button" onclick="retry()">Try again</button>
</article>
```

---

## 2. Button Variants

### 2.1 Required Variants

Every button system must have these 5 variants:

| Variant | When to Use |
|---------|------------|
| `primary` | Single most important action per section |
| `secondary` | Supporting action (next to primary) |
| `ghost` | Low-emphasis action (in toolbars, navigation) |
| `danger` | Destructive action (delete, revoke) |
| `disabled` | Action unavailable; must include tooltip explaining why |

```html
<!-- Primary -->
<button type="button"
        style="background: var(--aurad-primary);
               color: var(--aurad-text-inverse);
               padding: var(--aurad-space-2) var(--aurad-space-4);
               border-radius: var(--aurad-radius-md);">
  Save changes
</button>

<!-- Secondary -->
<button type="button"
        style="background: transparent;
               color: var(--aurad-text);
               border: 1px solid var(--aurad-border);
               padding: var(--aurad-space-2) var(--aurad-space-4);
               border-radius: var(--aurad-radius-md);">
  Cancel
</button>

<!-- Danger -->
<button type="button"
        style="background: var(--aurad-error);
               color: var(--aurad-text-inverse);
               padding: var(--aurad-space-2) var(--aurad-space-4);
               border-radius: var(--aurad-radius-md);">
  Delete account
</button>

<!-- Disabled -->
<button type="button" disabled
        aria-disabled="true"
        title="You don't have permission to save"
        style="background: var(--aurad-surface-sunken);
               color: var(--aurad-text-disabled);
               cursor: not-allowed;">
  Save changes
</button>
```

### 2.2 Focus Ring (Non-Negotiable)
```css
:focus-visible {
  outline: 2px solid var(--aurad-border-focus);
  outline-offset: 2px;
}
/* Never: :focus { outline: none; } */
```

---

## 3. Card Anatomy

### 3.1 Card Structure
```
┌─────────────────────────────────┐
│  [optional header / badge]      │  ← 16px padding top
│                                 │
│  Title (font-weight: 600)       │  ← text-lg or text-xl
│  Description (text-muted)       │  ← text-sm, line-height 1.5
│                                 │
│  [optional media / chart]       │
│                                 │
│  [actions — right-aligned]      │  ← 16–24px padding bottom
└─────────────────────────────────┘
```

### 3.2 Card CSS
```html
<article
  style="background: var(--aurad-surface-raised);
         border: 1px solid var(--aurad-border);
         border-radius: var(--aurad-radius-lg);
         padding: var(--aurad-space-6);
         box-shadow: var(--aurad-shadow-sm);">
```

### 3.3 Interactive Card
For clickable cards, use `role="link"` or wrap in `<a>`, and add hover state:
```css
.card-interactive {
  transition: box-shadow var(--aurad-duration-normal) var(--aurad-ease-default),
              transform var(--aurad-duration-normal) var(--aurad-ease-default);
  cursor: pointer;
}
.card-interactive:hover {
  box-shadow: var(--aurad-shadow-md);
  transform: translateY(-2px);
}
```

---

## 4. Form Patterns

### 4.1 Field Anatomy
Every form field needs:
1. Visible label (never placeholder-as-label)
2. Input element with proper `type` and `autocomplete`
3. Helper text (optional, pre-error)
4. Error message with `role="alert"` (appears on validation)

```html
<div class="field">
  <label for="email">Email address <span aria-label="required">*</span></label>
  <input id="email" type="email" name="email"
         autocomplete="email" required
         aria-describedby="email-hint email-error">
  <p id="email-hint">We'll send a confirmation link.</p>
  <p id="email-error" role="alert" hidden
     style="color: var(--aurad-error);">
    Please enter a valid email address.
  </p>
</div>
```

### 4.2 Validation Timing
- **On blur** (field loses focus): validate and show error if needed
- **On submit**: validate all fields
- **On input** (while typing): only show success, never mid-type errors (too aggressive)

---

## 5. Navigation

### 5.1 Active State
Always indicate current page/section with both `aria-current="page"` and a visual indicator.

```html
<nav aria-label="Main navigation">
  <a href="/" aria-current="page"
     style="color: var(--aurad-primary); font-weight: 600;">
    Dashboard
  </a>
  <a href="/settings" style="color: var(--aurad-text-muted);">
    Settings
  </a>
</nav>
```

### 5.2 Skip Link (Required for Accessibility)
```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<style>
.skip-link {
  position: absolute;
  top: -999px;
  left: 0;
}
.skip-link:focus {
  top: 0;
  z-index: var(--aurad-z-tooltip);
  padding: var(--aurad-space-2) var(--aurad-space-4);
  background: var(--aurad-primary);
  color: var(--aurad-text-inverse);
}
</style>
```

---

## 6. Atomic Design Levels

### 6.1 Atom (Single Element)
- Button, Badge, Input, Label, Icon, Avatar
- No children that are themselves components
- Maximum ~30 lines

### 6.2 Molecule (2–5 Atoms)
- Form field (Label + Input + Error), Card header (Avatar + Name + Badge),
  Search bar (Input + Button), Stat (Label + Value + Delta)
- Maximum ~80 lines

### 6.3 Organism (Complex, Contextual)
- Navigation, Data table, Form section, Pricing card, Dashboard widget
- Composes molecules
- Maximum 250 lines (split if exceeded)

---

## 7. Consistency Metrics

### 7.1 Border Radius Consistency
Reference sites use **≤5 unique border-radius values** across all components. More than 5 indicates no radius system.

### 7.2 Shadow Consistency
Shadow should communicate elevation uniformly. If cards at the same conceptual level have different shadows, the elevation system is broken.

### 7.3 Interaction State Uniformity
All interactive elements at the same level should respond with the same hover/focus style. Inconsistency signals ad-hoc component development.

---

## 8. Score Thresholds

| Score | Characteristics |
|-------|----------------|
| 8.0–10 | All 4 states present, consistent radius/shadow, atomic structure, focus-visible |
| 6.0–7.9 | 3/4 states present; mostly consistent; some ad-hoc components |
| 4.0–5.9 | Only default+error or default+loading; inconsistent radii |
| 0–3.9 | Only default state; no loading/empty handling; inconsistent everything |
