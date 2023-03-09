import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Card from "../components/UI/Card/Card";
import ChatMessageItem from "../components/Visit/ChatHistory/ChatMessageItem";
import { getChatHistoryFromVisit } from "../general/dataManager";
import { ChatMessage, User } from "../general/types";
import { useAppSelector } from "../hooks/useAppDispatch";
import { selectAuth } from "../reducers/store";

function VisitChatHistoryPage() {
  const [chatArray, setChatArray] = useState<ChatMessage[]>([]);
  const authState = useAppSelector(selectAuth);
  const { visitId }: { visitId: number } = JSON.parse(useLoaderData() as string);

  useEffect(() => {
    getChatHistoryFromVisit(visitId).then((chat) => setChatArray(chat as ChatMessage[]));
  }, [visitId]);

  let lastId = 0;

  const change = (num: number) => {
    lastId = num;
  };

  return (
    <Card className="rounded-4 border-0 shadow-sm">
      {chatArray.map((chat) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        lastId === (chat.user as User).userId ? console.log("tak") : change((chat.user as User).userId);

        return (
          <div key={crypto.randomUUID()}>
            <div className="p-2 m-0 position-relative m-1 ">
              {(chat.user as User).userId === authState.id ? (
                <ChatMessageItem
                  message={chat.message}
                  author={`${(chat.user as User).firstName} ${(chat.user as User).lastName}`}
                  date={chat.date as string}
                  isUserOwned
                />
              ) : (
                <ChatMessageItem
                  message={chat.message}
                  author={`${(chat.user as User).firstName} ${(chat.user as User).lastName}`}
                  date={chat.date as string}
                  isUserOwned={false}
                />
              )}
            </div>
          </div>
        );
      })}
    </Card>
  );
}

export default VisitChatHistoryPage;
