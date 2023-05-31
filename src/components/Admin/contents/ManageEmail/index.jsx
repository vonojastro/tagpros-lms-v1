import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import { DefaultEditor } from 'react-simple-wysiwyg';
import { getEmailTemplates, updateEmailTemplate, addEmailTemplate } from "api/email-template";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from 'react-csv';
import "./index.css";
import { toast } from 'react-toastify';


export default function ManageEmails() {
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [status, setStatus] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    // const [filterValue, setFilterValue] = useState("");
    const [modalAction, setModalAction] = useState("add");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    let loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));

    const dispatch = useDispatch();

    const emailTemplates = useSelector((state) => state.emailTemplate ? state.emailTemplate.getIn(['data', 'templates']) : []);

    const loadData = () => {
        setErrorTable(false);
        getEmailTemplates(dispatch, (status) => {
            if (!status) {
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
        Header: "Email Template List",
        columns: [
            {
                Header: 'No.', accessor: 'id',
                Cell: ({ row }) => (
                    <div>{row.index + 1}</div>
                ),
            },
            {
                Header: 'Subject',
                accessor: 'subject',
                accessorFilter: 'subject',
                filterType: 'sortOnly',
                columnFilter: true
            },
            {
                Header: 'Email Content',
                accessor: 'description',
            },
            {
                Header: 'Updated Date',
                accessor: 'updatedDate',
                accessorFilter: 'UpdatedDate',
                filterType: 'sortOnly',
                columnFilter: true
            },
            {
                Header: 'Updated By',
                accessor: 'updatedByName',
                accessorFilter: 'updatedByName',
                filterType: 'sortOnly',
                columnFilter: true
            },
            {
                Header: 'Status', accessor: 'status',
                accessorFilter: 'status',
                filterType: 'multipleSelectManageEmail',
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
                    <div style={{ display: 'flex' }}>
                        <button
                            data-target="#exampleModal"
                            className="btn btn-link"
                            data-toggle="modal"
                            data-original-title="Edit"
                            onClick={() => onClickAction('edit', row.index)}
                        >
                            <i className="ti-marker-alt"></i>
                        </button>
                    </div>
                ),
            },
        ],
    }];


const convertToCSVArray = (data) => {
    let headers = columns[0].columns.map((c)=>(c.Header))
    let csvArray = [
        headers
    ];

    let keys = columns[0].columns.map((c)=>(c.accessor))
    keys.shift()

    data.forEach((item, i) => {
        csvArray.push([i+1, ...keys.map((k)=> (item[k])) ])
    });
    return csvArray;
}

    function multiSelectFilter(rows, columnIds, filterValue) {
        return filterValue.length === 0
            ? rows
            : rows.filter((row) =>
                filterValue.includes(String(row.original[columnIds])),
            );
    }
    const getBadge = (key) => {
        switch (key) {
            case 'A':
                return "badge-info"
            case 'I':
                return "badge-warning"
            default:
                return "badge-info"
        }
    }

    const getStatus = (key) => {
        switch (key) {
            case 'A':
                return "active"
            case 'I':
                return "inactive"
            default:
                return "active"
        }
    }

    function onChange(e) {
        setDescription(e.target.value);
      }

    const submitAction = async () => {
        setSubmitLoading(true);

        if (modalAction === 'edit') {
            await updateEmailTemplate(dispatch, { id: selectedTemplate.id, subject: subject, content: description, status: status }, (status) => {
                if (status) {
                    onClose(true);
                    toast.success("Email Template has been successfully updated!");
                } else {
                    setErrorUpdate(true);
                    setSubmitLoading(false);
                }
            });
        } else {
            await addEmailTemplate(dispatch, { subject: subject, description: description });
        }
    }

    const onClickAction = (action, index) => {
        setModalAction(action);
        setSelectedTemplate(emailTemplates[index]);
        setStatus(emailTemplates[index].status);
        setSubject(emailTemplates[index].subject);
        setDescription(emailTemplates[index].description);
    }

    const onClose = (refresh) => {
        // document.getElementById("modal-close").click();
        document.querySelector("#modalClose").click();

        setSelectedTemplate({});
        setSubmitLoading(false);
        setErrorUpdate(false);
        setStatus("");
        setSubject("");
        setDescription("");

        //.setIn(["data", "templates"], action.data)
        if (!!refresh) {
            getEmailTemplates(dispatch);
        }
    }

    return (
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
                                                Total Email Templates <span>{emailTemplates.length}</span>
                                            </a> */}
                                            <div className="admin-table-total">
                                                <h5>
                                                    Total Email 
                                                </h5>
                                                <span>{emailTemplates.length}</span>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <CSVLink data={convertToCSVArray(emailTemplates)} className="btn btn-success" filename="Email-Template-List.csv" style={{ color: "white" }}>
                                                Export to CSV
                                            </CSVLink>
                                            {/* <button onClick={() => this.onClick()}>test</button> */}
                                        </li>
                                        <li className="divider"></li>
                                        {/* <li ><b>Filter</b></li>

                                        <li>
                                            <div className="form-inline align-self-end">
                                                <label className="pr-2">Status</label>
                                                <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="form-control w-auto">
                                                    <option value="">All</option>
                                                    <option value="A">Active</option>
                                                    <option value="I">Inactive</option>
                                                </select>
                                            </div>
                                        </li>
                                        <li className="divider"></li> */}
                                    </ul>
                                </div>
                                {/* <!-- /.left-aside-column--> */}
                                <div className="right-aside col-9">
                                    {/* <div className="button-fab">
                                        <button type="button" className="btn btn-info" 
                                        data-target="#exampleModal" data-toggle="modal" onClick={() => setModalAction('add')}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div> */}
                                    <Table
                                        loading={loading}
                                        error={errorTable}
                                        columns={columns}
                                        data={emailTemplates} 
                                        title={"Email Template List"}
                                        // filterColumn={'status'}
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
                                <h5 className="modal-title" id="exampleModalLabel">{modalAction === 'edit' ? 'Manage Email Template' : 'Add Email Template'}</h5>
                                <button id="modalClose" type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => onClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            {!!errorUpdate && <div className="alert alert-warning text-center text m-t-20" role="alert"
                                style={{ fontSize: 10 }}>
                                <i class="fas fa-times float-right" style={{ cursor: 'pointer' }} onClick={() => setErrorUpdate(false)}></i>
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
                                            <div className="card-body">
                                                <h5 className="modal-label" id="exampleModalLabel">Subject</h5>
                                                <div className="form-group">
                                                    <input type="text" value={subject} onChange={e => setSubject(e.target.value)} className="form-control" placeholder="Subject" />
                                                </div>

                                                <div style={{ display: modalAction === 'edit' ? 'block' : 'none' }}>
                                                    <h5 className="modal-label" id="exampleModalLabel">Status</h5>
                                                    <div className="form-group">
                                                        <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                                                            <option value="A">Active</option>
                                                            <option value="I">Inactive</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <h5 className="modal-label" id="exampleModalLabel">Email Content</h5>
                                                <DefaultEditor value={description} onChange={onChange} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="modal-close" type="button" className="btn btn-secondary" onClick={() => onClose()} data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" style={{ cursor: submitLoading && 'not-allowed' }} onClick={() => submitAction()} disabled={submitLoading}>
                                    <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
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
