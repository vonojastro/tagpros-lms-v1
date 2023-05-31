import React, { Fragment } from 'react';
import Table from 'components/Admin/contents/Table';
import Export from '../Export';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPricing, savePricing, updatePricing, removePricing } from 'api/pricing';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import _ from "lodash";
import { Field, Form } from 'react-final-form';
import {
  Error,
  InputControl,
  InputLabel,
  SelectControl
} from 'components/common/Form/Inputs';
import { PRICING_FOR_TYPES } from 'utils/constants';
import styled from 'styled-components';
import useValidationSchema from 'hooks/use-validation-schema';
import schema from 'validators/pricing';

const StyledForm = styled.form`
  display: grid;
  padding: 1rem;
  gap: 2rem;
  select {
    width: 100%;
  }
  color: black;
  #error-msg {
    font-size: 13px !important;
  }
`;
const initialValue = {
  FOR: [],
  PRICE_CURRENCY: 'USD',
  PRICE_AMOUNT: null,
  STATUS: 'active',
  REMARKS: '',
};

export default function Pricing() {
  const dispatch = useDispatch();
  // const [filterValue, setFilterValue] = useState('');
  // const [filterStatus, setFilterStatus] = useState('');
  // const [filterCurrency, setFilterCurrency] = useState('');
  // const [filterColumn, setFilterColumn] = useState('STATUS');
  // const [sortAmount, setSortAmount] = useState('none');
  const [toggleSortFilter, setToggleSortFilter] = useState({
    STATUS: false, PRICE_CURRENCY: false
  });
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [errorTable, setErrorTable] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [submitLoading] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState(initialValue);
  const validate = useValidationSchema(schema);
  const pricing = useSelector(state =>
    state.pricing ? state.pricing.getIn(['data', 'pricing']) : []
  );
  
  const loading = useSelector(state => state.uiElements.getIn(['loadingScreen']));

  const loadData = () => {
    setErrorTable(false);

    getAllPricing(
      dispatch,
      (status, data) => {
        if (!status) {
          setErrorTable(true);
        }
      },
    );
  };

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const permissions = useSelector(state =>
    state.admin.permissions ? state.admin.permissions : {}
  );
  let columns = [];
  if (permissions.Pricing === "readwrite") {
    columns = [
      {
        Header: 'Pricing List',
        columns: [
          {
            Header: 'No.',
            Cell: ({ row }) => <div>{row.index + 1}</div>,
            disableFilters: true,
          },
          {
            Header: 'Pricing For',
            accessor: 'FOR',
            Cell: row =>
              row.value.map(v => (
                <div>
                  <div className={'badge ' + getBadge(v)}>{v}</div>
                </div>
              )),
            accessorFilter: 'FOR',
            filterType: 'multipleSelectPricingFor',
            columnFilter: true,
            filter: multiSelectFilterFor,
              // disableFilters: true,
          },
          {
            Header: 'Currency',
            // accessor: d => `${d.PRICE_CURRENCY} ${d.PRICE_AMOUNT}`,
            accessor: 'PRICE_CURRENCY',
            accessorFilter: 'PRICE_CURRENCY',
            filterType: 'multipleSelect',
            columnFilter: true,
            filter: multiSelectFilter,
            // disableFilters: true,
          },
          {
            id: 'PRICE_AMOUNT',
            Header: 'Amount',
            // accessor: d => `${d.PRICE_CURRENCY} ${d.PRICE_AMOUNT}`,
            accessor: 'PRICE_AMOUNT',
            accessorFilter: 'PRICE_AMOUNT',
            filterType: 'sortOnly',
            columnFilter: true,
            // filter: multiSelectFilter,
            // disableFilters: true,
          },
          {
            Header: 'Added By',
            accessor: 'CREATED_BY',
            accessorFilter: 'CREATED_BY',
            filterType: 'sortOnly',
            columnFilter: true,
            // disableFilters: true,
          },
          {
            Header: 'UPDATED_DATETIME',
            // accessor: d => moment(d.updatedDateTime).format('MM/DD/YYYY hh:mm a'),
            accessor: 'UPDATED_DATETIME',
            // disableFilters: true,
            accessorFilter: 'UPDATED_DATETIME',
            filterType: 'sortOnly',
            columnFilter: true,
            Cell: ({value})=>{ return moment(new Date(value)).format('MM/DD/YYYY hh:mm a')}
          },
          {
            Header: 'Remarks',
            accessor: 'REMARKS',
            accessorFilter: 'REMARKS',
            filterType: 'sortOnly',
            columnFilter: true
            // disableFilters: true,
          },
          {
            id: 'STATUS',
            Header: 'Status',
            accessor: 'STATUS',
            accessorFilter: 'STATUS',
            filterType: 'multipleSelect',
            columnFilter: true,
            filter: multiSelectFilter,
            Cell: row => <div className={'badge ' + getBadge(row.value)}>{row.value}</div>,
            // disableFilters: true,
          },
          {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ row }) => (
              <div style={{ display: 'flex' }}>
                <button
                  data-target='#exampleModal'
                  className='btn btn-link'
                  data-toggle='modal'
                  data-original-title='Edit'
                  onClick={() => onClickAction('edit', row.index)}
                >
                  <i className='ti-marker-alt' />
                </button>
                {/* <button
                  className='btn btn-link'
                  onClick={() => onClickAction('delete', row.index)}
                >
                  <i className='fas fa-trash' style={{ color: 'red' }} />
                </button> */}
              </div>
            ),
            disableFilters: true,
          }
        ]
      }
    ];
  } else {
    columns = [
      {
        Header: 'Pricing List',
        columns: [
          {
            Header: 'No.',
            Cell: ({ row }) => <div>{row.index + 1}</div>,
            disableFilters: true,
          },
          {
            Header: 'Pricing For',
            accessor: 'FOR',
            Cell: row =>
              row.value.map(v => (
                <div>
                  <div className={'badge ' + getBadge(v)}>{v}</div>
                </div>
              )),
            accessorFilter: 'FOR',
            filterType: 'multipleSelectPricingFor',
            columnFilter: true,
            filter: multiSelectFilterFor,
              // disableFilters: true,
          },
          {
            Header: 'Currency',
            // accessor: d => `${d.PRICE_CURRENCY} ${d.PRICE_AMOUNT}`,
            accessor: 'PRICE_CURRENCY',
            accessorFilter: 'PRICE_CURRENCY',
            filterType: 'multipleSelect',
            columnFilter: true,
            filter: multiSelectFilter,
            // disableFilters: true,
          },
          {
            id: 'PRICE_AMOUNT',
            Header: 'Amount',
            // accessor: d => `${d.PRICE_CURRENCY} ${d.PRICE_AMOUNT}`,
            accessor: 'PRICE_AMOUNT',
            accessorFilter: 'PRICE_AMOUNT',
            filterType: 'sortOnly',
            columnFilter: true,
            // filter: multiSelectFilter,
            // disableFilters: true,
          },
          {
            Header: 'Added By',
            accessor: 'CREATED_BY',
            accessorFilter: 'CREATED_BY',
            filterType: 'sortOnly',
            columnFilter: true,
            // disableFilters: true,
          },
          {
            Header: 'UPDATED_DATETIME',
            // accessor: d => moment(d.updatedDateTime).format('MM/DD/YYYY hh:mm a'),
            accessor: 'UPDATED_DATETIME',
            // disableFilters: true,
            accessorFilter: 'UPDATED_DATETIME',
            filterType: 'sortOnly',
            columnFilter: true,
            Cell: ({value})=>{ return moment(new Date(value)).format('MM/DD/YYYY hh:mm a')}
          },
          {
            Header: 'Remarks',
            accessor: 'REMARKS',
            accessorFilter: 'REMARKS',
            filterType: 'sortOnly',
            columnFilter: true
            // disableFilters: true,
          },
          {
            id: 'STATUS',
            Header: 'Status',
            accessor: 'STATUS',
            accessorFilter: 'STATUS',
            filterType: 'multipleSelect',
            columnFilter: true,
            filter: multiSelectFilter,
            Cell: row => <div className={'badge ' + getBadge(row.value)}>{row.value}</div>,
            // disableFilters: true,
          },
        ]
      }
    ];
  }
  
  function multiSelectFilter(rows, columnIds, filterValue) {
    return filterValue.length === 0
      ? rows
      : rows.filter((row) =>
          filterValue.includes(String(row.original[columnIds])),
        );
  }
  function multiSelectFilterFor(rows, columnIds, filterValue) {
    return filterValue.length === 0
      ? rows
      : rows.filter((row) =>
          {
            let contains = false;
            filterValue.forEach(item=>{
              if(row.values.FOR.includes(item)){
                contains = true;
              }
            })
            return contains;
          }
        );
  }
  const getBadge = key => {
    switch (key) {
      case 'active':
        return 'badge-success';
      case 'inactive':
        return 'badge-secondary';
      default:
        return 'badge-primary';
    }
  };
  const onClickAction = (action, index) => {
    document.getElementById('updateForm').reset();
    setModalAction(action);
    if (action === 'edit' || action === 'delete') {
      setSelectedPricing({
        ...pricing[index]
      });
    } else {
      setSelectedPricing({ ...initialValue });
    }
  };

  const onClose = reload => {
    document.getElementById('updateForm').reset();
    document.getElementById('modal-close').click();

    setSelectedPricing({ ...initialValue });
    setErrorUpdate(false);
    setModalAction('');

    if (reload) {
      loadData();
    }
  };
  const validateMain = async (values)=>{
    if(_.isEqual(values, selectedPricing)){
      return {message: 'No Changes'}
    }
    return  validate(values);
  }
  const handleSubmit = async values => {
    const action = values.ID ? 'update' : 'save';
      const isAmountExist = ()=>{
        for(let i = 0; i < pricing.length ; i++){
          if((pricing[i].PRICE_AMOUNT === values.PRICE_AMOUNT) && 
          (pricing[i].PRICE_CURRENCY === values.PRICE_CURRENCY && 
            _.isEqual(pricing[i].FOR, values.FOR)))return true;
        }
        return false;
      }
      if(isAmountExist() === false){
        try {
          await (action === 'update' ? updatePricing(values) : savePricing(values));
          toast.success(`Pricing has been successfully ${action}d.`);
          loadData();
          onClose(true);
        } catch (error) {
          toast.error(`Failed to ${action} pricing.`);
          throw Error(error);
        }
      }else{
        toast.error(`Failed to ${action} pricing. Amount entered already exist for ${values.PRICE_CURRENCY} currency`);
      }
  };

  const handleDeletePricing = async () => {
    try {
      await removePricing(selectedPricing.ID);
      toast.success('Pricing has been successfully deleted.');
      loadData();
    } catch (error) {
      toast.error('Failed to delete pricing.');
    } finally {
      onClose(true);
    }
  };

  // const handleFilter = (column, value)=>{
  //   setFilterColumn(column);
  //   setFilterValue(value);
  //   if(column === 'STATUS') setFilterValue([value])
  //   if(column === 'PRICE_CURRENCY') setFilterCurrency(value)
  // }

  return (
    <Fragment>
      <div>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              {/* <!-- .left-right-aside-column--> */}
              <div className='row'>
                {/* <!-- .left-aside-column--> */}
                <div className='left-aside bg-light-part col'>
                  <ul className='list-style-none'>
                    <li className='box-label'>
                      {/* <a href='#!'>
                        Total Price List <span>{pricing.length}</span>
                      </a> */}
                      <div className="admin-table-total">
                        <h5>
                            Total Price List 
                        </h5>
                        <span>{pricing.length}</span>
                      </div>
                    </li>
                    <li className='divider' />
                    <li>
                      <Export source={'pricing'} dataSource={pricing} />
                    </li>
                    <li className='divider' />
                    {/* <li>
                      <b>Filter</b>
                    </li> */}

                    {/* <li>
                      <div className='col'>
                        <label className='row'>Status</label>
                        <select
                          value={filterValue}
                          onChange={e => setFilterValue(e.target.value)}
                          className='form-control row'
                        >
                          <option value=''>All</option>
                          <option value='active'>Active</option>
                          <option value='inactive'>Inactive</option>
                        </select>
                      </div>
                    </li> */}
                    {/* <li>
                        <div className="form-inline align-self-end">
                            <label className="pr-2">Status</label>
                            <select value={filterStatus} onChange={(e) => handleFilter('STATUS', e.target.value)} className="form-control w-auto">
                                <option value="">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </li>
                    <li style={{marginTop: '10px'}}>
                        <div className="form-inline align-self-end">
                            <label className="pr-2">Currency</label>
                            <select value={filterCurrency} onChange={(e) => handleFilter('PRICE_CURRENCY', e.target.value)} className="form-control w-auto">
                                <option value="">All</option>
                                <option value="USD">USD</option>
                                <option value="PHP">PHP</option>
                            </select>
                        </div>
                    </li>
                    <li className='divider' />
                    <li>
                      <b>Sort</b>
                    </li>
                    <li>
                        <div className="form-inline align-self-end">
                            <label className="pr-2">Amount</label>
                            <select value={sortAmount} onChange={(e) => setSortAmount(e.target.value)} className="form-control w-auto">
                                <option value="none">None</option>
                                <option value="asc">Low to High</option>
                                <option value="desc">High to Low</option>
                            </select>
                        </div>
                    </li>
                    <li className='divider' /> */}
                  </ul>
                </div>
                {/* <!-- /.left-aside-column--> */}
                <div className='right-aside col-9'>
                  {
                    permissions.Pricing === "readwrite" ?
                    <div className='button-fab'>
                    <button
                      type='button'
                      className='btn btn-info'
                      data-target='#exampleModal'
                      data-toggle='modal'
                      onClick={() => onClickAction('add')}
                    >
                      <i className='fas fa-plus' />
                    </button>
                    </div> : ''
                  }
                  
                  <Table
                    loading={loading}
                    error={errorTable}
                    columns={columns}
                    data={pricing}
                    title={'Pricing'}
                    // filterColumn={filterColumn}
                    // filterValue={filterValue}
                    onReload={loadData}
                    // sortAmount={sortAmount}
                    toggleSortFilter={toggleSortFilter}
                    setToggleSortFilter={setToggleSortFilter}
                  />
                </div>
                {/* <!-- /.left-right-aside-column--> */}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div
          className='modal fade'
          id='exampleModal'
          tabIndex={-1}
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-m'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  {modalAction === 'edit' ? 'Manage Pricing' : 'Add Pricing'}
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              {!!errorUpdate && (
                <div
                  className='alert alert-warning text-center text m-t-20'
                  style={{ fontSize: 10 }}
                >
                  <i
                    class='fas fa-times float-right'
                    style={{ cursor: 'pointer' }}
                    onClick={() => setErrorUpdate(false)}
                  />
                  <span className='font-weight-bold' style={{ fontSize: 12 }}>
                    Something went wrong.
                  </span>
                  <br />
                  Please try again later.
                </div>
              )}
              <div className='modal-body'>
                {/* <button class="btn btn-primary" type="submit">Submit form</button> */}
                <Form
                  validate={validateMain}
                  initialValues={selectedPricing}
                  onSubmit={handleSubmit}
                  render={({
                    handleSubmit,
                    submitting,
                    hasValidationErrors,
                    form: { reset }
                  }) => (
                    <StyledForm onSubmit={handleSubmit} id='updateForm' className='row'>
                      <SelectControl
                        options={[
                          { label: 'USD', value: 'USD' },
                          { label: 'PHP', value: 'PHP' }
                        ]}
                        name='PRICE_CURRENCY'
                        label={'Currency'}
                      />
                      <InputControl
                        label={'Amount'}
                        name={'PRICE_AMOUNT'}
                        required
                        type={'number'}
                        format={value => {
                          try {
                            const val = parseFloat(value).toFixed(2);
                            return val;
                          } catch (error) {
                            return 0;
                          }
                        }}
                      />
                      <div>
                        <InputLabel label={'This Price is for:'} />
                        {PRICING_FOR_TYPES.map(value => (
                          <div key={value}>
                            <Field
                              name='FOR'
                              type='checkbox'
                              value={value}
                              component='input'
                              id={value}
                            />
                            <label htmlFor={value}>
                              {
                                {
                                  'live-class': 'Live Class',
                                  'scheduled-class': 'Scheduled Class'
                                }[value]
                              } 
                            </label>
                          </div>
                        ))}

                        <Error name='FOR' />
                      </div>
                      {!!selectedPricing?.ID && (
                        <Fragment>
                          <SelectControl
                            options={[
                              { label: 'Active', value: 'active' },
                              { label: 'Inactive', value: 'inactive' }
                            ]}
                            name='STATUS'
                            label={'Status'}
                          />
                          <InputControl label={'Remarks'} name={'REMARKS'} />
                        </Fragment>
                      )}
                      <div className='modal-footer'>
                        <button
                          id='modal-close'
                          type='button'
                          className='btn btn-secondary'
                          onClick={reset}
                          data-dismiss='modal'
                        >
                          Cancel
                        </button>
                        <button
                          type='submit'
                          style={{ cursor: submitting && 'not-allowed' }}
                          className='btn btn-primary'
                          disabled={hasValidationErrors}
                        >
                          <span
                            style={{ display: submitting ? 'inline-block' : 'none' }}
                            class='spinner-border spinner-border-sm btn-load'
                            role='status'
                            aria-hidden='true'
                          />
                          Submit
                        </button>
                      </div>
                    </StyledForm>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <Modal size='s' show={modalAction === 'delete'} onHide={() => setModalAction('')}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Pricing?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Are you sure you want to delete this pricing?</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='link' type='button' onClick={() => setModalAction('')}>
              Cancel
            </Button>
            <Button
              variant='info'
              type='submit'
              onClick={handleDeletePricing}
              disabled={submitLoading === true}
            >
              <span
                style={{ display: submitLoading ? 'inline-block' : 'none' }}
                class='spinner-border spinner-border-sm btn-load'
                role='status'
                aria-hidden='true'
              />
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Fragment>
  );
}
