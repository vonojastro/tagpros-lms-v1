import styled from 'styled-components';
import React from 'react';
import DataTable from 'react-data-table-component';
import { InputLabel } from 'components/common/Form/Inputs';
import { ACCOUNT_STATUS, APPLICATION_STATUS, USER_CODES } from 'utils/constants';
import _ from 'lodash';
import { Spinner } from 'react-bootstrap';
const columns = [
  {
    name: 'First name',
    selector: row => row.FIRST_NAME,
    sortable: true
  },
  {
    name: 'IS',
    selector: row => row.IS_CHECKED,
    sortable: true,
    omit: true
  },
  {
    name: 'Last name',
    selector: row => row.LAST_NAME,
    sortable: true
  },
  {
    name: 'Email',
    selector: row => row.EMAIL_ADD,
    sortable: true
  },
  {
    name: 'Account Type',
    selector: row => row.USER_CODE,
    sortable: true,
    format: ({ USER_CODE }) =>
      USER_CODES[USER_CODE] === 'Educ' ? 'Education' : USER_CODES[USER_CODE]
  },
  {
    name: 'Account Status',
    selector: row => row.STATUS,
    format: row => _.findKey(ACCOUNT_STATUS, v => v === row.STATUS),
    sortable: true
  },
  {
    name: 'Application Status',
    selector: row => row.APPLICATION_STATUS,
    format: row => _.findKey(APPLICATION_STATUS, v => v === row.APPLICATION_STATUS),
    // selector: ({ TBL_LMS_TEACHER, TBL_LMS_SCHOOL_DISTRICT }) =>
    //   (TBL_LMS_SCHOOL_DISTRICT || TBL_LMS_TEACHER)?.APPLICATION_STATUS || undefined,
    // format: ({ TBL_LMS_TEACHER, TBL_LMS_SCHOOL_DISTRICT }) =>
    //   _.findKey(
    //     APPLICATION_STATUS,
    //     v =>
    //       v === (TBL_LMS_SCHOOL_DISTRICT || TBL_LMS_TEACHER)?.APPLICATION_STATUS ||
    //       undefined
    //   ),
    sortable: true
  },
  {
    name: 'Verified',
    selector: row => row.IS_VERIFY,
    format: row => (row.IS_VERIFY === true || row.IS_VERIFY === 'true' ? 'Yes' : 'No'),
    sortable: true
  }
];

const Wrapper = styled.div`
  [type='checkbox']:checked,
  [type='checkbox']:not(:checked) {
    position: static !important;
    opacity: 100%;
  }
  .rdt_TableCol_Sortable {
    /* white-space: normal; */
    > div:nth-child(1) {
      white-space: break-spaces !important;
    }
  }
`;

const rowSelectCritera = ({ IS_CHECKED }) => IS_CHECKED === true;
const UsersTable = ({ data, handleSelectedRowsChange, to, progressPending }) => {
  // const rowSelectCritera = ({ EMAIL_ADD }) =>
  //   to.find(selected => selected.EMAIL_ADD === EMAIL_ADD);
  // useMemo(() => first, [second])

  return (
    <Wrapper className='w-100 h-100'>
      <InputLabel label={'Search Results'} />
      <DataTable
        progressPending={progressPending}
        columns={columns}
        keyField='EMAIL_ADD'
        // data={new Array(100).fill({
        //   EMAIL_ADD: `HAHAHAHA${Math.random() * 100}@yahoo.com`
        // })}
        data={data}
        selectableRows
        onSelectedRowsChange={handleSelectedRowsChange}
        pagination
        selectableRowSelected={rowSelectCritera}
        progressComponent={
          <Spinner animation='border' role='status'>
            {/* <span className='visually-hidden'>Loading...</span> */}
          </Spinner>
        }
      />
    </Wrapper>
  );
};
export default UsersTable;
