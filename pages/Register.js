import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegisterForm from "../components/RegisterForm"

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RegisterForm></RegisterForm>
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