import React, { useReducer } from "react";
import Button from "../UI/Button/Button";
import { LoginRequest } from "../../general/types";
import ACTION from "../../reducers/actions";
import userLoginFormReducer from "../../reducers/userLoginFormReducer";
import { postLoginData } from "../../general/dataManager";

const initialLoginFormState: LoginRequest = {
  email: "",
  password: "",
};

function LoginForm() {
  const [formState, dispatch] = useReducer(userLoginFormReducer, initialLoginFormState);

  const handleTextChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: ACTION.GET_TEXT,
      field: (e.target as HTMLInputElement | HTMLTextAreaElement).name,
      payload: (e.target as HTMLInputElement | HTMLTextAreaElement).value,
    });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
    postLoginData(formState)
      .then((data) => {
        console.log("Logged in");
        console.log(data);
      })
      .catch((err) => console.error(err));
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
        onChange={(e) => handleTextChange(e)}
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
        onChange={(e) => handleTextChange(e)}
        required
      />
      <div className="d-grid gap-2">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

export default LoginForm;
