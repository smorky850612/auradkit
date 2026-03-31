이 프로젝트의 목적을 먼저 설명할게.



나는 AuraKit(클로드코드 풀스택 개발 스킬)의 제작자야.

이제 디자인 특화 스킬인 "AuraDKit"을 만들려고 해.



이 프로젝트에는 기존에 만들어둔 "Aura-Design v4.0" PRD와 CLAUDE.md가 있어.

하지만 방향이 완전히 바뀌었어.



기존 Aura-Design = 정적 디자인 토큰 시스템 (미리 정한 값 적용)

새로운 AuraDKit = 학습 기반 디자인 지능 엔진 (크롤링 학습 -> 동적 디자인 생성)



기존 PRD와 CLAUDE.md는 삭제하고,

이 프롬프트를 기반으로 새 PRD.md와 CLAUDE.md를 생성해줘.



단, 기존에서 다음 요소들은 반드시 흡수/계승해줘:



\[기존에서 살릴 것]

\- OKLCH 색상 시스템 + HEX 폴백 (design-tokens에 통합)

\- 4px spacing scale (spatial-rhythm 분석 기준으로 활용)

\- Write Guardrails 쓰기 금지 목록 (그대로 유지):

&#x20; package.json, package-lock.json, yarn.lock, pnpm-lock.yaml,

&#x20; .env, .env.\*, .git/\*, node\_modules/\*, LICENSE,

&#x20; tsconfig.json, tailwind.config.\*, postcss.config.\*,

&#x20; vite.config.\*, next.config.\*

\- Security 규칙 (Bash 미사용, 외부 fetch 금지, 동적 쉘 주입 금지)

\- WCAG AA 대비 쌍 + a11y 접근성 규칙

\- 토큰 예산 의식 (일반 540tok, 최대 1380tok 참고)

\- Motion Tiers (CSS-only / JS-enhanced / Library-opt-in)

\- Context compaction 앵커 코멘트 (상단/하단 이중 배치)

\- Tailwind v3/v4 호환 분기 주석

\- disable-model-invocation 활용

\- 컴포넌트 4상태 (default, loading, empty, error) 필수

\- CSS logical properties 사용 (RTL 대응)

\- output format 결정 로직 (--format > system.md > package.json 감지 > HTML)

\- Snyk ToxicSkills, Skill-Inject 등 보안 위협 인식



\[기존에서 버리는 것]

\- commands/ 4파일 분리 구조 -> /aurad 단일 엔트리로 통합

\- examples/ 디렉토리 -> 학습 데이터가 대체

\- 5개 고정 스타일 프리셋 -> 학습 기반 동적 스타일 생성으로 대체

\- "질문 없이 바로 좋은 UI" 콘셉트 -> "학습된 지식으로 역대급 UI"로 변경



이제 2단계로 진행할 거야.



\[1단계] 지금 만들 것: "디자인 학습 프로그램 (AuraDKit Design Trainer)"

\- 내가 직접 이 프로그램을 돌려서 수십 개 사이트를 분석

\- 방대한 디자인 지식을 로컬 knowledge-base 폴더에 축적

\- 이 학습은 내가 미리 쭉 해놓음



\[2단계] 나중에 할 것: 축적된 knowledge-base 기반으로 SKILL.md 생성

\- compile 명령으로 SKILL.md 자동 생성

\- 클로드코드가 스킬 실행 시 knowledge-base 지식 활용



중요:

\- knowledge-base/ 중 크롤링 데이터(analysis/, screenshots/, cache/)는

&#x20; 로컬 전용. git에 절대 올라가면 안 됨

\- compile 시 학습 데이터를 "증류"해서 가벼운 SKILL.md + references에 핵심만





========================================

\[프로젝트 아이덴티티] — 모든 코드에 이 정신을 반영

========================================



\[1] 어떤 스킬보다 빠르게!

\- 병렬 크롤링, 캐싱, 증분 학습

\- 모든 I/O 비동기 병렬. 대기 제로



\[2] 시니어 웹디자이너의 모든 역량!

\- 10년차 디자이너 모든 원칙을 데이터로

\- "왜 이렇게 하는지" 근거 포함



\[3] 멍때리지 않는다!

\- 에러 시 skip 후 다음 진행

\- 자동 재시도 3회 후 graceful skip

\- 절대 hang 없음



\[4] CLI에서 화려하다!

\- figlet + gradient-string 로고

\- 7축 실시간 바 차트

\- boxen 서머리, 예쁜 에러

\- chalk, ora, boxen, cli-table3, gradient-string, figlet, clack/prompts



\[5] 어떤 스킬보다 확실한 디자인!

\- 경쟁 스킬 비교 불가 깊이

\- 기존 Aura-Design의 토큰 시스템을 기반으로 하되

&#x20; 학습 데이터로 훨씬 더 정교하게



\[6] 조금씩 틀어지는 디자인까지 완벽하게 잡는다!

\- Design Drift Score로 미세 오류 수치화

\- 여백 불일치, 타이포 불규칙, 색상 대비 부족 등 감지



\[7] 역대급 디자인 스킬!

\- 학습 데이터 양, 분석 깊이, 출력 품질 최상위





========================================

\[데이터 흐름]

========================================



(내가 터미널에서 실행)

npx aurad-trainer learn --all

&#x20; -> \[크롤러] CSS 추출, DOM 분석, 스크린샷

&#x20; -> \[분석기] 7축 분석, 스코어링, Drift/Slop 감지

&#x20; -> \[저장] knowledge-base/ 에 .md + .json (로컬 전용)



(학습 충분히 한 후)

npx aurad-trainer compile

&#x20; -> \[컴파일러] knowledge-base 전체 분석, 핵심 증류

&#x20; -> \[출력] .claude/skills/aurad/ 에 SKILL.md + references/ 생성



(클로드코드가 스킬을 읽고 디자인에 활용)

/aurad 유저 대시보드 만들어줘





========================================

\[프로젝트 구조]

========================================



auraDkit/

&#x20; CLAUDE.md                            -- 새로 생성 (기존 삭제 후 교체)

&#x20; PRD.md                               -- 새로 생성 (기존 삭제 후 교체)

&#x20; .gitignore

&#x20; trainer/

&#x20;   package.json

&#x20;   tsconfig.json

&#x20;   src/

&#x20;     index.ts                        -- CLI 엔트리포인트

&#x20;     cli/

&#x20;       logo.ts                       -- 아스키아트 로고 + 그라데이션

&#x20;       theme.ts                      -- CLI 컬러 테마

&#x20;       progress.ts                   -- 7축 실시간 바 차트

&#x20;       summary.ts                    -- boxen 서머리

&#x20;       error-display.ts              -- 에러 표시

&#x20;     analyzer/

&#x20;       visual-hierarchy.ts

&#x20;       spatial-rhythm.ts

&#x20;       typography.ts

&#x20;       color.ts

&#x20;       motion.ts

&#x20;       component.ts

&#x20;       layout.ts

&#x20;       design-drift.ts               -- 디자인 틀어짐 감지

&#x20;       anti-ai-slop.ts                -- AI slop 감지

&#x20;     crawler/

&#x20;       site-crawler.ts                -- Playwright 병렬 크롤링

&#x20;       screenshot.ts

&#x20;       css-extractor.ts

&#x20;       dom-analyzer.ts

&#x20;       cache-manager.ts

&#x20;     knowledge/

&#x20;       principles.ts

&#x20;       pattern-detector.ts

&#x20;       insight-generator.ts

&#x20;       drift-catalog.ts

&#x20;     output/

&#x20;       markdown-writer.ts

&#x20;       json-writer.ts

&#x20;       skill-compiler.ts              -- 핵심: knowledge-base -> SKILL.md 증류

&#x20;     presets/

&#x20;       reference-sites.ts

&#x20; knowledge-base/                      -- \[로컬 전용! git 제외!]

&#x20;   index.json

&#x20;   principles/

&#x20;     visual-hierarchy.md

&#x20;     spatial-rhythm.md

&#x20;     typography-system.md

&#x20;     color-architecture.md

&#x20;     motion-language.md

&#x20;     component-personality.md

&#x20;     layout-architecture.md

&#x20;   patterns/

&#x20;     landing-page.md

&#x20;     saas-dashboard.md

&#x20;     admin-panel.md

&#x20;     ecommerce.md

&#x20;     portfolio.md

&#x20;     blog.md

&#x20;     pricing-page.md

&#x20;     onboarding-flow.md

&#x20;     settings-page.md

&#x20;     auth-page.md

&#x20;   drift-catalog/

&#x20;     spacing-drift.md

&#x20;     typography-drift.md

&#x20;     color-drift.md

&#x20;     component-drift.md

&#x20;     layout-drift.md

&#x20;     motion-drift.md

&#x20;   anti-ai-slop/

&#x20;     detection-rules.md

&#x20;     alternatives.md

&#x20;   analysis/                          -- 크롤링 결과 (git 제외)

&#x20;   screenshots/                       -- 스크린샷 (git 제외)

&#x20;   cache/                             -- 크롤링 캐시 (git 제외)

&#x20; README.md





========================================

\[.gitignore]

========================================



반드시 포함:



knowledge-base/analysis/

knowledge-base/screenshots/

knowledge-base/cache/

knowledge-base/index.json



git 포함 허용 (인간이 작성한 지식):

knowledge-base/principles/

knowledge-base/patterns/

knowledge-base/drift-catalog/

knowledge-base/anti-ai-slop/





========================================

\[기존 Aura-Design에서 계승하는 기술 사양]

========================================



\[색상 시스템]

OKLCH 기반, HEX 폴백 필수.

학습 데이터에서 추출한 색상도 OKLCH로 저장.

기존 토큰 구조 계승:

&#x20; --aura-primary, --aura-surface, --aura-text,

&#x20; --aura-border, --aura-error, --aura-success

단, 고정값이 아니라 학습 데이터에서 최적값을 동적 추출.



\[Spacing]

4px 기반 시스템 계승.

학습 데이터의 spacing 분석 시 4px 배수 준수 여부도 체크.



\[Write Guardrails]

절대 쓰기 금지:

package.json, package-lock.json, yarn.lock, pnpm-lock.yaml,

.env, .env.\*, .git/\*, node\_modules/\*, LICENSE,

tsconfig.json, tailwind.config.\*, postcss.config.\*,

vite.config.\*, next.config.\*

허용: src/, app/, pages/, components/ 하위.

불확실 시 사용자에게 확인.



\[Security]

\- Bash 도구 미사용

\- 외부 URL fetch/curl 금지

\- 사용자 데이터 외부 전송 금지

\- LICENSE 파일 생성/수정 금지

\- 동적 쉘 명령어 주입 구문 미사용

\- allowed-tools: Read, Glob, Grep, Write, Edit만



\[접근성]

\- 시맨틱 HTML (nav, main, section, article, aside)

\- ARIA 레이블 필수

\- 키보드 네비게이션 (tab order, focus-visible)

\- 사전 검증 색상 대비 쌍 사용

\- prefers-reduced-motion 존중

\- CSS logical properties (RTL 대응)

\- OKLCH 정확한 대비 계산 한계 고지 -> axe-core 최종 검증 권장



\[컴포넌트 상태]

모든 UI 컴포넌트는 반드시 4상태 포함:

default, loading, empty, error



\[Output Format 결정]

1\. --format 플래그 -> 해당 형식

2\. system.md 기본 형식 -> 해당 형식

3\. package.json 프레임워크 감지 -> 해당 컴포넌트

&#x20;  react/next -> .tsx

&#x20;  vue/nuxt -> .vue

&#x20;  svelte -> .svelte

&#x20;  astro -> .astro

4\. 감지 실패 -> 단일 HTML (Tailwind CDN)



\[Motion Tiers]

CSS-only: transition, @keyframes (호버, 페이드인)

JS-enhanced: IntersectionObserver, Web Animations API (스크롤 연동)

Library-opt-in: GSAP, Framer Motion (사용자 명시 시만)



\[Context 관리]

\- SKILL.md 500줄 이하

\- Context compaction 앵커 상단/하단 이중 배치

\- 20턴 이상 긴 세션 시 스킬 재로드 권장

\- /context로 토큰 사용량 모니터링



\[토큰 예산 참고]

일반 작업 540tok 이하 목표, 최대 1380tok.

compile 시 이 예산 안에 들어오도록 SKILL.md 최적화.



\[Tailwind 호환]

v3.4 기준 작성, v4 전환 시 분기 주석 포함.

design-tokens는 CSS custom properties 기반이라 버전 무관.



\[알려진 플랫폼 한계]

\- allowed-tools에 path-scope 없음 (소프트 가드레일로 대응)

\- description 2% context budget 공유 (150자 이내)

\- context compaction 시 스킬 소실 가능 (앵커로 대응)

\- 스킬 이중 로드 버그 (/context로 모니터링)





========================================

\[핵심 요구사항 1] 사전 내장 디자인 지식 — principles

========================================



7축을 시니어 10년 경력 수준으로 작성해서

knowledge-base/principles/ 에 저장.



(1) visual-hierarchy.md

(2) spatial-rhythm.md

(3) typography-system.md

(4) color-architecture.md — OKLCH 시스템 계승 포함

(5) motion-language.md — Motion Tiers 계승 포함

(6) component-personality.md — 4상태(default/loading/empty/error) 포함

(7) layout-architecture.md



각 300줄 이상, Tailwind CSS 예시, 근거 설명, 좋은/나쁜 대비.





========================================

\[핵심 요구사항 2] 페이지 유형별 패턴 — patterns

========================================



10가지 Awwwards급. 각 200줄 이상, Tailwind 예시,

\[AI가 흔히 하는 실수] 섹션 포함.



(1) landing-page.md

(2) saas-dashboard.md

(3) admin-panel.md

(4) ecommerce.md

(5) portfolio.md

(6) blog.md

(7) pricing-page.md

(8) onboarding-flow.md

(9) settings-page.md

(10) auth-page.md





========================================

\[핵심 요구사항 3] 디자인 틀어짐 카탈로그 — drift-catalog

========================================



6종. 감지 기준, 코드 예시, 교정 방법.



(1) spacing-drift.md

(2) typography-drift.md

(3) color-drift.md — OKLCH 대비 계산 한계 명시

(4) component-drift.md

(5) layout-drift.md

(6) motion-drift.md





========================================

\[핵심 요구사항 4] Anti-AI-Slop

========================================



(1) detection-rules.md — 감지 로직, 심각도, 빈도

(2) alternatives.md — 대체 디자인 + Tailwind 코드





========================================

\[핵심 요구사항 5] 크롤러 및 분석기

========================================



Playwright 병렬. 3개 동시. 캐시. 증분. 재시도 3회. 부분 분석 허용.

추출: CSS 전수, 스크린샷 3뷰포트, DOM 구조.

분석: 7축 병렬, 1-10점, Drift Score, Slop Score.

저장: analysis/사이트명.md + .json, screenshots/사이트명/, index.json.





========================================

\[핵심 요구사항 6] 레퍼런스 사이트 프리셋

========================================



SaaS/Tech, Creative/Agency, E-commerce, Product/Startup,

Dashboard, Admin 카테고리별 20+개 사이트.

각 사이트 메타데이터 포함.





========================================

\[핵심 요구사항 7] CLI — 화려하게

========================================



로고, 7축 바 차트, boxen 서머리, 에러 표시.

명령어: learn, status, compile, report, compare, drift-check, slop-check.





========================================

\[핵심 요구사항 8] compile 출력

========================================



출력 위치: .claude/skills/aurad/



SKILL.md (500줄 이하) + references/ (6개 파일) + design-tokens.json



SKILL.md YAML frontmatter:

&#x20; name: aurad-design

&#x20; description: (150자 이내, 기존 Aura-Design의 예산 기준 계승)



Context compaction 앵커:

&#x20; 상단: <!-- AURAD-DESIGN ACTIVE -->

&#x20; 하단: <!-- AURAD-DESIGN ACTIVE -->





========================================

\[핵심 요구사항 9] PRD.md 새로 생성

========================================



이 프롬프트의 전체 내용을 기반으로 PRD.md를 새로 작성해줘.

기존 Aura-Design v4.0 PRD의 구조(섹션 번호 체계)를 참고하되

내용은 완전히 AuraDKit 방향으로 교체.

버전은 v5.0으로.





========================================

\[핵심 요구사항 10] CLAUDE.md 새로 생성

========================================



기존 CLAUDE.md의 구조를 참고하되 내용은 AuraDKit 방향으로 교체.

반드시 포함:

\- Context compaction 앵커 (상단/하단 이중)

\- Write Guardrails (기존 그대로)

\- Security 규칙 (기존 그대로)

\- knowledge-base/ 중 analysis/screenshots/cache/는

&#x20; "절대 git에 커밋하지 마" 명시

\- "학습 데이터는 로컬 전용 자산" 명시

\- 200줄 이하 유지





========================================

\[최종 목표]

========================================



내가 미리 학습 돌려놓고, compile 한 번 치면,

클로드코드가 읽을 수 있는 완벽한 스킬 생성.



/aurad 유저 대시보드 만들어줘 한마디면:

\- Awwwards급 디자인

\- 시니어 디자이너 심혈 느낌

\- AI 티 안 남

\- 일관된 디자인 시스템

\- 반응형, 접근성, 다크모드 완벽

\- 미세 틀어짐 제로

\- 역대급 퀄리티



학습 데이터 양과 깊이에 절대 타협 없이.





========================================

\[실행 지시]

========================================



1\. 기존 CLAUDE.md 삭제 후 새로 생성

2\. 기존 PRD.md 삭제 후 새로 생성 (v5.0)

3\. .gitignore 업데이트

4\. trainer/ 전체 생성

5\. knowledge-base/ 전체 생성 (사전 내장 지식 포함)



먼저 전체 작업 계획을 세우고 내 확인을 받은 다음 실행해.

각 단계별 예상 파일 수와 코드량도 알려줘.



