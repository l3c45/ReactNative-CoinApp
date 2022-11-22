import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View ,Image,StyleSheet, TouchableOpacity} from 'react-native'

const Item = ({coin,favorite,favoriteStyle}) => {

    const navigation = useNavigation();

     //background: rgb(240,222,9);
//background: linear-gradient(90deg, rgba(240,222,9,1) 31%, rgba(2,0,36,0) 100%);
  
    
  return (
    <TouchableOpacity  onLongPress={()=>favorite(coin)} onPress={()=>  navigation.navigate('Detail', { coin })}>
  <View style={styles.itemList} >
    <View style={[styles.logoName,favoriteStyle]}>
        <Image style={styles.logo} source={{uri:coin.image}} ></Image>
        <Text style={[styles.name]} >{coin.name} </Text>
        </View>
   <View style={styles.data} >
        <Text style={styles.price} >{coin.current_price} US$ </Text>
        <Text style={[styles.percentage , coin.price_change_percentage_24h>0 ?styles.up :styles.down]} >{coin.price_change_percentage_24h} </Text>
  </View>
  </View>
</TouchableOpacity>

    

  )
}

const styles= StyleSheet.create({
    logoName:{
        flexDirection:"row", 
        alignItems:"center",
        width:"50%"
    }
   ,
    logo:{
        width:30,
        height:30,
        marginRight:10
    },
    name:{
        
        fontSize: 18,
       color:"#fff"
    },
    itemList:{
        marginVertical:10,
        flexDirection:"row",
        
        justifyContent:"space-between"
    },
    price:{
       
        textAlign:"right",
        color:"#fff"
    },
    percentage:{
       
        textAlign:"right",
        
    },
    data:{
        with:"50%"

    },
    up:{
        color:"green"

    },
    down:{
        color:"red"
    },
})

export default Item