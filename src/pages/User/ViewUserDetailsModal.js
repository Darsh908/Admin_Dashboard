import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { userTypes, designations, statuses } from "./Constants";

const ViewUserDetailsModal = ({ tog_view, viewRowData, modal_view }) => {
  return (
    <Modal isOpen={modal_view} toggle={() => tog_view()} centered>
      <ModalHeader toggle={() => tog_view()} className="bg-info-subtle p-3">
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
          onClick={() => tog_view()}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewUserDetailsModal;
