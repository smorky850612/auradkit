# Color Drift — AuraDKit Drift Catalog

> Color drift is the silent consistency killer. A single off-palette hex creates a visual "wrong note" even if users can't name it. Detected in 68% of analyzed sites with a drift score > 40.

## What Is Color Drift?

Color drift occurs when color values in use do not map to the defined token palette. Instead of `var(--aurad-primary)`, drifting sites hardcode `#3a7bd5`, `#4285f4`, or `rgba(59, 130, 246, 0.9)` — close but not the same, accumulating into incoherence.

---

## 1. Violation Signatures

### 1.1 Hardcoded Hex Values

The primary drift vector: copying color values from design tools without tokenizing.

```css
/* VIOLATION — hardcoded values */
.button      { background: #3b82f6; }          /* bypasses token */
.alert       { border-color: #ef4444; }        /* hardcoded error color */
.badge       { color: rgba(100, 116, 139, 1); } /* exact muted value, not token */
.card        { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07); } /* hardcoded shadow */
.text-accent { color: oklch(0.55 0.15 250); }  /* token VALUE without the token */
```

```css
/* CORRECT */
.button      { background: var(--aurad-primary); }
.alert       { border-color: var(--aurad-error); }
.badge       { color: var(--aurad-text-muted); }
.card        { box-shadow: var(--aurad-shadow-md); }
.text-accent { color: var(--aurad-primary); }
```

### 1.2 Near-Miss Palette Values

Slightly wrong values accumulate into palette fragmentation — each developer picks their "preferred shade" of a brand color.

```css
/* VIOLATION — 4 slightly different "primary blues" in one codebase */
.hero-cta   { background: #3a7bd5; }   /* one dev's blue */
.card-link  { color: #4285f4; }        /* another dev's blue */
.badge      { background: #3b82f6; }   /* the actual token value */
.nav-active { color: #2563eb; }        /* yet another shade */
```

This produces a drift score proportional to the number of unique non-token colors detected:

```
colorTokenMissRate = non_token_colors / total_color_declarations × 100
```

### 1.3 Opacity Mutations Without Token

Applying arbitrary opacity to a brand color instead of using a defined subtle variant.

```css
/* VIOLATION — ad-hoc opacity manipulation */
.primary-bg-light { background: rgba(59, 130, 246, 0.1); }  /* invented */
.primary-bg-hover { background: rgba(59, 130, 246, 0.15); } /* invented */
.primary-bg-focus { background: rgba(59, 130, 246, 0.08); } /* invented */
```

```css
/* CORRECT — use defined subtle tokens */
.primary-bg-light { background: var(--aurad-primary-subtle); }   /* oklch(0.95 0.04 250) */
.primary-bg-hover { background: var(--aurad-primary-subtle); }
.focus-ring       { box-shadow: var(--aurad-shadow-focus); }      /* pre-defined */
```

When a subtle variant doesn't exist for a semantic color, define it in the token system rather than inventing ad-hoc opacity values.

### 1.4 Dark Mode Drift

Colors that are not inverted via CSS custom properties when dark mode activates.

```css
/* VIOLATION — hardcoded color bypasses dark mode */
.sidebar { background: #f8fafc; }   /* always light — breaks dark mode */
.card    { border: 1px solid #cbd5e1; }  /* doesn't invert */
```

```css
/* CORRECT — tokens invert automatically */
.sidebar { background: var(--aurad-surface-raised); }
.card    { border: 1px solid var(--aurad-border); }

/* dark mode token override */
@media (prefers-color-scheme: dark) {
  :root {
    --aurad-surface:        oklch(0.12 0.01 250);
    --aurad-surface-raised: oklch(0.16 0.01 250);
    --aurad-border:         oklch(0.28 0.02 250);
    /* ... */
  }
}
```

### 1.5 Semantic Color Misuse

Using brand colors for semantic roles (error, success, warning) instead of dedicated semantic tokens.

```css
/* VIOLATION — primary blue used as error indicator */
.error-message { color: var(--aurad-primary); }   /* wrong semantic */
.error-border  { border-color: #3b82f6; }          /* doubly wrong */

/* VIOLATION — success green hardcoded instead of token */
.success-badge { background: #22c55e; }
```

```css
/* CORRECT — semantic tokens for semantic roles */
.error-message { color: var(--aurad-error); }
.error-border  { border-color: var(--aurad-error); }
.success-badge { background: var(--aurad-success-subtle); color: var(--aurad-success); }
```

---

## 2. Compliance Measurement

The crawler detects non-token colors by:
1. Extracting all computed `color`, `background-color`, `border-color`, `outline-color`, `box-shadow` values
2. Converting to OKLCH
3. Matching against the defined palette (± tolerance of L=0.02, C=0.01, H=3°)
4. Values outside tolerance = non-token colors

```
colorCompliance = token_color_uses / total_color_declarations × 100
```

| Compliance Rate | Score Range | Description |
|----------------|-------------|-------------|
| ≥ 95% | 8.0–10 | Token-first color system |
| 80–94% | 6.0–7.9 | Mostly token; occasional hardcode |
| 60–79% | 4.0–5.9 | Significant hardcoding |
| < 60% | 0–3.9 | No color system |

---

## 3. Token Reference

```css
:root {
  /* Primary — Blue */
  --aurad-primary:         oklch(0.55 0.15 250);   /* #3b82f6 */
  --aurad-primary-hover:   oklch(0.50 0.15 250);   /* #2563eb */
  --aurad-primary-subtle:  oklch(0.95 0.04 250);   /* #eff6ff */
  --aurad-primary-muted:   oklch(0.75 0.08 250);   /* muted variant */

  /* Surface */
  --aurad-surface:         oklch(0.98 0.005 250);  /* #f8fafc */
  --aurad-surface-raised:  oklch(1.00 0.000 0);    /* #ffffff */
  --aurad-surface-sunken:  oklch(0.96 0.005 250);  /* #f1f5f9 */
  --aurad-overlay:         oklch(0 0 0 / 0.5);

  /* Text */
  --aurad-text:            oklch(0.25 0.02 250);   /* #1e293b */
  --aurad-text-muted:      oklch(0.50 0.02 250);   /* #64748b */
  --aurad-text-disabled:   oklch(0.70 0.01 250);   /* #94a3b8 */
  --aurad-text-inverse:    oklch(0.98 0.005 250);  /* #f8fafc */

  /* Border */
  --aurad-border:          oklch(0.85 0.01 250);   /* #cbd5e1 */
  --aurad-border-strong:   oklch(0.70 0.02 250);   /* #94a3b8 */
  --aurad-border-focus:    oklch(0.55 0.15 250);   /* #3b82f6 */

  /* Semantic */
  --aurad-error:           oklch(0.55 0.20 25);    /* #ef4444 */
  --aurad-error-subtle:    oklch(0.96 0.05 25);    /* #fef2f2 */
  --aurad-success:         oklch(0.60 0.15 150);   /* #22c55e */
  --aurad-success-subtle:  oklch(0.96 0.04 150);   /* #f0fdf4 */
  --aurad-warning:         oklch(0.70 0.15 80);    /* #f59e0b */
  --aurad-warning-subtle:  oklch(0.97 0.04 80);    /* #fffbeb */
  --aurad-info:            oklch(0.60 0.12 220);   /* #0ea5e9 */
  --aurad-info-subtle:     oklch(0.96 0.03 220);   /* #f0f9ff */
}
```

---

## 4. WCAG Contrast Compliance

Color drift compounds accessibility failures. Non-token colors frequently fail WCAG AA:

### Pre-validated Pairs (safe to use without re-checking)

| Foreground | Background | Ratio | Grade |
|-----------|-----------|-------|-------|
| `--aurad-text` | `--aurad-surface` | 7.2:1 | AAA |
| `--aurad-primary` | `--aurad-surface` | 4.6:1 | AA |
| `--aurad-text-inverse` | `--aurad-primary` | 4.8:1 | AA |
| `--aurad-error` | `--aurad-surface` | 4.5:1 | AA |
| `--aurad-success` | `--aurad-surface` | 4.5:1 | AA Large |

### Common Drift Failures

| Non-Token Value | Actual Ratio | WCAG Result |
|----------------|-------------|-------------|
| `#64748b` on `#fff` | 4.48:1 | FAIL (AA needs 4.5) |
| `rgba(59,130,246,0.5)` on `#fff` | ~2.1:1 | FAIL |
| `#94a3b8` on `#f8fafc` | 3.2:1 | FAIL (body text) |
| `#22c55e` on `#fff` | 2.7:1 | FAIL |

> The difference between `--aurad-text-muted` (oklch 0.50) and `#64748b` is 0.02 contrast ratio — enough to flip AA status.

---

## 5. Drift Correction Workflow

```
1. Crawl computed styles → extract all color values
2. Convert to OKLCH (L, C, H)
3. Match to token palette (tolerance: ΔL≤0.02, ΔC≤0.01, ΔH≤3°)
4. Unmatched values → flag as drift
5. Find nearest token (by Euclidean distance in LCH space)
6. Report: "Replace #3a7bd5 → var(--aurad-primary)"
```

### Correction Priority

| Drift Type | Priority | Reason |
|-----------|---------|--------|
| Semantic color misuse | Critical | Misleads users (error ≠ brand) |
| WCAG-failing hardcode | Critical | Legal/accessibility risk |
| Near-miss brand color | High | Visual incoherence |
| Opacity mutation | Medium | Breaks dark mode |
| Exact-value duplicate | Low | No visual impact, just token hygiene |

---

## 6. Drift Score Contribution

```
colorDrift = (1 - colorCompliance) × 30
```

Additional penalty for unique non-token color count:
```
colorDrift += min(uniqueNonTokenColors × 1.5, 10)
```

- 95% compliance, 0 unique non-token → colorDrift = 1.5 (minimal)
- 80% compliance, 3 unique non-token → colorDrift = 10.5 (moderate)
- 60% compliance, 8 unique non-token → colorDrift = 24 (severe)
- 40% compliance, 15+ unique non-token → colorDrift = 28 (critical, capped)

Sites with colorDrift > 20 show visually detectable inconsistency in brand color rendering across pages — users perceive the site as "unpolished" without identifying the cause.
