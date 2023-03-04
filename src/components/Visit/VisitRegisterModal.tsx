/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from "react";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import { postNewVisit } from "../../general/dataManager";
import { Visit, VisitEvent, VisitObject } from "../../general/types";

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

function VisitRegisterModal() {
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
        // TODO: close modal?
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Modal id="visitRegisterModal" ariaLabel="visitRegisterModalLabel">
      <form id="visitRegisterForm" onSubmit={submitForm} ref={formRef}>
        <label className="form-label">What kind of service do you require?:</label>
        <select
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
        <label className="form-label">Doctor</label>
        <select
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
        <label className="form-label">Date</label>
        <input
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
        <label className="form-label">Reason</label>
        <textarea
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
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
}

VisitRegisterModal.defaultProps = {
  onClick: null,
};

export default VisitRegisterModal;
