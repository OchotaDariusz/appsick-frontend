import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("Renders navbar buttons", () => {
    // ARRANGE
    render(<Navbar />);
    // ACT
    // EXPECT
    expect(screen.getByRole("navigation")).toHaveTextContent("Visits");
  });
});
