import React from 'react';
import { useSelector } from 'react-redux';

const useFreshdeskHelpWidget = () => {
  const user = useSelector(state => state.auth.user);
  const name = user ? `${user.firstName} ${user.lastName}` : null;
  const email = user ? user.email : null;

  // Mount/Unmount Widget
  React.useEffect(() => {
    window.FreshworksWidget('boot');
    return () => {
      window.FreshworksWidget('destroy');
    };
  }, []);

  // Auto-fill personal details
  React.useEffect(() => {
    window.FreshworksWidget('identify', 'ticketForm', {
      name,
      email
    });
  }, [name, email]);
};

export default useFreshdeskHelpWidget