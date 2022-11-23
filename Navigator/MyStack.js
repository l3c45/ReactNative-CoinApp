import { useContext } from "react";
import Homescreen from "../pages/homescreen";
import { useTheme} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Coindetail from "../pages/coindetail";
import Login from "../pages/login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import { Button, Icon } from "@rneui/themed";
import GlobalContext from "../context/GlobalContext";


const Stack = createNativeStackNavigator();

const MyStack = () => {

  const { colors } = useTheme();
  const { token ,theme} = useContext(GlobalContext);


  return (
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
            headerTitleStyle: {color:colors.text, fontSize: 26 },
            headerShown: true,
            headerStyle: { backgroundColor: colors.background },
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
          component={Homescreen}
        />

        <Stack.Screen name="Detail" component={Coindetail} />
        <Stack.Screen name="Profile" component={Profile} />
      </>
    ) : (
      <>
        <Stack.Screen
          name="Login"
          component={Login}
         
        />
        <Stack.Screen name="Register" component={Register} />
      </>
    )}
  </Stack.Navigator>
  )
}

export default MyStack

