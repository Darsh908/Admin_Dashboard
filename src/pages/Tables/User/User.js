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
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import Widgets from "../../DashboardProject/Widgets";
import { format } from "date-fns";

const UserTables = () => {
  const [modal_list, setmodal_list] = useState(false);
  const [modal_delete, setmodal_delete] = useState(false);
  const [modal_edit, setmodal_edit] = useState(false); // State for edit modal
  const [selectAll, setSelectAll] = useState(false); // State to track "select all" checkbox
  const [selectedRows, setSelectedRows] = useState([]); // State to track selected rows
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(""); // Debounced search query
  const [editRowId, setEditRowId] = useState(null); // Track the row being edited
  const [rowToDelete, setRowToDelete] = useState(null); // Track the row to delete
  const [deleteAllSelected, setDeleteAllSelected] = useState(false); // Track if deleting all selected rows
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [modal_view, setmodal_view] = useState(false); // State for view modal
  const [viewRowData, setViewRowData] = useState(null); // Data of the row being viewed

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

  // Dynamic dropdown data
  const userTypes = [
    { id: 1, label: "Admin" },
    { id: 2, label: "Employee" },
    { id: 3, label: "Customer" },
  ];

  const designations = [
    { id: 1, label: "Project Manager" },
    { id: 2, label: "Sr. Developer" },
    { id: 3, label: "Jr. Developer" },
  ];

  const statuses = [
    { id: 1, label: "Active" },
    { id: 2, label: "Block" },
  ];

  document.title = "Users | Admin Dashboard";

  // From Here

  const tog_list = () => {
    setmodal_list(!modal_list);
    resetForm();
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
    setmodal_list(false); // Close modal
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
    setDeleteAllSelected(false); // Not deleting all rows
    setmodal_delete(true);
  };

  // Open delete modal for all selected rows
  const handleDeleteSelectedClick = () => {
    setDeleteAllSelected(true); // Deleting all selected rows
    setmodal_delete(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (deleteAllSelected) {
      // Delete all selected rows
      const updatedTableData = tableData.filter(
        (row) => !selectedRows.includes(row.id)
      );
      setTableData(updatedTableData);
      setSelectedRows([]); // Clear selected rows
      setSelectAll(false); // Reset "select all" checkbox
    } else {
      // Delete a single row
      const updatedTableData = tableData.filter(
        (row) => row.id !== rowToDelete
      );
      setTableData(updatedTableData);
      setRowToDelete(null); // Reset the row to delete
    }
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
  const handleEditSubmit = (e) => {
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
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1" />
                            Add User
                          </Button>
                          <Button
                            className="btn btn-danger btn-soft-danger"
                            // onClick="deleteMultiple()"
                            onClick={handleDeleteSelectedClick}
                            disabled={selectedRows.length === 0}
                          >
                            {/* <i className="ri-delete-bin-2-line" /> */}
                            <i className="bx bxs-trash" />
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
      <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader
          className="bg-info-subtle p-3"
          toggle={() => {
            tog_list();
          }}
        >
          Add User
        </ModalHeader>
        <form className="tablelist-form" onSubmit={handleAddUser}>
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="username-field" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="username-field"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email-field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email-field"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="user-type-field" className="form-label">
                User Type
              </label>
              <select
                className="form-control"
                name="userType"
                id="user-type-field"
                value={newUser.userType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select User Type</option>
                {userTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="date-field" className="form-label">
                Date
              </label>
              <Flatpickr
                id="date-field"
                name="date"
                className="form-control"
                options={{
                  dateFormat: "d M, Y",
                }}
                value={newUser.date}
                onChange={(date) =>
                  setNewUser({
                    ...newUser,
                    date: date.length ? date[0].toISOString() : "", // Ensure a valid date is set
                  })
                }
                placeholder="Select Date"
                required
              />
            </div>

            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="designation-field" className="form-label">
                    Designation
                  </label>
                  <select
                    className="form-control"
                    name="designation"
                    id="designation-field"
                    value={newUser.designation}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation.id} value={designation.id}>
                        {designation.label}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="status-field" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-control"
                    name="status"
                    id="status-field"
                    value={newUser.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Status</option>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  resetForm();
                  setmodal_list(false);
                }}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" id="add-btn">
                Add User
              </button>
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={modal_edit}
        toggle={() => setmodal_edit(!modal_edit)}
        centered
      >
        <ModalHeader
          toggle={() => setmodal_edit(!modal_edit)}
          className="bg-info-subtle p-3"
        >
          Edit User
        </ModalHeader>
        <form onSubmit={handleEditSubmit}>
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="edit-name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="edit-name"
                name="name"
                className="form-control"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="edit-email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="edit-email"
                name="email"
                className="form-control"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="edit-userType" className="form-label">
                User Type
              </label>
              <select
                id="edit-userType"
                name="userType"
                className="form-control"
                value={newUser.userType}
                onChange={(e) =>
                  setNewUser({ ...newUser, userType: parseInt(e.target.value) })
                }
                required
              >
                <option value="">Select User Type</option>
                {userTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="edit-date" className="form-label">
                Date
              </label>

              <Flatpickr
                id="edit-date"
                className="form-control"
                options={{
                  dateFormat: "d M, Y",
                }}
                value={newUser.date}
                onChange={(date) =>
                  setNewUser({
                    ...newUser,
                    date: date.length ? date[0].toISOString() : "",
                  })
                }
                required
              />
            </div>

            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="edit-designation" className="form-label">
                    Designation
                  </label>
                  <select
                    id="edit-designation"
                    name="designation"
                    className="form-control"
                    value={newUser.designation}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        designation: parseInt(e.target.value),
                      })
                    }
                    required
                  >
                    <option value="">Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation.id} value={designation.id}>
                        {designation.label}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="edit-status" className="form-label">
                    Status
                  </label>
                  <select
                    id="edit-status"
                    name="status"
                    className="form-control"
                    value={newUser.status}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        status: parseInt(e.target.value),
                      })
                    }
                    required
                  >
                    <option value="">Select Status</option>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setmodal_edit(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => setmodal_delete(!modal_delete)}
        centered
      >
        <ModalHeader toggle={() => setmodal_delete(!modal_delete)}>
          Confirm Deletion
        </ModalHeader>
        <ModalBody>
          {deleteAllSelected ? (
            <p>Are you sure you want to delete all selected rows?</p>
          ) : (
            <p>Are you sure you want to delete this record?</p>
          )}
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setmodal_delete(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </ModalFooter>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={modal_view}
        toggle={() => setmodal_view(!modal_view)}
        centered
      >
        <ModalHeader
          toggle={() => setmodal_view(!modal_view)}
          className="bg-info-subtle p-3"
        >
          View User Details
        </ModalHeader>
        <ModalBody>
          {viewRowData && (
            <div>
              <p>
                <strong>Name:</strong> {viewRowData.name}
              </p>
              <p>
                <strong>Email:</strong> {viewRowData.email}
              </p>
              <p>
                <strong>User Type:</strong>{" "}
                {userTypes.find((type) => type.id === viewRowData.userType)
                  ?.label || "N/A"}
              </p>
              <p>
                <strong>Designation:</strong>{" "}
                {designations.find(
                  (designation) => designation.id === viewRowData.designation
                )?.label || "N/A"}
              </p>
              <p>
                <strong>Date:</strong> {viewRowData.date}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {statuses.find((status) => status.id === viewRowData.status)
                  ?.label || "N/A"}
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setmodal_view(false)}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default UserTables;
