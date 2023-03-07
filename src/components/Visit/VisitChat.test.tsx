import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import VisitChat from "./VisitChat";
import store from "../../reducers/store";
import { VisitPageState } from "../../general/types";

const visitPageInitialState: VisitPageState = {
  userId: 0,
  patientId: 0,
  patientName: "",
  doctorId: 0,
  doctorName: "",
  doctorAvatar: "",
  doctorSpeciality: "",
  visitReason: "",
  chatMessage: "",
  chatMessages: [],
};

describe("VisitChat", () => {
  it("Renders Visit Chat", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VisitChat visitState={visitPageInitialState} />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByText("Visit Chat")).toBeVisible();
  });
});
