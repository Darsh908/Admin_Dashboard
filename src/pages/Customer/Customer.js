import React, { useState, useEffect } from "react";
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
import { designations, statuses } from "./Constants";
import ViewCustomerDetailsModal from "./ViewCustomerDetailsModal";
import DeleteModal from "../../Components/Common/DeleteModal";
import EditCustomerModal from "./EditCustomerModal";
import AddCustomerModal from "./AddCustomerModal";

const CustomerTables = () => {
  const [modal_add, setmodal_add] = useState(false);
  const [modal_delete, setmodal_delete] = useState(false);
  const [modal_edit, setmodal_edit] = useState(false); // State for edit modal
  const [selectAll, setSelectAll] = useState(false); // State to track "select all" checkbox
  const [selectedRows, setSelectedRows] = useState([]); // State to track selected rows
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(""); // Debounced search query
  const [editRowId, setEditRowId] = useState(null); // Track the row being edited
  const [rowToDelete, setRowToDelete] = useState(null); // Track the row to delete
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [modal_view, setmodal_view] = useState(false); // State for view modal
  const [viewRowData, setViewRowData] = useState(null); // Data of the row being viewed

  const [tableData, setTableData] = useState([
    {
      id: "10",
      name: "Tyrone",
      email: "tyrone@example.com",
      companyName: "CapitalWise",
      designation: 1,
      date: "07 Oct, 2021",
      status: 2,
    },
    {
      id: "09",
      name: "Cathy",
      email: "cathy@example.com",
      companyName: "RetailGenius Ltd.",
      designation: 1,
      date: "06 Oct, 2021",
      status: 3,
    },
    {
      id: "08",
      name: "Patsy",
      email: "patsy@example.com",
      companyName: "Elevate Digital",
      designation: 2,
      date: "05 Oct, 2021",
      status: 1,
    },
    {
      id: "07",
      name: "Mary",
      email: "marycousar@velzon.com",
      companyName: "MoneyMatters",
      designation: 3,
      date: "06 Apr, 2021",
      status: 2,
    },
  ]);

  // Form state for new/edit Customer
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    companyName: "",
    designation: "",
    date: "",
    status: "",
  });

  document.title = "Customers | Admin Dashboard";

  const toggle_add = () => {
    setmodal_add(!modal_add);
    resetForm();
  };

  const toggle_edit = () => {
    setmodal_edit(!modal_edit);
    resetForm();
  };

  const toggle_delete = () => {
    setmodal_delete(!modal_delete);
  };

  const toggle_view = () => {
    setmodal_view(!modal_view);
  };

  // Handle form submission
  const handleAddCustomer = (e) => {
    e.preventDefault();

    // Validate and format the date
    let formattedDate = "";
    if (newCustomer.date) {
      try {
        formattedDate = format(new Date(newCustomer.date), "dd MMM, yyyy"); // Format the date
      } catch (error) {
        console.error("Invalid date format:", error);
        alert("Please select a valid date.");
        return; // Exit the function if the date is invalid
      }
    } else {
      alert("Date is required.");
      return; // Exit the function if the date is empty
    }

    // Add new customer to the table data
    const newCustomerData = {
      id: (tableData.length + 1).toString(), // Generate a new ID
      name: newCustomer.name,
      email: newCustomer.email,
      companyName: newCustomer.companyName,
      designation: parseInt(newCustomer.designation),
      date: formattedDate,
      status: parseInt(newCustomer.status),
    };

    setTableData([...tableData, newCustomerData]); // Update table data
    resetForm();
    setmodal_add(false); // Close modal
  };

  // Open edit modal and populate data
  const handleEdit = (id) => {
    const rowToEdit = tableData.find((row) => row.id === id);
    if (rowToEdit) {
      setNewCustomer({
        name: rowToEdit.name,
        email: rowToEdit.email,
        companyName: rowToEdit.companyName,
        designation: rowToEdit.designation,
        date: rowToEdit.date,
        status: rowToEdit.status,
      });
      setEditRowId(id);
      setmodal_edit(true);
    }
  };

  // Handle form submission for editing
  const handleEditCustomer = (e) => {
    e.preventDefault();

    // Format the date before saving
    const formattedDate = newCustomer.date
      ? format(new Date(newCustomer.date), "dd MMM, yyyy")
      : "";

    const updatedTableData = tableData.map((row) =>
      row.id === editRowId
        ? { ...row, ...newCustomer, date: formattedDate } // Update the edited row with formatted date
        : row
    );

    setTableData(updatedTableData);
    setmodal_edit(false); // Close modal
    setEditRowId(null); // Reset edit row ID
    resetForm();
  };

  // Reset Form
  const resetForm = () => {
    setNewCustomer({
      name: "",
      email: "",
      companyName: "",
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

      // Handle sorting for designation and status by label
      if (key === "designation") {
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
    const designationLabel =
      designations.find((designation) => designation.id === row.designation)
        ?.label || "";
    const statusLabel =
      statuses.find((status) => status.id === row.status)?.label || "";

    return (
      row.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      row.companyName
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
    // Delete a single row
    const updatedTableData = tableData.filter((row) => row.id !== rowToDelete);
    setTableData(updatedTableData);
    setRowToDelete(null); // Reset the row to delete
    setmodal_delete(false); // Close modal
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
          <BreadCrumb title="Customer List" pageTitle="Customer" />
          <Row className="project-wrapper">
            <Widgets />
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Customers</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="customerList">
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
                            Add Customer
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
                        id="customerTable"
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
                              data-sort="company_name"
                              onClick={() => handleSort("companyName")}
                            >
                              Company Name
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
                              Start Date
                            </th>
                            <th
                              className="sort"
                              data-sort="status"
                              onClick={() => handleSort("status")}
                            >
                              Status
                            </th>
                            <th data-sort="action">Action</th>
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
                              <td className="customer_name">{row.name}</td>
                              <td className="email">{row.email}</td>
                              <td className="customer_name">
                                {row.companyName}
                              </td>
                              <td className="customer_name">
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
                                    )?.label === "Completed"
                                      ? "bg-success-subtle text-success"
                                      : statuses.find(
                                          (status) => status.id === row.status
                                        )?.label === "In Progress"
                                      ? "bg-secondary-subtle text-secondary"
                                      : "bg-danger-subtle text-danger"
                                  } text-uppercase`}

                                  // className={`badge ${
                                  //   row.status === 2
                                  //     ? "bg-success-subtle text-success"
                                  //     : row.status === 1
                                  //     ? "bg-secondary-subtle text-secondary"
                                  //     : "bg-danger-subtle text-danger"
                                  // } text-uppercase`}
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
      <AddCustomerModal
        show={modal_add}
        handleAddCustomer={handleAddCustomer}
        newCustomer={newCustomer}
        setNewCustomer={setNewCustomer}
        toggle_add={toggle_add}
      />

      {/* Edit Modal */}
      <EditCustomerModal
        show={modal_edit}
        handleEditCustomer={handleEditCustomer}
        newCustomer={newCustomer}
        setNewCustomer={setNewCustomer}
        toggle_edit={toggle_edit}
      />

      {/* Remove Modal */}
      <DeleteModal
        show={modal_delete}
        confirmDelete={confirmDelete}
        toggle_delete={toggle_delete}
      />

      {/* View Modal */}
      <ViewCustomerDetailsModal
        show={modal_view}
        data={viewRowData}
        toggle_view={toggle_view}
      />
    </React.Fragment>
  );
};

export default CustomerTables;
