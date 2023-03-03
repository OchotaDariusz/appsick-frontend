import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import AuthModal from "./AuthModal";

describe("AuthModal", () => {
  it("Renders Login button", () => {
    // ARRANGE
    render(<AuthModal />);
    // ACT
    // EXPECT
    expect(screen.getByText("Login")).toBeVisible();
  });
  it("Renders Register button", () => {
    // ARRANGE
    render(<AuthModal />);
    // ACT
    // EXPECT
    expect(screen.getByText("Register")).toBeVisible();
  });
});
