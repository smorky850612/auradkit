import { designTerms } from './terms-data';

export { designTerms };

export const categories = [...new Set(designTerms.map(t => t.category))];

export const difficultyColors: Record<string, string> = {
  '초급': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  '중급': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  '고급': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export const categoryColors: Record<string, string> = {
  'UX 전략': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  '레이아웃 & 구조': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  '커머스 패턴': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  '상태 & 피드백': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  '입력 & 폼': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  '모바일 패턴': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  '디자인 시스템': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'SaaS / 어드민 패턴': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  '데이터 표시': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  '지표 & 프로덕트 사고': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  '컴포넌트': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  '접근성': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  '성장 패턴': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  '내비게이션': 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
  '협업 & 핸드오프': 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
  'UX 라이팅 / 마이크로카피': 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400',
};
