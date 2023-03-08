import React, { useEffect, useRef } from "react";
import { ChatMessage, VisitPageState } from "../../general/types";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { selectAuth } from "../../reducers/store";
import VisitChatMessage from "./VisitChatMessage";
import "./VisitChat.scss";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

type Props = {
  visitState: VisitPageState;
  sendMessage?: (
    event: React.FormEvent<HTMLFormElement>,
    formRef: React.MutableRefObject<HTMLFormElement | null>
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visitStateChangeHandler?: (field: string, value: any) => void;
};

function VisitChat({ visitState, sendMessage, visitStateChangeHandler }: Props) {
  const authState = useAppSelector(selectAuth);
  const formRef = useRef(null);

  // eslint-disable-next-line consistent-return
  const setChatMessage = () => {
    if (typeof visitStateChangeHandler === "function") {
      return (e: React.FormEvent<HTMLInputElement>) =>
        visitStateChangeHandler((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value);
    }
  };

  // eslint-disable-next-line consistent-return
  const sendChatMessage = () => {
    if (typeof sendMessage === "function") {
      return (e: React.FormEvent<HTMLFormElement>) => sendMessage(e, formRef);
    }
  };

  useEffect(() => console.log(visitState), [visitState]);

  return (
    <div className="container m-auto">
      <div className="row pt-4">
        <div className="col-12 col-lg-2">
          {authState.role === "DOCTOR" ? (
            <div className="row justify-content-center text-center">
              <Card className="mt-1 mt-lg-3 mb-3 mb-lg-0 rounded-4 border-0 shadow-sm">
                <div className="fs-5 fw-bold lead">Patient:</div>
                <div className="fs-6">{visitState.patientName}</div>
                <br />
                <div className="d-grip gap-2 text-center">
                  <a
                    href={`/patient/${visitState.patientId}/visits`}
                    rel="noreferrer"
                    target="_blank"
                    className="btn rounded-pill w-100 btn-secondary bg-gradient"
                  >
                    Visit History
                  </a>
                </div>
              </Card>
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
          <Card className="mx-auto rounded-4 bg-dark text-dark bg-opacity-10 shadow-sm border-0">
            <div className="text-center pt-3 fw-bold text-muted lead">Visit Chat</div>
            <div className="px-4 py-4">
              <ul className="list-group">
                {visitState.chatMessages.length === 0 ? (
                  <li className="list-group-item">Loading...</li>
                ) : (
                  visitState.chatMessages.map((message, index) => (
                    <VisitChatMessage
                      author={(message as ChatMessage).author as string}
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
                <input
                  placeholder="message..."
                  name="chatMessage"
                  className="form-control"
                  type="text"
                  onChange={setChatMessage()}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn__chat | btn btn-primary text-white">
                    Send
                  </button>
                </div>
              </div>
              {authState.role === "DOCTOR" ? (
                <div className="d-grip gap-2 justify-content-center my-2 mt-5">
                  <Button modalTarget="#visitEndModal" className="btn-danger w-100 bg-gradient shadow-sm">
                    End Visit
                  </Button>
                </div>
              ) : (
                ""
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

VisitChat.defaultProps = {
  sendMessage: () => {},
  visitStateChangeHandler: () => {},
};

export default VisitChat;
