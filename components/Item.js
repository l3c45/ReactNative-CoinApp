import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View ,Image,StyleSheet, TouchableOpacity} from 'react-native'

const Item = ({coin}) => {

    const navigation = useNavigation();
    
  return (
    <TouchableOpacity onPress={()=>  navigation.navigate('Detail', { coin })}>
  <View style={styles.itemList} >
    <View style={styles.logoName}>
        <Image style={styles.logo} source={{uri:coin.image}} ></Image>
        <Text style={styles.name} >{coin.name} </Text>
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
        
      
        
    },
    logo:{
        width:30,
        height:30,
        marginRight:10
    },
    name:{
        
        fontSize: 22,
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
    

    },
    up:{
        color:"green"

    },
    down:{
        color:"red"
    },
})

export default Item