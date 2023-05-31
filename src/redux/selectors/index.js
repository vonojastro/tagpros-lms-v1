import moment from 'moment';
import _ from 'lodash';

export const getStatusDisplays = (state) => {
  const ref = state.classes.getIn(['data', 'class']) || [];
  let result = new Set(ref.map(e => e.statusDisplay));
  const label = {
    CLASS_ENDED: 'Ended class',
    CLASS_ONGOING: 'Ongoing',
    ONGOING_ENROLLMENT: 'For Enrollment',
    NOT_STARTED: 'Not started',
    OPENS_SOON: 'Opens soon',
  };
  const ret = Array.from(result).map(e => ({ label: label[e] || "unlabelled", value: e }));
  const order = ['CLASS_ONGOING', 'ONGOING_ENROLLMENT', 'NOT_STARTED', 'OPENS_SOON', 'CLASS_ENDED'];
  return _.sortBy(ret, e => order.indexOf(e.value));
};

const getCategoryCodes = data => {
  if (!data?.length) return [];

  let result = new Set();
  data.forEach(r => {
    result.add(r.categoryCode);
  });
  return Array.from(result).map(e => ({ label: e, value: e }));
};
export const classCategoriesSelector = state => {
  const classes = state.classes.getIn(['data', 'class']) || [];
  return getCategoryCodes(classes);
};

export const scheduleListSelector = state => {
  const array = state.classes.getIn(['data', 'class']) || [];

  var temp = array.map(item => {
    return moment(item.startDate, 'YYYY/MM/DD').format('MMMM YYYY');
  });

  var temp2 = [];
  array.forEach(item => {
    if (!!item.availableDates && item.availableDates.length > 0) {
      item.availableDates.forEach(dateitem => {
        temp2.push(moment(dateitem).format('MMMM YYYY'));
      });
    }
  });

  temp = temp.concat(temp2).filter((value, index, self) => self.indexOf(value) === index);
  temp = temp.sort(
    (a, b) => moment(a, 'MMMM YYYY').valueOf() - moment(b, 'MMMM YYYY').valueOf()
  );
  temp = _.filter(temp, item => {
    return item?.toLowerCase?.() !== 'invalid date';
  });

  return temp;
};
