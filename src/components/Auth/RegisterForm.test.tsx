import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  it("Renders Register Form", () => {
    // ARRANGE
    render(<RegisterForm />);
    // ACT
    // EXPECT
    expect(screen.getByText("First Name")).toBeVisible();
  });
  it("Renders Register button", () => {
    // ARRANGE
    render(<RegisterForm />);
    // ACT
    // EXPECT
    expect(screen.getByRole("button")).toBeVisible();
  });
});
