import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Row, Col } from "reactstrap";
import { designations, statuses } from "./Constants";

const AddCustomerModal = ({
  toggle_add,
  handleAddCustomer,
  show,
  newCustomer,
  setNewCustomer,
}) => {
  return (
    <Modal isOpen={show} toggle={() => toggle_add()} centered>
      <ModalHeader className="bg-info-subtle p-3" toggle={() => toggle_add()}>
        Add Customer
      </ModalHeader>
      <form className="tablelist-form" onSubmit={handleAddCustomer}>
        <ModalBody>
          <div className="mb-3">
            <label htmlFor="name-field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name-field"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
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
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="company-name-field" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              id="company-name-field"
              name="companyName"
              className="form-control"
              placeholder="Enter Company Name"
              value={newCustomer.companyName}
              onChange={(e) =>
                setNewCustomer({
                  ...newCustomer,
                  companyName: e.target.value,
                })
              }
              required
            />
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
              value={newCustomer.date}
              onChange={(date) =>
                setNewCustomer({
                  ...newCustomer,
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
                  value={newCustomer.designation}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
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
                <label htmlFor="status-field" className="form-label">
                  Status
                </label>
                <select
                  className="form-control"
                  name="status"
                  id="status-field"
                  value={newCustomer.status}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
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
          <div className="hstack gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => toggle_add()}
            >
              Close
            </button>
            <button type="submit" className="btn btn-success" id="add-btn">
              Add Customer
            </button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddCustomerModal;
