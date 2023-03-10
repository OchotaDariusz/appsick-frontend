/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ChatMessageObject, ChatMessageDTO, Role } from "../../general/types";
import { firebaseConfig } from "../../general/utils";
import { postVisitChatMessages } from "../../general/dataManager";

initializeApp(firebaseConfig);

const db = getFirestore();

type ChatMessageUpdateFn = (chatMessages: ChatMessageDTO[]) => void;

class Chatroom {
  private readonly visitId: number;

  private readonly userId: number;

  private readonly author: string;

  private readonly chatMessages: CollectionReference<DocumentData>;

  private unsub: (() => void) | undefined;

  private endVisitFn: any;

  constructor(visitId: number, userId: number, author: string, endVisitFn: any) {
    this.visitId = visitId;
    this.userId = userId;
    this.author = author;
    this.chatMessages = collection(db, "appsick-visits");
    this.endVisitFn = endVisitFn;
  }

  async addChat(message: string) {
    const chatMessage = {
      message,
      author: this.author,
      userId: this.userId,
      visitId: this.visitId,
      date: new Date(),
    };
    return addDoc(this.chatMessages, chatMessage);
  }

  async getChats(
    callback: (chatMessage: ChatMessageObject | DocumentData) => void,
    updateCallback: ChatMessageUpdateFn
  ) {
    if (typeof this.unsub === "function") this.unsub();
    const queryResults = query(this.chatMessages, where("visitId", "==", this.visitId), orderBy("date"));
    this.unsub = onSnapshot(queryResults, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          getDocs(queryResults)
            .then((querySnapshot) => {
              const messages: DocumentData[] = [];
              querySnapshot.forEach((docSnapshot) => {
                messages.push(docSnapshot.data());
              });
              updateCallback(messages as ChatMessageDTO[]);
            })
            .catch((err) => console.error(err.message));
        } else if (change.type === "removed") {
          if (typeof this.endVisitFn === "function") this.endVisitFn(true);
        }
      });
    });
    const querySnapshot = await getDocs(queryResults);
    querySnapshot.forEach((docSnapshot) => {
      callback(docSnapshot.data());
    });
  }

  async endVisit(role: Role) {
    if (role === "PATIENT") {
      return;
    }
    if (typeof this.unsub === "function") this.unsub();
    const queryResults = query(this.chatMessages, where("visitId", "==", this.visitId), orderBy("date"));
    const querySnapshot = await getDocs(queryResults);
    const chatHistory: ChatMessageObject[] = [];
    let chatMessage: ChatMessageObject | DocumentData;
    querySnapshot.forEach((docSnapshot) => {
      chatMessage = docSnapshot.data();
      chatMessage.date = new Date(chatMessage.date.toDate());
      chatHistory.push(chatMessage as ChatMessageObject);
    });
    postVisitChatMessages(chatHistory as ChatMessageDTO[])
      .then(() => {
        getDocs(queryResults)
          .then((snapshot) => {
            snapshot.docs.forEach((snapshotDoc) => {
              const idToRemove = snapshotDoc.id;
              const docRef = doc(db, "appsick-visits", idToRemove);
              deleteDoc(docRef);
            });
          })
          .catch((err) => console.error(err.message));
      })
      .catch((err) => console.error(err.message));
  }
}

export default Chatroom;
