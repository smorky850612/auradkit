import { useState, useCallback } from 'react';
import type { DesignTerm } from '../types';

const STORAGE_KEY = 'woody_custom_terms';

function load(): DesignTerm[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DesignTerm[]) : [];
  } catch {
    return [];
  }
}

function save(terms: DesignTerm[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(terms));
  } catch {
    // storage unavailable
  }
}

export function generateSlug(term: string, existingSlugs: string[]): string {
  const base = term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'term';
  let slug = base;
  let i = 2;
  while (existingSlugs.includes(slug)) slug = `${base}-${i++}`;
  return slug;
}

export function useCustomTerms() {
  const [terms, setTerms] = useState<DesignTerm[]>(load);

  const addTerm = useCallback((term: DesignTerm) => {
    setTerms(prev => {
      const next = [...prev, term];
      save(next);
      return next;
    });
  }, []);

  const updateTerm = useCallback((slug: string, updated: DesignTerm) => {
    setTerms(prev => {
      const next = prev.map(t => (t.slug === slug ? updated : t));
      save(next);
      return next;
    });
  }, []);

  const deleteTerm = useCallback((slug: string) => {
    setTerms(prev => {
      const next = prev.filter(t => t.slug !== slug);
      save(next);
      return next;
    });
  }, []);

  return { customTerms: terms, addTerm, updateTerm, deleteTerm };
}
