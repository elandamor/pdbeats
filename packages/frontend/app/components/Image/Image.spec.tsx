// Image.spec.tsx
import * as React from "react";
import { cleanup, render } from "react-testing-library";
import { ThemeProvider } from "styled-components";

import Image from "./index";
import { THEME } from "../../global-styles";

afterEach(cleanup);

describe("Image", () => {
  it("should render an image", () => {
    render(
      <ThemeProvider theme={THEME}>
        <Image src="../../images/icon-512x512.png" />
      </ThemeProvider>
    );
  });
});
