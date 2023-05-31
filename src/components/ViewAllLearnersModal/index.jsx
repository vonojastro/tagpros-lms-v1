/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import _ from "lodash";
import Avatar from "../common/Avatar";
import LearnerInfoModal from "../LearnerInfoModal";
import { getS3Url } from "../../utils/teacherApplication";
import "./index.css";

import Popup from "reactjs-popup";
import { useSelector } from "react-redux";
import { LEARNER_GRADE_LEVELS, SHOW_LEARNERS_SORT_BASIS } from "../../utils/constants";

export default function ViewAllLearnersModal({ trigger }) {
  const closeModal = () => {
    closeButtonRef?.current?.click();
  };
  const closeButtonRef = useRef(null);

  const contentStyle = {
    padding: 0,
    background: "#fff0",
    border: 0,
  };

  const learners = useSelector((state) => state.learners);
  return (
    <Popup
      trigger={trigger}
      contentStyle={contentStyle}
      modal
      onClose={closeModal}
      nested
    >
      {(close) => (
        <div className="modal-dialog modal-xl " role="document" style={{ margin: 0 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">My Learners</h4>
              <button
                onClick={close}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={closeButtonRef}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="card-body">
                <div className="learners__container">
                  {_.sortBy(learners.data, SHOW_LEARNERS_SORT_BASIS).map((learner) => (
                    <a
                      className="learners__learner"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <LearnerInfoModal
                        info={learner}
                        mode="update"
                        trigger={
                          <div>
                            <Avatar
                              left={
                                <img
                                  src={getS3Url(learner.photo)}
                                  alt={"alt"}
                                  className="profile-pic mr-2"
                                  height={60}
                                  width={60}
                                  style={{ objectFit: "cover", objectPosition: "center" }}
                                />
                              }
                              right={
                                <div className="learners__learner__nickname ">
                                  {learner.nickname}
                                  <div className="font-10 text-dark">
                                    {LEARNER_GRADE_LEVELS.find(
                                      ({ value }) => value === learner.ageCategory
                                    ).label.replace("to", "/")}
                                  </div>
                                </div>
                              }
                              key={"key"}
                            />
                          </div>
                        }
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}
