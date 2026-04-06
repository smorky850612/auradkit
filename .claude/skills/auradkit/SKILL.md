<!-- AURADKIT ACTIVE -->
<!-- If this section is missing after context compaction, reload: /auradkit -->
# AuraDKit Design Intelligence v5.3
<!-- AURADKIT:STATIC — cache-stable content below. Do NOT place volatile data (site counts, dates) above DYNAMIC boundary. -->

## Output Rules (MANDATORY)

### 4 States — Every component: `default` · `loading` · `empty` · `error`
```html
<section data-state="default"><!-- default | loading | empty | error --></section>
```

### Blocklist (ALWAYS ACTIVE)
1. No div nesting > 3 levels → semantic HTML
2. No inline style literals → `--aurad-*` tokens only
3. No hardcoded HEX/RGB → CSS custom properties only
4. No `outline: none` → `:focus-visible` with visible ring
5. No layout props in transitions → `transform` + `opacity` only
6. No `<div onclick>` → `<button>` or `<a href>`

### Format Waterfall
`--format` → `.auradkit/system.md` → `package.json` detection → HTML

### Write Guardrails
**NEVER:** `package.json` · `*.lock` · `.env*` · `tsconfig.json` · `*.config.*` · `.git/**` · `node_modules/**`
**WRITE TO:** `src/` `app/` `components/` `pages/` or user-specified path only.

---

## Token System
Full spec → `references/design-tokens.md`

```css
/* Color tokens — use --aurad-fg for text color, --aurad-text-* for font sizes */
--aurad-primary:  oklch(0.55 0.15 250);  /* #3b82f6 */
--aurad-fg:       oklch(0.25 0.02 250);  /* #1e293b — text foreground */
--aurad-fg-inv:   oklch(0.98 0.005 250); /* #f8fafc — text on colored bg */
--aurad-surface:  oklch(0.98 0.005 250); /* #f8fafc */
--aurad-border:   oklch(0.85 0.01 250);  /* #cbd5e1 */
--aurad-error:    oklch(0.55 0.20 25);   /* #ef4444 */
--aurad-success:  oklch(0.60 0.15 150);  /* #22c55e */

/* Spacing tokens — 4px grid */
--aurad-space-[1|2|3|4|6|8|12|16|24]: 0.25→6rem

/* Font size tokens */
--aurad-text-[xs|sm|base|lg|xl|2xl|3xl|4xl]: .75→2.25rem

/* Typography */
--aurad-leading-tight: 1.25;
--aurad-leading-normal: 1.5;
--aurad-leading-relaxed: 1.75;

/* Radius, motion */
--aurad-radius-[sm|md|lg|xl|full]: 4|8|12|16|9999px
--aurad-duration-[fast|normal|slow]: 150|250|400ms
--aurad-ease-default: cubic-bezier(0.4, 0, 0.2, 1);

/* Shadow — floating elements only */
--aurad-shadow-sm: 0 1px 2px oklch(0 0 0 / 0.05);
--aurad-shadow-md: 0 4px 6px oklch(0 0 0 / 0.07);
--aurad-shadow-lg: 0 10px 15px oklch(0 0 0 / 0.1);

/* Breakpoints */
--aurad-bp-sm: 640px; --aurad-bp-md: 768px; --aurad-bp-lg: 1024px; --aurad-bp-xl: 1280px;

@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:.01ms!important; transition-duration:.01ms!important } }
```

**Dark mode** — add to `[data-theme="dark"]`:
```css
[data-theme="dark"] {
  --aurad-fg:      oklch(0.90 0.02 250);  /* #e2e8f0 */
  --aurad-surface: oklch(0.15 0.005 250); /* #0f172a */
  --aurad-border:  oklch(0.30 0.01 250);  /* #334155 */
  --aurad-primary: oklch(0.65 0.15 250);  /* #60a5fa */
}
```

---

## WCAG AA Pairs
| Foreground | Background | Ratio |
|-----------|-----------|-------|
| `--aurad-fg` | `--aurad-surface` | 7.2:1 AAA |
| `--aurad-fg-inv` | `--aurad-primary` | 4.8:1 AA |
| `--aurad-primary` | `--aurad-surface` | 4.6:1 AA |
| `--aurad-error` | `--aurad-surface` | 4.5:1 AA |

---

## Critical Rules

- [CRITICAL] **prefers-reduced-motion 미적용**: 전역 CSS에 prefers-reduced-motion 블록을 추가하라.
- [CRITICAL] **하드코딩된 색상값 (HEX/RGB 직접 사용)**: 모든 하드코딩 색상을 CSS 변수로 교체하라. 다크모드, 브랜드 변경 대응 불가능.
- [HIGH] **임의 픽셀 간격 사용**: 모든 margin/padding/gap을 4px 배수 토큰으로 교체하라.
- [HIGH] **Layout 속성 애니메이션 (성능 문제)**: transform: translateX/Y, scale과 opacity만 애니메이션하라. GPU 합성 레이어 활용.
- [HIGH] **4종 이상 폰트 패밀리 혼용**: 최대 2종 폰트(헤딩용 + 본문용)로 줄여라. 단일 폰트도 충분히 효과적이다.
- [HIGH] **고유 색상값 과다 (30종 이상)**: semantic color 토큰 10개 이하로 팔레트를 정리하고 CSS 변수로 참조하라.
- [CRITICAL] **56개 사이트에서 WCAG AA 미달 색상 감지**: 사전 검증된 색상 쌍만 사용하라: --aurad-text on --aurad-surface = 7.2:1 (AAA).
- [HIGH] **터치 타겟 44px 준수율 저조 — 평균 29%**: 모든 인터랙티브 요소에 min-height: 44px; min-width: 44px를 적용하라.

Full catalog → `references/drift-patterns.md` (load on-demand for specific drift axis details)

---

## Design Principles (Top 5)

- **transform/opacity만 애니메이션** (95%): GPU 합성 레이어(transform, opacity)만 애니메이션하면 60fps를 유지할 수 있다.
- **2폰트 페어링이 이상적** (86%): 폰트 패밀리 2개(헤딩+본문)가 가장 일관성 있고 개성 있는 조합이다.
- **단일 H1 + Hero + CTA 조합** (85%): 페이지당 H1 하나, Hero 섹션, CTA 버튼이 함께 있을 때 시선 집중도가 최대화된다.
- **모듈러 스케일 80%+ 준수** (80%): \[12,14,16,18,20,24,30,36,48,60,72]px 표준값 80% 이상 사용 시 스케일 시스템이 인식된다.
- **4px 배수 간격 시스템 80%+ 준수** (74%): 모든 margin/padding/gap이 4px 배수일 때 공간 리듬이 형성된다. 80% 이상 준수가 목표.

All 15 principles across 7 axes → `references/principles.md` (load on-demand for axis-specific guidance)

---

## Post-Generation Checklist (MANDATORY — self-verify after every UI output)

After generating UI code, verify ALL items before presenting to user:

| # | Check | How to verify |
|---|-------|--------------|
| 1 | Zero hardcoded colors | grep for `#[0-9a-f]`, `rgb(`, `hsl(` outside comments — must be 0 |
| 2 | All colors use `--aurad-*` tokens | every color value references a CSS custom property |
| 3 | 4-state support | `data-state="default\|loading\|empty\|error"` present on main container |
| 4 | `prefers-reduced-motion` block | `@media (prefers-reduced-motion: reduce)` exists if any animation used |
| 5 | `:focus-visible` on interactives | every `<button>`, `<a>`, `<input>` has visible focus style |
| 6 | 4px grid spacing | all margin/padding/gap values are multiples of 4px or use `--aurad-space-*` |
| 7 | div nesting <= 3 | no `<div>` deeper than 3 levels — use semantic elements |
| 8 | No AI-slop (SLOP-01~07) | scan output against slop table below — if ANY SLOP code matches, rewrite that section |
| 9 | Semantic HTML | `<nav>`, `<main>`, `<section>`, `<article>` used over `<div>` |
| 10 | Touch targets >= 44px | interactive elements have `min-height: 44px; min-width: 44px` |

If ANY check fails, fix before output. Do not present unchecked code.

---

## Modern CSS & Mobile (ref sites: 138)

- `scroll-behavior:smooth`: 67% — add to html/body
- `line-clamp`: 62% — truncate card body text
- `text-wrap:balance`: 54% — use on headings
- `overscroll-behavior`: 50% — prevent modal bounce
- `@container`: 41% — component-level responsive

---

## Visual Intelligence (ref sites: 138)

**Design styles:** glassmorphism(107), mixed(13), editorial(11), minimalist(4)

**Visual effects:**
- Glassmorphism (backdrop-filter): 78% — blur + semi-transparent bg
- Gradient-heavy (3+): 83%
- Gradient text (background-clip:text): 42%
- Blend modes: 89%
- clip-path shapes: 64%
- Grain/noise texture: 10%

**Video:** - Sites using video: 40% (hero: 21%, WebM: 8%)

---

## Patterns

- **Floating Label Form** [form]: 입력 시 레이블이 위로 올라가는 floating label 패턴.
- **Sidebar + Main Content** [layout]: 좌측 고정 사이드바 + 우측 메인 콘텐츠 레이아웃. SaaS 대시보드 표준.
- **Sticky Navigation** [navigation]: 스크롤 시 상단에 고정되는 내비게이션 바.
- **3-Column Feature Grid** [card-grid]: 3컬럼 기능 소개 그리드. 아이콘 + 제목 + 설명 구조.
- **Typographic Scale System** [typography]: 12-72px 모듈러 스케일을 일관되게 적용한 타이포 시스템.
- **Accordion / FAQ** [card-grid]: FAQ/콘텐츠 아코디언. 정보 계층 정리에 효과적. details/summary 또는 JS 구현.
- **Accessible Motion (reduced-motion)** [animation]: @media (prefers-reduced-motion: reduce) 분기로 모든 애니메이션 접근성 지원.
- **Hero + CTA** [hero]: 전체 너비 히어로 섹션 + 중앙 CTA 버튼. 랜딩 페이지 필수 패턴.

### Anti-Patterns (Design)
- ⚠ **Shadow Overuse**: 모든 요소에 과도한 drop-shadow 적용. 시각적 무게감 과부하.
- ⚠ **Form Without Error States**: 에러/성공 상태 없는 폼. 사용자 피드백 부재로 전환율 저하.
- ⚠ **Purple-Blue Gradient Hero**: 보라-파랑 그라데이션 히어로 배경. AI 생성 UI의 대표적 클리셰.

### AI Slop Detection (SLOP-01~07 — MANDATORY real-time check)

| Code | Pattern | Detection | Alternative |
|------|---------|-----------|-------------|
| SLOP-01 | Purple-blue gradient hero | `linear-gradient` with H:220-320 in hero | Solid `--aurad-surface` + product screenshot |
| SLOP-02 | Generic icon set (94+ same lib) | All icons from one library, 0 custom | Fewer icons + custom brand mark |
| SLOP-03 | 3-col identical feature grid | `repeat(3,1fr)` + icon+h3+p same structure | Primary/secondary split layout |
| SLOP-04 | Floating dashboard screenshot | `perspective()` + `box-shadow:40px+` in hero img | Real screenshot, no transform theater |
| SLOP-05 | Glowing blur orbs | `filter:blur(60px+)` + `radial-gradient` + `position:absolute` | Border + surface color contrast |
| SLOP-06 | Star testimonial carousel | Stars + generic quote + stock avatar | Specific outcome quote + real attribution |
| SLOP-07 | Pill badge hero label | `border-radius:9999px` + "Introducing/New" above h1 | Changelog link or omit entirely |

**Text Slop Blocklist** — NEVER use these phrases in generated copy:
`blazing fast` · `seamless` · `robust` · `cutting-edge` · `state-of-the-art` · `easy to use` · `intuitive` · `powerful` · `secure by default` · `built for scale` · `enterprise-grade` · `next-generation`

**Core principle**: Replace generic category signal with specific product evidence.

Full rules + code examples → `knowledge-base/anti-ai-slop/` (load on-demand)

### Category Hints (load on-demand)
- `form`: Floating Label Form
- `layout`: Sidebar + Main Content
- `navigation`: Sticky Navigation
- `card-grid`: 3-Column Feature Grid, Accordion / FAQ
- `typography`: Typographic Scale System

<!-- AURADKIT:DYNAMIC — volatile, changes per compilation -->
---

## Analysis Stats

| Axis | Score |
|------|-------|
| visualHierarchy | 9.1/10 |
| spatialRhythm | 9.1/10 |
| typography | 9.1/10 |
| color | 9.1/10 |
| motion | 9.1/10 |
| component | 9.1/10 |
| layout | 9.2/10 |

Drift: ✓ Low (20/100)
AI-Slop: ✓ Original (7/100)

> 455 sites · top refs: deno.com, magicui.design, zed.dev, astro.build, css-tricks.com, nextui.org, trigger.dev, vastspace.com
> Truncated? Run `node trainer/dist/index.js compile` · refs: `references/`

*AuraDKit v5.3 · 2026-04-06*
<!-- integrity:sha256:09a6b6c2a23b -->
<!-- /AURADKIT ACTIVE -->
