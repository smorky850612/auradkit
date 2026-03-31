import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import type { DesignTerm } from '../types';
import { categories } from '../data';

interface TermFormProps {
  initial?: Partial<DesignTerm>;
  existingSlugs: string[];
  onSave: (term: DesignTerm) => void;
  onCancel: () => void;
}

const DIFFICULTIES = ['초급', '중급', '고급'] as const;

const EMPTY: Omit<DesignTerm, 'slug'> = {
  term: '', korean_name: '', category: '', subcategory: '',
  definition: '', woody_interpretation: '', designer_insight: '',
  developer_implementation: '', prompt_example: '', use_case: '',
  anti_pattern: '', related_terms: [], tags: [],
  difficulty_level: '초급', platform: 'all',
};

export function TermForm({ initial, existingSlugs, onSave, onCancel }: TermFormProps) {
  const isEdit = !!initial?.slug;
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [relatedStr, setRelatedStr] = useState((initial?.related_terms ?? []).join(', '));
  const [tagsStr, setTagsStr] = useState((initial?.tags ?? []).join(', '));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.term.trim()) e.term = '필수 항목입니다.';
    if (!form.korean_name.trim()) e.korean_name = '필수 항목입니다.';
    if (!form.category.trim()) e.category = '필수 항목입니다.';
    if (!form.definition.trim()) e.definition = '필수 항목입니다.';
    if (!form.prompt_example.trim()) e.prompt_example = '필수 항목입니다.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const slug = isEdit && initial?.slug
      ? initial.slug
      : form.term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'term';

    const finalSlug = (() => {
      if (isEdit) return slug;
      let s = slug; let i = 2;
      while (existingSlugs.includes(s)) s = `${slug}-${i++}`;
      return s;
    })();

    onSave({
      ...form,
      slug: finalSlug,
      related_terms: relatedStr.split(',').map(s => s.trim()).filter(Boolean),
      tags: tagsStr.split(',').map(s => s.trim()).filter(Boolean),
    } as DesignTerm);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onCancel} className="flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </button>
        <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">
          {isEdit ? '용어 수정' : '새 용어 추가'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 space-y-4">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] border-b border-[hsl(var(--border))] pb-2">기본 정보 *</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="영문 이름" id="term" error={errors.term}>
              <input id="term" value={form.term} onChange={e => set('term', e.target.value)}
                className={inputCls(!!errors.term)} placeholder="예: Progressive Disclosure" />
            </Field>
            <Field label="한국어 이름" id="korean_name" error={errors.korean_name}>
              <input id="korean_name" value={form.korean_name} onChange={e => set('korean_name', e.target.value)}
                className={inputCls(!!errors.korean_name)} placeholder="예: 단계적 노출" />
            </Field>
            <Field label="카테고리" id="category" error={errors.category}>
              <input id="category" list="cat-list" value={form.category} onChange={e => set('category', e.target.value)}
                className={inputCls(!!errors.category)} placeholder="기존 선택 또는 직접 입력" />
              <datalist id="cat-list">
                {categories.map(c => <option key={c} value={c} />)}
              </datalist>
            </Field>
            <Field label="서브카테고리" id="subcategory">
              <input id="subcategory" value={form.subcategory} onChange={e => set('subcategory', e.target.value)}
                className={inputCls()} placeholder="예: 플로우 디자인" />
            </Field>
            <Field label="난이도" id="difficulty_level">
              <select id="difficulty_level" value={form.difficulty_level}
                onChange={e => set('difficulty_level', e.target.value)} className={inputCls()}>
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="플랫폼" id="platform">
              <input id="platform" value={form.platform} onChange={e => set('platform', e.target.value)}
                className={inputCls()} placeholder="all / web / mobile" />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 space-y-4">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] border-b border-[hsl(var(--border))] pb-2">설명 *</h3>
          <Field label="정의" id="definition" error={errors.definition}>
            <textarea id="definition" rows={3} value={form.definition} onChange={e => set('definition', e.target.value)}
              className={`${inputCls(!!errors.definition)} resize-none`} placeholder="이 용어가 무엇인지 설명하세요." />
          </Field>
          <Field label="프롬프트 예시" id="prompt_example" error={errors.prompt_example}>
            <textarea id="prompt_example" rows={2} value={form.prompt_example} onChange={e => set('prompt_example', e.target.value)}
              className={`${inputCls(!!errors.prompt_example)} resize-none`} placeholder="AI 프롬프트에서 어떻게 활용하는지 예시를 작성하세요." />
          </Field>
          <Field label="Woody's Tip" id="woody_interpretation">
            <textarea id="woody_interpretation" rows={2} value={form.woody_interpretation} onChange={e => set('woody_interpretation', e.target.value)}
              className={`${inputCls()} resize-none`} placeholder="프롬프트에서 이 용어를 사용할 때의 팁" />
          </Field>
        </div>

        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 space-y-4">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] border-b border-[hsl(var(--border))] pb-2">상세 정보</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="디자이너 인사이트" id="designer_insight">
              <textarea id="designer_insight" rows={2} value={form.designer_insight} onChange={e => set('designer_insight', e.target.value)}
                className={`${inputCls()} resize-none`} />
            </Field>
            <Field label="개발자 구현" id="developer_implementation">
              <textarea id="developer_implementation" rows={2} value={form.developer_implementation} onChange={e => set('developer_implementation', e.target.value)}
                className={`${inputCls()} resize-none`} />
            </Field>
            <Field label="활용 사례" id="use_case">
              <input id="use_case" value={form.use_case} onChange={e => set('use_case', e.target.value)}
                className={inputCls()} placeholder="예: 온보딩, 설정 마법사" />
            </Field>
            <Field label="안티패턴" id="anti_pattern">
              <input id="anti_pattern" value={form.anti_pattern} onChange={e => set('anti_pattern', e.target.value)}
                className={inputCls()} placeholder="이렇게 하지 마세요..." />
            </Field>
            <Field label="관련 용어 (쉼표 구분)" id="related_terms">
              <input id="related_terms" value={relatedStr} onChange={e => setRelatedStr(e.target.value)}
                className={inputCls()} placeholder="인지 부하, 온보딩" />
            </Field>
            <Field label="태그 (쉼표 구분)" id="tags">
              <input id="tags" value={tagsStr} onChange={e => setTagsStr(e.target.value)}
                className={inputCls()} placeholder="모바일, 플로우, UX" />
            </Field>
          </div>
        </div>

        <div className="flex gap-3 justify-end pb-8">
          <button type="button" onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors">
            취소
          </button>
          <button type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium hover:bg-[hsl(var(--primary)/0.85)] transition-colors">
            <Save className="w-4 h-4" />
            {isEdit ? '수정 완료' : '용어 추가'}
          </button>
        </div>
      </form>
    </div>
  );
}

function inputCls(hasError = false) {
  return `w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] ${
    hasError ? 'border-red-400' : 'border-[hsl(var(--border))]'
  }`;
}

function Field({ label, id, children, error }: { label: string; id: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
