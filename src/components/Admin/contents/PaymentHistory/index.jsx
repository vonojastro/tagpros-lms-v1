import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import Export from "../Export";
import PaymentDetails from "./PaymentDetails";
import { getPayments } from "api/payment";
import { useDispatch, useSelector } from "react-redux";
import { PAYMENT_STATUS, ENROLLMENT_STATUS, CLASS_STATUS, PAYMENT_PROOF_STATUS } from "utils/constants";
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { api } from '../../../../api';
import moment from 'moment';
import { paypalConfig } from "../../../../config/index";
import './index.css';
import { toMoneyFormat } from "utils/utils";

export default function PaymentHistory() {
    const now = moment(new Date()).format('YYYY-MM-DD')
    const [status, setStatus] = useState("PRSTAT001");
    const [remarks, setRemarks] = useState("");
    const [filterValue, setFilterValue] = useState({});
    const [hideFilter, setHideFilter] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [payoutRef, setPayoutRef] = useState("");
    const [selectedPayment, setSelectedPayment] = useState({});
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    const [history, setHistory] = useState({});
    const [modalShow, setModalShow] = useState({
        refund: false,
        payout: false,
        verify: false
    });
    let loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));

    const dispatch = useDispatch();

    const transactions = useSelector((state) => state.payment ? state.payment.getIn(['data', 'payments']) : []);

    const loadData = () => {
        setErrorTable(false);

        getPayments(dispatch, (status, data) => {
            if(!status){
                setErrorTable(true);
            }else{
                setTableData(data);
            }
         });
    }

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [toggleSortFilter, setToggleSortFilter] = useState({});
    const columns = [
        {
            Header: () => null,
            id: 'expander',
            Cell: ({ row }) => (
              <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? 
                    <button className="btn btn-link">
                        <i className="fas fa-caret-down"></i>
                    </button> : 
                    <button className="btn btn-link" onClick={() => getHistory(row.index)}>
                        <i className="fas fa-caret-right"></i>
                    </button>
                }
              </span>
            ),
        },
        {
            Header: "Payment History",
            id:'tbl',
            columns: [
                {
                    Header: 'Transaction ID',
                    accessor: 'transactionId',
                    id: 'transactionId',
                },
                {
                    Header: 'Name',
                    accessor: 'payor',
                    id: 'name',
                    accessorFilter: 'payor',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Class Id',
                    accessor: 'classId',
                    accessorFilter: 'classId',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Course Price',
                    accessor: d => `${toMoneyFormat(d.price, d.currency)}`,
                    accessorFilter: 'price',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Discount Code',
                    accessor: 'discountCode',
                    accessorFilter: 'discountCode',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Total Payment',
                    accessor: d => `${toMoneyFormat((d.price - d.totalDiscount), d.currency)}`,
                    accessorFilter: 'Total_Payment',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Payment Method',
                    accessor: 'paymentMethod',
                    accessorFilter: 'paymentMethod',
                    filterType: 'multipleSelect',
                    columnFilter: true,
                    filter: multiSelectFilter,
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                    accessorFilter: 'status',
                    filterType: 'multipleSelectGetValue',
                    getValueType: 'PaymentHistoryStatus',
                    columnFilter: true,
                    filter: multiSelectFilter,
                    Cell: ({row, value}) => (
                        <div className={"badge " + getBadge(tableData[row.index].enrollmentStatus, 'payment')}>{getValue(row.index, 'payment')}</div>
                    )
                },
                {
                    Header: 'Updated Date',
                    accessorFilter: 'Updated_Date',
                    filterType: 'sortOnly',
                    columnFilter: true,
                    accessor: d => d.updatedDateTime ? moment(d.updatedDateTime).format("MM/DD/YYYY hh:mm A") : moment(d.createdDateTime).format("MMM DD, YYYY HH:mm a")
                },
                {
                    Header: 'Teacher',
                    accessor: 'teacher',
                    accessorFilter: 'teacher',
                    filterType: 'multipleSelect',
                    columnFilter: true,
                    filter: multiSelectFilter,
                },
                {
                    Header: 'Teacher\'s Payout Account',
                    accessorFilter: 'Teacher_Payout_Account',
                    filterType: 'sortOnly',
                    columnFilter: true,
                    accessor: d => `${(d.processor && d.teacherPayoutNum) ? `${d.processor}-${d.teacherPayoutNum}` : ""}`
                },
                {
                    Header: 'Payout Status',
                    accessor: 'enrollmentStatus',
                    accessorFilter: 'enrollmentStatus',
                    filterType: 'multipleSelectGetValue',
                    getValueType: 'PaymentHistoryPayout',
                    columnFilter: true,
                    filter: multiSelectFilter,
                    Cell: row => (
                        <div className={"badge " + getBadge(row.value)}>{getValue(row.value, 'payout')}</div>
                    )
                },
                {
                    Header: 'Refund',
                    accessorFilter: 'Refund',
                    filterType: 'sortOnly',
                    columnFilter: true,
                    accessor: d => d.refund ? `${toMoneyFormat(d.refund, d.currency)}` : null
                },
                {
                    Header: 'Action',
                    accessor: d => d.status,
                    Cell: ({ row, value }) => (
                        <div style={{display: 'flex'}}>
                            <button
                                data-target="#exampleModal"
                                className="btn btn-link"
                                data-toggle="modal"
                                data-original-title="Edit"
                                disabled = {editDisabled(value, row.index)}
                                onClick={() => onClickAction(row.index)}
                            >
                                <i className="ti-marker-alt"></i>
                            </button>
                        </div>
                    ),
                }
                
            ],
    }];
    function multiSelectFilter(rows, columnIds, filterValue) {
        return filterValue.length === 0
            ? rows
            : rows.filter((row) =>
                filterValue.includes(String(row.original[columnIds])),
            );
    }
    const editDisabled = (value, index) => {
        return [PAYMENT_STATUS.CANCELLED, PAYMENT_STATUS.REFUNDED, PAYMENT_STATUS.VOID].indexOf(value) > -1
            || [ENROLLMENT_STATUS.REFUNDED].indexOf(tableData[index].enrollmentStatus) > -1;
    }

    const getHistory = async(index) => {
        setHistory((prevState) => ({
            ...prevState,
            [index]: null
        }));
        await api.post('/payment/history', {txnId: tableData[index].transactionId, classId: tableData[index].classId, enrollmentId: tableData[index].enrollmentId, paymentRef: tableData[index].gatewayRef})
        .then(response => {
            setHistory((prevState) => ({
                ...prevState,
                [index]: response.data
            }));
        }).catch(() => {
            setHistory((prevState) => ({
                ...prevState,
                [index]: []
            }));
        });
    }

    const getBadge = (key, type) => {
        switch (key) {
            case PAYMENT_STATUS.PAID:
            case ENROLLMENT_STATUS.SUCCESS:
                return type === 'payment' ? "badge-success" : "badge-primary"
            case ENROLLMENT_STATUS.PAYOUT_PAID:
                return "badge-success"
            case PAYMENT_STATUS.CANCELLED:
            case PAYMENT_STATUS.VOID:
                return "badge-danger"
            case ENROLLMENT_STATUS.REFUNDED:
            case PAYMENT_STATUS.REFUNDED:
                return "badge-secondary"
            case PAYMENT_STATUS.FOR_REFUND:
            case ENROLLMENT_STATUS.FOR_PAYOUT:
                return type === 'payment' ? "badge-success" : "badge-warning"
            default:
                return "badge-primary"
        }
    }

    const getValue = (value, type) => {
        if(type === 'payout'){
            if(value !== ENROLLMENT_STATUS.FOR_PAYOUT && value !== ENROLLMENT_STATUS.PAYOUT_PAID){
                return 'unknown';
            }else{
                return Object.keys(ENROLLMENT_STATUS).find(key => ENROLLMENT_STATUS[key] === value);
            }
        }else{
            if(tableData[value].enrollmentStatus === ENROLLMENT_STATUS.REFUNDED){
                return Object.keys(ENROLLMENT_STATUS).find(key => ENROLLMENT_STATUS[key] === tableData[value].enrollmentStatus);
            }else{
                return Object.keys(PAYMENT_STATUS).find(key => PAYMENT_STATUS[key] === tableData[value].status);
            }
        }
    }

    const onClickAction = (index) => {
        setSelectedPayment(tableData[index]);
        // setStatus(tableData[index].status);
    }

    const handleClickRefund = async () => {
        setSubmitLoading(true);

        await api
          .post('/payment/refund', { refNo: selectedPayment.dragonpayRef, reason: "Refund requested", enrollmentId: selectedPayment.enrollmentId})
          .then(response => {
            toast.success('Payment for this enrollment has been successfully refunded.');
            onClose();
            setModalShow({refund: false});
          })
          .catch(err => {
            setSubmitLoading(false);
            setModalShow({refund: false});
            toast.error(err?.response?.data?.err?.message || 'Cannot proceed with refund. Please try again later.');
          });
    };

    const sendPayout = async () => {
        setSubmitLoading(true);

        await api
          .post('/payment/payout', { enrollmentId: selectedPayment.enrollmentId, payoutRef })
          .then(response => {
            toast.success(`Payout has been successfully released to account ${selectedPayment.teacherPayoutNum}`);
            onClose();
          })
          .catch(err => {
            console.log('sendPayout', err.response);
            toast.error(err?.response?.data?.err?.message || err?.response?.data?.message || 'Cannot proceed with payout. Please try again later.');
          }).finally(() => {
              setModalShow({payout:false});
              setSubmitLoading(false);
          });
    };

    const applyFilter = async (column, value) => {
        filterValue[column] = value;
        await setFilterValue(filterValue);

        let keys = await Object.keys(filterValue).filter(key => filterValue[key] !== "") || [];
                
        if(keys.length === 0){
            setTableData(transactions);
            return;
        }

        const result = await transactions.filter((data) => {
            let match = 0;
            keys.forEach((key) => {
                switch (key){
                    case 'discountCode':
                        switch(filterValue[key]){
                            case 'yes': if(data[key] !== null){ match = match+1 } return
                            case 'no': if(data[key] === null){ match = match+1 } return
                            default: return
                        }
                    case 'fromDate':
                    case 'toDate':
                        const updatedDate = moment(moment(data.updatedDate).format("YYYY-MM-DD"));
                        const fromDate = moment(moment(filterValue.fromDate).format("YYYY-MM-DD"));
                        const toDate = moment(moment(filterValue.toDate).format("YYYY-MM-DD"));
                        if(moment(updatedDate).isBetween(fromDate, toDate, undefined, '[]')){ match = match+1 } return
                    case 'status':
                        switch(filterValue[key]){
                            case PAYMENT_STATUS.REFUNDED: if(data.enrollmentStatus === ENROLLMENT_STATUS.REFUNDED){ match = match+1 } return;
                            case PAYMENT_STATUS.PAID: if(data.enrollmentStatus !== ENROLLMENT_STATUS.REFUNDED && data[key] === PAYMENT_STATUS.PAID){ 
                                console.log('enrollmentStatus');
                                match = match+1 
                            } return;
                            default: if(filterValue[key] === data[key]){ match = match+1 } return;
                        }
                    case 'enrollmentStatus':
                        switch(filterValue[key]){
                            case ENROLLMENT_STATUS.PAYOUT_PAID: if(data[key] === ENROLLMENT_STATUS.PAYOUT_PAID){ match = match+1 } return;
                            case "unknown": if(data[key] !== ENROLLMENT_STATUS.PAYOUT_PAID){ match = match+1 } return;
                            default: return;
                        }
                    default: 
                        if(data[key]?.toLowerCase() === filterValue[column]?.toLowerCase()){ match = match + 1; } return
                }
            });

            return match === keys.length;
        });

        setTableData(result);
    }

    const verifyPayment = async() => {
        try {
            setSubmitLoading(true);
            
            await api.post('/payment/confirm', {
                status,
                remarks,
                txnId: selectedPayment.transactionId,
                referenceNumber: selectedPayment.paymentReference?.paymentRef
              }).then(response => {
                toast.success('Proof of Payment has been successfully verified.');
                setRemarks("");
                setStatus("");
                setSubmitLoading(false);
                setModalShow({verify: false});
                loadData();
              })
              .catch(err => {
                console.log(err);
                toast.error(err?.response?.data?.err?.message || 'Cannot proceed with payment verification. Please try again later.');
                setSubmitLoading(false);
              })

          } catch (error) {
            toast.error(error?.response?.data?.err?.message || 'Cannot proceed with payment verification. Please try again later.');
            setSubmitLoading(false);
          }
    }

    const onClose = () => {
        document.getElementById("pHistory-modal-close").click();

        setSelectedPayment({});
        // setRemarks("");
        // setStatus("");
        setSubmitLoading(false);
        // setErrorUpdate(false);

        loadData();
    }

    const handleClickVerify = (data) => {
        setSelectedPayment(data);
        setModalShow({verify: true});
    }

    const renderRowSubComponent = React.useCallback(
        ({ row }) => {
            return <PaymentDetails 
                        row={row} 
                        tableData={tableData} 
                        handleClickVerify={handleClickVerify} 
                        history={history} />
            },
        // eslint-disable-next-line
        [tableData, history]
      )

    return(
        <Fragment>       
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/* <!-- .left-right-aside-column--> */}
                            <div className="row">
                                {/* <!-- .left-aside-column--> */}
                                <div className="left-aside bg-light-part col">
                                    <div className={`row ${!hideFilter ? 'justify-content-end' : 'justify-content-center'}`}>
                                        <button className="btn btn-link" data-toggle="tooltip" title={`${!hideFilter ? 'Minimize Filter Section' : 'Expand Filter Section'}`} onClick={() => setHideFilter(!hideFilter)}>
                                            <i className={`fas ${!hideFilter ? 'fa-minus-square' : 'fa-expand-alt'}`}></i>
                                        </button>
                                    </div>
                                    {!hideFilter && <ul className="list-style-none">
                                        <li className="box-label">
                                            <div className="admin-table-total">
                                                <h5>
                                                    Total Payments 
                                                </h5>
                                                <span>{tableData.length}</span>
                                            </div>
                                            {/* <a href="#!">
                                                Total Payments <span>{tableData.length}</span>
                                            </a> */}
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <Export source={"payment"} dataSource={tableData} />
                                        </li>
                                        <li className="divider"></li>
                                        <li ><b>Filter</b></li>

                                        <li>
                                            <div>
                                                <label>Account Type</label>
                                                {/* <select value={filterValue.accountType} onChange={(e) => setFilterValue(e.target.value)} className="form-control row"> */}
                                                <select value={filterValue.accountType} onChange={(e) => applyFilter('payorType', e.target.value)} className="form-control">
                                                    <option value="">All</option>
                                                    <option value="FAMILY">Family</option>
                                                    <option value="LEARNER">Learner</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <div>
                                                <label>Payment Status</label>
                                                <select value={filterValue.status} onChange={(e) => applyFilter('status', e.target.value)} className="form-control">
                                                    <option value="">All</option>
                                                    <option value={PAYMENT_STATUS.UNPAID}>Unpaid</option>
                                                    <option value={PAYMENT_STATUS.PAID}>Paid</option>
                                                    {/* <option value={PAYMENT_STATUS.FOR_REFUND}>For Refund</option> */}
                                                    <option value={PAYMENT_STATUS.REFUNDED}>Refunded</option>
                                                    <option value={PAYMENT_STATUS.CANCELLED}>Cancelled</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <div>
                                                <label>Payout Status</label>
                                                <select value={filterValue.enrollmentStatus} onChange={(e) => applyFilter('enrollmentStatus', e.target.value)} className="form-control">
                                                    <option value="">All</option>
                                                    <option value="unknown">Unpaid</option>
                                                    <option value={ENROLLMENT_STATUS.PAYOUT_PAID}>Paid</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <div>
                                                <label>Processor</label>
                                                <select value={filterValue.processor} onChange={(e) => applyFilter('paymentMethod',e.target.value)} className="form-control">
                                                    <option value="">All</option>
                                                    <option value="gcash">GCash</option>
                                                    <option value="pypl">Paypal</option>
                                                    <option value="cc">Credit Card</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <div>
                                                <label>Transaction Date</label>
                                                <div className="ml-3">
                                                    <label className="mb-0"><small>From</small></label>
                                                    <input type="date" value={filterValue.fromDate} max={now} className="form-control" name="fromDate" id="fromDate" onChange={(e) => applyFilter('fromDate',e.target.value)}/>
                                                </div>
                                                <div className="mt-2 ml-3">
                                                    <label className="mb-0"><small>To</small> </label>
                                                    <input type="date" value={filterValue.toDate} min={filterValue.fromDate} max={now} className="form-control" name="toDate" id="toDate" disabled={!filterValue.fromDate} onChange={(e) => applyFilter('toDate',e.target.value)}/>
                                                </div>                                                
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <div className="col">
                                                <label className="row">Discounted</label>
                                                <div className="row">
                                                    <div class="form-check col">
                                                        <input class="form-check-input" type="radio" value="" name="discount" id="discountAll" onClick={(e) => applyFilter('discountCode',e.target.value)} checked/>
                                                        <label class="form-check-label" for="discountAll">
                                                            All
                                                        </label>
                                                     </div>
                                                    <div class="form-check col">
                                                        <input class="form-check-input" type="radio" value="yes" name="discount" id="discountYes" onClick={(e) => applyFilter('discountCode',e.target.value)} checked={filterValue.discountCode==='yes'}/>
                                                        <label class="form-check-label" for="discountYes">
                                                            Yes
                                                        </label>
                                                     </div>
                                                     <div class="form-check col">
                                                        <input class="form-check-input" type="radio" value="no" name="discount" id="discountNo" onClick={(e) => applyFilter('discountCode',e.target.value)} checked={filterValue.discountCode==='no'}/>
                                                        <label class="form-check-label" for="discountNo">
                                                            No
                                                        </label>
                                                     </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                    </ul>}
                                </div>
                                <div className={`right-aside ${!hideFilter ? 'col-9' : 'col-11'}`}>
                                    <Table loading={loading} 
                                    error={errorTable} 
                                    columns={columns} 
                                    data={tableData} 
                                    // data={transactions} 
                                    title={"Payment History"} 
                                    // filterColumn={'transactionId'} 
                                    // filterValue={filterValue}
                                    toggleSortFilter={toggleSortFilter}
                                    setToggleSortFilter={setToggleSortFilter}
                                    onReload={loadData}
                                    renderRowSubComponent={renderRowSubComponent}
                                    />
                                </div>
                                {/* <!-- /.left-right-aside-column--> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ============================================================== -->
                <!-- End PAge Content -->
                <!-- ============================================================== -->
                <!-- ============================================================== -->*/}
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Manage Payment Transaction</h5>
                                <button type="button" className="close" data-dismiss="modal" id="pHistory-modal-close" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            {!!errorUpdate && <div className="alert alert-warning text-center text m-t-20"
                                style={{ fontSize: 10 }}>
                                <i class="fas fa-times float-right" style={{cursor: 'pointer'}} onClick={() => setErrorUpdate(false)}></i>
                                <span className="font-weight-bold" style={{ fontSize: 12 }}>
                                    Something went wrong.
                                </span>
                                <br />
                                Please try again later.
                            </div>}
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="row no-gutters ml-3 mr-3 mt-0">
                                                {/* <div className="col-md-3">
                                                    <img style={{maxHeight: '150px', objectFit: 'contain'}} src={selectedPayment.teacherPhoto || "./assets/images/image-placeholder.jpg"} className="card-img" alt="..." />
                                                </div> */}
                                                <div className="col">
                                                    <h5 className="p-4 mb-0">Teacher Details</h5>
                                                    <div className="card-body pt-0 d-flex flex-row">
                                                        <img width="50" height="50" src={selectedPayment.teacherPhoto || "./assets/images/image-placeholder.jpg"} className="rounded-circle" alt="Cinque Terre" />
                                                        <div className="ml-3">
                                                            <small className="text-muted p-t-0">Name </small>
                                                            <h6>{selectedPayment.teacher}</h6>
                                                            <small className="text-muted p-t-5 db">Email Address </small>
                                                            <h6>{selectedPayment.teacherEmail}</h6>
                                                            <small className="text-muted p-t-5 db">Payout Account</small>
                                                            <h6>{selectedPayment.teacherPayoutNum || 'None'}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <h5 className="p-4 mb-0">Teacher Details</h5>
                                                    <div className="card-body pt-0 d-flex flex-row">
                                                        <img width="50" height="50" src={selectedPayment.teacherPhoto || "./assets/images/image-placeholder.jpg"} className="rounded-circle" alt="Cinque Terre" />
                                                        <div className="ml-3">
                                                            <small className="text-muted p-t-0">Name </small>
                                                            <h6>{selectedPayment.teacher}</h6>
                                                            <small className="text-muted p-t-5 db">Email Address </small>
                                                            <h6>{selectedPayment.teacherEmail}</h6>
                                                            <small className="text-muted p-t-5 db">Payout Account</small>
                                                            <h6>{selectedPayment.teacherPayoutNum || 'None'}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <h5 className="p-4 mb-0">Class Details</h5>
                                                    <div className="card-body pt-0 d-flex flex-row">
                                                        <img width="50" height="50" src={selectedPayment.thumbnailImage || "./assets/images/image-placeholder.jpg"} className="rounded-circle" alt="Cinque Terre" />
                                                        <div className="ml-3">
                                                            <small className="text-muted p-t-0">Class Title </small>
                                                            <h6>{selectedPayment.classTitle}</h6>
                                                            <small className="text-muted p-t-5 db">Schedule </small>
                                                            {selectedPayment.availableDates ?
                                                                <span>
                                                                    <i className="fa fa-calendar-alt text-muted" /> {selectedPayment.availableDates && "No. of Sessions : " + selectedPayment.availableDates.length}
                                                                    <br />
                                                                    {selectedPayment.availableDates.map(date => (
                                                                        <div>&emsp;<i className="fa fa-caret-right text-muted" />{" " + moment(date).format('dddd, LL')}<br /></div>
                                                                    ))}
                                                                </span> :
                                                                <span>
                                                                    <i className="fa fa-calendar-alt mr-2 text-muted" />
                                                                    <b>Date: </b>{selectedPayment.startDate}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            
                                            <table className="table table-striped m-4" style={{maxWidth: '94%'}}>
                                                <thead style={{backgroundColor: 'lightsteelblue'}}>
                                                    <th>Transaction ID</th>
                                                    <th>Transaction Date</th>
                                                    <th>Class Title</th>
                                                    <th>Price</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{selectedPayment.transactionId}</td>
                                                        <td>{moment(selectedPayment.createdDateTime).format("MMM DD, YYYY hh:mm a")}</td>
                                                        <td>{selectedPayment.classTitle}</td>
                                                        <td style={{textAlign: 'right'}}>{toMoneyFormat(selectedPayment.price, selectedPayment.currency)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2"></td>
                                                        <td>
                                                            Subtotal <br /><br />
                                                            <span style={{marginLeft: '15px'}}>VAT</span>
                                                            {/* <span style={{marginLeft: '15px'}}>Gross Revenue (30%)</span> */}
                                                        </td>
                                                        <td style={{textAlign: 'end'}}>
                                                            {toMoneyFormat(selectedPayment.price, selectedPayment.currency)} <br /><br /> 
                                                            ({(toMoneyFormat(selectedPayment.outputVAT, selectedPayment.currency))})
                                                            {/* ({selectedPayment.currency} {(selectedPayment.price*0.3).toFixed(2)}) */}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2" style={{backgroundColor: 'white', borderTop: 'none', borderBottom: 'none'}}></td>
                                                        <td style={{backgroundColor: 'lightsteelblue'}}>
                                                            Earnings (70%)
                                                        </td>
                                                        <td style={{backgroundColor: 'lightsteelblue', textAlign: 'end'}}>
                                                            {toMoneyFormat(((parseFloat(selectedPayment.earnedPartnership) - parseFloat(selectedPayment.outputVAT))*0.7), selectedPayment.currency)}
                                                            {/* {selectedPayment.currency} {(selectedPayment.price*0.7).toFixed(2)} */}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2" style={{borderTop: 'none'}}></td>
                                                        <td >
                                                            <span style={{marginLeft: '15px'}}>Witholding Tax (10%)</span>
                                                        </td>
                                                        <td style={{textAlign: 'end'}}>
                                                            ({toMoneyFormat((((parseFloat(selectedPayment.earnedPartnership) - parseFloat(selectedPayment.outputVAT))*0.7)*0.10), selectedPayment.currency)})
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2" style={{backgroundColor: 'white', borderTop: 'none', borderBottom: 'none'}}></td>
                                                        <td style={{backgroundColor: 'lightsteelblue'}}>
                                                            Net Earnings
                                                        </td>
                                                        <td style={{backgroundColor: 'lightsteelblue', textAlign: 'end'}}>
                                                            {toMoneyFormat((((parseFloat(selectedPayment.earnedPartnership) - parseFloat(selectedPayment.outputVAT))*0.7) - (((parseFloat(selectedPayment.earnedPartnership) - parseFloat(selectedPayment.outputVAT))*0.7)*0.10)), selectedPayment.currency)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {selectedPayment.enrollmentStatus !== ENROLLMENT_STATUS.PAYOUT_PAID && <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h5 className="modal-title" id="exampleModalLabel">Action</h5><br />
                                                <div className="row justify-content-around">
                                                    <button className="btn btn-danger col-5" onClick={() => setModalShow({refund: true})} disabled={selectedPayment.status !== PAYMENT_STATUS.PAID || selectedPayment.enrollmentStatus === ENROLLMENT_STATUS.PAYOUT_PAID}>
                                                        Refund
                                                    </button>
                                                    {/* <button className="btn btn-info col-5" onClick={() => setModalShow({payout: true})} disabled={selectedPayment.enrollmentStatus !== ENROLLMENT_STATUS.FOR_PAYOUT}>For Payout</button> */}
                                                    <a className={`btn btn-info col-5 
                                                        ${(selectedPayment.enrollmentStatus !== ENROLLMENT_STATUS.FOR_PAYOUT || selectedPayment.classStatus !== CLASS_STATUS.COMPLETED) && 'disabled'}`} rel="noreferrer" 
                                                        href={`${paypalConfig.paypalURL}/myaccount/transfer/homepage/pay`} 
                                                        onClick={() => {setModalShow({payout: true}); document.getElementById("pHistory-modal-close").click()}} 
                                                        target="_blank" role="button">Payout</a>
                                                    {/* <button className="btn btn-primary col-3" onClick={() => {setModalShow({payout: true}); document.getElementById("pHistory-modal-close").click()}} disabled={selectedPayment.enrollmentStatus !== ENROLLMENT_STATUS.FOR_PAYOUT}>Mark as Payout Paid</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal size='xl' show={modalShow.refund} onHide={() => setModalShow({refund:false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Refund Class</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>
                            Are you sure you want to refund this class? An total amount of <b>{`${toMoneyFormat((selectedPayment.price-selectedPayment.totalDiscount), selectedPayment.currency)}`}</b> will be refunded.
                            Clicking continue will notify user via email that payment has been successfully refunded to his/her account.
                        </h5>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant='link' type='button' onClick={() => setModalShow({refund:false})}>
                        Cancel
                    </Button>
                    <Button
                        variant='info'
                        type='submit'
                        onClick={handleClickRefund}
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
                
                <Modal size='s' show={modalShow.payout} onHide={() => setModalShow({payout: false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Payout Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6 className="mb-3">Clicking continue will tag this transaction as payout paid.</h6>
                        <div className="form-group">
                            <span className="col-md-12 lbl">Payout Account</span>
                            <div className="col-md-12">
                                <input
                                type="text"
                                defaultValue={selectedPayment.teacherPayoutNum}
                                className="form-control form-control-line"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <span className="col-md-12 lbl">Payout Amount</span>
                            <div className="col-md-12">
                                <input
                                type="text"
                                defaultValue={selectedPayment.currency + ' ' + (((parseFloat(selectedPayment.earnedPartnership) - parseFloat(selectedPayment.outputVAT))*0.7) - (((parseFloat(selectedPayment.earnedPartnership) - parseFloat(selectedPayment.outputVAT))*0.7)*0.10)).toFixed(2)}
                                className="form-control form-control-line"
                                disabled
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <span className="col-md-12 lbl">Payment Transaction Reference<span style={{color:'red'}}>*</span></span>
                            <div className="col-md-12">
                                <input type="text" className="form-control" onChange={(e) => setPayoutRef(e.target.value)}/>
                            </div>
                            <small className="form-text ml-3">Please indicate transaction reference number from the Payment Gateway</small>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant='link' type='button' onClick={() => setModalShow({payout: false})}>
                        Cancel
                    </Button>
                    <Button
                        variant='info'
                        type='submit'
                        onClick={sendPayout}
                        disabled={submitLoading === true || !payoutRef}
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

                <Modal
                    size='lg'
                    show={modalShow.verify}
                    backdrop='static'
                    keyboard={false}
                    onHide={() => setModalShow({verify: false})}
                >
                    <Modal.Header>
                    <Modal.Title>Proof of Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bank-details">
                    <form className="row" id="verifyForm">
                        <div className="col-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h6 className="modal-title mb-2" id="exampleModalLabel"><b>Transaction Id: {selectedPayment?.transactionId}</b></h6>
                                    <h6 className="modal-title" id="exampleModalLabel">Bank Name</h6>
                                    <div className="form-group mb-3">
                                        <input className="form-control" type="text" name="bankName" defaultValue={selectedPayment.paymentReference?.bankName} disabled/>
                                    </div>

                                    <h6 className="modal-title" id="exampleModalLabel">Reference Number</h6>
                                    <div className="form-group mb-3">
                                        <input className="form-control" type="text" name="referenceNumber" aria-describedby="refHelp" defaultValue={selectedPayment.paymentReference?.referenceNumber} disabled/>
                                        <small id="refHelp" class="form-text text-muted">Reference Number refers to the number indicated on your deposit slip or payment confirmation.</small>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="modal-title" id="exampleModalLabel">Date of Deposit</h6>
                                            <div className="form-group mb-3">
                                                <input className="form-control" type="date" name="depositDate" defaultValue={selectedPayment.paymentReference?.depositDate}disabled/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h6 className="modal-title" id="exampleModalLabel">Time of Deposit</h6>
                                            <div className="form-group mb-3">
                                                <input className="form-control" type="time" name="depositTime" defaultValue={selectedPayment.paymentReference?.depositTime} disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="modal-title" id="exampleModalLabel">Currency</h6>
                                            <div className="form-group mb-3">
                                                <input className="form-control" type="currency" name="currency" defaultValue={selectedPayment.paymentReference?.currency} disabled/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h6 className="modal-title" id="exampleModalLabel">Amount</h6>
                                            <div className="form-group mb-3">
                                                <input className="form-control" type="number" name="amount" min="1" defaultValue={selectedPayment.paymentReference?.amount} disabled/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-6">
                                            <h6 className="modal-title mb-3">Proof of Payment</h6>
                                            <a href={selectedPayment.paymentReference?.photo} target="_blank" rel="noreferrer"><img
                                                id="imageFile"
                                                src={selectedPayment.paymentReference?.photo}
                                                alt="thumbnail"
                                                className="img-fluid"
                                                style={{ maxHeight: "200px" }}
                                                /></a>
                                        </div>
                                    </div>
                                    {selectedPayment.paymentReference?.status !== PAYMENT_PROOF_STATUS.ACCEPTED && <div>
                                        <h6 className="modal-title" id="exampleModalLabel">Status</h6>
                                        <div className="form-group mb-3">
                                            <select className="form-control" name="status" onChange={(e) => setStatus(e.target.value)}>
                                                <option value="PRSTAT001">Unverified</option>
                                                <option value="PRSTAT002">Valid</option>
                                                <option value="PRSTAT003">Invalid</option>
                                            </select>
                                        </div>

                                        <h6 className="modal-title" id="exampleModalLabel">Remarks</h6>
                                        <div className="form-group mb-3">
                                            <textarea className="form-control" row="3" name="remarks" onChange={(e) => setRemarks(e.target.value)}/>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {selectedPayment.paymentReference?.status !== PAYMENT_PROOF_STATUS.ACCEPTED && <Button variant='primary' type="button" onClick={verifyPayment} disabled={submitLoading}>
                            <span
                            style={{ display: submitLoading ? 'inline-block' : 'none' }}
                            className='spinner-border spinner-border-sm btn-load'
                            role='status'
                            aria-hidden='true'
                            />
                            Proceed
                        </Button>}
                        <Button variant='secondary' onClick={() => setModalShow({verify: false})} disabled={submitLoading}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* <Modal size='s' show={modalShow.payout} onHide={() => setModalShow({payout: false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Release Payout?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h5>
                        Clicking continue will release a total payout amount of <b>{selectedPayment.currency} {(((parseFloat(selectedPayment.earnedPartnership) - parseFloat(selectedPayment.outputVAT))*0.7) - (((parseFloat(selectedPayment.earnedPartnership) - parseFloat(selectedPayment.outputVAT))*0.7)*0.05)).toFixed(2)}</b> to {selectedPayment.teacher}'s Payout account.
                        Are you sure you want to continue?
                    </h5>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant='link' type='button' onClick={() => setModalShow({payout: false})}>
                        Cancel
                    </Button>
                    <Button
                        variant='info'
                        type='submit'
                        onClick={sendPayout}
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
                </Modal> */}
            </div>
            <footer className="footer">© 2021 Tagpros Education</footer>
        </Fragment>
    );
};