import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import { AuthObject, LoginRequest, Patient, UserDetails } from "../../general/types";
import { closeModal, mapDataToAuthObject } from "../../general/utils";
import { handleTextChange } from "../../reducers/actions";
import userLoginFormReducer from "../../reducers/userLoginFormReducer";
import { getPatient, getUser, postLoginData } from "../../general/dataManager";
import { login } from "../../reducers/store";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const initialLoginFormState: LoginRequest = {
  email: "",
  password: "",
};

function LoginForm() {
  const [formState, dispatch] = useReducer(userLoginFormReducer, initialLoginFormState);
  const [isFormPosting, setIsFormPosting] = useState(false);
  const authDispatch = useAppDispatch();
  const navigate = useNavigate();

  const dispatchLogin = (authObject: AuthObject) => {
    authDispatch(login(authObject));
    closeModal();
    navigate("/");
  };

  const textChangeHandler = () => {
    return (e: React.FormEvent<HTMLInputElement>) => handleTextChange(dispatch, e);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormPosting(true);
    postLoginData(formState)
      .then(() => {
        getUser().then((userDetails) => {
          const authObject = mapDataToAuthObject(userDetails as UserDetails);
          // set state for patient
          if ((userDetails as UserDetails).role === "PATIENT") {
            getPatient()
              .then((patient) => {
                authObject.patientId = (patient as Patient).patientId;
                authObject.doctorId = null;
                dispatchLogin(authObject);
              })
              .catch((err) => console.error(err));
          } else if ((userDetails as UserDetails).role === "DOCTOR") {
            // set state for doctor
            authObject.doctorId = 0; // TODO: getDoctor by userId function need
            authObject.patientId = null;
            dispatchLogin(authObject);
          }
        });
        setIsFormPosting(false);
      })
      .catch((err) => {
        console.error(err);
        setIsFormPosting(false);
      });
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="emailLogin" className="form-label">
        Email
      </label>
      <input
        id="emailLogin"
        name="email"
        className="form-control mb-3"
        type="email"
        value={formState.email}
        onChange={textChangeHandler()}
        required
      />
      <label htmlFor="passwordLogin" className="form-label">
        Password
      </label>
      <input
        id="passwordLogin"
        name="password"
        className="form-control mb-3"
        type="password"
        value={formState.password}
        onChange={textChangeHandler()}
        required
      />
      <div className="d-grid gap-2">
        {isFormPosting ? (
          <Spinner />
        ) : (
          <Button className="bg-gradient shadow-sm" type="submit">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
}

export default LoginForm;
