import React from 'react';
import { theme } from '../styles/theme';

type PageShellProps = {
  children: React.ReactNode;
  centered?: boolean;
  padding?: string;
  style?: React.CSSProperties;
};

const PageShell: React.FC<PageShellProps> = ({
  children,
  centered = false,
  padding = '2rem 1rem',
  style,
}) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.muted} 100%)`,
        fontFamily: theme.fonts.main,
        padding,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: centered ? 'center' : 'flex-start',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default PageShell;
