import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("Renders Login Form", () => {
    // ARRANGE
    render(<LoginForm />);
    // ACT
    // EXPECT
    expect(screen.getByText("Email")).toBeVisible();
  });
  it("Renders Login Form buttons", () => {
    // ARRANGE
    render(<LoginForm />);
    // ACT
    // EXPECT
    expect(screen.getByRole("button")).toBeVisible();
  });
});
