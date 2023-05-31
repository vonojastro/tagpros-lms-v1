import moment from 'moment';

import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(LocalizedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
export const getDuration = (startTime, endTime, numberOnly) => {
  if (!startTime || !endTime) return '';
  var duration = moment.duration(
    moment(endTime, 'hh:mm A').diff(moment(startTime, 'hh:mm A'))
  );
  var hours = parseInt(duration.asHours());
  var minutes = parseInt(duration.asMinutes()) % 60;

  if (numberOnly) return parseInt(duration.asMilliseconds());

  var message = '';

  if (hours > 0) {
    message += `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  if (minutes > 0) {
    if (hours > 0) {
      message += ` and `;
    }
    message += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  return message;
};
/**
 * @param  {string} procId
 * @param  {Object.<string, {acronym: string; name: string; logo: string; type: number; status: string; remarks: string; procId: string; minAmount: number; maxAmount: number; currencies: string; dayOfWeek: string; startTime: string; endTime: string;}[]>} paymentMethods
 * @returns {{acronym: string; name: string; logo: string; type: number; status: string; remarks: string; procId: string; minAmount: number; maxAmount: number; currencies: string; dayOfWeek: string; startTime: string; endTime: string;}}
 */
export const getPaymentMethodByProcId = (procId, paymentMethods) => {
  console.log(
    '🚀 ~ file: utils.js ~ line 31 ~ getPaymentMethodByProcId ~ paymentMethods',
    paymentMethods
  );
  const keys = Object.keys(paymentMethods);
  let paymentMethod = null;
  keys.every(paymentMethodCategory => {
    const found = paymentMethods[paymentMethodCategory].find(
      pmc => pmc.procId === procId
    );
    if (found) {
      paymentMethod = found;
      return false;
    }
    return true;
  });
  return paymentMethod
    ? paymentMethod
    : new Error('No payment method found for procId=' + procId);
};

export const toMoneyFormat = (n, currency) => {
  const curr = currency ? currency : 'USD';
  try {
    const value = parseFloat(n).toFixed(2);

    if (isNaN(value)) return '-';

    return `${curr} ${Number(value).toLocaleString('en', { minimumFractionDigits: 2 })}`;
  } catch (e) {
    return `${curr}  ${Number(parseFloat(0).toFixed(2)).toLocaleString('en', {
      minimumFractionDigits: 2
    })}`;
  }
};
