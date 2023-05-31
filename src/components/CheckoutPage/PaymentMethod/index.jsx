import React from "react";
import { useForm } from "react-final-form";
import { getDaysAvailability, isNotAvailable } from "../../../utils/payment/index";

export default function PaymentMethod({
  method,
  handleClickPaymentMethod,
  isRemoveable,
  isSelected,
  subTotal,
}) {
  const handleBrokenImage = (e) => {
    let newSrc = "";
    switch (method.procId) {
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

  const { change } = useForm();
  const handleClickResetPaymentMethod = () => {
    change("procId", null);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (handleClickPaymentMethod) handleClickPaymentMethod(method.procId);
  };

  return (
    <div style={{ position: "relative" }}>
      {isRemoveable && (
        <div className="bg-danger">
          <i
            id="remove-btn"
            onClick={handleClickResetPaymentMethod}
            class="far fa-times-circle text-black-50 mt-1"
            style={{
              position: "absolute",
              right: 10,
              top: 5,
              fontSize: 25,
              cursor: "pointer",
              textAlign: "left",
              zIndex: 10,
            }}
          />
        </div>
      )}
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-link list-group-item list-group-item-action flex-column align-items-start"
        style={{
          background: isSelected && "#90ee906b",
          borderRadius: 5,
          display: "relative",
          pointerEvents: isRemoveable ? "none" : "all",
        }}
        disabled={isRemoveable ? false : isNotAvailable(method, subTotal) ? true : false}
      >
        <div className="container">
          <div className="row">
            <div className="col" style={{ margin: "auto" }}>
              <img
                onError={handleBrokenImage}
                src={method.logo}
                alt={method.acronym + "-logo"}
                style={{
                  width: "inherit",
                  fontSize: "0.5rem",
                  // height: 80,
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="col-9 ml-4">
              <h4>{method.name}</h4>
              <div className="small">
                Availability:{" "}
                {getDaysAvailability(method.dayOfWeek, method.startTime, method.endTime)}
              </div>
              <div
                className="small"
                dangerouslySetInnerHTML={{
                  __html: method.remarks,
                }}
              />
            </div>
            <div className="col" style={{ padding: 0, margin: "auto" }}>
              {isSelected && (
                <i className="fas fa-check" style={{ color: "#13a513" }}></i>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
