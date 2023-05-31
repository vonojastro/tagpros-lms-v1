import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getTeacherApplication } from '../../../api/teacher';

export default function MyProfile() {
    const dispatch = useDispatch();
    const { aboutMe, type } = useSelector((state) => state.auth.user);
    const teacher = useSelector((state) => state.teacher.getIn(['applications', 'application']) ? state.teacher.getIn(['applications', 'application']) : {});
    const { classcount, learnercount, rating, subjects } = teacher;

    // const subjects = [
    //     { subject: "Mathematics" },
    //     { subject: "Science" },
    //     { subject: "Music" },
    //     { subject: "Sports" },
    //     { subject: "Dance" },
    //     { subject: "English" },
    //     { subject: "Literature" },
    //     { subject: "Culture" },
    //     { subject: "Language" },
    //     { subject: "Social Studies" },
    //     { subject: "Engineering" },
    //     { subject: "Multimedia Productions" },
    //     { subject: "Digital Technology" },
    //     { subject: "Visual Arts" },
    //     { subject: "Theater" },
    //     { subject: "Filipino" },
    // ];

    // const skills = [
    //     { skill: "Word Press", percentage: 80 },
    //     { skill: "HTML 5", percentage: 90 },
    //     { skill: "jQuery", percentage: 50 },
    //     { skill: "Photoshop", percentage: 70 },
    // ];

    React.useEffect(() => {
        getTeacherApplication(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="card-body">
            { type === 'teacher' && <div className="row">
                <div className="col-lg-4 col-md-12">
                    <div className="card shadow-none">
                        <div className="card-body">
                            {/* Row */}
                            <div className="row">
                                <div className="col-8"><h2>{classcount || 0} <i className="ti-angle-down font-14 text-danger" /></h2>
                                    <h6>My Classes This Month</h6></div>
                                <div className="col-4 align-self-center text-right  p-l-0">
                                    <div id="sparklinedash3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Column */}
                <div className="col-lg-4 col-md-12">
                    <div className="card shadow-none">
                        <div className="card-body">
                            {/* Row */}
                            <div className="row">
                                <div className="col-8"><h2 className>{learnercount || 0} <i className="ti-angle-up font-14 text-success" /></h2>
                                    <h6>My Students This Month</h6></div>
                                <div className="col-4 align-self-center text-right p-l-0">
                                    <div id="sparklinedash" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Column */}
                <div className="col-lg-4 col-md-12">
                    <div className="card shadow-none">
                        <div className="card-body">
                            {/* Row */}
                            <div className="row">
                                <div className="col-8"><h2>{rating || 0} <i className="fa fa-star mr-1" /><i className="ti-angle-down font-14 text-danger" /></h2>
                                    <h6>Overall Rating</h6></div>
                                <div className="col-4 align-self-center text-right p-l-0">
                                    <div id="sparklinedash4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <h4 className="font-medium">About Me</h4>
            <hr />
            <p className="m-t-30">{aboutMe}</p>
            
            {type === 'teacher' && <div>
                <h4 className="font-medium m-t-30">I teach the following subjects</h4>
                <hr />
                <div className="container-fluid">
                    {(!subjects || (!!subjects && subjects.length === 0) )&& <i>No class has added yet</i>}
                    {(!!subjects && subjects.length > 0) && <div className="row button-group m-t-40">
                        {subjects.map(({ description }) => (
                            <div className="mr-2">
                                <button type="button" className="btn btn-rounded btn-block btn-outline-info">{description}</button>
                            </div>
                        ))}
                    </div>}
                </div>
            </div>}
            {/* <h4 className="font-medium m-t-30">Skill Set</h4>
            <hr />
            {skills.map(({ skill, percentage }) => (
                <div>
                    <h5 className="m-t-30">{skill} <span className="pull-right">{percentage}{"%"}</span></h5>
                    <div className="progress">
                        <div className="progress-bar bg-success" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} style={{ width: percentage + '%', height: '6px' }}> <span className="sr-only">50% Complete</span> </div>
                    </div>
                </div>
            ))} */}
        </div>
    );
}