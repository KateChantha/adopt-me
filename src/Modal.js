import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * BENEFIT: benefit of this modal to not get memory leaks by judt keep adding element to dom
 * TRADE OFF: It's not really accessibel and complicated to make it accessible
 * TODO: googole on how to trap focus in the Modal to make it accessible
 */
const Modal = ({ children }) => {
  // useRef to refer the same dom element across render when we keep render and re-render dom
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    // elRef will always kee p refrerence to this div
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // return componentWillUnMout - clean up function
    // only run this function when Modal get closed
    return () => modalRoot.removeChild(elRef.current);
  })

  // Using createPotal, this Modal is getting rendered to a differnt part of the DOM
  return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal;