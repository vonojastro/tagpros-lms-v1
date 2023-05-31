import { Facebook, Mail } from 'react-feather';
export const APPLICATION_STATUS = {
  DRAFT: 'ASTAT001',
  PENDING: 'ASTAT002',
  APPROVEDHR: 'ASTAT003',
  REJECTEDHR: 'ASTAT004',
  RETURNEDHR: 'ASTAT005',
  CANCELLED: 'ASTAT006',
  DELETE: 'ASTAT007',
  APPROVEDEDUC: 'ASTAT008',
  REJECTEDEDUC: 'ASTAT009',
  RETURNEDEDUC: 'ASTAT010'
};

export const ADMIN_TYPES = {
  MAIN_ADMIN: 'ADMMA',
  HR: 'ADMHR',
  EDUC: 'ADMEDUC',
  ACCTG: 'ADMACCTG',
  MKTG: 'ADMMKTG',
  CURATOR: 'ADMCURATOR'
};

export const TEACHER_STATUS = {
  PENDING: 'TSTAT001',
  SHORTLISTED: 'TSTAT002',
  APPROVED: 'TSTAT003',
  FOR_INTERVIEW: 'TSTAT004',
  REJECTED: 'TSTAT005',
  ACCEPTED: 'TSTAT006'
};

export const CLASS_STATUS = {
  DRAFT: 'CSTAT001',
  PENDING: 'CSTAT002',
  APPROVEDHR: 'CSTAT003',
  APPROVEDEDUC: 'CSTAT004',
  REJECTEDHR: 'CSTAT005',
  REJECTEDEDUC: 'CSTAT006',
  RETURNED: 'CSTAT007',
  CANCELLED: 'CSTAT008',
  DELETE: 'CSTAT009',
  STARTED: 'CSTAT010',
  COMPLETED: 'CSTAT011',
  FOR_EDITING: 'CSTAT012'
};

export const USER_CODES = {
  ADMACCTG: 'Accounting',
  ADMCURATOR: 'Curator',
  ADMEDUC: 'Educ',
  ADMHR: 'H.R.',
  ADMIN: 'Admin',
  ADMMA: 'Main Admin',
  ADMMKTG: 'Marketing',
  ADMSA: 'Super Admin',
  FAMILY: 'Family',
  LEARNER: 'Learner',
  SCHOOL_LEADER: 'School Leader',
  TEACHER: 'Teacher'
};
export const USER_TYPE = {
  // References TBL_REF_USER_GROUP.PREFIX
  LRNR: 'Learner',
  FMLY: 'Family',
  PRNT: 'Parent',
  TCHR: 'Teacher',
  ADM: 'Admin',
  SL: 'School Leader',

  // References TBL_REF_USER_GROUP.USER_GROUP
  // Backend always returns lowercase
  SCHOOL_LEADER: 'SCHOOL_LEADER'.toLocaleLowerCase(),
  FAMILY: 'FAMILY'.toLocaleLowerCase(),
  LEARNER: 'LEARNER'.toLocaleLowerCase()
  // SUPER_ADMIN:
  // MAIN_ADMIN:
  // etc
};

export const ACCOUNT_STATUS = {
  PENDING: 'ACSTAT001',
  ACTIVE: 'ACSTAT002',
  DEACTIVATED: 'ACSTAT003',
  SUSPENDED: 'ACSTAT004'
};

export const PAYMENT_STATUS = {
  UNPAID: 'PSTAT001',
  PAID: 'PSTAT002',
  FOR_REFUND: 'PSTAT003',
  REFUNDED: 'PSTAT004',
  CANCELLED: 'PSTAT005',
  PENDING: 'PSTAT006',
  FAILED: 'PSTAT007',
  CHARGEBACK: 'PSTAT008',
  UNKNOWN: 'PSTAT009',
  VOID: 'PSTAT010',
  PAYOUT_SENT: 'PSTAT011',
  FOR_VERIFICATION: 'PSTAT012'
};

export const PAYMENT_PROOF_STATUS = {
  PENDING: 'PRSTAT001',
  ACCEPTED: 'PRSTAT002',
  REJECTED: 'PRSTAT003',
};

export const SHOW_LEARNERS_SORT_BASIS = ['nickname'];
export const NUM_LEARNERS_DISPLAY = 5;

export const LEARNER_GRADE_LEVELS = [
  { label: 'Kinder to Grade 6', value: 'GLVL01' },
  { label: 'Grade 7 - 10 / Junior High', value: 'GLVL02' },
  { label: 'Grade 11 - 12 / Senior High', value: 'GLVL03' },
  { label: 'College', value: 'GLVL04' }
];

export const TEACHER_APPLICATION_FORM_ROUTES = [
  '/application',

  '/application/step-1',

  '/application/step-2',

  '/application/step-3',

  '/application/step-4',

  '/application/step-5'
];

// export const CHECKOUT_PAGE_TOP_PAYMENT_METHODS = ["GCSH", "PYPL", "CC"]; // Array of procId
export const CHECKOUT_PAGE_TOP_PAYMENT_METHODS = ['BOG', 'GCSH', 'PYPL']; // Array of procId

export const AGE_CATEGORIES = [
  { label: '4-6 years', value: 'AGE001' },
  { label: '7-10 years', value: 'AGE002' },
  { label: '11-16 years', value: 'AGE003' },
  { label: '17-19 years', value: 'AGE004' }
];

export const ENROLLMENT_STATUS = {
  PENDING: 'ESTAT002',
  SUCCESS: 'ESTAT001',
  CANCELLED: 'ESTAT003',
  REFUNDED: 'ESTAT004',
  DEFERRED: 'ESTAT005',
  FOR_REFUND: 'ESTAT006',
  COMPLETED: 'ESTAT007',
  FOR_PAYOUT: 'ESTAT008',
  PAYOUT_PAID: 'ESTAT009'
};

const PAYMENT_EXPORT_COLUMNS = [
  {
    title: 'No.',
    key: 'no',
    custom: (item, index) => index + 1,
    style: { font: { bold: true } }
  },
  { title: 'Transaction ID', key: 'transactionId', style: { font: { bold: true } } },
  { title: 'Account Name', key: 'payor', style: { font: { bold: true } } },
  { title: 'Account Type', key: 'payorType', style: { font: { bold: true } } },
  {
    title: 'Learners',
    key: 'learner',
    custom: item => (item.learner ? item.learner : item.payor),
    style: { font: { bold: true } }
  },
  { title: 'Class Title', key: 'classTitle', style: { font: { bold: true } } },
  { title: 'Class Schedule', key: 'startDate', style: { font: { bold: true } } },
  {
    title: 'Class Price',
    key: 'classPrice',
    custom: item => `${item.currency} ${item.price}`,
    style: { font: { bold: true } }
  },
  { title: 'Class Status', key: 'classStatus', style: { font: { bold: true } } },
  {
    title: 'Payment Status',
    key: 'status',
    type: 'status',
    style: { font: { bold: true } }
  },
  {
    title: 'Transaction Type',
    key: 'type',
    custom: () => 'sales',
    style: { font: { bold: true } }
  },
  { title: 'Discount Code', key: 'discountCode', style: { font: { bold: true } } },
  { title: 'Total Discount', key: 'totalDiscount', style: { font: { bold: true } } },
  { title: 'Teacher Name', key: 'teacher', style: { font: { bold: true } } },
  {
    title: 'Teacher Payout Account',
    key: 'payoutAccount',
    custom: item =>
      item.teacherPayoutNum ? `${item.processor} - ${item.teacherPayoutNum}` : '',
    style: { font: { bold: true } }
  },
  { title: 'Payout Date', key: 'payoutDate', style: { font: { bold: true } } },
  {
    title: 'Tagpros Net Revenue',
    key: 'netRevenue',
    custom: item => item.price * 0.3 - item.totalDiscount,
    style: { font: { bold: true } }
  },
  {
    title: 'Gateway Fees (2%)',
    key: 'gatewayFees',
    custom: item => item.price * 0.2,
    style: { font: { bold: true } }
  },
  {
    title: 'Amount Deposited to Tagpros',
    key: 'depositAmount',
    custom: item => item.price - item.price * 0.2,
    style: { font: { bold: true } }
  },
  {
    title: 'Earned Partnership Revenue',
    key: 'ePartnerRevenue',
    style: { font: { bold: true } }
  },
  {
    title: 'Net Partnership Revenue',
    key: 'netPartnerRevenue',
    custom: item => item.price - item.totalDiscount,
    style: { font: { bold: true } }
  },
  {
    title: 'Teacher Earnings',
    key: 'teacherEarnings',
    custom: item => item.price * 0.7,
    style: { font: { bold: true } }
  },
  {
    title: 'Tagpros Gross Revenue',
    key: 'grossRevenue',
    custom: item => item.price * 0.3,
    style: { font: { bold: true } }
  },
  {
    title: 'Transaction Date',
    key: 'createdDateTime',
    type: 'date',
    format: 'MM/DD/YYYY HH:MM a',
    style: { font: { bold: true } }
  }
];

const TEACHER_EXPORT_COLUMNS = [
  {
    title: 'No.',
    key: 'no',
    custom: (item, index) => index + 1,
    style: { font: { bold: true } }
  },
  { title: 'Name', key: 'name', style: { font: { bold: true } } },
  { title: 'Email', key: 'email', style: { font: { bold: true } } },
  { title: 'Contact Number', key: 'contactNumber', style: { font: { bold: true } } },
  { title: 'Birthday', key: 'dateOfBirth', style: { font: { bold: true } } },
  { title: 'Address', key: 'address', style: { font: { bold: true } } },
  {
    title: 'Application Date',
    key: 'createdDatetime',
    type: 'date',
    format: 'MM/DD/YYYY HH:MM a',
    style: { font: { bold: true } }
  },
  {
    title: 'Status',
    key: 'applicationStatus',
    type: 'status',
    style: { font: { bold: true } }
  },
  {
    title: 'Last Update',
    key: 'updatedDatetime',
    type: 'date',
    format: 'MM/DD/YYYY HH:MM a',
    style: { font: { bold: true } }
  }
];

const CLASS_EXPORT_COLUMNS = [
  {
    title: 'No.',
    key: 'no',
    custom: (item, index) => index + 1,
    style: { font: { bold: true } }
  },
  { title: 'Title', key: 'title', style: { font: { bold: true } } },
  { title: 'Type', key: 'classType', style: { font: { bold: true } } },
  { title: 'Category', key: 'categoryCode', style: { font: { bold: true } } },
  { title: 'Sub-category', key: 'subCategoryCode', style: { font: { bold: true } } },
  { title: 'Learning Goals', key: 'learningGoals', style: { font: { bold: true } } },
  { title: 'Min Learner/s', key: 'minLearners', style: { font: { bold: true } } },
  { title: 'Max Learner/s', key: 'maxLearners', style: { font: { bold: true } } },
  { title: 'Jitsi Link', key: 'jitsiLink', style: { font: { bold: true } } },
  {
    title: 'Price',
    key: 'price',
    custom: item => `${item.currency} ${item.price}`,
    style: { font: { bold: true } }
  },
  {
    title: 'Teacher',
    key: 'teacher',
    custom: item => `${item.lastName}, ${item.firstName}`,
    style: { font: { bold: true } }
  },
  { title: 'Email', key: 'email', style: { font: { bold: true } } },
  { title: 'Start Date', key: 'startDate', style: { font: { bold: true } } },
  { title: 'End Date', key: 'endDate', style: { font: { bold: true } } },
  {
    title: 'Date Created',
    key: 'createdDatetime',
    type: 'date',
    format: 'MM/DD/YYYY HH:MM a',
    style: { font: { bold: true } }
  },
  { title: 'Status', key: 'status', type: 'status', style: { font: { bold: true } } },
  {
    title: 'Last Update',
    key: 'updatedDatetime',
    type: 'date',
    format: 'MM/DD/YYYY HH:MM a',
    style: { font: { bold: true } }
  }
];

const PRICING_EXPORT_COLUMNS = [
  // {
  //   title: 'No.',
  //   key: 'no',
  //   custom: (item, index) => index + 1,
  //   style: { font: { bold: true } }
  // },
  // { title: 'Currency', key: 'currency' },
  // { title: 'Amount', key: 'amount' },
  // { title: 'Added By', key: 'addedBy' },
  // { title: 'Status', key: 'status' },
  // {
  //   title: 'Last Update Date',
  //   key: 'updatedDateTime',
  //   type: 'date',
  //   format: 'MM/DD/YYYY HH:MM a'
  // }
  {
    title: 'No.',
    key: 'no',
    custom: (item, index) => index + 1,
    style: { font: { bold: true } }
  },
  { title: 'Currency', key: 'PRICE_CURRENCY'},
  { title: 'Amount', key: 'PRICE_AMOUNT'},
  { title: 'Added By', key: 'addedBy' },
  { title: 'Status', key: 'STATUS' },
  {
    title: 'Last Update Date',
    key: 'UPDATED_DATETIME',
    type: 'datePricing',
    format: 'MM/DD/YYYY HH:MM a',
    style: { font: { bold: true } }
  }
];

const DISCOUNT_EXPORT_COLUMNS = [
  {
    title: 'No.',
    key: 'no',
    custom: (item, index) => index + 1,
    style: { font: { bold: true } }
  },
  { title: 'Name', key: 'name' },
  { title: 'Code', key: 'code' },
  { title: 'Type', key: 'type' },
  {
    title: 'Value',
    key: 'price',
    custom: item =>
      item.type === 'value'
        ? item.price.toLocaleString('en', { style: 'currency', currency: item.currency })
        : `${item.percentage}%`
  },
  { title: 'Start Date', key: 'startDate', type: 'date', format: 'MM/DD/YYYY HH:MM a' },
  { title: 'Start Date', key: 'endDate', type: 'date', format: 'MM/DD/YYYY HH:MM a' },
  {
    title: 'Status',
    key: 'status',
    custom: item => (item.status === 'A' ? 'active' : 'inactive')
  }
];

const SCHOOL_LEADER_EXPORT_COLUMNS = [
  {
    title: 'No.',
    key: 'no',
    custom: (item, index) => index + 1,
    style: { font: { bold: true } }
  },
  { title: 'Application No.', key: 'applicationNumber' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Address', key: 'address' },
  { title: 'Class Count', key: 'classCount' },
  { title: 'Updated Datetime', key: 'updatedDatetime' },
  {
    title: 'Status',
    key: 'status',
    custom: item =>
      Object.keys(TEACHER_STATUS).find(key => TEACHER_STATUS[key] === item.status)
  }
];

export const EXPORT_COLUMNS = {
  PAYMENT: PAYMENT_EXPORT_COLUMNS,
  TEACHER: TEACHER_EXPORT_COLUMNS,
  CLASS: CLASS_EXPORT_COLUMNS,
  PRICING: PRICING_EXPORT_COLUMNS,
  DISCOUNT: DISCOUNT_EXPORT_COLUMNS,
  SCHOOL_LEADER: SCHOOL_LEADER_EXPORT_COLUMNS
};

export const LEARNER_HISTORY_TABS = [
  {
    name: 'all',
    title: 'All'
  },
  {
    name: 'pending',
    title: 'Pending'
  },
  {
    name: 'paid',
    title: 'Paid'
  },
  {
    name: 'completed',
    title: 'Completed'
  },
  {
    name: 'refund',
    title: 'Refunded'
  },
  {
    name: 'cancelled',
    title: 'Cancelled'
  }
];

export const PAYOUT_STATUS = {
  PENDING: 'PYSTAT001',
  PAID: 'PYSTAT002',
  CANCELLED: 'PYSTAT003'
};

export const SCHOOL_LEADERS_STATUS = {
  FOR_VERIFICATION: 'SDSTAT001',
  PENDING: 'SDSTAT002',
  APPROVED: 'SDSTAT003',
  REJECTED: 'SDSTAT004'
};

export const DROPBOX_TOKEN = process.env.REACT_APP_DROP_BOX_TOKEN;
export const DROPBOX_APPKEY = process.env.REACT_APP_DROP_BOX_APP_KEY;

export const PRICING_FOR_TYPES = ['live-class', 'scheduled-class'];

export const USER_TYPES_CAN_SOCIAL_AUTH = ['TEACHER'];

export const SOCIAL_AUTH_PROVIDERS = [
  {
    provider: 'google',
    label: <span style={{ color: '	#c71610' }}>Google</span>,
    icon: <Mail color='	#c71610' />
  },
  {
    provider: 'facebook',
    label: <span style={{ color: '	#4267B2' }}>Facebook</span>,
    icon: <Facebook color='#4267B2' />
  }
];

export const CLASS_STATUS_ALERT = {
  NOT_STARTED: {
    type: 'secondary',
    icon: 'fas fa-hourglass-start',
    message: 'Class is not yet available. Enrollment starts on '
  },
  ONGOING_ENROLLMENT: {
    type: 'info',
    icon: 'fas fa-hourglass-half',
    message: 'Enrollment is ongoing.'
  },
  OPENS_SOON: {
    type: 'warning',
    icon: 'fas fa-stopwatch',
    message: 'Enrollment ended. This class opens soon.'
  },
  CLASS_ONGOING: {
    type: 'success',
    icon: 'fas fa-calendar-check',
    message: 'This class ongoing.'
  },
  CLASS_ENDED: {
    type: 'dark',
    icon: 'fas fa-calendar-times',
    message: 'This class has ended.'
  }
};
