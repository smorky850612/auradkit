import { useState, useMemo } from 'react';
import { Wand2, X, Copy, Check, RotateCcw, ChevronDown } from 'lucide-react';
import type { DesignTerm } from '../types';
import { TermSelector } from '../components/TermSelector';
import { designTerms, categories as staticCategories } from '../data';
import { useCustomTerms } from '../hooks/useCustomTerms';

const PLATFORMS = ['웹', '모바일', '데스크탑', '태블릿', '모두'];
const TONES = ['명확하고 간결하게', '전문적으로', '창의적으로', '단계별로', '간단하게'];
const TARGETS = ['UI 디자인', '웹 개발', '앱 개발', 'UX 리서치', '프로토타입'];

const TONE_MAP: Record<string, string> = {
  '명확하고 간결하게': '명확하고 간결한 언어로',
  '전문적으로': '전문적이고 상세한 언어로',
  '창의적으로': '창의적이고 혁신적인 방식으로',
  '단계별로': '단계별로 체계적으로',
  '간단하게': '간단하고 이해하기 쉽게',
};

export function BuilderPage() {
  const { customTerms } = useCustomTerms();
  const allTerms = useMemo(() => [...designTerms, ...customTerms], [customTerms]);
  const allCategories = useMemo(
    () => [...new Set([...staticCategories, ...customTerms.map(t => t.category).filter(Boolean)])],
    [customTerms]
  );

  const [selected, setSelected] = useState<DesignTerm[]>([]);
  const [platform, setPlatform] = useState('모두');
  const [tone, setTone] = useState('명확하고 간결하게');
  const [target, setTarget] = useState('UI 디자인');
  const [context, setContext] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [copied, setCopied] = useState(false);

  const toggleTerm = (term: DesignTerm) => {
    setSelected(prev =>
      prev.find(s => s.slug === term.slug)
        ? prev.filter(s => s.slug !== term.slug)
        : [...prev, term]
    );
  };

  const generatedPrompt = useMemo(() => {
    if (selected.length === 0) return '';
    const termNames = selected.map(t => `${t.term}(${t.korean_name})`).join(', ');
    const termExamples = selected.map(t => `• ${t.term}: ${t.prompt_example}`).join('\n');
    return [
      ...(context ? [context, ''] : []),
      `다음 디자인 원칙들을 활용해서 ${target} 작업물을 만들어줘:`,
      `적용 용어: ${termNames}`,
      '',
      '각 용어 적용 방법:',
      termExamples,
      '',
      `플랫폼: ${platform === '모두' ? '모든 플랫폼' : platform}`,
      `작성 방식: ${TONE_MAP[tone] ?? tone} 설명해줘.`,
    ].join('\n');
  }, [selected, platform, tone, target, context]);

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; silent fail
    }
  };

  const handleReset = () => {
    setSelected([]);
    setContext('');
    setPlatform('모두');
    setTone('명확하고 간결하게');
    setTarget('UI 디자인');
    setSearch('');
    setActiveCategory('전체');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--foreground))]">프롬프트 빌더</h1>
        </div>
        <p className="text-[hsl(var(--muted-foreground))]">
          디자인 용어를 클릭해서 선택하고 AI 프롬프트를 자동으로 생성하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <TermSelector
          terms={allTerms}
          categories={allCategories}
          selected={selected}
          search={search}
          activeCategory={activeCategory}
          onSearchChange={setSearch}
          onCategoryChange={setActiveCategory}
          onToggle={toggleTerm}
        />

        {/* Right: Settings + Prompt */}
        <div className="xl:col-span-2 space-y-4 xl:sticky xl:top-20 h-fit">
          {/* Selected terms */}
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                선택된 용어 <span className="text-[hsl(var(--primary))]">{selected.length}개</span>
              </h2>
              {selected.length > 0 && (
                <button
                  onClick={() => setSelected([])}
                  className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  전체 해제
                </button>
              )}
            </div>
            {selected.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {selected.map(term => (
                  <span key={term.slug} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.2)]">
                    {term.term}
                    <button
                      onClick={() => toggleTerm(term)}
                      aria-label={`${term.term} 선택 해제`}
                      className="hover:opacity-70 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[hsl(var(--muted-foreground))]">왼쪽 용어를 클릭해서 선택하세요.</p>
            )}
          </div>

          {/* Context */}
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
            <label htmlFor="ctx-input" className="block text-xs font-semibold text-[hsl(var(--foreground))] mb-1.5">
              작업 컨텍스트 (선택)
            </label>
            <textarea
              id="ctx-input"
              value={context}
              onChange={e => setContext(e.target.value)}
              placeholder="예: 쇼핑몰 상품 목록 페이지를 리디자인해야 해..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] resize-none"
            />
          </div>

          {/* Options */}
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 space-y-3">
            <SelectField label="플랫폼" id="sel-platform" value={platform} onChange={setPlatform} options={PLATFORMS} />
            <SelectField label="작성 방식" id="sel-tone" value={tone} onChange={setTone} options={TONES} />
            <SelectField label="작업 유형" id="sel-target" value={target} onChange={setTarget} options={TARGETS} />
          </div>

          {/* Generated Prompt */}
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-[hsl(var(--foreground))]">생성된 프롬프트</h2>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 px-2 py-1 text-xs rounded-md text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" aria-hidden="true" />
                  초기화
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!generatedPrompt}
                  aria-disabled={!generatedPrompt}
                  aria-label={copied ? '복사 완료' : '프롬프트 복사'}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    generatedPrompt
                      ? 'bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.85)]'
                      : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] cursor-not-allowed opacity-50'
                  }`}
                >
                  {copied ? <Check className="w-3 h-3" aria-hidden="true" /> : <Copy className="w-3 h-3" aria-hidden="true" />}
                  {copied ? '복사됨!' : '복사'}
                </button>
              </div>
            </div>
            {generatedPrompt ? (
              <div className="rounded-lg bg-[hsl(var(--muted))] p-3 max-h-64 overflow-y-auto">
                <pre className="text-xs text-[hsl(var(--foreground))] whitespace-pre-wrap font-sans leading-relaxed">
                  {generatedPrompt}
                </pre>
              </div>
            ) : (
              <div className="rounded-lg bg-[hsl(var(--muted))] p-4 flex items-center justify-center min-h-[100px]">
                <div className="text-center text-[hsl(var(--muted-foreground))]">
                  <Wand2 className="w-8 h-8 mx-auto mb-2 opacity-30" aria-hidden="true" />
                  <p className="text-xs">용어를 선택하면 프롬프트가 생성됩니다.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectField({ label, id, value, onChange, options }: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none px-3 py-2 pr-8 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] cursor-pointer"
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  );
}
