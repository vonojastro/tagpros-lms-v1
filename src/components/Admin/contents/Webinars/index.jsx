import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from "react-redux";
import { saveWebinar, updateWebinar } from "api/webinar";
import { getWebinars } from "api/webinar";

// import moment from "moment";
import { toast } from 'react-toastify';

import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from "dayjs";

const initialValue = {
    title: "",
    description: "",
    youtubeLink: "",
    evaluationLink: "",
    startDate: null,
    status: "A",
}

export default function Webinars() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(LocalizedFormat);

    const dispatch = useDispatch();
    const now = dayjs(new Date()).format('YYYY-MM-DD');
    const [modalAction, setModalAction] = useState("");
    // const [filterValue, setFilterValue] = useState("");
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    const [selectedWebinar, setSelectedWebinar] = useState(initialValue);
    const [submitLoading, setSubmitLoading] = useState(false);
    const webinars = useSelector((state) => state.webinar ? state.webinar.getIn(['data', 'webinar']) : []);

    const loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));

    const loadData = () => {
        setErrorTable(false);

        getWebinars(dispatch, (status, data) => {
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
    const columns = [
        {
            Header: "Webinars",
            columns: [
                {
                    Header: 'Title',
                    accessor: 'title',
                    accessorFilter: 'Title',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Description',
                    accessor: 'description',
                    accessorFilter: 'description',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Start Date',
                    accessorFilter: 'Start_Date',
                    filterType: 'sortOnly',
                    columnFilter: true,
                    accessor: d => dayjs(dayjs.tz(`${d.startDate}`, 'Asia/Manila').format()).tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Manila').format("YYYY/MM/DD HH:mm"),
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                    accessorFilter: 'status',
                    filterType: 'multipleSelectGetValue',
                    getValueType: 'WebinarsStatus',
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

    const onClickAction = (action, index) => {
        document.getElementById("updateForm").reset();
        setModalAction(action);
        if (action === 'edit') {
            setSelectedWebinar({
                ...webinars[index],
                startDate: dayjs(webinars[index].startDate).format("YYYY-MM-DD"),
                startTime: dayjs(webinars[index].startDate).format("HH:mm"),
                // startTime: moment(webinars[index].startDate).format("HH:mm"),
                // endTime: moment(webinars[index].endDate).format("HH:mm")
            });

        } else {
            setSelectedWebinar({ ...initialValue });
        }
    }

    const onClose = (reload) => {
        document.getElementById("updateForm").reset();
        document.getElementById("modal-close").click()

        setSelectedWebinar({ ...initialValue });
        setErrorUpdate(false);

        if (reload) {
            loadData();
        }
    }

    const handleSubmit = async () => {
        setSubmitLoading(true);

        console.log("wibinar")
        console.log(selectedWebinar)

        const webinar = {
            ...selectedWebinar,
            // startDate: moment(`${selectedWebinar.startDate} ${selectedWebinar.startTime}:00`, 'YYYY-MM-DD HH:mm:ss').format(), //combineDateAndTime(selectedWebinar.startDate, selectedWebinar.startTime),
            // endDate: moment(`${selectedWebinar.enDate} ${selectedWebinar.endTime}:00`, 'YYYY-MM-DD HH:mm:ss').format(), //combineDateAndTime(selectedWebinar.startDate, selectedWebinar.startTime),
            startDate: dayjs(`${selectedWebinar.startDate + " " + selectedWebinar.startTime}`, 'YYYY-MM-DD HH:mm').format(),
        }

        if (modalAction === 'edit') {
            await updateWebinar(dispatch, webinar, status => {
                if (status) {
                    toast.success('Webinar has been successfully saved.');
                    onClose(true);
                } else {
                    setErrorUpdate(true);
                }
            });
            setSubmitLoading(false);
        } else {
            await saveWebinar(dispatch, webinar, status => {
                if (status) {
                    toast.success('Webinar has been successfully saved.');
                    onClose(true);
                } else {
                    setErrorUpdate(true);
                }
            });
            setSubmitLoading(false);
        }
    }

    const onInputChange = (name, value) => {
        // switch (name) {
        //     case 'type':
        //         if (value === 'percentage') {
        //             setSelectedWebinar(prevState => ({
        //                 ...prevState,
        //                 [name]: value,
        //                 price: undefined
        //             }));
        //         } else {
        //             setSelectedWebinar(prevState => ({
        //                 ...prevState,
        //                 [name]: value,
        //                 percentage: undefined
        //             }));
        //         }
        //         break;
        //     default:
                setSelectedWebinar(prevState => ({
                    ...prevState,
                    [name]: value
                }));
        // }
    }

    const isFormInvalid = () => {
        return !selectedWebinar.title || !selectedWebinar.youtubeLink ||
            !selectedWebinar.description || !selectedWebinar.startDate || !selectedWebinar.status

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
                                            <a href="#!">
                                                Total Webinars <span>{webinars.length}</span>
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <CSVLink data={[]} className="btn btn-success" filename="Webinar-List.csv" style={{ color: "white" }}>
                                                Export to CSV
                                            </CSVLink>
                                            {/* <button onClick={() => this.onClick()}>test</button> */}
                                        </li>
                                        <li className="divider"></li>
                                        {/* <li ><b>Filter</b></li>

                                        <li>
                                            <div className="col">
                                                <label className="row">Webinar Status</label>
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
                                        data={webinars}
                                        title={"Webinars"}
                                        // filterColumn={'status'}
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

                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {modalAction === 'edit' ? 'Manage Webinar' : 'Add Webinar'}
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                                                        defaultValue={selectedWebinar.title} required />
                                                    <div class="invalid-feedback">Please enter a message in the textarea.</div>
                                                </div>
                                                <h6 className="modal-title" id="exampleModalLabel">Description<small style={{ color: 'red' }}>*</small></h6>
                                                <div className="form-group mb-3">
                                                    <textarea rows="5" className="form-control" type="text" name="description"
                                                        onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                        defaultValue={selectedWebinar.description} />
                                                </div>
                                                <h6 className="modal-title" id="exampleModalLabel">Youtube Link<small style={{ color: 'red' }}>*</small></h6>
                                                <div className="form-group mb-3">
                                                    <input className="form-control" type="text" name="youtubeLink"
                                                        onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                        defaultValue={selectedWebinar.youtubeLink} />
                                                </div>
                                                <h6 className="modal-title" id="exampleModalLabel">Evaluation Form Link</h6>
                                                <div className="form-group mb-3">
                                                    <input className="form-control" type="text" name="evaluationLink"
                                                        onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                        defaultValue={selectedWebinar.evaluationLink} />
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <h6 className="modal-title" id="exampleModalLabel">Start Date<small style={{ color: 'red' }}>*</small></h6>
                                                        <input className="form-control" type="date" name="startDate" id="startDate" min={now}
                                                            onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                            defaultValue={selectedWebinar.startDate} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <h6 className="modal-title" id="exampleModalLabel">Start Time<small style={{ color: 'red' }}>*</small></h6>
                                                        <input className="form-control" type="time" name="startTime" id="startTime" min={now}
                                                            onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                            defaultValue={selectedWebinar.startTime} />
                                                    </div>
                                                </div>
                                                <h6 className="modal-title" id="exampleModalLabel">Status<small style={{ color: 'red' }}>*</small></h6>
                                                <div className="form-group mb-3">
                                                    <select className="form-control" name="status" onChange={(e) => onInputChange(e.target.name, e.target.value)} >
                                                        <option value="A" selected={selectedWebinar.status === 'A'}>Active</option>
                                                        <option value="I" selected={selectedWebinar.status === 'I'}>Inactive</option>
                                                    </select>
                                                </div>
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