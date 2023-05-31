import React, { Fragment, useState } from "react";
import Table from "components/Admin/contents/Table";
import Export from "../Export";
import { useDispatch, useSelector } from "react-redux";
import { getDiscounts, saveDiscount, updateDiscount } from "api/discount";
import moment from "moment";
import { toast } from 'react-toastify';
import './index.css';

const initialValue = {
    name: "",
    code: "",
    type: "value",
    price: null,
    startDate: null,
    endDate: null,
    currency: "USD",
    limit: null,
    status: 'A',
}

export default function DiscountList() {
    const dispatch = useDispatch();
    const now = moment(new Date()).format('YYYY-MM-DD');
    const [modalAction, setModalAction] = useState("");
    // const [filterValue, setFilterValue] = useState("");
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [errorTable, setErrorTable] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState(initialValue);
    const [submitLoading, setSubmitLoading] = useState(false);
    const discounts = useSelector((state) => state.discount ? state.discount.getIn(['data', 'discounts']) : []);

    const loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));

    const loadData = () => {
        setErrorTable(false);

        getDiscounts(dispatch, (status, data) => {
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
    const columns = [
        {
            Header: "Discounts",
            columns: [
                {
                    Header: 'Name',
                    accessor: 'name',
                    accessorFilter: 'name',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Code',
                    accessor: 'code',
                    accessorFilter: 'code',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                {
                    Header: 'Type',
                    accessor: 'type',
                    accessorFilter: 'type',
                    filterType: 'multipleSelect',
                    columnFilter: true,
                    filter: multiSelectFilter,
                },
                {
                    Header: 'Value',
                    accessor: d => d.type === 'value' ? 
                        d.price.toLocaleString('en', { style: 'currency', currency: d.currency }) 
                        : `${d.percentage}%`,
                    accessorFilter: 'Value',
                    filterType: 'sortOnly',
                    columnFilter: true,
                },
                // {
                //     Header: 'Total Used',
                //     accessor: 'redemptions',
                // },
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
                    filterType: 'multipleSelectManageEmail',
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
                        <div style={{display: 'flex'}}>
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
        if(action === 'edit'){
            setSelectedDiscount({
                ...discounts[index],
                startDate: moment(discounts[index].startDate).format("YYYY-MM-DD"),
                endDate: moment(discounts[index].endDate).format("YYYY-MM-DD"),
                // startTime: moment(discounts[index].startDate).format("HH:mm"),
                // endTime: moment(discounts[index].endDate).format("HH:mm")
            });
        }else{
            setSelectedDiscount({...initialValue});
        }
    }

    const onClose = (reload) => {
        document.getElementById("updateForm").reset();
        document.getElementById("modal-close").click()

        setSelectedDiscount({...initialValue});
        setErrorUpdate(false);

        if(reload){
            loadData();
        }
    }

    const handleSubmit = async () => {
        setSubmitLoading(true);
        const newDiscount = Object.keys(selectedDiscount).reduce((disc, key) => ((selectedDiscount[key] === null ||  selectedDiscount[key] === "")? disc : {...disc, [key]: selectedDiscount[key]}), {})
        const discount = {
            ...newDiscount,
            // startDate: moment(`${selectedDiscount.startDate} ${selectedDiscount.startTime}:00`, 'YYYY-MM-DD HH:mm:ss').format(), //combineDateAndTime(selectedDiscount.startDate, selectedDiscount.startTime),
            // endDate: moment(`${selectedDiscount.enDate} ${selectedDiscount.endTime}:00`, 'YYYY-MM-DD HH:mm:ss').format(), //combineDateAndTime(selectedDiscount.startDate, selectedDiscount.startTime),
            startDate: moment(`${selectedDiscount.startDate} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').format(), 
            endDate: moment(`${selectedDiscount.endDate} 23:59:00`, 'YYYY-MM-DD HH:mm:ss').format(),
        }

        if(modalAction === 'edit'){
            await updateDiscount(dispatch, discount, status => {
                if(status){
                    toast.success('Discount has been successfully saved.');
                    onClose(true);
                }else{
                    setErrorUpdate(true);
                }
            });
            setSubmitLoading(false);
        }else{
            await saveDiscount(dispatch, discount, status => {
                if(status){
                    toast.success('Discount has been successfully saved.');
                    onClose(true);
                }else{
                    setErrorUpdate(true);
                }
            });
            setSubmitLoading(false);
        }
    }

    const onInputChange = (name, value) => {
        console.log('onInputChange', name, value);
        switch(name){
            case 'type': 
                if(value === 'percentage'){
                    setSelectedDiscount(prevState => ({
                        ...prevState,
                        [name]: value,
                        price: undefined
                    }));
                }else{
                    setSelectedDiscount(prevState => ({
                        ...prevState,
                        [name]: value,
                        percentage: undefined
                    }));
                }
                break;
            default:
                setSelectedDiscount(prevState => ({
                    ...prevState,
                    [name]: value
                }));
        }
    }

    const isFormInvalid = () => {
        if(selectedDiscount.type === 'value'){
            return !selectedDiscount.name || !selectedDiscount.code || 
                (!selectedDiscount.price || selectedDiscount.price < 1) 
                || !selectedDiscount.startDate || !selectedDiscount.endDate || !selectedDiscount.status
        }else{
            return !selectedDiscount.name || !selectedDiscount.code || 
                (!selectedDiscount.percentage || (selectedDiscount.percentage < 1 || selectedDiscount.percentage > 100))
                || !selectedDiscount.startDate || !selectedDiscount.endDate || !selectedDiscount.status
        }
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
                                                Total Discounts <span>{discounts.length}</span>
                                            </a> */}
                                            <div className="admin-table-total">
                                                <h5>
                                                    Total Discounts 
                                                </h5>
                                                <span>{discounts.length}</span>
                                            </div>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <Export source={"discount"} dataSource={discounts} />
                                        </li>
                                        <li className="divider"></li>
                                        {/* <li ><b>Filter</b></li>

                                        <li>
                                            <div className="col">
                                                <label className="row">Discount Status</label>
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
                                        data={discounts} 
                                        title={"Discounts"} 
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
                                    {modalAction === 'edit' ? 'Manage Discount' : 'Add Discount'}
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
                                                <h6 className="modal-title" id="exampleModalLabel">Discount Name<small style={{color: 'red'}}>*</small></h6>
                                                <div className="form-group mb-3">
                                                    <input className="form-control" type="text" name="name" 
                                                        onChange={(e) => onInputChange(e.target.name, e.target.value)} 
                                                        defaultValue={selectedDiscount.name} required/>
                                                    <div class="invalid-feedback">Please enter a message in the textarea.</div>
                                                </div>
                                                <h6 className="modal-title" id="exampleModalLabel">Discount Code<small style={{color: 'red'}}>*</small></h6>
                                                <div className="form-group mb-3">
                                                    <input className="form-control" type="text" name="code" 
                                                        onChange={(e) => onInputChange(e.target.name, e.target.value)} 
                                                        defaultValue={selectedDiscount.code} disabled={modalAction === 'edit'}/>
                                                    {modalAction === 'add' && <small>Please make sure that the discount code is correct. You cannot edit this code after saving.</small>}
                                                </div>
                                                <h6 className="modal-title" id="exampleModalLabel">Type<small style={{color: 'red'}}>*</small></h6>
                                                <div className="form-group mb-3">
                                                    <select className="form-control" name="type" onChange={(e) => onInputChange(e.target.name, e.target.value)} >
                                                        <option value="value" selected={selectedDiscount.type === 'value'}>Value</option>
                                                        <option value="percentage" selected={selectedDiscount.type === 'percentage'}>Percentage</option>
                                                    </select>
                                                </div>
                                                {selectedDiscount.type === 'value' && <div>
                                                    <h6 className="modal-title" id="exampleModalLabel">Amount<small style={{color: 'red'}}>*</small></h6>
                                                    <div className="form-group mb-3">
                                                        <input type="number" className="form-control" name="price" min="1"
                                                            onChange={(e) => onInputChange(e.target.name, e.target.value)} 
                                                            defaultValue={selectedDiscount.price}/>
                                                        {(selectedDiscount.price != null && selectedDiscount.price < 1) && <small style={{color: 'red'}}>Amount should be greater than 0</small>}
                                                    </div>
                                                </div> }
                                                {selectedDiscount.type === 'percentage' && <div>
                                                    <h6 className="modal-title" id="exampleModalLabel">Percentage<small style={{color: 'red'}}>*</small></h6>
                                                    <div className="form-group mb-3">
                                                        <input type="number" className="form-control" name="percentage" min="1" max="100"
                                                            onChange={(e) => onInputChange(e.target.name, e.target.value)} 
                                                            defaultValue={selectedDiscount.percentage}/>
                                                        {(selectedDiscount.percentage != null && selectedDiscount.percentage > 100) && <small style={{color: 'red'}}>Percentage should not exceed 100</small>}
                                                        {(selectedDiscount.percentage != null && selectedDiscount.percentage < 1) && <small style={{color: 'red'}}>Percentage should be greater than 0</small>}
                                                    </div>
                                                </div>}
                                                <div className="row">
                                                    <div className="col">
                                                        <h6 className="modal-title" id="exampleModalLabel">Start Date<small style={{color: 'red'}}>*</small></h6>
                                                        <input className="form-control" type="date" name="startDate" id="startDate" min={now}
                                                            onChange={(e) => onInputChange(e.target.name, e.target.value)} 
                                                            defaultValue={selectedDiscount.startDate}/>
                                                    </div>
                                                    {/* <div className="col">
                                                        <h6 className="modal-title" id="exampleModalLabel">Start Time<small style={{color: 'red'}}>*</small></h6>
                                                        <div className="form-group mb-3">
                                                            <input type="time" className="form-control" name="startTime" id="startTime"
                                                                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                                defaultValue={selectedDiscount.startTime}/>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <h6 className="modal-title" id="exampleModalLabel">End Date<small style={{color: 'red'}}>*</small></h6>
                                                        <input className="form-control" type="date" name="endDate" id="endDate" min={selectedDiscount.startDate}
                                                            onChange={(e) => onInputChange(e.target.name, e.target.value)} 
                                                            defaultValue={selectedDiscount.endDate}/>
                                                    </div>
                                                    {/* <div className="col">
                                                        <h6 className="modal-title" id="exampleModalLabel">End Time<small style={{color: 'red'}}>*</small></h6>
                                                        <div className="form-group mb-3">
                                                            <input type="time" className="form-control" name="endTime" id="endTime" min={selectedDiscount.endTime}
                                                                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                                                defaultValue={selectedDiscount.endTime}/>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                {modalAction === 'edit' && <div>
                                                    <h6 className="modal-title" id="exampleModalLabel">Status<small style={{color: 'red'}}>*</small></h6>
                                                    <div className="form-group mb-3">
                                                        <select className="form-control" name="status" onChange={(e) => onInputChange(e.target.name, e.target.value)} >
                                                            <option value="A" selected={selectedDiscount.status === 'A'}>Active</option>
                                                            <option value="I" selected={selectedDiscount.status === 'I'}>Inactive</option>
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