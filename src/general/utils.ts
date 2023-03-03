import ApiCalendar from "react-google-calendar-api";
import { ConfigApiCalendar, VisitObject } from "./types";

// config for google calendar
const calendarConfig: ConfigApiCalendar = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  apiKey: import.meta.env.VITE_GOOGLE_APP_ID,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
};

export const apiCalendar = new ApiCalendar(calendarConfig);

// config for firebase
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// visit helpers
export const isToday = (visit: VisitObject): boolean => {
  const visitDate = visit.date instanceof Date ? visit.date : new Date(visit.date as string);
  const now = new Date();

  return (
    visitDate.getFullYear() === now.getFullYear() &&
    visitDate.getMonth() === now.getMonth() &&
    visitDate.getDate() === now.getDate()
  );
};

export const formatVisitDate = (visit: VisitObject): VisitObject => {
  if (!(visit.date instanceof Date) && Array.isArray(visit.date)) {
    visit.date = [
      new Date((visit.date as string[])[0]).toLocaleDateString("pl-PL"),
      new Date((visit.date as string[])[1]).toLocaleTimeString("pl-PL"),
    ];
  }
  return visit;
};
