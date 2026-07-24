import React from 'react';
import Link from 'next/link';
import AppButton from '../../components/AppButton';
import PageShell from '../../components/PageShell';
import SurfaceCard from '../../components/SurfaceCard';

const PrivacyPolicy: React.FC = () => {
  return (
    <PageShell padding="2rem 1rem">
      <div style={{ width: '100%', maxWidth: 640, marginBottom: '1rem', textAlign: 'right' }}>
        <Link href="/" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'underline' }}>
          Back to Home
        </Link>
      </div>

      <SurfaceCard
        maxWidth={640}
        style={{
          color: '#0f172a',
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ marginTop: 0 }}>Privacy Policy</h1>
        <p>
          We collect anonymous analytics data such as browser type, device information, screen size,
          and approximate location to improve the survey experience. No directly identifying
          personal information is collected by default.
        </p>
        <p>By completing the survey you agree to the collection of this anonymous data.</p>

        <div style={{ marginTop: '1.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <AppButton type="button" variant="secondary">
              Return to Landing Screen
            </AppButton>
          </Link>
        </div>
      </SurfaceCard>
    </PageShell>
  );
};

export default PrivacyPolicy;
