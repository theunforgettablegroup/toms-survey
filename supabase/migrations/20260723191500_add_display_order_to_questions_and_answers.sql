-- Ensure deterministic question and answer option ordering.

ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS display_order INTEGER;

UPDATE public.questions q
SET display_order = ordered.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS rn
  FROM public.questions
) ordered
WHERE q.id = ordered.id
  AND q.display_order IS NULL;

ALTER TABLE public.questions
ALTER COLUMN display_order SET DEFAULT 0;

ALTER TABLE public.questions
ALTER COLUMN display_order SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_questions_display_order
ON public.questions(display_order, id);

ALTER TABLE public.answers
ADD COLUMN IF NOT EXISTS display_order INTEGER;

UPDATE public.answers a
SET display_order = ranked.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY question_id ORDER BY id) AS rn
  FROM public.answers
) ranked
WHERE a.id = ranked.id
  AND a.display_order IS NULL;

ALTER TABLE public.answers
ALTER COLUMN display_order SET DEFAULT 0;

ALTER TABLE public.answers
ALTER COLUMN display_order SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_answers_question_display_order
ON public.answers(question_id, display_order, id);
