import { FormEventHandler, ReducerAction } from "react";

enum ACTION {
  GET_TEXT,
  GET_NUMBER,
  AUTH,
}

export default ACTION;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleTextChange = (
  dispatch: React.Dispatch<ReducerAction<FormEventHandler> | any>,
  e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  dispatch({
    type: ACTION.GET_TEXT,
    field: (e.target as HTMLInputElement | HTMLTextAreaElement).name,
    payload: (e.target as HTMLInputElement | HTMLTextAreaElement).value,
  });
};

export const handleNumberChange = (
  dispatch: React.Dispatch<ReducerAction<FormEventHandler> | any>,
  e: React.FormEvent<HTMLSelectElement>
) => {
  dispatch({
    type: ACTION.GET_NUMBER,
    field: (e.target as HTMLSelectElement).name,
    payload: (e.target as HTMLSelectElement).value,
  });
};
/* eslint-enable @typescript-eslint/no-explicit-any */
