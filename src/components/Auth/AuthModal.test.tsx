import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import store from "../../reducers/store";
import AuthModal from "./AuthModal";

describe("AuthModal", () => {
  it("Renders Login button", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthModal />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByText("Login")).toBeVisible();
  });
  it("Renders Register button", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthModal />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByText("Register")).toBeVisible();
  });
});
