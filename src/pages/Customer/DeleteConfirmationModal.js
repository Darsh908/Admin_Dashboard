import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const DeleteConfirmationModal = ({
  tog_delete,
  confirmDelete,
  modal_delete,
}) => {
  return (
    <Modal isOpen={modal_delete} toggle={() => tog_delete()} centered>
      <ModalHeader toggle={() => tog_delete()}>Confirm Deletion</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this record?</p>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => tog_delete()}
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
  );
};

export default DeleteConfirmationModal;
