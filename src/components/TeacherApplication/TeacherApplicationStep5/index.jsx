import React from "react";
import TeacherApplicationFormSegment from "../TeacherApplicationFormSegment";

const documents = [
  { label: "Terms and Conditions", href: "teacher-policies/terms" },
  { label: "Class Content Policy", href: "teacher-policies/class-content" },
  { label: "Community Standards", href: "teacher-policies/community-standards" },
];
const TeacherApplicationStep5 = () => {

  React.useEffect(() => {
    window.scrollTo(0, 0)
    }, []);

  return (
    <div>
      <h2 class="card-title">Review Policies</h2>
      <h5>
        Please carefully read the following documents before checking the respective
        boxes.
      </h5>
      <hr />
      <ol>
        {documents.map(({ label, href }) => (
          <li>
            <a href={href} target="_blank" rel="noreferrer" className="font-weight-bold">
              {label}
            </a>
          </li>
        ))}
      </ol>
      <hr className="p-b-20" />
      <div>
        <TeacherApplicationFormSegment group={4} />
      </div>
    </div>
  );
};

export default TeacherApplicationStep5;
