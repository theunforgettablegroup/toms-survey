export type SurveyOutcome = {
  key: string;
  title: string;
  summary: string;
  details: string;
};

export const DEFAULT_OUTCOME_KEY = 'Gray Area';

export const OUTCOME_CATALOG: Record<string, SurveyOutcome> = {
  'Medicare-Medigap': {
    key: 'Medicare-Medigap',
    title: 'Medicare-Medigap',
    summary:
      'Best for people who want more predictable costs and extra flexibility with Original Medicare.',
    details:
      'This path fits people who value steadier out-of-pocket costs, broader provider flexibility, and supplemental coverage to help fill gaps in Original Medicare.',
  },
  'Gray Area': {
    key: 'Gray Area',
    title: 'Gray Area',
    summary:
      'A middle-ground option for people still balancing cost, flexibility, and extra coverage needs.',
    details:
      'This path is a practical in-between choice for people comparing tradeoffs and not yet leaning fully toward either side of the coverage spectrum.',
  },
  'Medicare Advantage': {
    key: 'Medicare Advantage',
    title: 'Medicare Advantage',
    summary:
      'Best for people who are comfortable with a more managed plan structure and bundled benefits.',
    details:
      'This path fits people who prefer a more coordinated plan experience, often with bundled extras and a simpler monthly premium setup.',
  },
};
