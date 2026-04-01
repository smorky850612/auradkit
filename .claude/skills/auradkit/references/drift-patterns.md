# AuraDKit — Drift Patterns Catalog

> Detected patterns from crawled sites. Use these rules when reviewing generated UI.

- [Spacing Drift](#spacing-drift)
- [Typography Drift](#typography-drift)
- [Color Drift](#color-drift)
- [Radius Drift](#radius-drift)
- [Shadow Drift](#shadow-drift)
- [Motion Drift](#motion-drift)

---

spacingtypographycolorradiusshadowmotion

## Spacing Drift

### [HIGH] 임의 픽셀 간격 사용
*Occurrences: 45 | Detection: 4px 배수 준수율 < 70%*

3px, 7px, 11px, 13px 등 4px 배수가 아닌 임의 간격값이 산재해 있다.

**Fix**: 모든 margin/padding/gap을 4px 배수 토큰으로 교체하라.

```css
/* ❌ 드리프트 */
margin-top: 13px;
padding: 7px 11px;

/* ✅ 수정 */
margin-top: var(--aurad-space-3);  /* 12px */
padding: var(--aurad-space-2) var(--aurad-space-3);  /* 8px 12px */
```


### [MEDIUM] 간격 토큰 과다 (10종 이상)
*Occurrences: 2 | Detection: 고유 간격값 > 12종*

10가지 이상의 서로 다른 간격값이 사용되어 일관성이 없다.

**Fix**: 간격 스케일을 8개 이하로 정리하고 CSS 변수로 통일하라.

```css
/* 권장 간격 스케일 (9개) */
--aurad-space-1: 0.25rem;  /*  4px */
--aurad-space-2: 0.5rem;   /*  8px */
--aurad-space-3: 0.75rem;  /* 12px */
--aurad-space-4: 1rem;     /* 16px */
--aurad-space-6: 1.5rem;   /* 24px */
--aurad-space-8: 2rem;     /* 32px */
--aurad-space-12: 3rem;    /* 48px */
--aurad-space-16: 4rem;    /* 64px */
--aurad-space-24: 6rem;    /* 96px */
```


---

## Typography Drift

### [HIGH] 폰트 크기 과다 (8종 이상)
*Occurrences: 2 | Detection: 고유 폰트 크기 > 8종*

8가지 이상의 폰트 크기가 사용되어 시각적 위계가 무너진다.

**Fix**: 모듈러 스케일 6단계 이하로 제한하고 CSS 변수로 관리하라.

```css
/* 권장 폰트 크기 스케일 (6단계) */
--aurad-text-xs:   0.75rem;   /* 12px */
--aurad-text-sm:   0.875rem;  /* 14px */
--aurad-text-base: 1rem;      /* 16px */
--aurad-text-lg:   1.125rem;  /* 18px */
--aurad-text-xl:   1.25rem;   /* 20px */
--aurad-text-2xl:  1.5rem;    /* 24px */
```


### [MEDIUM] 비표준 폰트 크기 사용
*Occurrences: 2 | Detection: 모듈러 스케일 준수율 < 60%*

15px, 17px, 22px 등 표준 모듈러 스케일에 없는 크기가 사용된다.

**Fix**: [12,14,16,18,20,24,30,36,48]px 표준값 중 가장 가까운 값으로 교체하라.



---

## Color Drift

### [CRITICAL] 하드코딩된 색상값 (HEX/RGB 직접 사용)
*Occurrences: 8 | Detection: 인라인 스타일 또는 클래스에 HEX/RGB 리터럴 존재*

#3b82f6, rgb(59, 130, 246) 등의 리터럴 값이 코드에 직접 사용된다.

**Fix**: 모든 하드코딩 색상을 CSS 변수로 교체하라. 다크모드, 브랜드 변경 대응 불가능.

```css
/* ❌ 드리프트 */
color: #1e293b;
background: rgb(248, 250, 252);

/* ✅ 수정 */
color: var(--aurad-text);
background: var(--aurad-surface);
```


### [HIGH] 고유 색상값 과다 (30종 이상)
*Occurrences: 8 | Detection: 렌더링된 고유 색상 > 30종*

30가지 이상의 서로 다른 색상값이 사용되어 색상 시스템이 없는 것과 같다.

**Fix**: semantic color 토큰 10개 이하로 팔레트를 정리하고 CSS 변수로 참조하라.

```css
/* 권장 색상 팔레트 구조 */
--aurad-primary:    oklch(0.55 0.15 250);  /* #3b82f6 */
--aurad-text:       oklch(0.25 0.02 250);  /* #1e293b */
--aurad-surface:    oklch(0.98 0.005 250); /* #f8fafc */
--aurad-border:     oklch(0.85 0.01 250);  /* #cbd5e1 */
--aurad-error:      oklch(0.55 0.20 25);   /* #ef4444 */
--aurad-success:    oklch(0.60 0.15 150);  /* #22c55e */
```


---

## Radius Drift

### [MEDIUM] Border-radius 불일치
*Occurrences: 97 | Detection: 고유 border-radius > 5종 (0 제외)*

버튼, 카드, 입력 등 각 요소가 서로 다른 border-radius를 사용한다.

**Fix**: radius 토큰 3-4개로 정의하고 일관되게 적용하라.

```css
--aurad-radius-sm: 4px;
--aurad-radius-md: 8px;   /* 기본 — 버튼, 입력 */
--aurad-radius-lg: 12px;  /* 카드 */
--aurad-radius-full: 9999px;  /* pill 버튼 */
```


---

## Shadow Drift

### [MEDIUM] 그림자 과용
*Occurrences: 82 | Detection: 그림자 적용 요소 > 총 요소의 15%*

20개 이상의 요소에 box-shadow가 적용되어 시각적 무게감이 과도하다.

**Fix**: 그림자는 카드, 모달, 드롭다운 등 floating 요소에만 제한적으로 사용하라.



---

## Motion Drift

### [CRITICAL] prefers-reduced-motion 미적용
*Occurrences: 125 | Detection: CSS에 prefers-reduced-motion 규칙 없음*

모든 애니메이션에 접근성 미디어 쿼리가 없다. WCAG 2.1 AA 위반 가능.

**Fix**: 전역 CSS에 prefers-reduced-motion 블록을 추가하라.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```


### [HIGH] Layout 속성 애니메이션 (성능 문제)
*Occurrences: 18 | Detection: transition에 width/height/top/left 포함*

width, height, top, left 등 레이아웃을 재계산하는 속성이 애니메이션된다.

**Fix**: transform: translateX/Y, scale과 opacity만 애니메이션하라. GPU 합성 레이어 활용.

```css
/* ❌ 성능 드리프트 */
transition: width 0.3s, height 0.3s;

/* ✅ GPU 가속 */
transition: transform 0.3s, opacity 0.3s;
```

