import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import VisitEndModal from "./VisitEndModal";
import store from "../../reducers/store";

describe("VisitEndModal", () => {
  it("Renders Visit End Modal", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VisitEndModal visitId={1} />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByText("Weight")).toBeVisible();
  });
});
