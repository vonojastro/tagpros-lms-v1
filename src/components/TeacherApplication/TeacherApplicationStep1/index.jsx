import React from "react";

import TeacherApplicationFormSegment from "../TeacherApplicationFormSegment";

const TeacherApplicationStep1 = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
    }, []);

  return (
    <div>
      <h2 class="card-title">Learn More About Tagpros</h2>
      <h6 className="card-subtitle mb-2 text-muted">
        We'd love to have you onboard! Let's get to know each other a bit better.
      </h6>
      <p>In order to get started with your Tagpros journey, please watch this video.</p>
      <iframe
        id="tagpros-exp"
        width="640"
        height="360"
        src="https://www.youtube.com/embed/619RMlsKRwI"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen=""
      ></iframe>
      <TeacherApplicationFormSegment group={0} />
    </div>
  );
};

export default TeacherApplicationStep1;