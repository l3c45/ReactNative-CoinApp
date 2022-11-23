import {  GET_COINS, GET_FAVORITES,GET_TOKEN } from "./types";

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
        
    default:
      return state;
  }
};