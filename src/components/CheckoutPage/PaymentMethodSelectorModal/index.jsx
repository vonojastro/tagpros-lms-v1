import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Popup } from "reactjs-popup";
import { AnimatePresence, motion } from "framer-motion";
import PaymentMethod from "../PaymentMethod/index";
import { useForm } from "react-final-form";

function PaymentMethodSelectorModal({ trigger, subTotal }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const { change } = useForm();
  const processors = useSelector((state) =>
    state.payment ? state.payment.getIn(["data", "processors"]) : null
  );

  const handleClickBreadcrumb = (event) => {
    event.preventDefault();
    const isCategoriesClicked = event.target.id === "Categories";
    if (isCategoriesClicked) setSelectedCategory(null);
  };

  const contentStyle = {
    padding: 0,
    background: "#fff0",
    border: 0,
  };
  const getBreadcrumbs = () => {
    const path = ["Categories"];
    if (selectedCategory) path.push(selectedCategory);
    const last = path.length - 1;

    return path.map((pathName, index) =>
      index !== last ? (
        <li className="breadcrumb-item">
          <a href="/" id={pathName} onClick={handleClickBreadcrumb}>
            {pathName}
          </a>
        </li>
      ) : (
        <li className="breadcrumb-item active" aria-current="page">
          {pathName}
        </li>
      )
    );
  };
  const handleClickPaymentCategory = (event) => {
    event.preventDefault();
    setSelectedCategory(event.target.id);
  };

  const handleClickPaymentMethod = (procId) => {
    setSelectedPaymentMethod(procId);
  };

  const isPaymentMethodSelected = (procId) => procId === selectedPaymentMethod;

  const handleClickBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <Popup
      trigger={trigger}
      modal
      {...{ contentStyle }}
      lockScroll
      closeOnDocumentClick={true}
    >
      {(close) => (
        <div
          className="modal-dialog modal-xl text-dark"
          role="document"
          style={{ margin: 0 }}
        >
          <div className="modal-content" style={{ height: "95vh" }}>
            <div className="modal-header">
              <h4 className="modal-title">Select a payment method</h4>
              <button
                onClick={close}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>{" "}
              </button>
            </div>
            <div className="modal-body">
              <div className="card-body">
                <div className="form-body">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">{getBreadcrumbs()}</ol>
                  </nav>
                  <div class="alert alert-primary font-10 my-3" role="alert">
                    Please select a{" "}
                    <span className="font-bold">
                      {!selectedCategory ? "category" : "payment method"}
                    </span>
                  </div>

                  <div className="mt-5">
                    {selectedCategory && (
                      <div className="d-flex mb-1">
                        <button
                          className="btn btn-outline font-14 ml-auto"
                          style={{ width: "8rem" }}
                          onClick={handleClickBackToCategories}
                        >
                          <i class="fas fa-arrow-left mr-2"></i>
                          Categories
                        </button>
                      </div>
                    )}
                    <AnimatePresence exitBeforeEnter>
                      {(!selectedCategory &&
                        Object.keys(processors).map((paymentCategory) => (
                          <motion.div
                            style={{
                              display: "grid",
                              gridTemplate: "repeat(auto-fit, 1fr)",
                              gap: 10,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <button
                              className="btn btn-link text-left"
                              key={paymentCategory}
                              id={paymentCategory}
                              onClick={handleClickPaymentCategory}
                            >
                              {paymentCategory}
                            </button>
                          </motion.div>
                        ))) || (
                        <motion.div
                          key="paymentmethodlist"
                          className='p-2'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            display: "grid",
                            gridTemplate: "repeat(auto-fit, 1fr)",
                            gap: 10,
                            maxHeight: "calc(100vh - 28rem)",
                            overflowY: "auto",
                            overflowX: "hidden",
                          }}
                        >
                          {processors[selectedCategory].map((method) => (
                            <PaymentMethod
                              key={subTotal + method.procId}
                              method={method}
                              subTotal={subTotal}
                              handleClickPaymentMethod={handleClickPaymentMethod}
                              isSelected={isPaymentMethodSelected(method.procId)}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  close();
                }}
              >
                Close
              </button>
              <button
                disabled={!selectedPaymentMethod}
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  change("procId", selectedPaymentMethod);
                  close();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default PaymentMethodSelectorModal;
