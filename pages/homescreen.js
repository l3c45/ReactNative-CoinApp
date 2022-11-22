import { StatusBar } from "expo-status-bar";
import {
  Button,
  Keyboard,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { APIRequest } from "../utils/API";
import { useEffect, useState, useCallback } from "react";
import Item from "../components/Item";
import { signOutUser } from "../firebase/Session";
import { Icon, Avatar } from "@rneui/base";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  deleteFromDB,
  getFromDBandSet,
  listener,
  saveInDB,
} from "../firebase/database";

export default function Homescreen({ token }) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const [favorite, setFavorite] = useState({});

  const getData = async () => {
    const data = await APIRequest();
    setData(data);
  };

  useFocusEffect(
    useCallback(() => {

      getData();
      const unsubscribe = listener(token,setFavorite)
     
      

      return () => unsubscribe();
    }, [])
  );

  const handleFavorite = (data) => {
    getFromDBandSet(token, data.id)
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
        data={data.filter((data) =>
          data.name.toLowerCase().includes(searchTerm)
        )}
        refreshing={update}
        renderItem={({ item }) => (
          <Item bgColor={() => "#fff"} coin={item} favorite={handleFavorite}  />
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
});
