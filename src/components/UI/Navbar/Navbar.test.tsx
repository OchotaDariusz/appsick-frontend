import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Navbar from "./Navbar";
import store from "../../../reducers/store";

describe("Navbar", () => {
  it("Renders navbar buttons", () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(screen.getByRole("navigation")).toHaveTextContent("Visits");
  });
});
