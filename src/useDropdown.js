import React, { useState } from "react";

/**
 * @desc custom hook to create a dropdown component
 */
const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  // from label, take space out off string and make it lowercase
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  // Generic dropdown component
  const Dropdown = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        // value={state} // not sure why we need value attribute in<select>, thought we get e.target.value out of value of <option>
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={!options.length}
      >
        <option>All</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
};

export default useDropdown;
