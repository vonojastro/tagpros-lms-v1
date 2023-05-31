import { useNavigate } from 'react-router-dom';
// import moment from 'moment-timezone';as
import { getDuration, toMoneyFormat } from 'utils/utils';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import dayjs from 'dayjs';
import he from 'he';
import { CLASS_STATUS_ALERT } from 'utils/constants';

// import { useSelector } from "react-redux";

export default function SearchCard({ classData, classStatus }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(LocalizedFormat);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  const navigate = useNavigate();

  return (
    <div className='shop-prod-item'>
      <a href={'/class/enroll/' + classData.classId} className='img-hover-1'>
        <img
          alt='100%x280'
          style={{ width: '19vw', height: '11vw', objectFit: 'cover' }}
          src={
            classData.thumbnailImage
              ? classData.thumbnailImage
              : '../assets/images/image-placeholder.jpg'
          }
        />
      </a>
      <div className='description' style={{ minWidth: '50%' }}>
        <article>
          <div className='stars mb-3'>
            <i className='fa fa-star mr-2 tagstar' />
            <i className='fa fa-star mr-2 tagstar' />
            <i className='fa fa-star mr-2 tagstar' />
            <i className='fa fa-star mr-2 tagstar' />
            <i className='fa fa-star mr-2 tagstar' />
            {/* {isLoggedIn && <i className="fa fa-heart float-right mr-2 tagheart" />} */}
          </div>
          <a href={'/class/enroll/' + classData.classId}>
            <h6 className='h6 hover-1'>{he.decode(classData.title)}</h6>
          </a>
          {classStatus !== '' && (
            <div
              className={`alert alert-${CLASS_STATUS_ALERT[classStatus].type}`}
              role='alert'
            >
              <i
                className={`${CLASS_STATUS_ALERT[classStatus].icon} mr-2`}
                style={{ color: 'orange' }}
              />
              {CLASS_STATUS_ALERT[classStatus].message}{' '}
              {classStatus === 'NOT_STARTED' && classData.enrollmentStartDate && (
                <b>{dayjs(classData.enrollmentStartDate).format('ll')}</b>
              )}
            </div>
          )}

          <div class='d-flex flex-row'>
            <div class='p-2'>
              <img
                className=''
                src={
                  !!classData.photo
                    ? classData.photo
                    : './assets/images/image-placeholder.jpg'
                }
                alt='user'
                style={{
                  width: '35px',
                  height: '35px',
                  objectFit: 'cover',
                  verticalAlign: 'middle',
                  borderRadius: '100%'
                }}
              />{' '}
            </div>
            <div class='align-self-center'>
              <b>
                {!!classData.salutation && classData.salutation}{' '}
                {!!classData.nickname
                  ? classData.nickname
                  : `${classData.lastName}, ${classData.firstName}`}
              </b>
            </div>
          </div>
          <div className='empty-space h5-xs' />
          <div className='class-desc'>
            <p>{he.decode(classData.classIntroduction)}</p>
            <br />
            <p>
              {/* <span>
                <i className='fa fa-calendar-alt mr-2 text-muted' />
                Enrollment Date:{' '}
                {classData.enrollmentStartDate &&
                  dayjs(classData.enrollmentStartDate).format('YYYY/MM/DD')}
              </span> */}
              {classData.availableDates ? (
                <span>
                  <i className='fa fa-calendar-alt text-muted' />{' '}
                  {classData.availableDates &&
                    'No. of Sessions : ' + classData.availableDates.length}
                  <br />
                  {classData.availableDates.map(date => (
                    <div>
                      &emsp;
                      <i className='fa fa-caret-right text-muted' />
                      {' ' +
                        dayjs(
                          dayjs
                            .tz(
                              `${dayjs(date).format('YYYY/MM/DD')} ${
                                classData.startTime
                              }`,
                              'YYYY/MM/DD HH:mm:ss',
                              classData.timeZone
                            )
                            .format()
                        )
                          .tz(
                            Intl.DateTimeFormat().resolvedOptions().timeZone
                              ? Intl.DateTimeFormat().resolvedOptions().timeZone
                              : classData.timeZone
                          )
                          .format('dddd, LL')}
                      <br />
                    </div>
                  ))}
                </span>
              ) : (
                <span>
                  <i className='fa fa-calendar-alt mr-2 text-muted' /> Starting{' '}
                  {classData.startDate &&
                    classData.startTime &&
                    classData.timeZone &&
                    dayjs(
                      dayjs
                        .tz(
                          `${classData.startDate} ${classData.startTime}`,
                          'YYYY/MM/DD HH:mm:ss',
                          classData.timeZone
                        )
                        .format()
                    )
                      .tz(
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                          ? Intl.DateTimeFormat().resolvedOptions().timeZone
                          : classData.timeZone
                      )
                      .format('YYYY/MM/DD')}
                </span>
              )}
              <span>
                <i className='fa fa-clock mr-2 text-muted' />
                Time:{' '}
                {classData.startDate &&
                  classData.startTime &&
                  classData.timeZone &&
                  dayjs(
                    dayjs
                      .tz(
                        `${classData.startDate} ${classData.startTime}`,
                        'YYYY/MM/DD HH:mm:ss',
                        classData.timeZone
                      )
                      .format()
                  )
                    .tz(
                      Intl.DateTimeFormat().resolvedOptions().timeZone
                        ? Intl.DateTimeFormat().resolvedOptions().timeZone
                        : classData.timeZone
                    )
                    .format('hh:mm A')}
                -{' '}
                {classData.startDate &&
                  classData.endTime &&
                  classData.timeZone &&
                  dayjs(
                    dayjs
                      .tz(
                        `${classData.startDate} ${classData.endTime}`,
                        'YYYY/MM/DD HH:mm:ss',
                        classData.timeZone
                      )
                      .format()
                  )
                    .tz(
                      Intl.DateTimeFormat().resolvedOptions().timeZone
                        ? Intl.DateTimeFormat().resolvedOptions().timeZone
                        : classData.timeZone
                    )
                    .format('hh:mm A')}
              </span>
              <span>
                &nbsp;&nbsp;&emsp;Duration:{' '}
                {classData.startDate &&
                  classData.endTime &&
                  getDuration(classData.startTime, classData.endTime)}
              </span>
              <span>
                <i className='fa fa-graduation-cap mr-2 text-muted' />
                {classData.ageCategory}
              </span>
              <span>
                <i className='fa fa-users mr-2 text-muted' />
                {(classData.minLearners ? classData.minLearners : 0) +
                  ' - ' +
                  (classData.maxLearners ? classData.maxLearners : 0)}{' '}
                learners per class
              </span>
            </p>
          </div>
          <button
            className='btn btn-outline-success mt-4 w-100 btn-list-view'
            onClick={() => navigate('/class/enroll/' + classData.classId)}
            style={{ display: 'block', width: '100%' }}
          >
            View Class
          </button>
        </article>
      </div>
      <span className='price text-left'>
        <div className='class-price'>
          <h5>
            {classData.price
              ? toMoneyFormat(classData.price, classData.currency)
              : 'FREE'}
          </h5>{' '}
          per class
          {/* <span className="badge badge-danger">50% OFF</span> */}
        </div>
      </span>
      <button
        onClick={() => navigate('/class/enroll/' + classData.classId)}
        className='btn btn-outline-success mt-4 w-100 btn-card-view'
      >
        View Class
      </button>
    </div>
  );
}
