import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from "react-redux";
import { getPayouts } from "api/payment";
import { PAYOUT_STATUS } from "utils/constants";
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { api } from '../../../../api';

export default function Payouts() {
    const dispatch = useDispatch();
    const payouts = useSelector((state) => state.payment ? state.payment.getIn(['data', 'payouts']) : []);
    let loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));

    const [submitLoading, setSubmitLoading] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [filterValue, setFilterValue] = useState("");

    const columns = [{
        Header: "Payout List",
        columns: [
            {
                Header: 'No.', accessor: 'classid',
                Cell: ({ row }) => (
                    <div>{row.index + 1}</div>
                ),
            },
            {
                Header: 'Transaction Id',
                accessor: 'txnId',
            },
            {
                Header: 'Teacher',
                accessor: 'teacher'
            },
            {
                Header: 'Payout Account',
                accessor: d => `${d.accountType} - ${d.accountNumber}`
            },
            {
                Header: 'Class Title',
                accessor: 'title'
            },
            {
                Header: 'Course Price',
                accessor: d => `${d.currency} ${d.price}`
            },
            {
                Header: 'Total Enrollees',
                accessor: 'studentsCount'
            },
            {
                Header: 'Total Payout',
                accessor: d => `${d.currency} ${((d.studentsCount*d.price)*0.7).toFixed(2)}`
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: row => (
                    <div className={"badge " + getBadge(row.value)}>{getValue(row.value)}</div>
                )
            },
            {
                Header: 'Action',
                accessor: d => d.status,
                Cell: ({ row, value }) => (
                    <div style={{display:'grid', gap:5, gridTemplateColumns: 'repeat(auto-fill, minmax(5rem,1fr))'}}>
                        {value === PAYOUT_STATUS.PENDING && <button
                        className='btn btn-info btn-sm'
                        data-toggle='tooltip'
                        title='Release Payout to teacher'
                        onClick={() => handleClickPayout(row.index)}
                        >Send Payout</button>}
                    </div>
                )
            },
        ],
    }];

    const getBadge = (key) => {
        switch (key) {
            case PAYOUT_STATUS.PAID:
                return "badge-success"
            case PAYOUT_STATUS.CANCELLED:
                return "badge-danger"
            case PAYOUT_STATUS.PENDING:
                return "badge-warning"
            default:
                return "badge-primary"
        }
    }

    const getValue = (value) => {
        return Object.keys(PAYOUT_STATUS).find(key => PAYOUT_STATUS[key] === value);
    }

    const loadData = () => {
        setErrorTable(false);

        getPayouts(dispatch, ()=>{});
    }

    const handleClickPayout = async (index) => {
        setSelectedTransaction(payouts[index]);
        setModalShow(true);
    }

    const sendPayout = async () => {
        setSubmitLoading(true);

        await api
          .post('/payout/release', { txnId: selectedTransaction.txnId })
          .then(response => {
            toast.success(`Payout has been successfully released to account ${selectedTransaction.accountNumber}`);
          })
          .catch(err => {
            console.log(err);
            toast.error('Cannot proceed with payout. Please try again later.');
          }).finally(() => {
              setModalShow(false);
              setSelectedTransaction({});
              setSubmitLoading(false);
          });
    };

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <Fragment>       
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/* <!-- .left-right-aside-column--> */}
                            <div className="row">
                                {/* <!-- .left-aside-column--> */}
                                <div className="left-aside bg-light-part col">
                                    <ul className="list-style-none">
                                        <li className="box-label">
                                            <a href="#!">
                                                Total Payouts <span>{payouts.length}</span>
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <CSVLink data={[]} className="btn btn-success" filename="Payout.csv" style={{ color: "white" }}>
                                                Export to CSV
                                            </CSVLink>
                                            {/* <button onClick={() => this.onClick()}>test</button> */}
                                        </li>
                                        <li className="divider"></li>
                                        <li ><b>Filter</b></li>

                                        <li>
                                            <div className="form-inline align-self-end">
                                                <label className="pr-2">Status</label>
                                                <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="form-control w-auto">
                                                    <option value="">All</option>
                                                    <option value={PAYOUT_STATUS.PENDING}>Pending</option>
                                                    <option value={PAYOUT_STATUS.PAID}>Paid</option>
                                                    <option value={PAYOUT_STATUS.CANCELLED}>Cancelled</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                    </ul>
                                </div>
                                
                                {/* <!-- /.left-aside-column--> */}
                                <div className="right-aside col-9">
                                    <Table
                                        loading={loading}
                                        error={errorTable}
                                        columns={columns}
                                        data={payouts}
                                        title={"Payout List"}
                                        filterColumn={'status'}
                                        filterValue={filterValue}
                                        onReload={loadData} />
                                </div>
                                {/* <!-- /.left-right-aside-column--> */}
                            </div>
                        </div>
                    </div>
                </div>

                <Modal size='s' show={modalShow} onHide={() => setModalShow(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Release Payout?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h5>
                        Clicking continue will release a total payout amount of <b>{selectedTransaction.currency} {((selectedTransaction.price*selectedTransaction.studentsCount)*0.70).toFixed(2)}</b> to {selectedTransaction.teacher}'s Payout account.
                        Are you sure you want to continue?
                    </h5>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant='link' type='button' onClick={() => setModalShow(false)}>
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
                </Modal>
            </div>
            <footer className="footer">© 2021 Tagpros Education</footer>
        </Fragment>
    );
}