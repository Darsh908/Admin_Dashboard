import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Row, Col } from "reactstrap";
import { userTypes, designations, statuses } from "./Constants";

const EditUserModal = ({
  toggle_edit,
  handleEditUser,
  show,
  newUser,
  setNewUser,
}) => {
  return (
    <Modal isOpen={show} toggle={() => toggle_edit()} centered>
      <ModalHeader toggle={() => toggle_edit()} className="bg-info-subtle p-3">
        Edit User
      </ModalHeader>
      <form onSubmit={handleEditUser}>
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
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
              name="date"
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

export default EditUserModal;
