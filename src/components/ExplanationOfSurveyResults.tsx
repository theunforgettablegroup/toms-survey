import React from 'react';

type ExplanationOfSurveyResultsProps = {
  id?: string;
  variant?: 'screen' | 'print';
};

const ExplanationOfSurveyResults: React.FC<ExplanationOfSurveyResultsProps> = ({
  id,
  variant = 'screen',
}) => {
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
      <h2 style={{ color: '#0f172a', fontSize: '1.05rem', marginTop: 0 }}>
        Explanation of Survey Results
      </h2>
      <p style={{ color: '#334155', lineHeight: 1.65, marginBottom: '1rem' }}>
        This survey of Medicare options is based on many factors that are important to people who
        are new to Medicare as well as people already on Medicare. People have several options to
        consider based on medical history, personal priorities and finances. There are several
        important things to consider when choosing the right type of plan. Many options for coverage
        are available in most areas of the country and these can vary significantly in coverage and
        cost.
      </p>
      <p style={{ color: '#334155', lineHeight: 1.65, marginBottom: '1rem' }}>
        One option is Traditional Medicare which can be combined with a separate prescription drug
        plan. A supplemental plan known as Medigap can be added to fill in financial gaps not
        covered by the basic insurance. Another option is a Medicare Advantage plan where care is
        paid for by private insurance companies and often includes extra benefits not otherwise
        covered by basic Medicare. There are pros and cons to these options that should be studied
        before a decision is made.
      </p>

      <h3 style={{ color: '#0f172a', fontSize: '1rem', marginBottom: '0.75rem' }}>
        Some of the things to consider in choosing the best type of plan include:
      </h3>
      <ul style={{ color: '#334155', lineHeight: 1.65, paddingLeft: '1.25rem', marginTop: 0 }}>
        <li style={{ marginBottom: '0.5rem' }}>
          Medical history and expected changes in health care needs
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          Importance of choosing your own health care providers
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          Affordability - both insurance premiums and out-of-pocket costs
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          Understanding that a Medigap plan may not be available after a person’s first year of
          eligibility for Medicare
        </li>
      </ul>
    </div>
  );
};

export default ExplanationOfSurveyResults;
