import React, { MouseEventHandler } from "react";
import "./Button.scss";

type Props = {
  id?: string | undefined;
  className?: string | null;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  darkMode?: boolean;
  modalTarget?: string;
};

function Button({ id, className, children, type, onClick, darkMode, modalTarget }: Props) {
  const classes = className ?? "";
  const btnColor = darkMode ? "btn-dark " : "btn-primary ";

  return (
    /* eslint-disable react/button-has-type */
    <button
      id={id}
      className={`btn ${btnColor}${classes}`}
      type={type}
      onClick={onClick}
      data-bs-toggle="modal"
      data-bs-target={modalTarget ?? ""}
    >
      {children}
    </button>
    /* eslint-enable react/button-has-type */
  );
}

Button.defaultProps = {
  id: undefined,
  className: null,
  type: "button",
  onClick: null,
  darkMode: false,
  modalTarget: null,
};

export default Button;
