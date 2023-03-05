import React, { useReducer } from "react";
import Button from "../UI/Button/Button";
import { RegisterRequest } from "../../general/types";
import ACTION from "../../reducers/actions";
import userRegFormReducer from "../../reducers/userRegFormReducer";

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

  const handleTextChange = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: ACTION.GET_TEXT,
      field: (e.target as HTMLInputElement | HTMLTextAreaElement).name,
      payload: (e.target as HTMLInputElement | HTMLTextAreaElement).value,
    });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        id="email"
        name="email"
        className="form-control mb-3"
        type="email"
        value={formState.email}
        onChange={(e) => handleTextChange(e)}
        required
      />
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        id="password"
        name="password"
        className="form-control mb-3"
        type="password"
        value={formState.password}
        onChange={(e) => handleTextChange(e)}
        required
      />
      <label htmlFor="firstName" className="form-label">
        First Name
      </label>
      <input
        id="firstName"
        name="firstName"
        className="form-control mb-3"
        type="text"
        value={formState.firstName}
        onChange={(e) => handleTextChange(e)}
        required
      />
      <label htmlFor="lastName" className="form-label">
        Last Name
      </label>
      <input
        id="lastName"
        name="lastName"
        className="form-control mb-3"
        type="text"
        value={formState.lastName}
        onChange={(e) => handleTextChange(e)}
        required
      />
      <label htmlFor="birthDate" className="form-label">
        Birth Date
      </label>
      <input
        id="birthDate"
        name="birthDate"
        className="form-control mb-3"
        type="date"
        value={formState.birthDate as string}
        onChange={(e) => handleTextChange(e)}
        required
      />
      <label htmlFor="telephoneNumber" className="form-label">
        Telephone Number
      </label>
      <input
        id="telephoneNumber"
        name="telephoneNumber"
        className="form-control mb-3"
        type="text"
        value={formState.telephoneNumber}
        onChange={(e) => handleTextChange(e)}
        required
      />
      <label htmlFor="pesel" className="form-label">
        Pesel
      </label>
      <input
        id="pesel"
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
          id="female"
          value="FEMALE"
          onChange={(e) => handleTextChange(e)}
        />
        <label htmlFor="female" className="form-check-label">
          Female
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="sex"
          id="male"
          value="MALE"
          onChange={(e) => handleTextChange(e)}
          checked
        />
        <label htmlFor="male" className="form-check-label">
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
