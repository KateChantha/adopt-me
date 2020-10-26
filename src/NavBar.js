import React from "react";
import { Link } from "@reach/router";
import { css } from "@emotion/core";

const NavBar = () => {
  const primarycolor = "pink";
  
  return (
    <header
      css={css`
        background-color: ${primarycolor};
        padding: 1rem;
      `}
    >
      <Link to="/">Adopt Me!</Link>
      <span 
        role="img" 
        aria-label="logo"
        css={css`font-size: 4rem`}
      >🐥</span>
    </header>
  );
} 

export default NavBar;