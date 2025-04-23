import React, { useState, useMemo, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import Widgets from "../DashboardProject/Widgets";
import { format } from "date-fns";
import ViewUserDetailsModal from "./ViewUserDetailsModal";
import { userTypes, designations, statuses } from "./Constants";
import DeleteModal from "../../Components/Common/DeleteModal";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal";

const UserTables = () => {
  const [modal_add, setmodal_add] = useState(false);
  const [modal_delete, setmodal_delete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null); // Track the row to delete
  const [modal_edit, setmodal_edit] = useState(false); // State for edit modal
  const [editRowId, setEditRowId] = useState(null); // Track the row being edited
  const [modal_view, setmodal_view] = useState(false); // State for view modal
  const [viewRowData, setViewRowData] = useState(null); // Data of the row being viewed
  const [selectAll, setSelectAll] = useState(false); // State to track "select all" checkbox
  const [selectedRows, setSelectedRows] = useState([]); // State to track selected rows
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(""); // Debounced search query
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  const [tableData, setTableData] = useState([
    {
      id: "1",
      name: "Tyrone",
      email: "tyrone@example.com",
      userType: 1,
      designation: 1,
      date: "07 Oct, 2021",
      status: 1,
    },
    {
      id: "2",
      name: "Cathy",
      email: "cathy@example.com",
      userType: 2,
      designation: 1,
      date: "06 Oct, 2021",
      status: 2,
    },
    {
      id: "3",
      name: "Patsy",
      email: "patsy@example.com",
      userType: 2,
      designation: 2,
      date: "05 Oct, 2021",
      status: 2,
    },
    {
      id: "4",
      name: "Mary",
      email: "marycousar@velzon.com",
      userType: 1,
      designation: 3,
      date: "06 Apr, 2021",
      status: 1,
    },
  ]);

  // Form state for new/edit user
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    userType: "",
    designation: "",
    date: "",
    status: "",
  });

  document.title = "Users | Admin Dashboard";

  const toggle_add = () => {
    setmodal_add(!modal_add);
    resetForm();
  };

  const toggle_edit = () => {
    setmodal_edit(!modal_edit);
    resetForm();
  };

  const toggle_view = () => {
    setmodal_view(!modal_view);
  };

  const toggle_delete = () => {
    setmodal_delete(!modal_delete);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle form submission
  const handleAddUser = (e) => {
    e.preventDefault();

    // Validate and format the date
    let formattedDate = "";
    if (newUser.date) {
      try {
        formattedDate = format(new Date(newUser.date), "dd MMM, yyyy"); // Format the date
      } catch (error) {
        console.error("Invalid date format:", error);
        alert("Please select a valid date.");
        return; // Exit the function if the date is invalid
      }
    } else {
      alert("Date is required.");
      return; // Exit the function if the date is empty
    }

    // Add new user to the table data
    const newUserData = {
      id: (tableData.length + 1).toString(), // Generate a new ID
      name: newUser.name,
      email: newUser.email,
      userType: parseInt(newUser.userType),
      designation: parseInt(newUser.designation),
      date: formattedDate,
      status: parseInt(newUser.status),
    };

    setTableData([...tableData, newUserData]); // Update table data
    resetForm();
    setmodal_add(false); // Close modal
  };

  // Reset Form
  const resetForm = () => {
    setNewUser({
      name: "",
      email: "",
      userType: "",
      designation: "",
      date: "",
      status: "",
    }); // Reset form
  };

  // Handle "select all" checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows(tableData.map((row) => row.id)); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  // Handle individual row checkbox
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Deselect row
    } else {
      setSelectedRows([...selectedRows, id]); // Select row
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...tableData].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      // Handle sorting for userType and designation by label
      if (key === "userType") {
        valueA = userTypes.find((type) => type.id === a.userType)?.label || "";
        valueB = userTypes.find((type) => type.id === b.userType)?.label || "";
      } else if (key === "designation") {
        valueA =
          designations.find((designation) => designation.id === a.designation)
            ?.label || "";
        valueB =
          designations.find((designation) => designation.id === b.designation)
            ?.label || "";
      } else if (key === "status") {
        valueA = statuses.find((status) => status.id === a.status)?.label || "";
        valueB = statuses.find((status) => status.id === b.status)?.label || "";
      }

      if (key === "date") {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      } else if (typeof valueA === "string") {
        return direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

    setTableData(sortedData);
  };

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler); // Clear timeout on cleanup
    };
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = tableData.filter((row) => {
    const userTypeLabel =
      userTypes.find((type) => type.id === row.userType)?.label || "";
    const designationLabel =
      designations.find((designation) => designation.id === row.designation)
        ?.label || "";
    const statusLabel =
      statuses.find((status) => status.id === row.status)?.label || "";

    return (
      row.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      userTypeLabel
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) ||
      designationLabel
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) ||
      row.date.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      statusLabel.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  });

  // Open delete modal for a single row
  const handleDeleteClick = (id) => {
    setRowToDelete(id);
    setmodal_delete(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    const updatedTableData = tableData.filter((row) => row.id !== rowToDelete);
    setTableData(updatedTableData);
    setRowToDelete(null); // Reset the row to delete
    setmodal_delete(false); // Close modal
  };

  // Open edit modal and populate data
  const handleEdit = (id) => {
    const rowToEdit = tableData.find((row) => row.id === id);
    if (rowToEdit) {
      setNewUser({
        name: rowToEdit.name,
        email: rowToEdit.email,
        userType: rowToEdit.userType,
        designation: rowToEdit.designation,
        date: rowToEdit.date,
        status: rowToEdit.status,
      });
      setEditRowId(id);
      setmodal_edit(true);
    }
  };

  // Handle form submission for editing
  const handleEditUser = (e) => {
    e.preventDefault();

    // Format the date before saving
    const formattedDate = newUser.date
      ? format(new Date(newUser.date), "dd MMM, yyyy")
      : "";

    const updatedTableData = tableData.map((row) =>
      row.id === editRowId
        ? { ...row, ...newUser, date: formattedDate } // Update the edited row with formatted date
        : row
    );

    setTableData(updatedTableData);
    setmodal_edit(false); // Close modal
    setEditRowId(null); // Reset edit row ID
    resetForm();
  };

  // Calculate the paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Open view modal and populate data
  const handleView = (id) => {
    const rowToView = tableData.find((row) => row.id === id);
    if (rowToView) {
      setViewRowData(rowToView); // Set the data of the row to view
      setmodal_view(true); // Open the view modal
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User List" pageTitle="User" />
          <Row className="project-wrapper">
            <Widgets />
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Users</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={() => toggle_add()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1" />
                            Add User
                          </Button>
                        </div>
                      </Col>
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
                              value={searchQuery}
                              onChange={handleSearch}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                  checked={selectAll}
                                  onChange={handleSelectAll}
                                />
                              </div>
                            </th>
                            <th
                              className="sort"
                              data-sort="name"
                              onClick={() => handleSort("name")}
                            >
                              Name
                            </th>
                            <th
                              className="sort"
                              data-sort="email"
                              onClick={() => handleSort("email")}
                            >
                              Email
                            </th>
                            <th
                              className="sort"
                              data-sort="user_type"
                              onClick={() => handleSort("userType")}
                            >
                              User Type
                            </th>
                            <th
                              className="sort"
                              data-sort="designation"
                              onClick={() => handleSort("designation")}
                            >
                              Designation
                            </th>
                            <th
                              className="sort"
                              data-sort="date"
                              onClick={() => handleSort("date")}
                            >
                              Date
                            </th>
                            <th
                              className="sort"
                              data-sort="status"
                              onClick={() => handleSort("status")}
                            >
                              Status
                            </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {paginatedData.map((row, index) => (
                            <tr key={index}>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="chk_child"
                                    value={`option${index + 1}`}
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => handleRowSelect(row.id)}
                                  />
                                </div>
                              </th>
                              <td className="user_name">{row.name}</td>
                              <td className="email">{row.email}</td>
                              <td className="user_name">
                                {userTypes.find(
                                  (type) => type.id === row.userType
                                )?.label || "N/A"}
                              </td>
                              <td className="user_name">
                                {designations.find(
                                  (designation) =>
                                    designation.id === row.designation
                                )?.label || "N/A"}
                              </td>
                              <td className="date">{row.date}</td>
                              <td className="status">
                                <span
                                  className={`badge ${
                                    statuses.find(
                                      (status) => status.id === row.status
                                    )?.label === "Active"
                                      ? "bg-success-subtle text-success"
                                      : "bg-danger-subtle text-danger"
                                  } text-uppercase`}
                                >
                                  {statuses.find(
                                    (status) => status.id === row.status
                                  )?.label || "N/A"}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm text-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => handleEdit(row.id)}
                                    >
                                      {/* Edit */}
                                      <i className="bx bxs-pencil" />
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm text-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => handleDeleteClick(row.id)}
                                    >
                                      <i className="bx bxs-trash" />
                                    </button>
                                  </div>
                                  <div className="view">
                                    <button
                                      className="btn btn-sm text-secondary view-item-btn"
                                      onClick={() => handleView(row.id)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#viewModal"
                                    >
                                      <i className="ri-eye-fill" />
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    {/* Working Code With Old Design */}
                    {/* <div className="d-flex justify-content-end">
                      <nav>
                        <ul className="pagination">
                          <li
                            className={`page-item ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(currentPage - 1)}
                            >
                              Previous
                            </button>
                          </li>
                          {Array.from({ length: totalPages }, (_, index) => (
                            <li
                              key={index}
                              className={`page-item ${
                                currentPage === index + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                              >
                                {index + 1}
                              </button>
                            </li>
                          ))}
                          <li
                            className={`page-item ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(currentPage + 1)}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div> */}

                    <Row className="align-items-center g-3 text-center text-sm-start">
                      <div className="col-sm">
                        <div className="text-muted">
                          Showing
                          <span className="fw-semibold ms-1">
                            {paginatedData.length}
                          </span>{" "}
                          of{" "}
                          <span className="fw-semibold">
                            {filteredData.length}
                          </span>{" "}
                          Results
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
                          <li
                            className={
                              currentPage === 1
                                ? "page-item disabled"
                                : "page-item"
                            }
                          >
                            <Link
                              to="#"
                              className="page-link"
                              onClick={() => handlePageChange(currentPage - 1)}
                            >
                              Previous
                            </Link>
                          </li>
                          {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className="page-item">
                              <Link
                                to="#"
                                className={`page-link ${
                                  currentPage === index + 1 ? "active" : ""
                                }`}
                                onClick={() => handlePageChange(index + 1)}
                              >
                                {index + 1}
                              </Link>
                            </li>
                          ))}
                          <li
                            className={
                              currentPage === totalPages
                                ? "page-item disabled"
                                : "page-item"
                            }
                          >
                            <Link
                              to="#"
                              className="page-link"
                              onClick={() => handlePageChange(currentPage + 1)}
                            >
                              Next
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Add Modal */}
      <AddUserModal
        show={modal_add}
        handleAddUser={handleAddUser}
        newUser={newUser}
        setNewUser={setNewUser}
        toggle_add={toggle_add}
      />

      <EditUserModal
        show={modal_edit}
        handleEditUser={handleEditUser}
        newUser={newUser}
        setNewUser={setNewUser}
        toggle_edit={toggle_edit}
      />

      <DeleteModal
        show={modal_delete}
        confirmDelete={confirmDelete}
        toggle_delete={toggle_delete}
      />

      <ViewUserDetailsModal
        show={modal_view}
        data={viewRowData}
        toggle_view={toggle_view}
      />
    </React.Fragment>
  );
};

export default UserTables;
