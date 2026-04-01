/* ═══════════════════════════════════════════════════════════════
   AuraDKit — app.js
   Three.js 3D scene · i18n (8 langs) · UI interactions
   ═══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════
   1. i18n
   ══════════════════════════════════════════════════════════════ */
const T = {
  en: {
    nav_features:'Features', nav_showcase:'Showcase', nav_how:'How it works', nav_cta:'Install',
    hero_badge:'Claude Code Skill',
    hero_h1:'Design intelligence<br/><em class="grad">for Claude Code</em>',
    hero_p:'AuraDKit generates pixel-perfect, accessible, production-ready UI — in your framework, with your tokens, in seconds.',
    hero_cta:'Install the Skill', hero_cta2:'See Components',
    proof_sites:'Sites analyzed', proof_axes:'Design axes', proof_wcag:'WCAG validated',
    trust_sites:'Sites analyzed', trust_axes:'Design axes', trust_wcag:'WCAG validated', trust_fw:'Frameworks', trust_states:'Component states',
    feat_label:'What makes it different', feat_h2:'Not templates. Intelligence.',
    feat_sub:'AuraDKit doesn\'t assemble patterns. It understands why great design works — and applies that understanding to every component it generates.',
    feat1_h:'Design Knowledge, Not Rules', feat1_p:'Generates UI that understands visual hierarchy, spacing rhythm, and color harmony — not just code that looks right.',
    feat2_h:'Framework Native', feat2_p:'Detects React, Vue, Svelte, Astro, Next.js, Nuxt automatically. Outputs idiomatic code for each. No config. No flags.',
    feat3_h:'Accessibility Built In', feat3_p:'Every component ships with semantic HTML, ARIA labels, keyboard navigation, and WCAG AA validated color contrast.',
    feat4_h:'4-State Complete', feat4_p:'Default, loading, empty, error — every component is production-complete from day one, not a demo shell.',
    show_label:'Component Output', show_h2:'What you receive', show_sub:'Production-ready components with a complete design token system. Every time.',
    tab_btn:'Buttons', tab_card:'Cards', tab_form:'Forms',
    d_getstart:'Get started', d_learn:'Learn more', d_docs:'View docs', d_loading:'Loading', d_disabled:'Disabled', d_delete:'Delete', d_confirm:'Confirm', d_small:'Small', d_learnmore:'Learn more →',
    dc1_h:'Lightning Fast', dc1_p:'Optimized performance with intelligent lazy loading and cache management.',
    dc2_h:'Secure by Default', dc2_p:'Enterprise-grade security with zero configuration required.',
    dc3_h:'Integrations', dc3_p:'Works with your existing stack. APIs, webhooks, and SDKs included.',
    df_email:'Email address', df_pass:'Password', df_pass_err:'Password must be at least 8 characters',
    df_role:'Role', df_dev:'Developer', df_des:'Designer', df_mgr:'Manager', df_signin:'Sign in',
    how_label:'Usage', how_h2:'Three steps to S-Grade UI',
    how1_h:'Install', how1_p:'Installs AuraDKit into your Claude Code environment. One command, done in seconds.',
    how2_h:'Request', how2_p:'Describe the UI you need. Your framework is auto-detected. Any component, any complexity.',
    how3_h:'Ship', how3_p:'Receive production-ready code — responsive, accessible, token-driven, with all four states.',
    fw_label:'Works with your stack',
    cta_h2:'Add to Claude Code', cta_p:'Install AuraDKit and generate your first S-Grade component in under 60 seconds.',
    cta_copy:'Copy', cta_meta:'Node 18+ · Claude Code required · Local data only',
    footer_desc:'Design Intelligence Engine · v5.0.1', footer_docs:'Docs',
  },
  ko: {
    nav_features:'기능', nav_showcase:'쇼케이스', nav_how:'사용 방법', nav_cta:'설치',
    hero_badge:'Claude Code 스킬',
    hero_h1:'<em class="grad">Claude Code</em>를 위한<br/>디자인 인텔리전스',
    hero_p:'AuraDKit은 픽셀 퍼펙트하고 접근성을 갖춘 프로덕션 수준의 UI를 — 당신의 프레임워크로, 당신의 토큰으로, 몇 초 만에 생성합니다.',
    hero_cta:'스킬 설치하기', hero_cta2:'컴포넌트 보기',
    proof_sites:'사이트 분석', proof_axes:'디자인 축', proof_wcag:'WCAG 검증',
    trust_sites:'사이트 분석', trust_axes:'디자인 축', trust_wcag:'WCAG 검증', trust_fw:'프레임워크', trust_states:'컴포넌트 상태',
    feat_label:'차별점', feat_h2:'템플릿이 아닙니다. 지능입니다.',
    feat_sub:'AuraDKit은 패턴을 조합하지 않습니다. 훌륭한 디자인이 왜 작동하는지 이해하고 — 그 이해를 모든 컴포넌트에 적용합니다.',
    feat1_h:'규칙이 아닌 디자인 지식', feat1_p:'시각적 위계, 간격 리듬, 색상 조화를 이해하는 UI를 생성합니다 — 단순히 보기 좋은 코드가 아닙니다.',
    feat2_h:'프레임워크 네이티브', feat2_p:'React, Vue, Svelte, Astro, Next.js, Nuxt를 자동 감지합니다. 각각에 맞는 관용적 코드를 출력합니다. 설정 없음.',
    feat3_h:'접근성 기본 내장', feat3_p:'모든 컴포넌트는 시맨틱 HTML, ARIA 레이블, 키보드 내비게이션, WCAG AA 검증 색상 대비를 포함합니다.',
    feat4_h:'4상태 완성', feat4_p:'default, loading, empty, error — 모든 컴포넌트는 데모 껍데기가 아닌 프로덕션 완성품입니다.',
    show_label:'컴포넌트 출력', show_h2:'받게 되는 것', show_sub:'완전한 디자인 토큰 시스템을 갖춘 프로덕션 준비 컴포넌트. 매번.',
    tab_btn:'버튼', tab_card:'카드', tab_form:'폼',
    d_getstart:'시작하기', d_learn:'더 알아보기', d_docs:'문서 보기', d_loading:'로딩 중', d_disabled:'비활성', d_delete:'삭제', d_confirm:'확인', d_small:'작게', d_learnmore:'더 알아보기 →',
    dc1_h:'번개처럼 빠름', dc1_p:'지능형 지연 로딩과 캐시 관리로 최적화된 성능.',
    dc2_h:'기본 보안', dc2_p:'설정 없이도 엔터프라이즈급 보안.',
    dc3_h:'통합', dc3_p:'기존 스택과 함께 작동합니다. API, 웹훅, SDK 포함.',
    df_email:'이메일 주소', df_pass:'비밀번호', df_pass_err:'비밀번호는 최소 8자 이상이어야 합니다',
    df_role:'역할', df_dev:'개발자', df_des:'디자이너', df_mgr:'매니저', df_signin:'로그인',
    how_label:'사용법', how_h2:'S등급 UI까지 3단계',
    how1_h:'설치', how1_p:'Claude Code 환경에 AuraDKit을 설치합니다. 명령 하나로 몇 초면 완료.',
    how2_h:'요청', how2_p:'필요한 UI를 설명하세요. 프레임워크는 자동 감지됩니다. 어떤 컴포넌트든, 어떤 복잡도든.',
    how3_h:'배포', how3_p:'프로덕션 준비 코드를 받으세요 — 반응형, 접근성, 토큰 기반, 4가지 상태 모두 포함.',
    fw_label:'당신의 스택과 함께',
    cta_h2:'Claude Code에 추가하기', cta_p:'AuraDKit을 설치하고 60초 내에 첫 S등급 컴포넌트를 생성하세요.',
    cta_copy:'복사', cta_meta:'Node 18+ · Claude Code 필요 · 로컬 데이터만',
    footer_desc:'디자인 인텔리전스 엔진 · v5.0.1', footer_docs:'문서',
  },
  ja: {
    nav_features:'機能', nav_showcase:'ショーケース', nav_how:'使い方', nav_cta:'インストール',
    hero_badge:'Claude Code スキル',
    hero_h1:'<em class="grad">Claude Code</em> のための<br/>デザインインテリジェンス',
    hero_p:'AuraDKitは、ピクセルパーフェクトでアクセシブルなプロダクションUIを — あなたのフレームワークで、あなたのトークンで、数秒で生成します。',
    hero_cta:'スキルをインストール', hero_cta2:'コンポーネントを見る',
    proof_sites:'サイト分析', proof_axes:'デザイン軸', proof_wcag:'WCAG検証',
    trust_sites:'サイト分析', trust_axes:'デザイン軸', trust_wcag:'WCAG検証', trust_fw:'フレームワーク', trust_states:'コンポーネント状態',
    feat_label:'違いは何か', feat_h2:'テンプレートではなく。インテリジェンスです。',
    feat_sub:'AuraDKitはパターンを組み合わせません。優れたデザインがなぜ機能するかを理解し — その理解をすべてのコンポーネントに適用します。',
    feat1_h:'ルールではなくデザイン知識', feat1_p:'視覚的階層、スペーシングリズム、カラーハーモニーを理解するUIを生成します。',
    feat2_h:'フレームワークネイティブ', feat2_p:'React、Vue、Svelte、Astro、Next.js、Nuxtを自動検出。各フレームワーク固有のコードを出力。',
    feat3_h:'アクセシビリティ標準搭載', feat3_p:'すべてのコンポーネントにセマンティックHTML、ARIAラベル、キーボードナビゲーション、WCAG AA検証済みカラーコントラストを搭載。',
    feat4_h:'4状態完全対応', feat4_p:'default、loading、empty、error — すべてのコンポーネントはデモシェルではなくプロダクション完成品。',
    show_label:'コンポーネント出力', show_h2:'受け取るもの', show_sub:'完全なデザイントークンシステムを持つプロダクション対応コンポーネント。毎回。',
    tab_btn:'ボタン', tab_card:'カード', tab_form:'フォーム',
    d_getstart:'始める', d_learn:'詳細を見る', d_docs:'ドキュメント', d_loading:'読み込み中', d_disabled:'無効', d_delete:'削除', d_confirm:'確認', d_small:'小', d_learnmore:'詳細を見る →',
    dc1_h:'超高速', dc1_p:'インテリジェントな遅延読み込みとキャッシュ管理で最適化されたパフォーマンス。',
    dc2_h:'デフォルトでセキュア', dc2_p:'設定不要でエンタープライズグレードのセキュリティ。',
    dc3_h:'インテグレーション', dc3_p:'既存のスタックと連携。API、Webhook、SDKを含む。',
    df_email:'メールアドレス', df_pass:'パスワード', df_pass_err:'パスワードは8文字以上必要です',
    df_role:'役割', df_dev:'開発者', df_des:'デザイナー', df_mgr:'マネージャー', df_signin:'サインイン',
    how_label:'使い方', how_h2:'Sグレード UIまで3ステップ',
    how1_h:'インストール', how1_p:'Claude Code環境にAuraDKitをインストール。コマンド一つで数秒で完了。',
    how2_h:'リクエスト', how2_p:'必要なUIを説明してください。フレームワークは自動検出。どんなコンポーネントでも。',
    how3_h:'デプロイ', how3_p:'プロダクション対応コードを受け取る — レスポンシブ、アクセシブル、トークン駆動、4状態完全対応。',
    fw_label:'あなたのスタックで動作',
    cta_h2:'Claude Codeに追加', cta_p:'AuraDKitをインストールして60秒以内に最初のSグレードコンポーネントを生成。',
    cta_copy:'コピー', cta_meta:'Node 18+ · Claude Code必須 · ローカルデータのみ',
    footer_desc:'デザインインテリジェンスエンジン · v5.0.1', footer_docs:'ドキュメント',
  },
  zh: {
    nav_features:'功能', nav_showcase:'展示', nav_how:'使用方法', nav_cta:'安装',
    hero_badge:'Claude Code 技能',
    hero_h1:'为 <em class="grad">Claude Code</em><br/>打造的设计智能',
    hero_p:'AuraDKit 在几秒钟内生成像素完美、无障碍、生产就绪的 UI — 使用您的框架，您的设计令牌。',
    hero_cta:'安装技能', hero_cta2:'查看组件',
    proof_sites:'站点分析', proof_axes:'设计维度', proof_wcag:'WCAG 验证',
    trust_sites:'站点分析', trust_axes:'设计维度', trust_wcag:'WCAG 验证', trust_fw:'框架', trust_states:'组件状态',
    feat_label:'差异所在', feat_h2:'不是模板，是智能。',
    feat_sub:'AuraDKit 不是在拼装模式。它理解优秀设计为何奏效 — 并将这种理解应用于每个生成的组件。',
    feat1_h:'设计知识，而非规则', feat1_p:'生成理解视觉层次、间距节奏和色彩和谐的 UI — 不仅仅是看起来正确的代码。',
    feat2_h:'框架原生', feat2_p:'自动检测 React、Vue、Svelte、Astro、Next.js、Nuxt。输出每个框架的惯用代码。无需配置。',
    feat3_h:'内置无障碍', feat3_p:'每个组件都配备语义 HTML、ARIA 标签、键盘导航和 WCAG AA 验证的色彩对比度。',
    feat4_h:'4 状态完整', feat4_p:'默认、加载、空、错误 — 每个组件从第一天起就是生产完整品，而非演示壳。',
    show_label:'组件输出', show_h2:'您将收到什么', show_sub:'具有完整设计令牌系统的生产就绪组件。每次都是。',
    tab_btn:'按钮', tab_card:'卡片', tab_form:'表单',
    d_getstart:'开始使用', d_learn:'了解更多', d_docs:'查看文档', d_loading:'加载中', d_disabled:'禁用', d_delete:'删除', d_confirm:'确认', d_small:'小型', d_learnmore:'了解更多 →',
    dc1_h:'极速', dc1_p:'通过智能懒加载和缓存管理优化性能。',
    dc2_h:'默认安全', dc2_p:'无需配置的企业级安全性。',
    dc3_h:'集成', dc3_p:'与您现有的技术栈配合使用。包含 API、Webhook 和 SDK。',
    df_email:'电子邮件', df_pass:'密码', df_pass_err:'密码至少需要 8 个字符',
    df_role:'角色', df_dev:'开发者', df_des:'设计师', df_mgr:'管理者', df_signin:'登录',
    how_label:'使用方式', how_h2:'三步获得 S 级 UI',
    how1_h:'安装', how1_p:'将 AuraDKit 安装到您的 Claude Code 环境中。一个命令，几秒完成。',
    how2_h:'请求', how2_p:'描述您需要的 UI。框架自动检测。任何组件，任何复杂度。',
    how3_h:'发布', how3_p:'接收生产就绪代码 — 响应式、无障碍、令牌驱动，包含全部四种状态。',
    fw_label:'适配您的技术栈',
    cta_h2:'添加到 Claude Code', cta_p:'安装 AuraDKit，在 60 秒内生成您的第一个 S 级组件。',
    cta_copy:'复制', cta_meta:'Node 18+ · 需要 Claude Code · 仅本地数据',
    footer_desc:'设计智能引擎 · v5.0.1', footer_docs:'文档',
  },
  es: {
    nav_features:'Características', nav_showcase:'Muestra', nav_how:'Cómo funciona', nav_cta:'Instalar',
    hero_badge:'Habilidad de Claude Code',
    hero_h1:'Inteligencia de diseño<br/><em class="grad">para Claude Code</em>',
    hero_p:'AuraDKit genera UI pixel-perfect, accesible y lista para producción — en tu framework, con tus tokens, en segundos.',
    hero_cta:'Instalar la Habilidad', hero_cta2:'Ver Componentes',
    proof_sites:'Sitios analizados', proof_axes:'Ejes de diseño', proof_wcag:'Validado WCAG',
    trust_sites:'Sitios analizados', trust_axes:'Ejes de diseño', trust_wcag:'Validado WCAG', trust_fw:'Frameworks', trust_states:'Estados de componente',
    feat_label:'Qué lo diferencia', feat_h2:'No son plantillas. Es inteligencia.',
    feat_sub:'AuraDKit no ensambla patrones. Entiende por qué el gran diseño funciona — y aplica ese entendimiento a cada componente que genera.',
    feat1_h:'Conocimiento de diseño, no reglas', feat1_p:'Genera UI que comprende la jerarquía visual, el ritmo del espaciado y la armonía de color.',
    feat2_h:'Nativo del framework', feat2_p:'Detecta React, Vue, Svelte, Astro, Next.js, Nuxt automáticamente. Genera código idiomático para cada uno.',
    feat3_h:'Accesibilidad incorporada', feat3_p:'Cada componente incluye HTML semántico, atributos ARIA, navegación por teclado y contraste de color WCAG AA.',
    feat4_h:'4 estados completos', feat4_p:'Default, loading, empty, error — cada componente está completo para producción desde el primer día.',
    show_label:'Salida de componentes', show_h2:'Lo que recibes', show_sub:'Componentes listos para producción con un sistema de tokens de diseño completo. Siempre.',
    tab_btn:'Botones', tab_card:'Tarjetas', tab_form:'Formularios',
    d_getstart:'Comenzar', d_learn:'Saber más', d_docs:'Ver docs', d_loading:'Cargando', d_disabled:'Deshabilitado', d_delete:'Eliminar', d_confirm:'Confirmar', d_small:'Pequeño', d_learnmore:'Saber más →',
    dc1_h:'Ultra Rápido', dc1_p:'Rendimiento optimizado con carga diferida inteligente y gestión de caché.',
    dc2_h:'Seguro por defecto', dc2_p:'Seguridad de nivel empresarial sin configuración requerida.',
    dc3_h:'Integraciones', dc3_p:'Funciona con tu stack existente. APIs, webhooks y SDKs incluidos.',
    df_email:'Correo electrónico', df_pass:'Contraseña', df_pass_err:'La contraseña debe tener al menos 8 caracteres',
    df_role:'Rol', df_dev:'Desarrollador', df_des:'Diseñador', df_mgr:'Manager', df_signin:'Iniciar sesión',
    how_label:'Uso', how_h2:'Tres pasos a la UI de nivel S',
    how1_h:'Instalar', how1_p:'Instala AuraDKit en tu entorno de Claude Code. Un comando, listo en segundos.',
    how2_h:'Solicitar', how2_p:'Describe la UI que necesitas. El framework se detecta automáticamente.',
    how3_h:'Publicar', how3_p:'Recibe código listo para producción — responsive, accesible, con tokens y los cuatro estados.',
    fw_label:'Funciona con tu stack',
    cta_h2:'Agregar a Claude Code', cta_p:'Instala AuraDKit y genera tu primer componente de nivel S en menos de 60 segundos.',
    cta_copy:'Copiar', cta_meta:'Node 18+ · Se requiere Claude Code · Solo datos locales',
    footer_desc:'Motor de Inteligencia de Diseño · v5.0.1', footer_docs:'Docs',
  },
  fr: {
    nav_features:'Fonctionnalités', nav_showcase:'Galerie', nav_how:'Comment ça marche', nav_cta:'Installer',
    hero_badge:'Compétence Claude Code',
    hero_h1:'Intelligence design<br/><em class="grad">pour Claude Code</em>',
    hero_p:'AuraDKit génère une UI pixel-perfect, accessible et prête pour la production — avec votre framework, vos tokens, en quelques secondes.',
    hero_cta:'Installer la Compétence', hero_cta2:'Voir les Composants',
    proof_sites:'Sites analysés', proof_axes:'Axes de design', proof_wcag:'Validé WCAG',
    trust_sites:'Sites analysés', trust_axes:'Axes de design', trust_wcag:'Validé WCAG', trust_fw:'Frameworks', trust_states:'États de composant',
    feat_label:'Ce qui le différencie', feat_h2:'Pas des modèles. De l\'intelligence.',
    feat_sub:'AuraDKit n\'assemble pas des patterns. Il comprend pourquoi le grand design fonctionne — et applique cette compréhension à chaque composant.',
    feat1_h:'Connaissance du design', feat1_p:'Génère une UI qui comprend la hiérarchie visuelle, le rythme des espacements et l\'harmonie des couleurs.',
    feat2_h:'Natif du framework', feat2_p:'Détecte React, Vue, Svelte, Astro, Next.js, Nuxt automatiquement. Génère du code idiomatique pour chacun.',
    feat3_h:'Accessibilité intégrée', feat3_p:'Chaque composant inclut HTML sémantique, attributs ARIA, navigation clavier et contraste de couleur WCAG AA.',
    feat4_h:'4 états complets', feat4_p:'Default, loading, empty, error — chaque composant est complet pour la production dès le premier jour.',
    show_label:'Sortie de composants', show_h2:'Ce que vous recevez', show_sub:'Des composants prêts pour la production avec un système de tokens complet. À chaque fois.',
    tab_btn:'Boutons', tab_card:'Cartes', tab_form:'Formulaires',
    d_getstart:'Commencer', d_learn:'En savoir plus', d_docs:'Documentation', d_loading:'Chargement', d_disabled:'Désactivé', d_delete:'Supprimer', d_confirm:'Confirmer', d_small:'Petit', d_learnmore:'En savoir plus →',
    dc1_h:'Ultra Rapide', dc1_p:'Performance optimisée avec chargement différé intelligent et gestion du cache.',
    dc2_h:'Sécurisé par défaut', dc2_p:'Sécurité de niveau entreprise sans configuration requise.',
    dc3_h:'Intégrations', dc3_p:'Fonctionne avec votre stack existant. APIs, webhooks et SDKs inclus.',
    df_email:'Adresse e-mail', df_pass:'Mot de passe', df_pass_err:'Le mot de passe doit contenir au moins 8 caractères',
    df_role:'Rôle', df_dev:'Développeur', df_des:'Designer', df_mgr:'Manager', df_signin:'Se connecter',
    how_label:'Utilisation', how_h2:'Trois étapes vers une UI de grade S',
    how1_h:'Installer', how1_p:'Installez AuraDKit dans votre environnement Claude Code. Une commande, terminé en secondes.',
    how2_h:'Demander', how2_p:'Décrivez l\'UI dont vous avez besoin. Le framework est détecté automatiquement.',
    how3_h:'Déployer', how3_p:'Recevez du code prêt pour la production — responsive, accessible, piloté par tokens, avec les quatre états.',
    fw_label:'Fonctionne avec votre stack',
    cta_h2:'Ajouter à Claude Code', cta_p:'Installez AuraDKit et générez votre premier composant de grade S en moins de 60 secondes.',
    cta_copy:'Copier', cta_meta:'Node 18+ · Claude Code requis · Données locales uniquement',
    footer_desc:'Moteur d\'Intelligence Design · v5.0.1', footer_docs:'Docs',
  },
  de: {
    nav_features:'Funktionen', nav_showcase:'Galerie', nav_how:'So funktioniert\'s', nav_cta:'Installieren',
    hero_badge:'Claude Code Skill',
    hero_h1:'Design-Intelligenz<br/><em class="grad">für Claude Code</em>',
    hero_p:'AuraDKit generiert pixel-perfekte, barrierefreie, produktionsreife UI — in deinem Framework, mit deinen Tokens, in Sekunden.',
    hero_cta:'Skill installieren', hero_cta2:'Komponenten ansehen',
    proof_sites:'Analysierte Sites', proof_axes:'Design-Achsen', proof_wcag:'WCAG-validiert',
    trust_sites:'Analysierte Sites', trust_axes:'Design-Achsen', trust_wcag:'WCAG-validiert', trust_fw:'Frameworks', trust_states:'Komponentenzustände',
    feat_label:'Was es unterscheidet', feat_h2:'Keine Templates. Intelligenz.',
    feat_sub:'AuraDKit assembliert keine Patterns. Es versteht, warum großartiges Design funktioniert — und wendet dieses Verständnis auf jede Komponente an.',
    feat1_h:'Design-Wissen, keine Regeln', feat1_p:'Generiert UI, das visuelle Hierarchie, Abstands-Rhythmus und Farbharmonie versteht.',
    feat2_h:'Framework-nativ', feat2_p:'Erkennt React, Vue, Svelte, Astro, Next.js, Nuxt automatisch. Gibt idiomatischen Code für jedes aus.',
    feat3_h:'Barrierefreiheit eingebaut', feat3_p:'Jede Komponente enthält semantisches HTML, ARIA-Labels, Tastaturnavigation und WCAG AA validierter Farbkontrast.',
    feat4_h:'4-Zustände vollständig', feat4_p:'Default, loading, empty, error — jede Komponente ist ab Tag eins produktionsfertig.',
    show_label:'Komponenten-Ausgabe', show_h2:'Was du erhältst', show_sub:'Produktionsfertige Komponenten mit einem vollständigen Design-Token-System. Jedes Mal.',
    tab_btn:'Buttons', tab_card:'Karten', tab_form:'Formulare',
    d_getstart:'Loslegen', d_learn:'Mehr erfahren', d_docs:'Dokumentation', d_loading:'Lädt', d_disabled:'Deaktiviert', d_delete:'Löschen', d_confirm:'Bestätigen', d_small:'Klein', d_learnmore:'Mehr erfahren →',
    dc1_h:'Blitzschnell', dc1_p:'Optimierte Performance mit intelligentem Lazy Loading und Cache-Management.',
    dc2_h:'Standardmäßig sicher', dc2_p:'Sicherheit auf Enterprise-Niveau ohne Konfiguration.',
    dc3_h:'Integrationen', dc3_p:'Funktioniert mit deinem bestehenden Stack. APIs, Webhooks und SDKs inklusive.',
    df_email:'E-Mail-Adresse', df_pass:'Passwort', df_pass_err:'Das Passwort muss mindestens 8 Zeichen lang sein',
    df_role:'Rolle', df_dev:'Entwickler', df_des:'Designer', df_mgr:'Manager', df_signin:'Anmelden',
    how_label:'Verwendung', how_h2:'Drei Schritte zur S-Grade UI',
    how1_h:'Installieren', how1_p:'AuraDKit in deine Claude Code-Umgebung installieren. Ein Befehl, in Sekunden fertig.',
    how2_h:'Anfordern', how2_p:'Beschreibe die benötigte UI. Das Framework wird automatisch erkannt.',
    how3_h:'Deployen', how3_p:'Produktionsfertigen Code erhalten — responsiv, barrierefrei, token-basiert, mit allen vier Zuständen.',
    fw_label:'Funktioniert mit deinem Stack',
    cta_h2:'Zu Claude Code hinzufügen', cta_p:'Installiere AuraDKit und generiere deine erste S-Grade-Komponente in unter 60 Sekunden.',
    cta_copy:'Kopieren', cta_meta:'Node 18+ · Claude Code erforderlich · Nur lokale Daten',
    footer_desc:'Design-Intelligenz-Engine · v5.0.1', footer_docs:'Docs',
  },
  it: {
    nav_features:'Funzionalità', nav_showcase:'Galleria', nav_how:'Come funziona', nav_cta:'Installa',
    hero_badge:'Skill di Claude Code',
    hero_h1:'Intelligenza di design<br/><em class="grad">per Claude Code</em>',
    hero_p:'AuraDKit genera UI pixel-perfect, accessibile e pronta per la produzione — nel tuo framework, con i tuoi token, in pochi secondi.',
    hero_cta:'Installa lo Skill', hero_cta2:'Vedi Componenti',
    proof_sites:'Siti analizzati', proof_axes:'Assi di design', proof_wcag:'WCAG validato',
    trust_sites:'Siti analizzati', trust_axes:'Assi di design', trust_wcag:'WCAG validato', trust_fw:'Framework', trust_states:'Stati componente',
    feat_label:'Cosa lo differenzia', feat_h2:'Non sono template. È intelligenza.',
    feat_sub:'AuraDKit non assembla pattern. Capisce perché il grande design funziona — e applica quella comprensione a ogni componente generato.',
    feat1_h:'Conoscenza del design', feat1_p:'Genera UI che comprende gerarchia visiva, ritmo degli spazi e armonia dei colori.',
    feat2_h:'Nativo del framework', feat2_p:'Rileva React, Vue, Svelte, Astro, Next.js, Nuxt automaticamente. Genera codice idiomatico per ciascuno.',
    feat3_h:'Accessibilità integrata', feat3_p:'Ogni componente include HTML semantico, attributi ARIA, navigazione da tastiera e contrasto colore WCAG AA.',
    feat4_h:'4 stati completi', feat4_p:'Default, loading, empty, error — ogni componente è completo per la produzione dal primo giorno.',
    show_label:'Output componenti', show_h2:'Cosa ricevi', show_sub:'Componenti pronti per la produzione con un sistema di token di design completo. Ogni volta.',
    tab_btn:'Pulsanti', tab_card:'Schede', tab_form:'Moduli',
    d_getstart:'Inizia', d_learn:'Scopri di più', d_docs:'Documentazione', d_loading:'Caricamento', d_disabled:'Disabilitato', d_delete:'Elimina', d_confirm:'Conferma', d_small:'Piccolo', d_learnmore:'Scopri di più →',
    dc1_h:'Fulmineo', dc1_p:'Prestazioni ottimizzate con lazy loading intelligente e gestione della cache.',
    dc2_h:'Sicuro di default', dc2_p:'Sicurezza di livello enterprise senza configurazione richiesta.',
    dc3_h:'Integrazioni', dc3_p:'Funziona con il tuo stack esistente. API, webhook e SDK inclusi.',
    df_email:'Indirizzo email', df_pass:'Password', df_pass_err:'La password deve essere di almeno 8 caratteri',
    df_role:'Ruolo', df_dev:'Sviluppatore', df_des:'Designer', df_mgr:'Manager', df_signin:'Accedi',
    how_label:'Utilizzo', how_h2:'Tre passi verso la UI di grado S',
    how1_h:'Installa', how1_p:'Installa AuraDKit nel tuo ambiente Claude Code. Un comando, fatto in secondi.',
    how2_h:'Richiedi', how2_p:'Descrivi la UI di cui hai bisogno. Il framework viene rilevato automaticamente.',
    how3_h:'Distribuisci', how3_p:'Ricevi codice pronto per la produzione — responsive, accessibile, guidato da token, con tutti e quattro gli stati.',
    fw_label:'Funziona con il tuo stack',
    cta_h2:'Aggiungi a Claude Code', cta_p:'Installa AuraDKit e genera il tuo primo componente di grado S in meno di 60 secondi.',
    cta_copy:'Copia', cta_meta:'Node 18+ · Claude Code richiesto · Solo dati locali',
    footer_desc:'Motore di Intelligenza Design · v5.0.1', footer_docs:'Docs',
  },
};

let currentLang = 'en';

function setLanguage(lang) {
  if (!T[lang]) return;
  currentLang = lang;
  const dict = T[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.documentElement.lang = lang;
}

/* ══════════════════════════════════════════════════════════════
   2. Language Picker
   ══════════════════════════════════════════════════════════════ */
function initLangPicker() {
  const btn = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');
  const flagEl = document.getElementById('langFlag');
  const codeEl = document.getElementById('langCode');

  if (!btn || !menu) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });

  menu.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', e => {
      e.stopPropagation();
      const lang = opt.getAttribute('data-lang');
      const flag = opt.getAttribute('data-flag');
      flagEl.textContent = flag;
      codeEl.textContent = lang.toUpperCase();
      menu.querySelectorAll('.lang-opt').forEach(o => {
        o.classList.remove('selected');
        o.setAttribute('aria-selected', 'false');
      });
      opt.classList.add('selected');
      opt.setAttribute('aria-selected', 'true');
      setLanguage(lang);
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   3. Tab Switcher
   ══════════════════════════════════════════════════════════════ */
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const target = tab.getAttribute('data-tab');
      document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.add('hidden');
      });
      const el = document.getElementById('panel-' + target);
      if (el) el.classList.remove('hidden');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   4. Scroll Reveal
   ══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.rv');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   5. Nav Scroll State
   ══════════════════════════════════════════════════════════════ */
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ══════════════════════════════════════════════════════════════
   6. Mobile Hamburger
   ══════════════════════════════════════════════════════════════ */
function initHamburger() {
  const btn = document.getElementById('ham');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('.nav-a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   7. Copy Utilities
   ══════════════════════════════════════════════════════════════ */
function copyInstall() {
  const text = 'npx @smorky85/auradkit';
  navigator.clipboard.writeText(text).then(() => {
    const lbl = document.getElementById('copyLbl');
    const dict = T[currentLang] || T.en;
    if (lbl) {
      lbl.textContent = '✓';
      setTimeout(() => { lbl.textContent = dict.cta_copy || 'Copy'; }, 2000);
    }
  }).catch(() => {});
}

function copyCode(btn, id) {
  const pre = document.getElementById(id);
  if (!pre) return;
  navigator.clipboard.writeText(pre.textContent || '').then(() => {
    const svg = btn.querySelector('svg');
    if (svg) {
      const orig = svg.outerHTML;
      btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
  }).catch(() => {});
}

/* ══════════════════════════════════════════════════════════════
   8. Three.js Scene
   ══════════════════════════════════════════════════════════════ */
function initThree() {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('threeCanvas');
  if (!canvas) return;

  const W = () => window.innerWidth;
  const H = () => window.innerHeight;

  /* Renderer */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.setClearColor(0x07050e, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  /* Scene + Camera */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, W() / H(), 0.1, 100);
  camera.position.set(0, 0, 7);

  /* Lighting */
  scene.add(new THREE.AmbientLight(0xffffff, 0.15));
  const purpleLight = new THREE.PointLight(0xa78bfa, 4, 12);
  purpleLight.position.set(-3, 2, 3);
  scene.add(purpleLight);
  const cyanLight = new THREE.PointLight(0x22d3ee, 3, 12);
  cyanLight.position.set(3, -2, 2);
  scene.add(cyanLight);
  const whiteLight = new THREE.PointLight(0xffffff, 0.8, 10);
  whiteLight.position.set(0, 4, 2);
  scene.add(whiteLight);

  /* Diamond — main */
  const diamondGeo = new THREE.OctahedronGeometry(1.2, 2);
  const diamondMat = new THREE.MeshPhongMaterial({
    color: 0xc4b5fd,
    emissive: new THREE.Color(0xa78bfa),
    emissiveIntensity: 0.08,
    specular: new THREE.Color(3, 3, 3),
    shininess: 400,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
  });
  const diamond = new THREE.Mesh(diamondGeo, diamondMat);
  diamond.position.x = 1.8;
  scene.add(diamond);

  /* Diamond — wireframe edges */
  const edgeGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1.21, 0));
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.35 });
  const edges = new THREE.LineSegments(edgeGeo, edgeMat);
  edges.position.x = 1.8;
  scene.add(edges);

  /* Diamond — inner core */
  const innerGeo = new THREE.OctahedronGeometry(0.55, 0);
  const innerMat = new THREE.MeshPhysicalMaterial({
    color: 0x22d3ee,
    emissive: new THREE.Color(0x22d3ee),
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.6,
    wireframe: true,
  });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  inner.position.x = 1.8;
  scene.add(inner);

  /* Torus rings */
  const ring1Geo = new THREE.TorusGeometry(1.9, 0.012, 8, 80);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.45 });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 2.4;
  scene.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(2.4, 0.008, 8, 80);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.28 });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = Math.PI / 3.5;
  ring2.rotation.z = Math.PI / 5;
  scene.add(ring2);

  /* Particle field */
  const pCount = 1400;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i += 3) {
    const r = 2.8 + Math.random() * 3.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pPos[i]   = r * Math.sin(phi) * Math.cos(theta);
    pPos[i+1] = r * Math.sin(phi) * Math.sin(theta);
    pPos[i+2] = r * Math.cos(phi);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x8b7cf6, size: 0.025, transparent: true, opacity: 0.55, sizeAttenuation: true });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* Mouse parallax */
  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* Animation loop */
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.012;

    /* Lerp camera toward mouse */
    target.x += (mouse.x * 0.45 - target.x) * 0.05;
    target.y += (mouse.y * 0.35 - target.y) * 0.05;
    camera.position.x = target.x;
    camera.position.y = -target.y;

    /* Diamond rotation */
    diamond.rotation.y = t * 0.28 + Math.sin(t * 0.4) * 0.18;
    diamond.rotation.x = Math.sin(t * 0.22) * 0.22;
    edges.rotation.copy(diamond.rotation);
    inner.rotation.y = -t * 0.35;
    inner.rotation.x = t * 0.2;

    /* Pulsing emissive */
    diamondMat.emissiveIntensity = 0.08 + Math.sin(t * 1.4) * 0.06;

    /* Ring orbit */
    ring1.rotation.z = t * 0.18;
    ring2.rotation.z = -t * 0.12;

    /* Particles slow drift */
    particles.rotation.y = t * 0.025;
    particles.rotation.x = t * 0.012;

    renderer.render(scene, camera);
  }
  animate();

  /* Resize */
  window.addEventListener('resize', () => {
    renderer.setSize(W(), H());
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
  });
}

/* ══════════════════════════════════════════════════════════════
   9. Boot
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initHamburger();
  initLangPicker();
  initTabs();
  initScrollReveal();
  initThree();
});

/* Expose globals for inline handlers */
window.copyInstall = copyInstall;
window.copyCode = copyCode;
