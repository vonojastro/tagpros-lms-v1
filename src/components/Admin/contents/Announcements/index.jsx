import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements, addAnnouncement, updateAnnouncement } from "api/announcement";
import moment from "moment";
import { toast } from 'react-toastify';
// import './index.css';

const initialValue = {
    name: "",
    description: "",
    code: "",
    type: "promo",
    price: null,
    percentage: null,
    startDate: null,
    endDate: null,
    currency: "",
    limit: null,
    status: 'A',
    userTypes: [],
}

export default function Announcements() {
    const dispatch = useDispatch();
    const now = moment(new Date()).format('YYYY-MM-DD');
    const [modalAction, setModalAction] = useState("");
    // const [filterValue, setFilterValue] = useState("");
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(initialValue);
    const [submitLoading, setSubmitLoading] = useState(false);
    const announcements = useSelector((state) => state.announcement ? state.announcement.getIn(['data', 'announcements']) : []);
    const [checkedUserTypes, setCheckedUserTypes] = useState([]);

    const loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));

    const loadData = () => {
        setErrorTable(false);

        getAnnouncements(dispatch, (status, data) => {
            if (!status) {
                setErrorTable(true);
            }
        });
    }

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [toggleSortFilter, setToggleSortFilter] = useState({
      });
    const columns = [
        {
            Header: "Announcements",
            columns: [
                {
                    Header: 'Title',
                    accessor: 'title',
                    // accessor: d => d.title,
                    accessorFilter: 'Title',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Description',
                    accessor: 'description',
                    accessorFilter: 'Description',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Start Date',
                    accessor: d => moment(d.startDate).format("MM/DD/YYYY hh:mm a"),
                    accessorFilter: 'Start_Date',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'End Date',
                    accessor: d => moment(d.endDate).format("MM/DD/YYYY hh:mm a"),
                    accessorFilter: 'End_Date',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                    accessorFilter: 'status',
                    filterType: 'multipleSelectAnnounce',
                    columnFilter: true,
                    filter: multiSelectFilter,
                    Cell: row => (
                        <div className={"badge " + getBadge(row.value)}>{row.value === 'A' ? 'active' : 'inactive'}</div>
                    )
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
    const getBadge = (key) => {
        switch (key) {
            case "A":
                return "badge-success"
            case "I":
                return "badge-secondary"
            default:
                return "badge-primary"
        }
    }

    const onClickCheckBox = async (e) => {
        let checkedTypes = [...checkedUserTypes];
            if(e.target.checked){
                checkedTypes.push(e.target.value);
                console.log(checkedTypes);
            }else{
               const idx = checkedTypes.indexOf(e.target.value);
               checkedTypes.splice(idx, 1);
            console.log(checkedTypes);
            }
            setCheckedUserTypes(checkedTypes)
            setSelectedAnnouncement(prevState => ({
                ...prevState,
                "userTypes": checkedTypes,
                price: null
            }));
    }


    const isChecked = (type) => {
        return checkedUserTypes.indexOf(type) > -1;
    }

    const onClickAction = (action, index) => {
        document.getElementById("updateForm").reset();
        setModalAction(action);
        if (action === 'edit') {
            setSelectedAnnouncement({
                ...announcements[index],
                startDate: moment(announcements[index].startDate).format("YYYY-MM-DD"),
                endDate: moment(announcements[index].endDate).format("YYYY-MM-DD"),
            });
            setCheckedUserTypes(announcements[index].userTypes)
        } else {
            setSelectedAnnouncement({ ...initialValue });
        }
    }

    const onClose = (reload) => {
        document.getElementById("updateForm").reset();
        document.getElementById("announcement-close-modal").click();

        setSelectedAnnouncement({ ...initialValue});
        setCheckedUserTypes([]);
        setErrorUpdate(false);

        if (reload) {
            loadData();
        }
    }

    const handleSubmit = async () => {
        setSubmitLoading(true);

        const announcement = {
            ...selectedAnnouncement,
            // startDate: moment(`${selectedAnnouncement.startDate} ${selectedAnnouncement.startTime}:00`, 'YYYY-MM-DD HH:mm:ss').format(), //combineDateAndTime(selectedAnnouncement.startDate, selectedAnnouncement.startTime),
            // endDate: moment(`${selectedAnnouncement.enDate} ${selectedAnnouncement.endTime}:00`, 'YYYY-MM-DD HH:mm:ss').format(), //combineDateAndTime(selectedAnnouncement.startDate, selectedAnnouncement.startTime),
            startDate: moment(`${selectedAnnouncement.startDate} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').format(),
            endDate: moment(`${selectedAnnouncement.endDate} 23:59:00`, 'YYYY-MM-DD HH:mm:ss').format(),
        }

        if (modalAction === 'edit') {
            await updateAnnouncement(dispatch, announcement, status => {
                if (status) {
                    toast.success('Announcement has been successfully saved.');
                    onClose(true);
                } else {
                    setErrorUpdate(true);
                }
            });
            setSubmitLoading(false);
        } else {
            await addAnnouncement(dispatch, announcement, status => {
                if (status) {
                    toast.success('Announcement has been successfully saved.');
                    setSubmitLoading(false);
                    onClose(true);
                } else {
                    setErrorUpdate(true);
                }
            });
        }
    }

    const onInputChange = (name, value) => {
        switch (name) {
            case 'type':
                if (value === 'percentage') {
                    setSelectedAnnouncement(prevState => ({
                        ...prevState,
                        [name]: value,
                        price: null
                    }));
                } else {
                    setSelectedAnnouncement(prevState => ({
                        ...prevState,
                        [name]: value,
                        percentage: null
                    }));
                }
                break;
            default:
                setSelectedAnnouncement(prevState => ({
                    ...prevState,
                    [name]: value
                }));
        }
    }

    const isFormInvalid = () => {
        return !selectedAnnouncement.title || !selectedAnnouncement.description ||
            !selectedAnnouncement.startDate || !selectedAnnouncement.endDate || !selectedAnnouncement.userTypes?.length
    }

    return (
        <Fragment>
            <div>
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
                                                Total Announcements <span>{announcements.length}</span>
                                            </a> */}
                                            <div className="admin-table-total">
                                                <h5>
                                                    Total Announcements 
                                                </h5>
                                                <span>{announcements.length}</span>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <CSVLink data={[]} className="btn btn-success" filename="Announcement-List.csv" style={{ color: "white" }}>
                                                Export to CSV
                                            </CSVLink>
                                            {/* <button onClick={() => this.onClick()}>test</button> */}
                                        </li>
                                        <li className="divider"></li>
                                        {/* <li ><b>Filter</b></li>

                                        <li>
                                            <div className="col">
                                                <label className="row">Announcement Status</label>
                                                <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="form-control row">
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
                                    <div className="button-fab">
                                        <button type="button" className="btn btn-info"
                                            data-target="#exampleModal" data-toggle="modal" onClick={() => onClickAction('add')}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <Table
                                        loading={loading}
                                        error={errorTable}
                                        columns={columns}
                                        data={announcements}
                                        title={"Announcements"}
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

                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {modalAction === 'edit' ? 'Manage Announcement' : 'Add Announcement'}
                                </h5>
                                <button id="announcement-close-modal" type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=> onClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            {!!errorUpdate && <div className="alert alert-warning text-center text m-t-20"
                                style={{ fontSize: 10 }}>
                                <i class="fas fa-times float-right" style={{ cursor: 'pointer' }} onClick={() => setErrorUpdate(false)}></i>
                                <span className="font-weight-bold" style={{ fontSize: 12 }}>
                                    Something went wrong.
                                </span>
                                <br />
                                Please try again later.
                            </div>}
                            <div className="modal-body">
                                {/* <button class="btn btn-primary" type="submit">Submit form</button> */}
                                <form className="row" id="updateForm">
                                    <div className="col-12">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h6 className="modal-title" id="exampleModalLabel">Title<small style={{ color: 'red' }}>*</small></h6>
                                                <div className="form-group mb-3">
                                                    <input className="form-control" type="text" name="title"
                                                        onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                        defaultValue={selectedAnnouncement.title} required />
                                                    <div class="invalid-feedback">Please enter a message in the textarea.</div>
                                                </div>
                                                <h6 className="modal-title" id="exampleModalLabel">Description<small style={{ color: 'red' }}>*</small></h6>
                                                <div className="form-group mb-3">
                                                    <textarea className="form-control" name="description"
                                                        onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                        defaultValue={selectedAnnouncement.description} />
                                                </div>

                                                <h6 className="modal-title" id="exampleModalLabel">Type<small style={{ color: 'red' }}>*</small></h6>
                                                <div className="form-group mb-3">
                                                    <select className="form-control" name="type" onChange={(e) => onInputChange(e.target.name, e.target.value)} >
                                                        <option value="promo" selected={selectedAnnouncement.status === 'promo'}>Promo</option>
                                                        <option value="event" selected={selectedAnnouncement.status === 'event'}>Event</option>
                                                        <option value="info" selected={selectedAnnouncement.status === 'info'}>Info</option>
                                                        <option value="other" selected={selectedAnnouncement.status === 'other'}>Others</option>
                                                    </select>
                                                </div>

                                                <h6 className="modal-title" id="exampleModalLabel">Start Date<small style={{ color: 'red' }}>*</small></h6>
                                                <div className="form-group mb-3">
                                                    <input className="form-control" type="date" name="startDate" id="startDate" min={now}
                                                        onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                        defaultValue={selectedAnnouncement.startDate} />
                                                </div>
                                                {/* <div className="col">
                                                        <h6 className="modal-title" id="exampleModalLabel">Start Time<small style={{color: 'red'}}>*</small></h6>
                                                        <div className="form-group mb-3">
                                                            <input type="time" className="form-control" name="startTime" id="startTime"
                                                                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                                defaultValue={selectedAnnouncement.startTime}/>
                                                        </div>
                                                    </div> */}
                                                <div className="row">
                                                    <div className="col">
                                                        <h6 className="modal-title" id="exampleModalLabel">End Date<small style={{ color: 'red' }}>*</small></h6>
                                                        <input className="form-control" type="date" name="endDate" id="endDate" min={selectedAnnouncement.startDate}
                                                            onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                            defaultValue={selectedAnnouncement.endDate} />
                                                    </div>
                                                    {/* <div className="col">
                                                        <h6 className="modal-title" id="exampleModalLabel">End Time<small style={{color: 'red'}}>*</small></h6>
                                                        <div className="form-group mb-3">
                                                            <input type="time" className="form-control" name="endTime" id="endTime" min={selectedAnnouncement.endTime}
                                                                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                                defaultValue={selectedAnnouncement.endTime}/>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="row ml-1 mt-3">
                                                    <p>This Announcement is visible to:<small style={{ color: 'red' }}>*</small></p>
                                                </div>
                                                <div className="row ml-1 mt-3">
                                                    <div className="col">
                                                        <input type="checkbox" id="teacher" value="TEACHER"  onChange={e => {onClickCheckBox(e);}} checked = {isChecked("TEACHER")}/>

                                                        <label for="teacher">Teachers</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="checkbox" id="learner" value="LEARNER" onChange={e => {onClickCheckBox(e);}} checked = {isChecked("LEARNER")}/>
                                                        <label for="learner">Learners</label>
                                                    </div>
                                                    <div className="col">
                                                        <input type="checkbox" id="leader" value="SCHOOL_LEADER" onChange={e => {onClickCheckBox(e);}} checked = {isChecked("SCHOOL_LEADER")}/>
                                                        <label for="leader">School Leaders</label>
                                                    </div>
                                                </div>
                                                {modalAction === 'edit' && <div>
                                                    <h6 className="modal-title" id="exampleModalLabel">Status<small style={{ color: 'red' }}>*</small></h6>
                                                    <div className="form-group mb-3">
                                                        <select className="form-control" name="status" onChange={(e) => onInputChange(e.target.name, e.target.value)} >
                                                            <option value="A" selected={selectedAnnouncement.status === 'A'}>Active</option>
                                                            <option value="I" selected={selectedAnnouncement.status === 'I'}>Inactive</option>
                                                        </select>
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button id="modal-close" type="button" className="btn btn-secondary" onClick={() => onClose()} data-dismiss="modal">Cancel</button>
                                <button type="button" style={{ cursor: (submitLoading) && 'not-allowed' }} className="btn btn-primary" onClick={handleSubmit}
                                    disabled={submitLoading || isFormInvalid()}>
                                    <span style={{ display: submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}