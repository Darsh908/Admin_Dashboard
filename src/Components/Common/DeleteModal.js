import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody } from "reactstrap";

const DeleteModal = ({ show, confirmDelete, toggle_delete }) => {
  return (
    <Modal fade={true} isOpen={show} toggle={toggle_delete} centered={true}>
      <ModalBody className="py-3 px-5">
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
              Are you sure you want to remove this record ?
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={toggle_delete}
          >
            Close
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={confirmDelete}
          >
            Yes, Delete It!
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteModal.propTypes = {
  toggle_delete: PropTypes.func,
  confirmDelete: PropTypes.func,
  show: PropTypes.any,
};

export default DeleteModal;
