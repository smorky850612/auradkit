# Spacing Drift — AuraDKit Drift Catalog

> Spacing drift is the most common design system violation. It compounds silently — one arbitrary pixel leads to ten inconsistencies. Detected in 73% of analyzed sites with a drift score > 40.

## What Is Spacing Drift?

Spacing drift occurs when element spacing does not conform to the 4px base-unit grid. Instead of values like 4, 8, 12, 16, 24, 32, 48px, drifting sites show values like 5, 7, 13, 18, 22px — numbers that exist between grid points.

---

## 1. Violation Signatures

### 1.1 Arbitrary Pixel Syndrome

The most common pattern: developers hardcode comfortable-looking numbers without consulting the spacing scale.

```css
/* VIOLATION — detected off-scale values */
.card { padding: 18px; }               /* should be 16px (--aurad-space-4) */
.input { padding: 10px 14px; }         /* should be 8px 12px */
.section { margin-bottom: 72px; }      /* should be 64px or 96px */
.icon { margin-right: 6px; }           /* should be 8px (--aurad-space-2) */
```

```css
/* CORRECT */
.card { padding: var(--aurad-space-4); }              /* 16px */
.input { padding: var(--aurad-space-2) var(--aurad-space-3); }  /* 8px 12px */
.section { margin-bottom: var(--aurad-space-16); }    /* 64px */
.icon { margin-inline-end: var(--aurad-space-2); }    /* 8px */
```

### 1.2 Mixed Approaches (px + rem + em)

```css
/* VIOLATION — three unit systems in one component */
.component {
  padding: 16px;          /* absolute px */
  margin-top: 1.5rem;     /* relative rem */
  gap: 0.75em;            /* relative to font-size */
}
```

All spacing must use `var(--aurad-space-*)` tokens. This enforces the 4px grid across the entire codebase, regardless of font-size or zoom level.

### 1.3 Density Inversion

Inner spacing larger than outer spacing — the opposite of visual hierarchy.

```css
/* VIOLATION — card internal padding wider than card gap */
.card-grid { gap: 12px; }          /* grid gap (outer) */
.card { padding: 24px; }           /* card padding (inner) */
/* inner > outer creates visual "floating" effect */
```

```css
/* CORRECT — outer gap ≥ inner spacing */
.card-grid { gap: var(--aurad-space-6); }    /* 24px outer */
.card { padding: var(--aurad-space-5); }     /* 20px inner — not on scale but... */
/* safer: */
.card-grid { gap: var(--aurad-space-8); }    /* 32px outer */
.card { padding: var(--aurad-space-6); }     /* 24px inner */
```

### 1.4 Section Spacing Collapse

Section-level spacing shrinks to match component-level spacing, destroying the sense of page rhythm.

```css
/* VIOLATION — section spacing same as card padding */
.section { padding-block: 24px; }  /* same as card internal */
.card { padding: 24px; }
```

```css
/* CORRECT — sections 3–4× more space than components */
.section { padding-block: var(--aurad-space-16); }  /* 64px */
.card { padding: var(--aurad-space-6); }            /* 24px */
```

---

## 2. Compliance Measurement

The crawler measures 4px compliance from the computed CSS of every element:

```
4px compliance = values_divisible_by_4 / total_spacing_values × 100
```

| Compliance Rate | Score Range | Description |
|----------------|-------------|-------------|
| ≥ 90% | 8.0–10 | Production-ready spacing system |
| 70–89% | 6.0–7.9 | Mostly on-grid; occasional ad-hoc values |
| 50–69% | 4.0–5.9 | Significant drift; multiple arbitrary values |
| < 50% | 0–3.9 | No visible spacing system |

---

## 3. Token Reference (4px Grid)

```css
:root {
  --aurad-space-1:  4px;    /* icon margin, tight badge padding */
  --aurad-space-2:  8px;    /* inline-gap between icon and text */
  --aurad-space-3:  12px;   /* input padding vertical */
  --aurad-space-4:  16px;   /* standard card padding, form field gap */
  --aurad-space-5:  20px;   /* compact section padding */
  --aurad-space-6:  24px;   /* card padding (spacious), grid gap */
  --aurad-space-8:  32px;   /* section inner padding */
  --aurad-space-10: 40px;   /* large card/modal padding */
  --aurad-space-12: 48px;   /* narrow section padding-block */
  --aurad-space-16: 64px;   /* standard section padding-block */
  --aurad-space-20: 80px;   /* wide section padding-block */
  --aurad-space-24: 96px;   /* hero section padding-block */
  --aurad-space-32: 128px;  /* hero with visual balance room */
}
```

---

## 4. Drift Correction Rules

| Observed Value | Replace With | Token |
|---------------|--------------|-------|
| 5px | 4px | `--aurad-space-1` |
| 6px | 8px | `--aurad-space-2` |
| 7px | 8px | `--aurad-space-2` |
| 10px | 8px or 12px | `--aurad-space-2` / `--aurad-space-3` |
| 13px | 12px | `--aurad-space-3` |
| 14px | 12px or 16px | `--aurad-space-3` / `--aurad-space-4` |
| 15px | 16px | `--aurad-space-4` |
| 17px | 16px | `--aurad-space-4` |
| 18px | 16px | `--aurad-space-4` |
| 22px | 24px | `--aurad-space-6` |
| 26px | 24px | `--aurad-space-6` |
| 28px | 32px | `--aurad-space-8` |
| 36px | 32px | `--aurad-space-8` |
| 40px | 40px (on-grid) | `--aurad-space-10` |
| 72px | 64px | `--aurad-space-16` |

---

## 5. Drift Score Contribution

Spacing drift contributes to the overall Design Drift Score:

```
spacingDrift = (1 - complianceRate) × 40
```

- 90% compliance → spacingDrift = 4 (minimal)
- 70% compliance → spacingDrift = 12 (moderate)
- 50% compliance → spacingDrift = 20 (severe)
- 30% compliance → spacingDrift = 28 (critical)

Sites with spacingDrift > 15 typically fail visual rhythm at the section level — users perceive inconsistency without being able to name it.
