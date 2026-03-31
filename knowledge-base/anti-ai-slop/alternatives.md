# AI Slop Alternatives — AuraDKit

> For every slop pattern, there is a higher-signal alternative that communicates brand identity instead of statistical average. These alternatives are derived from analysis of sites scoring < 20 on the AI Slop Score: paco.me, stripe.com, linear.app, vercel.com, craft.do, arc.net.

---

## SLOP-01 Alternative: Gradient Hero → Signal Hero

**Instead of**: Purple-blue gradient background.
**Use**: Solid neutral surface with a brand-specific visual element.

### Option A: Product Screenshot Hero (Stripe, Linear pattern)

```html
<section style="background: var(--aurad-surface);
                padding-block: var(--aurad-space-24) var(--aurad-space-16);">

  <!-- Text content: constrained width, left-aligned -->
  <div style="max-inline-size: var(--aurad-container-sm); margin-inline: auto;
              padding-inline: var(--aurad-space-6); text-align: start;">

    <h1 style="font-size: clamp(2rem, 5vw, 3.5rem);
               font-weight: var(--aurad-font-bold);
               letter-spacing: -0.03em;
               line-height: var(--aurad-leading-tight);
               color: var(--aurad-text);
               margin-block-end: var(--aurad-space-4);">
      [Specific, concrete product claim]
    </h1>

    <p style="font-size: var(--aurad-text-xl);
              color: var(--aurad-text-muted);
              line-height: var(--aurad-leading-normal);
              margin-block-end: var(--aurad-space-8);">
      [One-sentence description of the actual problem solved]
    </p>

    <a href="/signup"
       style="display: inline-flex; align-items: center; gap: var(--aurad-space-2);
              padding: var(--aurad-space-3) var(--aurad-space-6);
              background: var(--aurad-text);
              color: var(--aurad-text-inverse);
              border-radius: var(--aurad-radius-md);
              font-weight: var(--aurad-font-semibold);
              text-decoration: none;">
      Get started free
    </a>

  </div>

  <!-- Real product screenshot: no perspective transform, no shadow theater -->
  <div style="margin-block-start: var(--aurad-space-16);
              border-block-start: 1px solid var(--aurad-border);
              background: var(--aurad-surface-sunken);
              overflow: hidden;">
    <img src="/screenshot-actual-product.png"
         alt="[Actual description of what the product does]"
         loading="eager"
         style="inline-size: 100%; display: block;">
  </div>

</section>
```

### Option B: Typography-Driven Hero (paco.me, rauno.me pattern)

```html
<section style="padding-block: var(--aurad-space-24) var(--aurad-space-16);
                max-inline-size: var(--aurad-container-sm);
                margin-inline: auto;
                padding-inline: var(--aurad-space-6);">

  <!-- Name / entity — large, tight tracking -->
  <h1 style="font-size: clamp(3rem, 8vw, 5rem);
             font-weight: var(--aurad-font-bold);
             letter-spacing: -0.04em;
             line-height: 1;
             color: var(--aurad-text);
             margin-block-end: var(--aurad-space-6);">
    Jane Smith
  </h1>

  <!-- Role description — specific, not generic -->
  <p style="font-size: var(--aurad-text-xl);
            color: var(--aurad-text-muted);
            line-height: var(--aurad-leading-normal);
            max-inline-size: 520px;">
    Product designer at Stripe. I work on the Checkout team.
    Previously Linear, Figma.
  </p>

</section>
```

**Key principle**: The hero communicates *who you are specifically*, not *what category of product this is*.

---

## SLOP-02 Alternative: Generic Icons → Purposeful Icon Strategy

**Instead of**: 94 Heroicons with no customization.
**Use**: Minimal icon count + custom mark + intentional icon role.

### Rule: Icons are not decoration

```html
<!-- SLOP — icon as decoration -->
<div>
  <svg><!-- chart icon --></svg>
  <h3>Analytics</h3>
  <p>Track your metrics in real time.</p>
</div>

<!-- CORRECT — icon absent when the heading communicates the concept -->
<div>
  <h3>Analytics</h3>
  <p>Track conversions, sessions, and revenue across every page.</p>
</div>

<!-- CORRECT — icon present when it adds meaning not in text -->
<div style="display: flex; align-items: center; gap: var(--aurad-space-2);">
  <svg aria-hidden="true" width="16" height="16"><!-- arrow-right --></svg>
  <a href="/docs">Read the documentation</a>
</div>
```

### Rule: Custom brand mark > generic icon set

```html
<!-- Even a simple monogram outperforms a stock icon for brand identity -->
<div style="inline-size: 40px; block-size: 40px;
            border-radius: var(--aurad-radius-md);
            background: var(--aurad-primary);
            display: flex; align-items: center; justify-content: center;
            font-size: var(--aurad-text-sm); font-weight: var(--aurad-font-bold);
            color: var(--aurad-text-inverse);">
  A
</div>
```

---

## SLOP-03 Alternative: Feature Grid → Differentiated Feature Layout

**Instead of**: Identical 3-column icon/h3/p grid.
**Use**: Layouts that reflect the actual relative importance of features.

### Option A: Primary + Secondary Split (Linear pattern)

```html
<section style="padding-block: var(--aurad-space-16);
                max-inline-size: var(--aurad-container-lg);
                margin-inline: auto; padding-inline: var(--aurad-space-6);">

  <!-- Primary feature: full-width, visual proof -->
  <div style="display: grid; grid-template-columns: 1fr 1fr;
              gap: var(--aurad-space-12); align-items: center;
              margin-block-end: var(--aurad-space-12);">
    <div>
      <p style="font-size: var(--aurad-text-xs); font-weight: var(--aurad-font-semibold);
                text-transform: uppercase; letter-spacing: 0.05em;
                color: var(--aurad-primary); margin-block-end: var(--aurad-space-3);">
        Core feature
      </p>
      <h2 style="font-size: var(--aurad-text-3xl); font-weight: var(--aurad-font-bold);
                 letter-spacing: -0.02em; color: var(--aurad-text);
                 margin-block-end: var(--aurad-space-4);">
        [Specific claim with a number or outcome]
      </h2>
      <p style="font-size: var(--aurad-text-base); color: var(--aurad-text-muted);
                line-height: var(--aurad-leading-normal);">
        [One specific sentence about the mechanism — not marketing language]
      </p>
    </div>
    <!-- Actual screenshot of the feature in use -->
    <div style="background: var(--aurad-surface-sunken);
                border-radius: var(--aurad-radius-xl);
                overflow: hidden;
                border: 1px solid var(--aurad-border);">
      <img src="/feature-screenshot.png"
           alt="[Feature in action — specific description]"
           loading="lazy" style="inline-size: 100%;">
    </div>
  </div>

  <!-- Secondary features: smaller, text-only, 2-column -->
  <div style="display: grid; grid-template-columns: 1fr 1fr;
              gap: var(--aurad-space-8);">
    <div>
      <h3 style="font-size: var(--aurad-text-lg); font-weight: var(--aurad-font-semibold);
                 color: var(--aurad-text); margin-block-end: var(--aurad-space-2);">
        [Secondary feature]
      </h3>
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                line-height: var(--aurad-leading-normal);">
        [Specific description — one sentence]
      </p>
    </div>
    <!-- repeat × 3 -->
  </div>

</section>
```

### Option B: Metrics Table (Stripe pattern)

Replace feature descriptions with actual measured outcomes:

```html
<section style="padding-block: var(--aurad-space-16);">
  <div style="max-inline-size: var(--aurad-container-lg); margin-inline: auto;
              padding-inline: var(--aurad-space-6);">
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: var(--aurad-space-8);">

      <div>
        <p style="font-size: var(--aurad-text-4xl); font-weight: var(--aurad-font-bold);
                  color: var(--aurad-text);">23%</p>
        <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                  margin-block-start: var(--aurad-space-1);">
          average reduction in checkout abandonment
        </p>
      </div>

      <!-- Metrics communicate brand better than icon + generic claim -->
    </div>
  </div>
</section>
```

---

## SLOP-05 Alternative: Glow Orb → Structural Visual Hierarchy

**Instead of**: Blurred radial gradient orbs as background decoration.
**Use**: Structural elements that serve the layout.

### Option A: Border + Rule Separation

```css
/* Replace glow with structural boundary */
.hero {
  background: var(--aurad-surface);
  border-block-end: 1px solid var(--aurad-border);   /* clean separation */
}
```

### Option B: Surface Color Contrast

```css
/* Alternate section backgrounds for rhythm — no gradient needed */
.section-even { background: var(--aurad-surface); }
.section-odd  { background: var(--aurad-surface-sunken); }
```

---

## SLOP-06 Alternative: Star Carousel → Specific Social Proof

**Instead of**: "★★★★★ This product changed our business."
**Use**: Specific quotes with measurable outcomes.

```html
<!-- SLOP -->
<blockquote>
  "Amazing product, highly recommend to anyone!"
  — John S., CEO
</blockquote>

<!-- CORRECT — specific, attributed, with outcome -->
<figure>
  <blockquote style="font-size: var(--aurad-text-lg);
                     color: var(--aurad-text);
                     line-height: var(--aurad-leading-normal);
                     font-style: italic;">
    "After switching, our team's design-to-dev cycle dropped from 3 weeks to 4 days.
    The token system is what made that possible."
  </blockquote>
  <figcaption style="margin-block-start: var(--aurad-space-4);
                     font-size: var(--aurad-text-sm);
                     color: var(--aurad-text-muted);">
    <strong style="color: var(--aurad-text);">Maria Chen</strong>
    — Design Lead, Stripe (teams of 12)
  </figcaption>
</figure>
```

**Rules for non-slop testimonials**:
- Must cite a specific outcome (time, percentage, count)
- Must include full name + actual role + company
- Must quote something that only this person could say
- No star ratings (they're gamified and ignored)

---

## SLOP-07 Alternative: Pill Badge → Functional Announcement

**Instead of**: `✨ Introducing [product] 2.0` pill label above every hero h1.
**Use**: Functional announcement only when there is genuinely new information.

```html
<!-- SLOP — decorative label with no content -->
<div class="pill-badge">✨ Now in beta</div>
<h1>The fastest way to build</h1>

<!-- CORRECT — only show if there's a specific update worth linking to -->
<a href="/changelog/2024-03"
   style="display: inline-flex; align-items: center; gap: var(--aurad-space-2);
          font-size: var(--aurad-text-xs);
          color: var(--aurad-text-muted);
          text-decoration: none;
          margin-block-end: var(--aurad-space-4);">
  <span style="display: inline-block; inline-size: 6px; block-size: 6px;
               background: var(--aurad-success); border-radius: var(--aurad-radius-full);"
        aria-hidden="true"></span>
  March changelog: real-time collaboration →
</a>
<h1>...</h1>

<!-- If there's no actual news: omit entirely. The h1 is the hero. -->
```

---

## The Core Principle

AI slop is the result of designing for the category instead of the product. Every anti-slop alternative follows the same principle:

> **Replace generic category signal with specific product evidence.**

| Slop Pattern | What It Signals | Alternative | What It Signals |
|------------|----------------|------------|----------------|
| Purple gradient hero | "This is a SaaS" | Product screenshot hero | "This is what you'll use" |
| 94 Heroicons | "Built fast, not designed" | Fewer icons, custom mark | "Every element was considered" |
| "Blazing fast, secure by default" | LLM copy | "Checkout in under 2 minutes" | Real claim, verifiable |
| Floating dashboard | "I have a dashboard" | Real feature screenshot | "This is the actual UI" |
| ★★★★★ generic review | "Someone approved" | Specific outcome quote | "This person's problem was solved" |
| Glow orb decoration | "Modern aesthetic" | Clean surface + structure | "The content is the design" |
| ✨ pill badge | "AI generated this" | Changelog link or nothing | "We ship real updates" |
