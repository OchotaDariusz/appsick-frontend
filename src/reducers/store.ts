import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthObject } from "../general/types";

export const userDetailsTemplate: AuthObject = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  role: "PATIENT",
  patientId: null,
  doctorId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: userDetailsTemplate,
  reducers: {
    /* eslint-disable no-param-reassign */
    login: (state, action: PayloadAction<AuthObject>) => {
      state.patientId = action.payload.patientId;
      state.doctorId = action.payload.doctorId;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.patientId = userDetailsTemplate.patientId;
      state.doctorId = userDetailsTemplate.doctorId;
      state.id = userDetailsTemplate.id;
      state.email = userDetailsTemplate.email;
      state.firstName = userDetailsTemplate.firstName;
      state.lastName = userDetailsTemplate.lastName;
      state.patientId = userDetailsTemplate.patientId;
      state.doctorId = userDetailsTemplate.doctorId;
      state.role = userDetailsTemplate.role;
    },
    /* eslint-enable no-param-reassign */
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (rootState: RootState) => rootState.auth;

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state: { auth: AuthObject }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();

const store = configureStore({
  preloadedState: peristedState,
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
