import { loadStripe } from '@stripe/stripe-js';
import { stripePublishableKey } from '../utils';

export const stripePromise = loadStripe(stripePublishableKey);
