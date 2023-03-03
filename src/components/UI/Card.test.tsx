import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Card from "./Card";

describe("Card", () => {
  it("Renders Card", () => {
    // ARRANGE
    render(<Card>Test</Card>);
    // ACT
    // EXPECT
    expect(screen.getByText("Test")).toBeVisible();
  });
});
