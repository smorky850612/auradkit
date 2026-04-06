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
Full spec → `references/design-tokens.md` (load on-demand for per-site observed values)

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
- [CRITICAL] **255개 사이트에서 WCAG AA 미달 색상 감지**: 사전 검증된 색상 쌍만 사용하라: --aurad-text on --aurad-surface = 7.2:1 (AAA).
- [HIGH] **color 축이 가장 낮은 점수 (5.8/10)**: color 관련 원칙을 먼저 적용하라. 이 축의 개선이 전체 점수 상승에 가장 효과적이다.
- [HIGH] **239개 사이트에서 prefers-reduced-motion 미지원**: 모든 애니메이션에 prefers-reduced-motion: reduce 분기를 추가하라.
- [HIGH] **터치 타겟 44px 준수율 저조 — 평균 29%**: 모든 인터랙티브 요소에 min-height: 44px; min-width: 44px를 적용하라.

Full catalog → `references/drift-patterns.md` (load on-demand for specific drift axis details)

---

## Design Principles (Top 5)

- **transform/opacity만 애니메이션** (95%): GPU 합성 레이어만 사용 → 60fps 보장.
- **단일 H1 + Hero + CTA 조합** (86%): 시선 집중도 최대화.
- **2폰트 페어링** (86%): 헤딩+본문 2개가 최적.
- **모듈러 스케일 80%+** (81%): [12,14,16,18,20,24,30,36,48]px 표준값.
- **4px 배수 간격 80%+** (72%): 공간 리듬의 기초.

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

## Modern CSS & Mobile (ref sites: 19)

- `@container`: 58% — component-level responsive
- `line-clamp`: 21% — truncate card body text
- `scroll-behavior:smooth`: 16% — add to html/body
- `text-wrap:balance`: 16% — use on headings
- `overscroll-behavior`: 16% — prevent modal bounce

---

## Patterns

- **Sidebar + Main Content** [layout]: 좌측 고정 사이드바 + 우측 메인 콘텐츠 레이아웃. SaaS 대시보드 표준.
- **Sticky Navigation** [navigation]: 스크롤 시 상단에 고정되는 내비게이션 바.
- **3-Column Feature Grid** [card-grid]: 3컬럼 기능 소개 그리드. 아이콘 + 제목 + 설명 구조.
- **Accessible Motion (reduced-motion)** [animation]: @media (prefers-reduced-motion: reduce) 분기로 모든 애니메이션 접근성 지원.
- **Floating Label Form** [form]: 입력 시 레이블이 위로 올라가는 floating label 패턴.
- **Typographic Scale System** [typography]: 12-72px 모듈러 스케일을 일관되게 적용한 타이포 시스템.
- **Data Table with Sort/Filter** [layout]: 정렬/필터 가능한 데이터 테이블. SaaS 대시보드 핵심 패턴.
- **Hero + CTA** [hero]: 전체 너비 히어로 섹션 + 중앙 CTA 버튼. 랜딩 페이지 필수 패턴.

### Anti-Patterns (Design)
- ⚠ **Form Without Error States**: 에러/성공 상태 없는 폼. 4-state 필수.
- ⚠ **Shadow Overuse**: 모든 요소에 과도한 drop-shadow. floating 요소만 shadow 허용.

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
- `layout`: Sidebar + Main Content, Data Table with Sort/Filter
- `navigation`: Sticky Navigation
- `card-grid`: 3-Column Feature Grid
- `animation`: Accessible Motion (reduced-motion)
- `form`: Floating Label Form

<!-- AURADKIT:DYNAMIC — volatile, changes per compilation -->
---

## Analysis Stats

| Axis | Score |
|------|-------|
| color | 5.8/10 |
| component | 6.1/10 |
| visualHierarchy | 6.6/10 |
| motion | 6.7/10 |
| typography | 7.4/10 |
| layout | 7.5/10 |
| spatialRhythm | 7.8/10 |

Drift: ✓ Low (20/100)
AI-Slop: ✓ Original (7/100)

> 427 sites · top refs: astro.build, astro.build, docs.github.com, remix.run, docs.anthropic.com, anthropic.com, supabase.com, beehiiv.com
> Truncated? Run `node trainer/dist/index.js compile` · refs: `references/`

*AuraDKit v5.3 · 2026-04-06 · P0+P1 Claude Code Insights*
<!-- integrity:sha256:manual-edit -->
<!-- /AURADKIT ACTIVE -->
