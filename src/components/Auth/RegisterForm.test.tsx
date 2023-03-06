import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import RegisterForm from "./RegisterForm";
import store from "../../reducers/store";

describe("RegisterForm", () => {
  it("Renders Register Form", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByText("First Name")).toBeVisible();
  });
  it("Renders Register button", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByRole("button")).toBeVisible();
  });
});
