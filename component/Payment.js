import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";

export default function PayWithFlutterwave({ total, shipping, user, order }) {
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY,
    tx_ref: Date.now(),
    amount: total,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user.email,
      phonenumber: shipping?.phone,
      name: shipping?.fullName,
    },
    customizations: {
      title: "Pay For Your Orther",
      description: "Payment for items in cart",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div>
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              // closePaymentModal() // this will close the modal programmatically
              //   axios
              //     .put(`/api/orders/${order._id}/pay`, response)
              //     .then((res) => {
              //       console.log("done");
              //       if (res.response) {
              //         console.log("done");
              //       }
              //     });
              closePaymentModal();
            },
            onClose: () => {},
          });
        }}
      >
        Pay with Flutterwave
      </button>
    </div>
  );
}
