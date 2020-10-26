import React from "react";
import { Link } from "@reach/router";
import { css } from "@emotion/core";
import color from "./color";

const NavBar = () => { 
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
        }
        `}
      >🐥</span>
    </header>
  );
} 

export default NavBar;