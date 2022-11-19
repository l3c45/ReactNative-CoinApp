import Homescreen from "./pages/homescreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Coindetail from "./pages/coindetail";
import { StatusBar } from "react-native";
import Login from "./pages/login";
import Register from "./pages/Register";
import { isLogged, signOutUser } from "./firebase/Session";
import { useState, useEffect } from "react";
import { addMethod } from "yup";
import { auth } from "./firebase/Config";
import {
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {


  const [token, setToken] = useState({ loading: true, token: false });

  useEffect(() => {
    
  const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("session  " + uid);
        setToken({ loading: false, token: true });
      } else {
        setToken({ loading: false, token: false });
      }
    });

return unsuscribe
    
  }, []);

 
  return (
    <>
      {token.loading ? (
        <Text>Loading </Text>
      ) : (
        <>
          <StatusBar></StatusBar>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              {token.token ? (
                <>
                  <Stack.Screen name="Home" component={Homescreen} />
                  <Stack.Screen name="Detail" component={Coindetail} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="Home" component={Homescreen} />
                  <Stack.Screen name="Detail" component={Coindetail} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
}
