'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

export function ConnectOnboarding({ storeId }: { storeId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const handleCreateAccount = async () => {
    try {
      setLoading(true);
      const createRes = await fetch(
        `/api/dashboard/create-connect-account?storeId=${storeId}`,
        {
          method: 'POST',
        },
      );
      if (!createRes.ok) {
        console.error('Failed to create Stripe account');
        return;
      }
      const data = await createRes.json();
      console.log('Stripe account created:', data);
    } catch (error) {
      console.error('Error creating Stripe account:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboarding = async () => {
    try {
      setLoading(true);
      const onboardingRes = await fetch(
        `/api/dashboard/create-account-link?storeId=${storeId}`,
        {
          method: 'POST',
        },
      );
      if (!onboardingRes.ok) {
        console.error('Failed to create onboarding link');
        return;
      }
      const { url } = await onboardingRes.json();

      if (!url) {
        console.error('Onboarding link URL is missing');
        return;
      }
      window.location.href = url;
    } catch (error) {
      console.error('Error creating onboarding link:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleCreateAccount} disabled={loading}>
        {loading ? 'Connnecting...' : 'Connect Stripe Account'}
      </Button>

      <Button onClick={handleOnboarding} disabled={loading}>
        {loading ? 'Redirecting...' : 'Start Onboarding'}
      </Button>
    </>
  );
}
