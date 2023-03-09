import React from "react";
import "./Card.scss";

type Props = {
  className?: string;
  children: React.ReactNode;
};

function Card({ className, children }: Props) {
  const classes = className;

  return (
    <div className={`card bg-light ${classes}` || ""}>
      <div className="card-body px-0 px-md-3">{children}</div>
    </div>
  );
}

Card.defaultProps = {
  className: null,
};

export default Card;
