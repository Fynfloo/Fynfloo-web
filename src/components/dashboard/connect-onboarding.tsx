'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  CircleDashed,
  Loader2,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { LoadingOverlay } from '../ui/loading-overlay';
import { StatusItem } from '../ui/status-item';
import { Separator } from '../ui/separator';

type AccountStatusData = {
  id: string | null;
  payoutsEnabled: boolean;
  chargesEnabled: boolean;
  detailsSubmitted: boolean;
};

type Phase = 'NO_ACCOUNT' | 'NEEDS_ONBOARDING' | 'ACTIVE';

export function ConnectOnboarding({ storeId }: { storeId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [accountStatus, setAccountStatus] = useState<AccountStatusData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  const fetchAccountStatus = async () => {
    try {
      const res = await fetch(
        `/api/dashboard/account-status?storeId=${storeId}`,
      );

      if (!res.ok) throw new Error();
      const data = await res.json();
      setAccountStatus(data);
      setError(null);
    } catch (error) {
      setError('Unable to load Stripe account status.');
    }
  };

  useEffect(() => {
    fetchAccountStatus();

    // Gentle polling while not active (feels good after returning from Stripe)
    const id = setInterval(() => {
      if (!accountStatus?.chargesEnabled) {
        fetchAccountStatus();
      }
    });
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountStatus?.chargesEnabled]);

  const phase: Phase = useMemo(() => {
    if (!accountStatus?.id) return 'NO_ACCOUNT';
    if (accountStatus.chargesEnabled) return 'ACTIVE';
    return 'NEEDS_ONBOARDING';
  }, [accountStatus]);

  const statusLabel =
    phase === 'ACTIVE'
      ? 'Active'
      : phase === 'NEEDS_ONBOARDING'
        ? 'Action Required'
        : 'Not Connected';

  const statusVariant =
    phase === 'ACTIVE'
      ? 'default'
      : phase === 'NEEDS_ONBOARDING'
        ? 'secondary'
        : 'outline';

  // -------------------------------
  // Actions
  // -------------------------------

  const handleCreateAccount = async () => {
    try {
      setLoading(true);
      setError(null);

      const createRes = await fetch(
        `/api/dashboard/create-connect-account?storeId=${storeId}`,
        {
          method: 'POST',
        },
      );
      if (!createRes.ok) {
        throw new Error();
      }
      await fetchAccountStatus();
    } catch (error) {
      setError('Failed to create Stripe account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOnboarding = async () => {
    try {
      setLoading(true);
      setError(null);

      const onboardingRes = await fetch(
        `/api/dashboard/create-account-link?storeId=${storeId}`,
        {
          method: 'POST',
        },
      );
      if (!onboardingRes.ok) {
        throw new Error();
      }
      const { url } = await onboardingRes.json();

      if (!url) {
        throw new Error();
      }
      window.location.href = url;
    } catch (error) {
      setError('Failed to start Stripe onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  //TODO: We need to wire this
  const handleOpenStripe = async () => {
    try {
      setLoading(true);
      setError(null);

      // Best practice: create a login link server-side (Express dashboard)
      const res = await fetch(
        `/api/dashboard/create-login-link?storeId=${storeId}`,
        { method: 'POST' },
      );

      if (!res.ok) throw new Error();
      const { url } = await res.json();
      if (!url) throw new Error();

      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      setError('Unable to open Stripe dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // UI helpers
  // ---------------------------
  const StepIcon = ({ state }: { state: 'done' | 'current' | 'locked' }) => {
    if (state === 'done')
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (state === 'current')
      return <CircleDashed className="h-5 w-5 text-primary" />;
    return <CircleDashed className="h-5 w-5 text-muted-foreground" />;
  };

  const step1State = phase === 'NO_ACCOUNT' ? 'current' : 'done';

  const step2State =
    phase === 'NO_ACCOUNT'
      ? 'locked'
      : phase === 'NEEDS_ONBOARDING'
        ? 'current'
        : 'done';

  return (
    <Card className="relative overflow-hidden border-l-4 border-l-primary">
      <LoadingOverlay show={loading} />

      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Payments</CardTitle>
            <CardDescription className="mt-1 space-y-1">
              <p>Secure payments powered by Stripe.</p>
              <p className="text-xs text-muted-foreground">
                You’ll complete verification securely on Stripe’s website.
              </p>
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={statusVariant}>{statusLabel}</Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={fetchAccountStatus}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Refresh'
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <StatusItem
            label="Payouts enabled"
            value={accountStatus?.payoutsEnabled}
          />
          <StatusItem
            label="Charges enabled"
            value={accountStatus?.chargesEnabled}
          />
          <StatusItem
            label="Details submitted"
            value={accountStatus?.detailsSubmitted}
          />
        </div>
        <Separator />

        {/* Steps */}
        {phase !== 'ACTIVE' ? (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Setup steps</h3>
            <div className="space-y-3">
              {/* Step 1 */}
              <div
                className={[
                  'flex gap-3 rounded-lg border p-4',
                  step1State === 'current' ? 'bg-muted/40' : 'opacity-80',
                ].join(' ')}
              >
                <div className="mt-0.5">
                  <StepIcon state={step1State} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-sm">
                        Step 1 — Create your Stripe account
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This creates your Stripe Connect account for payouts and
                        verification.
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      onClick={handleCreateAccount}
                      disabled={loading || phase !== 'NO_ACCOUNT'}
                    >
                      {loading && phase === 'NO_ACCOUNT' && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {phase === 'NO_ACCOUNT' ? 'Create Account' : 'Completed'}
                    </Button>
                  </div>
                </div>
              </div>
              {/* Step 2 */}
              <div
                className={[
                  'flex gap-3 rounded-lg border p-4',
                  step2State === 'current' ? 'bg-muted/40' : '',
                  phase === 'NO_ACCOUNT'
                    ? 'opacity-50 pointer-events-none'
                    : '',
                ].join(' ')}
              >
                <div className="mt-0.5">
                  <StepIcon state={step2State} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-sm">
                        Step 2 — Complete onboarding on Stripe
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Add your business details and verify your identity.
                        Until this is completed, your store can’t receive
                        payments.
                      </p>
                    </div>

                    <Button
                      onClick={handleStartOnboarding}
                      disabled={loading || phase === 'NO_ACCOUNT'}
                    >
                      {loading && phase !== 'NO_ACCOUNT' && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Start onboarding
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Tip: After finishing Stripe onboarding, you’ll return here
              automatically and we’ll update your status.
            </p>
          </div>
        ) : (
          // ACTIVE state UI
          <div className="flex items-start justify-between gap-4 rounded-lg border p-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Payments are active</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your store is ready to accept payments. You can manage payouts
                  and business details in Stripe.
                </p>
              </div>
            </div>

            <Button onClick={handleOpenStripe} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ExternalLink className="mr-2 h-4 w-4" />
              )}
              Open Stripe dashboard
            </Button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
