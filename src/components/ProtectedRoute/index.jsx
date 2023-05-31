import React, { Fragment, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function ProtectedRoute({
  redirectPath = '/landing',
  isAllowed,
  children
}) {
  const [isLoading, setIsLoading] = useState(
    typeof isAllowed === 'function' ? true : false
  );
  const location = useLocation();
  const toastId = React.useRef(null);
  const notify = () =>
    (toastId.current = toast('Loading...', {
      toastId: location.pathname,
      isLoading: true
    }));

  const navigate = useNavigate();
  const verifyIsAllowed = async () => {
    try {
      notify();
      await isAllowed();
    } catch (error) {
      navigate(redirectPath);
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };
  useEffect(() => {
    if (typeof isAllowed === 'function') verifyIsAllowed();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (isLoading) return <Fragment />;
  return isAllowed ? children || <Outlet /> : <Navigate to={redirectPath} />;
}
