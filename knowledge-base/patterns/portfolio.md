# Portfolio Patterns — AuraDKit

> Derived from analysis of: paco.me, rauno.me, joshwcomeau.com, leerob.io, anthonyhobday.com, crafted.studio.

## Structure Overview

```
1. Navigation: minimal, name/logo + 3–4 links
2. Hero: name + title + brief bio (one screen)
3. Work/Projects: 2-column grid with hover reveal
4. About: split layout — bio text + photo/illustration
5. Writing/Blog: simple list or 2-column grid
6. Contact: email link or form
```

High-signal portfolio rule: **Reduce chrome, elevate work.** Navigation, headers, and footers compete with the portfolio pieces themselves.

---

## 1. Minimal Navigation (Portfolio Header)

```html
<header style="position: sticky; inset-block-start: 0; z-index: var(--aurad-z-sticky);
               padding: var(--aurad-space-4) var(--aurad-space-6);
               display: flex; align-items: center; justify-content: space-between;
               background: var(--aurad-surface);
               border-block-end: 1px solid var(--aurad-border);"
        role="banner">

  <!-- Name / logo — left -->
  <a href="/"
     style="font-size: var(--aurad-text-base); font-weight: 600;
            color: var(--aurad-text); text-decoration: none;"
     aria-label="Go to homepage">
    Jane Smith
  </a>

  <!-- Nav links — right, max 4 -->
  <nav aria-label="Main navigation">
    <ul style="display: flex; align-items: center; gap: var(--aurad-space-6);
               list-style: none; font-size: var(--aurad-text-sm);"
        role="list">
      <li>
        <a href="/work"
           style="color: var(--aurad-text-muted); text-decoration: none;">
          Work
        </a>
      </li>
      <li>
        <a href="/writing"
           style="color: var(--aurad-text-muted); text-decoration: none;">
          Writing
        </a>
      </li>
      <li>
        <a href="/about"
           style="color: var(--aurad-text-muted); text-decoration: none;">
          About
        </a>
      </li>
      <li>
        <a href="mailto:hello@janesmith.com"
           style="color: var(--aurad-text); font-weight: 500; text-decoration: none;">
          Contact
        </a>
      </li>
    </ul>
  </nav>

</header>
```

---

## 2. Hero Section (Portfolio)

```html
<section style="padding: var(--aurad-space-24) var(--aurad-space-6) var(--aurad-space-16);
                max-inline-size: 680px; margin-inline: auto;">

  <!-- Status indicator (optional — "available for work") -->
  <div style="display: inline-flex; align-items: center; gap: var(--aurad-space-2);
              margin-block-end: var(--aurad-space-6);">
    <span style="display: inline-block; inline-size: 8px; block-size: 8px;
                 background: var(--aurad-success);
                 border-radius: var(--aurad-radius-full);"
          aria-hidden="true"></span>
    <span style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);">
      Available for freelance work
    </span>
  </div>

  <h1 style="font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700;
             color: var(--aurad-text);
             line-height: var(--aurad-leading-tight);
             letter-spacing: -0.03em;
             margin-block-end: var(--aurad-space-4);">
    Jane Smith
  </h1>

  <p style="font-size: var(--aurad-text-xl); color: var(--aurad-text-muted);
            line-height: var(--aurad-leading-normal);
            margin-block-end: var(--aurad-space-8);">
    Product designer and frontend engineer. I build the gap between design and code —
    shipping interfaces that are fast, accessible, and quietly beautiful.
  </p>

  <!-- Social / contact links -->
  <div style="display: flex; align-items: center; gap: var(--aurad-space-4);">
    <a href="https://twitter.com/janesmith"
       style="color: var(--aurad-text-muted); text-decoration: none;
              font-size: var(--aurad-text-sm);"
       rel="noopener noreferrer" target="_blank">
      Twitter ↗
    </a>
    <a href="https://github.com/janesmith"
       style="color: var(--aurad-text-muted); text-decoration: none;
              font-size: var(--aurad-text-sm);"
       rel="noopener noreferrer" target="_blank">
      GitHub ↗
    </a>
    <a href="/resume.pdf"
       style="color: var(--aurad-text-muted); text-decoration: none;
              font-size: var(--aurad-text-sm);"
       download>
      Resume ↓
    </a>
  </div>

</section>
```

---

## 3. Work Grid (Project Cards)

```html
<section style="padding: var(--aurad-space-8) var(--aurad-space-6) var(--aurad-space-16);
                max-inline-size: 1100px; margin-inline: auto;"
         aria-label="Selected work">

  <div style="display: grid;
              grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
              gap: var(--aurad-space-6);">

    <!-- Project card — hover reveal pattern -->
    <article>
      <a href="/work/project-name"
         style="display: block; text-decoration: none;
                border-radius: var(--aurad-radius-xl); overflow: hidden;
                border: 1px solid var(--aurad-border);
                background: var(--aurad-surface-raised);
                position: relative;"
         aria-label="Project: Brand Design System — view case study">

        <!-- Project image -->
        <div style="aspect-ratio: 16/10; overflow: hidden;
                    background: var(--aurad-surface-sunken);">
          <img src="/work/brand-ds/cover.png"
               alt="Brand Design System — component library screenshot"
               loading="lazy"
               style="inline-size: 100%; block-size: 100%; object-fit: cover;
                      transition: transform var(--aurad-duration-slow) var(--aurad-ease-default);">
        </div>

        <!-- Project info -->
        <div style="padding: var(--aurad-space-5);">
          <div style="display: flex; align-items: flex-start;
                      justify-content: space-between; gap: var(--aurad-space-3);">
            <div>
              <h2 style="font-size: var(--aurad-text-base); font-weight: 600;
                         color: var(--aurad-text); margin-block-end: var(--aurad-space-1);">
                Brand Design System
              </h2>
              <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);">
                Figma · React · TypeScript
              </p>
            </div>
            <span style="font-size: var(--aurad-text-xs); color: var(--aurad-text-disabled);
                         white-space: nowrap;">
              2024
            </span>
          </div>
        </div>

        <!-- Hover overlay with description -->
        <div style="position: absolute; inset: 0;
                    background: var(--aurad-text);
                    display: flex; align-items: flex-end;
                    padding: var(--aurad-space-6);
                    opacity: 0;
                    transition: opacity var(--aurad-duration-normal) var(--aurad-ease-default);"
             aria-hidden="true">
          <div>
            <p style="font-size: var(--aurad-text-lg); font-weight: 600;
                      color: var(--aurad-text-inverse); margin-block-end: var(--aurad-space-2);">
              Brand Design System
            </p>
            <p style="font-size: var(--aurad-text-sm); color: oklch(0.80 0.01 250);">
              Built a 120-component library that reduced design-to-dev handoff time by 60%.
            </p>
          </div>
        </div>

      </a>
    </article>

    <!-- Project card — full-width featured (spans 2 columns) -->
    <article style="grid-column: 1 / -1;">
      <a href="/work/featured-project"
         style="display: grid; grid-template-columns: 1fr 1fr;
                text-decoration: none;
                border-radius: var(--aurad-radius-xl); overflow: hidden;
                border: 1px solid var(--aurad-border);
                background: var(--aurad-surface-raised);"
         aria-label="Featured: Checkout Redesign — view case study">

        <div style="aspect-ratio: 4/3; overflow: hidden;
                    background: var(--aurad-surface-sunken);">
          <img src="/work/checkout/cover.png"
               alt="Checkout redesign — before and after comparison"
               loading="lazy"
               style="inline-size: 100%; block-size: 100%; object-fit: cover;">
        </div>

        <div style="padding: var(--aurad-space-8); display: flex; flex-direction: column;
                    justify-content: center;">
          <p style="font-size: var(--aurad-text-xs); font-weight: 600;
                    text-transform: uppercase; letter-spacing: 0.05em;
                    color: var(--aurad-primary); margin-block-end: var(--aurad-space-3);">
            Featured project
          </p>
          <h2 style="font-size: var(--aurad-text-2xl); font-weight: 700;
                     color: var(--aurad-text); line-height: var(--aurad-leading-tight);
                     margin-block-end: var(--aurad-space-3);">
            Checkout Redesign
          </h2>
          <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                    line-height: var(--aurad-leading-normal);
                    margin-block-end: var(--aurad-space-6);">
            Reduced cart abandonment by 23% by simplifying a 7-step checkout into 3 focused screens.
          </p>
          <div style="display: flex; gap: var(--aurad-space-2); flex-wrap: wrap;">
            <span style="padding: 2px 10px;
                         border: 1px solid var(--aurad-border);
                         border-radius: var(--aurad-radius-full);
                         font-size: var(--aurad-text-xs);
                         color: var(--aurad-text-muted);">
              UX Research
            </span>
            <span style="padding: 2px 10px;
                         border: 1px solid var(--aurad-border);
                         border-radius: var(--aurad-radius-full);
                         font-size: var(--aurad-text-xs);
                         color: var(--aurad-text-muted);">
              Interaction Design
            </span>
          </div>
        </div>

      </a>
    </article>

  </div>
</section>

<style>
/* Hover effect for standard cards */
article a:hover img {
  transform: scale(1.03);
}
article a:hover [aria-hidden="true"] {
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
  article a:hover img { transform: none; }
}
</style>
```

---

## 4. Key Portfolio Patterns

| Pattern | Frequency | Impact |
|---------|-----------|--------|
| Availability status indicator (green dot) | 5/6 reference | Immediate signal for potential clients |
| Hover-reveal project overlay | 4/6 reference | Keeps grid clean; shows detail on demand |
| Featured project spans full width | 4/6 reference | Establishes hierarchy — best work first |
| Max 4 nav links | 6/6 reference | Portfolio nav friction directly hurts conversion |
| Outcome-focused project descriptions | 6/6 reference | "Reduced abandonment by 23%" beats "Redesigned checkout" |
| Year tag on each project | 5/6 reference | Shows recency without dates cluttering card |
| `rel="noopener noreferrer"` on external links | 6/6 reference | Security + doesn't pass referer to third parties |

---

## 5. Portfolio Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Showing every project | Dilutes quality signal | Curate to 4–8 best; hide the rest |
| Project titles without outcomes | "I built this" vs "I moved the needle" | Lead with the metric or problem solved |
| Purple gradient hero background | AI-slop signal | Use white/neutral surface; let the work create color |
| Animated cursor or scroll-jacking | Distracts from work; hurts a11y | Standard cursor and scroll |
| 6+ navigation links | Decision overload | Work / About / Contact — max 4 |
| No `loading="lazy"` on project images | Slow initial load on image-heavy grids | Always lazy-load below-fold project images |
| Contact form with many fields | Friction for outreach | Just an email link or 2-field form (name + message) |
