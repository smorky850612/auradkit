export interface DesignTerm {
  slug: string;
  term: string;
  korean_name: string;
  category: string;
  subcategory: string;
  definition: string;
  woody_interpretation: string;
  designer_insight: string;
  developer_implementation: string;
  prompt_example: string;
  use_case: string;
  anti_pattern: string;
  related_terms: string[];
  tags: string[];
  difficulty_level: '초급' | '중급' | '고급';
  platform: string;
}
