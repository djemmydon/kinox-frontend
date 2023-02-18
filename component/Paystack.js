import React from 'react';
import { usePaystackPayment } from 'react-paystack';




const PaystackHook = ({ total, user, setPay }) => {
  
  const config = {
    reference: (new Date()).getTime().toString(),
    email: user.email,
    amount: total * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
  setPay(true)

};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
  }
  

    const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Pay with Paystack</button>
      </div>
    );
};

export default PaystackHook