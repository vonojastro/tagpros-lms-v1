import { getNotifications } from "api/notification";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

export default function Notifications() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const notifications = useSelector((state) => state.notification ? state.notification.getIn(['data', 'notifications']) : []);
    const {type } = useSelector((state) => state.auth.user);

    React.useEffect(() => {
        getNotifications(dispatch, (status, data) => {
            console.log(status);
        });

        console.log(type.toUpperCase)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col-md-10 p-20">
                    <div className="card">
                        <div className="card-body">
                            {/* <h4 className="card-title">
                                Notifications
                            </h4> */}
                            {(notifications && (notifications.new || notifications.prev) && (notifications.new.filter(item=> item.userTypes.includes(type.toUpperCase()))?.length || notifications.prev.filter(item=> item.userTypes.includes(type.toUpperCase()))?.length)) ?
                                <div>
                                    <hr />
                                    {notifications && notifications.new && notifications.new.filter(item=> item.userTypes.includes(type.toUpperCase())).map((item) => (
                                       
                                        <div>
                                            <div className="d-flex flex-row" style={{ backgroundColor: '#eef5f9' }}>

                                                <div className="btn btn-danger btn-circle">
                                                    <i className="fa fa-link"></i>
                                                </div>
                                                <div className="pl-2">
                                                    <h5>{item.title}</h5>{" "}
                                                    <p><small>{item.content}</small></p>{" "}
                                                    <small className="text-muted">{item.startDate}</small>{" "}
                                                </div>

                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                    {notifications && notifications.prev && notifications.prev.filter(item=> item.userTypes.includes(type.toUpperCase())).map((item) => (
                                        <div>
                                            <div className="d-flex flex-row">
                                                <div className="btn btn-danger btn-circle">
                                                    <i className="fa fa-link"></i>
                                                </div>
                                                <div className="mail-contnet pl-2">
                                                    <h5>{item.title}</h5>{" "}
                                                    <p><small>{item.content}</small></p>{" "}
                                                    <small className="text-muted">{item.startDate}</small>{" "}
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className="p-3">No notifications.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
