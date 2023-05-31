import React, { Fragment } from 'react';

import FamilyDashboardHome from './FamilyDashboardHome';
import TeacherDashboardHome from './TeacherDashboardHome';
import LearnerDashboardHome from './LearnerDashboardHome';
import { useWelcomeModal } from 'hooks/useWelcomeModal';
import {ErrorBoundary} from 'react-error-boundary'
import Footer from 'components/Footer'

const RenderTempFallback = () => { 
  return <Fragment />
}

const DashboardHome = ({ userType }) => {
  const [modal] = useWelcomeModal(userType);
  return (
    <Fragment>
      {modal}
      {
        {
          teacher: <ErrorBoundary FallbackComponent={RenderTempFallback}><TeacherDashboardHome /></ErrorBoundary>,
          family: <FamilyDashboardHome />,
          learner: <LearnerDashboardHome />
        }[userType]
      }
      <Footer type='dash' />
    </Fragment>
  );
};

export default DashboardHome;
