import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MainBody from "./MainBody";

describe("MainBody", () => {
  it("Renders MainBody content", () => {
    // ARRANGE
    render(<MainBody />);
    // ACT
    // EXPECT
    expect(screen.getByText("Welcome to App Sick")).toBeVisible();
  });
});
