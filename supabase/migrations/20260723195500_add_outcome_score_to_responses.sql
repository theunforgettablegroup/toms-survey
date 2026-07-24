-- Persist the computed survey score used for outcome banding.
ALTER TABLE public.responses
ADD COLUMN IF NOT EXISTS outcome_score NUMERIC(5,2);

ALTER TABLE public.responses
DROP CONSTRAINT IF EXISTS responses_outcome_score_range;

ALTER TABLE public.responses
ADD CONSTRAINT responses_outcome_score_range
CHECK (outcome_score IS NULL OR (outcome_score >= 0 AND outcome_score <= 100));
