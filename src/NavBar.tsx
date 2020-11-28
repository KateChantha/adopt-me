import React, { FunctionComponent, useContext } from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import color from "./color";
import ThemeContext from "./ThemeContext";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;


const NavBar:FunctionComponent = () => { 
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div>
      <header
      css={css`
        background-color: ${color.dark};
        padding: 1rem;
      `}
      >
        <Link to="/">Adopt Me!</Link>
      </header>

      <div className="theme-container">
          <input 
            id="peru"
            type="radio"
            name="theme-color"
            value="peru"
            checked={theme === "peru"}
            onChange={e => setTheme(e.target.value)}
          />
          <label htmlFor="peru" />
          <input 
            id="darkblue"
            type="radio"
            name="theme-color"
            value="darkblue"
            checked={theme === "darkblue"}
            onChange={e => setTheme(e.target.value)}
          />
          <label htmlFor="darkblue" />
        </div>
    </div>
    

    
  );
} 

export default NavBar;