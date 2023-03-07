import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./VisitChatMessage.scss";

type Props = {
  author: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  time: any;
};

function VisitChatMessage({ author, message, time }: Props): JSX.Element {
  return (
    <li className="list-group-item">
      <span className="author fw-bold">{author}:&nbsp;</span>
      <span className="message">{message}</span>
      <div className="time">{formatDistanceToNow(time.toDate(), { addSuffix: true })}</div>
    </li>
  );
}

export default VisitChatMessage;
