import React from "react";

const ClassRow = (props) => {
  const { title, classBanner, startDate, studentCount, status } = props;

  const labelStyle = () => {
    if (status === "Done") {
      return "label-success";
    }
    if (status === "Pending") {
      return "label-warning";
    }
    if (status === "Cancelled") {
      return "label-danger";
    }
  };

  return (
    <tr>
      <td>{title}</td>
      <td>
        <img src={classBanner} alt="iMac" width="80" />
      </td>
      <td>{startDate}</td>
      <td>{studentCount}</td>
      <td>
        <span className={`label ${labelStyle()} font-weight-100`}>
          {status}
        </span>
      </td>
      <td>
        <a
          href="#/"
          className="text-inverse p-r-10"
          data-toggle="tooltip"
          title=""
          data-original-title="Edit"
        >
          <i className="ti-marker-alt"></i>
        </a>
        <a
          href="#/"
          className="text-inverse"
          title=""
          data-toggle="tooltip"
          data-original-title="Cancel"
        >
          <i className="ti-close"></i>
        </a>
        <a
          href="#/"
          className="text-inverse"
          title=""
          data-toggle="tooltip"
          data-original-title="Delete"
        >
          <i className="ti-trash"></i>
        </a>
      </td>
    </tr>
  );
};

export default ClassRow;
