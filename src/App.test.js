// import { render } from "@testing-library/react";
import App from "./App";
import { shallow } from "enzyme";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
test("app is working correctly", () => {
  const component = shallow(<App />);
  const childComponent = component.find("Header").exists();
  expect(childComponent).toBe(true);
});
