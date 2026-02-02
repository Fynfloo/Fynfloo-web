import { useState } from 'react';
import { DeliveryStep } from './delivery-step';
import { CheckoutDeliveryData } from '@/lib/storefront/types';

type CheckoutStep = 'delivery' | 'customer' | 'payment';

const INITIAL_DELIVERY_DATA: CheckoutDeliveryData = {
  title: '',
  firstName: '',
  lastName: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  county: '',
  postcode: '',
};

export function CheckoutFlow() {
  const [step, setStep] = useState<CheckoutStep>('delivery');
  const [loading, setLoading] = useState(false);
  const [deliveryData, setDeliveryData] = useState<CheckoutDeliveryData>(
    INITIAL_DELIVERY_DATA,
  );

  return (
    <div className="space-y-6">
      <DeliveryStep
        isActive={step === 'delivery'}
        isComplete={!!deliveryData}
        data={deliveryData}
        onSubmit={async (data) => {
          setLoading(true);
          // Simulate async operation
          await new Promise((r) => setTimeout(r, 1200));
          setDeliveryData(data);
          setLoading(false);
          setStep('customer');
        }}
        onEdit={() => setStep('delivery')}
      />
    </div>
  );
}
