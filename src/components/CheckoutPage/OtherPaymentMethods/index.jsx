import React from "react";
import TopPaymentMethod from "../TopPaymentMethod/index";

export default function OtherPaymentMethods({ paymentMethod, onClick }) {
  return <TopPaymentMethod paymentMethod={paymentMethod} onClick={onClick} />;
}
