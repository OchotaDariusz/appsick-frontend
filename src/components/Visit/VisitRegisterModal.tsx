import React from "react";
import Modal from "../UI/Modal";

function VisitRegisterModal() {
  return (
    <Modal id="visitRegisterModal" ariaLabel="visitRegisterModalLabel">
      <p>VISIT REGISTER MODAL</p>
    </Modal>
  );
}

VisitRegisterModal.defaultProps = {
  onClick: null,
};

export default VisitRegisterModal;
