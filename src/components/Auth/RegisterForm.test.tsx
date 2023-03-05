import React from "react";
import { BrowserRouter } from "react-router-dom";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  it("Renders Register Form", () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    // ACT
    // EXPECT
    expect(screen.getByText("First Name")).toBeVisible();
  });
  it("Renders Register button", () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
    // ACT
    // EXPECT
    expect(screen.getByRole("button")).toBeVisible();
  });
});
