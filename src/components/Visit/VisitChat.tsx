import React, { useRef } from "react";
import { ChatMessage, VisitPageState } from "../../general/types";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { selectAuth } from "../../reducers/store";
import VisitChatMessage from "./VisitChatMessage";
import "./VisitChat.scss";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

type Props = {
  visitState: VisitPageState;
  sendMessage: (
    event: React.FormEvent<HTMLFormElement>,
    formRef: React.MutableRefObject<HTMLFormElement | null>
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visitStateChangeHandler: (field: string, value: any) => void;
};

function VisitChat({ visitState, sendMessage, visitStateChangeHandler }: Props) {
  const authState = useAppSelector(selectAuth);
  const formRef = useRef(null);

  const setChatMessage = () => {
    return (e: React.FormEvent<HTMLInputElement>) =>
      visitStateChangeHandler((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value);
  };

  const sendChatMessage = () => {
    return (e: React.FormEvent<HTMLFormElement>) => sendMessage(e, formRef);
  };

  return (
    <div className="container m-auto">
      <div className="row pt-4">
        <div className="col-12 col-lg-2">
          {authState.role === "DOCTOR" ? (
            <div>
              <p>
                Patient:
                <br /> {visitState.patientName}
              </p>
              <br />
              <a
                href={`/patient/${visitState.patientId}/visits`}
                rel="noreferrer"
                target="_blank"
                className="btn btn-pill btn-secondary"
              >
                Visit History
              </a>
            </div>
          ) : (
            <div className="row justify-content-center text-center">
              <div className="d-none d-lg-flex justify-content-center">
                <img src={visitState.doctorAvatar} alt="doctor" className="m-2 img-thumbnail rounded-4 shadow-sm" />
              </div>
              <Card className="mt-1 mt-lg-3 mb-3 mb-lg-0 rounded-4 border-0 shadow-sm">
                <div className="fs-5 fw-bold lead">Doctor:</div>
                <div className="fs-6">{visitState.doctorName}</div>
                <br />
                <div className="fs-5 fw-bold lead">Reason:</div>
                <div className="fs-6">{visitState.visitReason}</div>
              </Card>
            </div>
          )}
        </div>
        <div className="col-12 col-lg-10">
          <div className="mx-auto rounded-4 bg-dark text-dark bg-opacity-10 shadow mt-3">
            <div className="text-center pt-3 fw-bold text-muted lead">Visit Chat</div>
            <div className="px-4 py-4">
              <ul className="list-group">
                {visitState.chatMessages.length === 0 ? (
                  <li className="list-group-item">Loading...</li>
                ) : (
                  visitState.chatMessages.map((message, index) => (
                    <VisitChatMessage
                      author={(message as ChatMessage).author}
                      message={(message as ChatMessage).message}
                      time={(message as ChatMessage).date}
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                    />
                  ))
                )}
                {/* {isNewChatMessageLoading ? (
                  <li className="list-group-item">
                    <Spinner />
                  </li>
                ) : (
                  ""
                )} */}
              </ul>
            </div>

            <form onSubmit={sendChatMessage()} ref={formRef} className="px-4 py-4 | my-5 pb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="message__label | input-group-text">Your message:</span>
                </div>
                <input placeholder="message..." className="form-control" type="text" onChange={setChatMessage()} />
                <div className="input-group-append">
                  <button type="submit" className="btn__chat | btn btn-primary text-white">
                    Send
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-center my-2">
                {authState.role === "DOCTOR" ? (
                  <Button modalTarget="#visitEndModal" className="btn-danger bg-gradient shadow-sm">
                    End Visit
                  </Button>
                ) : (
                  <div />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitChat;
