import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import jest from "@testing-library/jest-dom";
import Searchbar from "./Searchbar";

describe("Searchbar Component", () => {
  test("renders the Searchbar component", () => {
    render(<Searchbar />);
    expect(screen.getByLabelText("Search Products")).toBeInTheDocument();
  });
});
