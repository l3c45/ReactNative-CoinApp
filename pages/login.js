import { StyleSheet, SafeAreaView, Image, View } from "react-native";
import React from "react";
import LoginForm from "../components/LoginForm";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo}></Image>
      </View>
      <LoginForm></LoginForm>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#081B29",
  },
  logoContainer: {
    width: "100%",
    height: 250,
    alignItems: "center",
  },
  logo: {
    alignContent: "center",
    marginVertical: 40,
    width: 200,
    height: 200,
  },
});
