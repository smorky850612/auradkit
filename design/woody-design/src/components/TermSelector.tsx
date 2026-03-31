import { useMemo } from 'react';
import { Search } from 'lucide-react';
import { categoryColors } from '../data';
import type { DesignTerm } from '../types';

interface TermSelectorProps {
  terms: DesignTerm[];
  categories: string[];
  selected: DesignTerm[];
  search: string;
  activeCategory: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onToggle: (term: DesignTerm) => void;
}

export function TermSelector({
  terms,
  categories,
  selected,
  search,
  activeCategory,
  onSearchChange,
  onCategoryChange,
  onToggle,
}: TermSelectorProps) {
  const filtered = useMemo(() => {
    return terms.filter(t => {
      const matchSearch = !search ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.korean_name.includes(search);
      const matchCat = activeCategory === '전체' || t.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [terms, search, activeCategory]);

  return (
    <div className="xl:col-span-3 space-y-4">
      {/* Search + Category Filter */}
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="용어 검색..."
            aria-label="디자인 용어 검색"
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="카테고리 필터">
          {['전체', ...categories].map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Term Grid */}
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
          {filtered.length}개 용어 · 클릭해서 선택/해제
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label="용어 선택">
          {filtered.map(term => {
            const isSelected = selected.some(s => s.slug === term.slug);
            const catColor = categoryColors[term.category] ?? 'bg-gray-100 text-gray-600';
            return (
              <button
                key={term.slug}
                onClick={() => onToggle(term)}
                role="checkbox"
                aria-checked={isSelected}
                aria-label={`${term.term} (${term.korean_name}) - ${term.category}`}
                className={`flex items-start gap-2.5 p-3 rounded-lg border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] ${
                  isSelected
                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)] ring-1 ring-[hsl(var(--primary)/0.3)]'
                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.4)] hover:bg-[hsl(var(--accent))]'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))]'
                      : 'border-[hsl(var(--border))]'
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`font-medium text-sm ${isSelected ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground))]'}`}>
                      {term.term}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${catColor}`}>
                      {term.category}
                    </span>
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{term.korean_name}</p>
                </div>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-[hsl(var(--muted-foreground))] text-center py-8">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
