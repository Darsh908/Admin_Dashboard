// Import Images
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import avatar9 from "../../assets/images/users/avatar-9.jpg";
import avatar10 from "../../assets/images/users/avatar-10.jpg";

const projectList = [
  {
    id: 1,
    title: "Ticketing System",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    customer: 1,
    status: "Inprogess",
    statusClass: "warning",
    startDate: "15 Sep, 2024",
    deadline: "18 Sep, 2024",
    subItem: [
      { id: 1, imgNumber: "D", bgColor: "danger" },
      { id: 2, imgTeam: avatar5 },
      { id: 3, imgTeam: avatar6 },
      { id: 4, imgNumber: "+" },
    ],
    progressBar: "50%",
    cardHeaderClass: "danger",
  },
  {
    id: 2,
    title: "Multipurpose landing template",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    customer: 1,
    status: "Completed",
    statusClass: "success",
    startDate: "15 Sep, 2024",
    deadline: "29 Dec, 2024",
    subItem: [
      { id: 1, imgTeam: avatar2 },
      { id: 2, imgTeam: avatar3 },
      { id: 2, imgTeam: avatar5 },
      { id: 3, imgTeam: avatar6 },
      { id: 4, imgNumber: "+" },
    ],
    progressBar: "90%",
    cardHeaderClass: "warning",
  },
  {
    id: 3,
    title: "Kanban Board",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    customer: 1,
    status: "Completed",
    statusClass: "success",
    startDate: "15 Sep, 2024",
    deadline: "10 May, 2024",
    subItem: [
      { id: 1, imgTeam: avatar10 },
      { id: 2, imgTeam: avatar5 },
      { id: 3, imgTeam: avatar6 },
      { id: 4, imgNumber: "+" },
    ],
    progressBar: "50%",
    cardHeaderClass: "info",
  },
  {
    id: 4,
    title: "Ecommerce App",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    customer: 1,
    status: "Inprogess",
    statusClass: "warning",
    startDate: "15 Sep, 2024",
    deadline: "15 Mar, 2024",
    subItem: [
      { id: 1, imgTeam: avatar4 },
      { id: 2, imgTeam: avatar5 },
      { id: 3, imgTeam: avatar6 },
      { id: 4, imgNumber: "+" },
    ],
    progressBar: "50%",
    cardHeaderClass: "success",
  },
];
export { projectList };
