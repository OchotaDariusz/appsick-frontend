import React from "react";

type Props = {
  id: string;
  ariaLabel: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function Modal({ id, ariaLabel, children, onClick }: Props) {
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={ariaLabel} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content shadow-lg">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={ariaLabel}>
              Modal title
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  onClick: null,
};

export default Modal;
