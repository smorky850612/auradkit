# Blog / Editorial Patterns — AuraDKit

> Derived from analysis of: overreacted.io, joshwcomeau.com, rauno.me, vercel.com/blog, leerob.io, stripe.com/blog.

## Structure Overview

```
1. Blog index: card grid (2–3 col) or list feed
2. Article page: constrained prose column (max 65–72ch)
3. Post header: title + metadata + estimated read time
4. Body: typography-first, no unnecessary UI chrome
5. End of post: author bio + related posts + newsletter CTA
```

---

## 1. Blog Index (Card Grid)

```html
<main id="main" role="main"
      style="max-inline-size: 1280px; margin-inline: auto;
             padding: var(--aurad-space-16) var(--aurad-space-6);">

  <header style="margin-block-end: var(--aurad-space-12);">
    <h1 style="font-size: clamp(1.875rem, 4vw, 3rem); font-weight: 700;
               color: var(--aurad-text); letter-spacing: -0.02em;">
      Blog
    </h1>
    <p style="font-size: var(--aurad-text-lg); color: var(--aurad-text-muted);
              margin-block-start: var(--aurad-space-3);">
      Thoughts on design, engineering, and building products.
    </p>
  </header>

  <!-- Category filter (optional) -->
  <div style="display: flex; gap: var(--aurad-space-2); flex-wrap: wrap;
              margin-block-end: var(--aurad-space-8);"
       role="list"
       aria-label="Filter by category">

    <a href="/blog"
       aria-current="page"
       role="listitem"
       style="padding: var(--aurad-space-1) var(--aurad-space-4);
              background: var(--aurad-text);
              color: var(--aurad-text-inverse);
              border-radius: var(--aurad-radius-full);
              font-size: var(--aurad-text-sm); font-weight: 500;
              text-decoration: none;">
      All
    </a>
    <a href="/blog/engineering"
       role="listitem"
       style="padding: var(--aurad-space-1) var(--aurad-space-4);
              border: 1px solid var(--aurad-border);
              border-radius: var(--aurad-radius-full);
              font-size: var(--aurad-text-sm);
              color: var(--aurad-text-muted);
              text-decoration: none;">
      Engineering
    </a>
    <a href="/blog/design"
       role="listitem"
       style="padding: var(--aurad-space-1) var(--aurad-space-4);
              border: 1px solid var(--aurad-border);
              border-radius: var(--aurad-radius-full);
              font-size: var(--aurad-text-sm);
              color: var(--aurad-text-muted);
              text-decoration: none;">
      Design
    </a>
  </div>

  <!-- Post card grid -->
  <div style="display: grid;
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
              gap: var(--aurad-space-6);">

    <!-- Post card: image variant -->
    <article>
      <a href="/blog/post-slug"
         style="display: block; text-decoration: none; border-radius: var(--aurad-radius-lg);
                overflow: hidden; border: 1px solid var(--aurad-border);
                background: var(--aurad-surface-raised);
                transition: box-shadow var(--aurad-duration-normal);">

        <!-- Thumbnail -->
        <div style="aspect-ratio: 16/9; overflow: hidden;
                    background: var(--aurad-surface-sunken);">
          <img src="/blog/images/post-thumb.jpg"
               alt=""
               loading="lazy"
               style="inline-size: 100%; block-size: 100%; object-fit: cover;
                      transition: transform var(--aurad-duration-slow);">
        </div>

        <div style="padding: var(--aurad-space-5);">
          <!-- Category badge -->
          <p style="font-size: var(--aurad-text-xs); font-weight: 600;
                    text-transform: uppercase; letter-spacing: 0.05em;
                    color: var(--aurad-primary);
                    margin-block-end: var(--aurad-space-2);">
            Engineering
          </p>

          <h2 style="font-size: var(--aurad-text-lg); font-weight: 600;
                     color: var(--aurad-text); line-height: var(--aurad-leading-tight);
                     margin-block-end: var(--aurad-space-2);">
            How we rebuilt our rendering pipeline
          </h2>
          <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                    line-height: var(--aurad-leading-normal);
                    margin-block-end: var(--aurad-space-4);">
            A deep dive into the architectural decisions that cut our p95 latency from 840ms to 120ms.
          </p>

          <!-- Metadata -->
          <div style="display: flex; align-items: center; gap: var(--aurad-space-3);">
            <img src="/avatars/author.jpg" alt="Jane Smith"
                 width="24" height="24"
                 style="border-radius: var(--aurad-radius-full);">
            <span style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
              Jane Smith
            </span>
            <span aria-hidden="true"
                  style="color: var(--aurad-border);">·</span>
            <time datetime="2024-03-15"
                  style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
              Mar 15, 2024
            </time>
            <span aria-hidden="true"
                  style="color: var(--aurad-border);">·</span>
            <span style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
              8 min read
            </span>
          </div>
        </div>
      </a>
    </article>

    <!-- Post card: text-only variant (no thumbnail) -->
    <article style="padding: var(--aurad-space-5);
                    border: 1px solid var(--aurad-border);
                    border-radius: var(--aurad-radius-lg);
                    background: var(--aurad-surface-raised);">
      <p style="font-size: var(--aurad-text-xs); font-weight: 600;
                text-transform: uppercase; letter-spacing: 0.05em;
                color: var(--aurad-primary); margin-block-end: var(--aurad-space-2);">
        Design
      </p>
      <h2 style="margin-block-end: var(--aurad-space-2);">
        <a href="/blog/second-post"
           style="font-size: var(--aurad-text-lg); font-weight: 600;
                  color: var(--aurad-text); text-decoration: none;
                  line-height: var(--aurad-leading-tight);">
          The case for boring typography
        </a>
      </h2>
      <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                line-height: var(--aurad-leading-normal); margin-block-end: var(--aurad-space-4);">
        Why system fonts are the right choice for 95% of products.
      </p>
      <div style="display: flex; align-items: center; gap: var(--aurad-space-2);
                  font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
        <time datetime="2024-02-08">Feb 8, 2024</time>
        <span aria-hidden="true">·</span>
        <span>5 min read</span>
      </div>
    </article>

  </div>
</main>
```

---

## 2. Article Page (Prose Layout)

```html
<main id="main" role="main">

  <!-- Article wrapper: constrained prose width -->
  <article style="max-inline-size: 720px; margin-inline: auto;
                  padding: var(--aurad-space-12) var(--aurad-space-6);">

    <!-- Post header -->
    <header style="margin-block-end: var(--aurad-space-10);">

      <!-- Category + breadcrumb -->
      <nav aria-label="Breadcrumb"
           style="margin-block-end: var(--aurad-space-4);">
        <ol style="display: flex; align-items: center; gap: var(--aurad-space-2);
                   list-style: none; font-size: var(--aurad-text-sm);">
          <li>
            <a href="/blog" style="color: var(--aurad-text-muted);">Blog</a>
          </li>
          <li aria-hidden="true" style="color: var(--aurad-border);">/</li>
          <li>
            <a href="/blog/engineering" style="color: var(--aurad-primary);">Engineering</a>
          </li>
        </ol>
      </nav>

      <h1 style="font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700;
                 color: var(--aurad-text);
                 line-height: var(--aurad-leading-tight);
                 letter-spacing: -0.02em;
                 margin-block-end: var(--aurad-space-4);">
        How we rebuilt our rendering pipeline
      </h1>

      <p style="font-size: var(--aurad-text-xl); color: var(--aurad-text-muted);
                line-height: var(--aurad-leading-normal);
                margin-block-end: var(--aurad-space-6);">
        A deep dive into the architectural decisions that cut our p95 latency from 840ms to 120ms.
      </p>

      <!-- Author + metadata row -->
      <div style="display: flex; align-items: center; gap: var(--aurad-space-4);
                  padding-block: var(--aurad-space-4);
                  border-block: 1px solid var(--aurad-border);">
        <img src="/avatars/author.jpg" alt="Jane Smith"
             width="40" height="40"
             style="border-radius: var(--aurad-radius-full); flex-shrink: 0;">
        <div>
          <p style="font-size: var(--aurad-text-sm); font-weight: 500;
                    color: var(--aurad-text);">
            Jane Smith
          </p>
          <div style="display: flex; gap: var(--aurad-space-3);
                      font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
            <time datetime="2024-03-15">March 15, 2024</time>
            <span aria-hidden="true">·</span>
            <span>8 min read</span>
          </div>
        </div>
      </div>

    </header>

    <!-- Prose body -->
    <div style="font-size: var(--aurad-text-base);
                line-height: var(--aurad-leading-loose);
                color: var(--aurad-text);"
         class="prose">

      <!-- Prose styles (inline for standalone HTML; move to CSS in real projects) -->
      <style>
        .prose p { margin-block-end: 1.5em; text-wrap: pretty; }
        .prose h2 { font-size: 1.5rem; font-weight: 700; margin-block: 2em 0.75em;
                    color: var(--aurad-text); letter-spacing: -0.01em; }
        .prose h3 { font-size: 1.25rem; font-weight: 600; margin-block: 1.5em 0.5em;
                    color: var(--aurad-text); }
        .prose code { font-family: var(--aurad-font-mono); font-size: 0.875em;
                      background: var(--aurad-surface-sunken);
                      padding: 0.125em 0.375em;
                      border-radius: var(--aurad-radius-sm); }
        .prose pre { background: var(--aurad-surface-sunken);
                     border: 1px solid var(--aurad-border);
                     border-radius: var(--aurad-radius-md);
                     padding: var(--aurad-space-4);
                     overflow-x: auto; margin-block: 1.5em; }
        .prose pre code { background: none; padding: 0; font-size: 0.875rem;
                          line-height: 1.7; }
        .prose blockquote { border-inline-start: 3px solid var(--aurad-primary);
                            margin-inline-start: 0; padding-inline-start: var(--aurad-space-4);
                            color: var(--aurad-text-muted); font-style: italic; }
        .prose img { border-radius: var(--aurad-radius-md);
                     inline-size: 100%; block-size: auto; }
        .prose a { color: var(--aurad-primary); }
        .prose ul, .prose ol { padding-inline-start: 1.5em; margin-block-end: 1.5em; }
        .prose li { margin-block-end: 0.5em; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      </style>

      <p>When we first built our rendering engine in 2020, we optimized for developer experience — not production throughput. That decision served us well until our user base grew 10× in 18 months.</p>

      <h2>The problem</h2>
      <p>Our p95 response time had crept from 120ms to 840ms. Users were abandoning sessions. We needed to act.</p>

      <!-- Code block -->
      <pre><code>// Before: synchronous rendering
const result = renderPage(template, data);
res.send(result);</code></pre>

    </div>

    <!-- Post footer: author bio + related -->
    <footer style="margin-block-start: var(--aurad-space-16);
                   padding-block-start: var(--aurad-space-8);
                   border-block-start: 1px solid var(--aurad-border);">

      <!-- Author bio -->
      <div style="display: flex; gap: var(--aurad-space-4);
                  margin-block-end: var(--aurad-space-10);">
        <img src="/avatars/author.jpg" alt="Jane Smith"
             width="48" height="48"
             style="border-radius: var(--aurad-radius-full); flex-shrink: 0;">
        <div>
          <p style="font-weight: 600; color: var(--aurad-text);">Jane Smith</p>
          <p style="font-size: var(--aurad-text-sm); color: var(--aurad-text-muted);
                    line-height: var(--aurad-leading-normal);
                    margin-block-start: var(--aurad-space-1);">
            Staff Engineer at Acme. Writes about distributed systems, performance, and developer tooling.
          </p>
        </div>
      </div>

      <!-- Related posts -->
      <h2 style="font-size: var(--aurad-text-lg); font-weight: 600;
                 color: var(--aurad-text); margin-block-end: var(--aurad-space-4);">
        Related posts
      </h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr;
                  gap: var(--aurad-space-4);">
        <a href="/blog/related-1"
           style="padding: var(--aurad-space-4);
                  border: 1px solid var(--aurad-border);
                  border-radius: var(--aurad-radius-lg);
                  text-decoration: none;">
          <p style="font-size: var(--aurad-text-sm); font-weight: 500;
                    color: var(--aurad-text); margin-block-end: var(--aurad-space-1);">
            Optimizing database queries at scale
          </p>
          <p style="font-size: var(--aurad-text-xs); color: var(--aurad-text-muted);">
            6 min read
          </p>
        </a>
      </div>

    </footer>

  </article>

</main>
```

---

## 3. Key Blog Patterns

| Pattern | Frequency | Impact |
|---------|-----------|--------|
| Prose constrained to 65–72ch / 720px | 6/6 reference | Optimal reading comfort; prevents line-length eye strain |
| Fluid heading with `clamp()` | 5/6 reference | Natural scaling across breakpoints |
| `letter-spacing: -0.02em` on large headings | 5/6 reference | Tightened tracking at display sizes |
| `line-height: 1.7–1.8` on body text | 6/6 reference | Reading comfort for long-form prose |
| `text-wrap: pretty` on paragraphs | 4/6 reference | Prevents typographic orphans |
| Time element with `datetime` attribute | 6/6 reference | Machine-readable date for search engines and screen readers |
| Read time estimate in header metadata | 5/6 reference | Sets expectation; reduces abandonment |

---

## 4. Blog Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Prose width > 80ch | Reading fatigue | `max-inline-size: 65ch–72ch` |
| `line-height < 1.5` on body | Dense, hard to read | 1.7–1.8 for prose |
| Fixed font size in px | Ignores user browser settings | Use `rem` — `1rem` base |
| Social share buttons in prose | Visual interruption mid-read | Sticky sidebar or end of post only |
| Comment section without moderation UX | Spam accumulation | Use established systems (GitHub Discussions, Giscus) |
| No `<time datetime>` | SEO + a11y miss | Always include machine-readable date |
| Images without `loading="lazy"` | Performance on long posts | `loading="lazy"` on all below-fold images |
