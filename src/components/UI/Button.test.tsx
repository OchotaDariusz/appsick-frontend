import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("Renders Button", () => {
    // ARRANGE
    render(<Button>Test</Button>);
    // ACT
    // EXPECT
    expect(screen.getByRole("button")).toBeVisible();
  });
});
