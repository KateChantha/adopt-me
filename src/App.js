import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Luna" animal="Dog" breed="Mixed" />
      <Pet name="Pepper" animal="Cat" breed="Mixed" />
      <Pet name="Waea" animal="Bird" breed="Mixed" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
