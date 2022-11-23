import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import GlobalContext from "../context/GlobalContext";
import SplashCreen from "../pages/SplashCreen";
import { DarkTheme, LightTheme } from "../Theme/Theme";
import MyStack from "./MyStack";

const Navigator = () => {

  const { token ,theme} = useContext(GlobalContext);
  
  return (
    <>
      {token.loading ? 
        <SplashCreen></SplashCreen>
       : 
        <>
          <StatusBar></StatusBar>
          <NavigationContainer  theme={theme == 'Light' ? LightTheme : DarkTheme}>
            <MyStack></MyStack>
          </NavigationContainer>
        </>
      }
    </>
  );
};

export default Navigator;
