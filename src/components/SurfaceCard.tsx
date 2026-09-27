import React from 'react';
import { theme } from '../styles/theme';

type SurfaceCardProps = {
  children: React.ReactNode;
  id?: string;
  maxWidth?: number | string;
  padding?: string;
  textAlign?: React.CSSProperties['textAlign'];
  borderRadius?: string;
  boxShadow?: string;
  style?: React.CSSProperties;
};

const SurfaceCard: React.FC<SurfaceCardProps> = ({
  children,
  id,
  maxWidth,
  padding = '2rem 1.5rem',
  textAlign = 'left',
  borderRadius = '1.5rem',
  boxShadow = '0 8px 32px rgba(0,0,0,0.12)',
  style,
}) => {
  return (
    <div
      id={id}
      style={{
        background: theme.colors.surface,
        width: '100%',
        maxWidth,
        padding,
        textAlign,
        borderRadius,
        boxShadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default SurfaceCard;
