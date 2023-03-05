import { VisitRegisterRequest } from "../general/types";
import ACTION from "./actions";

interface FormAction {
  type: ACTION;
  field: string;
  payload: string | number;
}

const visitRegFormReducer = (state: VisitRegisterRequest, action: FormAction) => {
  switch (action.type) {
    case ACTION.GET_TEXT:
      return {
        ...state,
        [action.field as string]: action.payload,
      };
    case ACTION.GET_NUMBER:
      return {
        ...state,
        [action.field as string]: +action.payload,
      };
    default:
      return state;
  }
};

export default visitRegFormReducer;
