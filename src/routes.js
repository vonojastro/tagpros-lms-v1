/* eslint-disable no-constant-condition */
import EmailList from './components/MailView/EmailList';
import EmailContentView from './components/MailView/EmailContentView';
import Login from './components/Login';
import Register from './components/Register';
import TeacherApplicationStatus from './components/TeacherApplicationStatus';
import TeacherApplicationLayout from './components/TeacherApplication/TeacherApplicationLayout';
import TeacherApplicationStep0 from './components/TeacherApplication/TeacherApplicationStep0';
import TeacherApplicationStep1 from './components/TeacherApplication/TeacherApplicationStep1';
import TeacherApplicationStep2 from './components/TeacherApplication/TeacherApplicationStep2';
import TeacherApplicationStep3 from './components/TeacherApplication/TeacherApplicationStep3';
import TeacherApplicationStep4 from './components/TeacherApplication/TeacherApplicationStep4';
import TeacherApplicationStep5 from './components/TeacherApplication/TeacherApplicationStep5';
import TeacherClasses from './components/TeacherClasses';
import CreateClass from './components/CreateClass/component';
import TeacherLearners from './components/TeacherLearners';
import Profile from './components/Profile';
import DashboardHome from './components/DashboardHome';
import Calendar from './components/Calendar';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import VerifyAccount from './components/VerifyAccount';
// import NotFound from "./components/PageErrors/NotFound";
import { Navigate } from 'react-router-dom';
import { Terms } from './components/TeacherPolicies/Terms';
import { CommunityStandards } from './components/TeacherPolicies/CommunityStandards';
import TeacherPoliciesLayout from './components/TeacherPolicies/TeacherPoliciesLayout';
import { ClassContent } from './components/TeacherPolicies/ClassContent';
import React, { Suspense } from 'react';
import AdminDashboard from './components/Admin/contents/AdminDashboard';
import TeacherMasterlist from './components/Admin/contents/TeacherMasterlist';
import ClassMasterlist from './components/Admin/contents/ClassMasterlist';
import Landing from './components/Landing';
import ManageAccounts from './components/Admin/contents/ManageAccounts';
import ManageEmails from './components/Admin/contents/ManageEmail';
import PaymentHistory from './components/Admin/contents/PaymentHistory';
import SearchClassesPage from './components/SearchClassesPage';
import SearchDetail from './components/SearchDetail';
import CheckoutPage from './components/CheckoutPage/index';
import OrderSummaryPage from './components/OrderSummaryPage/index';
import DiscountList from './components/Admin/contents/DiscountList';
import ShoppingCart from './components/ShoppingCart';
import ContactUsPage from './components/ContactUsPage/index';

import LearnerHistory from './components/LearnerHistory';
import Messaging from './components/Messaging';
import MailView from './components/MailView';
import { ThemeProvider } from 'styled-components';
import mailViewTheme from './components/MailView/theme';
import Announcements from 'components/Admin/contents/Announcements';
import WriteMailView from 'components/MailView/WriteMailView';
import Webinar from './components/Webinar';
import Webinars from 'components/Admin/contents/Webinars';
import Pricing from 'components/Admin/contents/Pricing';
import ManageAdminAccounts from './components/Admin/contents/ManageAdminAccounts';
import AdminSetPasswordPage from './components/AdminSetPasswordPage';
import Notifications from './components/Notifications';
import SchoolLeaderLearnMore from './components/LearnMore/SchoolLeaderLearnMore';
import TeacherLearnMore from './components/LearnMore/TeacherLearnMore';
import LearnerLearnMore from './components/LearnMore/LearnerLearnMore';
import USVisitingProgram from './components/LearnMore/USVisiting';
import SchoolLeaders from 'components/Admin/contents/SchoolLeaders';
// import Payouts from "components/Admin/contents/Payouts";

import SchoolDistrictLayout from './components/School-District/SchoolDistrictLayout';
import SchoolDistrictDashboard from './components/School-District/contents/SchoolDistrictDashboard';
import SchoolDistrictTeacherMasterlist from './components/School-District/contents/SchoolDistrictTeacherMasterlist';
import SchoolDistrictShortlist from './components/School-District/contents/SchoolDistrictShortlist';
import SchoolDistrictForInterview from './components/School-District/contents/SchoolDistrictForInterview';
import SchoolDistrictFinalList from './components/School-District/contents/SchoolDistrictFinalList';
import { USER_TYPE } from 'utils/constants';
import ProtectedRoute from 'components/ProtectedRoute';
import TeacherFeaturedVideos from 'components/TeacherFeaturedVideos';
import AdminMailing from 'components/Admin/contents/Mailing';
import Surveillance from 'components/Admin/contents/Surveillance';
import Dashboard from 'components/Dashboard';
import Configurations from 'components/Admin/contents/Configurations';
import TeacherSocialMedia from 'components/TeacherPolicies/TeacherSocialMedia';
import LearnerSafetyAndPolicyForTeacher from 'components/TeacherPolicies/LearnerSafetyAndPolicyForTeacher';
import Policy from 'components/Policy';
import LearnerSafetyAndPolicyForParents from 'components/TeacherPolicies/LearnerSafetyAndPolicyForParents';
import SupportAndPolicy from 'components/Support&Policy';
import PageTemplate from 'components/Support&Policy/PageTemplate';
import Parent from 'components/Support&Policy/FAQ/general/Parent';
import ProspectiveTeachers from 'components/Support&Policy/FAQ/general/ProspectiveTeachers';
import TeacherPartnership from 'components/Support&Policy/FAQ/general/TeacherPartnership';
import TechnicalIssues from 'components/Support&Policy/FAQ/avoiding-problems/TechnicalIssues';
import TroubleshootingParents from 'components/Support&Policy/FAQ/avoiding-problems/TroubleshootingParents';
import TroubleshootingTeachers from 'components/Support&Policy/FAQ/avoiding-problems/TroubleshootingTeachers';
import TagprosParents101 from 'components/Support&Policy/GettingStarted/TagprosParents101';
import TagprosTeachers101 from 'components/Support&Policy/GettingStarted/TagprosTeachers101';
import HowToBecomeTeacher from 'components/Support&Policy/TeachersGuide/getting-started/HowToBecomeTeacher';
import HowToPrepareFirstClass from 'components/Support&Policy/TeachersGuide/getting-started/HowToPrepareFirstClass';
import TeacherApplicationSampleClassGuidelines from 'components/Support&Policy/TeachersGuide/getting-started/TeacherApplicationSampleClassGuidelines';
import MarketingOff from 'components/Support&Policy/TeachersGuide/getting-started/MarketingOff';
import TipsToGetMoreEnrollments from 'components/Support&Policy/TeachersGuide/getting-started/TipsToGetMoreEnrollments';
import ClassesFewerEnroll from 'components/Support&Policy/TeachersGuide/getting-started/ClassesFewerEnroll';
import EarningsAndRefunds from 'components/Support&Policy/TeachersGuide/getting-started/EarningsAndRefunds';
import TechnicalRequirements from 'components/Support&Policy/GettingStarted/TechnicalRequirements';
import CreateOnlineClass from 'components/Support&Policy/TeachersGuide/running-classes/CreateOnlineClass';
import ListingClass from 'components/Support&Policy/TeachersGuide/running-classes/ListingClass';
import TipsLiveClasses from 'components/Support&Policy/TeachersGuide/running-classes/TipsLiveClasses';
import ClassCriteria from 'components/Support&Policy/TeachersGuide/running-classes/ClassCriteria';
import CancellingClass from 'components/Support&Policy/TeachersGuide/running-classes/CancellingClass';
import OnlineResources from 'components/Support&Policy/TeachersGuide/running-classes/OnlineResources';
import MarketingNotificationForClasses from 'components/Support&Policy/TeachersGuide/misc-topic/MarketingNotificationForClasses';
import TaxReporting from 'components/Support&Policy/TeachersGuide/misc-topic/TaxReporting';
import TeacherRemoval from 'components/Support&Policy/TeachersGuide/misc-topic/TeacherRemoval';
import EmergenciesForTeachers from 'components/Support&Policy/TeachersGuide/misc-topic/EmergenciesForTeachers';
import CreatingAccount from 'components/Support&Policy/ParentsGuide/getting-started/CreatingAccount';
import TipsOnUsingTagprosForParents from 'components/Support&Policy/ParentsGuide/getting-started/TipsOnUsingTagprosForParents';
import EnrollingMoreThanOneChild from 'components/Support&Policy/ParentsGuide/choosing-classes/EnrollingMoreThanOneChild';
import HowTogGetReadyInFirstClass from 'components/Support&Policy/ParentsGuide/taking-classes/HowTogGetReadyInFirstClass';
import LearningWithSpecialNeeds from 'components/Support&Policy/ParentsGuide/taking-classes/LearningWithSpecialNeeds';
import HowToEnroll from 'components/Support&Policy/EnrollmentGuide/HowToEnroll';
import EnrollmentPolicies from 'components/Support&Policy/EnrollmentGuide/EnrollmentPolicies';
import RefundBasics from 'components/Support&Policy/EnrollmentGuide/RefundBasics';
import Privacy from 'components/Support&Policy/Policies/privacy-and-copyright/Privacy';
import TermsAndConditions from 'components/Support&Policy/Policies/privacy-and-copyright/TermsAndConditions';
import CopyrightComplains from 'components/Support&Policy/Policies/privacy-and-copyright/CopyrightComplains';
import CopyrightGuidance from 'components/Support&Policy/Policies/privacy-and-copyright/CopyrightGuidance';
import CommunityCodeConduct from 'components/Support&Policy/Policies/tagpros-community/CommunityCodeConduct';
import ClassContentPolicy from 'components/Support&Policy/Policies/tagpros-community/ClassContentPolicy';
import BehavingInSocialMedia from 'components/Support&Policy/Policies/tagpros-community/BehavingInSocialMedia';
import SafetyIssueResponse from 'components/Support&Policy/Policies/tagpros-community/SafetyIssueResponse';
import CommunicatingUsingTagprosPlatform from 'components/Support&Policy/Policies/tagpros-community/CommunicatingUsingTagprosPlatform';
import SafeguardingParents from 'components/Support&Policy/Policies/tagpros-community/SafeguardingParents';
import SafeguardingTeachers from 'components/Support&Policy/Policies/tagpros-community/SafeguardingTeachers';
import SearchPolicyPage from 'components/Support&Policy/SearchPolicyPage';
import TipsTeacherApplication from 'components/Support&Policy/TeachersGuide/getting-started/TipsTeacherApplication';
import RecordedClass from 'components/RecordedClass';
import PopQuiz from 'components/PopQuiz';
const JitsiMeeting = React.lazy(() => import('components/JitsiMeeting'));

const soloLearnerRoutes = [
  {
    path: 'class',
    children: [{ path: 'enroll/:classId', element: <SearchDetail /> }]
  },
  {
    path: 'profile',
    element: (
      <div>
        <Profile />
      </div>
    )
  },
  {
    path: 'cart',
    element: (
      <div>
        <ShoppingCart />
      </div>
    )
  },
  {
    path: 'history',
    element: (
      <div>
        <LearnerHistory />
      </div>
    )
  },
  {
    path: 'inbox',
    element: <Messaging />
  },
  {
    path: 'notifications',
    element: (
      <div>
        <Notifications />
      </div>
    )
  },
 
];

const familyRoutes = [
  {
    path: 'profile',
    element: (
      <div>
        <Profile />
      </div>
    )
  },
  {
    path: 'cart',
    element: (
      <div>
        <ShoppingCart />
      </div>
    )
  },
  {
    path: 'history',
    element: (
      <div>
        <LearnerHistory />
      </div>
    )
  },
  {
    path: 'inbox',
    element: <Messaging />
  },
  {
    path: 'notifications',
    element: (
      <div>
        <Notifications />
      </div>
    )
  }
];
const teacheRoutes = [
  {
    path: '/teacher-policies',
    element: (
      <div>
        <TeacherPoliciesLayout />
      </div>
    ),
    children: [
      { path: 'terms', element: <Terms /> },
      { path: 'community-standards', element: <CommunityStandards /> },
      { path: 'class-content', element: <ClassContent /> },
      { path: 'teacher-social-media-policy', element: <TeacherSocialMedia /> },
      {
        path: 'learner-safety-and-privacy-for-teacher',
        element: <LearnerSafetyAndPolicyForTeacher />
      },
      {
        path: 'learner-safety-and-privacy-for-parents',
        element: <LearnerSafetyAndPolicyForParents />
      }
    ]
  },
  {
    path: 'application',
    element: <TeacherApplicationLayout />,
    children: [
      {
        path: '',
        element: <TeacherApplicationStep0 />
      },
      {
        path: 'step-1',
        element: <TeacherApplicationStep1 />
      },
      {
        path: 'step-2',
        element: <TeacherApplicationStep2 />
      },
      {
        path: 'step-3',
        element: <TeacherApplicationStep3 />
      },
      {
        path: 'step-4',
        element: <TeacherApplicationStep4 />
      },
      {
        path: 'step-5',
        element: <TeacherApplicationStep5 />
      }
    ]
  },
  {
    path: 'application-status',
    element: <TeacherApplicationStatus />
  },
  {
    path: '/classes',
    element: <TeacherClasses />
  },
  {
    path: '/createClass',
    element: <CreateClass />
  },
  {
    path: '/editClass',
    element: <CreateClass />
  },
  {
    path: 'students',
    element: <TeacherLearners />
  },
  {
    path: 'calendar',
    element: (
      <div>
        <Calendar />
      </div>
    )
  },
  {
    path: 'profile',
    element: (
      <div>
        <Profile />
      </div>
    )
  },
  {
    path: 'notifications',
    element: (
      <div>
        <Notifications />
      </div>
    )
  },
  {
    path: 'inbox',
    element: <Messaging />
  },
  {
    path: 'feature',
    element: <TeacherFeaturedVideos/>
  }
];

const schoolDistrictRoutes = {
  path: 'school-leader',
  element: <SchoolDistrictLayout />,
  children: [
    {
      path: '',
      element: <SchoolDistrictDashboard />
    },
    {
      path: 'dashboard',
      element: <Navigate to='/school-leader' />
    },
    {
      path: 'teacher-masterlist',
      element: <SchoolDistrictTeacherMasterlist />
    },
    {
      path: 'shortlist',
      element: <SchoolDistrictShortlist />
    },
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'for-interview',
      element: <SchoolDistrictForInterview />
    },
    {
      path: 'teachers-final-list',
      element: <SchoolDistrictFinalList />
    }
  ]
};
const TestAuth = () => {
  <div>test auth</div>;
};
const getRoutes = (isLoggedIn, userType) => {
  let routes = [
    {
      path: 'mail',
      element: isLoggedIn ? (
        <ThemeProvider theme={mailViewTheme}>
          <MailView />
        </ThemeProvider>
      ) : (
        <Login />
      ),
      children: [
        { path: 'view/:threadId', element: <EmailContentView /> },
        { path: 'writer', element: <WriteMailView /> },
        { path: ':type', element: <EmailList /> },
        { path: '', element: <EmailList /> }
      ]
    },
    {
      path: 'contact-us',
      element: <ContactUsPage />
    },
    {
      path: 'policies',
      children: [
        { path: ':policy', element: <Policy /> },
      ]
    },

    // *** START OF SUPPORT AND POLICIES ROUTES *** //

    {
      path: 'support-and-policies',
      element: <SupportAndPolicy />,
      children: [
        {
          path: '',
          children: [{ path: 'avoiding-problems-in-your-class' }]
        },
        { path: 'getting-started' },
        {
          path: 'teachers-guide',
          children: [
            { path: '' },
            { path: 'running-classes' },
            { path: 'miscellaneous-topics' }
          ]
        },
        {
          path: 'parents-guide',
          children: [
            { path: '' },
            { path: 'choosing-classes' },
            { path: 'taking-classes' }
          ]
        },
        { path: 'enrollment-guide' },
        {
          path: 'policies',
          children: [{ path: '' }, { path: 'tagpros-community' }]
        }
      ]
    },
    {
      path: 'faq',
      element: <PageTemplate />,
      children: [
        {
          path: 'general',
          children: [
            { path: 'parent-faq', element: <Parent /> },
            { path: 'prospective-teachers-faq', element: <ProspectiveTeachers /> },
            {
              path: 'tagpros-teacher-partnership-program',
              element: <TeacherPartnership />
            }
          ]
        },
        {
          path: 'avoiding-problems-in-your-class',
          children: [
            { path: 'how-to-report-technical-issues', element: <TechnicalIssues /> },
            {
              path: 'troubleshooting-tips-for-parents',
              element: <TroubleshootingParents />
            },
            {
              path: 'troubleshooting-tips-for-teachers',
              element: <TroubleshootingTeachers />
            }
          ]
        }
      ]
    },
    {
      path: 'getting-started',
      element: <PageTemplate />,
      children: [
        { path: 'tagpros-parents-101', element: <TagprosParents101 /> },
        { path: 'tagpros-teachers-101', element: <TagprosTeachers101 /> },
        {
          path: 'technical-requirements-and-browser-support',
          element: <TechnicalRequirements />
        }
      ]
    },
    {
      path: 'teachers-guide',
      element: <PageTemplate />,
      children: [
        {
          path: 'getting-started',
          children: [
            {
              path: 'how-to-become-a-teacher-on-tagpros',
              element: <HowToBecomeTeacher />
            },
            {
              path: 'how-to-prepare-for-your-first-class-for-teachers',
              element: <HowToPrepareFirstClass />
            },
            {
              path: 'teacher-application-sample-class-guidelines',
              element: <TeacherApplicationSampleClassGuidelines />
            },
            {
              path: 'marketing-off-tagpros',
              element: <MarketingOff />
            },
            {
              path: 'tips-to-get-more-enrollments',
              element: <TipsToGetMoreEnrollments />
            },
            {
              path: 'classes-with-fewer-enrollments',
              element: <ClassesFewerEnroll />
            },
            {
              path: 'earnings-and-refunds',
              element: <EarningsAndRefunds />
            },
            {
              path: 'tips-for-your-teacher-application',
              element: <TipsTeacherApplication />
            }
          ]
        },
        {
          path: 'running-classes',
          children: [
            { path: 'creating-your-online-class', element: <CreateOnlineClass /> },
            { path: 'listing-your-first-class', element: <ListingClass /> },
            { path: 'tips-for-live-online-classes', element: <TipsLiveClasses /> },
            { path: 'tagpros-class-criteria', element: <ClassCriteria /> },
            { path: 'cancelling-a-class', element: <CancellingClass /> },
            { path: 'online-resources-for-teacher', element: <OnlineResources /> }
          ]
        },
        {
          path: 'miscellaneous-topics',
          children: [
            {
              path: 'tagpros-marketing-and-notifications-for-classes',
              element: <MarketingNotificationForClasses />
            },
            {
              path: 'tax-reporting-guide',
              element: <TaxReporting />
            },
            {
              path: 'teacher-removal',
              element: <TeacherRemoval />
            },
            {
              path: 'emergencies-for-teachers',
              element: <EmergenciesForTeachers />
            }
          ]
        }
      ]
    },
    {
      path: 'parents-guide',
      element: <PageTemplate />,
      children: [
        {
          path: 'getting-started',
          children: [
            { path: 'creating-your-account', element: <CreatingAccount /> },
            {
              path: 'tips-on-using-tagpros-for-parents',
              element: <TipsOnUsingTagprosForParents />
            }
          ]
        },
        {
          path: 'choosing-classes',
          children: [
            {
              path: 'enrolling-more-than-one-child-in-a-class',
              element: <EnrollingMoreThanOneChild />
            }
          ]
        },
        {
          path: 'taking-classes',
          children: [
            {
              path: 'tips-on-how-to-get-ready-for-your-first-class-for-parents',
              element: <HowTogGetReadyInFirstClass />
            },
            {
              path: 'learning-with-special-needs',
              element: <LearningWithSpecialNeeds />
            }
          ]
        }
      ]
    },
    {
      path: 'enrollment-guide',
      element: <PageTemplate />,
      children: [
        { path: 'how-to-enroll-in-a-class', element: <HowToEnroll /> },
        { path: 'enrollment-policies', element: <EnrollmentPolicies /> },
        { path: 'refund-basics', element: <RefundBasics /> }
      ]
    },
    {
      path: 'policies',
      element: <PageTemplate />,
      children: [
        {
          path: 'privacy-and-copyright-policies',
          children: [
            { path: 'privacy-policy', element: <Privacy /> },
            { path: 'terms-and-conditions', element: <TermsAndConditions /> },
            {
              path: 'creating-or-receiving-copyright-complains',
              element: <CopyrightComplains />
            },
            {
              path: 'copyright-guidance-for-your-classes',
              element: <CopyrightGuidance />
            }
          ]
        },
        {
          path: 'tagpros-community',
          children: [
            { path: 'community-code-of-conduct', element: <CommunityCodeConduct /> },
            { path: 'class-content-policy', element: <ClassContentPolicy /> },
            {
              path: 'behaving-in-social-media-for-teachers',
              element: <BehavingInSocialMedia />
            },
            { path: 'safety-issue-response', element: <SafetyIssueResponse /> },
            {
              path: 'communicating-using-tagpros-platform',
              element: <CommunicatingUsingTagprosPlatform />
            },
            {
              path: 'safeguarding-the-community-as-parents',
              element: <SafeguardingParents />
            },
            {
              path: 'safeguarding-the-community-as-teachers',
              element: <SafeguardingTeachers />
            }
          ]
        }
      ]
    },

    {
      path: '/search-policy',
      element: <SearchPolicyPage />
    },

    // *** END OF SUPPORT AND POLICIES ROUTES *** //

    {
      path: 'meetings',
      element: <ProtectedRoute isAllowed={isLoggedIn} />,
      children: [
        {
          path: ':id',
          element: (
            <Suspense fallback={<div />}>
              <JitsiMeeting />
            </Suspense>
          )
        }
      ]
    },
    {
      path: 'login',
      element: isLoggedIn ? <Navigate to='/' /> : <Login />
    },
    {
      path: 'admin',
      element: isLoggedIn ? <Navigate to='/' /> : <Navigate to='/admin-login' />
    },
    {
      path: 'admin-login',
      element: isLoggedIn ? <Navigate to='/admin' /> : <Login user='admin' />
    },
    {
      path: 'landing',
      element: isLoggedIn ? <Navigate to='/' /> : <Landing />
    },
    {
      path: 'learn-more',
      children: [
        {
          path: 'school-leader',
          element: <SchoolLeaderLearnMore />
        },
        {
          path: 'teacher',
          element: <TeacherLearnMore />
        },
        {
          path: 'learner',
          element: <LearnerLearnMore />
        },
        {
          path: 'US-Visiting-Program',
          element: <USVisitingProgram />
        }
      ]
    },
    {
      path: 'ViewRecorded/:classId',
      element: <RecordedClass />
       
    },
    {
      path: 'popQuiz',
      element: <PopQuiz/>
    },
    {
      path: 'forgot-password',
      element: isLoggedIn ? <Navigate to='/' /> : <ForgotPassword />
    },
    {
      path: 'forgot-password/reset/:token',
      element: isLoggedIn ? <Navigate to='/' /> : <ResetPassword />
    },
    {
      path: 'register',
      children: [
        { path: '', element: isLoggedIn ? <Navigate to='/login' /> : <Register /> },
        { path: 'oauth-authorized/google', element: <TestAuth /> }
      ]
    },
    {
      path: 'auth-admin/setPass/:token',
      element: <AdminSetPasswordPage />
    },
    {
      path: 'auth/verify/:token',
      element: <VerifyAccount />
    },
    { path: '/search', element: <SearchClassesPage /> },
    {
      path: 'class',
      children: [
        { path: 'enroll/:classId', element: <SearchDetail /> },
        { path: 'view/:classId', element: <SearchDetail /> }
      ]
    },
    {
      path: 'checkout',
      children: [{ path: '', element: <CheckoutPage /> }]
    },
    {
      path: 'order-summary',
      element: <OrderSummaryPage />
    },
    // {
    //   path: "order-summary",
    //   element: <OrderSummaryPage />,
    // },
    {
      path: 'webinar',
      element: isLoggedIn ? <Navigate to='/' /> : <Webinar />
    },
    {
      path: '*',
      element: isLoggedIn ? <Navigate to='/' /> : <Navigate to='/landing' />
    }
  ];

  // If user is admin, routes are prepended with /admin
  if (userType.indexOf('adm') > -1) {
    routes.push(
      {
        path: '/',
        element: isLoggedIn ? <Navigate to='/admin' /> : <Navigate to='/admin-login' />
      },
      {
        path: '/admin',
        element: <Dashboard userType={"admin"}/>,
        children: [
          {
            path: '',
            element: <AdminDashboard />
          },
          {
            path: 'teacher-masterlist',
            element: <TeacherMasterlist />
          },
          {
            path: 'class-masterlist',
            element: <ClassMasterlist />
          },
          {
            path: 'manage-adminAccounts',
            element: <ManageAdminAccounts />
          },
          {
            path: 'manage-accounts',
            element: <ManageAccounts />
          },
          {
            path: 'manage-emails',
            element: <ManageEmails />
          },
          // {
          //   path: "payment-history",
          //   element: <PaymentHistory />,
          // },
          {
            path: 'payment-history',
            element: <PaymentHistory />
          },
          {
            path: 'discounts',
            element: <DiscountList />
          },
          {
            path: 'announcements',
            element: <Announcements />
          },
          {
            path: 'school-leaders',
            element: <SchoolLeaders />
          },
          {
            path: 'mailing',
            element: <AdminMailing />
          },
          // {
          //   path: "payouts",
          //   element: <Payouts />
          // },
          {
            path: 'webinars',
            element: <Webinars />
          },
          {
            path: 'profile',
            element: (
              <div>
                <Profile user='admin' />
              </div>
            )
          },
          {
            path: 'pricing',
            element: (
              <div>
                <Pricing />
              </div>
            )
          },
          {
            path: 'surveillance',
            element: <Surveillance />
          },
          {
            path: 'config',
            element: <Configurations />
          }
        ]
      }
    );
    return routes;
  }

  if (userType === USER_TYPE.SCHOOL_LEADER) {
    routes.push(schoolDistrictRoutes);
  }

  // Else use / as "base" route
  let mainRoute = {
    path: '/',
    element: isLoggedIn ? (
      userType === USER_TYPE.SCHOOL_LEADER ? (
        <Navigate to='/school-leader' />
      ) : (
        <Dashboard userType={userType} />
      )
    ) : (
      <Navigate to='/landing' />
    ),
    children: [
      {
        path: '',
        element: <DashboardHome userType={userType} />
      }
    ]
  };

  // Add user-specific child routes to mainRoute
  mainRoute = {
    ...mainRoute,
    children: mainRoute.children.concat(
      userType === 'teacher'
        ? teacheRoutes
        : userType === 'family'
        ? familyRoutes
        : userType === 'learner'
        ? soloLearnerRoutes
        : soloLearnerRoutes
    )
  };

  routes.push(mainRoute);
  return routes;
};

export default getRoutes;
