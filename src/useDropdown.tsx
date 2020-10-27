import React, { useState, FunctionComponent, Dispatch } from "react";

/**
 * @desc custom hook to create a dropdown component
 */
const useDropdown = (label: string, defaultState: string, options: string[]) => {
  const [state, setState] = useState(defaultState);
  // from label, take space out off string and make it lowercase
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  // Generic dropdown component
  const Dropdown: FunctionComponent = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state} /** must  */
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

  return [state, Dropdown, setState] as [
    string,
    FunctionComponent,
    Dispatch<string>
  ];
};

export default useDropdown;
