import React from "react";
import { useDispatch } from "react-redux";
import { updateTeacherAppData } from "../../../redux/actions/teacherApp";
import { toggleCheckBoxState } from "../../../utils/teacherApplication";
import { useNavigate } from "react-router-dom";
import { fetchTeacherApp } from "../../../redux/actions/teacherApp";

export default function TeacherApplicationStep0() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="row">
      <div className="col-md-8">
        <h2 className="card-title">
          Thank you for applying to become a Tagpros Teacher!
        </h2>
        <h6 className="card-subtitle mb-2 text-muted">
          We'd love to have you onboard! Let's get to know each other a bit better.
        </h6>
        <div className="dropdown-divider"></div>
        <p className="card-text m-t-20">
          <b>Hello Teacher!</b> Thank you so much for expressing interest in becoming a
          Tagpros Certified Educator. Before we begin the application process, please read
          the following:
        </p>

        <h5 className="m-t-40">1. Requirements</h5>
        <p className="card-text">
          To become a Tagpros Certified Partner Teacher, you must be:
        </p>
        <ul className="list-unstyled">
          <li>
            <i className="fa fa-check"></i> A college graduate or higher;
          </li>
          <li>
            <i className="fa fa-check"></i> If you don’t have an undergraduate degree, you
            must be an expert in your discipline or industry with stellar work portfolio;
          </li>
          <li>
            <i className="fa fa-check"></i> Able to provide a valid Professional
            License/Certification or Work Portfolio;{" "}
          </li>
          <li>
            <i className="fa fa-check"></i> A valid government-issued ID (Driver License,
            Passport, Voter's ID, PRC Card, or any city-issued ID);{" "}
          </li>
          <li>
            <i className="fa fa-check"></i> Must have a computer with camera, microphone,
            and reliable internet;{" "}
          </li>
          <li>
            <i className="fa fa-check"></i> Provide a short demo of your online class; and{" "}
          </li>
          <li>
            <i className="fa fa-check"></i> Able to pass a short assessment/interview.
          </li>
        </ul>

        <div className="dropdown-divider"></div>
        <h5 className="m-t-20">Ready to begin your Tagpros Teacher Application?</h5>
        <div
          className="btn waves-effect waves-light btn-info btn-lg m-t-20"
          onClick={() => {
            dispatch(fetchTeacherApp());
            dispatch(updateTeacherAppData({ readIntro: 1 }));
            toggleCheckBoxState("readIntro", true);
            navigate("/application/step-1");
          }}
        >
          Let's Go!
        </div>
      </div>
      <div className="col-md-4 p-20">
        <img src="./assets/images/Puzzle_3.webp" style={{ width: "100%" }} alt="puzzle" />
      </div>
    </div>
  );
}
