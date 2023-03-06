import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import VisitRegisterForm from "./VisitRegisterForm";
import store from "../../reducers/store";

describe("VisitRegisterForm", () => {
  it("Renders Visit Register Form", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VisitRegisterForm />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByText("What kind of service do you require?:")).toBeVisible();
  });
  it("Renders Visit Register Form buttons", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VisitRegisterForm />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByRole("button")).toHaveTextContent("Register");
  });
});
