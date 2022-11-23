import React, { useReducer } from "react";
import ThemeContext from "./ThemeContext";
import ThemeReducer from "./ThemeReducer";
import { SET_THEME } from "../types";

const ThemeState = (props) => {
  const initialState = {
    theme:'Dark'
  };

  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  const setTheme =  (value) => {
   
    dispatch({ type: SET_THEME, payload:value });
  
};

  return (
    <ThemeContext.Provider
      value={{
        theme:state.theme,
        setTheme
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;