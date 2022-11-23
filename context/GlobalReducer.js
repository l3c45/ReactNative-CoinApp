import { GET_COINS, GET_FAVORITES } from "./types";

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
    default:
      return state;
  }
};