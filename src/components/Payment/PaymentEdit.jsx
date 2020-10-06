import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PrimaryButton, TextDetail } from '../UIkit/index';
import { registerCard, retrievePaymentMethod } from '../../reducks/payments/operations';
import { getCustomerId, getPaymentMethodId } from '../../reducks/users/selectors';
import { hideLoadingAction, showLoadingAction } from '../../reducks/loading/actions';

const PaymentEdit = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const customerId = getCustomerId(selector);
  const paymentMethodId = getPaymentMethodId(selector);

  const [card, setCard] = useState({});
  const register = useCallback(() => {
    dispatch(registerCard(stripe, elements, customerId));
  }, [stripe, elements, customerId]);

  const goBackToMyPage = useCallback(() => {
    dispatch(push('/user/mypage'));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      dispatch(showLoadingAction());
      const cardData = await retrievePaymentMethod(paymentMethodId);
      dispatch(hideLoadingAction());
      if (cardData) {
        setCard(cardData);
      }
    })();
  }, [customerId]);

  const cardNumber = useMemo(() => {
    console.log(card.last4);
    if (card.last4) {
      return '**** **** ****' + card.last4;
    } else {
      return '未登録';
    }
  }, [card]);

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">クレジットカード情報入力</h2>
      <div className="module-spacer--medium" />
      <h3>現在登録しているカード情報</h3>
      <div className="module-spacer--small" />
      <TextDetail label={card.brand} value={cardNumber} />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={'カード情報を保存する'} onClick={register} />
        <PrimaryButton label={'マイページに戻る'} onClick={goBackToMyPage} />
      </div>
    </section>
  );
};

export default PaymentEdit;
