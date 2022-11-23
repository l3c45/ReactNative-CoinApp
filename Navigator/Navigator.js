import { useContext } from "react";
import Homescreen from "../pages/homescreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Coindetail from "../pages/coindetail";
import { StatusBar } from "react-native";
import Login from "../pages/login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import { Button, Icon } from "@rneui/themed";
import GlobalContext from "../context/GlobalContext";
import { Text } from "react-native";
import SplashCreen from "../pages/SplashCreen";
import { DarkTheme, LightTheme } from "../Theme/Theme";
import MyStack from "./MyStack";


const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { token ,theme} = useContext(GlobalContext);
  
  return (
    <>
      {token.loading ? (
        <SplashCreen></SplashCreen>
      ) : (
        <>
          <StatusBar></StatusBar>
          <NavigationContainer  theme={theme == 'Light' ? LightTheme : DarkTheme}>
            <MyStack></MyStack>
          </NavigationContainer>
        </>
      )}
    </>
  );
};

export default Navigator;
