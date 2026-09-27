import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppButton from '../components/AppButton';
import PageShell from '../components/PageShell';
import OutcomeIdentity from '../components/OutcomeIdentity';
import ProfileCard from '../components/ProfileCard';
import RecommendedNextSteps from '../components/RecommendedNextSteps';
import SurfaceCard from '../components/SurfaceCard';
import { DEFAULT_OUTCOME_KEY, OUTCOME_CATALOG } from '../data/outcomes';
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
  const outcomeData =
    OUTCOME_CATALOG[resolvedOutcome || DEFAULT_OUTCOME_KEY] || OUTCOME_CATALOG[DEFAULT_OUTCOME_KEY];
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

  const handlePrint = () => {
    if (!resolvedOutcome) {
      toast.info('Complete the survey first to print your result.');
      return;
    }

    window.print();
  };

  return (
    <PageShell id='results-page-shell' style={{ position: 'relative' }}>
      <SurfaceCard
        id='results-print-surface'
        maxWidth={420}
        textAlign='center'
        style={{ position: 'relative' }}
      >
        <div id='results-print-layout' className='results-print' aria-hidden='true'>
          <div id='results-print-header' style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <p
              style={{
                color: mainColors.primary,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Coverage Explorer Result
            </p>
            <h1 style={{ color: mainColors.dark, fontSize: '2rem', margin: 0 }}>
              Your Coverage Match
            </h1>
          </div>

          <div
            id='results-print-front-card'
            style={{
              marginBottom: '1.5rem',
              padding: '1.25rem',
              borderRadius: '1.25rem',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              textAlign: 'center',
            }}
          >
            <OutcomeIdentity
              outcome={outcomeData}
              badgeSize={88}
              titleElement='h2'
              titleFontSize='1.6rem'
              summaryFontSize='1.05rem'
              summaryMarginBottom='0'
            />
          </div>

          <div
            id='results-print-back-copy'
            style={{ textAlign: 'left', color: mainColors.body, lineHeight: 1.7 }}
          >
            <h2 style={{ color: mainColors.dark, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              What this means
            </h2>
            <p style={{ marginTop: 0 }}>{outcomeData.summary}</p>
            <p style={{ marginBottom: 0 }}>{outcomeData.details}</p>
          </div>

          <RecommendedNextSteps id='results-print-next-step' variant='print' />
        </div>

        <div id='results-screen-layout' className='results-screen'>
          <h1
            id='results-screen-title'
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

          <div id='results-screen-card'>
            {resolvedOutcome ? (
              <ProfileCard type={resolvedOutcome} />
            ) : (
              <p style={{ color: mainColors.dark }}>
                No match data is available yet. Please complete the coverage explorer.
              </p>
            )}
          </div>

          <div id='results-screen-summary' style={{ maxWidth: 900, margin: '2rem auto' }}>
            <div
              id='results-screen-details'
              style={{
                display: 'grid',
                gap: '1rem',
                marginBottom: '2rem',
                textAlign: 'left',
              }}
            >
              <div
                id='results-screen-disclaimer'
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '1rem',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                }}
              >
                <h2 style={{ color: mainColors.dark, fontSize: '1.05rem', marginTop: 0 }}>
                  Disclaimer
                </h2>
                {/* <p style={{ color: mainColors.body, lineHeight: 1.6, marginBottom: '1rem' }}>
                  A short note on how to use this survey responsibly.
                </p> */}
                <Link
                  href='/results/disclaimer'
                  style={{ color: mainColors.primary, fontWeight: 600 }}
                >
                  Read the full disclaimer
                </Link>
              </div>

              <div
                id='results-screen-explanation'
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '1rem',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                }}
              >
                <div id='results-screen-explanation-copy'>
                  <h2 style={{ color: mainColors.dark, fontSize: '1.05rem', marginTop: 0 }}>
                    Explanation of Survey Results
                  </h2>
                  {/* <p style={{ color: mainColors.body, lineHeight: 1.6, marginBottom: '1rem' }}>
                    A quick overview of how your answers turn into a Medicare recommendation.
                  </p> */}

                  <Link
                    href='/results/explanation'
                    style={{ color: mainColors.primary, fontWeight: 600 }}
                  >
                    Read the explanation
                  </Link>
                </div>
              </div>

              <div
                id='results-screen-next-steps'
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '1rem',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                }}
              >
                <div id='results-screen-next-steps-copy'>
                  <h2 style={{ color: mainColors.dark, fontSize: '1.05rem', marginTop: 0 }}>
                    Recommended Next Steps
                  </h2>
                  <p style={{ color: mainColors.body, lineHeight: 1.6, marginBottom: 0 }}>
                    The full next-step guidance is available in the printable view.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            id='results-screen-actions-desktop'
            className='results-buttons-desktop'
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              marginTop: '2rem',
            }}
          >
            <AppButton onClick={handlePrint} fullWidth style={{ fontWeight: 700 }}>
              Print Results
            </AppButton>
            <AppButton
              onClick={handleRestart}
              variant='secondary'
              fullWidth
              style={{ fontWeight: 700 }}
            >
              Restart Explorer
            </AppButton>
            <AppButton onClick={handleViewAllProfiles} fullWidth style={{ fontWeight: 700 }}>
              View All Coverage Paths
            </AppButton>
          </div>
        </div>
      </SurfaceCard>

      <div
        id='results-screen-actions-mobile'
        className='results-buttons-mobile'
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
        }}
      >
        <AppButton onClick={handlePrint} fullWidth style={{ fontWeight: 700 }}>
          Print Results
        </AppButton>
        <AppButton
          onClick={handleRestart}
          variant='secondary'
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
        .results-print {
          display: none;
        }

        .results-screen {
          display: block;
        }

        @media (max-width: 600px) {
          #results-screen-actions-desktop {
            display: none !important;
          }

          #results-screen-actions-mobile {
            display: flex !important;
          }
        }

        @media (min-width: 601px) {
          #results-screen-actions-mobile {
            display: none !important;
          }
        }

        @media print {
          @page {
            margin: 0.6in;
            background: #ffffff !important;
          }

          body {
            background: #ffffff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          #results-print-surface {
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
          }

          #results-page-shell {
            background: #ffffff !important;
          }

          #results-screen-layout,
          #results-screen-actions-desktop,
          #results-screen-actions-mobile {
            display: none !important;
          }

          #results-print-layout {
            display: block !important;
            padding: 0 !important;
          }

          #results-print-layout,
          #results-print-layout * {
            background: transparent !important;
            box-shadow: none !important;
          }

          #results-print-front-card,
          #results-print-next-step {
            border: 1px solid #cbd5e1 !important;
            border-radius: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          #results-print-next-step {
            margin-top: 1.5rem !important;
          }
        }
      `}</style>
    </PageShell>
  );
};

export default Results;
