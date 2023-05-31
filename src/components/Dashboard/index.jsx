import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { fetchUser } from 'redux/actions/auth';
import DashboardSidebar from './DashboardSidebar';
import useFreshdeskHelpWidget from 'hooks/use-freshdesk-help-widget';
import DashboardHeader from './DashboardHeader';
import DashboardBreadCrumbs from './DashboardBreadCrumbs';
import { fetchTeacherApp } from 'redux/actions/teacherApp';
import { fetchLearners } from 'redux/actions/learners';
import { fetchDashboardAccess } from 'redux/actions/admin';
import Tagpi from 'components/common/Tagpi';

export default function Dashboard({ userType }) {
  useFreshdeskHelpWidget();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, success } = useSelector(state => state.auth);

  const teacherApp = useSelector((state) => {
    const { loading, error, success, data } = state.teacherApp;
    return { loading, error, success, data };
  });

  const { loading: loadingTeacher, data} = teacherApp;
  const { loading: loadingAdmin } = useSelector(state => state.admin);

  React.useEffect(() => {
    if (!user) { 
      dispatch(fetchUser());
    }

    if(success){
      switch(userType){
        case "teacher": dispatch(fetchTeacherApp()); break;
        case "family": dispatch(fetchLearners()); break;
        case "admin": dispatch(fetchDashboardAccess()); break;
        default: return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  React.useEffect(() => {
    if (error) navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if ((loading || !user) || ((loadingTeacher || !data) && userType==='teacher') || (loadingAdmin && userType==='admin'))
    return (
      <div className='d-flex align-items-center justify-content-center min-vh-100'>
        <Tagpi type="loading" dataName="Contents of Dashboard" showSpinner={true} />
      </div>
    );
  else
    return <div>
            <div id='main-wrapper'>
                <DashboardHeader userType={userType}/>
                <DashboardSidebar userType={userType} applicationStatus={data.applicationStatus}/>
                <div className='page-wrapper' id='page-wrapper'>
                    <DashboardBreadCrumbs />
                    <div className='container-fluid'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
}
