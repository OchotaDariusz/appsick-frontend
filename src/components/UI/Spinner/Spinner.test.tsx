import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Spinner from "./Spinner";

describe("Navbar", () => {
  it("Renders navbar buttons", () => {
    // ARRANGE
    render(<Spinner />);
    // ACT
    // EXPECT
    expect(screen.getByRole("status")).toBeVisible();
  });
});
