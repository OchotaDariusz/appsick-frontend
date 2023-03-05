/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postPatientMedicalData } from "../../general/dataManager";
import { MedicalDataObject } from "../../general/types";
import { closeModal } from "../../general/utils";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

const visitId = 1;
const userId = 1;
const medicalDataTemplate = {
  medicalDataId: null,
  weight: 0,
  height: 0,
  medicalConditions: "",
  allergies: "",
  addictions: "",
  medicaments: "",
  recommendations: "",
};

function VisitEndModal() {
  const formRef = useRef<HTMLFormElement>(null);
  const [medicalData, setMedicalData] = useState<MedicalDataObject>(medicalDataTemplate);
  const navigate = useNavigate();

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    postPatientMedicalData({
      ...medicalData,
      userId,
      visitId,
    } as MedicalDataObject)
      .then(() => {
        (formRef.current as HTMLFormElement).reset();
        // endVisit(); // TODO: add endVisit function
        closeModal();
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Modal id="visitEndModal" ariaLabel="visitEndModalLabel">
      <form id="endVisitForm" onSubmit={submitForm} ref={formRef}>
        <label className="form-label">Weight</label>
        <input
          className="form-control mb-3"
          type="number"
          step="1"
          min="0"
          max="500"
          required
          onChange={(e) =>
            setMedicalData({
              ...medicalData,
              weight: +e.target.value,
            } as MedicalDataObject)
          }
        />
        <label className="form-label">Height</label>
        <input
          className="form-control mb-3"
          type="number"
          step="1"
          min="0"
          max="500"
          required
          onChange={(e) =>
            setMedicalData({
              ...medicalData,
              height: +e.target.value,
            } as MedicalDataObject)
          }
        />
        <label className="form-label">Medical Conditions</label>
        <input
          className="form-control mb-3"
          type="text"
          maxLength={255}
          required
          onChange={(e) =>
            setMedicalData({
              ...medicalData,
              medicalConditions: e.target.value,
            } as MedicalDataObject)
          }
        />
        <label className="form-label">Allergies</label>
        <input
          className="form-control mb-3"
          type="text"
          maxLength={255}
          required
          onChange={(e) =>
            setMedicalData({
              ...medicalData,
              allergies: e.target.value,
            } as MedicalDataObject)
          }
        />
        <label className="form-label">Addictions</label>
        <input
          className="form-control mb-3"
          type="text"
          maxLength={255}
          required
          onChange={(e) =>
            setMedicalData({
              ...medicalData,
              addictions: e.target.value,
            } as MedicalDataObject)
          }
        />
        <label className="form-label">Medicaments</label>
        <input
          className="form-control mb-3"
          type="text"
          maxLength={255}
          required
          onChange={(e) =>
            setMedicalData({
              ...medicalData,
              medicaments: e.target.value,
            } as MedicalDataObject)
          }
        />
        <label className="form-label">Recommendations</label>
        <textarea
          className="form-control mb-3"
          maxLength={255}
          required
          onChange={(e) =>
            setMedicalData({
              ...medicalData,
              recommendations: e.target.value,
            } as MedicalDataObject)
          }
        />
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
}

VisitEndModal.defaultProps = {
  onClick: null,
};

export default VisitEndModal;
