import React from "react";

const TeacherStatsCard = (props) => {
  const descriptionHandler = () => {
    let description = "";
    switch (props.stat) {
      case "monthlyClasses":
        description = "My Classes This Month";
        break;
      case "monthlyStudents":
        description = "My Students This Month";
        break;
      case "monthlyEarnings":
        description = "My Earnings This Month";
        break;
      case "rating":
        description = "Overall Rating";
        break;
      default:
        throw Error("Invalid stat");
    }
    return description;
  };

  const description = descriptionHandler();

  return (
    <div className="col-lg-3 col-md-6">
      <div className="card">
        <div className="card-body">
          {/* <!-- Row --> */}
          <div className="row">
            <div className="col-8">
              <h2>
                {props.stat === "monthlyEarnings" && "$"}
                {props.value}{" "}
                {props.stat === "rating" && <i className="fa fa-star mr-1"></i>}
              </h2>
              <h6>{description}</h6>
            </div>
            <div className="col-4 align-self-center text-right  p-l-0">
              <div id="sparklinedash3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherStatsCard;
