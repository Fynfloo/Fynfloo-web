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
import { cn } from '@/lib/utils';

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

  const [formData, setFormData] = useState({
    storeName: '',
    subdomain: '',
    category: '',
    template: 'default',
  });

  // Auto-generate subdomain from store name
  useEffect(() => {
    if (formData.storeName) {
      const clean = formData.storeName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      setFormData((prev) => ({ ...prev, subdomain: clean }));
    }
  }, [formData.storeName]);

  const next = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const prev = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  // Render steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Label>Store Name</Label>
            <Input
              placeholder="e.g. Mike Fashion Hub"
              value={formData.storeName}
              onChange={(e) =>
                setFormData({ ...formData, storeName: e.target.value })
              }
            />

            <Label>Subdomain</Label>
            <Input
              placeholder="mike-fashion-hub"
              value={formData.subdomain}
              onChange={(e) =>
                setFormData({ ...formData, subdomain: e.target.value })
              }
            />

            <p className="text-sm text-muted-foreground">
              Your store will live at:
              <span className="font-medium">
                {' '}
                {formData.subdomain || 'yourstore'}.yourdomain.com
              </span>
            </p>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
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
                    formData.template === tpl ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <LayoutDashboard className="mx-auto mb-2" />
                  <p className="capitalize">{tpl} template</p>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center py-10">
            <Check className="h-12 w-12 mx-auto text-green-600" />
            <h2 className="text-xl font-semibold">Store Created!</h2>
            <p>Your store has been set up successfully.</p>

            <Button className="mt-4 w-full">Go to your Dashboard</Button>
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
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-300 text-gray-600'
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
