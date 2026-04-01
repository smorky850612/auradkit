<!-- AURADKIT ACTIVE -->
# AuraDKit Design Intelligence v5.0.1

> Generated from 126 analyzed sites | Avg score: 7.1/10 | Drift: 22/100 | AI-Slop: 7/100
> Reference sites: astro.build, docs.github.com, docs.anthropic.com, anthropic.com, bun.sh, deno.com, lovable.dev, magicui.design

## Context Anchor

If this skill appears truncated, run `npx auradkit-trainer compile` to regenerate.
References: `references/design-tokens.md` | `references/drift-patterns.md` | `references/principles.md`

---

## 1. Axis Benchmarks (Real Data)

| Axis | Avg Score |
|------|----------|
| color | 6.5/10 |
| visualHierarchy | 6.6/10 |
| component | 6.7/10 |
| motion | 6.9/10 |
| layout | 7.7/10 |
| spatialRhythm | 7.8/10 |
| typography | 7.8/10 |

**Design Drift**: ◦ Moderate (22/100)
**AI-Slop**: ✓ Original (7/100)

---

## 2. Token System (Observed from Reference Sites)

```css
:root {
  /* Spacing — 4px grid (observed scale) */
  --aurad-space-1:  0.25rem;  /*  4px */
  --aurad-space-2:  0.5rem;   /*  8px */
  --aurad-space-3:  0.75rem;  /* 12px */
  --aurad-space-4:  1rem;     /* 16px */
  --aurad-space-6:  1.5rem;   /* 24px */
  --aurad-space-8:  2rem;     /* 32px */
  --aurad-space-12: 3rem;     /* 48px */
  --aurad-space-16: 4rem;     /* 64px */
  --aurad-space-24: 6rem;     /* 96px */

  /* Typography — modular scale */
  --aurad-text-xs:   0.75rem;   /* 12px */
  --aurad-text-sm:   0.875rem;  /* 14px */
  --aurad-text-base: 1rem;      /* 16px */
  --aurad-text-lg:   1.125rem;  /* 18px */
  --aurad-text-xl:   1.25rem;   /* 20px */
  --aurad-text-2xl:  1.5rem;    /* 24px */
  --aurad-text-3xl:  1.875rem;  /* 30px */
  --aurad-text-4xl:  2.25rem;   /* 36px */

  /* Color — OKLCH with sRGB fallback */
  --aurad-primary:        oklch(0.55 0.15 250);   /* #3b82f6 */
  --aurad-primary-hover:  oklch(0.50 0.15 250);   /* #2563eb */
  --aurad-text:           oklch(0.25 0.02 250);   /* #1e293b */
  --aurad-text-muted:     oklch(0.50 0.02 250);   /* #64748b */
  --aurad-text-inverse:   oklch(0.98 0.005 250);  /* #f8fafc */
  --aurad-surface:        oklch(0.98 0.005 250);  /* #f8fafc */
  --aurad-surface-raised: oklch(1.00 0.000 0);    /* #ffffff */
  --aurad-surface-sunken: oklch(0.96 0.005 250);  /* #f1f5f9 */
  --aurad-border:         oklch(0.85 0.01 250);   /* #cbd5e1 */
  --aurad-error:          oklch(0.55 0.20 25);    /* #ef4444 */
  --aurad-success:        oklch(0.60 0.15 150);   /* #22c55e */

  /* Border radius (observed scale) */
  --aurad-radius-sm:   4px;
  --aurad-radius-md:   8px;
  --aurad-radius-lg:   12px;
  --aurad-radius-xl:   16px;
  --aurad-radius-full: 9999px;

  /* Motion */
  --aurad-duration-fast:   150ms;
  --aurad-duration-normal: 250ms;
  --aurad-duration-slow:   400ms;
  --aurad-ease-default: cubic-bezier(0.4, 0, 0.2, 1);

  /* Z-index */
  --aurad-z-dropdown: 100;
  --aurad-z-sticky:   200;
  --aurad-z-modal:    400;
  --aurad-z-toast:    500;
  --aurad-z-tooltip:  600;
}

/* Reduced motion — ALWAYS include */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 3. WCAG AA Validated Pairs

| Foreground | Background | Ratio | Grade |
|-----------|-----------|-------|-------|
| `--aurad-text` | `--aurad-surface` | 7.2:1 | AAA |
| `--aurad-text-inverse` | `--aurad-primary` | 4.8:1 | AA |
| `--aurad-primary` | `--aurad-surface` | 4.6:1 | AA |
| `--aurad-error` | `--aurad-surface` | 4.5:1 | AA |

> ⚠ Ratios are estimates. Final validation: `npx axe [URL] --tags wcag2aa`

---

## 4. Design Principles (from Analysis)

- **transform/opacity만 애니메이션** (motion, 93% confidence): GPU 합성 레이어(transform, opacity)만 애니메이션하면 60fps를 유지할 수 있다.
- **컴포넌트 스타일 일관성 80%+** (component, 93% confidence): 버튼 border-radius, 카드 스타일이 80% 이상 일관되어야 한다.
- **단일 H1 + Hero + CTA 조합** (visual-hierarchy, 90% confidence): 페이지당 H1 하나, Hero 섹션, CTA 버튼이 함께 있을 때 시선 집중도가 최대화된다.
- **2폰트 페어링이 이상적** (typography, 89% confidence): 폰트 패밀리 2개(헤딩+본문)가 가장 일관성 있고 개성 있는 조합이다.
- **모듈러 스케일 80%+ 준수** (typography, 87% confidence): [12,14,16,18,20,24,30,36,48,60,72]px 표준값 80% 이상 사용 시 스케일 시스템이 인식된다.
- **본문 행간 1.4-1.75 황금 범위** (typography, 82% confidence): 행간이 1.4-1.75 사이일 때 가독성과 시각적 리듬이 최적화된다.
- **최소 3개 미디어 쿼리 브레이크포인트** (layout, 75% confidence): 모바일/태블릿/데스크톱 3단계 이상의 반응형 구조가 필요하다.
- **header/nav/main/footer 시맨틱 구조** (layout, 67% confidence): 4가지 랜드마크(header, nav, main, footer)가 있으면 접근성과 SEO가 향상된다.
- **WCAG AA 대비율 90%+ 통과** (color, 66% confidence): 텍스트-배경 색상 쌍의 90% 이상이 4.5:1 이상 대비율을 유지해야 한다.
- **평균 간격 12-32px 범위** (spatial-rhythm, 65% confidence): 평균 간격이 12-32px 범위일 때 밀도 균형이 적절하다.

---

## 5. Proven Patterns

- **Sidebar + Main Content** [layout]: 좌측 고정 사이드바 + 우측 메인 콘텐츠 레이아웃. SaaS 대시보드 표준.
- **3-Column Feature Grid** [card-grid]: 3컬럼 기능 소개 그리드. 아이콘 + 제목 + 설명 구조.
- **Sticky Navigation** [navigation]: 스크롤 시 상단에 고정되는 내비게이션 바.
- **Typographic Scale System** [typography]: 12-72px 모듈러 스케일을 일관되게 적용한 타이포 시스템.
- **Card Shadow Hover** [card-grid]: 마우스 오버 시 shadow + translateY(-2px) 효과 카드.
- **Hero + CTA** [hero]: 전체 너비 히어로 섹션 + 중앙 CTA 버튼. 랜딩 페이지 필수 패턴.

### Anti-Patterns (Detected in Low-Score Sites)

- ⚠ **Shadow Overuse**: 모든 요소에 과도한 drop-shadow 적용. 시각적 무게감 과부하.
- ⚠ **Purple-Blue Gradient Hero**: 보라-파랑 그라데이션 히어로 배경. AI 생성 UI의 대표적 클리셰.

---

## 6. Critical Drift Rules

- [CRITICAL] **prefers-reduced-motion 미적용**: 전역 CSS에 prefers-reduced-motion 블록을 추가하라.
- [CRITICAL] **하드코딩된 색상값 (HEX/RGB 직접 사용)**: 모든 하드코딩 색상을 CSS 변수로 교체하라. 다크모드, 브랜드 변경 대응 불가능.
- [HIGH] **임의 픽셀 간격 사용**: 모든 margin/padding/gap을 4px 배수 토큰으로 교체하라.
- [HIGH] **Layout 속성 애니메이션 (성능 문제)**: transform: translateX/Y, scale과 opacity만 애니메이션하라. GPU 합성 레이어 활용.
- [HIGH] **고유 색상값 과다 (30종 이상)**: semantic color 토큰 10개 이하로 팔레트를 정리하고 CSS 변수로 참조하라.
- [HIGH] **폰트 크기 과다 (8종 이상)**: 모듈러 스케일 6단계 이하로 제한하고 CSS 변수로 관리하라.

Full drift catalog → `references/drift-patterns.md`

---

## 7. Actionable Insights

- [CRITICAL] **38개 사이트에서 WCAG AA 미달 색상 감지**: 사전 검증된 색상 쌍만 사용하라: --aurad-text on --aurad-surface = 7.2:1 (AAA).
- [HIGH] **59개 사이트에서 prefers-reduced-motion 미지원**: 모든 애니메이션에 prefers-reduced-motion: reduce 분기를 추가하라.

---

## 8. Output Rules

### 4 States (MANDATORY)
Every component MUST have: `default` · `loading` · `empty` · `error`

```html
<section data-state="default">  <!-- default | loading | empty | error -->
```

### Anti-Pattern Rules (ALWAYS ACTIVE)
1. No div nesting > 3 levels — use semantic HTML
2. No inline style with literal values — use `--aurad-*` tokens
3. No hardcoded HEX/RGB — use CSS custom properties only
4. No `outline: none` — use `:focus-visible` with `--aurad-border-focus`
5. No layout properties in transitions — use `transform` + `opacity` only

### Output Format Waterfall
`--format` flag → `.auradkit/system.md` → `package.json` detection → HTML

### Semantic HTML
`<header>` `<nav>` `<main>` `<section>` `<article>` `<aside>` `<footer>`
Never: `<div onclick>` → use `<button>` or `<a href>`

---

## 9. Write Guardrails

**NEVER write:** `package.json` · `*.lock` · `.env*` · `tsconfig.json` · `*.config.*` · `.git/**` · `node_modules/**`

**ALWAYS verify:** Write to `src/` `app/` `components/` `pages/` or user-specified paths only.

---

*AuraDKit v5.0.1 · 2026-03-31 · 126 sites analyzed*
<!-- /AURADKIT ACTIVE -->
