import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React ,{useState}from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";

const FavoriteItem = ({ coin, notify ,remove,getFavorites}) => {
  const navigation = useNavigation();

  const [favorite, setFavorite] = useState(getFavorites)
console.log(favorite)
  // const toggleNotification(element)=>{

  //     alert(element)
  // }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemList} onPress={() => navigation.navigate("Detail", { coin })}>
        
          
            <Image style={styles.logo} source={{ uri: coin.image }}></Image>
            <Text style={styles.name}>{coin.name} </Text>
          
      </TouchableOpacity>
      <View style={styles.data}>
        <Icon
          style={styles.up}
          name="trash"
          type="feather"
          color="red"
          onPress={() => remove(coin)}
        />

        <Icon
          style={styles.up}
          name="bell"
          type="feather"
          color="#fff"
          onPress={() => notify(coin)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    
   alignItems:"center",
    flexDirection: "row",
    justifyContent:"space-between"
    
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 22,
    color: "#fff",
  },
  itemList: {
    marginVertical: 10,
    flexDirection: "row",
    paddingLeft: 10,
    
    
  },
  
  data: {
    width:"50%",
    flexDirection: "row",
    justifyContent:"flex-end"
  },
  up: {
    paddingHorizontal: 10,
  },
});

export default FavoriteItem;
