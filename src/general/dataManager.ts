import axios, { AxiosInstance } from "axios";
import {
  ChatMessageDTO,
  ChatMessageObject,
  Clinic,
  DoctorObject,
  DoctorSpeciality,
  ErrorMessage,
  LoginRequest,
  MedicalDataObject,
  Patient,
  PatientObject,
  RegisterRequest,
  UserDetails,
  VisitObject,
} from "./types";

// fetch data helper-functions
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  timeout: 300000, // 5 minutes
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

// POST's
const postData = async (endpoint: string, body?: unknown): Promise<unknown> => {
  try {
    return await axiosInstance.post(`/api${endpoint}`, body);
  } catch {
    return {
      errorMessage: "Cannot post data.",
    };
  }
};

export const postLoginData = async (body: LoginRequest) => {
  try {
    return await postData("/auth/login", body);
  } catch {
    return {
      errorMessage: "Cannot login into that account.",
    };
  }
};

export const postRegisterData = async (body: RegisterRequest) => {
  try {
    return await postData("/auth/register", body);
  } catch {
    return {
      errorMessage: "Cannot register new account.",
    };
  }
};

export const postLogout = async () => {
  try {
    return await postData("/auth/logout");
  } catch {
    return {
      errorMessage: "Cannot logout.",
    };
  }
};

export const postNewVisit = async (body: VisitObject) => {
  try {
    return await postData("/visit", body);
  } catch {
    return {
      errorMessage: "Cannot create new visit.",
    };
  }
};

export const postVisitChatMessages = async (body: ChatMessageDTO[]) => {
  try {
    return await postData("/chats", body);
  } catch {
    return {
      errorMessage: "Cannot save visit chat messages.",
    };
  }
};

export const postPatientMedicalData = async (body: MedicalDataObject) => {
  try {
    return await postData("/medical_data", body);
  } catch {
    return {
      errorMessage: "Cannot save patient medical data.",
    };
  }
};

// GET's
const getData = async (endpoint: string): Promise<unknown> => {
  try {
    const { data } = await axiosInstance.get(`/api${endpoint}`);
    return data;
  } catch {
    return {
      errorMessage: "Cannot fetch data.",
    };
  }
};

export const getUser = async (): Promise<UserDetails | string | ErrorMessage> => {
  try {
    return await (getData("/auth/current") as Promise<UserDetails | string | ErrorMessage>);
  } catch {
    return {
      errorMessage: "Cannot fetch current authenticated user details.",
    };
  }
};

export const getVisitById = async (visitId: number): Promise<VisitObject | ErrorMessage> => {
  const errorMessage = {
    errorMessage: "Cannot fetch visit details.",
  };
  try {
    return await (getData(`/visit/${visitId}`) as Promise<VisitObject>);
  } catch {
    return errorMessage;
  }
};

export const getPatient = async (): Promise<PatientObject | ErrorMessage> => {
  const errorMessage = {
    errorMessage: "Cannot fetch patient details for current authenticated user.",
  };
  try {
    const user: string | UserDetails | ErrorMessage = await getUser();
    if ("id" in (user as UserDetails)) {
      return await (getData(`/patient/${(<UserDetails>user).id}?user_id=true`) as Promise<PatientObject>);
    }
    return errorMessage;
  } catch {
    return errorMessage;
  }
};

export const getPatientMedicalData = async (): Promise<MedicalDataObject | MedicalDataObject[] | ErrorMessage> => {
  const errorMessage = {
    errorMessage: "Cannot fetch medical data for for current authenticated user.",
  };
  try {
    const user: string | UserDetails | ErrorMessage = await getUser(); // medical data is fetched by user.id from UserDetails not patientId
    if ("id" in (user as UserDetails)) {
      return await (getData(`/medical_data/user/${(<UserDetails>user).id}`) as Promise<MedicalDataObject[]>);
    }
    return errorMessage;
  } catch {
    return errorMessage;
  }
};

export const getPatientVisits = async (time?: string, pageNumber?: number): Promise<VisitObject[] | ErrorMessage> => {
  const errorMessage = {
    errorMessage: "Cannot fetch patient details for current authenticated user.",
  };
  try {
    const timeEndpoint = time ?? "";
    const currentPage = `?pageNumber=${pageNumber}` ?? "";
    const patient: PatientObject | ErrorMessage = await getPatient();
    console.log(patient);
    if ("patientId" in (patient as Patient)) {
      return await (getData(`/visit/patient/${(<Patient>patient).patientId}${timeEndpoint}${currentPage}`) as Promise<
        VisitObject[]
      >);
    }
    return errorMessage;
  } catch {
    return errorMessage;
  }
};

export const getPatientVisitsInFuture = async (): Promise<VisitObject[] | ErrorMessage> => {
  try {
    return await getPatientVisits("/future");
  } catch {
    return {
      errorMessage: "Cannot fetch future patient visits.",
    };
  }
};

export const getPatientVisitsForToday = async (): Promise<VisitObject[] | ErrorMessage> => {
  try {
    return await getPatientVisits("/current");
  } catch {
    return {
      errorMessage: "Cannot fetch today patient visits.",
    };
  }
};

export const getPatientVisitsFromPast = async (pageNumber?: number): Promise<VisitObject[] | ErrorMessage> => {
  try {
    let page: number;
    if (pageNumber === undefined) page = 1;
    else page = pageNumber;
    return await getPatientVisits("/past", page);
  } catch {
    return {
      errorMessage: "Cannot fetch past patient visits.",
    };
  }
};

export const getChatHistoryFromVisit = async (
  visitId: number | string
): Promise<ChatMessageObject[] | ErrorMessage> => {
  try {
    return await (getData(`/chats/visit/${visitId}`) as Promise<ChatMessageObject[]>);
  } catch {
    return {
      errorMessage: "Cannot fetch chat history from that visit.",
    };
  }
};

export const getClinics = async (): Promise<Clinic[] | ErrorMessage> => {
  try {
    return await (getData("/clinic") as Promise<Clinic[]>);
  } catch {
    return {
      errorMessage: "Cannot fetch clinics data.",
    };
  }
};

export const getClinicById = async (clinicId: number | string): Promise<Clinic | ErrorMessage> => {
  try {
    return await (getData(`/clinic/${clinicId}`) as Promise<Clinic>);
  } catch {
    return {
      errorMessage: "Cannot fetch clinic data.",
    };
  }
};

export const getDoctorById = async (doctorId: number | string): Promise<DoctorObject | ErrorMessage> => {
  try {
    return await (getData(`/doctor/${doctorId}`) as Promise<DoctorObject>);
  } catch {
    return {
      errorMessage: "Cannot fetch doctor data.",
    };
  }
};

export const getDoctorsByClinicId = async (clinicId: number | string): Promise<DoctorObject[] | ErrorMessage> => {
  try {
    return await (getData(`/clinic/${clinicId}/doctor`) as Promise<DoctorObject[]>);
  } catch {
    return {
      errorMessage: "Cannot fetch doctors by clinic data.",
    };
  }
};

export const getDoctorsBySpeciality = async (speciality: DoctorSpeciality): Promise<DoctorObject[] | ErrorMessage> => {
  try {
    return await (getData(`/doctor/specialities/${speciality}`) as Promise<DoctorObject[]>);
  } catch {
    return {
      errorMessage: "Cannot fetch doctors by their specialities data.",
    };
  }
};

export const getDoctorSpecialities = async (): Promise<DoctorSpeciality[] | ErrorMessage> => {
  try {
    return await (getData("/doctor/specialities") as Promise<DoctorSpeciality[]>);
  } catch {
    return {
      errorMessage: "Cannot fetch doctor specialities data.",
    };
  }
};

export const setStatusVisit = async (visitId: number | string) => {
  try {
    return await axiosInstance.put(`/api/visit/status/${visitId}`, "COMPLETED");
  } catch {
    return {
      errorMessage: "Cannot put data.",
    };
  }
};

export const deleteVisit = async (visitId: number | string) => {
  try {
    return await axiosInstance.delete(`/api/visit/${visitId}`);
  } catch {
    return {
      errorMessage: "Cannot delete visit.",
    };
  }
};
