import Homescreen from "./pages/homescreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Coindetail from "./pages/coindetail";
import { StatusBar } from "react-native";
import Login from "./pages/login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
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
import { Button,Icon } from "@rneui/themed";
import GlobalState from "./context/GlobalState";

import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState({ loading: true, token: false ,uid:null});

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("session  " + uid);
        setToken({ loading: false, token: true ,uid:uid });
      } else {
        setToken({ loading: false, token: false ,uid:null});
      }
    });

    return unsuscribe;
  }, []);

  return (
    <GlobalState>
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
                  <Stack.Screen
                    options={({route,navigation})=> (
                      {
                      title: "CryptoApp",
                      headerTitleStyle:{color:"#fff",fontSize:26},
                      headerShown: true,
                      headerStyle: { backgroundColor: "#112A40" },
                      headerRight: () => (
                        <Button
                          buttonStyle={{  backgroundColor:"#000",width:50}}
                          onPress={() => navigation.navigate("Profile") }
                          title="Info"
                          color="#fff"
                        >
                          
                          <Icon
                       
                            name="user"
                            type="feather"
                            color="#fff"
                          
                          />
                        </Button>
                      ),
                    }
                    )}
                    name="Home"
                    
                  >
 {(props) => <Homescreen token={token.uid} />}
                  </Stack.Screen>
                  <Stack.Screen name="Detail" component={Coindetail} />

                  <Stack.Screen name="Profile"  >

                  {(props) => <Profile token={token.uid} />}
                  </Stack.Screen>

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
    </GlobalState>
  );
}
