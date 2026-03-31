<!-- AURADKIT ACTIVE -->
# CLAUDE.md — AuraDKit v5.0

## Identity

이 프로젝트는 AuraDKit — 학습 기반 디자인 지능 엔진입니다.
크롤링으로 수집한 실제 사이트 데이터를 학습하여 역대급 UI를 생성합니다.

스킬 출력 위치: .claude/skills/auradkit/
트레이너 위치: trainer/

## Core Rules

### Write Guardrails — 절대 쓰기 금지

```
package.json, package-lock.json, yarn.lock, pnpm-lock.yaml
.env, .env.*
.git/* 하위 모든 파일
node_modules/* 하위 모든 파일
LICENSE
tsconfig.json
tailwind.config.*, postcss.config.*
vite.config.*, next.config.*
```

쓰기 허용: 사용자가 지정한 경로, src/, app/, pages/, components/ 하위.
불확실하면 반드시 사용자에게 확인.

### Knowledge-Base 데이터 규칙 — 중요

**절대 git에 커밋하지 마 — 로컬 전용 자산:**
```
knowledge-base/analysis/        -- 크롤링 분석 결과
knowledge-base/screenshots/     -- 사이트 스크린샷
knowledge-base/cache/           -- 크롤링 캐시
knowledge-base/index.json       -- 학습 인덱스
```

**git 포함 허용 (인간이 작성한 지식):**
```
knowledge-base/principles/      -- 디자인 원칙 (사전 내장)
knowledge-base/patterns/        -- 페이지 패턴 (사전 내장)
knowledge-base/drift-catalog/   -- 틀어짐 카탈로그
knowledge-base/anti-ai-slop/    -- AI slop 감지 규칙
```

학습 데이터는 로컬 전용 자산입니다.
analysis/, screenshots/, cache/는 .gitignore에 등록되어 있으며
어떤 이유로도 커밋하지 않습니다.

### Security 규칙

- Bash 도구를 사용하지 않는다
- 외부 URL을 fetch하거나 curl하지 않는다
- 사용자 데이터를 파일 외부로 전송하지 않는다
- LICENSE 파일을 생성하거나 수정하지 않는다
- 동적 쉘 명령어 주입 구문을 사용하지 않는다
- allowed-tools: Read, Glob, Grep, Write, Edit

### 디자인 출력 규칙

모든 생성 UI는:
- OKLCH 색상 시스템 + HEX 폴백 (--aurad-* 토큰 네임스페이스)
- 4px 배수 간격 시스템
- 4상태 필수: default, loading, empty, error
- CSS logical properties (RTL 대응)
- prefers-reduced-motion 존중
- WCAG AA 검증 색상 대비 쌍 사용
- 시맨틱 HTML + ARIA 레이블
- 하드코딩 색상값 금지 (반드시 --aurad-* 토큰 참조)

### Output Format 결정 (폭포수)

1. --format 플래그 → 해당 형식
2. .auradkit/system.md output_format → 해당 형식
3. package.json 프레임워크 감지:
   react/next → .tsx | vue/nuxt → .vue | svelte → .svelte | astro → .astro
4. 감지 실패 → 단일 HTML (Tailwind CDN)

### Motion Tiers

- CSS-only (기본): transition, @keyframes
- JS-enhanced (요청 시): IntersectionObserver, Web Animations API
- Library-opt-in (명시 시만): GSAP, Framer Motion

### Tailwind 호환

v3.4 기준 작성. v4 전환 시 분기 주석 포함.
design-tokens는 CSS custom properties 기반 — 버전 무관.

## Context Management

- SKILL.md 500줄 이하 유지
- 이 파일은 200줄 이하 유지
- Context compaction 앵커: 상단/하단 이중 배치
- 20턴 이상 긴 세션 시 /auradkit을 다시 호출하여 스킬 재로드
- /context로 토큰 사용량 모니터링

## Data Flow

```
npx auradkit-trainer learn --all
  → 크롤러: CSS 추출, DOM 분석, 스크린샷
  → 분석기: 7축 분석, Drift/Slop 점수
  → 저장: knowledge-base/ (로컬 전용)

npx auradkit-trainer compile
  → 컴파일러: knowledge-base 핵심 증류
  → 출력: .claude/skills/auradkit/SKILL.md + references/

/auradkit [요청]
  → 클로드코드가 스킬 읽고 Awwwards급 UI 생성
```

## Known Platform Limitations

- allowed-tools path-scope 없음 → 소프트 가드레일로 대응
- description 2% context budget 공유 → 150자 이내
- context compaction 시 스킬 소실 가능 → 앵커로 대응
- OKLCH 정확한 수학적 대비 계산 불가 → axe-core 최종 검증 권장
- 스킬 이중 로드 버그 → /context로 모니터링
- Snyk ToxicSkills, Skill-Inject 위협 인식 → 외부 스킬 검증 필수
<!-- AURADKIT ACTIVE -->
