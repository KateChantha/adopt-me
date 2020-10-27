import React, { FunctionComponent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * BENEFIT: benefit of this modal to not get memory leaks by judt keep adding element to dom
 * TRADE OFF: It's not really accessibel and complicated to make it accessible
 * TODO: googole on how to trap focus in the Modal to make it accessible
 */
const Modal: FunctionComponent = ({ children }) => {
  // -------------------------------------
  // Typescript Error: elRef.current--> React.MutableRefObject<null>.current: null
  // Type 'HTMLDivElement' is not assignable to type 'null'
  // -------------------------------------
  /*
  // useRef to refer the same dom element across render 
  // when we keep render and re-render dom
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    // elRef will always kee p refrerence to this div
    elRef.current = div;
  } 
  */
  /**** refactor ****/
  // FIX solution: assign elRef with value instead of null
  const elRef = useRef(document.createElement("div"));
  
  // -------------------------------------
  // Typescript Error: const modalRoot --> Object is possibly 'null'. 
  // -------------------------------------
  /**
   * if "modal" doesn't exist, modalRool will be null
   * that will cause modalRoot.appendChild() an error
  
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

  // Typescript Error:Type '(() => HTMLDivElement) | undefined' is not assignable to type 'void | (() => void | undefined)' //
    return () => modalRoot.removeChild(elRef.current);
  },[]);
   */
  /**** refactor ****/
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    // FIX solution: return if no modalroot
    if (!modalRoot) return;
    modalRoot.appendChild(elRef.current);

    // return componentWillUnMout - clean up function
    // only run this function when Modal get closed
    // FIX solution: use bracket to so it return nothing(void) instead of return undefined
    return () => {
      modalRoot.removeChild(elRef.current)
    };
  },[]);

  // Using createPotal, this Modal is getting rendered to a differnt part of the DOM
  return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal;