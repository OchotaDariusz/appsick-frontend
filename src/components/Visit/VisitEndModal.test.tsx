import React from "react";
import { BrowserRouter } from "react-router-dom";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import VisitEndModal from "./VisitEndModal";

describe("VisitEndModal", () => {
  it("Renders Visit End Modal", () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <VisitEndModal />
      </BrowserRouter>
    );
    // ACT
    // EXPECT
    expect(screen.getByText("Weight")).toBeVisible();
  });
});
