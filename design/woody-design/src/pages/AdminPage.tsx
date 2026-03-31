import { useState } from 'react';
import { Plus, Pencil, Trash2, Settings, BookOpen, Lock } from 'lucide-react';
import { designTerms, categoryColors } from '../data';
import { useCustomTerms } from '../hooks/useCustomTerms';
import { TermForm } from '../components/TermForm';
import type { DesignTerm } from '../types';

type View = 'list' | 'form';

export function AdminPage() {
  const { customTerms, addTerm, updateTerm, deleteTerm } = useCustomTerms();
  const [view, setView] = useState<View>('list');
  const [editing, setEditing] = useState<DesignTerm | null>(null);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  const allSlugs = [...designTerms, ...customTerms].map(t => t.slug);

  const handleAdd = () => {
    setEditing(null);
    setView('form');
  };

  const handleEdit = (term: DesignTerm) => {
    setEditing(term);
    setView('form');
  };

  const handleSave = (term: DesignTerm) => {
    if (editing) {
      updateTerm(editing.slug, term);
    } else {
      addTerm(term);
    }
    setEditing(null);
    setView('list');
  };

  const handleCancel = () => {
    setEditing(null);
    setView('list');
  };

  const handleDelete = (slug: string) => {
    deleteTerm(slug);
    setConfirmSlug(null);
  };

  if (view === 'form') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <TermForm
          initial={editing ?? undefined}
          existingSlugs={editing ? allSlugs.filter(s => s !== editing.slug) : allSlugs}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">용어 관리</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              기본 {designTerms.length}개 + 추가 {customTerms.length}개 = 총 {designTerms.length + customTerms.length}개
            </p>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium hover:bg-[hsl(var(--primary)/0.85)] transition-colors"
        >
          <Plus className="w-4 h-4" />
          새 용어 추가
        </button>
      </div>

      {/* Custom Terms Section */}
      {customTerms.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[hsl(var(--primary))]" />
            직접 추가한 용어 ({customTerms.length}개)
          </h2>
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] divide-y divide-[hsl(var(--border))]">
            {customTerms.map(term => (
              <TermRow
                key={term.slug}
                term={term}
                isCustom
                onEdit={() => handleEdit(term)}
                onDelete={() => setConfirmSlug(term.slug)}
              />
            ))}
          </div>
        </section>
      )}

      {customTerms.length === 0 && (
        <div className="rounded-xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center mb-8">
          <Plus className="w-10 h-10 mx-auto mb-3 text-[hsl(var(--muted-foreground))] opacity-40" />
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">아직 추가한 용어가 없습니다</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 mb-4">새 용어 추가 버튼을 눌러 용어를 직접 작성해보세요.</p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium hover:bg-[hsl(var(--primary)/0.85)] transition-colors"
          >
            <Plus className="w-4 h-4" />
            새 용어 추가
          </button>
        </div>
      )}

      {/* Static Terms Section */}
      <section>
        <h2 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
          <Lock className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
          기본 제공 용어 ({designTerms.length}개) — 읽기 전용
        </h2>
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] divide-y divide-[hsl(var(--border))]">
          {designTerms.map(term => (
            <TermRow
              key={term.slug}
              term={term}
              isCustom={false}
            />
          ))}
        </div>
      </section>

      {/* Delete Confirm Modal */}
      {confirmSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">용어 삭제</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-5">
              이 용어를 삭제하면 되돌릴 수 없습니다. 계속하시겠습니까?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmSlug(null)}
                className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => handleDelete(confirmSlug)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TermRow({
  term,
  isCustom,
  onEdit,
  onDelete,
}: {
  term: DesignTerm;
  isCustom: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const catColor = categoryColors[term.category] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">{term.term}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{term.korean_name}</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${catColor}`}>
            {term.category}
          </span>
          {!isCustom && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
              기본
            </span>
          )}
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 truncate">{term.definition}</p>
      </div>
      {isCustom && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onEdit}
            aria-label={`${term.term} 수정`}
            className="p-1.5 rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            aria-label={`${term.term} 삭제`}
            className="p-1.5 rounded-md text-[hsl(var(--muted-foreground))] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
