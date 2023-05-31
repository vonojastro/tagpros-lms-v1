import React from "react";
import { Outlet } from "react-router-dom";

export default function TeacherPoliciesLayout() {
  return (
    <div className="card">
      <div className="card-body">
        <Outlet />
      </div>
    </div>
  );
}
