<!-- AURADKIT ACTIVE -->
# AuraDKit Design Intelligence v5.1
<!-- AURADKIT:STATIC — cache-stable content below -->

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
/* Essential --aurad-* tokens (always use these, never hardcode) */
--aurad-space-[1|2|3|4|6|8|12|16|24]: 0.25→6rem   /* 4px grid */
--aurad-text-[xs|sm|base|lg|xl|2xl|3xl|4xl]: .75→2.25rem
--aurad-primary: oklch(0.55 0.15 250);  /* #3b82f6 */
--aurad-text:    oklch(0.25 0.02 250);  /* #1e293b */
--aurad-surface: oklch(0.98 0.005 250); /* #f8fafc */
--aurad-border:  oklch(0.85 0.01 250);  /* #cbd5e1 */
--aurad-error:   oklch(0.55 0.20 25);   /* #ef4444 */
--aurad-success: oklch(0.60 0.15 150);  /* #22c55e */
--aurad-radius-[sm|md|lg|xl|full]: 4|8|12|16|9999px
--aurad-duration-[fast|normal|slow]: 150|250|400ms
--aurad-ease-default: cubic-bezier(0.4, 0, 0.2, 1);
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:.01ms!important; transition-duration:.01ms!important } }
```

**Dark mode**: Swap L channel ±0.65, keep C/H. oklch(0.25→0.90) for bg, oklch(0.90→0.15) for text.

---

## WCAG AA Pairs
| Foreground | Background | Ratio |
|-----------|-----------|-------|
| `--aurad-text` | `--aurad-surface` | 7.2:1 AAA |
| `--aurad-text-inverse` | `--aurad-primary` | 4.8:1 AA |
| `--aurad-primary` | `--aurad-surface` | 4.6:1 AA |
| `--aurad-error` | `--aurad-surface` | 4.5:1 AA |

---

## Critical Rules (from 261 sites)

- [CRITICAL] **prefers-reduced-motion 미적용**: 전역 CSS에 prefers-reduced-motion 블록을 추가하라.
- [CRITICAL] **하드코딩된 색상값 (HEX/RGB 직접 사용)**: 모든 하드코딩 색상을 CSS 변수로 교체하라. 다크모드, 브랜드 변경 대응 불가능.
- [HIGH] **임의 픽셀 간격 사용**: 모든 margin/padding/gap을 4px 배수 토큰으로 교체하라.
- [HIGH] **Layout 속성 애니메이션 (성능 문제)**: transform: translateX/Y, scale과 opacity만 애니메이션하라. GPU 합성 레이어 활용.
- [HIGH] **고유 색상값 과다 (30종 이상)**: semantic color 토큰 10개 이하로 팔레트를 정리하고 CSS 변수로 참조하라.
- [HIGH] **폰트 크기 과다 (8종 이상)**: 모듈러 스케일 6단계 이하로 제한하고 CSS 변수로 관리하라.
- [CRITICAL] **80개 사이트에서 WCAG AA 미달 색상 감지**: 사전 검증된 색상 쌍만 사용하라: --aurad-text on --aurad-surface = 7.2:1 (AAA).
- [HIGH] **125개 사이트에서 prefers-reduced-motion 미지원**: 모든 애니메이션에 prefers-reduced-motion: reduce 분기를 추가하라.

Full catalog → `references/drift-patterns.md`

---

## Design Principles

- **transform/opacity만 애니메이션** (93%): GPU 합성 레이어(transform, opacity)만 애니메이션하면 60fps를 유지할 수 있다.
- **컴포넌트 스타일 일관성 80%+** (93%): 버튼 border-radius, 카드 스타일이 80% 이상 일관되어야 한다.
- **단일 H1 + Hero + CTA 조합** (90%): 페이지당 H1 하나, Hero 섹션, CTA 버튼이 함께 있을 때 시선 집중도가 최대화된다.
- **2폰트 페어링이 이상적** (89%): 폰트 패밀리 2개(헤딩+본문)가 가장 일관성 있고 개성 있는 조합이다.
- **모듈러 스케일 80%+ 준수** (87%): [12,14,16,18,20,24,30,36,48,60,72]px 표준값 80% 이상 사용 시 스케일 시스템이 인식된다.

All principles → `references/principles.md`

---

## Patterns

- **Sidebar + Main Content** [layout]: 좌측 고정 사이드바 + 우측 메인 콘텐츠 레이아웃. SaaS 대시보드 표준.
- **3-Column Feature Grid** [card-grid]: 3컬럼 기능 소개 그리드. 아이콘 + 제목 + 설명 구조.
- **Sticky Navigation** [navigation]: 스크롤 시 상단에 고정되는 내비게이션 바.
- **Typographic Scale System** [typography]: 12-72px 모듈러 스케일을 일관되게 적용한 타이포 시스템.
- **Card Shadow Hover** [card-grid]: 마우스 오버 시 shadow + translateY(-2px) 효과 카드.
- **Hero + CTA** [hero]: 전체 너비 히어로 섹션 + 중앙 CTA 버튼. 랜딩 페이지 필수 패턴.

### Anti-Patterns
- ⚠ **Shadow Overuse**: 모든 요소에 과도한 drop-shadow 적용. 시각적 무게감 과부하.
- ⚠ **Purple-Blue Gradient Hero**: 보라-파랑 그라데이션 히어로 배경. AI 생성 UI의 대표적 클리셰.

### Category Hints (load on-demand)
- `layout`: Sidebar + Main Content
- `card-grid`: 3-Column Feature Grid, Card Shadow Hover
- `navigation`: Sticky Navigation
- `typography`: Typographic Scale System
- `hero`: Hero + CTA

<!-- AURADKIT:DYNAMIC — volatile, changes per compilation -->
---

## Analysis Stats

| Axis | Score | | | Drift | AI-Slop |
|------|-------|-|-|-------|---------|
| color | 6.4/10 | | | ◦ Moderate (22/100) | ✓ Original (7/100)
| visualHierarchy | 6.5/10 | | |
| component | 6.7/10 | | |
| motion | 6.9/10 | | |
| layout | 7.6/10 | | |
| spatialRhythm | 7.7/10 | | |
| typography | 7.8/10 | | |

> 261 sites · top refs: astro.build, astro.build, docs.github.com, docs.github.com, docs.anthropic.com, docs.anthropic.com, anthropic.com, anthropic.com
> Truncated? Run `node trainer/dist/index.js compile` · refs: `references/`

*AuraDKit v5.1 · 2026-04-01*
<!-- /AURADKIT ACTIVE -->
