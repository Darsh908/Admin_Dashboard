import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { designations, statuses } from "./Constants";

const ViewCustomerDetailsModal = ({ toggle_view, data, show }) => {
  return (
    <Modal isOpen={show} toggle={() => toggle_view()} centered>
      <ModalHeader toggle={() => toggle_view()} className="bg-info-subtle p-3">
        View Customer Details
      </ModalHeader>
      <ModalBody>
        {data && (
          <div>
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Company Name:</strong> {data.companyName}
            </p>
            <p>
              <strong>Designation:</strong>{" "}
              {designations.find(
                (designation) => designation.id === data.designation
              )?.label || "N/A"}
            </p>
            <p>
              <strong>Date:</strong> {data.date}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {statuses.find((status) => status.id === data.status)?.label ||
                "N/A"}
            </p>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => toggle_view()}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewCustomerDetailsModal;
