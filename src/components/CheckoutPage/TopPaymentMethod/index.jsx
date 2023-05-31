import { motion } from "framer-motion";
import React, { Fragment } from "react";
import { useForm } from "react-final-form";
import ReactTooltip from "react-tooltip";

export default function TopPaymentMethod({ paymentMethod, onClick }) {
  const { change } = useForm();
  const handleClickPaymentMethod = () => {
    const handleClick = onClick;
    if (!handleClick) change("procId", paymentMethod.procId);
    else handleClick();
  };

  const handleBrokenImage = (e) => {
    let newSrc = "img/ellipsis-logo.png";
    switch (paymentMethod.procId) {
      case "PYPL":
        newSrc = "img/paypal-logo.png";
        break;
      case "CC":
        newSrc = "img/majorcreditcards-logo.png";
        break;
      default:
        break;
    }
    e.target.src = newSrc;
  };
  return (
    <Fragment>
      <motion.a
        onClick={handleClickPaymentMethod}
        data-tip
        data-for={paymentMethod.procId}
        whileHover={{
          opacity: 0.4,
          transition: { duration: 0.5 },
        }}
        whileTap={{ opacity: 0.4 }}
      >
        <div
          style={{
            height: "5rem",
            borderRadius: 7,
            padding: 5,
          }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 1 },
          }}
        >
          <img
            alt={paymentMethod.procId}
            onError={handleBrokenImage}
            src={paymentMethod.logo}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              opacity: paymentMethod.procId === "others" ? 0.5 : 1,
            }}
          />
        </div>
      </motion.a>

      <ReactTooltip id={paymentMethod.procId} type="info">
        <span>{paymentMethod.name}</span>
      </ReactTooltip>
    </Fragment>
  );
}
