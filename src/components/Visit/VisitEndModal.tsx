import React from "react";
import Modal from "../UI/Modal";

function VisitEndModal() {
  const onClick = () => {
    console.log("onClick");
  };

  return (
    <Modal id="visitEndModal" ariaLabel="visitEndModalLabel" onClick={onClick}>
      <p>VISIT END MODAL</p>
    </Modal>
  );
}

VisitEndModal.defaultProps = {
  onClick: null,
};

export default VisitEndModal;
