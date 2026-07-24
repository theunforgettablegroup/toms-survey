// Add at the top of your page component (e.g., in src/pages/results.tsx or index.tsx)
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const AnalyticsBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('hideAnalyticsBanner') === 'true') {
      setVisible(false);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('hideAnalyticsBanner', 'true');
  };

  if (!visible) return null;

  return (
    <div
      style={{
        background: '#ecfeff',
        color: '#0f172a',
        padding: '0.75rem 2rem',
        textAlign: 'center',
        fontSize: '0.95rem',
        borderBottom: '1px solid #a5f3fc',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <span>
        We collect anonymous analytics data (browser, device, and approximate location) to improve
        the coverage explorer experience.{' '}
        <Link href="/privacy-policy" style={{ color: '#0f172a', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
      </span>
      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#0f172a',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          cursor: 'pointer',
        }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
};
