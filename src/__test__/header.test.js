import { render, screen, cleanup } from "@testing-library/react";
import Header from "../Components/header/header";

afterEach(() => {
  cleanup();
});

test("test", () => {
  render(<Header />);
  const headerElement = screen.getByTestId("header-1");
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent("Luminogics");
});
