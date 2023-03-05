import React, { useState, useRef } from "react";
import { postNewVisit } from "../../general/dataManager";
import { Visit, VisitEvent, VisitObject } from "../../general/types";
import Button from "../UI/Button/Button";

const ONLINE_CLINIC_ID = 1; // TODO discuss. Maybe id should be nullable

const visitTemplate = {
  visitId: null,
  clinic: {
    clinicId: ONLINE_CLINIC_ID,
  },
  date: "",
  doctor: {
    doctorId: 0,
  },
  doctorSpeciality: "",
  online: true,
  patient: {
    patientId: 0,
  },
  reason: "",
  status: "PENDING",
  visitTypes: null,
};

function VisitRegisterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [visitData, setVisitData] = useState<VisitObject>(visitTemplate as VisitObject);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    postNewVisit({ ...visitData, patient: { patientId: 5 } } as VisitObject)
      .then(() => {
        (formRef.current as HTMLFormElement).reset();
        const eventDate = new Date((visitData as Visit).date as string);
        const visitEvent: VisitEvent = {
          summary: "AppSick Online Visit",
          description: `${(visitData as Visit).reason}`,
          start: {
            dateTime: eventDate.toISOString(),
            timeZone: "Europe/Warsaw",
          },
          end: {
            dateTime: new Date(eventDate.getTime() + 3600000).toISOString(),
            timeZone: "Europe/Warsaw",
          },
          attendees: [{ email: "userDetails.email" }],
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
        };
        // apiCalendar.createEventWithVideoConference(visitEvent);
        // TODO: redirect to visits page
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
        className="form-select"
        onChange={(e) =>
          setVisitData({
            ...visitData,
            doctorSpeciality: e.target.value,
          } as VisitObject)
        }
        required
      >
        <option value="" hidden>
          - Select a Speciality -
        </option>
        {/* {isDoctorSpecialitiesLoading
            ? ""
            : doctorSpecialities.map((speciality) => {
                return (
                  <option key={speciality} value={speciality}>
                    {speciality}
                  </option>
                );
              })} */}
      </select>
      <label htmlFor="visitDoctor" className="form-label">
        Doctor
      </label>
      <select
        id="visitDoctor"
        className="form-select mb-3"
        onChange={(e) =>
          setVisitData({
            ...visitData,
            doctor: {
              doctorId: +e.target.value,
            },
          } as VisitObject)
        }
        required
      >
        <option value="" hidden>
          - Select a Doctor -
        </option>
        {/* {isDoctorListLoading
            ? ""
            : doctorList.map((doctor) => {
                if (
                  !doctor.medicalSpecialities.includes(
                    visitDetails.doctorSpeciality
                  )
                ) {
                  return;
                }
                return (
                  <option key={doctor.doctorId} value={doctor.doctorId}>
                    {doctor.user.firstName} {doctor.user.lastName}
                  </option>
                );
              })} */}
      </select>
      <label htmlFor="visitDate" className="form-label">
        Date
      </label>
      <input
        id="visitDate"
        className="form-control mb-3"
        type="datetime-local"
        onChange={(e) =>
          setVisitData({
            ...visitData,
            date: e.target.value,
          } as VisitObject)
        }
        required
      />
      <label htmlFor="visitReason" className="form-label">
        Reason
      </label>
      <textarea
        id="visitReason"
        className="form-control mb-3"
        maxLength={255}
        required
        onChange={(e) =>
          setVisitData({
            ...visitData,
            reason: e.target.value,
          } as VisitObject)
        }
      />
      <div className="d-grid gap-2">
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}

export default VisitRegisterForm;
