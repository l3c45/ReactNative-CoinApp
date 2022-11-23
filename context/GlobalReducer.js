import {  GET_COINS, GET_FAVORITES,GET_TOKEN, SET_THEME } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_COINS:
      return {
        ...state,
        coins: payload,
      };
      case GET_FAVORITES:
      return {
        ...state,
        favorites: payload,
      };
      case GET_TOKEN:
        return {
          ...state,
          token: payload,
        };
        
          case SET_THEME:
            return {
              ...state,
              theme: payload,
            };
          
    default:
      return state;
  }
};