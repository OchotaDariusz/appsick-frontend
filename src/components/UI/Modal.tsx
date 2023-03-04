import React from "react";
import "./Modal.scss";

type Props = {
  id?: string | undefined;
  ariaLabel?: string | undefined;
  children?: React.ReactNode | undefined;
};

function Modal({ id, ariaLabel, children }: Props) {
  return (
    <div role="form" className="modal fade" id={id} tabIndex={-1} aria-labelledby={ariaLabel} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content shadow-lg rounded-5">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  id: undefined,
  ariaLabel: undefined,
  children: undefined,
};

export default Modal;
