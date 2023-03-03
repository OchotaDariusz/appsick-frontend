import axios, { AxiosInstance } from "axios";
import {
  ChatMessageDTO,
  ChatMessageObject,
  Clinic,
  DoctorObject,
  DoctorSpeciality,
  ErrorResponse,
  LoginRequest,
  MedicalDataDTO,
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
const postData = async (endpoint: string, body?: any): Promise<any> => {
  try {
    return await axiosInstance.post(endpoint, body);
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

export const postNewUser = async (body: RegisterRequest) => {
  try {
    return await postData("/visit", body);
  } catch {
    return {
      errorMessage: "Cannot create new user.",
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

export const postPatientMedicalData = async (body: MedicalDataDTO) => {
  try {
    return await postData("/medical_data", body);
  } catch {
    return {
      errorMessage: "Cannot save patient medical data.",
    };
  }
};

// GET's
const getData = async (endpoint: string): Promise<any> => {
  try {
    return await axiosInstance.get(endpoint);
  } catch {
    return {
      errorMessage: "Cannot fetch data.",
    };
  }
};

export const getUser = async (): Promise<
  UserDetails | string | ErrorResponse
> => {
  try {
    return await getData("/auth/current");
  } catch {
    return {
      errorMessage: "Cannot fetch current authenticated user details.",
    };
  }
};

export const getPatient = async (): Promise<PatientObject | ErrorResponse> => {
  const errorMessage = {
    errorMessage:
      "Cannot fetch patient details for current authenticated user.",
  };
  try {
    const user: any = await getUser();
    if ("id" in (user as UserDetails)) {
      return await getData(`/patient/${user.id}?user_id=true`);
    }
    return errorMessage;
  } catch {
    return errorMessage;
  }
};

export const getPatientMedicalData = async (): Promise<
  MedicalDataObject | MedicalDataObject[] | ErrorResponse
> => {
  const errorMessage = {
    errorMessage:
      "Cannot fetch medical data for for current authenticated user.",
  };
  try {
    const user: any = await getUser(); // medical data is fetched by user.id from UserDetails not patientId
    if ("id" in (user as UserDetails)) {
      return await getData(`/medical_data/user/${user.id}`);
    }
    return errorMessage;
  } catch {
    return errorMessage;
  }
};

export const getPatientVisits = async (
  time?: string,
  pageNumber?: number
): Promise<VisitObject[] | ErrorResponse> => {
  const errorMessage = {
    errorMessage:
      "Cannot fetch patient details for current authenticated user.",
  };
  try {
    const timeEndpoint = time || "";
    const currentPage = `?pageNumber=${pageNumber}` || "";
    const patient: any = await getPatient();
    if ("patientId" in (patient as Patient)) {
      return await getData(`/visit/patient/${patient.patientId}`);
    }
    return errorMessage;
  } catch {
    return errorMessage;
  }
};

export const getPatientVisitsInFuture = async (): Promise<
  VisitObject[] | ErrorResponse
> => {
  try {
    return await getPatientVisits("/future");
  } catch {
    return {
      errorMessage: "Cannot fetch future patient visits.",
    };
  }
};

export const getPatientVisitsForToday = async (): Promise<
  VisitObject[] | ErrorResponse
> => {
  try {
    return await getPatientVisits("/current");
  } catch {
    return {
      errorMessage: "Cannot fetch today patient visits.",
    };
  }
};

export const getPatientVisitsFromPast = async (
  pageNumber?: number
): Promise<VisitObject[] | ErrorResponse> => {
  try {
    return await getPatientVisits("/past", pageNumber);
  } catch {
    return {
      errorMessage: "Cannot fetch past patient visits.",
    };
  }
};

export const getChatHistoryFromVisit = async (
  visitId: number | string
): Promise<ChatMessageObject[] | ErrorResponse> => {
  try {
    return await getData(`/chats/visit/${visitId}`);
  } catch {
    return {
      errorMessage: "Cannot fetch chat history from that visit.",
    };
  }
};

export const getClinics = async (): Promise<Clinic[] | ErrorResponse> => {
  try {
    return await getData("/clinic");
  } catch {
    return {
      errorMessage: "Cannot fetch clinics data.",
    };
  }
};

export const getClinicById = async (
  clinicId: number | string
): Promise<Clinic | ErrorResponse> => {
  try {
    return await getData(`/clinic/${clinicId}`);
  } catch {
    return {
      errorMessage: "Cannot fetch clinic data.",
    };
  }
};

export const getDoctorById = async (
  doctorId: number | string
): Promise<DoctorObject | ErrorResponse> => {
  try {
    return await getData(`/doctor/${doctorId}`);
  } catch {
    return {
      errorMessage: "Cannot fetch doctor data.",
    };
  }
};

export const getDoctorsByClinicId = async (
  clinicId: number | string
): Promise<DoctorObject[] | ErrorResponse> => {
  try {
    return await getData(`/clinic/${clinicId}/doctor`);
  } catch {
    return {
      errorMessage: "Cannot fetch doctors by clinic data.",
    };
  }
};

export const getDoctorsBySpeciality = async (
  speciality: DoctorSpeciality
): Promise<DoctorObject[] | ErrorResponse> => {
  try {
    return await getData(`/specialities/${speciality}`);
  } catch {
    return {
      errorMessage: "Cannot fetch doctors by their specialities data.",
    };
  }
};

export const getDoctorSpecialities = async (): Promise<
  DoctorObject[] | ErrorResponse
> => {
  try {
    return await getData("/specialities");
  } catch {
    return {
      errorMessage: "Cannot fetch doctor specialities data.",
    };
  }
};
