import React from 'react';
import { theme } from '../styles/theme';
import PageShell from './PageShell';
import SurfaceCard from './SurfaceCard';

type CenteredPanelPageProps = {
  title: string;
  description: string;
  secondaryDescription?: string;
  children?: React.ReactNode;
  headerContent?: React.ReactNode;
  panelMaxWidth?: number;
};

const CenteredPanelPage: React.FC<CenteredPanelPageProps> = ({
  title,
  description,
  secondaryDescription,
  children,
  headerContent,
  panelMaxWidth = 560,
}) => {
  return (
    <PageShell centered padding="0 1rem">
      <SurfaceCard
        maxWidth={panelMaxWidth}
        textAlign="center"
        borderRadius="1rem"
        boxShadow="0 12px 28px rgba(15, 23, 42, 0.12)"
      >
        {headerContent}
        <h1
          style={{
            fontSize: '2rem',
            color: theme.colors.text,
            marginBottom: '0.75rem',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: '#334155',
            marginBottom: secondaryDescription ? '1rem' : 0,
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
        {secondaryDescription ? (
          <p style={{ color: '#64748b', marginBottom: children ? '1.5rem' : 0, lineHeight: 1.5 }}>
            {secondaryDescription}
          </p>
        ) : null}
        {children}
      </SurfaceCard>
    </PageShell>
  );
};

export default CenteredPanelPage;
