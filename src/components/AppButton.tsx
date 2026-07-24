import React from 'react';
import { theme } from '../styles/theme';

type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
};

const variantStyles: Record<NonNullable<AppButtonProps['variant']>, React.CSSProperties> = {
  primary: {
    background: theme.colors.primary,
    color: '#f8fafc',
    border: 'none',
  },
  secondary: {
    background: '#ccfbf1',
    color: theme.colors.text,
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: theme.colors.primary,
    border: 'none',
    textDecoration: 'underline',
    boxShadow: 'none',
    padding: 0,
  },
};

const AppButton: React.FC<AppButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  style,
  children,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      style={{
        padding: variant === 'ghost' ? undefined : '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 600,
        borderRadius: variant === 'ghost' ? undefined : '0.75rem',
        boxShadow: variant === 'ghost' ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
        cursor: buttonProps.disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
        width: fullWidth ? '100%' : undefined,
        opacity: buttonProps.disabled ? 0.7 : 1,
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default AppButton;
