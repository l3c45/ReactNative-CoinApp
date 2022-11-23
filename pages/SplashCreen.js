import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import coin from "../assets/splash.gif"

const SplashCreen = () => {
  return (
    <View style={styles.background}>
    <Image style={styles.img} source={coin} ></Image>
     
    </View>
  )
}

export default SplashCreen

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#112A40"
    },
    img:{
        width:300,
        height:300,
    }
})