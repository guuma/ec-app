import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { PaymentEdit } from '../components/Payment/index';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51HYsF3JLgc7xoM7bU0RT8ZmjQACIFprFkUjUb3v7Hr3fFdGjl8ptAVotdOAUQxqQVw80cRlkdglEplvRRFcArcpd00xrPddhic'
);

const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentEdit />
    </Elements>
  );
};

export default CheckoutWrapper;
