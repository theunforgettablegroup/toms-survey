-- Fix public insert permissions for response_answers SERIAL id sequence.
-- INSERT on table is not sufficient; roles also need USAGE on the backing sequence.

GRANT USAGE, SELECT ON SEQUENCE public.response_answers_id_seq TO anon, authenticated;
