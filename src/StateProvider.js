import React, { createContext, useContext, useReducer } from "react";

//Prepare the data layer
export const StateContext = createContext();

//Allow all components to acces the context ( Wrapper)
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull the information from data layer
export const useStateValue = () => useContext(StateContext);
