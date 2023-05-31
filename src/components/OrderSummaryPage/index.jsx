import React, {useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from '../../api';
import { toMoneyFormat } from "utils/utils";

export default function OrderSummaryPage() {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const [classDetails, setclassDetails] = useState([]); 
  const navigate = useNavigate()
  
  const { email } = useSelector((state) => state.auth.user ? state.auth.user : "");
 
  const searchParams = {
    txnid: urlSearchParams.get("txnid"),
    refno: urlSearchParams.get("refno"),
    status: urlSearchParams.get("status"),
    message: urlSearchParams.get("message"),
    digest: urlSearchParams.get("digest"),
    currency: urlSearchParams.get("currency"),
    subTotal: urlSearchParams.get("subTotal"),
    total: urlSearchParams.get("total"),
    discount: urlSearchParams.get("cashDiscount"),
    classIds: urlSearchParams.get("param1").split(","),
  };

  useEffect(() => {
    async function fetchData() {
      const stat = (await api.get(`/payment/summary/${searchParams.txnid}`));
      setclassDetails(stat.data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(
    "🚀 ~ file: index.jsx ~ line 131 ~ CheckoutPage ~ searchParams",
    searchParams
  );

  //   const isSearchParamsComplete = () =>
  //     !Object.keys(searchParams).find(
  //       (searchParamName) => searchParams[searchParamName] === null
  //     );
  const handleClickBrowseMoreClasses = () => {
    navigate('/search')
  }

  const handleClickBackToDashboard = () => {
    navigate('/')
  }

  const handleClickVerify = () => {
    navigate('/history', {state: {verify: true, txnId: searchParams.txnid}});
  }

  const data = {
    paymentStatus: [
      {
        title: "Success",
        color: "#A5CB00",
        type: "success",
        message: "Your enrollment has been confirmed.",
      },
      {
        title: "Failure",
        color: "#f76025",
        type: "danger",
        message: "Your enrollment has failed.",
      },
      {
        title: "Pending",
        color: "#f7b825",
        type: "warning",
        message: "Your enrollment is pending.",
      },
      {
        title: "Unknown",
        color: "#999999",
        type: "secondary"
      },
      {
        title: "Refund",
        color: "#999999",
        type: "secondary"
      },
      {
        title: "Chargeback",
        color: "#999999",
        type: "secondary"
      },
      {
        title: "Void",
        color: "#999999",
        type: "secondary"
      },
      {
        title: "Authorized",
        color: "#999999",
        type: "secondary"
      },
    ].find(({ title }) => title.charAt(0) === searchParams["status"]),
    paymentVia: classDetails[0] ? classDetails[0].paymentMethod : "",
    billingAddress: "Philippines",
    orderDate: classDetails[0] ? (new Date(classDetails[0].createdDateTime)).toDateString() : (new Date()).toDateString(),
    transactionId: searchParams["txnid"],
    referenceNumber: searchParams["refno"],
    message: searchParams["message"],
    email: "test@gmail.com",
  };
  const currency = classDetails[0]?.currency;

  const getPaymentTypeDescription = (procId) => {
    switch(procId){
      case "PYPL": return "Paypal";
      case "OTC": return "Bank Transfer/Deposit";
      default: return procId
    }
  }

  return (
    <div className="p-2 d-flex justify-content-center">
      <div
        className="d-flex flex-column justify-content-center align-items-center shadow rounded w-100"
        style={{ maxWidth: 768, minWidth: 320, padding: "5rem" }}
      >
        <Link to="/">
          <img
            className="m-b-40 h-auto"
            src="img/tagpros-logo-small2.png"
            alt="tagpros"
            style={{ width: "100%", height: "auto", maxWidth: 320, minWidth: 200 }}
          />
        </Link>
        <div className="w-100 m-t-40" style={{ display: "grid", gridGap: "4rem" }}>
          <div className="checkout__order-details text-dark">
            <div className={`alert alert-${data.paymentStatus.type}`} role="alert">
              <p className="font-bold font-20">
                {data["paymentStatus"]["title"].toUpperCase()}
              </p>
              <p>{data["paymentStatus"]["message"]}</p>

              <div className="text-monospace">{data["message"]}</div>
            </div>
            <div className="custom-black-secondary-text">Order Details</div>
            {classDetails.map(({ thumbnailImage, title, price, enrolleescount }) => (
              <div className="checkout__order-details__detail row justify-content-between mb-3">
                <div
                  className="checkout__order-details__detail__image"
                  style={{ backgroundImage: `url(${thumbnailImage})` }}
                ></div>
                <div className="checkout__order-details__detail__description__title col ml-0">
                  {title}
                </div>
                <div className="checkout__order-details__detail__description">
                  <div className="checkout__order-details__detail__description__price--after-discount">
                    {currency} {price} <small>(X {enrolleescount})</small>
                  </div>
                  {/* <div className="checkout__order-details__detail__description__price">
                    
                    <div className="checkout__order-details__detail__description__price--before-discount">
                      {price}
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 2, background: "black", opacity: 0.1 }} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gridGap: "1rem",
            }}
          >
            {/* <div>
              <div className="font-weight-bold">Payment Status</div>
              <div>
                <span
                  style={{
                    backgroundColor: paymentStatusColor[data["paymentStatus"]],
                    color: "white",
                    padding: 4,
                    borderRadius: 5,
                    fontSize: 13,
                    letterSpacing: 2,
                  }}
                  className="font-bold"
                >
                  {data["paymentStatus"].toUpperCase()}
                </span>
              </div>
            </div> */}
            <div>
              <div className="font-weight-bold">Transaction ID</div>
              <div className="text-dark text-monospace">{data["transactionId"]}</div>
            </div>
            <div>
              <div className="font-weight-bold">Order Date</div>
              <div className="text-dark">{data["orderDate"]}</div>
            </div>
            {parseInt(classDetails.price, 10) !== 0 && (
              <div>
                <div className="font-weight-bold">Payment Via</div>
                <div className="text-dark">{getPaymentTypeDescription(data["paymentVia"])}</div>
              </div>
            )}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gridGap: "1rem",
            }}
          >
            <div>
              <div className="font-weight-bold">Billing Address</div>
              <div className="text-dark">{data["billingAddress"]}</div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gridGap: "1rem",
            }}
          >
            <div>
              <div className="font-weight-bold">Email Address</div>
              <div className="text-dark">{email}</div>
            </div>
          </div>

          <div className="checkout__summary text-dark">
            <div className="custom-black-secondary-text">Summary</div>
            <div className="checkout__summary__price">
              <div>Original Price:</div>
              <div>{toMoneyFormat(classDetails[0]?.totalPrice, classDetails[0]?.currency)}</div>
              {/* <div>{classDetails[0] ? `${currency} ${classDetails[0].totalPrice}` : ""}</div> */}
            </div>
            <div className="checkout__summary__price">
              <div>Coupon Discounts:</div>
              <div>{classDetails[0]?.totalDiscount ? `(${toMoneyFormat(classDetails[0]?.totalDiscount, classDetails[0]?.currency)})` : ''}</div>
              {/* <div>{classDetails[0] ? `${currency} ${ classDetails[0].totalDiscount }` : ""}</div> */}
            </div>
            <hr className="border-dark" />
            <div className="checkout__summary__price font-weight-bold">
              <div>Total:</div>
              <div>{toMoneyFormat((classDetails[0]?.totalPrice-classDetails[0]?.totalDiscount), classDetails[0]?.currency)}</div>
              {/* <div className="font-20">
                {classDetails[0] ? 
                  (classDetails[0].totalPrice-classDetails[0].totalDiscount) < 0 ? 
                    `${currency} 0` : `${currency} ${classDetails[0].totalPrice-classDetails[0].totalDiscount}` 
                  : ""}</div> */}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            width: "100%",
            rowGap: "0.8rem",
            marginTop: "4rem",
          }}
        >
          {data["paymentVia"] === 'OTC' && <button className="btn btn-outline-info w-100" onClick={handleClickVerify}>Verify Payment</button>}
          <button className="btn btn-outline-info w-100" onClick={handleClickBrowseMoreClasses}>Search for more classes</button>
          <button className="btn btn-outline-info w-100" onClick={handleClickBackToDashboard}>Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}
