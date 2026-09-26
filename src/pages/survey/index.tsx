import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import CenteredPanelPage from '../../components/CenteredPanelPage';
import Question from '../../components/Question';
import { createClient } from '../../../supabase/client';
import { toast } from 'sonner';

const supabase = createClient();

type Answer = {
  id: number;
  answer_text: string;
  display_order: number;
};

type Question = {
  id: number;
  question_text: string;
  question_type: 'single_choice' | 'free_text';
  answers: Answer[];
};

const mainColors = {
  dark: '#0f172a',
  accent: '#0f766e',
  accentSoft: '#ccfbf1',
  white: '#FFFFFF',
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const roundToTwo = (value: number) => Math.round(value * 100) / 100;

const normalizeText = (value: string) => value.trim().toLowerCase();

type ScoringRule = {
  question: string;
  weight: number;
  answerScores: Record<string, number>;
  onAnswer?: (
    answer: string,
    context: { weightedContribution: number }
  ) => {
    finalScoreCap?: number;
    forceFinalScore?: number;
    weightedContribution?: number;
  };
};

const SCORING_RULES: ScoringRule[] = [
  {
    question: 'What is your Age?',
    weight: 10,
    answerScores: {
      '65-69': 100,
      '70-79': 40,
      '80-89': 2,
      '90-over': 0,
    },
    onAnswer: (answer) => {
      if (answer === '90-over') {
        return { finalScoreCap: 30 };
      }

      if (answer === '80-89') {
        return { finalScoreCap: 45 };
      }

      return {};
    },
  },
  {
    question: 'How is your General Health?',
    weight: 5,
    answerScores: {
      Excellent: 100,
      Good: 50,
      Fair: 25,
      Poor: 10,
    },
  },
  {
    question: 'Do you have Chronic Health Conditions?',
    weight: 10,
    answerScores: {
      None: 100,
      Minor: 25,
      Major: 0,
    },
  },
  {
    question: 'Do you have or have you had Cancer?',
    weight: 20,
    answerScores: {
      Never: 100,
      'Minor-removed': 50,
      'Minor-still': 20,
      'Major-removed': 10,
      'Major-still have it': 0,
    },
    onAnswer: (answer, context) => {
      if (answer === 'Major-still have it') {
        return { forceFinalScore: 10 };
      }

      if (answer === 'Major-removed') {
        return { weightedContribution: context.weightedContribution / 2 };
      }

      return {};
    },
  },
  {
    question: 'Is there a history of serious medical issues in your biological family?',
    weight: 10,
    answerScores: {
      "None/Don't Know": 100,
      Minor: 50,
      Major: 0,
    },
  },
  {
    question: 'Do you need Durable Medical Equipment? (such as wheelchair, oxygen, C-Pap)',
    weight: 5,
    answerScores: {
      No: 100,
      'Yes-low-cost': 75,
      'Yes-expensive': 0,
    },
    onAnswer: (answer) => {
      if (answer === 'Yes-expensive') {
        return { finalScoreCap: 20 };
      }

      return {};
    },
  },
  {
    question: 'Have you recently been an in-patient in a Rehab Facility?',
    weight: 5,
    answerScores: {
      Never: 100,
      'Recently-minor': 60,
      'Recently-major': 0,
      'Yes-still in Rehab': 0,
    },
    onAnswer: (answer) => {
      if (answer === 'Recently-major' || answer === 'Yes-still in Rehab') {
        return { finalScoreCap: 15 };
      }

      return {};
    },
  },
  {
    question: 'How is your use of Prescription Medications?',
    weight: 3,
    answerScores: {
      "Don't take any meds on regular basis": 100,
      'Take few meds on regular basis': 50,
      'Take several meds on a regular basis': 25,
      'Take several meds on a regular basis including some high cost specialty drugs': 10,
    },
  },
  {
    question: 'Do you have Expected Domestic Travel during the year?',
    weight: 5,
    answerScores: {
      'Expect no travel out of area': 100,
      'Expect little travel out of area': 40,
      'Expect some travel out of area': 10,
      'Expect significant travel out of area such as seasonal vacations': 0,
    },
    onAnswer: (answer) => {
      if (answer === 'Expect significant travel out of area such as seasonal vacations') {
        return { finalScoreCap: 45 };
      }

      return {};
    },
  },
  {
    question: 'What is the Importance of Consistent Out-of-Pocket Spending Per Month?',
    weight: 10,
    answerScores: {
      'Lower monthly cost with possibility of high unexpected out-of-pocket spending (up to a maximum)': 100,
      'Middle monthly cost with some unexpected out-of-pocket costs': 50,
      'Consistent monthly cost with almost complete coverage for unexpected events or expected event coming within a year (i.e. peace of mind)': 0,
    },
  },
  {
    question: 'What importance is the Ability to Choose Specific Primary Care Doctor or Clinic?',
    weight: 4,
    answerScores: {
      'Not important': 100,
      'Slightly important': 75,
      'Moderately important': 25,
      'Highly important': 10,
      'Very highly important': 0,
    },
  },
  {
    question:
      'What is the importance of the Ability to Choose Specific Specialist and/or Referral Hospital (such as MD Anderson, Mayo Clinic)?',
    weight: 5,
    answerScores: {
      'Not important': 100,
      'Slightly important': 75,
      'Moderately important': 25,
      'Highly important': 10,
      'Very highly important': 0,
    },
  },
  {
    question:
      'What is the importance of the Ability to go to Specialist without Going to Primary Care Doctor First?',
    weight: 5,
    answerScores: {
      'Not important': 100,
      'Slightly important': 75,
      'Moderately important': 25,
      'Highly important': 10,
      'Very highly important': 0,
    },
  },
  {
    question:
      'What is the importance of having a plan that includes additional benefits such as dental, hearing and transportation that are not covered by Original Medicare?',
    weight: 3,
    answerScores: {
      'Not important': 0,
      'Slightly important': 10,
      'Moderately important': 25,
      'Highly important': 50,
      'Very highly important': 100,
    },
  },
];

const SCORING_RULES_BY_QUESTION = new Map(
  SCORING_RULES.map((rule) => [normalizeText(rule.question), rule])
);

const mapScoreToOutcome = (score: number) => {
  if (score <= 50) {
    return 'Medicare-Medigap';
  }

  if (score < 70) {
    return 'Gray Area';
  }

  return 'Medicare Advantage';
};

const calculateOutcomeScore = (questions: Question[], responses: string[]) => {
  let weightedScoreSum = 0;
  const finalScoreCaps: number[] = [];
  let forcedFinalScore: number | null = null;

  for (const [questionIndex, question] of questions.entries()) {
    const rule = SCORING_RULES_BY_QUESTION.get(normalizeText(question.question_text));
    if (!rule) {
      continue;
    }

    const responseText = responses[questionIndex];
    if (!responseText) {
      continue;
    }

    const mappedScore = rule.answerScores[responseText];
    if (typeof mappedScore !== 'number') {
      continue;
    }

    let weightedContribution = (rule.weight * mappedScore) / 100;

    const override = rule.onAnswer?.(responseText, { weightedContribution });

    if (typeof override?.weightedContribution === 'number') {
      weightedContribution = override.weightedContribution;
    }

    weightedScoreSum += weightedContribution;

    if (typeof override?.forceFinalScore === 'number') {
      forcedFinalScore = override.forceFinalScore;
    }

    if (typeof override?.finalScoreCap === 'number') {
      finalScoreCaps.push(override.finalScoreCap);
    }
  }

  let finalScore = forcedFinalScore ?? weightedScoreSum;

  if (finalScoreCaps.length > 0) {
    finalScore = Math.min(finalScore, ...finalScoreCaps);
  }

  return clamp(roundToTwo(finalScore), 0, 100);
};

const Survey: React.FC = () => {
  const router = useRouter();
  const [responses, setResponses] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responseId, setResponseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const hasShownNoQuestionsToast = useRef(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('id, question_text, question_type, display_order')
          .order('display_order', { ascending: true })
          .order('id', { ascending: true });

        if (questionsError) {
          throw new Error(questionsError.message);
        }

        const { data: answersData, error: answersError } = await supabase
          .from('answers')
          .select('id, question_id, answer_text, display_order')
          .order('question_id', { ascending: true })
          .order('display_order', { ascending: true })
          .order('id', { ascending: true });

        if (answersError) {
          throw new Error(answersError.message);
        }

        // Map answers to their questions
        const questionsWithAnswers = (questionsData || []).map((q) => ({
          ...q,
          answers: (answersData || []).filter((a) => a.question_id === q.id),
        }));

        setQuestions(questionsWithAnswers);
      } catch (error) {
        console.error('Error fetching survey data:', error);
        toast.error('Unable to load survey questions right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Create response row when survey starts
  useEffect(() => {
    if (!loading && questions.length && !responseId) {
      const createResponse = async () => {
        // Collect browser info in your React component
        const browserData = {
          userAgent: navigator.userAgent,
          screen: {
            width: window.screen.width,
            height: window.screen.height,
          },
          language: navigator.language,
          platform: navigator.platform,
          url: window.location.href,
        };
        // Optionally fetch location data, but do not block survey startup if this fails.
        let locationData: unknown = null;
        try {
          const locationResponse = await fetch('https://ipapi.co/json/');
          if (locationResponse.ok) {
            locationData = await locationResponse.json();
          }
        } catch {
          locationData = null;
        }

        // Combine and send to your API or Supabase
        const userData = {
          ...browserData,
          location: locationData,
        };
        const { data, error } = await supabase
          .from('responses')
          .insert({ browser_info: userData, status: 'started' })
          .select('id')
          .single();

        if (error) {
          toast.error('Unable to start a survey session right now.');
          return;
        }

        if (data) {
          setResponseId(data.id);
        }
      };
      createResponse();
    }
  }, [loading, questions, responseId]);

  useEffect(() => {
    if (!loading && questions.length === 0 && !hasShownNoQuestionsToast.current) {
      toast.info('No questions are available yet. Seed data when you are ready.');
      hasShownNoQuestionsToast.current = true;
    }
  }, [loading, questions.length]);

  useEffect(() => {
    if (!responseId) return;

    const handleAbandon = async () => {
      await supabase.from('responses').update({ status: 'abandoned' }).eq('id', responseId);
    };

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      handleAbandon();
      e.preventDefault();
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [responseId]);

  const persistAnswerAndAdvance = async (params: { answerId?: number; answerText: string }) => {
    if (!responseId) return;

    const { answerId, answerText } = params;
    const questionId = questions[step].id;

    setResponses((prev) => {
      const newResponses = [...prev];
      newResponses[step] = answerText;
      return newResponses;
    });

    const { error: answerError } = await supabase.from('response_answers').insert({
      response_id: responseId,
      question_id: questionId,
      answer_id: answerId ?? null,
      free_text_answer: answerId ? null : answerText,
    });

    if (answerError) {
      toast.error('Unable to save your answer. Please try again.');
      return;
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const finalResponses = [...responses.slice(0, step), answerText];
      const score = calculateOutcomeScore(questions, finalResponses);
      const outcome = mapScoreToOutcome(score);

      const { error: completionError } = await supabase
        .from('responses')
        .update({
          outcome_score: score,
          profile_type: outcome,
          status: 'completed',
        })
        .eq('id', responseId);

      if (completionError) {
        toast.error('Your final result could not be saved. Please try again.');
        return;
      }

      toast.success('Survey completed. Preparing your outcome...');

      router.push({
        pathname: '/results',
        query: { outcome },
      });
    }
  };

  // Handle single-choice submission
  const handleAnswer = async (answerId: number) => {
    const answer = questions[step].answers.find((a) => a.id === answerId)?.answer_text || '';
    await persistAnswerAndAdvance({ answerId, answerText: answer });
  };

  // Handle free-text submission
  const handleTextAnswer = async (answerText: string) => {
    await persistAnswerAndAdvance({ answerText });
  };

  if (loading) {
    return (
      <CenteredPanelPage
        title='Loading Coverage Explorer'
        description='Connecting to your coverage questions and preparing the first step.'
        headerContent={
          <>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '999px',
                border: '4px solid #ccfbf1',
                borderTopColor: mainColors.accent,
                margin: '0 auto 1rem',
                animation: 'survey-spin 1s linear infinite',
              }}
            />
            <style>{`
              @keyframes survey-spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </>
        }
      />
    );
  }

  if (!questions.length) {
    return (
      <CenteredPanelPage
        title='No Coverage Questions Available Yet'
        description='The coverage explorer is connected and ready, but there are no questions in the database yet.'
        secondaryDescription='Seed your question set or add coverage questions in Supabase, then refresh this page to begin testing the full flow.'
      />
    );
  }

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 1rem',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            background: mainColors.white,
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            maxWidth: '420px',
            width: '100%',
            padding: '2rem 1.5rem',
            marginTop: '8rem',
          }}
        >
          <h1
            style={{
              color: mainColors.dark,
              fontWeight: 700,
              fontSize: '2rem',
              marginBottom: '1rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            Coverage Explorer
          </h1>
          <p style={{ color: '#334155', textAlign: 'center', marginBottom: '1.5rem' }}>
            Answer each question to estimate which medical coverage path fits best for the person
            exploring options.
          </p>
          <div
            style={{
              height: '8px',
              width: '100%',
              background: '#eee',
              borderRadius: '4px',
              marginBottom: '2rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${((step + 1) / questions.length) * 100}%`,
                height: '100%',
                background: mainColors.accent,
                transition: 'width 0.3s',
              }}
            />
          </div>
          <div>
            <Question
              key={questions[step].id}
              question={questions[step].question_text}
              questionType={questions[step].question_type || 'single_choice'}
              answers={questions[step].answers.map((a) => a)}
              onAnswer={handleAnswer}
              onTextAnswer={handleTextAnswer}
            />
          </div>
        </div>
        <footer
          style={{
            marginTop: 'auto',
            padding: '1rem 0',
            color: mainColors.dark,
            fontSize: '0.95rem',
            opacity: 0.7,
          }}
        >
          &copy; {new Date().getFullYear()} Survey Platform
        </footer>
      </div>
    </>
  );
};

export default Survey;
