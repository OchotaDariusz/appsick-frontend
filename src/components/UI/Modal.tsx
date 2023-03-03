import React from "react";

type Props = {
  id: string;
  ariaLabel: string;
  children: React.ReactNode;
};

function Modal({ id, ariaLabel, children }: Props) {
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={ariaLabel} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content shadow-lg">
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
