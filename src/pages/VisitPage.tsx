/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useReducer, useRef } from "react";
import ReactDOM from "react-dom";
import { useLoaderData, useNavigate, redirect, LoaderFunctionArgs } from "react-router-dom";
import { ChatMessageDTO, ErrorMessage, UserDetails, Visit, VisitObject } from "../general/types";
import { getUser, getVisitById, setStatusVisit } from "../general/dataManager";
import { useAppSelector } from "../hooks/useAppDispatch";
import { selectAuth } from "../reducers/store";
import Chatroom from "../components/Visit/Chatroom";
import { handleVisitStateChange } from "../reducers/actions";
import visitStateReducer from "../reducers/visitStateReducer";
import useDomReady from "../hooks/useDomReady";
import VisitEndModal from "../components/Visit/VisitEndModal";

export const visitsLoader = async ({ params }: LoaderFunctionArgs): Promise<Response | null> => {
  const user: string | UserDetails | ErrorMessage = await getUser();
  if (typeof user === "string" || !("id" in (user as UserDetails))) {
    return redirect("/");
  }
  return new Response(JSON.stringify({ visitId: +(params.visitId as string) }));
};

const visitPageInitialState = {
  userId: 0,
  patientId: 0,
  patientName: "",
  doctorName: "",
  visitReason: "",
  chatMessage: "",
  chatMessages: [],
};

let chatroom: Chatroom;
let messages: ChatMessageDTO[];
function VisitPage() {
  const authState = useAppSelector(selectAuth);
  const { visitId }: { visitId: number } = JSON.parse(useLoaderData() as string);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [visitState, dispatch] = useReducer(visitStateReducer, visitPageInitialState);
  const isDomReady = useDomReady();

  const visitStateChangeHandler = (field: string, value: any) => {
    handleVisitStateChange(dispatch, field, value);
  };

  const setChatMessages = (chatMessages: ChatMessageDTO[]) => {
    visitStateChangeHandler("chatMessages", chatMessages);
  };

  const updateChat = () => {
    messages = [];
    chatroom
      .getChats(
        (chat) => {
          messages.push(chat as ChatMessageDTO);
        },
        setChatMessages,
        visitState.chatMessages
      )
      .then(() => {
        setChatMessages(messages);
      });
  };

  // const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   chatroom
  //     .addChat(chatMessage)
  //     .then(() => (formRef.current as HTMLFormElement).reset())
  //     .catch((err) => console.log(err.message));
  // };

  // const routeChange = () => {
  //   let path = `/visit/${props.match.params.visitId}/history`;
  //   history.push(path);
  // };

  const endVisit = () => {
    chatroom
      .endVisit()
      .then(() => {
        setStatusVisit(visitId)
          .then(() => setChatMessages([]))
          .catch((err) => console.error(err.message));
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getVisitById(visitId).then((visit: VisitObject | ErrorMessage) => {
      visitStateChangeHandler("patientId", authState.patientId);
      visitStateChangeHandler("patientName", `${authState.firstName} ${authState.lastName}`);
      visitStateChangeHandler("doctorId", (visit as Visit).doctor?.doctorId);
      visitStateChangeHandler(
        "doctorName",
        `${(visit as Visit).doctor?.user?.firstName} ${(visit as Visit).doctor?.user?.lastName}`
      );
      visitStateChangeHandler("visitReason", (visit as Visit).reason);
    });
    chatroom = new Chatroom(visitId, authState.id, `${authState.firstName} ${authState.lastName}`);
    updateChat();
  });

  return (
    <>
      {isDomReady
        ? ReactDOM.createPortal(
            <VisitEndModal visitId={visitId} />,
            document.getElementById("visit-end-modal") as HTMLElement
          )
        : null}
      <div>Visit Page</div>
    </>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default VisitPage;
