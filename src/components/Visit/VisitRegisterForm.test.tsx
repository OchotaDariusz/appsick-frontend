import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import VisitRegisterForm from "./VisitRegisterForm";

describe("VisitRegisterForm", () => {
  it("Renders Visit Register Form", () => {
    // ARRANGE
    render(<VisitRegisterForm />);
    // ACT
    // EXPECT
    expect(screen.getByText("What kind of service do you require?:")).toBeVisible();
  });
});
