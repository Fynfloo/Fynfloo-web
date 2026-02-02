import { SectionShell } from '../core/section-shell';
import { Field } from '../core/field';
import { TextInput } from '../core/text-input';
import { SelectInput } from '../core/select-input';
import { Button } from '../core/button';
import { useState } from 'react';
import { CheckoutDeliveryData } from '@/lib/storefront/types';

export function CheckoutDelivery({
  onSubmit,
}: {
  onSubmit?: (data: CheckoutDeliveryData) => void;
}) {
  const [form, setForm] = useState({
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    postcode: '',
  });
  return (
    <SectionShell>
      <div className="">
        <div className="space-y-4">
          <h2 className="text-sm font-medium">Delivery</h2>
          <div className="w-32">
            <Field label="Title" htmlFor="title">
              <SelectInput id="title" name="title" defaultValue="">
                <option value="" disabled>
                  Select title
                </option>
                <option value="mr">Mr</option>
                <option value="mrs">Mrs</option>
                <option value="ms">Ms</option>
                <option value="dr">Dr</option>
              </SelectInput>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="First name" htmlFor="firstName">
              <TextInput
                id="firstName"
                name="firstName"
                placeholder="Jane"
                autoComplete="given-name"
              />
            </Field>

            <Field label="Last name" htmlFor="lastName">
              <TextInput
                id="lastName"
                name="lastName"
                placeholder="Doe"
                autoComplete="family-name"
              />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Phone number" htmlFor="phone">
              <TextInput
                id="phone"
                name="phone"
                placeholder="Phone number"
                autoComplete="tel"
              />
            </Field>
          </div>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Address line 1" htmlFor="address1">
                <TextInput
                  id="address1"
                  name="address1"
                  placeholder="House number and street name"
                  autoComplete="address-line1"
                />
              </Field>

              <Field label="Address line 2" htmlFor="address2">
                <TextInput
                  id="address2"
                  name="address2"
                  placeholder="Apartment, suite, building (optional)"
                  autoComplete="address-line2"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="City / Town" htmlFor="city">
                <TextInput
                  id="city"
                  name="city"
                  placeholder="City or town"
                  autoComplete="address-level2"
                />
              </Field>

              <Field label="County" htmlFor="county">
                <TextInput
                  id="county"
                  name="county"
                  placeholder="County (optional)"
                  autoComplete="address-level1"
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Field label="Postcode" htmlFor="postcode">
                  <TextInput
                    id="postcode"
                    name="postcode"
                    placeholder="Postcode"
                    autoComplete="postal-code"
                  />
                </Field>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={() => onSubmit?.(form)}>Use this address</Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
