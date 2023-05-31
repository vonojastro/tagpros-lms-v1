import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";

export default function VerifyAccount() {
  const navigate = useNavigate();
  const [verify, setVerify] = React.useState({
    loading: false,
    success: false,
    error: null,
  });
  const { token } = useParams();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const errorMessages = {
    404: {
      header: `Invalid verification link`,
      body: `Please request for a new email confirmation link.`,
    },
    429: {
      header: `Too many requests`,
      body: `You've made too many attempts in a short period of time, please try again.`,
    },
    502: {
      header: `Network Error`,
      body: `An unknown error has occurred. Please try again.`,
    },
    NetworkError: {
      header: `Network Error`,
      body: `An unknown error has occurred. Please try again.`,
    },
  };
  React.useEffect(() => {
    setVerify({ ...verify, loading: true });
    api
      .post(`/auth/verify/${token}`)
      .then(() => {
        setVerify({ ...verify, success: true, loading: false });
      })
      .catch((err) => {
        setVerify({
          ...verify,
          loading: false,
          error: {
            ...verify.error,
            ...{ status: err.response ? err.response.status : "NetworkError" },
          },
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (verify.success) {
      delay(3000)
        .then(() => {
          navigate("/login");
        })
        .catch(() => {
          navigate("/login");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verify.success]);
  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center flex-column">
      {(verify.loading && (
        <>
          <div className="m-b-20">
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <span className="">Verifying your account</span>
        </>
      )) ||
        (verify.error && (
          <>
            <div className="m-b-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ height: 30, width: 30 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="font-weight-bold" style={{ color: "#F88416" }}>
              <div>{errorMessages[verify.error.status].header}</div>
            </span>
            <span className="font-14 m-t-15">
              <div>{errorMessages[verify.error.status].body}</div>
            </span>
          </>
        )) ||
        (verify.success && (
          <>
            <div className="m-b-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ height: 30, width: 30, color: "green" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="font-weight-bold" style={{ color: "green" }}>
              <div>Account Verified</div>
            </span>
            <span className="font-14 m-t-15 text-center">
              <div>You can now log in with your account.</div>
              <div className="m-t-20 text-dark">Redirecting you to login...</div>
            </span>
          </>
        ))}
    </div>
  );
}
