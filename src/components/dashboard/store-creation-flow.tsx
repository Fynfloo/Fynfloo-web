'use client';

import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Store,
  Globe,
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

const steps = [
  { id: 1, title: 'Store Details' },
  { id: 2, title: 'Choose Category' },
  { id: 3, title: 'Template' },
  { id: 4, title: 'Done' },
];

const categories = [
  'Fashion',
  'Food & Drinks',
  'Education',
  'Technology',
  'Beauty',
  'General Store',
];

// TODO: Review the steps and their content
export default function StoreCreationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    storeName: '',
    subdomain: '',
    category: '',
    template: 'default',
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

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Auto-generate subdomain from store name
  useEffect(() => {
    if (formData.storeName && !createdSlug) {
      const clean = formData.storeName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData((prev) => ({ ...prev, subdomain: clean }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.storeName]);

  // Check subdomain availability (debounced)
  useEffect(() => {
    if (!formData.subdomain) {
      setSubdomainStatus({ checking: false, available: null, error: null });
      return;
    }

    setSubdomainStatus((prev) => ({
      ...prev,
      checking: true,
      error: null,
    }));

    const handle = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/tenant/check-subdomain?subdomain=${encodeURIComponent(
            formData.subdomain
          )}`
        );
        const data = await res.json();
        if (!res.ok) {
          setSubdomainStatus({
            checking: false,
            available: null,
            error: data.error || 'Error checking subdomain',
          });
        } else {
          setSubdomainStatus({
            checking: false,
            available: data.available,
            error: null,
          });
        }
      } catch (err) {
        console.error(err);
        setSubdomainStatus({
          checking: false,
          available: null,
          error: 'Failed to check subdomain',
        });
      }
    }, 400);

    return () => clearTimeout(handle);
  }, [formData.subdomain]);


  const canGoNextFromStep1 =
    formData.storeName.trim().length > 0 &&
    formData.subdomain.trim().length > 0 &&
    subdomainStatus.available === true &&
    !subdomainStatus.checking;

  const next = async () => {
    setCreateError(null);

    if (currentStep === 1 && !canGoNextFromStep1) {
      return;
    }

    if (currentStep === 3) {
      // Create tenant
      try {
        setCreating(true);
        const res = await fetch('/api/tenant/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            storeName: formData.storeName,
            subdomain: formData.subdomain,
            category: formData.category,
            template: formData.template,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          setCreateError(data.error || 'Failed to create store');
          setCreating(false);
          return;
        }
        setCreatedSlug(data.slug);
        setCreating(false);
      } catch (err) {
        console.error(err);
        setCreateError('Unexpected error creating store');
        setCreating(false);
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prev = () => {
    currentStep > 1 && setCurrentStep((prev) => prev - 1);
  };

  // Render steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Store Name</Label>
              <Input
                placeholder="e.g. Mike Fashion Hub"
                value={formData.storeName}
                onChange={(e) =>
                  setFormData({ ...formData, storeName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Subdomain</Label>
              <Input
                placeholder="mike-fashion-hub"
                value={formData.subdomain}
                onChange={(e) =>
                  setFormData({ ...formData, subdomain: e.target.value })
                }
              />

              <p className="mt-1 text-sm text-muted-foreground">
                Your store will live at:
                <span className="font-medium">
                  {' '}
                  {formData.subdomain || 'yourstore'}.{rootDomain}
                </span>
              </p>

              <p className="mt-1 text-xs">
                {subdomainStatus.checking && (
                  <span className="text-muted-foreground">
                    checking availability...
                  </span>
                )}
                {!subdomainStatus.checking &&
                  subdomainStatus.available === true && (
                    <span className="text-primary">Subdomain available</span>
                  )}
                {!subdomainStatus.checking &&
                  subdomainStatus.available === false && (
                    <span className="text-destructive">
                      This subdomain is already taken
                    </span>
                  )}
                {subdomainStatus.error && (
                  <span className="text-destructive">
                    {subdomainStatus.error}
                  </span>
                )}
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-2">
            <Label>Store Category</Label>
            <Select
              value={formData.category}
              onValueChange={(v) => setFormData({ ...formData, category: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Label>Choose Template</Label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['default', 'hero', 'minimal'].map((tpl) => (
                <Card
                  key={tpl}
                  onClick={() => setFormData({ ...formData, template: tpl })}
                  className={`cursor-pointer border p-4 text-center transition ${
                    formData.template === tpl ? 'ring-2 ring-ring' : ''
                  }`}
                >
                  <LayoutDashboard className="mx-auto mb-2" />
                  <p className="capitalize">{tpl} template</p>
                </Card>
              ))}
            </div>
            {createError && (
              <p className="text-sm text-destructive">{createError}</p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center py-10">
            <Check className="h-12 w-12 mx-auto text-primary" />
            <h2 className="text-xl font-semibold">Store Created!</h2>
            <p className="text-muted-foreground">
              Your store has been set up successfully.
            </p>
            {createdSlug && (
              <Button asChild className="mt-4">
                <a
                  href={`${protocol}://${createdSlug}.${rootDomain}/dashboard`}
                >
                  <Store className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </a>
              </Button>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full p-6">
      {/* Step indicators */}
      <div className="mb-6 flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex-1 text-center">
            <div
              className={cn(
                'mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm',
                currentStep >= step.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              )}
            >
              {step.id}
            </div>
            <p className="mt-1 text-xs">{step.title}</p>
          </div>
        ))}
      </div>

      {/* Step content */}
      <Card>
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={prev} disabled={currentStep === 1}>
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        {currentStep < 4 && (
          <Button onClick={next}>
            Continue <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
