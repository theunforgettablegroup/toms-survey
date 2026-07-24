import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import AppButton from '../components/AppButton';
import PageShell from '../components/PageShell';
import ProfileCard from '../components/ProfileCard';
import SurfaceCard from '../components/SurfaceCard';
import { toast } from 'sonner';

const mainColors = {
  primary: '#0f766e',
  primarySoft: '#ccfbf1',
  dark: '#0f172a',
  body: '#334155',
  white: '#FFFFFF',
};

const Results: React.FC = () => {
  const router = useRouter();
  const { outcome, profile } = router.query;
  const resolvedOutcome = (outcome || profile) as string | undefined;
  const hasShownNoOutcomeToast = useRef(false);

  useEffect(() => {
    if (!resolvedOutcome && !hasShownNoOutcomeToast.current) {
      toast.info('No outcome was found. Complete the survey to generate a result.');
      hasShownNoOutcomeToast.current = true;
    }
  }, [resolvedOutcome]);

  const handleRestart = async () => {
    toast.success('Starting a new survey...');
    const didNavigate = await router.push('/');
    if (!didNavigate) {
      toast.error('Unable to restart right now.');
    }
  };

  const handleViewAllProfiles = async () => {
    if (!resolvedOutcome) {
      toast.info('Viewing all outcomes without a selected result.');
    }

    const targetRoute = resolvedOutcome
      ? `/all-profiles?outcome=${resolvedOutcome}`
      : '/all-profiles';

    const didNavigate = await router.push(targetRoute);
    if (!didNavigate) {
      toast.error('Unable to open outcomes right now.');
    }

    if (resolvedOutcome) {
      toast.success('Showing all outcomes.');
    }
  };

  return (
    <PageShell style={{ position: 'relative' }}>
      <SurfaceCard maxWidth={420} textAlign="center">
        <h1
          style={{
            color: mainColors.primary,
            fontWeight: 700,
            fontSize: '2rem',
            marginBottom: '2rem',
            letterSpacing: '0.02em',
          }}
        >
          Your Coverage Match
        </h1>
        {resolvedOutcome ? (
          <ProfileCard type={resolvedOutcome} />
        ) : (
          <p style={{ color: mainColors.dark }}>
            No match data is available yet. Please complete the coverage explorer.
          </p>
        )}
        <div style={{ maxWidth: 900, margin: '2rem auto' }}>
          <p style={{ textAlign: 'center', color: mainColors.body, marginBottom: '2rem' }}>
            This view shows one of three coverage paths so people can quickly compare the right
            extra medical coverage direction for their situation.
          </p>
        </div>
        {/* Desktop/Tablet buttons */}
        <div
          className="results-buttons-desktop"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginTop: '2rem',
          }}
        >
          <AppButton
            onClick={handleRestart}
            variant="secondary"
            fullWidth
            style={{ fontWeight: 700 }}
          >
            Restart Explorer
          </AppButton>
          <AppButton onClick={handleViewAllProfiles} fullWidth style={{ fontWeight: 700 }}>
            View All Coverage Paths
          </AppButton>
        </div>
      </SurfaceCard>
      {/* Mobile-only sticky button container */}
      <div
        className="results-buttons-mobile"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.97)',
          boxShadow: '0 -2px 16px rgba(0,0,0,0.08)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          zIndex: 100,
          maxWidth: 420,
          margin: '0 auto',
          // Hide on desktop/tablet
          // display: 'none',
        }}
      >
        <AppButton
          onClick={handleRestart}
          variant="secondary"
          fullWidth
          style={{ fontWeight: 700 }}
        >
          Restart Explorer
        </AppButton>
        <AppButton onClick={handleViewAllProfiles} fullWidth style={{ fontWeight: 700 }}>
          View All Coverage Paths
        </AppButton>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .results-buttons-desktop {
            display: none !important;
          }
          .results-buttons-mobile {
            display: flex !important;
          }
        }
        @media (min-width: 601px) {
          .results-buttons-mobile {
            display: none !important;
          }
        }
      `}</style>
    </PageShell>
  );
};

export default Results;
