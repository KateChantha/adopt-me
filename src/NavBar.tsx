import React, { FunctionComponent } from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import color from "./color";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;


const NavBar:FunctionComponent = () => { 
  return (
    <header
      css={css`
        background-color: ${color.dark};
        padding: 1rem;
      `}
    >
      <Link to="/">Adopt Me!</Link>
    </header>
  );
} 

export default NavBar;