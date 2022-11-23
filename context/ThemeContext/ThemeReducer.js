import {  SET_THEME } from "../types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
          case SET_THEME:
            return {
              ...state,
              theme: payload,
            };
          
    default:
      return state;
  }
};