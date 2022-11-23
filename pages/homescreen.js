import {
  Keyboard,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useContext, useState, useCallback } from "react";
import Item from "../components/Item";
import { signOutUser } from "../firebase/Session";
import { Icon, Avatar } from "@rneui/base";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getFromDBandSet, listener } from "../firebase/database";

import GlobalContext from "../context/GlobalContext";

export default function Homescreen({ token }) {
  const navigation = useNavigation();

  const [update, setUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);

  const { favorites, coins, getCoins, getFavorites } =
    useContext(GlobalContext);

  useFocusEffect(
    useCallback(() => {
      getCoins();

      const unsubscribe = listener(token, getFavorites);
      //signOutUser()

      return () => unsubscribe();
    }, [])
  );

  const handleFavorite = (data) => {
    getFromDBandSet(token, data.id);
  };

  const handeTextInput = (input) => {
    setSearchTerm(input.toLowerCase());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}></Text>
        {search ? (
          <TextInput
            onBlur={(e) => setSearch(false)}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={(text) => handeTextInput(text)}
            placeholderTextColor={"#A4B3BF"}
            placeholder="Search"
            style={styles.textInput}
            autoFocus={true}
            maxLength={20}
          ></TextInput>
        ) : (
          <Icon
            color="#fff"
            containerStyle={{}}
            disabledStyle={{}}
            iconProps={{}}
            iconStyle={{}}
            name="search"
            onLongPress={() => console.log("onLongPress()")}
            onPress={() => console.log(setSearch(true))}
            size={30}
            type="material"
          ></Icon>
        )}
      </View>

      <FlatList
        keyExtractor={(item) => item.id}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        style={styles.list}
        data={coins.filter((data) =>
          data.name.toLowerCase().includes(searchTerm)
        )}
        refreshing={update}
        renderItem={({ item }) => (
          <Item
            favoriteStyle={
              Object.keys(favorites).includes(item.id)
                ? styles.favoriteStyle
                : null
            }
            coin={item}
            favorite={handleFavorite}
          />
        )}
        onRefresh={async () => {
          setUpdate(true);
          await getData();
          setUpdate(false);
          Alert.alert("updated");
        }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#112A40",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,

    color: "#fff",
  },
  header: {
    paddingTop: 0,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    color: "#fff",
    fontSize: 20,
  },
  favoriteStyle: {
    borderColor: "gold",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderStartColor: "#b0a310",
  },
});
