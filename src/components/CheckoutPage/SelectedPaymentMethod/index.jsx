import React from "react";
import PaymentMethod from "../PaymentMethod/index";

export default function SelectedPaymentMethod({
  method,
  handleClickPaymentMethod,
  paymentMethod,
}) {
  return (
    <PaymentMethod
      method={method}
      handleClickPaymentMethod={handleClickPaymentMethod}
      paymentMethod={paymentMethod}
      isRemoveable={true}
    />
  );
}
