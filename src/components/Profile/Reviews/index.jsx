import React from "react";

export default function Reviews() {
    const reviews = [
        { name: "James Anderson", date: "April 14, 2021", message: "Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.", thumbnail: "./assets/images/users/1.jpg", status: "Pending"},
        { name: "Michael Jorden", date: "April 14, 2021", message: "Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.", thumbnail: "./assets/images/users/2.jpg", status: "Approved"},
        { name: "Johnathan Doeting", date: "April 14, 2021", message: "Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.", thumbnail: "./assets/images/users/3.jpg", status: "Rejected"},
        { name: "James Anderson", date: "April 14, 2021", message: "Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.", thumbnail: "./assets/images/users/4.jpg", status: "Pending"},
    ];

    return (
        <div className="card-body">
            <div className="card shadow-none">
                <div className="card-body">
                    <h4 className="card-title">Recent Reviews</h4>
                </div>
                {/* ============================================================== */}
                {/* Comment widgets */}
                {/* ============================================================== */}
                <div className="comment-widgets m-b-20">
                    {reviews.map(({ name, date, message, thumbnail, status }) => (
                        <div className="d-flex flex-row comment-row">
                            <div className="p-2"><span className="round"><img src={thumbnail} alt="user" width={50} /></span></div>
                            <div className="comment-text w-100">
                                <h5>{name}</h5>
                                <div className="comment-footer">
                                    <span className="date">{date}{" "}</span>
                                    <span className="label label-info">{status}</span><span className="action-icons">
                                        <a href="#/"><i className="mdi mdi-pencil-circle" /></a>
                                        <a href="#/"><i className="mdi mdi-checkbox-marked-circle" /></a>
                                        <a href="#/"><i className="mdi mdi-heart" /></a>
                                    </span>
                                </div>
                                <p className="m-b-5 m-t-10">{message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}