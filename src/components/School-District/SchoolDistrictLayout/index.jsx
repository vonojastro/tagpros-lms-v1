import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import SchoolDistrictContentHeader from "../SchoolDistrictContentHeader";
import SchoolDistrictSidebar from "../SchoolDistrictSidebar";
import SchoolDistrictHeader from "../SchoolDistrictHeader";

export default function SchoolDistrictLayout() {
  return (
    <div>
      <div id="main-wrapper">
        <SchoolDistrictHeader />
        <SchoolDistrictSidebar />
        <div className="page-wrapper">
          <SchoolDistrictContentHeader />
          <div className="container-fluid">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
