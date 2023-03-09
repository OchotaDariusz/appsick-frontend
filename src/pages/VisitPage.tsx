/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ChatMessageDTO, ErrorMessage, Visit, VisitObject, VisitPageState } from "../general/types";
import { getVisitById, setStatusVisit } from "../general/dataManager";
import { useAppSelector } from "../hooks/useAppDispatch";
import { selectAuth } from "../reducers/store";
import Chatroom from "../components/Visit/Chatroom";
import { handleVisitStateChange } from "../reducers/actions";
import visitStateReducer from "../reducers/visitStateReducer";
import useDomReady from "../hooks/useDomReady";
import VisitEndModal from "../components/Visit/VisitEndModal";
import { extractDoctorDataFromVisit } from "../general/utils";
import VisitChat from "../components/Visit/VisitChat";

const visitPageInitialState: VisitPageState = {
  userId: 0,
  patientId: 0,
  patientName: "",
  doctorId: 0,
  doctorName: "",
  doctorAvatar: "",
  doctorSpeciality: "",
  visitReason: "",
  chatMessage: "",
  chatMessages: [],
};

let chatroom: Chatroom;
let messages: ChatMessageDTO[];
function VisitPage() {
  const authState = useAppSelector(selectAuth);
  const [visitState, dispatch] = useReducer(visitStateReducer, visitPageInitialState);
  const navigate = useNavigate();
  const isDomReady = useDomReady();
  const { visitId }: { visitId: number } = JSON.parse(useLoaderData() as string);

  const visitStateChangeHandler = useCallback(
    (field: string, value: any) => {
      handleVisitStateChange(dispatch, field, value);
    },
    [dispatch]
  );

  const setChatMessages = useCallback(
    (chatMessages: ChatMessageDTO[]) => {
      visitStateChangeHandler("chatMessages", chatMessages);
    },
    [visitStateChangeHandler]
  );

  const updateChat = useCallback(() => {
    messages = [];
    chatroom
      .getChats((chat) => {
        messages.push(chat as ChatMessageDTO);
      }, setChatMessages)
      .then(() => {
        setChatMessages(messages);
      });
  }, [setChatMessages]);

  const sendMessage = useCallback(
    (event: React.FormEvent<HTMLFormElement>, formRef: React.MutableRefObject<HTMLFormElement | null>) => {
      event.preventDefault();
      chatroom
        .addChat(visitState.chatMessage)
        .then(() => (formRef.current as HTMLFormElement).reset())
        .catch((err) => console.error(err.message));
    },
    [visitState.chatMessage]
  );

  const endVisit = useCallback(() => {
    chatroom
      .endVisit(authState.role)
      .then(() => {
        setStatusVisit(visitId)
          .then(() => {
            setChatMessages([]);
            navigate("/");
          })
          .catch((err) => console.error(err.message));
      })
      .catch((err) => console.error(err.message));
  }, [authState.role, navigate, setChatMessages, visitId]);

  useEffect(() => {
    getVisitById(visitId).then((visit: VisitObject | ErrorMessage) => {
      const [doctorAvatar, doctorFullName, doctorSpeciality] = extractDoctorDataFromVisit(visit as Visit);
      visitStateChangeHandler("patientId", authState.patientId);
      visitStateChangeHandler("patientName", `${authState.firstName} ${authState.lastName}`);
      visitStateChangeHandler("doctorId", (visit as Visit).doctor?.doctorId);
      visitStateChangeHandler("doctorName", doctorFullName);
      visitStateChangeHandler("doctorAvatar", doctorAvatar);
      visitStateChangeHandler("doctorSpeciality", doctorSpeciality);
      visitStateChangeHandler("visitReason", (visit as Visit).reason);
    });
    chatroom = new Chatroom(visitId, authState.id, `${authState.firstName} ${authState.lastName}`);
    updateChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visitEndProps = { visitId, endVisit };
  const visitChatProps = { visitState, sendMessage, visitStateChangeHandler };

  return (
    <>
      {isDomReady
        ? ReactDOM.createPortal(
            <VisitEndModal {...visitEndProps} />,
            document.getElementById("visit-end-modal") as HTMLElement
          )
        : null}
      <VisitChat {...visitChatProps} />
    </>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default VisitPage;
