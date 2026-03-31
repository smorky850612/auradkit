# AuraDKit — 학습 기반 디자인 지능 엔진

> 수십 개의 Awwwards급 사이트를 학습하고, 한 줄 명령으로 역대급 UI를 생성합니다.

## 개요

AuraDKit은 두 단계로 작동합니다:

**1단계 — 학습 (Design Trainer)**
```bash
cd trainer && npm install
npx auradkit-trainer learn --all      # 레퍼런스 사이트 전체 분석
npx auradkit-trainer status           # 학습 현황 확인
npx auradkit-trainer compile          # SKILL.md 생성
```

**2단계 — 생성 (Claude Code Skill)**
```bash
/auradkit 유저 대시보드 만들어줘      # Awwwards급 UI 즉시 생성
/auradkit --format=tsx 로그인 페이지
/auradkit --style=dark-luxury 가격 페이지
```

## 프로젝트 구조

```
AuraDkit/
├── CLAUDE.md                    프로젝트 규칙
├── PRD.md                       제품 요구사항 명세
├── trainer/                     디자인 학습 CLI
│   ├── package.json
│   └── src/
│       ├── index.ts             CLI 엔트리포인트
│       ├── cli/                 화려한 CLI UI
│       ├── analyzer/            7축 디자인 분석
│       ├── crawler/             Playwright 병렬 크롤러
│       ├── knowledge/           지식 처리 모듈
│       ├── output/              SKILL.md 컴파일러
│       └── presets/             레퍼런스 사이트 20+
├── knowledge-base/              디자인 지식 베이스
│   ├── principles/              7축 디자인 원칙 (git 포함)
│   ├── patterns/                10종 페이지 패턴 (git 포함)
│   ├── drift-catalog/           틀어짐 감지 카탈로그 (git 포함)
│   ├── anti-ai-slop/            AI slop 감지 (git 포함)
│   ├── analysis/                ⚠️ 로컬 전용 (git 제외)
│   ├── screenshots/             ⚠️ 로컬 전용 (git 제외)
│   └── cache/                   ⚠️ 로컬 전용 (git 제외)
└── .claude/
    └── skills/
        └── auradkit/            compile 출력 (SKILL.md)
```

## 설치

```bash
# 트레이너 의존성 설치
cd trainer && npm install

# Playwright 브라우저 설치 (크롤러 필요)
npx playwright install chromium
```

## 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `npx auradkit-trainer learn` | 특정 사이트 학습 |
| `npx auradkit-trainer learn --all` | 전체 레퍼런스 사이트 학습 |
| `npx auradkit-trainer learn --category=saas` | 카테고리별 학습 |
| `npx auradkit-trainer status` | 학습 현황 대시보드 |
| `npx auradkit-trainer compile` | SKILL.md 생성 |
| `npx auradkit-trainer report` | 분석 리포트 |
| `npx auradkit-trainer drift-check [url]` | 디자인 틀어짐 감지 |
| `npx auradkit-trainer slop-check [url]` | AI slop 감지 |
| `npx auradkit-trainer compare [url1] [url2]` | 사이트 비교 |

## 7축 분석 엔진

| 축 | 설명 |
|----|------|
| Visual Hierarchy | 시각적 계층 구조 |
| Spatial Rhythm | 4px 배수 간격 시스템 |
| Typography | 폰트 스케일, 행간, 자간 |
| Color | OKLCH 색상 시스템, 대비 |
| Motion | CSS/JS/Library 모션 티어 |
| Component Personality | 4상태, 인터랙션 품질 |
| Layout Architecture | 그리드, 반응형, 구조 |

## 보안 주의사항

- `knowledge-base/analysis/`, `screenshots/`, `cache/`는 절대 git 커밋 금지
- 이 데이터는 로컬 전용 자산입니다
- `.gitignore`에 등록되어 있으나 추가로 주의해 주세요

---

*AuraDKit — Powered by AuraKit · Awwwards-level design intelligence*
