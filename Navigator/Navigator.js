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


const Stack = createNativeStackNavigator();

const Navigator = () => {
    const {  token } = useContext(GlobalContext);

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
                <Stack.Screen
                  options={({ route, navigation }) => ({
                    title: "CryptoApp",
                    headerTitleStyle: { color: "#fff", fontSize: 26 },
                    headerShown: true,
                    headerStyle: { backgroundColor: "#112A40" },
                    headerRight: () => (
                      <Button
                        buttonStyle={{ backgroundColor: "#000", width: 50 }}
                        onPress={() => navigation.navigate("Profile")}
                        title="Info"
                        color="#fff"
                      >
                        <Icon name="user" type="feather" color="#fff" />
                      </Button>
                    ),
                  })}
                  name="Home"
                >
                  {(props) => <Homescreen token={token.uid} />}
                </Stack.Screen>
                <Stack.Screen name="Detail" component={Coindetail} />

                <Stack.Screen name="Profile">
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
  </>
  )
}

export default Navigator