import React, { useState } from "react";
import Table from "components/Admin/contents/Table";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { getAllAdminAccounts, saveAdminDetails, deactivateAdminAccount, activateAdminAccount, resetPassLink } from "api/admin";
import { Modal, Alert, Button } from "react-bootstrap";


import './index.css';
import { ADMIN_TYPES, 
    // ACCOUNT_STATUS 
} from "utils/constants";

export default function ManageAdminAccounts() {
    const [filterValue, setFilterValue] = useState({role:'', status:''});
    const [hideFilter, setHideFilter] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState({
        adminId: null,
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    });

    // eslint-disable-next-line no-unused-vars
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showActivationModal, setShowActivationModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);


    let loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));
    const dispatch = useDispatch();
    const [toggleSortFilter, setToggleSortFilter] = useState({});
    const columns = [
        {
            Header:"Admin Accounts",
            id:"tbl",
            columns: [
                {
                    Header: 'FULL NAME',
                    accessor: d => `${d.firstName} ${d.lastName}`,
                    accessorFilter: 'FULL_NAME',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'EMAIL',
                    accessor: "email",
                    accessorFilter: 'email',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'ROLE',
                    accessor: "role",
                    accessorFilter: 'role',
                    filterType: 'multipleSelect',
                    columnFilter: true,
                    filter: multiSelectFilter,
                },
                {
                    Header: 'STATUS',
                    accessor: "status",
                    accessorFilter: 'status',
                    filterType: 'multipleSelect',
                    columnFilter: true,
                    filter: multiSelectFilter,
                },
                {
                    Header: 'ACTION',
                    accessor: d => d.status,
    
                    Cell: ({ row, value }) => (
                        <div style={{display: 'flex'}}>
                            <button
                                className="btn btn-link"
                                data-toggle="tooltip" title="Update Account"
                                onClick={() => onClickAction("showUpdateAccountModal", row.index)}
                            >
                                <i className="ti-marker-alt"></i>
                            </button>
                            <button
                                className="btn btn-link"
                                data-toggle="tooltip" title={`${row.values.status === 'ACTIVE' ? 'Deactivate Account' : 'Activate Account'}`}
                                onClick={() => onClickAction("showActivationModal", row.index)}
                            >
                                {row.values.status === 'ACTIVE' ? <i className="fas fa-toggle-on"></i> : <i className="fas fa-toggle-off"></i> }
                            </button>
                            <button
                                className="btn btn-link"
                                data-toggle="tooltip" title="Reset Password"
                                onClick={() => onClickAction("showResetPasswordModal", row.index)}
                            >
                                <i className="fa fa-key"></i>
                            </button>
                        </div>
                    ),
                }
                
            ]
        }
    ];
    function multiSelectFilter(rows, columnIds, filterValue) {
        return filterValue.length === 0
            ? rows
            : rows.filter((row) =>
                filterValue.includes(String(row.original[columnIds])),
            );
    }
    
    const loadData = async () => {
        await setErrorTable(false);

        await getAllAdminAccounts(dispatch, async (status, data) => {
            if(!status){
                await setErrorTable(true);
            }else{
                await setTableData(data);
                await setOriginalData(data);
                if (!!filterValue.role && filterValue.role !== '')
                {
                    applyFilter('role', filterValue.role);
                }
                else if (!!filterValue.status && filterValue.status !== '')
                {
                    applyFilter('status', filterValue.status);
                }
            }
         });

        
    };

    const onClickAction = async (act, index) =>{
        await setErrorMessage("");
        switch(act)
        {
            case 'save':
                console.log(selectedAdmin);
                saveAccountPOST();
                break;
            case 'showUpdateAccountModal':
                if (isNaN(index))
                {
                    await setSelectedAdmin({adminId: null,
                        firstName: '',
                        lastName: '',
                        email: '',
                        role: ''});
                }
                else
                {
                    await setSelectedAdmin(tableData[index]);
                }
                await setShowUpdateModal(true);
                break;
            case 'showActivationModal':
                await setSelectedAdmin(tableData[index]);
                await setShowActivationModal(true);
                break;
            case 'showResetPasswordModal':
                await setSelectedAdmin(tableData[index]);
                await setShowResetPasswordModal(true);
                break;
            case 'activate':
                activateAccountPOST();
                break;
            case 'deactivate':
                deactivateAccountPOST();
                break;
            case 'resetPass':
                resetPassLinkPOST();
                break;
            default:
                break;
        }
    };

    const resetPassLinkPOST = async () =>{
        setSubmitLoading(true);
        const args = {
            adminId: selectedAdmin.adminId
        };
        await resetPassLink(dispatch, args, (status, data)=>{
            if(!status){
                // toast error
                toast.error("Oh no! Unable to send reset password link. Please try again.");
            }
            else
            {
                // toast success
                toast.success("Email Sent!");
                setShowResetPasswordModal(false);
            }
        });
        setSubmitLoading(false);
    };

    const saveAccountPOST = async () =>{
        await setSubmitLoading(true);
        if (!selectedAdmin.firstName || selectedAdmin.firstName === '')
        {
            await setErrorMessage("Please encode the FIRST NAME of the user");
            return;
        }

        if (!selectedAdmin.lastName || selectedAdmin.lastName === '')
        {
            await setErrorMessage("Please encode the LAST NAME of the user");
            return;
        }

        if (!selectedAdmin.email || selectedAdmin.email === '')
        {
            await setErrorMessage("Please encode the EMAIL of the user");
            return;
        }

        // eslint-disable-next-line no-useless-escape
        if (!selectedAdmin.email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/))
        {
            await setErrorMessage("Please encode the EMAIL in the proper format");
            return;
        }

        if (!selectedAdmin.role || selectedAdmin.role === '')
        {
            await setErrorMessage("Please encode the ACCOUNT TYPE of the user");
            return;
        }


        if (!!selectedAdmin.adminId)
        {
            // args
            const args = {
                adminId: selectedAdmin.adminId,
                firstName: selectedAdmin.firstName,
                lastName: selectedAdmin.lastName,
                role: selectedAdmin.role,
                email: selectedAdmin.email
            };
            await saveAdminDetails(dispatch, args, async (status, data)=>{
                if(!status){
                    console.log(data.response.data.message);
                    await setErrorMessage(data.response.data.message);
                    toast.error("Oh no! Unable to update the account. Please Try Again.");
                }
                else
                {
                    toast.success("Account Details Successfully Saved!");
                    loadData();
                    setShowUpdateModal(false);
                }
            });
        }
        else
        {
            const args = {
                firstName: selectedAdmin.firstName,
                lastName: selectedAdmin.lastName,
                role: selectedAdmin.role,
                email: selectedAdmin.email
            };
            await saveAdminDetails(dispatch, args, async (status, data)=>{
                if(!status){
                    // toast error
                    console.log(data, data.response.data.message);
                    await setErrorMessage(data.response.data.message);
                    toast.error("Oh no! Unable to Create an Account. Please Try Again.");
                }
                else
                {
                    // toast success
                    toast.success("Account Details Successfully Saved!");
                    loadData();
                    setShowUpdateModal(false);
                }
            });
        }        
        await setSubmitLoading(false);
    };

    const deactivateAccountPOST = async () =>{
        setSubmitLoading(true);
        const args = {
            adminId: selectedAdmin.adminId
        };
        await deactivateAdminAccount(dispatch, args, (status, data)=>{
            if(!status){
                // toast error
                toast.error("Oh no! Unable to deactivate the account. Please try again.");
            }
            else
            {
                // toast success
                toast.success("Account successfully deactivated!");
                loadData();
                setShowActivationModal(false);
            }
        });
        setSubmitLoading(false);

    };

    const activateAccountPOST = async () =>{
        setSubmitLoading(true);
        const args = {
            adminId: selectedAdmin.adminId
        };
        await activateAdminAccount(dispatch, args, (status, data)=>{
            if(!status){
                // toast error
                toast.error("Oh no! Unable to activate the Account. Please try again.");
            }
            else
            {
                // toast success
                toast.success("Account successfully activated!");
                loadData();
                setShowActivationModal(false);
            }
        });
        setSubmitLoading(false);

    };

    // const resetPasswordPOST = async () =>{
    //     setSubmitLoading(true);
    //     const args = {
    //         adminId: selectedAdmin.adminId
    //     };
    //     await activateAdminAccount(dispatch, args, (status, data)=>{
    //         if(!status){
    //             // toast error
    //             toast.error("Oh no! Unable to activate the Account. Please try again.");
    //         }
    //         else
    //         {
    //             // toast success
    //             toast.success("Account successfully activated!");
    //             loadData();
    //             setShowActivationModal(false);
    //         }
    //     });
    //     setSubmitLoading(false);

    // };

    const applyFilter = async (column, value) => {
        filterValue[column] = value;
        await setFilterValue(filterValue);
        let keys = await Object.keys(filterValue).filter(key => filterValue[key] !== "") || [];
        if(keys.length === 0){
            setTableData(originalData);
            return;
        }

        const result = await originalData.filter((data) => {
            let match = 0;
            keys.forEach((key) => {

                switch (key){
                    case 'role':
                        if (data[key] === filterValue[key] || data[key] === '') match++;
                        break;
                    case 'status':
                        if (data[key] === filterValue[key] || data[key] === '') match++;
                        break;
                    default: 
                        break;
                }
            });

            return match === keys.length;
        });

        await setTableData(result);
    }

    const onInputChange = async (name, value) =>{
        setSelectedAdmin((prevState) =>({
            ...prevState,
            [name]: value
        }));
    };

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return(
        <div>
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
                                            {/* <a href="#!">
                                                Total Admins <span>{originalData.length}</span>
                                            </a> */}
                                            <div className="admin-table-total">
                                                <h5>
                                                    Total Admins 
                                                </h5>
                                                <span>{tableData.length}</span>
                                            </div>
                                        </li>

                                        <li className="divider"></li>

                                        {Object.keys(ADMIN_TYPES).map((item) =>{
                                            return <li className="box-label">
                                                        <a href="#!">
                                                            {item} <span>{originalData.filter(dataItem=>dataItem.role === ADMIN_TYPES[item]).length}</span>
                                                        </a>
                                                    </li>
                                        })}
                                                    
                                        <li className="divider"></li>

                                        {/* <li>
                                            <div>
                                                <label>Account Type</label>
                                                <select value={filterValue.accountType} onChange={(e) => setFilterValue(e.target.value)} className="form-control row"> 
                                                <select value={filterValue.role} onChange={(e) => applyFilter('role',e.target.value)} className="form-control">
                                                    <option value="">All</option>
                                                    {Object.keys(ADMIN_TYPES).map((item) =>{
                                                        return <option value={ADMIN_TYPES[item]}>{ADMIN_TYPES[item]}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </li>
                                        <br/>
                                        <li>
                                            <div>
                                                <label>Account Status</label>
                                                <select value={filterValue.accountType} onChange={(e) => setFilterValue(e.target.value)} className="form-control row"> 
                                                <select value={filterValue.status} onChange={(e) => applyFilter('status', e.target.value)} className="form-control">
                                                    <option value="">All</option>
                                                    {Object.keys(ACCOUNT_STATUS).map((item) =>{
                                                        return <option value={item}>{item}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </li> */}
                                        
                                    </ul>}
                                </div>
                                <div className={`right-aside ${!hideFilter ? 'col-9' : 'col-11'}`}>
                                    <div className="button-fab">
                                    {/* onClick={() => onClickAction('add')} */}
                                            <button type="button" className="btn btn-info" onClick={(e)=>onClickAction("showUpdateAccountModal")}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <Table loading={loading} 
                                        error={errorTable} 
                                        columns={columns} 
                                        data={tableData} 
                                        title={"Admin Accounts"} 
                                        // filterColumn={'role'} 
                                        // filterValue={filterValue} 
                                        toggleSortFilter={toggleSortFilter}
                                        setToggleSortFilter={setToggleSortFilter}
                                        onReload={loadData}
                                        />
                                </div>
                                {/* <!-- /.left-right-aside-column--> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Update Admin Account Modal */}
            <Modal
                size="m"
                show={showUpdateModal}
                backdrop="static"
                keyboard={false}
                onHide={async () => { await setShowUpdateModal(!showUpdateModal); await setSelectedAdmin({
                    adminId: null,
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: ''
                })}}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Account Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {!!errorMessage && errorMessage !== '' ? (
                      <Alert variant="danger" style={{ whiteSpace: "pre-wrap" }} onClose={() => setErrorMessage("")} dismissible >
                        {errorMessage}
                      </Alert>
                    ) : null}
                    <form>
                        <div className="col">
                            <div>
                                <label className="lms-input-label" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    defaultValue={selectedAdmin.firstName}
                                    onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label className="lms-input-label" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    defaultValue={selectedAdmin.lastName}
                                    onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label className="lms-input-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    defaultValue={selectedAdmin.email}
                                    disabled={!!selectedAdmin.adminId ? true: false}
                                    onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label>Account Type</label>
                                <select id="role" name="role" defaultValue={selectedAdmin.role} onChange={(e) => onInputChange(e.target.name, e.target.value)} className="form-control">
                                    <option value="">Please select the account type of the user</option>
                                    {Object.keys(ADMIN_TYPES).map((item) =>{
                                        return <option value={ADMIN_TYPES[item]}>{ADMIN_TYPES[item]}</option>
                                    })}
                                </select>
                            </div>
                            


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(e)=>onClickAction("save")}>
                    Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Deactivate / Activate Account Modal */}
            <Modal
                size="m"
                show={showActivationModal}
                backdrop="static"
                keyboard={false}
                onHide={() => setShowActivationModal(!showActivationModal)}
                >
                <Modal.Header closeButton>
                    <Modal.Title>{!!selectedAdmin && selectedAdmin.status === 'ACTIVE' ? 'Deactivate Account' : 'Activate Account'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {!!selectedAdmin && selectedAdmin.status === 'ACTIVE' ? 'deactivate the account' : 'activate the account'} of {selectedAdmin.firstName} {selectedAdmin.lastName}? 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(e)=> onClickAction(!!selectedAdmin && selectedAdmin.status === 'ACTIVE' ? 'deactivate' : 'activate')}>
                    {!!selectedAdmin && selectedAdmin.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Reset Password Modal */}
            <Modal
                size="m"
                show={showResetPasswordModal}
                backdrop="static"
                keyboard={false}
                onHide={() => setShowResetPasswordModal(!showResetPasswordModal)}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to reset the password of {selectedAdmin.firstName} {selectedAdmin.lastName}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(e)=> onClickAction("resetPass")}>
                        Reset
                    </Button>
                </Modal.Footer>
            </Modal>
            <footer className="footer">© 2021 Tagpros Education</footer>
            </div>
    );
};