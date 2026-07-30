import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

// Load env variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (preferred for seeding), or provide equivalent NEXT_PUBLIC_* values.'
  );
}

const resolvedSupabaseUrl: string = supabaseUrl;
const resolvedSupabaseKey: string = supabaseKey;

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    'Warning: SUPABASE_SERVICE_ROLE_KEY is not set. With current RLS policies, seeding questions/answers may fail for anon keys.'
  );
}

const supabase = createClient(resolvedSupabaseUrl, resolvedSupabaseKey);

type SeedQuestion = {
  text: string;
  questionType?: 'single_choice' | 'free_text';
  answers?: string[];
};

const questions: SeedQuestion[] = [
  {
    text: 'What is your Age?',
    questionType: 'single_choice',
    answers: ['65-69', '70-79', '80-89', '90-over'],
  },
  {
    text: 'Zip Code',
    questionType: 'free_text',
  },
  {
    text: 'County of Residence',
    questionType: 'free_text',
  },
  {
    text: 'How is your General Health?',
    questionType: 'single_choice',
    answers: ['Excellent', 'Good', 'Fair', 'Poor'],
  },
  {
    text: 'Do you have Chronic Health Conditions?',
    questionType: 'single_choice',
    answers: ['None', 'Minor', 'Major'],
  },
  {
    text: 'Do you have or have you had Cancer?',
    questionType: 'single_choice',
    answers: ['Never', 'Minor-removed', 'Minor-still', 'Major-removed', 'Major-still have it'],
  },
  {
    text: 'Is there a history of serious medical issues in your biological family?',
    questionType: 'single_choice',
    answers: ["None/Don't Know", 'Minor', 'Major'],
  },
  {
    text: 'Do you need Durable Medical Equipment? (such as wheelchair, oxygen, C-Pap)',
    questionType: 'single_choice',
    answers: ['No', 'Yes-low-cost', 'Yes-expensive'],
  },
  {
    text: 'Have you recently been an in-patient in a Rehab Facility?',
    questionType: 'single_choice',
    answers: ['Never', 'Recently-minor', 'Recently-major', 'Yes-still in Rehab'],
  },
  {
    text: 'How is your use of Prescription Medications?',
    questionType: 'single_choice',
    answers: [
      "Don't take any meds on regular basis",
      'Take few meds on regular basis',
      'Take several meds on a regular basis',
      'Take several meds on a regular basis including some high cost specialty drugs',
    ],
  },
  {
    text: 'Do you have Expected Domestic Travel during the year?',
    questionType: 'single_choice',
    answers: [
      'Expect no travel out of area',
      'Expect little travel out of area',
      'Expect some travel out of area',
      'Expect significant travel out of area such as seasonal vacations',
    ],
  },
  {
    text: 'What is the Importance of Consistent Out-of-Pocket Spending Per Month?',
    questionType: 'single_choice',
    answers: [
      'Lower monthly cost with possibility of high unexpected out-of-pocket spending (up to a maximum)',
      'Middle monthly cost with some unexpected out-of-pocket costs',
      'Consistent monthly cost with almost complete coverage for unexpected events or expected event coming within a year (i.e. peace of mind)',
    ],
  },
  {
    text: 'What importance is the Ability to Choose Specific Primary Care Doctor or Clinic?',
    questionType: 'single_choice',
    answers: [
      'Not important',
      'Slightly important',
      'Moderately important',
      'Highly important',
      'Very highly important',
    ],
  },
  {
    text: 'What is the importance of the Ability to Choose Specific Specialist and/or Referral Hospital (such as MD Anderson, Mayo Clinic)?',
    questionType: 'single_choice',
    answers: [
      'Not important',
      'Slightly important',
      'Moderately important',
      'Highly important',
      'Very highly important',
    ],
  },
  {
    text: 'What is the importance of the Ability to go to Specialist without Going to Primary Care Doctor First?',
    questionType: 'single_choice',
    answers: [
      'Not important',
      'Slightly important',
      'Moderately important',
      'Highly important',
      'Very highly important',
    ],
  },
  {
    text: 'What is the importance of having a plan that includes additional benefits such as dental, hearing and transportation that are not covered by Original Medicare?',
    questionType: 'single_choice',
    answers: [
      'Not important',
      'Slightly important',
      'Moderately important',
      'Highly important',
      'Very highly important',
    ],
  },
];

function validateNoDuplicateQuestionText(seedQuestions: SeedQuestion[]): void {
  const seen = new Map<string, string>();
  const duplicates = new Set<string>();

  for (const question of seedQuestions) {
    const normalized = question.text.trim().toLowerCase();
    const firstSeenLabel = seen.get(normalized);

    if (firstSeenLabel) {
      duplicates.add(firstSeenLabel);
      continue;
    }

    seen.set(normalized, question.text);
  }

  if (duplicates.size > 0) {
    throw new Error(
      `Duplicate question text found in seed data: ${Array.from(duplicates)
        .sort((a, b) => a.localeCompare(b))
        .join(', ')}`
    );
  }
}

async function seed() {
  validateNoDuplicateQuestionText(questions);

  try {
    const healthcheck = await fetch(`${resolvedSupabaseUrl}/rest/v1/`, {
      headers: {
        apikey: resolvedSupabaseKey,
        Authorization: `Bearer ${resolvedSupabaseKey}`,
      },
    });
    if (!healthcheck.ok) {
      throw new Error(`Supabase REST responded with status ${healthcheck.status}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(
      `Unable to reach Supabase at ${resolvedSupabaseUrl}. Confirm local services are running (npx supabase start) and SUPABASE_URL points to the API URL. Root error: ${message}`
    );
  }

  let hadErrors = false;

  for (const [questionIndex, q] of questions.entries()) {
    // Insert question
    const { data: question, error: qError } = await supabase
      .from('questions')
      .insert({
        question_text: q.text,
        question_type: q.questionType || 'single_choice',
        display_order: questionIndex + 1,
      })
      .select()
      .single();

    if (qError) {
      hadErrors = true;
      console.error('Error inserting question:', q.text, qError.message);
      continue;
    }

    // Insert answers
    for (const [answerIndex, answerText] of (q.answers || []).entries()) {
      const { error: aError } = await supabase.from('answers').insert({
        question_id: question.id,
        answer_text: answerText,
        display_order: answerIndex + 1,
      });

      if (aError) {
        hadErrors = true;
        console.error('Error inserting answer:', answerText, aError.message);
      }
    }
    console.log(`Seeded: ${q.text}`);
  }

  if (hadErrors) {
    throw new Error('Seeding completed with errors. See logs above.');
  }

  console.log('Seeding complete!');
}

seed().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
