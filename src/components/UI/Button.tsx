import React, { MouseEventHandler } from "react";
import "./Button.scss";

type Props = {
  className?: string | null;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  darkMode?: boolean;
};

function Button({ className, children, type, onClick, darkMode }: Props) {
  const classes = className ?? "";
  const btnColor = darkMode ? "btn-dark " : "btn-primary ";

  return (
    /* eslint-disable react/button-has-type */
    <button className={`btn ${btnColor}${classes}`} type={type} onClick={onClick}>
      {children}
    </button>
    /* eslint-enable react/button-has-type */
  );
}

Button.defaultProps = {
  className: null,
  type: "button",
  onClick: null,
  darkMode: false,
};

export default Button;
