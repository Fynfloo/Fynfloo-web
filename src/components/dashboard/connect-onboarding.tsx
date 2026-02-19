'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { set } from 'zod';

type AccountStatusData = {
  id: string;
  payoutsEnabled: boolean;
  chargesEnabled: boolean;
  detailsSubmitted: boolean;
};

export function ConnectOnboarding({ storeId }: { storeId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [accountStatus, setAccountStatus] = useState<AccountStatusData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  const fetchAccountStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/dashboard/account-status?storeId=${storeId}`,
        {
          method: 'GET',
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to fetch account status');
        return;
      }
      const data = await res.json();
      setAccountStatus(data);
      setAccountId(data.id);
    } catch (error) {
      console.error('Error fetching account status:', error);
      setError('Error fetching account status');
      setAccountStatus(null);
      setAccountId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountStatus();

    // Set up interval to fetch every 5 seconds
    const intervalId = setInterval(fetchAccountStatus, 5000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [accountId, setAccountId]);

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
        setError('Failed to create Stripe account');
        return;
      }
      const data = await createRes.json();
      console.log('Stripe account created:', data);
    } catch (error) {
      console.error('Error creating Stripe account:', error);
      setError('Error creating Stripe account');
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
        setError('Failed to create onboarding link');
        return;
      }
      const { url } = await onboardingRes.json();

      if (!url) {
        console.error('Onboarding link URL is missing');
        setError('Onboarding link URL is missing');
        return;
      }
      window.location.href = url;
    } catch (error) {
      console.error('Error creating onboarding link:', error);
      setError('Error creating onboarding link');
    } finally {
      setLoading(false);
    }
  };

  const { payoutsEnabled, chargesEnabled, detailsSubmitted } =
    accountStatus || {};

  const statusColor = chargesEnabled ? 'green' : 'organge';
  const statusText = chargesEnabled ? 'Active' : 'Pending';

  return (
    <>
      <div>
        <h3>
          Account Status:{' '}
          <span style={{ color: statusColor }}>{statusText}</span>
        </h3>
      </div>

      <div className="status-details">
        <div className="status-item">
          <span>Account ID:</span>
          <span>{accountStatus?.id}</span>
        </div>
        <div className="status-item">
          <span>Payouts enabled:</span>
          <span>{accountStatus?.payoutsEnabled ? '✅' : '❌'}</span>
        </div>
        <div className="status-item">
          <span>Charges enabled:</span>
          <span>{accountStatus?.chargesEnabled ? '✅' : '❌'}</span>
        </div>
        <div className="status-item">
          <span>Details submitted:</span>
          <span>{accountStatus?.detailsSubmitted ? '✅' : '❌'}</span>
        </div>
      </div>
      <Button onClick={handleCreateAccount} disabled={loading}>
        {loading ? 'Connnecting...' : 'Connect Stripe Account'}
      </Button>

      <Button onClick={handleOnboarding} disabled={loading}>
        {loading ? 'Redirecting...' : 'Start Onboarding'}
      </Button>
    </>
  );
}
