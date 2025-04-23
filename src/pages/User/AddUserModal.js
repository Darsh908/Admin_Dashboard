import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Row, Col } from "reactstrap";
import { userTypes, designations, statuses } from "./Constants";

const AddUserModal = ({
  toggle_add,
  handleAddUser,
  show,
  newUser,
  setNewUser,
}) => {
  return (
    <Modal isOpen={show} toggle={() => toggle_add()} centered>
      <ModalHeader className="bg-info-subtle p-3" toggle={() => toggle_add()}>
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
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
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
                <label htmlFor="status-field" className="form-label">
                  Status
                </label>
                <select
                  className="form-control"
                  name="status"
                  id="status-field"
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
          <div className="hstack gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => toggle_add()}
            >
              Close
            </button>
            <button type="submit" className="btn btn-success" id="add-btn">
              Add User
            </button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddUserModal;
