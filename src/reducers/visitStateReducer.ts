import ACTION from "./actions";
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Action {
  type: ACTION;
  field: string;
  payload: any;
}

const visitStateReducer = (state: any, action: Action) => {
  switch (action.type) {
    case ACTION.GET_VALUE:
      return {
        ...state,
        [action.field as string]: action.payload,
      };
    default:
      return state;
  }
};
/* eslint-enable @typescript-eslint/no-explicit-any */
export default visitStateReducer;
