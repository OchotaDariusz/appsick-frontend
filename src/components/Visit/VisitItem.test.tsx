import React from "react";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import VisitItem from "./VisitItem";
import visitList from "../../mocks/dummyVisit";
import { formatVisitDate } from "../../general/utils";

describe("VisitItem", () => {
  it("Renders VisitItem without visit", () => {
    // ARRANGE
    render(<VisitItem visit={null} />);
    // ACT
    // EXPECT
    expect(screen.getByText("Visit does not exists.")).toBeVisible();
  });
  it("Renders VisitItem with dummy visit", () => {
    // ARRANGE
    render(<VisitItem visit={formatVisitDate(visitList[0])} />);
    // ACT
    // EXPECT
    expect(screen.getByText("Joanna Kłeczek")).toBeVisible();
  });
});
