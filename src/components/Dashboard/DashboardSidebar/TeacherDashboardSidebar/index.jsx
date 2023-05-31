import React from "react";
import { TEACHER_APPLICATION_FORM_ROUTES } from "utils/constants";
import SideBarLink from "../../../common/SideBarLink";

export default function TeacherDashboardSidebar({applicationStatus}) {
  // const applicationStatus = useSelector(
  //   (state) => state.teacherApp.data.applicationStatus
  // );

  console.log('applicationStatus', applicationStatus);

  const getSideBarItems = (applicationStatus) => {
    let items = [
      { icon: <i className="fa fa-home"></i>, label: "Home", to: "/" },
      {
        icon: <i className="fab fa-black-tie"></i>,
        label: "My Application",
        to: "/application",
        children: [
          {
            label: "Apply as a Teacher",
            to: "/application",
          },
          ...TEACHER_APPLICATION_FORM_ROUTES.map((r) => ({ to: r })), // Don't fill "label" field to not display the link
          {
            label: "Application Status",
            to: "/application-status",
          },
        ],
      },
      {
        icon: <i className="mdi mdi-arrange-send-backward"></i>,
        label: "Tools",
        to: "/classes",
        children: [
          {
            label: "Create a New Class",
            icon: <i className="fa fa-plus mr-2"></i>,
            to: "/createClass",
          },
          {
            label: "My Classes",
            to: "/classes",
          },
          {
            label: "My Learners",
            to: "/students",
          },
          // {
          //   label: "Calendar",
          //   to: "/calendar",
          // },
        ],
      },
      { icon: <i className="fa fa-envelope"></i>, label: "Messaging", to: "/inbox" },
      { icon: <i className="fa fa-envelope"></i>, label: "Mailing", to: "/mail" },
      { icon: <i className="fa fa-play"></i>, label: "Featured Videos", to: "/feature" },
    ];
    console.log(applicationStatus);
    if (applicationStatus !== "ASTAT008")
      items = items.filter(({ to }) => !(to === "/classes"));
    else items = items.filter(({ to }) => !(to === "/application"));

    return items;
  };
  const sideBarSections = [
    {
      sectionName: "My Dashboard",
      content: getSideBarItems(applicationStatus).map((item) => (
        <SideBarLink key={item.label} {...item} />
      )),
    },
  ];

  return sideBarSections.map(({ sectionName, content }) => (
    <ul id="sidebarnav" key={sectionName}>
      <div className="dropdown-divider"></div>
      <li className="nav-small-cap">{sectionName}</li>
      {content}
    </ul>
  ));
}
