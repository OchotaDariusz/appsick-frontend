export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  birthDate?: Date | string;
  image?: string;
  sex?: "male" | "female";
  telephone: string;
  email: string;
  password?: string;
  role?: string;
}

export interface Doctor {
  doctorId: number;
  about?: string;
  user?: User;
  medicalSpecialities: string[];
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
  date: Date | string;
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
  date: Date | string;
  online: boolean;
  reason: string;
  chatMessageHistory?: ChatMessage[] | ChatMessageDTO[];
}

export interface VisitDTO extends Visit {
  patientId?: number;
  doctorId?: number;
  clinicId?: number;
}
