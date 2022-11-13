import { StyleSheet, SafeAreaView, Image } from "react-native";
import React from "react";
import LoginForm from "../components/LoginForm";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>
      <LoginForm></LoginForm>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#081B29"
  },
  logo: {
    marginVertical: 50,
    width: 200,
    height: 200,
  },
});
