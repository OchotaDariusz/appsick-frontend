import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import store from "../../reducers/store";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("Renders Login Form", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByText("Email")).toBeVisible();
  });
  it("Renders Login Form buttons", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByRole("button")).toBeVisible();
  });
});
