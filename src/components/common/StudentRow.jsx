import React from "react";

const StudentRow = (props) => {
  const { id, name, email, phoneNumber, gradeLevel, age } = props;

  const labelColor = () => {
    let classLabel = "";
    switch (gradeLevel) {
      case "Grade School":
        classLabel = "label-info";
        break;
      case "Junior High":
        classLabel = "label-warning";
        break;
      case "Senior High":
        classLabel = "label-danger";
        break;
      default:
        classLabel = "";
    }
    console.log(classLabel, "class label");
    return classLabel;
  };

  return (
    <tr>
      <td>{id}</td>
      <td>
        <a href="app-contact-detail.html">
          {/* image src should be props */}
          <img src="./assets/images/users/1.jpg" alt="user" className="img-circle" />{" "}
          {name}
        </a>
      </td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>
        <span className={`label ${labelColor()}`}>{gradeLevel}</span>{" "}
      </td>
      <td>{age}</td>

      <td>
        <button
          type="button"
          className="btn btn-sm btn-icon btn-pure btn-outline delete-row-btn"
          data-toggle="tooltip"
          data-original-title="View"
        >
          <i className="fa fa-eye fa-2x text-muted"></i>
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;
