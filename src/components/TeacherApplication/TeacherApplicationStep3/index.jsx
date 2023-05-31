import React from "react";
import TeacherApplicationFormSegment from "../TeacherApplicationFormSegment";

const TeacherApplicationStep3 = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
    }, []);

  return (
    <div>
      <h2 class="card-title">About Your Classes</h2>
      <TeacherApplicationFormSegment group={2} />
    </div>
  );
};

export default TeacherApplicationStep3;
