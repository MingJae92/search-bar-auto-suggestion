import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Searchbar from "./Searchbar";
import axios from "axios";

// Mock the axios module
jest.mock("axios");

const mockProducts = [
  { id: 1, title: "Product 1", description: "Description of Product 1" },
  { id: 2, title: "Product 2", description: "Description of Product 2" },
  { id: 3, title: "Another Product", description: "Description of Another Product" },
];

describe("Searchbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input field", () => {
    render(<Searchbar />);
    const inputElement = screen.getByLabelText(/search products/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("fetches and displays suggestions based on user input", async () => {
    axios.get.mockResolvedValue({ data: mockProducts });

    render(<Searchbar />);

    const inputElement = screen.getByLabelText(/search products/i);
    fireEvent.change(inputElement, { target: { value: "Product" } });

    await waitFor(() => {
      const suggestions = screen.getAllByRole("listitem");
      expect(suggestions).toHaveLength(3); // Two matching products
    });
  });

  it("updates the selected product when a suggestion is clicked", async () => {
    axios.get.mockResolvedValue({ data: mockProducts });

    render(<Searchbar />);

    const inputElement = screen.getByLabelText(/search products/i);
    fireEvent.change(inputElement, { target: { value: "Product 1" } });

    await waitFor(() => {
      const suggestion = screen.getByText("Product 1");
      fireEvent.click(suggestion);
    });

    const selectedTitle = screen.getByText("Product 1");
    const selectedDescription = screen.getByText("Description of Product 1");

    expect(selectedTitle).toBeInTheDocument();
    expect(selectedDescription).toBeInTheDocument();
  });

  it("closes suggestions when clicking outside the dropdown", async () => {
    axios.get.mockResolvedValue({ data: mockProducts });

    render(
      <div>
        <Searchbar />
        <div data-testid="outside">Outside Area</div>
      </div>
    );

    const inputElement = screen.getByLabelText(/search products/i);
    fireEvent.change(inputElement, { target: { value: "Product" } });

    await waitFor(() => {
      const suggestions = screen.getAllByRole("listitem");
      expect(suggestions).toHaveLength(3);
    });

    const outsideElement = screen.getByTestId("outside");
    fireEvent.mouseDown(outsideElement);

    await waitFor(() => {
      const suggestions = screen.queryAllByRole("listitem");
      expect(suggestions).toHaveLength(0); // Dropdown should be closed
    });
  });
});
