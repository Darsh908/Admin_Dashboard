import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Row, Col } from "reactstrap";
import { designations, statuses } from "./Constants";

const EditCustomerModal = ({
  toggle_edit,
  handleEditCustomer,
  show,
  newCustomer,
  setNewCustomer,
}) => {
  return (
    <Modal isOpen={show} toggle={() => toggle_edit()} centered>
      <ModalHeader toggle={() => toggle_edit()} className="bg-info-subtle p-3">
        Edit Customer
      </ModalHeader>
      <form onSubmit={handleEditCustomer}>
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
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
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
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="company-name" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              id="company-name"
              name="companyName"
              className="form-control"
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
            <label htmlFor="edit-date" className="form-label">
              Date
            </label>

            <Flatpickr
              id="edit-date"
              className="form-control"
              name="date"
              options={{
                dateFormat: "d M, Y",
              }}
              value={newCustomer.date}
              onChange={(date) =>
                setNewCustomer({
                  ...newCustomer,
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
                <label htmlFor="edit-status" className="form-label">
                  Status
                </label>
                <select
                  id="edit-status"
                  name="status"
                  className="form-control"
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
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggle_edit()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default EditCustomerModal;
