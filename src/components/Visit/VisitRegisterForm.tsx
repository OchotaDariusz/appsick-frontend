import React, { useState, useReducer, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ApiCalendar from "react-google-calendar-api";
import { getDoctorById, postNewVisit } from "../../general/dataManager";
import {
  Doctor,
  DoctorObject,
  DoctorSpeciality,
  ErrorMessage,
  VisitEvent,
  VisitObject,
  VisitRegisterRequest,
} from "../../general/types";
import useGetDoctorsBySpeciality from "../../hooks/useGetDoctorsBySpeciality";
import useGetDoctorSpecialities from "../../hooks/useGetDoctorSpecialities";
import { handleTextChange, handleNumberChange } from "../../reducers/actions";
import visitFormReducer from "../../reducers/visitFormReducer";
import Button from "../UI/Button/Button";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { selectAuth } from "../../reducers/store";

const ONLINE_CLINIC_ID = 1; // TODO discuss. ?

const visitTemplate: VisitRegisterRequest = {
  visitId: null,
  clinic: {
    clinicId: ONLINE_CLINIC_ID,
  },
  date: "",
  doctor: {
    doctorId: 0,
  },
  doctorId: 0,
  doctorSpeciality: "",
  online: true,
  patient: {
    patientId: 0,
  },
  reason: "",
  status: "PENDING",
  visitTypes: null,
};

let selectedSpeciality: DoctorSpeciality;

type Props = {
  apiCalendar?: ApiCalendar;
};

function VisitRegisterForm({ apiCalendar }: Props) {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, dispatch] = useReducer(visitFormReducer, visitTemplate);
  const [doctorSpecialities, setDoctorSpecialities] = useState<DoctorSpeciality[]>([]);
  const [availableDoctors, setAvailableDoctors] = useState<DoctorObject[]>([]);
  const authState = useAppSelector(selectAuth);
  const [doctorEmail, setDoctorEmail] = useState("");

  const doctorId = useMemo(() => (formState as VisitRegisterRequest).doctorId, [formState]);

  useEffect(() => {
    if ((formState as VisitRegisterRequest).doctorId !== 0) {
      getDoctorById(doctorId as number).then((doctor: DoctorObject | ErrorMessage) => {
        console.log(doctor);
        setDoctorEmail((doctor as Doctor).user?.email as string);
      });
    }
  }, [doctorId, formState]);

  useGetDoctorSpecialities(setDoctorSpecialities);
  selectedSpeciality = useGetDoctorsBySpeciality(setAvailableDoctors, selectedSpeciality, [
    doctorSpecialities,
    formState as VisitRegisterRequest,
  ]);

  const textChangeHandler = () => {
    return (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      handleTextChange(dispatch, e);
  };
  const numberChangeHandler = () => {
    return (e: React.FormEvent<HTMLSelectElement>) => handleNumberChange(dispatch, e);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = { ...formState, doctor: { doctorId: (formState as VisitRegisterRequest).doctorId } };
    delete (formData as VisitRegisterRequest).doctorId;
    console.log(formData);
    postNewVisit({ ...formData, patient: { patientId: authState.patientId } } as VisitObject)
      .then(() => {
        (formRef.current as HTMLFormElement).reset();
        const eventDate = new Date((formState as VisitRegisterRequest).date as string);
        const visitEvent: VisitEvent = {
          summary: "AppSick Online Visit",
          description: `${(formState as VisitRegisterRequest).reason}`,
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
        };
        const calendarEventRequest = (apiCalendar as ApiCalendar).createEventWithVideoConference(
          visitEvent,
          "primary",
          "all"
        );
        calendarEventRequest.execute((registeredEvent: Partial<VisitEvent>) => {
          console.log("Event created!");
          console.log(registeredEvent);
          navigate("/visit");
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <form className="text-center" id="visitRegisterForm" onSubmit={submitForm} ref={formRef}>
      <label htmlFor="visitSpeciality" className="form-label">
        What kind of service do you require?:
      </label>
      <select
        id="visitSpeciality"
        name="doctorSpeciality"
        value={(formState as VisitRegisterRequest).doctorSpeciality}
        className="form-select"
        onChange={textChangeHandler()}
        required
      >
        <option value="" hidden>
          - Select a Speciality -
        </option>
        {doctorSpecialities.length === 0
          ? ""
          : doctorSpecialities.map((speciality) => {
              return (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              );
            })}
      </select>
      <label htmlFor="visitDoctor" className="form-label">
        Doctor
      </label>
      <select id="visitDoctor" name="doctorId" className="form-select mb-3" onChange={numberChangeHandler()} required>
        <option value="" hidden>
          - Select a Doctor -
        </option>
        {doctorSpecialities.length === 0 || availableDoctors.length === 0
          ? ""
          : availableDoctors.map((doctor: DoctorObject) => {
              if (!doctor?.medicalSpecialities?.includes((formState as VisitRegisterRequest).doctorSpeciality)) {
                return (
                  <option key={crypto.randomUUID()} value="" hidden>
                    {" "}
                    -{" "}
                  </option>
                );
              }
              return (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor?.user?.firstName} {doctor?.user?.lastName}
                </option>
              );
            })}
      </select>
      <label htmlFor="visitDate" className="form-label">
        Date
      </label>
      <input
        id="visitDate"
        name="date"
        value={(formState as VisitRegisterRequest).date}
        className="form-control mb-3"
        type="datetime-local"
        onChange={textChangeHandler()}
        required
      />
      <label htmlFor="visitReason" className="form-label">
        Reason
      </label>
      <textarea
        id="visitReason"
        name="reason"
        value={(formState as VisitRegisterRequest).reason}
        className="form-control mb-3"
        maxLength={255}
        required
        onChange={textChangeHandler()}
      />
      <div className="d-grid gap-2">
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}

VisitRegisterForm.defaultProps = {
  apiCalendar: null,
};

export default VisitRegisterForm;
