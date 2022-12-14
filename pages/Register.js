import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import RegisterForm from "../components/RegisterForm"

const Register = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <RegisterForm nav={navigation}></RegisterForm>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#081B29",
      }
})