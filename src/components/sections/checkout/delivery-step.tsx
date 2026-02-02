import { StepSummary } from '../core/step-summary';
import { CheckoutDelivery } from './checkout-delivery';
import { CheckoutDeliveryData } from '@/lib/storefront/types';

export function DeliveryStep({
  isActive,
  isComplete,
  data,
  onSubmit,
  onEdit,
}: {
  isActive: boolean;
  isComplete: boolean;
  data: any;
  onSubmit: (data: CheckoutDeliveryData) => void;
  onEdit: () => void;
}) {
  if (!isActive && isComplete) {
    return (
      <StepSummary
        title="Delivery details"
        onEdit={onEdit}
        lines={[
          data.name,
          data.address1,
          data.address2,
          `${data.city}, ${data.postcode}`,
          data.country,
        ]}
      />
    );
  }

  if (!isActive) {
    return null;
  }

  return <CheckoutDelivery onSubmit={(formData) => onSubmit(formData)} />;
}
