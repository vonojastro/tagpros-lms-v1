import React, { useEffect, useState } from "react";
import checkoutValidator from "../../validators/checkout";
import Header from "../Header/index";
import "./index.css";
import { Form, FormSpy, useField, useForm, useFormState } from "react-final-form";
import { SelectControl, InputControl } from "components/common/Form/Inputs";
import _ from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../api";
import { getProcessors } from "api/payment";
import useValidationSchema from "hooks/use-validation-schema";
import Avatar from "../common/Avatar/index";
import { getS3Url } from "utils/teacherApplication";
import { toast } from "react-toastify";
import { Country } from "country-state-city";
import { getStatesOfCountry } from "country-state-city/dist/lib/state";
import CITY from "country-state-city/dist/lib/city";
import SelectedPaymentMethod from "./SelectedPaymentMethod";
import { getPaymentMethodByProcId, toMoneyFormat } from "utils/utils";
import { CHECKOUT_PAGE_TOP_PAYMENT_METHODS, LEARNER_GRADE_LEVELS } from "utils/constants";
import TopPaymentMethod from "./TopPaymentMethod/index";
import OtherPaymentMethods from "./OtherPaymentMethods";
import { AnimatePresence, motion } from "framer-motion";
import PaymentMethodSelectorModal from "./PaymentMethodSelectorModal/index";
import { Error } from "../common/Form/Inputs";
import { Modal, Button } from "react-bootstrap";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { paypalConfig } from "../../config/index";
// import { paypalConfig } from "config";

// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const CheckoutForm = ({ processors, classes, userType }) => {
  // const CURRENCY_SYMBOL = "USD";
  // enrollees = null if user is solo learner, otherwise (user is family account) array of learners
  const [currency, setCurrency] = useState("USD");
  const [paymentMode, setPaymentMode] = useState(-1);
  const loading = useSelector((state) => state.uiElements.getIn(["loadingScreen"]));
  const [showModal, setShowModal] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [discountCode, setDiscountCode] = useState({
    loading: false,
    success: false,
    error: false,
    data: null,
  });
  const { change } = useForm();
  const { submitFailed, pristine, hasValidationErrors, dirtySinceLastSubmit, values } = useFormState();
  const notValidated_discountCode = useField("notValidated_discountCode");

  const expandMode = (index) => {
    if (index === paymentMode) {
      setPaymentMode(-1);
    } else {
      setPaymentMode(index);
    }
  };

  const handleClickPaymentMethod = (method) => {
    change("procId", method.procId);
  };

  const handleClickApplyDiscountCode = (e) => {
    e.preventDefault();
    const code = notValidated_discountCode.input.value; // Get not validated discount code

    setDiscountCode((discountCode) => ({ ...discountCode, loading: true }));
    api
      .get(`discount/apply/${code}`)
      .then((result) => {
        if (!result.data.discount.percentage) result.data.discount.percentage = 0; // Handles when "percentage" field of discount is null
        setDiscountCode((discountCode) => ({
          ...discountCode,
          error: false,
          success: true,
          data: result.data.discount,
        }));
        // if code is not valid update its value in react final form to null
        change("discountCode", result.data.discount.code);
        toast.success("Discount Code Successfully Applied!");
      })
      .catch((err) => {
        toast.error("Invalid Discount Code");
        setDiscountCode((discountCode) => ({
          ...discountCode,
          error: true,
          success: false,
          data: null,
        }));
        // otherwise set value to null
        change("discountCode", null);
        change("notValidated_discountCode", null);
      })
      .finally(() => {
        setDiscountCode((discountCode) => ({ ...discountCode, loading: false }));
      });
  };
  const handleClickRemoveDiscountCode = () => {
    setDiscountCode((discountCode) => ({ ...discountCode, data: null }));
    change("discountCode", null);
  };

  // const PRICE_MULTIPLIER = enrollees ? enrollees.length : 1;
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [cashDiscount, setCashDiscount] = useState(0);
  const userAuth = useSelector(state => state.auth);
  let txnId = null;
  
  const getEnrollees = (enrollees) => 
    (userAuth.accountType === 'learner' ? [{ ...userAuth.user }] : enrollees ).map(({gradeLevel, ...others})=>({...others, gradeLevel: gradeLevel?.length ? LEARNER_GRADE_LEVELS.find(({value})=> gradeLevel === value).label:''}))
  
  const createOrder = async (data, actions) => {
    // console.log('classParam', classParam, classes);
    const orderId = await processPayment(values["procId"]);

    return orderId;
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (order, res) {
      console.log('onApprove', order, order.purchase_units[0].payments.captures[0]);
      const classParam = classes.map(({classId, enrollees, cartId}) => {
        return {classId, 
          enrollees:
          // If user is solo-learner, then he is an enrollee in enrollees array.
          // Else, a family account, and the selected learners are the enrollees
          getEnrollees(enrollees), 
          cartId};
      });
      return api
      .post(`/payment/${userType}/paypal/checkout`, {
        // discountCode: discountCode.data ? discountCode.data.code : undefined,
        classes: classParam,
        txnId,
        // orderId: order.id,
        captureId: order.purchase_units[0].payments.captures[0].id,
        // capture: order.purchase_units[0].payments.captures[0],
        // fee: order.purchase_units.payments.captures[0].seller_receivable_breakdown.paypal_fee.value
      })
      .then((response) => {
        const redirectUrl = new URL(`${window.location.origin}/order-summary`);
          redirectUrl.searchParams.append("txnid", response.data.txnId);
          redirectUrl.searchParams.append("refno", order.orderId);
          redirectUrl.searchParams.append("status", "S");
          redirectUrl.searchParams.append("message", response.data.message);
          redirectUrl.searchParams.append("param1", response.data.param1);
          redirectUrl.searchParams.append("currency", currency);
          redirectUrl.searchParams.append("subTotal", subTotal);
          redirectUrl.searchParams.append("cashDiscount", cashDiscount);
          redirectUrl.searchParams.append("total", total);
          window.location.replace(redirectUrl.href);
          return response;
      })
      .catch((error) => {
        toast.error("Failed to connect with payment. Please try again later.");
        console.log(error);
      });
    });
  }

  const processPayment = async (procId) => {
    setLoadingPayment(true);
    const classParam = classes.map(({ classId, enrollees, cartId }) => {
      return {
        classId,
        enrollees:
          // If user is solo-learner, then he is an enrollee in enrollees array.
          // Else, a family account, and the selected learners are the enrollees
          getEnrollees(enrollees), 
        cartId
      };
    });

    return api
      .post(`/payment/${userType}/pay`, {
        discountCode: discountCode.data ? discountCode.data.code : undefined,
        classes: classParam,
        procId
      })
      .then((response) => {
        setLoadingPayment(false);
        setShowModal(false);
        txnId = response.data.txnId;
        if(procId !== "PYPL"){
          const redirectUrl = new URL(`${window.location.origin}/order-summary`);
          redirectUrl.searchParams.append("txnid", response.data.txnId);
          redirectUrl.searchParams.append("refno", null);
          redirectUrl.searchParams.append("status", "P");
          redirectUrl.searchParams.append("message", response.data.message);
          redirectUrl.searchParams.append("param1", response.data.param1);
          redirectUrl.searchParams.append("currency", currency);
          redirectUrl.searchParams.append("subTotal", subTotal);
          redirectUrl.searchParams.append("cashDiscount", cashDiscount);
          redirectUrl.searchParams.append("total", total);
          window.location.replace(redirectUrl.href);
          return response;
        }
        return response.data.id
      }).catch(err => {
        setLoadingPayment(false);
        setShowModal(false);
        toast.error(err?.response?.data?.err?.message || 'Failed initiating payment. Please try again later.');
      }); 
  }

  const onCancel = (data, actions) => {
    api
      .post('/payment/void', { orderId: data.orderID });
  }

  const onError = (err, actions) => {
    console.log('onErrorPayment', JSON.stringify(err));
  }

  useEffect(() => {
    setCurrency(classes[0].currency);
    let total = 0.0;
    classes.forEach((item) => {
      const enrolleesCount = item.enrollees ? item.enrollees.length : 1;
      total = total + parseFloat(item.price) * enrolleesCount;
    });
    setSubTotal(total);
    setCashDiscount(() => {
      if (discountCode.data) {
        switch (discountCode.data.type) {
          case "percentage":
            return parseFloat(discountCode.data.percentage / 100) * parseFloat(subTotal);
          case "value":
            return parseFloat(discountCode.data.price);
          default:
            return 0;
        }
      } else {
        return 0;
      }
    });

    setTotal(() => {
      if (discountCode.data) {
        const discounted = subTotal - cashDiscount;
        if (discounted < 0) {
          change("procId", "none");
          return 0;
        }
        return discounted;
      } else {
        if(total === 0){
          change("procId", "none");
        }
        return total;
      }
    });
  }, [discountCode.data, subTotal, cashDiscount, classes, change]);

  const handleClickOtherPaymentMethods = () => {};

  return (
    <div className="checkout">
      <div className="left">
        <div className="checkout__order-details mb-4">
          <div className="custom-black-primary-text">Checkout</div>
          <div className="custom-black-secondary-text">Order Details</div>
          {classes.map((item) => (
            <div>
              <div className="checkout__order-details__detail justify-content-between mb-2">
                <div
                  className="checkout__order-details__detail__image"
                  style={{
                    backgroundImage: `url(${
                      item.thumbnailImage
                        ? item.thumbnailImage
                        : "../assets/images/image-placeholder.jpg"
                    })`,
                  }}
                ></div>
                <div className="checkout__order-details__detail__description__title col ml-0">
                  <h5 className="mb-3">
                    <b>{item.title}</b>
                  </h5>
                  {item.enrollees && (
                    <div className="mt-2 mb-5">
                      {/* <p>for learners:</p> */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                          columnGap: 10,
                          rowGap: 10,
                        }}
                      >
                        {item.enrollees.map((enrollee) => (
                          <Avatar
                            left={
                              <img
                                src={getS3Url(enrollee.photo)}
                                alt={enrollee.nickname}
                                class="profile-pic mr-2"
                                height={30}
                                width={30}
                                style={{ objectFit: "cover", objectPosition: "center" }}
                              />
                            }
                            right={
                              <span className="hide-menu font-14">
                                {enrollee.nickname}
                              </span>
                            }
                            key={enrollee.nickname}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="checkout__order-details__detail__description">
                  <div className="checkout__order-details__detail__description__price col">
                    <div className="checkout__order-details__detail__description__price--after-discount text-monospace">
                      {toMoneyFormat(item.price, currency)}
                      <span className="text-black-50">
                        ({item.enrollees ? item.enrollees.length : 1}x)
                      </span>
                    </div>
                    {/* <div className="checkout__order-details__detail__description__price--before-discount">
                        {classDetails.price}
                      </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!discountCode.data && _.round(total, 2) > 0 && ( // Show discountCode input only if none is applied
          <div className="discount-code d-flex align-items-center">
            <InputControl
              name="notValidated_discountCode"
              label=""
              type="text"
              placeholder="Discount Code"
              disabled={discountCode.loading}
            />
            <button
              className="btn btn-outline-info w-auto ml-2 text-uppercase"
              onClick={handleClickApplyDiscountCode}
            >
              {discountCode.loading ? (
                <div>
                  <div
                    class="spinner-border text-primary mr-2"
                    role="status"
                    style={{ width: 20, height: 20 }}
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                  Validating
                </div>
              ) : (
                <div style={{ width: 118.76 }}>Apply</div>
              )}
            </button>
          </div>
        )}

        {discountCode.data && (
          <div>
            <label className="font-bold mb-3">Discount Code</label>
            <div>
              <span
                style={{
                  border: "1px solid",
                  padding: 9,
                  borderRadius: 8,
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#1875d2",
                }}
              >
                {discountCode.data.code}
                <i
                  className="ml-2 fa fa-times text-dark"
                  style={{ opacity: 0.7, cursor: "pointer" }}
                  onClick={handleClickRemoveDiscountCode}
                ></i>
              </span>
            </div>
          </div>
        )}
        <div className="checkout__billing">
          <div className="checkout__billing__billing-address-input">
            <label className="font-bold">Billing Address</label>
            <div style={{ display: "grid", rowGap: 30 }}>
              <InputControl
                type="text"
                name="streetAddress"
                label="Street Address"
                placeholder=" "
              />
              <InputControl
                type="text"
                name="streetAddress2"
                label="Street Address Line 2"
                placeholder=" "
              />
              <div style={{ display: "grid", rowGap: 30 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    columnGap: 10,
                  }}
                >
                  <FormSpy subscription={{ values: true }}>
                    {(props) =>
                      // Solution for incomplete city data: allow user to input city manually
                      (props.values.country &&
                        props.values.state &&
                        (CITY.getCitiesOfState(props.values.country, props.values.state)
                          .length ? (
                          <SelectControl
                            label={"City"}
                            name="city"
                            options={CITY.getCitiesOfState(
                              props.values.country,
                              props.values.state
                            ).map(({ name: label }) => ({
                              label: `${label}`,
                              value: label,
                            }))}
                          />
                        ) : (
                          <InputControl
                            type="text"
                            name="city"
                            label="City"
                            placeholder=" "
                          />
                        ))) || <div />
                    }
                  </FormSpy>
                  <FormSpy subscription={{ values: true }}>
                    {(props) => (
                      <SelectControl
                        label="State"
                        name="state"
                        options={getStatesOfCountry(props.values.country).map(
                          ({ name: label, isoCode: value, flag: emoji }) => ({
                            label: `${label} ${emoji ? emoji : ""}`,
                            value,
                          })
                        )}
                      />
                    )}
                  </FormSpy>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    columnGap: 10,
                  }}
                >
                  <InputControl
                    type="text"
                    name="postalCode"
                    label="Postal Code"
                    placeholder=" "
                  />
                  <SelectControl
                    label="Country"
                    name="country"
                    options={Country.getAllCountries().map(
                      ({ name: label, isoCode: value, flag: emoji }) => ({
                        label: `${label} ${emoji ? emoji : ""}`,
                        value,
                      })
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <label className="font-bold">Email Address</label>
              <InputControl type="text" name="email" label="" placeholder=" " />
            </div>
          </div>
          <br />
          {/* {parseInt(total) !== 0 && ( */}
          {false && (
            <div className="checkout__billing__payment-mode mt-4">
              <label className="font-bold">Payment Method</label>
              <div
                className="text-center data-loading"
                style={{ display: loading ? "block" : "none", width: "38rem" }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="loading-text">Loading Payment Methods ...</div>
              </div>
              <div
                className="text-center"
                style={{
                  display:
                    !loading && Object.keys(processors).length < 1 ? "block" : "none",
                  width: "38rem",
                }}
              >
                <div className="no-data error">
                  There was an error loading the Payment Methods. Please try refreshing
                  the page.
                </div>
              </div>
              {submitFailed && <Error name="procId" />}
              {processors && (
                <FormSpy subscription={{ values: true }}>
                  {(props) => (
                    <div
                      style={{
                        height: "5rem",
                        position: "relative",
                      }}
                    >
                      <AnimatePresence exitBeforeEnter>
                        {(!props.values.procId && (
                          <motion.div
                            key="toppaymentmethods-container"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            // transition={{ duration: 0.1 }}
                            exit={{ opacity: 0 }}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))",
                              gap: 10,
                              width: "100%",
                            }}
                          >
                            <TopPaymentMethod
                              paymentMethod={getPaymentMethodByProcId(
                                CHECKOUT_PAGE_TOP_PAYMENT_METHODS[0],
                                processors
                              )}
                            />
                            <TopPaymentMethod
                              paymentMethod={getPaymentMethodByProcId(
                                CHECKOUT_PAGE_TOP_PAYMENT_METHODS[1],
                                processors
                              )}
                            />
                            <TopPaymentMethod
                              paymentMethod={getPaymentMethodByProcId(
                                CHECKOUT_PAGE_TOP_PAYMENT_METHODS[2],
                                processors
                              )}
                            />
                            <PaymentMethodSelectorModal
                              trigger={
                                <OtherPaymentMethods
                                  paymentMethod={{
                                    name: "Other payment methods",
                                    procId: "others",
                                    logo: "img/ellipsis-logo.png",
                                  }}
                                  onClick={handleClickOtherPaymentMethods}
                                />
                              }
                              subTotal={subTotal}
                            />
                          </motion.div>
                        )) || (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key="selectedpaymentmethod"
                            style={{
                              position: "absolute",
                            }}
                          >
                            <SelectedPaymentMethod
                              method={getPaymentMethodByProcId(
                                props.values.procId,
                                processors
                              )}
                              handleClickPaymentMethod={handleClickPaymentMethod}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </FormSpy>
              )}
              {false &&
                !loading &&
                Object.keys(processors).map((mode, index) => (
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <div
                        className="card-header"
                        id={`heading${index}`}
                        role="button"
                        type="button"
                        onClick={() => expandMode(index)}
                        data-toggle="collapse"
                        data-target={`#collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse${index}`}
                      >
                        <div className="container">
                          <div className="row justify-content-between">
                            <div>
                              <button
                                className="btn btn-link"
                                data-toggle="collapse"
                                data-target={`#collapse${index}`}
                                aria-expanded="false"
                                aria-controls={`collapse${index}`}
                                type="button"
                              >
                                {mode}
                              </button>
                            </div>
                            <div>
                              {paymentMode !== index && (
                                <button
                                  className="btn btn-link"
                                  data-toggle="collapse"
                                  data-target={`#collapse${index}`}
                                  aria-expanded="false"
                                  aria-controls={`collapse${index}`}
                                  type="button"
                                >
                                  <i className="fas fa-chevron-right"></i>
                                </button>
                              )}
                              {paymentMode === index && (
                                <button
                                  className="btn btn-link"
                                  data-toggle="collapse"
                                  data-target={`#collapse${index}`}
                                  aria-expanded="false"
                                  aria-controls={`collapse${index}`}
                                  type="button"
                                >
                                  <i className="fas fa-chevron-down"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id={`collapse${index}`}
                        className="collapse"
                        aria-labelledby={`heading${index}`}
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <ul class="list-group list-group-flush">ww</ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <div className="checkout__summary">
          <div className="custom-black-secondary-text">Summary</div>
          <div className="checkout__summary__price">
            <div>Subtotal:</div>
            <div className="text-monospace">{toMoneyFormat(subTotal,currency)}</div>
          </div>
          <div className="checkout__summary__price">
            <div>Coupon Discounts:</div>
            <div className="text-monospace">
              {cashDiscount > 0 ? "-" + toMoneyFormat(cashDiscount, currency) : ""}
            </div>
          </div>
          <hr className="border-dark" />
          <div className="checkout__summary__price font-weight-bold">
            <div>Total:</div>
            <div className="font-20">{toMoneyFormat(total, currency)}</div>
          </div>
          <div className="font-14 mb-2">
            <p>
              Tagpros is required by law to collect applicable transaction taxes for
              purchases made in certain tax jurisdictions.
            </p>
            <p>
              By completing your purchase you agree to these{" "}
              <span className="text-info font-bold">Terms of Service</span>.
            </p>
          </div>
          {_.round(total, 2) === 0 && <button
            className="py-2 w-100 text-white btn btn-info mt-4"
            type="submit"
            disabled={pristine || (hasValidationErrors && !dirtySinceLastSubmit)}
          >
            Proceed
          </button>}
          {_.round(total, 2) > 0 && <div>
            <button 
              type="button" 
              className="btn btn-outline-info btn-block mb-3" 
              data-toggle="tooltip" 
              title="Instructions will be given on deposit procedure"
              // disabled={hasValidationErrors}
              onClick={() => {setShowModal(true)}}
            >
              <i className="fas fa-university mr-1"></i> <b>Bank Transfer/Deposit</b>
            </button>
            <PayPalScriptProvider
                options={{
                    "client-id": paypalConfig.clientId,
                    components: "buttons",
                    currency: currency
                }}>
              <ButtonWrapper
                    hasError={hasValidationErrors}
                    total={total}
                    discount={cashDiscount}
                    currency={currency}
                    showSpinner={false}
                    onCreateOrder={createOrder}
                    onApprove={onApprove}
                    onCancel={onCancel}
                    onError={onError}
                />
            </PayPalScriptProvider>
          </div>}
        </div>
      </div>
      <Modal
        size='lg'
        show={showModal}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Bank Transfer/Deposit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bank-details">
          <p>Clicking proceed will add class/es included in this checkout to your <b>Pending Enrollments</b>. 
            Enrollment will be considered final once we confirm receipt of the payment.
            You will receive an invoice with complete payment instructions in your tagpros registered email address.
          </p>
          <p>Please take note of the bank details below.</p>
          <table class="table table-bordered table-striped">
            <tbody>
              <tr>
                <td className="text-uppercase"><b>Bank Name: </b></td>
                <td>Bank of the Philippine Islands </td>
              </tr>
              <tr>
                <td className="text-uppercase"><b>Account Name: </b></td>
                <td>Tagpros Education OPC</td>
              </tr>
              <tr>
                <td className="text-uppercase"><b>Account Number</b></td>
                <td></td>
              </tr>
              <tr>
                <td className="pl-5"><b>Dollar Account: </b></td>
                <td>002024-5256-89</td>
              </tr>
              <tr>
                <td className="pl-5"><b>Peso Account: </b></td>
                <td>002021-5053-26</td>
              </tr>
            </tbody>
          </table>

          <p><i></i></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => processPayment("OTC")} disabled={loadingPayment}>
            <span
              style={{ display: loadingPayment ? 'inline-block' : 'none' }}
              class='spinner-border spinner-border-sm btn-load'
              role='status'
              aria-hidden='true'
              />
            Proceed
          </Button>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const ButtonWrapper = ({ total, cashDiscount, currency, showSpinner, hasError, onCreateOrder, onApprove, onCancel, onError }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <span className="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span> }
            <PayPalButtons
                style={{color:'blue', label: 'buynow'}}
                disabled={hasError}
                forceReRender={[total, currency, cashDiscount]}
                fundingSource={undefined}
                disableFunding={"credit"}
                createOrder={(data, actions) => onCreateOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                onCancel={(data, actions) => onCancel(data, actions)}
                onError={(data, actions) => onError(data, actions)}
            />
        </>
    );
}

export default function CheckoutPage() {
  // const [classDetails, setclassDetails] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const processors = useSelector((state) =>
    state.payment ? state.payment.getIn(["data", "processors"]) : []
  );
  // const { enrollmentId } = useSelector((state) =>
  //   state.classes.get("enroll") ? state.classes.get("enroll") : {}
  // );
  const user = useSelector((state) => (state.auth.user ? state.auth.user : {}));
  const userAuth = useSelector(state => state.auth);

  const searchParams = {
    learners: location.state?.learners,
    classId: location.state?.classId,
    enrollmentId: location.state?.enrollmentId,
    classes: location.state?.classes,
  };

  const fetchData = async () => {
    getProcessors(dispatch);
  };
  const getEnrollees = (enrollees) => 
    userAuth.accountType === 'learner' ? [{ ...userAuth.user }] : enrollees 
  const submit = (values) => {
    // const redirectUrl =
    //   "/order-summary?txnid=txn00011&refno=PLB697I1&status=S&message=%5b000%5d+BOG+Reference+No%3a+20211102181838+%23PLB697I1&digest=855d20e8a8e422b6878b3352af5fd61b07ed3c6f";
    const classParam = searchParams.classes.map(({classId, enrollees, cartId}) => {
      return {classId, enrollees: getEnrollees(enrollees), cartId};
    });
    api
      .post(`/payment/${user.type}`, {
        ...values,
        classes: classParam,
      })
      .then((response) => {
        if (response.data.free === true) {
          const redirectUrl = new URL(`${window.location.origin}/order-summary`);
          redirectUrl.searchParams.append("txnid", response.data.txnId);
          redirectUrl.searchParams.append("refno", response.data.txnId);
          redirectUrl.searchParams.append("status", "S");
          redirectUrl.searchParams.append("message", "Free Enrollment");
          redirectUrl.searchParams.append("param1", response.data.param1);
          window.location.replace(redirectUrl.href);
        } else {
          window.location.replace(response.data.Url);
        }
      })
      .catch((error) => {
        toast.error("Failed to connect with payment. Please try again later.");
        console.log(error);
      });
    // navigate(redirectUrl);
  };

  // const isInvalidVisit = () =>
  //   (user.type === "family" && searchParams["classes"]) ||
  //   (user.type === "learner" && searchParams["classes"]);
  useEffect(() => {
    if (!user || !searchParams["classes"]) navigate("/", { replace: true });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = useValidationSchema(checkoutValidator);

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      initialValues={{
        procId: "PYPL",
        email: user?.email,
        country: "PH",
        state: "ABR",
        city: "Adams",
      }}
      render={({ handleSubmit }) => (
        <form className="wrapper radio-input-fix" onSubmit={handleSubmit}>
          <div className="header">
            <Header />
          </div>
          <div className="content">
            {/* {isSearchParamsComplete() ? <CheckoutPaymentResponse /> : <CheckoutForm />} */}
            <CheckoutForm
              processors={processors}
              enrollees={searchParams.learners}
              classes={searchParams.classes}
              userType={user.type}
            />
          </div>
        </form>
      )}
    />
  );
}
