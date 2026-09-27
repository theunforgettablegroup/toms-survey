import React from 'react';
import Link from 'next/link';
import AppButton from '../../components/AppButton';
import PageShell from '../../components/PageShell';
import SurfaceCard from '../../components/SurfaceCard';

const DisclaimerPage: React.FC = () => {
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
        <h1 style={{ marginTop: 0 }}>Disclaimer</h1>
        <p>
          This survey is intended to help users think through Medicare coverage preferences and is
          provided for educational purposes only. It does not constitute legal, tax, financial, or
          medical advice.
        </p>
        <p>
          Coverage decisions can depend on personal health, prescription needs, provider networks,
          plan availability, and budget. Users should confirm plan details directly with the plan, a
          licensed insurance professional, or a trusted state assistance program before enrolling.
        </p>
        <p>
          We make reasonable efforts to present helpful information, but the final decision and all
          enrollment choices are the responsibility of the user.
        </p>

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

export default DisclaimerPage;
