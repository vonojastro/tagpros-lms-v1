import React from "react";

import TeacherApplicationFormSegment from "../TeacherApplicationFormSegment";

const TeacherApplicationStep4 = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
    }, []);

  return (
    <div>
      <h2 class="card-title">Sample Classes</h2>
      <TeacherApplicationFormSegment group={3} />
    </div>
  );
};

export default TeacherApplicationStep4;
