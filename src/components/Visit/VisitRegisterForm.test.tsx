import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import VisitRegisterForm from "./VisitRegisterForm";

describe("VisitRegisterForm", () => {
  it("Renders Visit Register Form", () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <VisitRegisterForm />
      </BrowserRouter>
    );
    // ACT
    // EXPECT
    expect(screen.getByText("What kind of service do you require?:")).toBeVisible();
  });
  it("Renders Visit Register Form buttons", () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <VisitRegisterForm />
      </BrowserRouter>
    );
    // ACT
    // EXPECT
    expect(screen.getByRole("button")).toHaveTextContent("Register");
  });
});
