import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { APIRequest } from "./utils/API";
import { useEffect, useState } from "react";
import Item from "./components/Item";

import { Icon } from "@rneui/base";

export default function App() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);

  const getData = async () => {
    const data = await APIRequest();
    setData(data);
  };

  useEffect(() => {
    getData();
    
  }, []);

  const handeTextInput = (input) => {
    setSearchTerm(input.toLowerCase());
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>CryptoApp</Text>
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
        style={styles.list}
        data={data.filter((data) =>
          data.name.toLowerCase().includes(searchTerm)
        )}
        refreshing={update}
        renderItem={({ item }) => <Item coin={item} />}
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
    paddingTop: 30,
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
