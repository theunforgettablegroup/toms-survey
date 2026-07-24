-- Public-facing RLS model
-- - Anonymous users can read all survey tables
-- - Anonymous users can write to responses and response_answers
-- - DELETE is admin-only (service_role)

-- 1) Ensure least-privilege grants are aligned with policy intent.
REVOKE INSERT, UPDATE, DELETE ON TABLE public.questions FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.answers FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.response_answers FROM anon, authenticated;
REVOKE DELETE ON TABLE public.responses FROM anon, authenticated;

GRANT SELECT ON TABLE public.questions TO anon, authenticated;
GRANT SELECT ON TABLE public.answers TO anon, authenticated;
GRANT SELECT ON TABLE public.responses TO anon, authenticated;
GRANT SELECT ON TABLE public.response_answers TO anon, authenticated;

GRANT INSERT, UPDATE ON TABLE public.responses TO anon, authenticated;
GRANT INSERT ON TABLE public.response_answers TO anon, authenticated;
GRANT DELETE ON TABLE public.questions TO service_role;
GRANT DELETE ON TABLE public.answers TO service_role;
GRANT DELETE ON TABLE public.responses TO service_role;
GRANT DELETE ON TABLE public.response_answers TO service_role;

-- 2) Enable RLS on all public survey tables.
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.response_answers ENABLE ROW LEVEL SECURITY;

-- 3) Reset policies if they already exist.
DROP POLICY IF EXISTS questions_read_public ON public.questions;
DROP POLICY IF EXISTS answers_read_public ON public.answers;
DROP POLICY IF EXISTS responses_read_public ON public.responses;
DROP POLICY IF EXISTS response_answers_read_public ON public.response_answers;

DROP POLICY IF EXISTS responses_insert_public ON public.responses;
DROP POLICY IF EXISTS responses_update_public ON public.responses;
DROP POLICY IF EXISTS response_answers_insert_public ON public.response_answers;

DROP POLICY IF EXISTS questions_delete_admin_only ON public.questions;
DROP POLICY IF EXISTS answers_delete_admin_only ON public.answers;
DROP POLICY IF EXISTS responses_delete_admin_only ON public.responses;
DROP POLICY IF EXISTS response_answers_delete_admin_only ON public.response_answers;

-- 4) Public read policies.
CREATE POLICY questions_read_public
ON public.questions
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY answers_read_public
ON public.answers
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY responses_read_public
ON public.responses
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY response_answers_read_public
ON public.response_answers
FOR SELECT
TO anon, authenticated
USING (true);

-- 5) Public write policies for response capture tables.
CREATE POLICY responses_insert_public
ON public.responses
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY responses_update_public
ON public.responses
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY response_answers_insert_public
ON public.response_answers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 6) Admin-only delete policies.
CREATE POLICY questions_delete_admin_only
ON public.questions
FOR DELETE
TO service_role
USING (true);

CREATE POLICY answers_delete_admin_only
ON public.answers
FOR DELETE
TO service_role
USING (true);

CREATE POLICY responses_delete_admin_only
ON public.responses
FOR DELETE
TO service_role
USING (true);

CREATE POLICY response_answers_delete_admin_only
ON public.response_answers
FOR DELETE
TO service_role
USING (true);
