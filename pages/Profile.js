import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { signOutUser } from "../firebase/Session";
import { deleteFromDB, listener } from "../firebase/database";
import { useNavigation,useTheme } from "@react-navigation/native";
import GlobalContext from "../context/GlobalContext";
import ThemeContext  from "../context/ThemeContext/ThemeContext";
import FavoriteItem from "../components/FavoriteItem";
import { Button,Switch } from "@rneui/themed";

const Profile = () => {

  const navigation = useNavigation();

  const [notification, setNotification] = useState(null);
  const [remove, setRemove] = useState(false);
  const [toggle, setToggle] = useState(false)

  const { getFavorites,  favorites, coins, token } =
    useContext(GlobalContext);
    const { theme,setTheme} =
    useContext(ThemeContext);

  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = listener(token.uid, getFavorites);
    return () => unsubscribe();
  }, [remove]);

  const handleNotification = (coin) => {
    console.log(coin);
    setNotification(coin);
  };

  const handleRemove = (coin) => {
    deleteFromDB(coin.id, token.uid);
    setRemove(!remove);
  };

  const handleTheme = () => {
    setToggle((toggle)=>!toggle)
    setTheme(theme == "Light" ? "Dark" : "Light");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Switch
        style={styles.switch}
        value={toggle}
        onValueChange={() => handleTheme()}
      />

      <Text style={[styles.title, { color: colors.text }]}>Perfil</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>Favoritos</Text>

      <FlatList
        alwaysBounceVertical={false}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FavoriteItem
            remove={handleRemove}
            notify={handleNotification}
            coin={item}
          />
        )}
        data={coins.filter((coin) => Object.keys(favorites).includes(coin.id))}
        scrollEnabled={true}
        nestedScrollEnabled
      ></FlatList>
      <Button
        onPress={() => {
          signOutUser(); // navigation.replace("Login");
        }}
        title="Cerrar session"
      ></Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginVertical: 20,
    marginLeft: 10,
    fontSize: 32,
  },
  subtitle: {
    marginLeft: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  list: {
    width: "100%",
  },
  switch: {
    position: "absolute",
    right: 20,
    top: 40,
  },
});
