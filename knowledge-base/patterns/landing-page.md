# Landing Page Patterns — AuraDKit

> Derived from analysis of 8+ high-scoring landing pages (linear.app, vercel.com, stripe.com, raycast.com, arc.net, resend.com, zed.dev, framer.com).

## Section Structure (Reference Pattern)

```
1. Navigation Header      (sticky, logo + links + CTA)
2. Hero                   (headline + subhead + primary CTA + social proof)
3. Logo Bar               (trusted by logos)
4. Feature Overview       (3-column icon + title + description)
5. Product Screenshot     (device mockup or browser frame)
6. Feature Detail A       (split: text left, image right)
7. Feature Detail B       (split: image left, text right — alternates)
8. Social Proof           (testimonials or case studies)
9. Pricing                (3-tier card grid)
10. CTA Banner            (final conversion section)
11. Footer                (links + legal)
```

Not all sections required. Minimum viable landing: Hero + Features + CTA.

---

## 1. Navigation Header

### Pattern
```html
<header style="position: sticky; top: 0; z-index: var(--aurad-z-sticky);
               background: var(--aurad-surface-raised);
               border-block-end: 1px solid var(--aurad-border);
               backdrop-filter: blur(8px);">
  <nav class="container flex items-center justify-between h-16"
       aria-label="Main navigation">

    <!-- Logo -->
    <a href="/" aria-label="Go to homepage">
      <img src="/logo.svg" alt="[Brand] logo" height="28">
    </a>

    <!-- Links (desktop) -->
    <ul class="hidden md:flex items-center gap-8 list-none" role="list">
      <li><a href="/features" style="color: var(--aurad-text-muted);">Features</a></li>
      <li><a href="/pricing" style="color: var(--aurad-text-muted);">Pricing</a></li>
      <li><a href="/docs" style="color: var(--aurad-text-muted);">Docs</a></li>
    </ul>

    <!-- CTA -->
    <div class="flex items-center gap-3">
      <a href="/login" style="color: var(--aurad-text-muted);">Sign in</a>
      <a href="/signup"
         style="background: var(--aurad-text); color: var(--aurad-text-inverse);
                padding: var(--aurad-space-2) var(--aurad-space-4);
                border-radius: var(--aurad-radius-md); font-weight: 500;">
        Get started
      </a>
    </div>

  </nav>
</header>
```

### Key Observations
- **Backdrop blur** on scroll is the reference pattern (linear, vercel, raycast)
- Primary nav CTA uses dark/inverted fill — distinct from body CTA which uses brand color
- Max 4–5 navigation links; more creates decision fatigue

---

## 2. Hero Section

### Pattern: Center-Aligned (Most Common)
```html
<section style="padding-block: var(--aurad-space-24) var(--aurad-space-16);
                text-align: center;">
  <div class="container" style="max-inline-size: 720px;">

    <!-- Pill badge / announcement -->
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
         style="background: var(--aurad-primary-subtle);
                border: 1px solid oklch(0.80 0.08 250);
                color: var(--aurad-primary);">
      <span>✨ New</span>
      <span style="color: var(--aurad-text-muted);">v2.0 just shipped →</span>
    </div>

    <h1 style="font-size: clamp(2rem, 5vw, 3.5rem);
               font-weight: 700;
               line-height: 1.1;
               color: var(--aurad-text);
               letter-spacing: -0.02em;">
      The design tool built<br>for speed
    </h1>

    <p style="font-size: var(--aurad-text-xl);
              color: var(--aurad-text-muted);
              margin-block-start: var(--aurad-space-4);
              line-height: var(--aurad-leading-normal);
              max-inline-size: 540px;
              margin-inline: auto;">
      Specific, concrete description of what the product does and who it's for.
      One sentence. No fluff.
    </p>

    <!-- CTAs -->
    <div class="flex items-center justify-center gap-3 mt-8 flex-wrap">
      <a href="/signup"
         style="background: var(--aurad-primary); color: var(--aurad-text-inverse);
                padding: var(--aurad-space-3) var(--aurad-space-6);
                border-radius: var(--aurad-radius-md); font-weight: 500;">
        Start free trial
      </a>
      <a href="/demo"
         style="color: var(--aurad-text); border: 1px solid var(--aurad-border);
                padding: var(--aurad-space-3) var(--aurad-space-6);
                border-radius: var(--aurad-radius-md);">
        Watch demo →
      </a>
    </div>

    <!-- Social proof -->
    <p style="color: var(--aurad-text-muted); font-size: var(--aurad-text-sm);
              margin-block-start: var(--aurad-space-4);">
      Trusted by 10,000+ teams · No credit card required
    </p>

  </div>
</section>
```

### Key Observations
- **Fluid font size** with `clamp()` is the reference pattern for hero headings
- `letter-spacing: -0.02em` on large headings tightens tracking (reference standard)
- Social proof line below CTAs reduces friction (present in 7/8 reference sites)
- **Purple-blue gradient** as background is detected in 34% of AI-generated sites — avoid

---

## 3. Feature Grid (3-Column)

```html
<section style="padding-block: var(--aurad-space-16);">
  <div class="container">

    <!-- Section header -->
    <div style="text-align: center; max-inline-size: 600px; margin-inline: auto;
                margin-block-end: var(--aurad-space-12);">
      <h2 style="font-size: var(--aurad-text-3xl); font-weight: 700;">
        Everything you need
      </h2>
      <p style="color: var(--aurad-text-muted); margin-block-start: var(--aurad-space-3);">
        Brief description of the feature set.
      </p>
    </div>

    <!-- 3-column grid -->
    <div style="display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: var(--aurad-space-6);">

      <article style="padding: var(--aurad-space-6);
                      border: 1px solid var(--aurad-border);
                      border-radius: var(--aurad-radius-lg);">
        <!-- Icon (24×24 or 32×32) -->
        <div style="inline-size: 40px; block-size: 40px;
                    background: var(--aurad-primary-subtle);
                    border-radius: var(--aurad-radius-md);
                    display: flex; align-items: center; justify-content: center;
                    margin-block-end: var(--aurad-space-4);">
          <!-- icon svg -->
        </div>
        <h3 style="font-size: var(--aurad-text-lg); font-weight: 600;">
          Feature Title
        </h3>
        <p style="color: var(--aurad-text-muted);
                  margin-block-start: var(--aurad-space-2);
                  line-height: var(--aurad-leading-normal);">
          Specific description of what this feature does. Two to three sentences max.
        </p>
      </article>

    </div>
  </div>
</section>
```

---

## 4. Pricing Section (3-Tier)

```html
<section style="padding-block: var(--aurad-space-16);">
  <div class="container" style="max-inline-size: 1100px;">

    <div style="display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: var(--aurad-space-6);
                align-items: start;">

      <!-- Free tier -->
      <article style="padding: var(--aurad-space-6);
                      border: 1px solid var(--aurad-border);
                      border-radius: var(--aurad-radius-xl);">
        <h3>Starter</h3>
        <p style="font-size: var(--aurad-text-4xl); font-weight: 700; margin-block: var(--aurad-space-4) 0;">
          $0
        </p>
        <p style="color: var(--aurad-text-muted);">Forever free</p>
        <ul style="margin-block: var(--aurad-space-6);"> ... </ul>
        <a href="/signup" style="display: block; text-align: center;
                                  border: 1px solid var(--aurad-border);
                                  padding: var(--aurad-space-2); border-radius: var(--aurad-radius-md);">
          Get started
        </a>
      </article>

      <!-- Pro tier — HIGHLIGHTED -->
      <article style="padding: var(--aurad-space-6);
                      border: 2px solid var(--aurad-primary);
                      border-radius: var(--aurad-radius-xl);
                      position: relative;">
        <!-- Popular badge -->
        <span style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
                     background: var(--aurad-primary); color: var(--aurad-text-inverse);
                     padding: 2px 12px; border-radius: var(--aurad-radius-full);
                     font-size: var(--aurad-text-xs); font-weight: 600;">
          Most popular
        </span>
        ...
      </article>

      <!-- Enterprise tier -->
      ...

    </div>
  </div>
</section>
```

---

## 5. Copy Anti-Patterns (AI Slop Signals)

High AI-Slop sites repeat these exact phrases. Replace with specific claims:

| Slop Copy | Replace With |
|-----------|-------------|
| "Revolutionize your workflow" | "Cut deployment time from 45 minutes to 8" |
| "Empower your team" | "Ship 3× faster with built-in review tools" |
| "Seamless integration" | "Connects to GitHub, Jira, and Slack in 2 clicks" |
| "Next-generation platform" | Specific technology claim |
| "Transform the way you work" | Specific before/after metric |
| "Trusted by teams worldwide" | "Used by 12,000 engineering teams at Airbnb, Figma, and Shopify" |
