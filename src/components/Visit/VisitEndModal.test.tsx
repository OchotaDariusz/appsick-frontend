import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import VisitEndModal from "./VisitEndModal";

describe("VisitEndModal", () => {
  it("Renders Visit End Modal", () => {
    // ARRANGE
    render(<VisitEndModal />);
    // ACT
    // EXPECT
    expect(screen.getByText("Weight")).toBeVisible();
  });
});
