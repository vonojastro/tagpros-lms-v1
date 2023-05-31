import React from "react";

export default function StudentList({students, row}) {
    return(<div className="expand-body" style={{padding: '10px'}}>
            <div className="row">
                <div className="card col">
                    <div className="card-body">
                        <div className="row header pt-0" style={{backgroundImage: 'none'}}>
                            <h5>Student List</h5>
                        </div>
                        <div className="history">
                            {!students[row.index] && <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="loading-text">Loading students ...</div>
                            </div>}
                            { (students[row.index] && students[row.index].length < 1) && 
                                <i>No students are enrolled to this class</i> }
                            { (!!students[row.index] && students[row.index].length > 0) &&
                                <table style={{width: '100%'}}>
                                    <thead>
                                        <th>Photo</th>
                                        <th>Name</th>
                                        <th>Account Type</th>
                                        <th>Guardian</th>
                                    </thead>
                                    <tbody>
                                        {students[row.index].map(item => <tr>
                                            <td>
                                                <img
                                                    src={item.photo ? item.photo: "./assets/images/anonymous.png"}
                                                    alt="user"
                                                    height={25}
                                                    width={25}
                                                    style={{objectFit: 'cover'}}
                                                    className="profile-pic"
                                                    />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>
                                                <div className={`badge ${item.accountType === 'family' ? 'badge-info':'badge-primary'}`}>{item.accountType}</div>
                                            </td>
                                            <td>{item.guardian || 'n/a'}</td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}