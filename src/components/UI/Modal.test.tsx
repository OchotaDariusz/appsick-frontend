import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Modal from "./Modal";

describe("Modal", () => {
  it("Renders Modal", () => {
    // ARRANGE
    render(<Modal />);
    // ACT
    // EXPECT
    expect(screen.getByRole("form", { hidden: true })).toBeVisible();
  });
});
