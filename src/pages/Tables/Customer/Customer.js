import React, { useState, useMemo } from "react";
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

const CustomerTables = () => {
  const [modal_list, setmodal_list] = useState(false);
  const [modal_delete, setmodal_delete] = useState(false);
  const [selectAll, setSelectAll] = useState(false); // State to track "select all" checkbox
  const [selectedRows, setSelectedRows] = useState([]); // State to track selected rows

  document.title = "Customers | Admin Dashboard";

  const tog_list = () => {
    setmodal_list(!modal_list);
  };

  const tog_delete = () => {
    setmodal_delete(!modal_delete);
  };

  const defaultTable = [
    {
      id: "10",
      name: "Tyrone",
      email: "tyrone@example.com",
      companyName: "CapitalWise",
      designation: "Project Manager",
      date: "07 Oct, 2021",
      status: "Completed",
    },
    {
      id: "09",
      name: "Cathy",
      email: "cathy@example.com",
      companyName: "RetailGenius Ltd.",
      designation: "Project Manager",
      date: "06 Oct, 2021",
      status: "Cancelled",
    },
    {
      id: "08",
      name: "Patsy",
      email: "patsy@example.com",
      companyName: "Elevate Digital",
      designation: "Sr. Devloper",
      date: "05 Oct, 2021",
      status: "In Progress",
    },
    {
      id: "07",
      name: "Mary",
      email: "marycousar@velzon.com",
      companyName: "MoneyMatters",
      designation: "Jr. Devloper",
      date: "06 Apr, 2021",
      status: "Completed",
    },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        cell: (cell) => (
          <span className="customer_name">{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "email",
        cell: (cell) => <span className="email">{cell.getValue()}</span>,
      },
      {
        accessorKey: "company_name",
        cell: (cell) => (
          <span className="customer_name">{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "designation",
        cell: (cell) => (
          <span className="customer_name">{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "date",
        cell: (cell) => <span className="date">{cell.getValue()}</span>,
      },
      {
        accessorKey: "status",
        cell: (cell) => (
          <span
            className={`badge ${
              cell.getValue() === "Active"
                ? "bg-success-subtle text-success"
                : "bg-danger-subtle text-danger"
            } text-uppercase`}
          >
            {cell.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "action",
        cell: () => (
          <div className="d-flex gap-2">
            <div className="edit">
              <button
                className="btn btn-sm btn-success edit-item-btn"
                data-bs-toggle="modal"
                data-bs-target="#showModal"
              >
                Edit
              </button>
            </div>
            <div className="remove">
              <button
                className="btn btn-sm btn-danger remove-item-btn"
                data-bs-toggle="modal"
                data-bs-target="#deleteRecordModal"
              >
                Remove
              </button>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  // Handle "select all" checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows(defaultTable.map((row) => row.id)); // Select all rows
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
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add Customer
                          </Button>
                          <Button
                            className="btn btn-soft-danger"
                            // onClick="deleteMultiple()"
                          >
                            <i className="ri-delete-bin-2-line"></i>
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
                            <th className="sort" data-sort="customer_name">
                              Name
                            </th>
                            <th className="sort" data-sort="email">
                              Email
                            </th>
                            <th className="sort" data-sort="company_name">
                              Company Name
                            </th>
                            <th className="sort" data-sort="designation">
                              Designation
                            </th>
                            <th className="sort" data-sort="date">
                              Start Date
                            </th>
                            <th className="sort" data-sort="status">
                              Status
                            </th>
                            <th data-sort="action">Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {defaultTable.map((row, index) => (
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
                                {row.designation}
                              </td>
                              <td className="date">{row.date}</td>
                              <td className="status">
                                <span
                                  className={`badge ${
                                    row.status === "Completed"
                                      ? "bg-success-subtle text-success"
                                      : row.status === "In Progress"
                                      ? "bg-secondary-subtle text-secondary"
                                      : "bg-danger-subtle text-danger"
                                  } text-uppercase`}
                                >
                                  {row.status}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
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
          className="bg-light p-3"
          toggle={() => {
            tog_list();
          }}
        >
          {" "}
          Add Customer{" "}
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            <div className="mb-3" id="modal-id" style={{ display: "none" }}>
              <label htmlFor="id-field" className="form-label">
                ID
              </label>
              <input
                type="text"
                id="id-field"
                className="form-control"
                placeholder="ID"
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Customer Name
              </label>
              <input
                type="text"
                id="customername-field"
                className="form-control"
                placeholder="Enter Name"
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
                className="form-control"
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone-field" className="form-label">
                Phone
              </label>
              <input
                type="text"
                id="phone-field"
                className="form-control"
                placeholder="Enter Phone no."
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="date-field" className="form-label">
                Joining Date
              </label>
              <Flatpickr
                className="form-control"
                options={{
                  dateFormat: "d M, Y",
                }}
                placeholder="Select Date"
              />
            </div>

            <div>
              <label htmlFor="status-field" className="form-label">
                Status
              </label>
              <select
                className="form-control"
                data-trigger
                name="status-field"
                id="status-field"
                required
              >
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Block">Block</option>
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setmodal_list(false)}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" id="add-btn">
                Add Customer
              </button>
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        className="modal fade zoomIn"
        id="deleteRecordModal"
        centered
      >
        <ModalHeader
          toggle={() => {
            tog_delete();
          }}
        ></ModalHeader>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Record ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => setmodal_delete(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger "
              id="delete-record"
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CustomerTables;
