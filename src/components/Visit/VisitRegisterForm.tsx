import React, { useState, useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ApiCalendar from "react-google-calendar-api";
import { postNewVisit } from "../../general/dataManager";
import { DoctorObject, DoctorSpeciality, VisitEvent, VisitObject, VisitRegisterRequest } from "../../general/types";
import useGetDoctorsBySpeciality from "../../hooks/useGetDoctorsBySpeciality";
import useGetDoctorSpecialities from "../../hooks/useGetDoctorSpecialities";
import { handleTextChange, handleNumberChange } from "../../reducers/actions";
import visitRegFormReducer from "../../reducers/visitRegFormReducer";
import Button from "../UI/Button/Button";

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
  const [formState, dispatch] = useReducer(visitRegFormReducer, visitTemplate);
  const [doctorSpecialities, setDoctorSpecialities] = useState<DoctorSpeciality[]>([]);
  const [availableDoctors, setAvailableDoctors] = useState<DoctorObject[]>([]);

  useGetDoctorSpecialities(setDoctorSpecialities);
  selectedSpeciality = useGetDoctorsBySpeciality(setAvailableDoctors, selectedSpeciality, [
    doctorSpecialities,
    formState,
  ]);

  const textChangeHandler = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    handleTextChange(dispatch, e);
  };
  const numberChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    handleNumberChange(dispatch, e);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = { ...formState, doctor: { doctorId: formState.doctorId } };
    delete formData.doctorId;
    console.log(formData);
    postNewVisit({ ...formData, patient: { patientId: 1 } } as VisitObject)
      .then(() => {
        (formRef.current as HTMLFormElement).reset();
        const eventDate = new Date(formState.date as string);
        const visitEvent: VisitEvent = {
          summary: "AppSick Online Visit",
          description: `${formState.reason}`,
          start: {
            dateTime: eventDate.toISOString(),
            timeZone: "Europe/Warsaw",
          },
          end: {
            dateTime: new Date(eventDate.getTime() + 3600000).toISOString(),
            timeZone: "Europe/Warsaw",
          },
          attendees: [{ email: "ochota.dariusz@gmail.com" }],
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
        };
        const calendarEventRequest = (apiCalendar as ApiCalendar).createEventWithVideoConference(visitEvent);
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
        value={formState.doctorSpeciality}
        className="form-select"
        onChange={(e) => textChangeHandler(e)}
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
      <select
        id="visitDoctor"
        name="doctorId"
        className="form-select mb-3"
        onChange={(e) => numberChangeHandler(e)}
        required
      >
        <option value="" hidden>
          - Select a Doctor -
        </option>
        {doctorSpecialities.length === 0 || availableDoctors.length === 0
          ? ""
          : availableDoctors.map((doctor: DoctorObject) => {
              if (!doctor?.medicalSpecialities?.includes(formState.doctorSpeciality)) {
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
        value={formState.date}
        className="form-control mb-3"
        type="datetime-local"
        onChange={(e) => textChangeHandler(e)}
        required
      />
      <label htmlFor="visitReason" className="form-label">
        Reason
      </label>
      <textarea
        id="visitReason"
        name="reason"
        value={formState.reason}
        className="form-control mb-3"
        maxLength={255}
        required
        onChange={(e) => textChangeHandler(e)}
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
