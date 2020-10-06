import { CardElement } from '@stripe/react-stripe-js';
import { db } from '../../firebase/index';
import { push } from 'connected-react-router';
import { updateUserStateAction } from '../users/actions';
import { showLoadingAction, hideLoadingAction } from '../loading/actions';

const headers = new Headers();
headers.set('Content-type', 'application/json');
const BASE_URL = 'https://ec-app-d6574.web.app';

const createCustomer = async (email, paymentMethodId, uid, username) => {
  console.log(email, paymentMethodId, uid);
  const response = await fetch(BASE_URL + '/v1/customer', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      email: email,
      paymentMethod: paymentMethodId,
      userId: uid,
    }),
  });
  const customerResponse = await response.json();
  return JSON.parse(customerResponse.body);
};

const updatePaymentMethod = async (customerId, prevPaymentMethodId, nextPaymentMethodId) => {
  const response = await fetch(BASE_URL + '/v1/updatePaymentMethod', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      customerId: customerId,
      prevPaymentMethodId: prevPaymentMethodId,
      nextPaymentMethodId: nextPaymentMethodId,
    }),
  });
  const paymentMethodResponse = await response.json();
  const paymentMethod = JSON.parse(paymentMethodResponse.body);
  return paymentMethod.card;
};
export const retrievePaymentMethod = async (paymentMethodId) => {
  console.log(paymentMethodId);
  const response = await fetch(BASE_URL + '/v1/paymentMethod', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      paymentMethodId: paymentMethodId,
    }),
  });
  const paymentMethodResponse = await response.json();
  const paymentMethod = JSON.parse(paymentMethodResponse.body);
  console.log(paymentMethod);
  return paymentMethod.card;
};

export const registerCard = (stripe, elements, customerId) => {
  return async (dispatch, getState) => {
    const user = getState().users;
    console.log(user);
    const email = user.email;
    const uid = user.uid;
    const username = user.username;
    console.log(user, email, uid);

    dispatch(showLoadingAction('登録中...'));
    //*********************** START VALIDATION **************************//
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      console.error('Does not exist stripe or elements');
      dispatch(hideLoadingAction());
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('Does not exist cardElement');
      dispatch(hideLoadingAction());
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      return;
    }
    const paymentMethodId = paymentMethod.id;
    if (customerId === '') {
      const customerData = await createCustomer(email, paymentMethodId, uid);
      console.log(customerData.id);

      if (customerData.id === '') {
        dispatch(hideLoadingAction());
        alert('カード情報の登録に失敗しました。');
        return;
      } else {
        const updateUserState = {
          customer_id: customerData.id,
          payment_method_id: paymentMethodId,
        };
        console.log(updateUserState);
        db.collection('users')
          .doc(uid)
          .update(updateUserState)
          .then(() => {
            dispatch(updateUserStateAction(updateUserState));
            dispatch(hideLoadingAction());
            dispatch(push('/user/mypage'));
          })
          .catch((error) => {
            // Delete stripe customer
            dispatch(hideLoadingAction());
            alert('カード情報の登録に失敗しました');
            return;
          });
      }
    } else {
      const prevPaymentMethodId = getState().users.payment_method_id;
      const updatedPaymentMethod = await updatePaymentMethod(
        customerId,
        prevPaymentMethodId,
        paymentMethodId
      );
      if (!updatedPaymentMethod) {
        dispatch(hideLoadingAction());
        alert('お客様情報の登録に失敗しました。');
      } else {
        const userState = {
          payment_method_id: paymentMethodId,
        };
        db.collection('users')
          .doc(uid)
          .update(userState)
          .then(() => {
            dispatch(updateUserStateAction(userState));
            dispatch(hideLoadingAction());
            alert('お客様情報を更新しました。');
            dispatch(push('/user/mypage'));
          })
          .catch((error) => {
            dispatch(hideLoadingAction());
            alert('お客様情報の更新に失敗しました');
            return;
          });
      }
    }
  };
};
