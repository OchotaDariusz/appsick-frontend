import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import { postRegisterData } from "../../general/dataManager";
import { closeModal } from "../../general/utils";
import { RegisterRequest } from "../../general/types";
import useValidateFormPassword from "../../hooks/useValidateFormPassword";
import { handleTextChange } from "../../reducers/actions";
import userRegFormReducer from "../../reducers/userRegFormReducer";
import useValidateFormEmail from "../../hooks/useValidateFormEmail";

const initialRegisterFormState: RegisterRequest = {
  email: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  telephoneNumber: "",
  pesel: "",
  sex: "MALE",
};

function RegisterForm() {
  const [formState, dispatch] = useReducer(userRegFormReducer, initialRegisterFormState);
  const emailColor = useValidateFormEmail(formState.email);
  const [passwordConfirmColor, isFormValid] = useValidateFormPassword(
    formState.password,
    formState.passwordConfirm as string
  );
  const navigate = useNavigate();

  const textChangeHandler = () => {
    return (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => handleTextChange(dispatch, e);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const registerData = { ...formState };
    delete registerData.passwordConfirm;
    postRegisterData(registerData)
      .then((data) => {
        console.log("Registered new user");
        console.log(data);
        closeModal();
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="emailRegister" className="form-label">
        Email
      </label>
      <input
        id="emailRegister"
        name="email"
        className="form-control mb-3"
        type="email"
        value={formState.email}
        onChange={textChangeHandler()}
        required
        style={{ border: `3px solid ${emailColor as string}` }}
      />
      <label htmlFor="passwordRegister" className="form-label">
        Password
      </label>
      <input
        id="passwordRegister"
        name="password"
        className="form-control mb-3"
        type="password"
        value={formState.password}
        onChange={textChangeHandler()}
        required
        style={{ border: `3px solid ${passwordConfirmColor as string}` }}
      />
      <label htmlFor="passwordRegisterConfirm" className="form-label">
        Password confirm
      </label>
      <input
        id="passwordRegisterConfirm"
        name="passwordConfirm"
        className="form-control mb-3"
        type="password"
        value={formState.passwordConfirm}
        onChange={textChangeHandler()}
        required
        style={{ border: `3px solid ${passwordConfirmColor as string}` }}
      />
      <label htmlFor="firstNameRegister" className="form-label">
        First Name
      </label>
      <input
        id="firstNameRegister"
        name="firstName"
        className="form-control mb-3"
        type="text"
        value={formState.firstName}
        onChange={textChangeHandler()}
        required
      />
      <label htmlFor="lastNameRegister" className="form-label">
        Last Name
      </label>
      <input
        id="lastNameRegister"
        name="lastName"
        className="form-control mb-3"
        type="text"
        value={formState.lastName}
        onChange={textChangeHandler()}
        required
      />
      <label htmlFor="birthDateRegister" className="form-label">
        Birth Date
      </label>
      <input
        id="birthDateRegister"
        name="birthDate"
        className="form-control mb-3"
        type="date"
        value={formState.birthDate as string}
        onChange={textChangeHandler()}
        required
      />
      <label htmlFor="telephoneNumberRegister" className="form-label">
        Telephone Number
      </label>
      <input
        id="telephoneNumberRegister"
        name="telephoneNumber"
        className="form-control mb-3"
        type="text"
        value={formState.telephoneNumber}
        onChange={textChangeHandler()}
        required
      />
      <label htmlFor="peselRegister" className="form-label">
        Pesel
      </label>
      <input
        id="peselRegister"
        name="pesel"
        className="form-control mb-3"
        type="text"
        value={formState.pesel}
        onChange={textChangeHandler()}
        required
      />
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="sex"
          id="femaleRegister"
          value="FEMALE"
          onChange={textChangeHandler()}
        />
        <label htmlFor="femaleRegister" className="form-check-label">
          Female
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="sex"
          id="maleRegister"
          value="MALE"
          onChange={textChangeHandler()}
          checked
        />
        <label htmlFor="maleRegister" className="form-check-label">
          Male
        </label>
      </div>
      <div className="d-grid gap-2">
        <Button className={isFormValid && emailColor === "green" ? "" : "disabled"} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
