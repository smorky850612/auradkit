# Layout Architecture — AuraDKit Design Principles

> Layout is the skeleton of a design. It determines reading order, information density, and responsive behavior before any color or typography is applied.

## Core Principle

Use **CSS Grid for macro layout** (page structure, section grids) and **Flexbox for micro layout** (navigation items, button groups, card content alignment). Float-based layout is a legacy pattern that must not appear in new code.

---

## 1. Page Structure

### 1.1 Semantic Shell
Every page must use semantic landmark elements. These enable screen reader navigation and give the browser structural hints.

```html
<!DOCTYPE html>
<html lang="ko">
<head>...</head>
<body>

  <a href="#main" class="skip-link">Skip to content</a>

  <header role="banner">
    <nav aria-label="Main navigation">...</nav>
  </header>

  <main id="main" role="main">
    <h1>Page Title</h1>
    <!-- content -->
  </main>

  <aside aria-label="Sidebar">...</aside>

  <footer role="contentinfo">...</footer>

</body>
</html>
```

### 1.2 Required Landmarks Checklist
Sites scoring 8.0+ on layout have **all 4** present:
- `<header>` or `[role="banner"]`
- `<nav>` with `aria-label`
- `<main>` or `[role="main"]`
- `<footer>` or `[role="contentinfo"]`

---

## 2. Grid Systems

### 2.1 12-Column Grid
The standard content grid for desktop layouts.

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--aurad-space-6);
}

/* Content: 8 columns centered */
.content-area { grid-column: span 8 / span 8; }

/* Sidebar: 4 columns */
.sidebar { grid-column: span 4 / span 4; }
```

### 2.2 Auto-Fill Card Grid
For responsive card layouts without breakpoint media queries:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--aurad-space-6);
}
```

**Breakpoints** it naturally produces:
- Mobile (390px): 1 column
- Tablet (768px): 2 columns
- Desktop (1280px+): 3–4 columns

### 2.3 Feature Grid (3-Column)
```css
.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--aurad-space-8);
}
@media (min-width: 768px) {
  .feature-grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 3. Layout Patterns

### 3.1 Dashboard Layout (Sidebar + Main)
```html
<div class="dashboard-shell">

  <!-- Sidebar: hidden on mobile, 240–280px on desktop -->
  <aside class="sidebar">
    <nav aria-label="App navigation">...</nav>
  </aside>

  <!-- Main area: fills remaining space -->
  <div class="main-area">
    <header class="topbar">...</header>
    <main class="content">...</main>
  </div>

</div>

<style>
.dashboard-shell {
  display: flex;
  min-block-size: 100dvh;
}
.sidebar {
  inline-size: 256px;
  flex-shrink: 0;
  background: var(--aurad-surface-raised);
  border-inline-end: 1px solid var(--aurad-border);
  display: none;  /* hidden on mobile */
}
@media (min-width: 1024px) {
  .sidebar { display: flex; flex-direction: column; }
}
.main-area {
  flex: 1;
  min-inline-size: 0;  /* prevent overflow */
  display: flex;
  flex-direction: column;
}
.topbar {
  block-size: 64px;
  flex-shrink: 0;
  border-block-end: 1px solid var(--aurad-border);
}
.content {
  flex: 1;
  overflow: auto;
  padding: var(--aurad-space-6);
}
</style>
```

### 3.2 Landing Page Section
```html
<section class="section">
  <div class="container">
    <!-- content -->
  </div>
</section>

<style>
.section {
  padding-block: var(--aurad-space-16);  /* 64px */
}
@media (min-width: 1024px) {
  .section { padding-block: var(--aurad-space-24); }  /* 96px */
}
.container {
  inline-size: 100%;
  max-inline-size: 1280px;
  margin-inline: auto;
  padding-inline: var(--aurad-space-4);
}
@media (min-width: 640px) {
  .container { padding-inline: var(--aurad-space-6); }
}
@media (min-width: 1024px) {
  .container { padding-inline: var(--aurad-space-8); }
}
</style>
```

### 3.3 Split Layout (50/50)
```css
.split {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--aurad-space-12);
  align-items: center;
}
@media (min-width: 768px) {
  .split { grid-template-columns: 1fr 1fr; }
}
```

---

## 4. Responsive Design

### 4.1 Mobile-First Breakpoints
Always write default styles for mobile, then enhance with `min-width` queries.

```css
/* Mobile first (0px+): single column */
.layout { display: flex; flex-direction: column; }

/* Tablet (768px+): two columns */
@media (min-width: 768px) {
  .layout { flex-direction: row; }
}

/* Desktop (1280px+): wider variant */
@media (min-width: 1280px) {
  .layout { max-inline-size: 1280px; margin-inline: auto; }
}
```

### 4.2 Breakpoint Reference

| Name | Min Width | Common Use |
|------|----------|-----------|
| sm | 640px | Large phones, small tablets |
| md | 768px | Tablets |
| lg | 1024px | Small laptops; sidebar unlocks |
| xl | 1280px | Desktop; full layout activates |
| 2xl | 1536px | Large monitors; max-width reached |

### 4.3 Touch Target Size
All interactive elements must be at minimum **44×44px** for touch (WCAG 2.5.5 AA).
For small icons or links: add `padding` to expand the hit area without changing visual size.

```css
/* Visually small, but large enough to tap */
.icon-button {
  padding: var(--aurad-space-2);  /* 8px — makes it 40×40 if icon is 24×24 */
  min-inline-size: 44px;
  min-block-size: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

---

## 5. Content Width Guidelines

### 5.1 Max-Width by Content Type

| Content Type | max-inline-size | Why |
|-------------|----------------|-----|
| Full-page layout | 1280–1440px | Prevents extreme widths on large monitors |
| Body copy / prose | 65–72ch | Optimal readability |
| Form | 480–560px | Natural input field width |
| Card grid | 100% within container | Let auto-fill handle it |
| Modal | 480–560px | Focus; doesn't need full width |
| Alert/Banner | 100% | System-wide message |

### 5.2 Avoiding Layout Orphans
For text blocks, prevent single words on the last line:
```css
.prose p {
  text-wrap: pretty;  /* modern — prevents orphans */
}
```

---

## 6. CSS Logical Properties

Always use logical properties for RTL (right-to-left language) compatibility.

| Physical | Logical | Use For |
|---------|---------|---------|
| `margin-left` | `margin-inline-start` | Start of text flow |
| `margin-right` | `margin-inline-end` | End of text flow |
| `padding-top` | `padding-block-start` | Top of block |
| `padding-bottom` | `padding-block-end` | Bottom of block |
| `border-left` | `border-inline-start` | Start border |
| `text-align: left` | `text-align: start` | Start-aligned text |
| `width` | `inline-size` | Inline dimension |
| `height` | `block-size` | Block dimension |

---

## 7. Layout Anti-Patterns

| Pattern | Impact | Fix |
|---------|--------|-----|
| `float: left/right` | Layout breaks without clearfix; ignores modern flow | Replace with Flexbox or Grid |
| `position: absolute` for layout | Breaks out of flow; not responsive | Use Grid/Flex for positioning |
| Fixed `width: 960px` | Breaks on mobile | Use `max-inline-size` with `inline-size: 100%` |
| Missing `min-inline-size: 0` on flex children | Text overflow, content escapes container | Add to flex children that have text or overflow |
| No semantic landmarks | Screen readers can't navigate | Add `<header>`, `<main>`, `<footer>`, `<nav>` |
| `overflow: hidden` on `<body>` | Traps focus in modals; breaks scroll | Use `overflow: clip` or modal-specific scroll lock |

---

## 8. Score Thresholds

| Score | Characteristics |
|-------|----------------|
| 8.0–10 | Semantic HTML structure, CSS Grid + Flex, responsive breakpoints, logical properties, no float layout |
| 6.0–7.9 | Mostly semantic, responsive, but some float or absolute positioning |
| 4.0–5.9 | Partial semantics, limited responsiveness |
| 0–3.9 | Float-based or fixed-width layout, no semantic landmarks, no responsive design |
