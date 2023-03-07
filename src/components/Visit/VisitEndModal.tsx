/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postPatientMedicalData } from "../../general/dataManager";
import { MedicalData, MedicalDataObject } from "../../general/types";
import { closeModal } from "../../general/utils";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { handleNumberChange, handleTextChange } from "../../reducers/actions";
import { selectAuth } from "../../reducers/store";
import visitFormReducer from "../../reducers/visitFormReducer";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

const medicalDataTemplate: MedicalData = {
  medicalDataId: null,
  weight: 0,
  height: 0,
  medicalConditions: "",
  allergies: "",
  addictions: "",
  medicaments: "",
  recommendations: "",
};

type Props = {
  visitId: number;
  endVisit?: () => void;
};

function VisitEndModal({ visitId, endVisit }: Props) {
  const authState = useAppSelector(selectAuth);
  const formRef = useRef<HTMLFormElement>(null);
  const [medicalData, dispatch] = useReducer(visitFormReducer, medicalDataTemplate);
  const navigate = useNavigate();

  const textChangeHandler = () => {
    return (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => handleTextChange(dispatch, e);
  };
  const numberChangeHandler = () => {
    return (e: React.FormEvent<HTMLInputElement>) => handleNumberChange(dispatch, e);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    postPatientMedicalData({
      ...medicalData,
      userId: authState.id,
      visitId,
    } as MedicalDataObject)
      .then(() => {
        (formRef.current as HTMLFormElement).reset();
        if (typeof endVisit === "function") endVisit();
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
          name="weight"
          value={(medicalData as MedicalData).weight}
          required
          onChange={numberChangeHandler()}
        />
        <label className="form-label">Height</label>
        <input
          className="form-control mb-3"
          type="number"
          step="1"
          min="0"
          max="500"
          name="height"
          value={(medicalData as MedicalData).height}
          required
          onChange={numberChangeHandler()}
        />
        <label className="form-label">Medical Conditions</label>
        <input
          className="form-control mb-3"
          type="text"
          maxLength={255}
          required
          name="medicalConditions"
          value={(medicalData as MedicalData).medicalConditions}
          onChange={textChangeHandler()}
        />
        <label className="form-label">Allergies</label>
        <input
          className="form-control mb-3"
          type="text"
          maxLength={255}
          required
          name="allergies"
          value={(medicalData as MedicalData).allergies}
          onChange={textChangeHandler()}
        />
        <label className="form-label">Addictions</label>
        <input
          className="form-control mb-3"
          type="text"
          maxLength={255}
          required
          name="addictions"
          value={(medicalData as MedicalData).addictions}
          onChange={textChangeHandler()}
        />
        <label className="form-label">Medicaments</label>
        <input
          className="form-control mb-3"
          type="text"
          maxLength={255}
          required
          name="medicaments"
          value={(medicalData as MedicalData).medicaments}
          onChange={textChangeHandler()}
        />
        <label className="form-label">Recommendations</label>
        <textarea
          className="form-control mb-3"
          maxLength={255}
          required
          name="recommendations"
          value={(medicalData as MedicalData).recommendations}
          onChange={textChangeHandler()}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
}

VisitEndModal.defaultProps = {
  endVisit: () => {},
};

export default VisitEndModal;
