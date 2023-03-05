import { UserDetails } from "../general/types";
import ACTION from "./actions";

export const userDetailsTemplate: Partial<UserDetails> = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  role: "PATIENT",
};

interface AuthAction {
  type: ACTION;
  payload: Partial<UserDetails>;
}

const authReducer = (state: Partial<UserDetails>, action: AuthAction) => {
  switch (action.type) {
    case ACTION.AUTH:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

export default authReducer;
