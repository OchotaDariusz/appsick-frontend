// fetch API error response
export interface ErrorResponse {
  errorMessage: string;
}

// required types for application
export type DateObject = (string | string[] | number) | Date;

export type DoctorObject = Doctor | DoctorDTO;

export type PatientObject = Patient | PatientDTO;

export type VisitObject = Visit | VisitDTO;

export type MedicalDataObject = MedicalData | MedicalDataDTO;

export type ChatMessageObject = ChatMessage | ChatMessageDTO;

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

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  birthDate?: DateObject;
  image?: string;
  sex?: Sex;
  telephoneNumber: string;
  email: string;
  password?: string;
  role?: Role;
  provider?: Provider;
}

export interface Doctor {
  doctorId: number;
  about?: string;
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
  medicalDataId: number;
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
  user?: User;
  message: string;
  date: DateObject;
}

export interface ChatMessageDTO extends ChatMessage {
  userId?: number;
}

export interface Visit {
  visitId: number;
  patient?: Patient;
  doctor?: Doctor;
  clinic?: Clinic;
  doctorSpeciality: string;
  date: DateObject;
  online: boolean;
  reason: string;
  chatMessageHistory?: ChatMessage[] | ChatMessageDTO[];
}

export interface VisitDTO extends Visit {
  patientId?: number;
  doctorId?: number;
  clinicId?: number;
}

// google api calendar helper types
export interface ConfigApiCalendar {
  clientId: string;
  apiKey: string;
  scope: string;
  discoveryDocs: string[];
  hosted_domain?: string;
}

export interface TimeCalendarType {
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
}
