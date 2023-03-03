import React from "react";
import Modal from "../UI/Modal";

function VisitRegisterModal(): JSX.Element {
  const onClick = () => {
    console.log("onClick");
  };

  return (
    <Modal id="visitRegisterModal" ariaLabel="visitRegisterModalLabel" onClick={onClick}>
      <p>VISIT REGISTER MODAL</p>
    </Modal>
  );
}

VisitRegisterModal.defaultProps = {
  onClick: null,
};

export default VisitRegisterModal;
