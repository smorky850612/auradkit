# AuraDKit — Design Principles Reference

> Derived from 15 principles across 7 design axes.

## motion

### transform/opacity만 애니메이션
*Confidence: 93% | Threshold: 8.5/10*

GPU 합성 레이어(transform, opacity)만 애니메이션하면 60fps를 유지할 수 있다.

> ⚠ Anti-pattern: width/height/top/left 애니메이션은 레이아웃 재계산으로 janky.


### prefers-reduced-motion 반드시 존중
*Confidence: 53% | Threshold: 6.3/10*

모든 애니메이션에 prefers-reduced-motion 미디어 쿼리를 적용해야 한다.

> ⚠ Anti-pattern: 미적용 시 전정 장애 사용자에게 심각한 불편. WCAG 위반.


---

## component

### 컴포넌트 스타일 일관성 80%+
*Confidence: 93% | Threshold: 8.1/10*

버튼 border-radius, 카드 스타일이 80% 이상 일관되어야 한다.

> ⚠ Anti-pattern: 각 컴포넌트마다 다른 radius를 쓰면 시스템이 아닌 수집품처럼 보인다.


### 4상태 완전 구현 (default/loading/empty/error)
*Confidence: 3% | Threshold: 3.4/10*

모든 데이터 표시 컴포넌트는 4가지 상태를 모두 처리해야 한다.

> ⚠ Anti-pattern: loading/empty/error 미구현 시 실제 사용에서 빈 화면 또는 크래시.


---

## visual-hierarchy

### 단일 H1 + Hero + CTA 조합
*Confidence: 90% | Threshold: 7.3/10*

페이지당 H1 하나, Hero 섹션, CTA 버튼이 함께 있을 때 시선 집중도가 최대화된다.

> ⚠ Anti-pattern: H1이 2개 이상이면 SEO와 시각적 계층 모두 손상된다.


### H1:본문 크기 비율 2.5-4.5x
*Confidence: 54% | Threshold: 6.5/10*

헤딩이 본문의 2.5~4.5배 크기일 때 시각적 계층이 가장 명확하다.

> ⚠ Anti-pattern: 크기 차이가 1.5x 미만이면 계층이 모호해진다.


---

## typography

### 2폰트 페어링이 이상적
*Confidence: 89% | Threshold: 7.7/10*

폰트 패밀리 2개(헤딩+본문)가 가장 일관성 있고 개성 있는 조합이다.

> ⚠ Anti-pattern: 4종 이상: 혼란. 단일: 무난하나 개성 없음.


### 모듈러 스케일 80%+ 준수
*Confidence: 87% | Threshold: 7.2/10*

[12,14,16,18,20,24,30,36,48,60,72]px 표준값 80% 이상 사용 시 스케일 시스템이 인식된다.

> ⚠ Anti-pattern: 임의 크기(15px, 17px, 22px)의 혼용은 스케일 인식을 깨뜨린다.


### 본문 행간 1.4-1.75 황금 범위
*Confidence: 82% | Threshold: 8.3/10*

행간이 1.4-1.75 사이일 때 가독성과 시각적 리듬이 최적화된다.

> ⚠ Anti-pattern: 행간 < 1.2: 텍스트 뭉침. 행간 > 2.0: 분절감.


---

## layout

### 최소 3개 미디어 쿼리 브레이크포인트
*Confidence: 75% | Threshold: 6.7/10*

모바일/태블릿/데스크톱 3단계 이상의 반응형 구조가 필요하다.

> ⚠ Anti-pattern: 브레이크포인트 없음: 모바일에서 레이아웃 붕괴.


### header/nav/main/footer 시맨틱 구조
*Confidence: 67% | Threshold: 7.6/10*

4가지 랜드마크(header, nav, main, footer)가 있으면 접근성과 SEO가 향상된다.

> ⚠ Anti-pattern: 모두 div로만 구성 시 스크린리더 탐색 불가.


---

## color

### WCAG AA 대비율 90%+ 통과
*Confidence: 66% | Threshold: 7.3/10*

텍스트-배경 색상 쌍의 90% 이상이 4.5:1 이상 대비율을 유지해야 한다.

> ⚠ Anti-pattern: muted 텍스트를 작은 크기에 사용하면 AA 미달 가능.


### CSS 커스텀 프로퍼티 2종 이상
*Confidence: 60% | Threshold: 6.8/10*

색상을 CSS 변수(--color-primary 등)로 관리하면 테마 변경이 용이하다.

> ⚠ Anti-pattern: 하드코딩 색상값 사용 시 다크모드, 브랜드 변경 대응 불가.


---

## spatial-rhythm

### 평균 간격 12-32px 범위
*Confidence: 65% | Threshold: 7.6/10*

평균 간격이 12-32px 범위일 때 밀도 균형이 적절하다.

> ⚠ Anti-pattern: 평균 < 8px: 답답함. 평균 > 48px: 내용 부족으로 보임.


### 4px 배수 간격 시스템 80%+ 준수
*Confidence: 63% | Threshold: 7/10*

모든 margin/padding/gap이 4px 배수일 때 공간 리듬이 형성된다. 80% 이상 준수가 목표.

> ⚠ Anti-pattern: 임의적 간격(3px, 7px, 11px)이 많으면 디자인이 어수선해 보인다.

