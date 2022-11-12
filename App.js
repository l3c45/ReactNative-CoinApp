import Homescreen from "./pages/homescreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Coindetail from "./pages/coindetail";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar></StatusBar>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Homescreen} />
          <Stack.Screen name="Detail" component={Coindetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
