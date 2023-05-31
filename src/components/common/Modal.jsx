import React from "react";

const Modal = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        backgroundColor: "rgba(0,0,0,.8)",
        zIndex: "1000",
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
      }}
    >
      <div className="modal-content" style={{ maxWidth: "400px", maxHeight: "220px" }}>
        <div className="modal-header">
          <h4 className="modal-title" id="myModalLabel">
            Remove file
          </h4>
        </div>
        <div className="modal-body">
          <h4>Are you sure you want to remove this file?</h4>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger waves-effect"
            data-dismiss="modal"
            onClick={props.hide}
          >
            Remove
          </button>
          <button
            type="button"
            className="btn btn-info waves-effect"
            data-dismiss="modal"
            onClick={props.hide}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
