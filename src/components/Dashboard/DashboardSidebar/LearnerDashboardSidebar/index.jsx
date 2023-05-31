import React from "react";

import SideBarLink from "../../../common/SideBarLink";

export default function LearnerDashboardSidebar() {
  const getSideBarItems = () => {
    let items = [
      { icon: <i className="fa fa-home"></i>, label: "Home", to: "/" },
      { icon: <i className="fa fa-history"></i>, label: "Enrollment History", to: "/history" },
      { icon: <i className="fa fa-envelope"></i>, label: "Messaging", to: "/inbox" },
      { icon: <i className="fa fa-envelope"></i>, label: "Mailing", to: "/mail" },
      // {
      //   icon: <i className="fa fa-lightbulb-o"></i>,
      //   label: "My Classes",
      //   to: "/classes",
      //   children: [
      //     {
      //       label: "Search Classes",
      //       to: "/wad",
      //     },
      //     {
      //       label: "View My Classes",
      //       to: "/dwadaw",
      //     },
      //   ],
      // },
      // {
      //   icon: <i className="fa fa-clock-o"></i>,
      //   label: "My Schedule",
      //   to: "/classes",
      //   children: [
      //     {
      //       label: "View All Schedule",
      //       to: "/wdad",
      //     },
      //     {
      //       label: "Calendar View",
      //       to: "/wda",
      //     },
      //   ],
      // },
    ];

    return items;
  };

  const sideBarSections = [
    {
      sectionName: "My Learner Dashboard",
      content: getSideBarItems().map((item) => (
        <SideBarLink key={item.label} {...item} />
      )),
    },
  ];
  return sideBarSections.map(({ sectionName, content }) => (
    <ul id="sidebarnav" key={sectionName} style={{ pointerEvents: "all" }}>
      <div className="dropdown-divider"></div>
      <li className="nav-small-cap">{sectionName}</li>
      {content}
    </ul>
  ));
}
