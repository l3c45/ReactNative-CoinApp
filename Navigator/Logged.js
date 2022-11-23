import Homescreen from "../pages/homescreen";
import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Coindetail from "../pages/coindetail";
import Profile from "../pages/Profile";
import { Button, Icon } from "@rneui/themed";

const Stack = createNativeStackNavigator();

const Logged = () => {

    
const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={({ route, navigation }) => ({
          title: "CryptoApp",
          headerTitleStyle: { color: colors.text, fontSize: 26 },
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
    </Stack.Navigator>
  );
};

export default Logged;
