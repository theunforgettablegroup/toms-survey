import React from 'react';
import { useRouter } from 'next/router';
import AppButton from '../components/AppButton';
import OutcomeIdentity from '../components/OutcomeIdentity';
import PageShell from '../components/PageShell';
import SurfaceCard from '../components/SurfaceCard';
import { OUTCOME_CATALOG } from '../data/outcomes';

const AllProfiles: React.FC = () => {
  const router = useRouter();

  const { outcome, profile } = router.query;
  const selectedOutcome = (outcome || profile) as string | undefined;

  const handleBack = async () => {
    if (selectedOutcome) {
      await router.push(`/results?outcome=${selectedOutcome}`);
    } else {
      await router.push('/results');
    }
  };

  return (
    <PageShell padding='1rem'>
      <AppButton
        onClick={handleBack}
        style={{ display: 'block', margin: '0 auto 2rem auto', fontWeight: 700 }}
      >
        Back to Results
      </AppButton>

      <SurfaceCard maxWidth={980} boxShadow='0 8px 32px rgba(0,0,0,0.08)'>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', color: '#334155', marginBottom: '2rem' }}>
            These coverage paths are designed to help people exploring medical coverage find the
            right direction before comparing plans in detail.
          </p>
        </div>
        <h1
          style={{ textAlign: 'center', color: '#0f172a', marginBottom: '2rem', fontSize: '2rem' }}
        >
          Coverage Paths
        </h1>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            justifyContent: 'center',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          {Object.values(OUTCOME_CATALOG).map((item) => (
            <div
              key={item.key}
              style={{
                background: '#fff',
                borderRadius: '1.25rem',
                boxShadow: '0 10px 24px rgba(15,23,42,0.08)',
                padding: '1.5rem',
                width: '100%',
                maxWidth: 320,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <OutcomeIdentity outcome={item} />
              <p style={{ color: '#1e293b', fontSize: '0.95rem', textAlign: 'center' }}>
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </PageShell>
  );
};

export default AllProfiles;
