import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, BookOpen, Code, Lightbulb, AlertTriangle } from 'lucide-react';
import type { DesignTerm } from '../types';
import { difficultyColors, categoryColors } from '../data';

interface TermCardProps {
  term: DesignTerm;
}

export function TermCard({ term }: TermCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(term.prompt_example);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; silent fail
    }
  };

  const catColor = categoryColors[term.category] ?? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  const diffColor = difficultyColors[term.difficulty_level] ?? '';

  return (
    <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[hsl(var(--primary)/0.4)] group">
      {/* Card Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label={`${term.term} 상세 ${expanded ? '접기' : '펼치기'}`}
        className="w-full p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] rounded-t-xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${catColor}`}>
                {term.category}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${diffColor}`}>
                {term.difficulty_level}
              </span>
            </div>
            <h3 className="font-semibold text-base text-[hsl(var(--card-foreground))] leading-tight group-hover:text-[hsl(var(--primary))] transition-colors">
              {term.term}
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">{term.korean_name}</p>
          </div>
          <div className="flex-shrink-0 mt-1 text-[hsl(var(--muted-foreground))]">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2 line-clamp-2 text-left">
          {term.definition}
        </p>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-[hsl(var(--border))] p-5 space-y-4">
          {/* Woody Interpretation */}
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 p-3.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Woody's Tip</span>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200">{term.woody_interpretation}</p>
          </div>

          {/* Designer / Developer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-[hsl(var(--muted))] p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
                <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">디자이너 인사이트</span>
              </div>
              <p className="text-sm text-[hsl(var(--card-foreground))]">{term.designer_insight}</p>
            </div>
            <div className="rounded-lg bg-[hsl(var(--muted))] p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Code className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
                <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">개발자 구현</span>
              </div>
              <p className="text-sm text-[hsl(var(--card-foreground))]">{term.developer_implementation}</p>
            </div>
          </div>

          {/* Prompt Example */}
          <div className="rounded-lg border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)] p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-wide">프롬프트 예시</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.85)] transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? '복사됨!' : '복사'}
              </button>
            </div>
            <p className="text-sm text-[hsl(var(--card-foreground))] italic">"{term.prompt_example}"</p>
          </div>

          {/* Anti-pattern */}
          <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 p-3.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">안티패턴</span>
            </div>
            <p className="text-sm text-red-800 dark:text-red-200">{term.anti_pattern}</p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {term.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
                #{tag}
              </span>
            ))}
          </div>

          {term.use_case && (
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              <span className="font-medium">활용 사례:</span> {term.use_case}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
