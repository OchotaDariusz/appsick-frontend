import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

function Card({ className, children }: Props) {
  const classes = className;

  return (
    <div className={`card ${classes}` || ""}>
      <div className="card-body">{children}</div>
    </div>
  );
}

Card.defaultProps = {
  className: null,
};

export default Card;
