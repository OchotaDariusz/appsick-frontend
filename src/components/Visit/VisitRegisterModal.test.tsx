import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import VisitRegisterModal from "./VisitRegisterModal";

describe("VisitRegisterModal", () => {
  it("Renders Visit Register Modal", () => {
    // ARRANGE
    render(<VisitRegisterModal />);
    // ACT
    // EXPECT
    expect(screen.getByText("Reason")).toBeVisible();
  });
});
