'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

export type CheckoutFormState = {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  notes: string;
};

const EMPTY_FORM: CheckoutFormState = {
  name: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  postcode: '',
  notes: '',
};

type CheckoutContextValue = {
  orderId: string | null;
  clientSecret: string | null;
  form: CheckoutFormState;
  updateField: (name: keyof CheckoutFormState, value: string) => void;
  resetForm: () => void;
};
const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({
  checkoutState,
  children,
}: {
  checkoutState: {
    orderId: string | null;
    clientSecret: string | null;
  };
  children: React.ReactNode;
}) {
  const [form, setForm] = useState<CheckoutFormState>(EMPTY_FORM);

  const updateField = useCallback(
    (name: keyof CheckoutFormState, value: string) => {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM);
  }, []);

  const value = useMemo(
    () => ({
      orderId: checkoutState.orderId,
      clientSecret: checkoutState.clientSecret,
      form,
      updateField,
      resetForm,
    }),
    [
      checkoutState.orderId,
      checkoutState.clientSecret,
      form,
      updateField,
      resetForm,
    ],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
