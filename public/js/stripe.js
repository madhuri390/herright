/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51JUpLwSInfHfMArY6j6DJFnASIs0HLpkbFOplnEGsSMhkOIr3fJ4Im5jswkVFKTOVXOTB50f7AYmyZc4KL7FN9fK00mEWjQpto'
);
export const bookTour = async (userId) => {
  //1)Get checkout session from end Point
  console.log('inside stripe.js');
  const session = await axios(
    `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${userId}`
  );
  console.log('hiii', session.data.session.id);
  //2)Create checkout form and Charge the credit card
  await stripe.redirectToCheckout({
    sessionId: session.data.session.id,
  });
};
