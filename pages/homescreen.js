import {
  Keyboard,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useContext, useState, useCallback,useEffect } from "react";
import Item from "../components/Item";
import { Icon } from "@rneui/base";
import { useNavigation, useTheme } from "@react-navigation/native";
import { getFromDBandSet, listener } from "../firebase/database";
import GlobalContext from "../context/GlobalContext";


export default function Homescreen() {

  const navigation = useNavigation();

  const [update, setUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);

  const {  token, favorites, coins, getCoins, getFavorites } =
    useContext(GlobalContext);
   
    const { colors } = useTheme();

useEffect(() => {
         getCoins()
        const unsubscribe = listener(token.uid, getFavorites);
        //signOutUser()
        console.log("home")
        return () => unsubscribe(),console.log("fin homel")
      }, [])


  const handleFavorite = (data) => {
    getFromDBandSet(token.uid, data.id);
  };

  const handeTextInput = (input) => {
    setSearchTerm(input.toLowerCase());
  };

  return (
    <View style={[styles.container,{backgroundColor: colors.background },]}>
      <View style={styles.header}>
        <Text style={[styles.title,{color: colors.text }]}></Text>
        {search ? (
          <TextInput
            onBlur={(e) => setSearch(false)}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={(text) => handeTextInput(text)}
            placeholderTextColor={"#A4B3BF"}
            placeholder="Search"
            style={[styles.textInput,{color: colors.text}]}
            autoFocus={true}
            maxLength={20}
          ></TextInput>
        ) : (
          <Icon
            color={colors.text}
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
     overScrollMode="never"
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
            favoriteStyle={favorites &&
             ( Object.keys(favorites).includes(item.id)
                ? styles.favoriteStyle
                : null)
            }
            coin={item}
            favorite={handleFavorite}
          />
        )}
        onRefresh={async () => {
          setUpdate(true);
          await  getCoins();
          setUpdate(false);
        }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
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
    fontSize: 20,
  },
  favoriteStyle: {
    borderColor: "gold",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderStartColor: "#b0a310",
  },
});
