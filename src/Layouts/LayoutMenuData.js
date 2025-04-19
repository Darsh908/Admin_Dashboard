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
      // subItems: [
      //   {
      //     id: "analytics",
      //     label: "Analytics",
      //     link: "/dashboard-analytics",
      //     parentId: "dashboard",
      //   },
      //   {
      //     id: "crm",
      //     label: "CRM",
      //     link: "/dashboard-crm",
      //     parentId: "dashboard",
      //   },
      //   {
      //     id: "ecommerce",
      //     label: "Ecommerce",
      //     link: "/dashboard",
      //     parentId: "dashboard",
      //   },
      //   {
      //     id: "crypto",
      //     label: "Crypto",
      //     link: "/dashboard-crypto",
      //     parentId: "dashboard",
      //   },
      //   {
      //     id: "projects",
      //     label: "Projects",
      //     link: "/dashboard-projects",
      //     parentId: "dashboard",
      //   },
      //   {
      //     id: "nft",
      //     label: "NFT",
      //     link: "/dashboard-nft",
      //     parentId: "dashboard",
      //   },
      //   {
      //     id: "job",
      //     label: "Job",
      //     link: "/dashboard-job",
      //     parentId: "dashboard",
      //   },
      //   {
      //     id: "blog",
      //     label: "Blog",
      //     link: "/dashboard-blog",
      //     parentId: "dashboard",
      //     badgeColor: "success",
      //     badgeName: "New",
      //   },
      // ],
    },
    {
      id: "apps",
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
      // subItems: [
      //   {
      //     id: "calendar",
      //     label: "Calendar",
      //     link: "/#",
      //     parentId: "apps",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setCalender(!isCalender);
      //     },
      //     stateVariables: isCalender,
      //     childItems: [
      //       {
      //         id: 1,
      //         label: "Main Calender",
      //         link: "/apps-calendar",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 2,
      //         label: "Month Grid",
      //         link: "/apps-calendar-month-grid",
      //         parentId: "apps",
      //       },
      //     ],
      //   },
      //   {
      //     id: "chat",
      //     label: "Chat",
      //     link: "/apps-chat",
      //     parentId: "apps",
      //   },
      //   {
      //     id: "mailbox",
      //     label: "Email",
      //     link: "/#",
      //     parentId: "apps",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setEmail(!isEmail);
      //     },
      //     stateVariables: isEmail,
      //     childItems: [
      //       {
      //         id: 1,
      //         label: "Mailbox",
      //         link: "/apps-mailbox",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 2,
      //         label: "Email Templates",
      //         link: "/#",
      //         parentId: "apps",
      //         isChildItem: true,
      //         stateVariables: isSubEmail,
      //         click: function (e) {
      //           e.preventDefault();
      //           setSubEmail(!isSubEmail);
      //         },
      //         childItems: [
      //           {
      //             id: 2,
      //             label: "Basic Action",
      //             link: "/apps-email-basic",
      //             parentId: "apps",
      //           },
      //           {
      //             id: 3,
      //             label: "Ecommerce Action",
      //             link: "/apps-email-ecommerce",
      //             parentId: "apps",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     id: "appsecommerce",
      //     label: "Ecommerce",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsEcommerce(!isEcommerce);
      //     },
      //     parentId: "apps",
      //     stateVariables: isEcommerce,
      //     childItems: [
      //       {
      //         id: 1,
      //         label: "Products",
      //         link: "/apps-ecommerce-products",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 2,
      //         label: "Product Details",
      //         link: "/apps-ecommerce-product-details",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 3,
      //         label: "Create Product",
      //         link: "/apps-ecommerce-add-product",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 4,
      //         label: "Orders",
      //         link: "/apps-ecommerce-orders",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 5,
      //         label: "Order Details",
      //         link: "/apps-ecommerce-order-details",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 6,
      //         label: "Customers",
      //         link: "/apps-ecommerce-customers",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 7,
      //         label: "Shopping Cart",
      //         link: "/apps-ecommerce-cart",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 8,
      //         label: "Checkout",
      //         link: "/apps-ecommerce-checkout",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 9,
      //         label: "Sellers",
      //         link: "/apps-ecommerce-sellers",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 10,
      //         label: "Seller Details",
      //         link: "/apps-ecommerce-seller-details",
      //         parentId: "apps",
      //       },
      //     ],
      //   },
      //   {
      //     id: "appsprojects",
      //     label: "Projects",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsProjects(!isProjects);
      //     },
      //     parentId: "apps",
      //     stateVariables: isProjects,
      //     childItems: [
      //       {
      //         id: 1,
      //         label: "List",
      //         link: "/apps-projects-list",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 2,
      //         label: "Overview",
      //         link: "/apps-projects-overview",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 3,
      //         label: "Create Project",
      //         link: "/apps-projects-create",
      //         parentId: "apps",
      //       },
      //     ],
      //   },
      //   {
      //     id: "tasks",
      //     label: "Tasks",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsTasks(!isTasks);
      //     },
      //     parentId: "apps",
      //     stateVariables: isTasks,
      //     childItems: [
      //       {
      //         id: 1,
      //         label: "Kanban Board",
      //         link: "/apps-tasks-kanban",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 2,
      //         label: "List View",
      //         link: "/apps-tasks-list-view",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 3,
      //         label: "Task Details",
      //         link: "/apps-tasks-details",
      //         parentId: "apps",
      //       },
      //     ],
      //   },
      //   {
      //     id: "appscrm",
      //     label: "CRM",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsCRM(!isCRM);
      //     },
      //     parentId: "apps",
      //     stateVariables: isCRM,
      //     childItems: [
      //       { id: 1, label: "Contacts", link: "/apps-crm-contacts" },
      //       { id: 2, label: "Companies", link: "/apps-crm-companies" },
      //       { id: 3, label: "Deals", link: "/apps-crm-deals" },
      //       { id: 4, label: "Leads", link: "/apps-crm-leads" },
      //     ],
      //   },
      //   {
      //     id: "appscrypto",
      //     label: "Crypto",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsCrypto(!isCrypto);
      //     },
      //     parentId: "apps",
      //     stateVariables: isCrypto,
      //     childItems: [
      //       { id: 1, label: "Transactions", link: "/apps-crypto-transactions" },
      //       { id: 2, label: "Buy & Sell", link: "/apps-crypto-buy-sell" },
      //       { id: 3, label: "Orders", link: "/apps-crypto-orders" },
      //       { id: 4, label: "My Wallet", link: "/apps-crypto-wallet" },
      //       { id: 5, label: "ICO List", link: "/apps-crypto-ico" },
      //       { id: 6, label: "KYC Application", link: "/apps-crypto-kyc" },
      //     ],
      //   },
      //   {
      //     id: "invoices",
      //     label: "Invoices",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsInvoices(!isInvoices);
      //     },
      //     parentId: "apps",
      //     stateVariables: isInvoices,
      //     childItems: [
      //       { id: 1, label: "List View", link: "/apps-invoices-list" },
      //       { id: 2, label: "Details", link: "/apps-invoices-details" },
      //       { id: 3, label: "Create Invoice", link: "/apps-invoices-create" },
      //     ],
      //   },
      //   {
      //     id: "supportTickets",
      //     label: "Support Tickets",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsSupportTickets(!isSupportTickets);
      //     },
      //     parentId: "apps",
      //     stateVariables: isSupportTickets,
      //     childItems: [
      //       { id: 1, label: "List View", link: "/apps-tickets-list" },
      //       { id: 2, label: "Ticket Details", link: "/apps-tickets-details" },
      //     ],
      //   },
      //   {
      //     id: "NFTMarketplace",
      //     label: "NFT Marketplace",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsNFTMarketplace(!isNFTMarketplace);
      //     },
      //     parentId: "apps",
      //     stateVariables: isNFTMarketplace,
      //     childItems: [
      //       { id: 1, label: "Marketplace", link: "/apps-nft-marketplace" },
      //       { id: 2, label: "Explore Now", link: "/apps-nft-explore" },
      //       { id: 3, label: "Live Auction", link: "/apps-nft-auction" },
      //       { id: 4, label: "Item Details", link: "/apps-nft-item-details" },
      //       { id: 5, label: "Collections", link: "/apps-nft-collections" },
      //       { id: 6, label: "Creators", link: "/apps-nft-creators" },
      //       { id: 7, label: "Ranking", link: "/apps-nft-ranking" },
      //       { id: 8, label: "Wallet Connect", link: "/apps-nft-wallet" },
      //       { id: 9, label: "Create NFT", link: "/apps-nft-create" },
      //     ],
      //   },
      //   {
      //     id: "filemanager",
      //     label: "File Manager",
      //     link: "/apps-file-manager",
      //     parentId: "apps",
      //   },
      //   {
      //     id: "todo",
      //     label: "To Do",
      //     link: "/apps-todo",
      //     parentId: "apps",
      //   },
      //   {
      //     id: "job",
      //     label: "Jobs",
      //     link: "/#",
      //     parentId: "apps",
      //     // badgeName: "New",
      //     // badgeColor: "success",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsJobs(!isJobs);
      //     },
      //     stateVariables: isJobs,
      //     childItems: [
      //       {
      //         id: 1,
      //         label: "Statistics",
      //         link: "/apps-job-statistics",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 2,
      //         label: "Job Lists",
      //         link: "/#",
      //         parentId: "apps",
      //         isChildItem: true,
      //         stateVariables: isJobList,
      //         click: function (e) {
      //           e.preventDefault();
      //           setIsJobList(!isJobList);
      //         },
      //         childItems: [
      //           {
      //             id: 1,
      //             label: "List",
      //             link: "/apps-job-lists",
      //             parentId: "apps",
      //           },
      //           {
      //             id: 2,
      //             label: "Grid",
      //             link: "/apps-job-grid-lists",
      //             parentId: "apps",
      //           },
      //           {
      //             id: 3,
      //             label: "Overview",
      //             link: "/apps-job-details",
      //             parentId: "apps",
      //           },
      //         ],
      //       },
      //       {
      //         id: 3,
      //         label: "Candidate Lists",
      //         link: "/#",
      //         parentId: "apps",
      //         isChildItem: true,
      //         stateVariables: isCandidateList,
      //         click: function (e) {
      //           e.preventDefault();
      //           setIsCandidateList(!isCandidateList);
      //         },
      //         childItems: [
      //           {
      //             id: 1,
      //             label: "List View",
      //             link: "/apps-job-candidate-lists",
      //             parentId: "apps",
      //           },
      //           {
      //             id: 2,
      //             label: "Grid View",
      //             link: "/apps-job-candidate-grid",
      //             parentId: "apps",
      //           },
      //         ],
      //       },
      //       {
      //         id: 4,
      //         label: "Application",
      //         link: "/apps-job-application",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 5,
      //         label: "New Job",
      //         link: "/apps-job-new",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 6,
      //         label: "Companies List",
      //         link: "/apps-job-companies-lists",
      //         parentId: "apps",
      //       },
      //       {
      //         id: 7,
      //         label: "Job Categories",
      //         link: "/apps-job-categories",
      //         parentId: "apps",
      //       },
      //     ],
      //   },
      //   {
      //     id: "apikey",
      //     label: "API Key",
      //     link: "/apps-api-key",
      //     parentId: "apps",
      //     // badgeName: "New",
      //     // badgeColor: "success"
      //   },
      // ],
    },
    {
      id: "authentication",
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
      // subItems: [
      //   {
      //     id: "signIn",
      //     label: "Sign In",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsSignIn(!isSignIn);
      //     },
      //     parentId: "authentication",
      //     stateVariables: isSignIn,
      //     childItems: [
      //       { id: 1, label: "Basic", link: "/auth-signin-basic" },
      //       { id: 2, label: "Cover", link: "/auth-signin-cover" },
      //     ],
      //   },
      //   {
      //     id: "signUp",
      //     label: "Sign Up",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsSignUp(!isSignUp);
      //     },
      //     parentId: "authentication",
      //     stateVariables: isSignUp,
      //     childItems: [
      //       { id: 1, label: "Basic", link: "/auth-signup-basic" },
      //       { id: 2, label: "Cover", link: "/auth-signup-cover" },
      //     ],
      //   },
      //   {
      //     id: "passwordReset",
      //     label: "Password Reset",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsPasswordReset(!isPasswordReset);
      //     },
      //     parentId: "authentication",
      //     stateVariables: isPasswordReset,
      //     childItems: [
      //       { id: 1, label: "Basic", link: "/auth-pass-reset-basic" },
      //       { id: 2, label: "Cover", link: "/auth-pass-reset-cover" },
      //     ],
      //   },
      //   {
      //     id: "passwordCreate",
      //     label: "Password Create",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsPasswordCreate(!isPasswordCreate);
      //     },
      //     parentId: "authentication",
      //     stateVariables: isPasswordCreate,
      //     childItems: [
      //       { id: 1, label: "Basic", link: "/auth-pass-change-basic" },
      //       { id: 2, label: "Cover", link: "/auth-pass-change-cover" },
      //     ],
      //   },
      //   {
      //     id: "lockScreen",
      //     label: "Lock Screen",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsLockScreen(!isLockScreen);
      //     },
      //     parentId: "authentication",
      //     stateVariables: isLockScreen,
      //     childItems: [
      //       { id: 1, label: "Basic", link: "/auth-lockscreen-basic" },
      //       { id: 2, label: "Cover", link: "/auth-lockscreen-cover" },
      //     ],
      //   },
      //   {
      //     id: "logout",
      //     label: "Logout",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsLogout(!isLogout);
      //     },
      //     parentId: "authentication",
      //     stateVariables: isLogout,
      //     childItems: [
      //       { id: 1, label: "Basic", link: "/auth-logout-basic" },
      //       { id: 2, label: "Cover", link: "/auth-logout-cover" },
      //     ],
      //   },
      //   {
      //     id: "successMessage",
      //     label: "Success Message",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsSuccessMessage(!isSuccessMessage);
      //     },
      //     parentId: "authentication",
      //     stateVariables: isSuccessMessage,
      //     childItems: [
      //       { id: 1, label: "Basic", link: "/auth-success-msg-basic" },
      //       { id: 2, label: "Cover", link: "/auth-success-msg-cover" },
      //     ],
      //   },
      //   {
      //     id: "twoStepVerification",
      //     label: "Two Step Verification",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsVerification(!isVerification);
      //     },
      //     parentId: "authentication",
      //     stateVariables: isVerification,
      //     childItems: [
      //       { id: 1, label: "Basic", link: "/auth-twostep-basic" },
      //       { id: 2, label: "Cover", link: "/auth-twostep-cover" },
      //     ],
      //   },
      //   {
      //     id: "errors",
      //     label: "Errors",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsError(!isError);
      //     },
      //     parentId: "authentication",
      //     stateVariables: isError,
      //     childItems: [
      //       { id: 1, label: "404 Basic", link: "/auth-404-basic" },
      //       { id: 2, label: "404 Cover", link: "/auth-404-cover" },
      //       { id: 3, label: "404 Alt", link: "/auth-404-alt" },
      //       { id: 4, label: "500", link: "/auth-500" },
      //       { id: 5, label: "Offline Page", link: "/auth-offline" },
      //     ],
      //   },
      // ],
    },
    {
      id: "pages",
      label: "Projects",
      icon: " ri-slideshow-fill",
      link: "/#",
      stateVariables: isProjects,
      click: function (e) {
        e.preventDefault();
        setIsProjects(!isProjects);
        setIscurrentState("Projects");
        updateIconSidebar(e);
      },
      // subItems: [
      //   {
      //     id: "starter",
      //     label: "Starter",
      //     link: "/pages-starter",
      //     parentId: "pages",
      //   },
      //   {
      //     id: "profile",
      //     label: "Profile",
      //     link: "/#",
      //     isChildItem: true,
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsProfile(!isProfile);
      //     },
      //     parentId: "pages",
      //     stateVariables: isProfile,
      //     childItems: [
      //       {
      //         id: 1,
      //         label: "Simple Page",
      //         link: "/pages-profile",
      //         parentId: "pages",
      //       },
      //       {
      //         id: 2,
      //         label: "Settings",
      //         link: "/pages-profile-settings",
      //         parentId: "pages",
      //       },
      //     ],
      //   },
      //   { id: "team", label: "Team", link: "/pages-team", parentId: "pages" },
      //   {
      //     id: "timeline",
      //     label: "Timeline",
      //     link: "/pages-timeline",
      //     parentId: "pages",
      //   },
      //   { id: "faqs", label: "FAQs", link: "/pages-faqs", parentId: "pages" },
      //   {
      //     id: "pricing",
      //     label: "Pricing",
      //     link: "/pages-pricing",
      //     parentId: "pages",
      //   },
      //   {
      //     id: "gallery",
      //     label: "Gallery",
      //     link: "/pages-gallery",
      //     parentId: "pages",
      //   },
      //   {
      //     id: "maintenance",
      //     label: "Maintenance",
      //     link: "/pages-maintenance",
      //     parentId: "pages",
      //   },
      //   {
      //     id: "comingSoon",
      //     label: "Coming Soon",
      //     link: "/pages-coming-soon",
      //     parentId: "pages",
      //   },
      //   {
      //     id: "sitemap",
      //     label: "Sitemap",
      //     link: "/pages-sitemap",
      //     parentId: "pages",
      //   },
      //   {
      //     id: "searchResults",
      //     label: "Search Results",
      //     link: "/pages-search-results",
      //     parentId: "pages",
      //   },
      //   {
      //     id: "PrivecyPolicy",
      //     label: "Privacy Policy",
      //     link: "/pages-privacy-policy",
      //     parentId: "pages",
      //   },
      //   {
      //     id: "TermsCondition",
      //     label: "Terms Condition",
      //     link: "/pages-terms-condition",
      //     parentId: "pages",
      //   },
      //   {
      //     id: "blogs",
      //     label: "Blogs",
      //     link: "/#",
      //     isChildItem: true,
      //     badgeColor: "success",
      //     badgeName: "New",
      //     click: function (e) {
      //       e.preventDefault();
      //       setIsBlog(!isBlog);
      //     },
      //     parentId: "pages",
      //     stateVariables: isBlog,
      //     childItems: [
      //       {
      //         id: 1,
      //         label: "List View",
      //         link: "/pages-blog-list",
      //         parentId: "pages",
      //       },
      //       {
      //         id: 2,
      //         label: "Grid View",
      //         link: "/pages-blog-grid",
      //         parentId: "pages",
      //       },
      //       {
      //         id: 3,
      //         label: "Overview",
      //         link: "/pages-blog-overview",
      //         parentId: "pages",
      //       },
      //     ],
      //   },
      // ],
    },
    {
      label: "pages",
      isHeader: true,
    },
    {
      id: "landing",
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
      // subItems: [
      //   {
      //     id: "onePage",
      //     label: "One Page",
      //     link: "/landing",
      //     parentId: "landing",
      //   },
      //   {
      //     id: "nftLanding",
      //     label: "NFT Landing",
      //     link: "/nft-landing",
      //     parentId: "landing",
      //   },
      //   {
      //     id: "jobLanding",
      //     label: "Job",
      //     link: "/job-landing",
      //     parentId: "landing",
      //     // badgeColor: "success", badgeName: "New"
      //   },
      // ],
    },
    {
      id: "baseUi",
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
      // subItems: [
      //   {
      //     id: "alerts",
      //     label: "Alerts",
      //     link: "/ui-alerts",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "badges",
      //     label: "Badges",
      //     link: "/ui-badges",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "buttons",
      //     label: "Buttons",
      //     link: "/ui-buttons",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "colors",
      //     label: "Colors",
      //     link: "/ui-colors",
      //     parentId: "baseUi",
      //   },
      //   { id: "cards", label: "Cards", link: "/ui-cards", parentId: "baseUi" },
      //   {
      //     id: "carousel",
      //     label: "Carousel",
      //     link: "/ui-carousel",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "dropdowns",
      //     label: "Dropdowns",
      //     link: "/ui-dropdowns",
      //     parentId: "baseUi",
      //   },
      //   { id: "grid", label: "Grid", link: "/ui-grid", parentId: "baseUi" },
      //   {
      //     id: "images",
      //     label: "Images",
      //     link: "/ui-images",
      //     parentId: "baseUi",
      //   },
      //   { id: "tabs", label: "Tabs", link: "/ui-tabs", parentId: "baseUi" },
      //   {
      //     id: "accordions",
      //     label: "Accordion & Collapse",
      //     link: "/ui-accordions",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "modals",
      //     label: "Modals",
      //     link: "/ui-modals",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "offcanvas",
      //     label: "Offcanvas",
      //     link: "/ui-offcanvas",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "placeholders",
      //     label: "Placeholders",
      //     link: "/ui-placeholders",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "progress",
      //     label: "Progress",
      //     link: "/ui-progress",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "notifications",
      //     label: "Notifications",
      //     link: "/ui-notifications",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "media",
      //     label: "Media object",
      //     link: "/ui-media",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "embedvideo",
      //     label: "Embed Video",
      //     link: "/ui-embed-video",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "typography",
      //     label: "Typography",
      //     link: "/ui-typography",
      //     parentId: "baseUi",
      //   },
      //   { id: "lists", label: "Lists", link: "/ui-lists", parentId: "baseUi" },
      //   {
      //     id: "links",
      //     label: "Links",
      //     link: "/ui-links",
      //     parentId: "baseUi",
      //     badgeColor: "success",
      //     badgeName: "New",
      //   },
      //   {
      //     id: "general",
      //     label: "General",
      //     link: "/ui-general",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "ribbons",
      //     label: "Ribbons",
      //     link: "/ui-ribbons",
      //     parentId: "baseUi",
      //   },
      //   {
      //     id: "utilities",
      //     label: "Utilities",
      //     link: "/ui-utilities",
      //     parentId: "baseUi",
      //   },
      // ],
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
