import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import './index.css';
import { getAllModulePermission, updateModulePermission } from "api/admin";
import Tagpi from "components/common/Tagpi";

export default function Configurations() {
    const dispatch = useDispatch();
    const [errorTable, setErrorTable] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [permissions, setPermissions] = useState({});
    const [isChanged, setIsChanged] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));
    const originalPermissions= useSelector((state) => (state.auth.permissions ? state.auth.permissions : {}));
    const AccessPermissions = useSelector(state =>
        state.admin.permissions ? state.admin.permissions : {}
      );

    const loadData = () => {
        getAllModulePermission(dispatch, (status, data) => {
            if(status){
                setErrorTable(false);
                setPermissions(data);
            }else{
                setErrorTable(true);
            }
        });
        setErrorTable(false);
        setIsChanged(false);
    }

    const getAccessIcon = (accessType) => {
        switch(accessType){
            case 'readwrite': return <i className="fas fa-check-circle mr-1" style={{color: 'green'}}></i>;
            case 'read': return <i className="fas fa-exclamation-circle mr-1" style={{color: 'orange'}}></i>;
            case 'noaccess': return <i className="fas fa-minus-circle mr-1" style={{color: 'red'}}></i>;
            default: return <i className="fas fa-minus-circle mr-1" style={{color: 'red'}}></i>;
        }
    }

    const handleChangePermission = (userCode, moduleCode, accessType) => {
        if(originalPermissions.access[userCode][moduleCode] !== accessType 
            || originalPermissions.access[userCode][moduleCode] !== permissions.access[userCode][moduleCode]){
            setPermissions(prevState => ({
                ...prevState,
                access: {
                    ...prevState.access,
                    [userCode]: {
                        ...prevState.access[userCode],
                        [moduleCode]: accessType
                    }
                }
            }));
            setIsChanged(true);
        }
    }

    const handleResetPermissions = () => {
        setPermissions(prevState => ({
            ...prevState,
            access: originalPermissions.access
        }));
        setIsChanged(false);
    }

    const handleSavePermissions = async () => {
        const changes = {};
        const adminUsers = Object.keys(originalPermissions.access);
        const modules = originalPermissions.modules.map(item => item.CODE);
        adminUsers.forEach((userGroup) => {
            modules.forEach((moduleCode) => {
                if(originalPermissions.access[userGroup][moduleCode] !== permissions.access[userGroup][moduleCode]){
                    if(!changes[userGroup]) changes[userGroup] = {};

                    changes[userGroup][moduleCode] = permissions.access[userGroup][moduleCode];
                }
            });
        });

        if(Object.keys(changes) < 1){
            toast.info("No changes has been made on the configuration.", { autoClose: 900 });
            setIsEditing(false);
        }else{
            setSubmitLoading(true);
            await toast.promise(
                updateModulePermission(dispatch, {permissions: changes}, (status) => {
                    if(status){
                        setIsEditing(false);
                        loadData();
                    }
                    setSubmitLoading(false);
                }),
            {
              success: 'Configurations has been successfully updated.',
              pending: 'Please wait while your changes are being saved...',
              error: 'Uh Oh! There was an error saving your changes. Please try again.'
            },
            { position: toast.POSITION.TOP_RIGHT, autoClose: 900 })
        }
    }

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <div id="configurations">
                <div className="row">
                    <div className="col-12">
                        {loading && <Tagpi type="loading" dataName="Configurations" showSpinner={true}/>}
                        {(!loading && errorTable) && <Tagpi type="505" dataName="Configurations" reload={loadData}/>}
                        {(!loading && !errorTable && Object.keys(permissions).length < 1) && <Tagpi type="noData" dataName="Configurations"/>}
                        {(!loading && !errorTable && Object.keys(permissions).length > 0) && <div className="card">
                            {/* <!-- .left-right-aside-column--> */}
                            <div className="row">
                                {/* <!-- /.left-aside-column--> */}
                                <div className="right-aside col">
                                    <div className="mt-4" id="access">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <fieldset className="fieldset-border mb-2" style={{fontSize: '12px'}}>
                                                <legend className="fieldset-border"><b>Legend</b></legend>
                                                <span className="mr-4">
                                                    <i className="fas fa-check-circle mr-1" style={{color: 'green'}}></i>
                                                    View and Manage
                                                </span>
                                                <span className="mr-4">
                                                    <i className="fas fa-exclamation-circle mr-1" style={{color: 'orange'}}></i>
                                                    View Only
                                                </span>
                                                <span>
                                                    <i className="fas fa-minus-circle mr-1" style={{color: 'red'}}></i>
                                                    No Access
                                                </span>
                                            </fieldset>
                                            {
                                                AccessPermissions.Configuration === "readwrite" ?
                                                <div>
                                                {isEditing && <button className="btn btn-danger mr-2" onClick={handleResetPermissions} disabled={!isChanged || submitLoading}><span className="pl-2 pr-2">Reset Changes</span></button>}
                                                {isEditing && <button className="btn btn-info" onClick={handleSavePermissions} disabled={submitLoading}><span className="pl-5 pr-5">Save</span></button>}
                                                {!isEditing && <button className="btn btn-info" onClick={() => setIsEditing(true)}><span className="pl-5 pr-5">Edit</span></button>}
                                                </div> : ''
                                            }
                                        </div>

                                        {/* Access Table */}
                                        <div className="table-responsive">
                                            <table className="table table-sm table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" style={{color: 'black'}}>Team/Features</th>
                                                        {permissions.userGroup.map((item) => <th scope="col" style={{width: `${75/permissions.userGroup.length}%`}}>{item.shortName}</th>)}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {permissions.modules.map((feature) => (<tr>
                                                        <th scope="row">{feature.DESCRIPTION}</th>
                                                        {permissions.userGroup.map((userGroup) => (
                                                            <td class="access-value">
                                                                {!isEditing && <div>
                                                                    {permissions.access[userGroup.code] ? (
                                                                        permissions.access[userGroup.code][feature.CODE] ?
                                                                        getAccessIcon(permissions.access[userGroup.code][feature.CODE]) : <i className="fas fa-minus-circle mr-1" style={{color: 'red'}}></i>
                                                                    ) : <i className="fas fa-minus-circle mr-1" style={{color: 'red'}}></i>}
                                                                    
                                                                </div>}
                                                                {isEditing && <div class="dropdown">
                                                                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={userGroup.code==='ADMCURATOR' || userGroup.code==='ADMSA'}>
                                                                        {permissions.access[userGroup.code] ? (
                                                                            permissions.access[userGroup.code][feature.CODE] ?
                                                                            getAccessIcon(permissions.access[userGroup.code][feature.CODE]) : <i className="fas fa-minus-circle mr-1" style={{color: 'red'}}></i>
                                                                        ) : <i className="fas fa-minus-circle mr-1" style={{color: 'red'}}></i>}
                                                                    </button>
                                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                        <span className={`dropdown-item ${permissions.access[userGroup.code][feature.CODE] === 'readwrite' ? 'active': ''}`} 
                                                                            role="button" data-toggle="tooltip" title="View and Manage"
                                                                            onClick={() => handleChangePermission(userGroup.code, feature.CODE, 'readwrite')}>
                                                                            View and Manage
                                                                        </span>
                                                                        <span className={`dropdown-item ${permissions.access[userGroup.code][feature.CODE] === 'read' ? 'active': ''}`} 
                                                                            role="button" data-toggle="tooltip" title="View Only" 
                                                                            onClick={() => handleChangePermission(userGroup.code, feature.CODE, 'read')}>
                                                                            View Only
                                                                        </span>
                                                                        <span className={`dropdown-item ${permissions.access[userGroup.code][feature.CODE] === 'noaccess' ? 'active': ''}`} 
                                                                            role="button" data-toggle="tooltip" title="No Access"
                                                                            onClick={() => handleChangePermission(userGroup.code, feature.CODE, 'noaccess')}>
                                                                            No Access
                                                                        </span>
                                                                    </div>
                                                                </div>}
                                                            </td>
                                                        ))}
                                                    </tr>))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}