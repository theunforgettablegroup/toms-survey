-- Add support for question types and free-text response capture.

ALTER TABLE public.questions
ADD COLUMN IF NOT EXISTS question_type TEXT NOT NULL DEFAULT 'single_choice';

ALTER TABLE public.response_answers
ADD COLUMN IF NOT EXISTS free_text_answer TEXT;

ALTER TABLE public.response_answers
DROP CONSTRAINT IF EXISTS response_answers_value_present;

ALTER TABLE public.response_answers
ADD CONSTRAINT response_answers_value_present
CHECK (
  answer_id IS NOT NULL
  OR (free_text_answer IS NOT NULL AND btrim(free_text_answer) <> '')
);
