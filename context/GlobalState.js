import React, { useReducer } from "react";

import GlobalContext from "./GlobalContext";
import GlobalReducer from "./GlobalReducer";

import { GET_COINS,GET_FAVORITES,GET_TOKEN } from "./types";
import { APIRequest } from "../utils/API";

const GlobalState = (props) => {
  const initialState = {
    token:null,
    coins: [],
    favorites: {},
  };

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const getCoins = async () => {
    try {
     const res = await APIRequest();
      dispatch({ type: GET_COINS, payload:res });
    } catch (error) {
      console.error(error);
    }
  };

  const getFavorites =  (data) => {
    try {
     
      dispatch({ type: GET_FAVORITES, payload:data });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <GlobalContext.Provider
      value={{
        token:state.token,
        coins: state.coins,
        favorites: state.favorites,
        getCoins,
        getFavorites
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;