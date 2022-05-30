import React from 'react'
import PaystackPop from "@paystack/inline-js";
import { useStateContext } from '../context/StateContex';

function Paystack() {
    const {
        cartItems,
        totalQuantity,
        toggleCartItemQuanitity,
        totalPrice,
        setCartItems,
      } = useStateContext();
    
    
const paystacks = (e) => {
        e.preventDefault();
    
        const pay = new PaystackPop();
        pay.newTransaction({ 
         key: 'pk_test_9286738c5dddd1dd2a33753aaccc3383eb2ee96a',
         amount: totalPrice,
         
    
        });
      };
  return (
    <div>Paystack</div>
  )
}

export default Paystack