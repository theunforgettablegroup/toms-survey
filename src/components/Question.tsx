import React, { useState } from 'react';

type QuestionProps = {
  question: string;
  questionType?: 'single_choice' | 'free_text';
  answers: { id: number; answer_text: string }[];
  onAnswer: (answer: number) => void;
  onTextAnswer?: (answer: string) => void;
};

const Question: React.FC<QuestionProps> = ({
  question,
  questionType = 'single_choice',
  answers,
  onAnswer,
  onTextAnswer,
}) => {
  const [freeText, setFreeText] = useState('');

  const isFreeText = questionType === 'free_text';
  const canSubmitText = freeText.trim().length > 0;

  return (
    <div>
      <h2
        style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '1rem', textAlign: 'center' }}
      >
        {question}
      </h2>

      {isFreeText ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <textarea
            value={freeText}
            onChange={(event) => setFreeText(event.target.value)}
            placeholder="Type your response"
            rows={5}
            style={{
              boxSizing: 'border-box',
              display: 'block',
              width: '100%',
              margin: 0,
              padding: '0.75rem',
              borderRadius: '0.75rem',
              border: '2px solid #2563eb',
              fontSize: '1rem',
              lineHeight: 1.4,
              color: '#0f172a',
              fontFamily: 'inherit',
              outline: 'none',
              resize: 'vertical',
            }}
          />
          <button
            onClick={() => onTextAnswer?.(freeText.trim())}
            disabled={!canSubmitText}
            style={{
              padding: '0.75rem 1.25rem',
              background: canSubmitText ? '#0f766e' : '#94a3b8',
              color: '#f8fafc',
              border: 'none',
              borderRadius: '0.75rem',
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: canSubmitText ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
          >
            Continue
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => onAnswer(answer.id)}
              style={{
                padding: '0.75rem 1.25rem',
                background: '#f0fdfa',
                color: '#134e4a',
                border: '1px solid #99f6e4',
                borderRadius: '0.75rem',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {answer.answer_text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;
