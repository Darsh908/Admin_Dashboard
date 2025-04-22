import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isUsers, setIsUsers] = useState(false);
  const [isCustomers, setIsCustomers] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isDocs, setIsDocs] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") setIsDashboard(false);
    if (iscurrentState !== "Users") setIsUsers(false);
    if (iscurrentState !== "Customers") setIsCustomers(false);
    if (iscurrentState !== "Projects") setIsProjects(false);
    if (iscurrentState !== "Docs") setIsDocs(false);
    if (iscurrentState !== "Settings") setIsSettings(false);
  }, [
    iscurrentState,
    history,
    isDashboard,
    isUsers,
    isCustomers,
    isProjects,
    isDocs,
    isSettings,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "ri-pie-chart-fill",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "users",
      label: "Users",
      icon: "ri-file-chart-fill",
      link: "/tables-user",
      stateVariables: isUsers,
      click: function (e) {
        e.preventDefault();
        setIsUsers(!isUsers);
        setIscurrentState("Users");
        updateIconSidebar(e);
      },
    },
    {
      id: "customers",
      label: "Customers",
      icon: " ri-team-fill",
      link: "/tables-customer",
      stateVariables: isCustomers,
      click: function (e) {
        e.preventDefault();
        setIsCustomers(!isCustomers);
        setIscurrentState("Customers");
        updateIconSidebar(e);
      },
    },
    {
      id: "projects",
      label: "Projects",
      icon: " ri-slideshow-fill",
      link: "/apps-projects-list",
      stateVariables: isProjects,
      click: function (e) {
        e.preventDefault();
        setIsProjects(!isProjects);
        setIscurrentState("Projects");
        updateIconSidebar(e);
      },
    },
    // {
    //   label: "pages",
    //   isHeader: true,
    // },
    {
      id: "docs",
      label: "Docs",
      icon: "ri-survey-fill",
      link: "/#",
      stateVariables: isDocs,
      click: function (e) {
        e.preventDefault();
        setIsDocs(!isDocs);
        setIscurrentState("Docs");
        updateIconSidebar(e);
      },
    },
    {
      id: "settings",
      label: "Settings",
      icon: "ri-settings-5-fill",
      link: "/#",
      stateVariables: isSettings,
      click: function (e) {
        e.preventDefault();
        setIsSettings(!isSettings);
        setIscurrentState("Settings");
        updateIconSidebar(e);
      },
    },
    {
      id: "logout",
      label: "Logout",
      icon: "ri-logout-box-fill",
      link: "/logout",
      click: function () {
        history("/logout");
      },
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
