// fetch API error response
export interface ErrorMessage {
  errorMessage: string;
}

// required types for application
export type DateObject = (string | string[] | number) | Date | null;

export type DoctorObject = Doctor | DoctorDTO | null;

export type PatientObject = Patient | PatientDTO | null;

export type VisitObject = Visit | VisitDTO | null;

export type VisitStatus = "PENDING" | "MISSED" | "MOVED" | "COMPLETED" | "UNKNOWN";

export type VisitType = "LOCAL" | "ONLINE" | "EXAMINATION" | "PRESCRIPTIONS";

export type MedicalDataObject = MedicalData | MedicalDataDTO | null;

export type ChatMessageObject = ChatMessage | ChatMessageDTO | null;

export type Sex = "MALE" | "FEMALE";

export type Role = "PATIENT" | "DOCTOR";

export type Provider = "LOCAL" | "GOOGLE";

export type DoctorSpeciality = string;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirm?: string;
  firstName: string;
  lastName: string;
  birthDate: DateObject;
  telephoneNumber: string;
  pesel: string;
  sex: Sex;
}

export interface UserDetails {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  authorities: { authority: string }[];
  enabled: boolean;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthObject {
  id: any;
  email: any;
  firstName: any;
  lastName: any;
  role: any;
  patientId?: any;
  doctorId?: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
export interface User {
  userId: number;
  firstName: string | null;
  lastName: string | null;
  birthDate?: DateObject | null;
  image?: string | null;
  sex?: Sex;
  telephoneNumber: string | null;
  email: string;
  password?: string | null;
  role?: Role;
  provider?: Provider;
}

export interface Doctor {
  doctorId: number;
  about?: string | null;
  user?: User;
  medicalSpecialities: DoctorSpeciality[];
}

export interface DoctorDTO extends Doctor {
  userId?: number;
}

export interface Patient {
  patientId: number;
  pesel: string;
  premium: boolean;
  user?: User;
}

export interface PatientDTO extends Patient {
  userId?: number;
}

export interface MedicalData {
  medicalDataId: number | null;
  weight: number;
  height: number;
  medicalConditions: string;
  allergies: string;
  addictions: string;
  medicaments: string;
  recommendations: string;
  user?: User;
  visit?: Visit;
}

export interface MedicalDataDTO extends MedicalData {
  userId?: number;
  visitId?: number;
}

export interface Clinic {
  clinicId: number;
  clinicName: string;
  longitude: string;
  latitude: string;
  availableDoctors?: Doctor[];
}

export interface ChatMessage {
  chatId: number;
  author?: string;
  user?: User;
  message: string;
  date: DateObject;
}

export interface ChatMessageDTO extends ChatMessage {
  userId?: number;
}

export interface Visit {
  visitId: number | null;
  patient?: Patient;
  doctor?: Doctor;
  clinic?: Clinic | null;
  doctorSpeciality: string | null;
  date: DateObject;
  dateFormated?: boolean;
  online: boolean;
  reason: string | null;
  chatMessageHistory?: ChatMessage[] | ChatMessageDTO[] | null;
  status: VisitStatus;
  visitTypes: VisitType[] | null;
}

export interface VisitDTO extends Visit {
  patientId?: number;
  doctorId?: number;
  clinicId?: number;
}

export interface VisitRegisterRequest {
  visitId: null;
  clinic: {
    clinicId: number;
  };
  date: string;
  doctor: {
    doctorId: number;
  };
  doctorId?: number;
  doctorSpeciality: string;
  online: boolean;
  patient: {
    patientId: number;
  };
  patientId?: number;
  reason: string;
  status: VisitStatus;
  visitTypes: null;
}

export interface VisitPageState {
  userId: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  doctorAvatar: string;
  doctorSpeciality: string;
  visitReason: string;
  chatMessage: string | ChatMessageObject;
  chatMessages: string[] | ChatMessageObject[];
}

// google api calendar helper types
export interface ConfigApiCalendar {
  clientId: string;
  apiKey: string;
  scope: string;
  discoveryDocs: string[];
  hosted_domain?: string;
}

interface TimeCalendarType {
  dateTime?: string;
  timeZone: string;
}

export interface VisitEvent {
  summary?: string;
  description?: string;
  start: TimeCalendarType;
  end: TimeCalendarType;
  attendees?: {
    email: string;
  }[];
  reminders?: {
    useDefault?: boolean;
    overrides?: {
      method: string;
      minutes: number;
    }[];
  };
  conferenceData?: {
    createRequest?: {
      requestId?: string;
      conferenceSolutionKey?: {
        type?: string;
      };
    };
  };
}
