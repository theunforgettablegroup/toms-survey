import React from 'react';
import Link from 'next/link';
import AppButton from '../../components/AppButton';
import ExplanationOfSurveyResults from '../../components/ExplanationOfSurveyResults';
import PageShell from '../../components/PageShell';
import SurfaceCard from '../../components/SurfaceCard';

const ExplanationPage: React.FC = () => {
  return (
    <PageShell padding='2rem 1rem'>
      <div style={{ width: '100%', maxWidth: 720, marginBottom: '1rem', textAlign: 'right' }}>
        <Link
          href='/results'
          style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'underline' }}
        >
          Back to Results
        </Link>
      </div>

      <SurfaceCard
        maxWidth={720}
        style={{
          color: '#0f172a',
          lineHeight: 1.7,
        }}
      >
        <h1 style={{ marginTop: 0 }}>Explanation of Survey Results</h1>
        <ExplanationOfSurveyResults />

        <div style={{ marginTop: '1.5rem' }}>
          <Link href='/results' style={{ textDecoration: 'none' }}>
            <AppButton type='button' variant='secondary'>
              Return to Results
            </AppButton>
          </Link>
        </div>
      </SurfaceCard>
    </PageShell>
  );
};

export default ExplanationPage;
