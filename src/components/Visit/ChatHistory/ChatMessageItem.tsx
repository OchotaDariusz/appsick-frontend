/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

type Props = {
  message: string;
  author: string;
  date: string;
  isUserOwned: boolean;
};

export default function ChatMessageItem({ message, author, date, isUserOwned }: Props) {
  const [messageAuthor, setAuthor] = useState("");
  const [whenSent, setWhenSent] = useState("");
  const viewMessageDetails = () => {
    if (messageAuthor === "") {
      setAuthor(author);
      setWhenSent(formatDistanceToNow(new Date(date), { addSuffix: true }));
    } else {
      setAuthor("");
      setWhenSent("");
    }
  };

  if (isUserOwned) {
    return (
      <div className="row">
        <div className="col-8 d-grid">
          <div onClick={viewMessageDetails} role="button">
            <span className="bg-secondary rounded text-white p-3" style={{ float: "left", cursor: "pointer" }}>
              {message}{" "}
            </span>
          </div>
          <div>
            <span style={{ float: "left", cursor: "pointer" }}>{messageAuthor}</span>
          </div>
          <div>
            <span style={{ float: "left", cursor: "pointer" }}>{whenSent}</span>
          </div>
        </div>
        <div className="col-2" />
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-5" />
      <div className="col-7 d-grid">
        <div onClick={viewMessageDetails} role="button">
          <span className="bg-primary rounded text-white p-3" style={{ float: "right", cursor: "pointer" }}>
            {message}{" "}
          </span>
        </div>
        <div>
          <span style={{ float: "right", cursor: "pointer" }}>{messageAuthor}</span>
        </div>
        <div>
          <span style={{ float: "right", cursor: "pointer" }}>{whenSent}</span>
        </div>
      </div>
    </div>
  );
}
