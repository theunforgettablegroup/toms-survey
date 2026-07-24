import React from 'react';
import { useRouter } from 'next/router';
import { AnalyticsBanner } from '../components/AnalyticsBanner';
import AppButton from '../components/AppButton';
import CenteredPanelPage from '../components/CenteredPanelPage';
import { toast } from 'sonner';

const Landing: React.FC = () => {
  const router = useRouter();

  const handleStart = async () => {
    toast.info('Starting survey...');
    const didNavigate = await router.push('/survey');
    if (!didNavigate) {
      toast.error('Unable to open the survey right now.');
    }
  };

  return (
    <>
      <AnalyticsBanner />
      <CenteredPanelPage
        title="Coverage Explorer"
        description="Help people explore extra medical coverage options and find the plan fit that matches their needs."
      >
        <AppButton onClick={handleStart} style={{ padding: '0.875rem 2rem' }}>
          Start Exploring
        </AppButton>
      </CenteredPanelPage>
    </>
  );
};

export default Landing;
