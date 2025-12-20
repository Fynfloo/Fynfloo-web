'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  CheckCircle,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, rootDomain, protocol } from '@/lib/utils';

import { TEMPLATE_REGISTRY } from '@/lib/templates/registry';
import { BusinessType } from '@/lib/storefront/types';
import { set } from 'zod';

type Step = 1 | 2 | 3 | 4;

const steps = [
  { id: 1, title: 'Store details' },
  { id: 2, title: 'Business type' },
  { id: 3, title: 'Template' },
  { id: 4, title: 'Done' },
];

export default function StoreCreationFlow() {
  const [step, setStep] = useState<Step>(1);
  const [creating, setCreating] = useState<boolean>(false);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [createdStoreId, setCreatedStoreId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    storeName: '',
    subdomain: '',
    businessType: '' as BusinessType | '',
    templateKey: '',
  });

  const [subdomainStatus, setSubdomainStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    error: string | null;
  }>({
    checking: false,
    available: null,
    error: null,
  });

  /* --------------------------------------------
   Auto-generate slug
  --------------------------------------------- */
  useEffect(() => {
    if (createdSlug) return;

    const rawName = form.storeName.trim();

    if (!rawName) {
      setForm((f) => ({ ...f, subdomain: '' }));
      return;
    }

    const slug = rawName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setForm((f) => ({ ...f, subdomain: slug }));
  }, [form.storeName, createdSlug]);

  /* --------------------------------------------
   Check subdomain availability
  --------------------------------------------- */

  useEffect(() => {
    if (!form.subdomain) {
      setSubdomainStatus({ checking: false, available: null, error: null });
      return;
    }
    setSubdomainStatus({
      checking: true,
      available: null,
      error: null,
    });

    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/tenant/check-subdomain?subdomain=${encodeURIComponent(
            form.subdomain
          )}`
        );
        const data = await res.json();
        setSubdomainStatus({
          checking: false,
          available: !!data.available,
          error: res.ok ? null : data.error,
        });
      } catch {
        setSubdomainStatus({
          checking: false,
          available: null,
          error: 'Error checking subdomain',
        });
      }
    }, 400);

    return () => clearTimeout(t);
  }, [form.subdomain]);

  /* --------------------------------------------
   Filter templates (HARD FILTER)
  --------------------------------------------- */
  const availableTemplates = useMemo(() => {
    if (!form.businessType) return [];
    return TEMPLATE_REGISTRY.filter(
      (t) => t.businessType === form.businessType
    );
  }, [form.businessType]);

  /* --------------------------------------------
   Step validation guards
  --------------------------------------------- */

  const canGoStep1 =
    form.storeName.trim() &&
    form.subdomain.trim() &&
    subdomainStatus.available === true &&
    !subdomainStatus.checking;

  const canGoStep2 = !!form.businessType;
  const canGoStep3 = !!form.templateKey;

  const canContinue =
    (step === 1 && canGoStep1) ||
    (step === 2 && canGoStep2) ||
    (step === 3 && canGoStep3);

  /* --------------------------------------------
   Navigation
  --------------------------------------------- */

  const next = async () => {
    setError(null);

    if (
      (step === 1 && !canGoStep1) ||
      (step === 2 && !canGoStep2) ||
      (step === 3 && !canGoStep3)
    ) {
      return;
    }

    if (step === 3) {
      try {
        setCreating(true);
        const res = await fetch('/api/tenant/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            storeName: form.storeName,
            subdomain: form.subdomain,
            businessType: form.businessType,
            templateKey: form.templateKey,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.ok) {
          setError(data.error || 'Error creating store');
          setCreating(false);
          return;
        }
        setCreatedSlug(data.slug);
        setCreatedStoreId(data.storeId);
        setCreating(false);
        setStep(4);
        return;
      } catch {
        setError('Unexpected error creating store');
        setCreating(false);
        return;
      }
    }
    setStep((s) => (s + 1) as Step);
  };

  const prev = () => step > 1 && setStep((s) => (s - 1) as Step);

  /* --------------------------------------------
   Render
  --------------------------------------------- */

  return (
    <div className="w-full space-y-6">
      {/* Step indicators */}
      <div className="flex justify-between">
        {steps.map((s) => (
          <div key={s.id} className="flex-1 text-center">
            <div
              className={cn(
                'mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm',
                step >= s.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary'
              )}
            >
              {s.id}
            </div>
            <p className="mt-1 text-xs">{s.title}</p>
          </div>
        ))}
      </div>
      <Card>
        <CardContent className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Store name */}
              <div className="space-y-1">
                <Label>Store name</Label>
                <Input
                  placeholder="e.g. Mike Fashion Hub"
                  className="w-full md:w-[50%]"
                  value={form.storeName}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      storeName: e.target.value,
                    }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  This is the name customers will see.
                </p>
              </div>
              {/* Derived subdomain */}
              <div className="space-y-1">
                <Label>Your store address</Label>
                <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm bg-muted w-full md:w-[50%]">
                  <span className="font-mono">
                    {form.subdomain || 'your-store'}.{rootDomain}
                  </span>
                  {subdomainStatus.checking && (
                    <span className="text-muted-foreground text-xs">
                      Checking...
                    </span>
                  )}
                  {subdomainStatus.available === true && (
                    <span className="text-primary text-xs">Available</span>
                  )}
                  {subdomainStatus.available === false && (
                    <span className="text-destructive text-xs">
                      Unavailable
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  This address is generated automatically and can’t include
                  spaces or symbols.
                </p>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-1">
              <Label>Business Type</Label>
              <Select
                value={form.businessType}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    businessType: v as BusinessType,
                    templateKey: '',
                  })
                }
              >
                <SelectTrigger className="w-full md:w-[320px]">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 3 && (
            <>
              <Label>Choose Template</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableTemplates.map((tpl) => (
                  <Card
                    key={tpl.key}
                    onClick={() => setForm({ ...form, templateKey: tpl.key })}
                    className={cn(
                      'cursor-pointer p-4 transition',
                      form.templateKey === tpl.key && 'ring-2 ring-primary'
                    )}
                  >
                    <LayoutDashboard className=" mb-2" />
                    <p className="font-medium">{tpl.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {tpl.description}
                    </p>
                  </Card>
                ))}
              </div>
            </>
          )}
          {step === 4 && (
            <div className="text-center space-y-4 py-6">
              <CheckCircle className="h-12 w-12 mx-auto text-primary" />
              <h2 className="text-xl font-semibold">Your store is ready</h2>
              <p className="text-sm text-muted-foreground">
                You can manage your store, customise pages, and add products
                from your dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <a href={`/dashboard/stores/${createdStoreId}`}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Go to Dashboard
                  </a>
                </Button>
                {createdSlug && (
                  <Button variant="outline" asChild>
                    <a
                      href={`${protocol}://${createdSlug}.${rootDomain}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      View Store
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        {step < 4 && (
          <Button variant="outline" onClick={prev} disabled={step === 1}>
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
        )}

        {step < 4 && (
          <Button
            onClick={next}
            disabled={!canContinue || creating}
            className={cn(
              'transition',
              (!canContinue || creating) && 'cursor-not-allowed opacity-50'
            )}
          >
            Continue <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
