import React, { Fragment, Component } from "react";
import Table from "../../Table";
import Export from "../../Export";
import { APPLICATION_STATUS } from "utils/constants";
import { toast } from 'react-toastify';
// import moment from 'moment';

class TeacherMasterlist extends Component {
    attachments = [ 
        {name: 'cvResume', desc: 'Curriculum Vitae/Resume'},
        {name: 'professionalLicense', desc: 'Professional License'}, 
        {name: 'govtId', desc: 'Government ID'}, 
        {name:'refRecommendation', desc: 'References/Recommendations'}
    ];
    initialStatus = null;
    
    state = {
        data: [],
        selectedTeacher: {},
        selectedIndex: null,
        remarks: '',
        status: 0,
        filterStatus: "",
        errorTable: false,
        submitLoading: false,
        errorUpdate: false,
        toggleSortFilter:{statusName: false},
    }
    setState = this.setState.bind(this)
    loadData = () => {
        this.setState({
            errorTable: false,
        });
        this.props.getAllTeachers((status) => {
            if (!status) {
                this.setState({
                    errorTable: true,
                });
            }
        });
        this.props.getEmailTemplates((status) => {
            if (!status) {
                this.setState({
                    errorTable: true,
                });
            }
        });
    }

    componentDidMount() {
        this.loadData();
    }

    onChangeDecision = (value) => {
        console.log(this.props.data.emailTemplates)
        const emailTemplates = this.props.data.emailTemplates;
        var template = {body : ""};
        switch (value) {
            case APPLICATION_STATUS.APPROVEDHR:
            case APPLICATION_STATUS.APPROVEDEDUC:
                template = emailTemplates.filter(email => email.code === 'M0005')[0];
                break;
            case APPLICATION_STATUS.RETURNED:
                template = emailTemplates.filter(email => email.code === 'M0007')[0];
                break;
            case APPLICATION_STATUS.REJECTED:
                template = emailTemplates.filter(email => email.code === 'M0006')[0];
                break;
            default:
                break;
        }
        this.setState({ remarks: template.description });
        this.setState({ status: value })
    }

    onClick = () => {
        this.props.getAllTeachers();
    }

    onClickEdit = (index) => {
        this.initialStatus = this.props.data.teachers[index].applicationStatus;
        this.setState({
            selectedTeacher: this.props.data.teachers[index],
            selectedIndex: index,
            status: this.props.data.teachers[index].applicationStatus,
            remarks: this.props.data.teachers[index].remarks
        });
    }

    onSubmitReview = () => {
        //if(submitLoading) return;

        this.setState({
            submitLoading: true,
        });
        this.props.submitTeacherReview({
            accountId: this.state.selectedTeacher.accountId,
            applicationStatus: this.state.status,
            remarks: this.state.remarks,
            index: this.state.selectedIndex
        }, (stat) => {
            if(stat){
                this.onClose(true);
                toast.success("Teacher Status has been successfully updated!");
            } else {
                this.setState({
                    errorUpdate: true,
                    submitLoading: false,
                });
            }
        });
    }

    onClose = (reload) => {
        document.getElementById("modal-close").click()
        this.setState({
            selectedTeacher: {},
            remarks: '',
            status: 0,
            errorUpdate: false,
            submitLoading: false,
        }, () => {
            if(reload){
                this.loadData();
            }
        });
    }

    getValue = (value) => {
        if(
            this.props.userType === 'admeduc' && value === APPLICATION_STATUS.PENDING
            ){
            return 'PENDING HR APPROVAL';
        }

        return Object.keys(APPLICATION_STATUS).find(key => APPLICATION_STATUS[key] === value);
    }

    getBadge = (key) => {
        switch (key) {
            case APPLICATION_STATUS.DRAFT:
                return "badge-info"
            case APPLICATION_STATUS.PENDING:
                return "badge-primary"
            case APPLICATION_STATUS.APPROVEDHR:
            case APPLICATION_STATUS.APPROVEDEDUC:
                return "badge-success"
            case APPLICATION_STATUS.REJECTED:
                return "badge-danger"
            case APPLICATION_STATUS.RETURNED:
            case APPLICATION_STATUS.DELETE:
                return "badge-warning"
            case APPLICATION_STATUS.CANCELLED:
                return "badge-secondary"
            default:
                return "badge-primary"
        }
    }
    getBadgeWithName = (key) => {
        switch (key) {
            case 'DRAFT':
                return "badge-info"
            case 'PENDING':
                return "badge-primary"
            case 'APPROVEDHR':
            case 'APPROVEDEDUC':
                return "badge-success"
            case 'REJECTED':
                return "badge-danger"
            case 'RETURNED':
            case 'DELETE':
                return "badge-warning"
            case 'CANCELLED':
                return "badge-secondary"
            default:
                return "badge-primary"
        }
    }

    closeWarning = () => {
        this.setState({
            errorUpdate: false,
        });
    }

    // getDate = (value, format) =>{
    //     return moment.utc(value, 'YYYY/MM/DD - hh:mm A').tz(Intl.DateTimeFormat().resolvedOptions().timeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Manila').format(format);
    // }

    downloadFile = async (file) => {
        const url = `https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${file}`;
        const data = await fetch(url);
        const blob = await data.blob();

        const reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onload = e => {
          const tempLink = document.createElement('a');
          tempLink.style.display = 'none';
          tempLink.href = e.target.result;
          tempLink.download = file;
          tempLink.click();
        }
    }

    render() {
        let data = this.props.data.teachers && this.props.data.teachers.length > 0 ? this.props.data.teachers : [];
        let loading = this.props.loading;
        const columns = [
            {
                Header: "Teacher List",
                columns: [
                    {
                        Header: 'No.', accessor: 'accountid',
                        Cell: ({ row }) => (
                            <div>{row.index + 1}</div>
                        ),
                    },
                    { Header: 'Name', accessor: 'name',
                    accessorFilter: 'name',
                    filterType: 'sortOnlyClass',
                    columnFilter: true
                    },
                    { Header: 'Email', accessor: 'email', 
                    accessorFilter: 'email',
                    filterType: 'sortOnlyClass',
                    columnFilter: true
                    },
                    { Header: 'Application Date', accessor: 'createdDatetime',
                        //  Cell: row => (
                        //     <div>{this.getDate(row.value, 'YYYY/MM/DD - hh:mm A')}</div>
                        // )
                    accessorFilter: 'createdDatetime',
                    filterType: 'sortOnlyClass',
                    columnFilter: true
                    },
                    {
                        Header: 'Status', 
                        accessor: 'applicationStatus',
                        accessorFilter: 'applicationStatus',
                        // accessor: 'statusName',
                        // accessorFilter: 'statusName',
                        filterType: 'multipleSelectClassGetValue',
                        // filterType: 'multipleSelectClass',
                        columnFilter: true,
                        filter: multiSelectFilter,
                        // Cell: row => (
                        //     <div className={"badge " + this.getBadgeWithName(row.value)}>{row.value}</div>
                        // ),
                        Cell: row => (
                            <div className={"badge " + this.getBadge(row.value)}>{this.getValue(row.value)}</div>
                        ),
                    },
                    { Header: 'Final Result', accessor: 'finalResult',
                    accessorFilter: 'finalResult',
                    filterType: 'sortOnlyClass',
                    columnFilter: true
                    },
                    { Header: 'Update', accessor: 'updatedDatetime',
                        // Cell: row => (
                        //     <div>{this.getDate(row.value, 'YYYY/MM/DD - hh:mm A')}</div>
                        // )
                    accessorFilter: 'updatedDatetime',
                    filterType: 'sortOnlyClass',
                    columnFilter: true
                    },
                    {
                        Header: 'Action', accessor: d => d.applicationStatus,
                        Cell: ({ row, value }) => (
                            <button
                                data-target="#teacherModal"
                                className="btn btn-link"
                                data-toggle="modal"
                                data-original-title="Edit"
                                onClick={() => this.onClickEdit(row.index)}
                                disabled={(this.props.userType === 'admeduc' 
                                    && [APPLICATION_STATUS.PENDING, APPLICATION_STATUS.REJECTEDHR, APPLICATION_STATUS.RETURNEDHR].indexOf(value) > -1) 
                                    || value === APPLICATION_STATUS.DRAFT ? true : false}
                            >   
                                <i className="ti-marker-alt"></i>
                            </button>
                        ),
                    },
                ],
            },
        ];
        function multiSelectFilter(rows, columnIds, filterValue) {
            return filterValue.length === 0
                ? rows
                : rows.filter((row) =>
                    filterValue.includes(String(row.original[columnIds])),
                );
        }
        return (
            <Fragment>
                {/* <!-- ============================================================== -->
            <!-- Bread crumb and right sidebar toggle -->
            <!-- ============================================================== --> */}
                {/* <!-- ============================================================== -->
            <!-- End Bread crumb and right sidebar toggle -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== --> */}
                
                <div className="container-fluid">
                    {/* <!-- ============================================================== -->
                <!-- Start Page Content -->
                <!-- ============================================================== --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                {/* <!-- .left-right-aside-column--> */}
                                <div className="row">
                                    {/* <!-- .left-aside-column--> */}
                                    { !this.props.source && <div className="left-aside bg-light-part col-3">
                                            <ul className="list-style-none">
                                                <li className="box-label">
                                                    {/* <a href="#!">
                                                        Total Teachers <span>{data.length}</span>
                                                    </a> */}
                                                    <div className="admin-table-total">
                                                        <h5>
                                                            Total Teachers 
                                                        </h5>
                                                        <span>{data.length}</span>
                                                    </div>
                                                </li>
                                                <li className="divider"></li>
                                                <li>
                                                    <Export source={"teacher"} dataSource={data}/>
                                                </li>
                                                <li className="divider"></li>
                                                {/* <li ><b>Filter</b></li>
                                                <li>
                                                    <div className="form-inline align-self-end">
                                                        <label className="pr-2">Status</label>
                                                        <select defaultValue={this.state.filterStatus} onChange={(event) => this.setState({ filterStatus: event.target.value })} className="form-control w-auto">
                                                            <option value="">All</option>
                                                            <option value={APPLICATION_STATUS.PENDING}>Pending</option>
                                                            <option value={APPLICATION_STATUS.APPROVEDHR}>Approve by HR</option>
                                                            <option value={APPLICATION_STATUS.APPROVEDEDUC}>Approve by EDUC</option>
                                                            <option value={APPLICATION_STATUS.RETURNED}>Return</option>
                                                            <option value={APPLICATION_STATUS.REJECTED}>Reject</option>
                                                        </select>
                                                    </div>
                                                </li>
                                                <li className="divider"></li> */}
                                        </ul>
                                    </div>
                                    }
                                    {/* <!-- /.left-aside-column--> */}
                                    <div className="right-aside col" style={{ 'margin-left': !!this.props.source ? '15px' : '0px', overflowY: "auto"}}>
                                        <Table
                                            loading={loading}
                                            error={this.state.errorTable}
                                            columns={columns}
                                            data={data}
                                            // data={dataWithStatusName}
                                            title={"Teacher List"}
                                            // filterColumn={'applicationStatus'}
                                            // filterValue={this.state.filterStatus}
                                            onReload={this.loadData} 
                                            toggleSortFilter={this.state.toggleSortFilter}
                                            setToggleSortFilter={this.setState}
                                            />
                                        {/* <!-- .left-aside-column--> */}
                                    </div>
                                    {/* <!-- /.left-right-aside-column--> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- ============================================================== -->
                <!-- End PAge Content -->
                <!-- ============================================================== -->*/}

                    {/* Modal */}
                    <div className="modal" id="teacherModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Manage Teacher</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.onClose()}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                {!!this.state.errorUpdate && <div className="alert alert-warning text-center text m-t-20" role="alert"
                                    style={{ fontSize: 10 }}>
                                    <i class="fas fa-times float-right" style={{ cursor: 'pointer' }} onClick={this.closeWarning}></i>
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
                                                    <img src={this.state.selectedTeacher.photo ? this.state.selectedTeacher.photo : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.delvinia.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fplaceholder-headshot.png&f=1&nofb=1"} className="card-img" alt="..." />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <small className="text-muted">Name </small>
                                                            <h6>{this.state.selectedTeacher.name}</h6>
                                                            <small className="text-muted">Email address </small>
                                                            <h6>{this.state.selectedTeacher.email}</h6>
                                                            <small className="text-muted p-t-10 db">Phone</small>
                                                            <h6>{this.state.selectedTeacher.contactNumber}</h6>
                                                            <small className="text-muted p-t-10 db">Application Date</small>
                                                            <h6>{this.state.selectedTeacher.createdDatetime}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    {/* Nav tabs */}
                                                    <ul className="nav nav-tabs profile-tab" role="tablist">
                                                        <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#video" role="tab">Intro Video</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#attachments" role="tab">Attachments</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#academic" role="tab">Academic</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#topic" role="tab">Topic</a> </li>
                                                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#description" role="tab">Description</a> </li>
                                                    </ul>
                                                    {/* Tab panes */}
                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="video" role="tabpanel">
                                                            <div className="card-body">
                                                                {(!this.state.selectedTeacher.classSampleVid
                                                                    || this.state.selectedTeacher.classSampleVid=== '{}') && <h3><i>No video uploaded</i></h3>}
                                                                {!(!this.state.selectedTeacher.classSampleVid
                                                                    || this.state.selectedTeacher.classSampleVid=== '{}') && <div className="embed-responsive embed-responsive-16by9">
                                                                    <iframe className="embed-responsive-item"
                                                                        src={`https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${this.state.selectedTeacher.classSampleVid}`}
                                                                        title="Test Video" allowFullScreen></iframe>
                                                                </div>}
                                                            </div>
                                                        </div>
                                                        {/*second tab*/}
                                                        <div className="tab-pane" id="attachments" role="tabpanel">
                                                            <div className="card-body">
                                                            <ul class="list-group">
                                                                {this.attachments.map((item, key) => 
                                                                    <li key={key} class="list-group-item d-flex justify-content-between align-items-center">
                                                                        <div>
                                                                            <h5 className="mb-1" style={{fontStyle: (!this.state.selectedTeacher[item.name] 
                                                                                    || this.state.selectedTeacher[item.name] === '{}') && 'italic'}}>
                                                                                {(!this.state.selectedTeacher[item.name] 
                                                                                    || this.state.selectedTeacher[item.name] === '{}') ? 
                                                                                    'No Attachment yet' : this.state.selectedTeacher[item.name]}
                                                                            </h5>
                                                                            <small style={{color: 'gray'}}>{item.desc}</small>
                                                                        </div>
                                                                        { !(!this.state.selectedTeacher[item.name] || this.state.selectedTeacher[item.name] === '{}') && 
                                                                        <div>
                                                                            <a className="btn btn-link" href={`https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${this.state.selectedTeacher[item.name]}`} target="_blank" rel="noreferrer">
                                                                                <i className="far fa-eye" aria-hidden="true"></i></a>
                                                                            <button className="btn btn-link" onClick={() => this.downloadFile(this.state.selectedTeacher[item.name])}>
                                                                                <i className="fas fa-download" aria-hidden="true"></i></button>
                                                                        </div> }
                                                                    </li>
                                                                )}
                                                            </ul>
                                                                {/* <a href={`https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${this.state.selectedTeacher.cvResume}`} target="_blank" rel="noreferrer"><i className="fa fa-file-o" aria-hidden="true"></i>CV / Resume</a>
                                                                <br /><a href={`https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${this.state.selectedTeacher.professionalLicense}`} target="_blank" rel="noreferrer"><i className="fa fa-file-o" aria-hidden="true"></i>Professional License</a>
                                                                <br /><a href={`https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${this.state.selectedTeacher.govtId}`} target="_blank" rel="noreferrer"><i className="fa fa-file-o" aria-hidden="true"></i> Government ID</a>
                                                                <br /><a href={`https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/${this.state.selectedTeacher.refRecommendation}`} target="_blank" rel="noreferrer"><i className="fa fa-file-o" aria-hidden="true"></i> References/ Recommendation</a> */}
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="academic" role="tabpanel">
                                                            <div className="card-body">
                                                                <p style={{whiteSpace: "pre-line"}}>{this.state.selectedTeacher.teacherAchievement}</p>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="topic" role="tabpanel">
                                                            <div className="card-body">
                                                                <p style={{whiteSpace: "pre-line"}}>{this.state.selectedTeacher.classTopics}</p>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="description" role="tabpanel">
                                                            <div className="card-body">
                                                                <p style={{whiteSpace: "pre-line"}}>{this.state.selectedTeacher.classDescription}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <h5 className="modal-title" id="exampleModalLabel">Decision</h5>

                                                    <div className="form-group">
                                                        <select value={this.state.status} onChange={(event) => this.onChangeDecision(event.target.value)} className="form-control">
                                                            <option value={APPLICATION_STATUS.PENDING}></option>
                                                            <option value={this.props.userType === 'admeduc' ? APPLICATION_STATUS.APPROVEDEDUC : APPLICATION_STATUS.APPROVEDHR}>Approve</option>
                                                            <option value={this.props.userType === 'admeduc' ? APPLICATION_STATUS.RETURNEDEDUC : APPLICATION_STATUS.RETURNEDHR}>Return</option>
                                                            <option value={this.props.userType === 'admeduc' ? APPLICATION_STATUS.REJECTEDEDUC : APPLICATION_STATUS.REJECTEDHR}>Reject</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <textarea defaultValue={this.state.remarks}
                                                            onChange={(event) => this.setState({ remarks: event.target.value })} className="form-control" rows="3" placeholder="Write your remarks here ..."></textarea>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button id="modal-close" type="button" className="btn btn-secondary" onClick={() => this.onClose()} data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary" style={{ cursor: this.state.submitLoading && 'not-allowed' }} onClick={() => this.onSubmitReview()} disabled={this.state.submitLoading || this.initialStatus === this.state.status}>
                                        <span style={{ display: this.state.submitLoading ? 'inline-block' : 'none' }} class="spinner-border spinner-border-sm btn-load" role="status" aria-hidden="true"></span>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== --> */}
                <footer className="footer">© 2021 Tagpros Education</footer>
                {/* <!-- ============================================================== -->
            <!-- End footer -->
            <!-- ============================================================== --> */}
            </Fragment>
        );
    }
};

export default TeacherMasterlist;