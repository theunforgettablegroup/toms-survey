import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const staleAuthKeys = Object.keys(window.localStorage).filter(
      (key) => key.startsWith('sb-') && key.endsWith('-auth-token')
    );

    staleAuthKeys.forEach((key) => {
      window.localStorage.removeItem(key);
    });

    window.localStorage.removeItem('supabase.auth.token');
    window.sessionStorage.removeItem('supabase.auth.token');
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <Component {...pageProps} />
    </>
  );
}
