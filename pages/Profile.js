import { FlatList, StyleSheet, Text, View } from 'react-native'
import React,{useState,useCallback} from 'react'
import { Button } from '@rneui/themed'
import { signOutUser } from '../firebase/Session'
import FavoriteItem from '../components/FavoriteItem'
import { useFocusEffect } from '@react-navigation/native'
import { listener,deleteFromDB } from '../firebase/database'
import { APIRequest } from '../utils/API'
import { useNavigation } from '@react-navigation/native'

const Profile = ({token}) => {
  const navigation=useNavigation()
  const [data, setData] = useState([]);
    

    const [notification, setNotification] = useState(null)
    const [favorite, setFavorite] = useState()

    const getData = async () => {
      const data = await APIRequest();
      setData(data);
    };

  useFocusEffect(
    useCallback(() => {

      const unsubscribe = listener(token,setFavorite)
      getData();
      

     return () => unsubscribe();
    }, [])
  );

   

    const handleNotification = (coin) => {
        console.log(coin)
        setNotification(coin)
    }

    const handleRemove = (coin) => {
        console.log(coin)
        deleteFromDB(coin.id,token)
    }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Perfil</Text>
    <Text style={styles.subtitle}>Favoritos</Text>
    <FlatList
    alwaysBounceVertical ={false}
    contentContainerStyle={styles.list}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => <FavoriteItem remove={handleRemove} notify={handleNotification} coin={item}   />}
    data={data.filter(coin=>Object.keys(favorite).includes(coin.id))}
    scrollEnabled={true}
    nestedScrollEnabled 
    ></FlatList>
           <Button onPress={()=>{signOutUser(),navigation.replace("Login")}} title="Cerrar session"></Button>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor: "#112A40",
    
    
},
title:{
    marginVertical:20,
    marginLeft:10,
    color:"#fff",
    fontSize:32,

},
subtitle:{
    marginLeft:10,
    color:"#fff",
    fontSize:20,
    marginBottom:10
},
list:{
    
    width: "100%",
   // height:"80%"
}
})