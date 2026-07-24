import React, { useState } from 'react';
import AppButton from './AppButton';
import OutcomeIdentity from './OutcomeIdentity';
import { DEFAULT_OUTCOME_KEY, OUTCOME_CATALOG } from '../data/outcomes';

type ProfileCardProps = {
  type: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ type }) => {
  const outcome = OUTCOME_CATALOG[type] || OUTCOME_CATALOG[DEFAULT_OUTCOME_KEY];
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        perspective: '1200px',
        maxWidth: 420,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 370,
          transition: 'transform 0.6s cubic-bezier(.4,2,.3,1)',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}
      >
        {/* Front Side */}
        <div
          style={{
            background: '#f8fafc',
            borderRadius: '1.25rem',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.12)',
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <OutcomeIdentity
            outcome={outcome}
            badgeSize={88}
            titleElement="h3"
            titleFontSize="1.3rem"
            summaryMarginBottom="0"
          />
          <div style={{ marginTop: '0.75rem', color: '#888', fontSize: '0.95rem' }}>
            <AppButton
              onClick={() => setFlipped(true)}
              variant="ghost"
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
              }}
            >
              View details
            </AppButton>
          </div>
        </div>
        {/* Back Side */}
        <div
          style={{
            background: '#ecfeff',
            borderRadius: '1.25rem',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.12)',
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3
            style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1rem' }}
          >
            {outcome.title}
          </h3>
          <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.5 }}>{outcome.details}</p>
          <AppButton onClick={() => setFlipped(false)} style={{ marginTop: '2rem' }}>
            Back
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
