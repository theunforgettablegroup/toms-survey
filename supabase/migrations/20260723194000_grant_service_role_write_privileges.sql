-- Ensure service_role can seed and administer survey data via PostgREST.

GRANT USAGE ON SCHEMA public TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.questions TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.answers TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.responses TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.response_answers TO service_role;

GRANT USAGE, SELECT ON SEQUENCE public.questions_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.answers_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.response_answers_id_seq TO service_role;
