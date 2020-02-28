import React from "react";
import { render } from "@testing-library/react";
import AppHeader from "./ui/AppHeader";

test("renders WeChain in header", () => {
  const { getByText } = render(<AppHeader />);
  const titleElm = getByText(/WeChain/i);
  expect(titleElm).toBeInTheDocument();
});
