import React from 'react';
import type { SurveyOutcome } from '../data/outcomes';

type OutcomeIdentityProps = {
  outcome: SurveyOutcome;
  badgeSize?: number;
  showBadge?: boolean;
  titleElement?: 'h2' | 'h3';
  titleFontSize?: string;
  summaryFontSize?: string;
  align?: React.CSSProperties['textAlign'];
  summaryMarginBottom?: string;
};

const OutcomeIdentity: React.FC<OutcomeIdentityProps> = ({
  outcome,
  badgeSize = 72,
  showBadge = true,
  titleElement = 'h2',
  titleFontSize = '1.25rem',
  summaryFontSize = '1rem',
  align = 'center',
  summaryMarginBottom = '0.5rem',
}) => {
  const TitleTag = titleElement;

  return (
    <>
      {showBadge ? (
        <div
          style={{
            width: badgeSize,
            height: badgeSize,
            borderRadius: '999px',
            background: '#0f766e',
            color: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: `${badgeSize / 48}rem`,
            margin: '0 auto 1rem',
          }}
        >
          {outcome.title[0]}
        </div>
      ) : null}
      <TitleTag
        style={{
          color: '#0f172a',
          fontSize: titleFontSize,
          margin: showBadge ? '0.5rem 0' : '0 0 0.5rem',
          textAlign: align,
        }}
      >
        {outcome.title}
      </TitleTag>
      <p
        style={{
          color: '#334155',
          fontSize: summaryFontSize,
          textAlign: align,
          marginBottom: summaryMarginBottom,
          lineHeight: 1.5,
        }}
      >
        {outcome.summary}
      </p>
    </>
  );
};

export default OutcomeIdentity;
