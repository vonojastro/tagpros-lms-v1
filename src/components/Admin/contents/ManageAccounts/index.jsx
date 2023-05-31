import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import { getAllAccounts, updateAccountStatus } from "api/account";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPE, ACCOUNT_STATUS } from "utils/constants"
import { CSVLink } from 'react-csv';
import "./index.css";
import { toast } from 'react-toastify';

export default function ManageAccounts() {
    const [selectedAccount, setSelectedAccount] = useState({});
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");
    // const [filterValue, setFilterValue] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    let loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));

    const dispatch = useDispatch();

    const accounts = useSelector((state) => state.account ? state.account.getIn(['data', 'accounts']) : []);

    const loadData = () => {
        setErrorTable(false);
        getAllAccounts(dispatch, (status) => {
            if(!status){
                setErrorTable(true);
            }
         });
    }

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [toggleSortFilter, setToggleSortFilter] = useState({});
    const columns = [{
        Header: "Account List",
        columns: [
            {
                Header: 'No.', accessor: 'no',
                Cell: ({ row }) => (
                    <div>{row.index + 1}</div>
                ),
            },
            // {
            //     Header: 'Account ID',
            //     accessor: 'accountId',
            //     accessorFilter: 'accountID',
            //     filterType: 'sortOnly',
            //     columnFilter: true,
            // },
            {
                Header: 'Name',
                accessor: d => `${d.lastName}, ${d.firstName} ${d.middleName}`,
                accessorFilter: 'Name',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Account Type',
                accessor: 'prefix',
                accessorFilter: 'prefix',
                filterType: 'multipleSelectManageAccount',
                columnFilter: true,
                filter: multiSelectFilter,
                Cell: row => (
                    <div>{USER_TYPE[row.value]}</div>
                ),
            },
            {
                Header: 'Email Address',
                accessor: 'emailAddress',
                accessorFilter: 'emailAddress',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Registration Date',
                accessor: 'createdDate',
                accessorFilter: 'createdDate',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Date Updated',
                accessor: 'updatedDate',
                accessorFilter: 'updatedDate',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Last Login',
                accessor: 'lastLoginDate',
                accessorFilter: 'lastLoginDate',
                filterType: 'sortOnly',
                columnFilter: true,
            },
            {
                Header: 'Status', accessor: 'status',
                accessorFilter: 'status',
                filterType: 'multipleSelectManageAccount',
                columnFilter: true,
                filter: multiSelectFilter,
                Cell: row => (
                    <div className={"badge " + getBadge(row.value)}>{getStatus(row.value)}</div>
                ),
            },
            {
                Header: 'Action',
                accessor: 'action',

                Cell: ({ row }) => (
                    <div style={{display: 'flex'}}>
                        <button
                            data-target="#exampleModal"
                            className="btn btn-link"
                            data-toggle="modal"
                            data-original-title="Edit"
                            onClick={() => onClickAction(row.index)}
                        >
                            <i className="ti-marker-alt"></i>
                        </button>
                    </div>
                ),
            },
        ],
    }];
    function multiSelectFilter(rows, columnIds, filterValue) {
        return filterValue.length === 0
            ? rows
            : rows.filter((row) =>
                filterValue.includes(String(row.original[columnIds])),
            );
    }
    const getBadge = (key) => {
        switch (key) {
            case ACCOUNT_STATUS.ACTIVE:
                return "badge-success"
            case ACCOUNT_STATUS.DEACTIVATED:
                return "badge-danger"
            case ACCOUNT_STATUS.SUSPENDED:
                return "badge-warning"
            default:
                return "badge-primary"
        }
    }

    const getStatus = (key) => {
        switch (key) {
            case ACCOUNT_STATUS.ACTIVE:
                return "active"
            case ACCOUNT_STATUS.DEACTIVATED:
                return "deactivated"
            case ACCOUNT_STATUS.SUSPENDED:
                return "suspended"
            default:
                return "pending"
        }
    }

    const onClickAction = (index) => {
        setSelectedAccount(accounts[index]);
        setStatus(accounts[index].status);
    }

    const updateAccount = async () => {
        setSubmitLoading(true);
        await updateAccountStatus(dispatch, { userId: selectedAccount.accountId, status, remarks }, (status) => {
            if(status){
                onClose();
                toast.success("Account Status has been successfully updated!");
            } else {
                setErrorUpdate(true);
                setSubmitLoading(false);
            }
        });
    }

    const onClose = () => {
        document.getElementById("modal-close").click();

        setSelectedAccount({});
        setRemarks("");
        setStatus("");
        setSubmitLoading(false);
        setErrorUpdate(false);

        //.setIn(["data", "templates"], action.data)
        loadData()
    }

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
                                            {/* <a href="#!">
                                                Total Accounts <span>{accounts.length}</span>
                                            </a> */}
                                            <div className="admin-table-total">
                                                <h5>
                                                    Total Accounts 
                                                </h5>
                                                <span>{accounts.length}</span>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <CSVLink data={[]} className="btn btn-success" filename="Account-Masterlist.csv" style={{ color: "white" }}>
                                                Export to CSV
                                            </CSVLink>
                                            {/* <button onClick={() => this.onClick()}>test</button> */}
                                        </li>
                                        <li className="divider"></li>
                                        {/* <li ><b>Filter</b></li>

                                        <li>
                                            <div className="form-inline align-self-end">
                                                <label className="pr-2">Account Type</label>
                                                <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="form-control w-auto">
                                                    <option value="">All</option>
                                                    <option value="FMLY">Family</option>
                                                    <option value="TCHR">Teacher</option>
                                                    <option value="LRNR">Learner</option>
                                                    <option value="ADM">Admin</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li className="divider"></li> */}
                                    </ul>
                                </div>
                                {/* <!-- /.left-aside-column--> */}
                                <div className="right-aside col-9">
                                    <Table loading={loading} 
                                        error={errorTable} 
                                        columns={columns} 
                                        data={accounts} 
                                        title={"Account List"} 
                                        // filterColumn={'prefix'} 
                                        // filterValue={filterValue} 
                                        onReload={loadData}
                                        toggleSortFilter={toggleSortFilter}
                                        setToggleSortFilter={setToggleSortFilter}
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
                                <h5 className="modal-title" id="exampleModalLabel">Manage Account</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            {!!errorUpdate && <div className="alert alert-warning text-center text m-t-20" role="alert"
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
                                            <div className="row no-gutters">
                                                <div className="col-md-4">
                                                    <img src={selectedAccount.thumbnailImage || "./assets/images/image-placeholder.jpg"} className="card-img" alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <small className="text-muted p-t-0">Name </small>
                                                        <h6>{selectedAccount.firstName} {selectedAccount.middleName} {selectedAccount.lastName} </h6>
                                                        <small className="text-muted p-t-5 db">Email Address </small>
                                                        <h6>{selectedAccount.emailAddress}</h6>
                                                        <small className="text-muted p-t-5 db">Contact Number</small>
                                                        <h6>{selectedAccount.contactNumber || 'None'}</h6>
                                                        <small className="text-muted p-t-5 db">Account Type</small>
                                                        <h6>{USER_TYPE[selectedAccount.prefix]}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h5 className="modal-title" id="exampleModalLabel">Status</h5>
                                                <div className="form-group">
                                                    <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                                                        <option value="ACSTAT001">Pending</option>
                                                        <option value="ACSTAT002">Active</option>
                                                        <option value="ACSTAT003">Deactivate</option>
                                                        <option value="ACSTAT004">Suspended</option>
                                                    </select>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <textarea defaultValue={remarks} className="form-control" rows="3" placeholder="Write your remarks here ..." onChange={e => setRemarks(e.target.value)}></textarea>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="modal-close" type="button" className="btn btn-secondary" onClick={() => onClose()} data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" style={{cursor: submitLoading&&'not-allowed'}} onClick={() => updateAccount()} disabled={submitLoading}>
                                    <span style = {{display: submitLoading ? 'inline-block' : 'none'}} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <footer className="footer">© 2021 Tagpros Education</footer>
        </Fragment>
    );
};