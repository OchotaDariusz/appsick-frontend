import React from "react";
import Modal from "../UI/Modal/Modal";

function VisitEndModal() {
  return (
    <Modal id="visitEndModal" ariaLabel="visitEndModalLabel">
      <p>VISIT END MODAL</p>
    </Modal>
  );
}

VisitEndModal.defaultProps = {
  onClick: null,
};

export default VisitEndModal;
