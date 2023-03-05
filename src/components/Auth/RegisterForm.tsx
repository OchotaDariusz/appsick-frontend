import React, { useReducer } from "react";
import Button from "../UI/Button/Button";
import { RegisterRequest } from "../../general/types";
import ACTION from "../../reducers/actions";
import userRegFormReducer from "../../reducers/userRegFormReducer";
import { postRegisterData } from "../../general/dataManager";

const initialRegisterFormState: RegisterRequest = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  telephoneNumber: "",
  pesel: "",
  sex: "MALE",
};

function RegisterForm() {
  const [formState, dispatch] = useReducer(userRegFormReducer, initialRegisterFormState);

  const handleTextChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: ACTION.GET_TEXT,
      field: (e.target as HTMLInputElement | HTMLTextAreaElement).name,
      payload: (e.target as HTMLInputElement | HTMLTextAreaElement).value,
    });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    postRegisterData(formState)
      .then((data) => {
        console.log("Registered new user");
        console.log(data);
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
        onChange={(e) => handleTextChange(e)}
        required
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
        onChange={(e) => handleTextChange(e)}
        required
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
        onChange={(e) => handleTextChange(e)}
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
        onChange={(e) => handleTextChange(e)}
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
        onChange={(e) => handleTextChange(e)}
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
        onChange={(e) => handleTextChange(e)}
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
        onChange={(e) => handleTextChange(e)}
        required
      />
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="sex"
          id="femaleRegister"
          value="FEMALE"
          onChange={(e) => handleTextChange(e)}
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
          onChange={(e) => handleTextChange(e)}
          checked
        />
        <label htmlFor="maleRegister" className="form-check-label">
          Male
        </label>
      </div>
      <div className="d-grid gap-2">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
