import { LoginRequest } from "../general/types";
import ACTION from "./actions";

interface FormAction {
  type: ACTION;
  field: string;
  payload: string;
}

const userLoginFormReducer = (state: LoginRequest, action: FormAction) => {
  switch (action.type) {
    case ACTION.GET_TEXT:
      return {
        ...state,
        [action.field as string]: action.payload,
      };
    default:
      return state;
  }
};

export default userLoginFormReducer;
