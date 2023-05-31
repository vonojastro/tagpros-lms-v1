/* eslint-disable jsx-a11y/anchor-is-valid */
import LearnerContentLoader from '../../../LearnerContentLoader';
import React from 'react';
import ViewAllLearnersModal from '../../../ViewAllLearnersModal';
import SideBarLink from '../../../common/SideBarLink';
import Avatar from '../../../common/Avatar';
import LearnerInfoModal from '../../../LearnerInfoModal';
import { useSelector } from 'react-redux';
import { getS3Url } from 'utils/teacherApplication';
import _ from 'lodash';
import { SHOW_LEARNERS_SORT_BASIS } from '../../../../utils/constants';
import dayjs from 'dayjs';
import { useMatch } from 'react-router';
import '../index.css';

export default function FamilyDashboardSidebar() {
  const NUM_LEARNERS_DISPLAY = 5;
  const learners = useSelector(state => state.learners);
  const lastLogin = useSelector(state => state?.auth?.lastLogin);
  const atDashboardHome = useMatch('/')
  const shouldForceToAddLearner = useSelector(
    state =>
      atDashboardHome &&
      !state?.learners?.data?.length &&
      state?.auth?.lastLogin &&
      dayjs(new Date()).diff(state.auth.lastLogin, 'seconds') < 30 // not 30 seconds has passed since closing modal
  );

  React.useEffect(() => {
    if (shouldForceToAddLearner) {
      const addLearner = document.getElementById('addLearnerModal');
      addLearner.click();
    }
  }, [shouldForceToAddLearner]);
  const getSideBarItems = () => {
    let items = [
      { icon: <i className='fa fa-home' />, label: 'Home', to: '/' },
      { icon: <i className='fa fa-envelope' />, label: 'Messaging', to: '/inbox' },
      { icon: <i className='fa fa-envelope' />, label: 'Mailing', to: '/mail' }
      // {
      //   icon: <i className="fa fa-lightbulb-o"></i>,
      //   label: "My Classes",
      //   to: "/classes",
      //   children: [
      //     {
      //       label: "Search Classes",
      //       to: "/wad",
      //     },
      //     {
      //       label: "View My Classes",
      //       to: "/dwadaw",
      //     },
      //   ],
      // },
      // {
      //   icon: <i className="fa fa-clock-o"></i>,
      //   label: "My Schedule",
      //   to: "/classes",
      //   children: [
      //     {
      //       label: "View All Schedule",
      //       to: "/wdad",
      //     },
      //     {
      //       label: "Calendar View",
      //       to: "/wda",
      //     },
      //   ],
      // },
    ];

    return items;
  };

  const sideBarSections = [
    {
      sectionName: 'My Learner Dashboard',
      content: getSideBarItems().map(item => <SideBarLink key={item.label} {...item} />)
    },
    {
      sectionName: (
        <li>
          My Learners
          {learners.data.length > NUM_LEARNERS_DISPLAY && (
            <ViewAllLearnersModal
              trigger={
                <span
                  class='float-right'
                  style={{
                    fontWeight: '100',
                    color: '#00897b',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    pointerEvents: 'all'
                  }}
                >
                  View All ( {learners.data.length} )
                </span>
              }
            />
          )}
        </li>
      ),
      content: (
        <div>
          {!learners.loading &&
            learners.success &&
            _.sortBy(learners.data, SHOW_LEARNERS_SORT_BASIS)
              .slice(0, NUM_LEARNERS_DISPLAY)
              .map(learner => (
                <li style={{ pointerEvents: 'all' }}>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    <LearnerInfoModal
                      mode='update'
                      info={learner}
                      trigger={
                        <div>
                          <Avatar
                            left={
                              <img
                                src={getS3Url(learner.photo)}
                                alt={learner.nickname}
                                class='profile-pic mr-2'
                                height={30}
                                width={30}
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                              />
                            }
                            right={<span className='hide-menu'>{learner.nickname}</span>}
                            key={learner.nickname}
                          />
                        </div>
                      }
                    />
                  </a>
                </li>
              ))}
          {learners.loading && (
            <div
              className='flex flex-column justify-content-center'
              // style={{ marginLeft: 20 }}
            >
              {new Array(learners.data.length ? learners.data.length : 1)
                .fill({})
                .slice(0, NUM_LEARNERS_DISPLAY)
                .map(() => (
                  <li style={{ pointerEvents: 'all' }}>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={e => {
                        e.preventDefault();
                      }}
                    >
                      <div className='mt-2'>
                        <LearnerContentLoader />
                      </div>
                    </a>
                  </li>
                ))}
            </div>
          )}
          {/* </li> */}
          {lastLogin && (
            <li style={{ pointerEvents: 'all' }}>
              <LearnerInfoModal
                trigger={
                  <a
                    id='addLearnerModal'
                    style={{ cursor: 'pointer' }}
                    aria-expanded='false'
                    onClick={e => {
                      e.preventDefault();
                    }}
                    className='ml-2'
                  >
                    <i class='fa fa-plus mr-3' />{' '}
                    <span class='hide-menu'>Add New Learner</span>
                  </a>
                }
                mode='add'
                shouldForceToAddLearner={shouldForceToAddLearner}
              />
            </li>
          )}
        </div>
      )
    }
  ];
  return sideBarSections.map(({ sectionName, content }) => (
    <ul id='sidebarnav parent' key={sectionName} style={{ pointerEvents: 'all' }}>
      <div className='dropdown-divider' />
      <li className='nav-small-cap'>{sectionName}</li>
      {content}
    </ul>
  ));
}
