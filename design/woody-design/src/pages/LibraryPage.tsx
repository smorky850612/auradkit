import { useState, useMemo } from 'react';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { TermCard } from '../components/TermCard';
import { designTerms, categories as staticCategories } from '../data';
import { useCustomTerms } from '../hooks/useCustomTerms';
import type { DesignTerm } from '../types';

type ViewMode = 'grid' | 'list';

export function LibraryPage() {
  const { customTerms } = useCustomTerms();
  const allTerms = useMemo(() => [...designTerms, ...customTerms], [customTerms]);
  const categories = useMemo(
    () => [...new Set([...staticCategories, ...customTerms.map(t => t.category).filter(Boolean)])],
    [customTerms]
  );

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('전체');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filtered = useMemo<DesignTerm[]>(() => {
    return allTerms.filter(term => {
      const matchesSearch = !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.korean_name.includes(search) ||
        term.definition.includes(search) ||
        term.tags.some(t => t.includes(search));
      const matchesCategory = selectedCategory === '전체' || term.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === '전체' || term.difficulty_level === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, selectedCategory, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))] mb-3">
          디자인 프롬프트 <span className="text-[hsl(var(--primary))]">라이브러리</span>
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto">
          AI 프롬프트에서 활용하는 핵심 디자인 용어 {allTerms.length}개를 만나보세요.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="용어 검색... (영어, 한국어, 태그)"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent text-sm"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))]">
            <Filter className="w-3.5 h-3.5" />
            <span>필터:</span>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            {['전체', ...categories].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[hsl(var(--primary))] text-white'
                    : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty filter */}
          <div className="flex gap-1.5 ml-auto">
            {['전체', '초급', '중급', '고급'].map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-[hsl(var(--primary))] text-white'
                    : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* View mode */}
          <div className="flex items-center gap-0.5 border border-[hsl(var(--border))] rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[hsl(var(--primary))] text-white' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[hsl(var(--primary))] text-white' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {filtered.length}개의 용어{search || selectedCategory !== '전체' || selectedDifficulty !== '전체' ? ` (전체 ${allTerms.length}개 중)` : ''}
        </p>
      </div>

      {/* Terms Grid/List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[hsl(var(--muted-foreground))]">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">검색 결과가 없습니다</p>
          <p className="text-sm mt-1">다른 키워드로 검색해보세요.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
          : 'flex flex-col gap-3'
        }>
          {filtered.map(term => (
            <TermCard key={term.slug} term={term} />
          ))}
        </div>
      )}
    </div>
  );
}
