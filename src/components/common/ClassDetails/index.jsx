import React, { Fragment, useState } from 'react';
import { Container, ActionButton, Layout } from './styles';
import defaultContainerStyles from 'css/new-age.scoped.css';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { isArray, isString } from 'lodash';
import { CLASS_STATUS_ALERT } from 'utils/constants';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import he from 'he';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import { toMoneyFormat, getDuration } from 'utils/utils';
import DefaultPic from '../../../img/default-pic-blue1.png'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(LocalizedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const getStatusDisplay = data => {
  const startDate = data.startDate;
  const endDate = data.endDate;
  if(data.status === 'CSTAT010'){
    return "CLASS_ONGOING";
  }else if(data.status === 'CSTAT011'){
      return "CLASS_ENDED";
  }else{
      // if(!!enrollmentStart && dayjs().isBefore(dayjs(enrollmentStart), new Date())){
      //     setStatus("NOT_STARTED")
      // }else  if(!!enrollmentStart && !!enrollmentEnd && dayjs().isSameOrAfter(dayjs(enrollmentStart), new Date()) && dayjs().isSameOrBefore(dayjs(enrollmentEnd), new Date())){
      if(!!startDate && dayjs().isSameOrBefore(startDate)){
          return "ONGOING_ENROLLMENT";
      }
      // else if(!!enrollmentEnd && !!startDate && dayjs().isAfter(dayjs(enrollmentEnd), new Date()) && dayjs().isBefore(dayjs(startDate), new Date())){
      //     setStatus("OPENS_SOON")
      // }
      else if(!!startDate && !!endDate && dayjs().isSameOrAfter(dayjs(startDate), new Date()) && dayjs().isSameOrBefore(dayjs(endDate), new Date())){
          return "CLASS_ONGOING";
      }else{
          return "CLASS_ENDED";
      }
  }
};
function getTime({ startDate, startTime, endTime, timeZone }) {
  let result = '';
  if (startDate && startTime && timeZone) {
    result += dayjs(
      dayjs.tz(`${startDate} ${startTime}`, 'YYYY/MM/DD HH:mm:ss', timeZone).format()
    )
      .tz(
        Intl.DateTimeFormat().resolvedOptions().timeZone
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : timeZone
      )
      .format('hh:mm A');

    if (endTime) {
      result += ' - ';
      result += dayjs(
        dayjs.tz(`${startDate} ${endTime}`, 'YYYY/MM/DD HH:mm:ss', timeZone).format()
      )
        .tz(
          Intl.DateTimeFormat().resolvedOptions().timeZone
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : timeZone
        )
        .format('hh:mm A');
    }
  }
  return result;
}
function formatDate(date, { startDate, startTime, timeZone }) {
  try {
    return dayjs(
      dayjs
        .tz(
          date
            ? `${dayjs(date).format('YYYY/MM/DD')} ${startTime}`
            : `${startDate} ${startTime}`,
          'YYYY/MM/DD HH:mm:ss',
          timeZone
        )
        .format()
    )
      .tz(timeZone?.length ? timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format('dddd, LL');
  } catch (error) {}
}
export const Item = props => {
  const {
    ageCategory,
    className,
    thumbnailImage,
    title,
    enrollmentDate,
    startDate,
    rating,
    timeZone,
    startTime,
    endTime,
    minLearners,
    maxLearners,
    firstName,
    lastName,
    nickname,
    salutation,
    classIntroduction,
    enrollment,
    classId,
    availableDates,
    price,
    currency,
    photo
  } = props;
  const actionBtnProps = {
    className: 'btn btn-outline-success class-action',
    as: NavLink,
    children: 'View Class',
    to: `/class/enroll/${classId}`,
    target: '_blank',
    rel: 'noreferrer',
    replace: true
  };
  const Schedule = ({ date }) => {
    return <p>{date}</p>;
  };
  const renderSchedule = () => {
    const data = availableDates?.length
      ? availableDates?.map(date => formatDate(date, { timeZone, startTime }))
      : formatDate(null, { startDate, timeZone, startTime });

    if (isArray(data))
      return (
        <Fragment>
          <div>
            <b>Sessions:</b> {data.length}
          </div>
          {data.map(date => (
            <Schedule key={date} date={date} />
          ))}
        </Fragment>
      );
    else if (isString(data)) return <Schedule date={data} />;
  };
  const classStatus = getStatusDisplay(props);
  const handleImageError = e => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = '../assets/images/image-placeholder.jpg';
  };
  const getLearners = () =>
    `${minLearners} - ${maxLearners} ${
      maxLearners === 1 ? 'learner' : 'learners'
    }`;
  const isLoading = !props.classId?.length;

  const getPrice = () => {
    const hasPrice = price?.length && parseFloat(price) > 0;
    let value = hasPrice ? toMoneyFormat(price, currency) : 'Free';
    return (
      
        <span className='font-bold font-20'>{value}</span>
      
    );
  };
  const getTeacherName = () => { 
    let teacherName = '';
    teacherName = teacherName.concat(salutation);
    if(teacherName.length) teacherName = teacherName.concat(' ');
    teacherName = teacherName.concat(nickname);
    if(teacherName.length) return teacherName; 

    // if salutation and nickname are empty, use first and last name
    teacherName = teacherName.concat(lastName);
    if(teacherName.length) teacherName = teacherName.concat(', ');
    teacherName = teacherName.concat(firstName);

    return teacherName;
  }
  return (
    <Container
      className={className}
      style={defaultContainerStyles}
      to={`/class/enroll/${classId}`}
      target='_blank'
      rel='noreferrer'
      replace={true}
    >
      <div className='teacher-thumbnail'>
        {(isLoading && <Skeleton height={'100%'} width={'100%'} />) || (
          <img
            src={thumbnailImage}
            alt={title}
            onError={handleImageError}
          />
        )}
      </div>
      <div class='stars' data-v-fb364d95=''>
        {(isLoading && <Skeleton />) ||
          new Array(rating)
            .fill({})
            .map((_, index) => (
              <i class='fa fa-star mr-2 tagstar' data-v-fb364d95={index} key={index} />
            ))}
      </div>
      <h5 className='title'>{!isLoading ? he.decode(title) : <Skeleton count={3} />}</h5>

      {(!isLoading && title && (
        <div
          className={`class-status-description alert alert-${CLASS_STATUS_ALERT[classStatus].type}`}
          role='alert'
        >
          <i
            className={`${CLASS_STATUS_ALERT[classStatus].icon} mr-2`}
            style={{ color: 'orange' }}
          />
          {CLASS_STATUS_ALERT[classStatus].message}{' '}
          {classStatus === 'NOT_STARTED' && props.enrollmentStartDate && (
            <b>{dayjs(props.enrollmentStartDate).format('ll')}</b>
          )}
        </div>
      )) || <Skeleton height={45} />}
      <div className='teacher-info'>
        {firstName && (
          <Fragment>
            <div>
              <img 
                src={photo !== undefined && photo !== null &&
                (typeof photo === 'string' || photo instanceof String) &&
                  photo.includes("https://tagprosbucket")? photo  : DefaultPic} 
                alt={firstName}  
               onError={handleImageError}
              />
            </div>
            <h6>{getTeacherName()}</h6>
          </Fragment>
        )}
      </div>

      <p className='class-intro-text'>
        {classIntroduction ? he.decode(classIntroduction) : <Skeleton />}
      </p>
      <div className='main-info'>
        {enrollment && (
          <div>
            <i className='fa fa-calendar-alt' />
            <p>Enrollment: {enrollmentDate}</p>
          </div>
        )}
        {!isLoading && (
          <div>
            <i className='fa fa-calendar-alt' />
            <p>{renderSchedule()}</p>
          </div>
        )}
        {!isLoading && (
          <div>
            <i className='fa fa-clock' />
            <p>Time: {getTime(props)}</p>
          </div>
        )}
        {!isLoading && (
          <div>
            <i className='ml-3' />
            <p>Duration: {getDuration(startTime, endTime)}</p>
          </div>
        )}
        {!isLoading && (
          <div>
            <i className='fa fa-graduation-cap' />
            <p>{ageCategory}</p>
          </div>
        )}
        {!isLoading && (
          <div>
            <i className='fa fa-users' />
            <p>{getLearners()}</p>
          </div>
        )}
      </div>

      {!isLoading && (
        <div className='price alert alert-warning m-0 '>
          <p>{getPrice()}</p>
        </div>
      )}

      {!isLoading && <ActionButton {...actionBtnProps} />}
    </Container>
  );
};

Item.defaultProps = {
  rating: 5,
};
const ClassDetails = props => {
  const [dataLength, setDataLength] = useState(4);
  const increaseDataLength = async () => {
    await new Promise(r => setTimeout(r, 1000));
    setDataLength(dataLength + 4);
  };

  if (props.loading) return props.loadingPlaceholder;
  if (!props.loading && _.isEmpty(props.data)) return props.emptyDataPlaceholder;
  if (props.data.length || props.data.classId)
    return (
      <Layout
        className={props.className}
        dataLength={dataLength}
        as={InfiniteScroll}
        hasMore={props.data?.length > dataLength}
        next={increaseDataLength}
        loader={new Array(Math.min(Math.abs(props.data?.length - dataLength), 4))
          .fill({})
          .map(() => (
            <Item />
          ))}
      >
        {!props.data?.length ? (
          <Item key={props?.classId} {...props} />
        ) : (
          props.data
            .slice(0, dataLength)
            .map(props => <Item key={props?.classId} {...props} />)
        )}
      </Layout>
    );
  return <Layout className={props.className} />;
};
ClassDetails.defaultProps = {
  get maxShow() {
    return this.max || this.data?.length || 1;
  }
};
export default ClassDetails;
