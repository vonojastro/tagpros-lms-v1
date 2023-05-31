import React from "react";

import TeacherApplicationFormSegment from "../TeacherApplicationFormSegment";

const TeacherApplicationStep2 = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
    }, []);

  return (
    <div>
      <h2 class="card-title">Personal Details</h2>
      <TeacherApplicationFormSegment group={1} />
    </div>
  );
};

export default TeacherApplicationStep2;
