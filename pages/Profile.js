import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { Button } from "@rneui/themed";
import { signOutUser } from "../firebase/Session";
import FavoriteItem from "../components/FavoriteItem";
import { deleteFromDB } from "../firebase/database";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../context/GlobalContext";

const Profile = ({  }) => {
  const navigation = useNavigation();

  const [notification, setNotification] = useState(null);

  const { deleteFav,deleteFavorite,favorites, coins,token } = useContext(GlobalContext);

  const handleNotification = (coin) => {
    console.log(coin);
    setNotification(coin);
  };

  const handleRemove = (coin) => {
    deleteFromDB(coin.id, token.uid)
    deleteFavorite(!deleteFav)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Favoritos</Text>
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
          signOutUser()// navigation.replace("Login");
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
    backgroundColor: "#112A40",
  },
  title: {
    marginVertical: 20,
    marginLeft: 10,
    color: "#fff",
    fontSize: 32,
  },
  subtitle: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  list: {
    width: "100%",
   
  },
});
