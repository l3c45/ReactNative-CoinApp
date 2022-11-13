import { StyleSheet, TextInput, Text, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Divider } from "@rneui/themed";

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ user: "", password: "" }}
      validationSchema={Yup.object({
        user: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Required"),
      })}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange("user")}
            onBlur={handleBlur("user")}
            value={values.user}
            selectionColor={"#fff"}
          />
          {errors.user && <Text style={styles.error}>{errors.user}</Text>}
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry={true}
            selectionColor={"#fff"}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <Button
            buttonStyle={styles.button}
            onPress={handleSubmit}
            title="Ingresar"
          />
          <Button titleStyle={{color:"#fff"}} title="¿Olvidaste tu contraseña?" type="clear"></Button>
          <Divider
            style={{ paddingVertical: 10, width: 350, margin: 20 }}
            color="#000"
            width={1}
            orientation="horizontal"
          />
          <View style={styles.footer}>
            <Text style={{color:"#BBC5CA"}}>¿No tienes una cuenta? </Text>
            <Button
            titleStyle={{color:"#fff"}}
              buttonStyle={styles.footerBtn}
              title="Crea una cuenta"
              type="clear"
            ></Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#47494A",
    marginHorizontal: 30,
    height: 40,
    width: 350,
    color:"#fff",
    fontSize:20
  },
  button: {
    marginVertical: 20,
    width: 200,
    marginHorizontal: "auto",
    backgroundColor: "#3F59DE",
  },
  footer: {
    display: "flex",
    flexDirection: "row",

    alignContent: "center",
    justifyContent: "center",
  },
  footerBtn: {
    paddingTop: 0,
  },
  error: {
    color: "red",
  },
});
