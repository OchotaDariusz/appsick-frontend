// import ApiCalendar from "react-google-calendar-api";
import ApiCalendar from "react-google-calendar-api";
import { AuthObject, ConfigApiCalendar, UserDetails, Visit, VisitEvent, VisitObject } from "./types";
import maleDoctorAv from "../assets/male.svg";
import femaleDoctorAv from "../assets/female.svg";
import { userDetailsTemplate } from "../reducers/store";

const calendarConfig: ConfigApiCalendar = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  apiKey: import.meta.env.VITE_GOOGLE_APP_ID,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
};

export const apiCalendar = new ApiCalendar(calendarConfig);

export const createVisitEventObject = (reason: string, eventDate: Date, doctorEmail: string) => {
  const visitEvent: VisitEvent = {
    summary: "AppSick Online Visit",
    description: reason,
    start: {
      dateTime: eventDate.toISOString(),
      timeZone: "Europe/Warsaw",
    },
    end: {
      dateTime: new Date(eventDate.getTime() + 3600000).toISOString(),
      timeZone: "Europe/Warsaw",
    },
    attendees: [{ email: doctorEmail }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: crypto.randomUUID(),
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
  };
  return visitEvent;
};

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
  const visitDate =
    (visit as Visit).date instanceof Date ? (visit as Visit).date : new Date((visit as Visit).date as string);
  const now = new Date();

  return (
    (visitDate as Date).getFullYear() === now.getFullYear() &&
    (visitDate as Date).getMonth() === now.getMonth() &&
    (visitDate as Date).getDate() === now.getDate()
  );
};

export const formatVisitDate = (visit: VisitObject): VisitObject => {
  if (visit?.dateFormated || visit === null) return visit;
  const visitDate = new Intl.DateTimeFormat("pl").format(Date.parse(visit.date as string));
  const visitTime = new Intl.DateTimeFormat("pl", { timeStyle: "medium" }).format(Date.parse(visit.date as string));
  /* eslint-disable no-param-reassign */
  visit.date = [visitDate, visitTime];
  visit.dateFormated = true;
  /* eslint-enable no-param-reassign */
  return visit;
};

export const extractDoctorDataFromVisit = (visit: Visit) => {
  const avatar = visit?.doctor?.user?.sex === "MALE" ? maleDoctorAv : femaleDoctorAv;
  const doctorAvatar = (visit as Visit).doctor?.user?.image ?? avatar;
  const doctorFirstName = (visit as Visit).doctor?.user?.firstName ?? "firstName";
  const doctorLastName = (visit as Visit).doctor?.user?.lastName ?? "lastName";
  const doctorFullName = `${doctorFirstName} ${doctorLastName}`;
  const doctorMedicalSpeciality = (visit as Visit).doctor?.medicalSpecialities[0] ?? "docSpeciality";
  return [doctorAvatar, doctorFullName, doctorMedicalSpeciality];
};

export const mapDataToAuthObject = (userDetails: UserDetails): AuthObject => {
  const authObject = { ...userDetailsTemplate };
  authObject.id = (userDetails as UserDetails).id;
  authObject.firstName = (userDetails as UserDetails).firstName;
  authObject.lastName = (userDetails as UserDetails).lastName;
  authObject.email = (userDetails as UserDetails).email;
  authObject.role = (userDetails as UserDetails).role;
  return authObject;
};

export const closeModal = () => {
  const btns = document.querySelectorAll(".btn-close");
  btns.forEach((btn) => (btn as HTMLButtonElement).click());
};
