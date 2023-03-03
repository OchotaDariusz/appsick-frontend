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
import { ChatMessageObject, UserDetails, ErrorMessage } from "../../general/types";
import { firebaseConfig } from "../../general/utils";
import { getUser, postVisitChatMessages } from "../../general/dataManager";

initializeApp(firebaseConfig);

const db = getFirestore();

type ChatMessageSetterFn = (prevValue: ChatMessageObject[] | DocumentData) => ChatMessageObject[];

class Chatroom {
  private readonly visitId: number;
  private readonly userId: number;
  private readonly author: string;
  private readonly chatMessages: CollectionReference<DocumentData>;
  private unsub: (() => void) | undefined;

  constructor(visitId: number, userId: number, author: string) {
    this.visitId = visitId;
    this.userId = userId;
    this.author = author;
    this.chatMessages = collection(db, "appsick-visits");
  }

  async addChat(message: string) {
    const chatMessage = {
      message,
      author: this.author,
      userId: this.userId,
      visitId: this.visitId,
      date: new Date(),
    };
    return await addDoc(this.chatMessages, chatMessage);
  }

  async getChats(
    callback: (chatMessage: ChatMessageObject | DocumentData) => void,
    setChatMessages: ChatMessageSetterFn
  ) {
    if (typeof this.unsub === "function") this.unsub();
    const queryResults = query(this.chatMessages, where("visitId", "==", this.visitId), orderBy("date"));
    this.unsub = onSnapshot(queryResults, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setChatMessages((prevMessages: ChatMessageObject[]) => [...prevMessages, change.doc.data()]);
        }
      });
    });
    const querySnapshot = await getDocs(queryResults);
    querySnapshot.forEach((doc) => {
      callback(doc.data());
    });
  }

  async endVisit(setChatMessages: ChatMessageSetterFn) {
    const user: UserDetails | string | ErrorMessage = await getUser();
    if ("id" in (user as UserDetails) && (user as UserDetails).role === "PATIENT") {
      return;
    }
    if (typeof this.unsub === "function") this.unsub();
    const queryResults = query(this.chatMessages, where("visitId", "==", this.visitId), orderBy("date"));
    const querySnapshot = await getDocs(queryResults);
    const chatHistory: ChatMessageObject[] = [];
    let chatMessage: ChatMessageObject | DocumentData;
    querySnapshot.forEach((doc) => {
      chatMessage = doc.data();
      chatMessage.date = new Date(chatMessage.date.toDate());
      chatHistory.push(chatMessage as ChatMessageObject);
    });
    postVisitChatMessages(chatHistory)
      .then(() => {
        getDocs(queryResults)
          .then((snapshot) => {
            snapshot.docs.forEach((snapshotDoc) => {
              const idToRemove = snapshotDoc.id;
              const docRef = doc(db, "appsick-visits", idToRemove);
              deleteDoc(docRef);
            });
            setChatMessages([]);
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  }
}

export default Chatroom;
