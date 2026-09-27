import React from 'react';

const nextStepCopy = [
  'Because the decision on what to do can be complicated, one option is to contact a reputable medical insurance agent in your area that sells a variety of both Medicare Advantage plans and Medigap plans. These agents are qualified to explain the difference between available plans as well as the costs. There is no cost to the consumer to use an agent.',
  'Another option is to contact the Senior Health Insurance Program (SHIP) of your state. SHIP is a state agency that provides free information about Medicare plans in your area. In Arkansas, the phone number for SHIP is 800-224-6330. All states have similar agencies.',
];

type RecommendedNextStepsProps = {
  id?: string;
  variant?: 'screen' | 'print';
};

const RecommendedNextSteps: React.FC<RecommendedNextStepsProps> = ({ id, variant = 'screen' }) => {
  const isPrint = variant === 'print';

  return (
    <div
      id={id}
      style={{
        marginTop: isPrint ? '1.5rem' : 0,
        padding: '1.25rem',
        borderRadius: '1.25rem',
        border: '1px solid #e2e8f0',
        background: isPrint ? 'transparent' : '#fff',
        textAlign: 'left',
      }}
    >
      <h3 style={{ color: '#0f172a', fontSize: '1rem', marginTop: 0 }}>Recommended Next Steps</h3>
      {nextStepCopy.map((paragraph) => (
        <p key={paragraph} style={{ color: '#334155', lineHeight: 1.6, marginBottom: '1rem' }}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default RecommendedNextSteps;
