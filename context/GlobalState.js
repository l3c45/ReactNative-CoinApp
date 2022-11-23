import React, { useReducer } from "react";

import GlobalContext from "./GlobalContext";
import GlobalReducer from "./GlobalReducer";

import { GET_COINS,GET_FAVORITES,GET_TOKEN,DELETE_FAV } from "./types";
import { APIRequest } from "../utils/API";

const GlobalState = (props) => {
  const initialState = {
    token:{ loading: true, token: false ,uid:null},
    coins: [],
    favorites: {},
    deleteFav:false
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

  const getToken =  (data) => {
    try {
      dispatch({ type: GET_TOKEN, payload:data });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavorite =  (value) => {
   
      dispatch({ type: DELETE_FAV, payload:value });
    
  };


  return (
    <GlobalContext.Provider
      value={{
        token:state.token,
        coins: state.coins,
        favorites: state.favorites,
        deleteFav:state.deleteFav,
        getCoins,
        getFavorites,
        getToken,
        deleteFavorite
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;