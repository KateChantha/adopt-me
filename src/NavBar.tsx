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
      <span 
        role="img" 
        aria-label="logo"
        css={css`
        font-size: 4rem;

        &:hover {
          text-decoration: underline;
          display: inline-block;
          animation: 1s ${spin} linear infinite;
        }
        `}
      >🐥</span>
    </header>
  );
} 

export default NavBar;