import { RegisterRequest } from "../general/types";
import ACTION from "./actions";

interface FormAction {
  type: ACTION;
  field: string;
  payload: string | Date;
}

const userRegFormReducer = (state: RegisterRequest, action: FormAction) => {
  switch (action.type) {
    case ACTION.GET_TEXT:
      return {
        ...state,
        [action.field as string]: action.payload,
      };
    case ACTION.GET_DATE:
      return {
        ...state,
        [action.field as string]: action.payload,
      };
    default:
      return state;
  }
};

export default userRegFormReducer;
