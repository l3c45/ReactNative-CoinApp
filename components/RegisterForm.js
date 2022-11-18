import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@rneui/themed";

const RegisterForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Enter a valid Email").required("Required"),
        password: Yup.string()
          .min(6, "Must be 6 characters or more")
          .required("Required"),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Required"),
      })}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.title}>Crea una nueva cuenta</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange("email")}
            value={values.email}
            selectionColor={"#fff"}
            placeholder={"Email"}
            placeholderTextColor={"#fff"}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange("password")}
            value={values.password}
            secureTextEntry={true}
            selectionColor={"#fff"}
            placeholder={"Contraseña"}
            placeholderTextColor={"#fff"}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange("passwordConfirmation")}
            value={values.passwordConfirmation}
            secureTextEntry={true}
            selectionColor={"#fff"}
            placeholder={"Ingrese nuevamente la contraseña"}
            placeholderTextColor={"#fff"}
          />
          {errors.passwordConfirmation && (
            <Text style={styles.error}>{errors.passwordConfirmation}</Text>
          )}
          <Button
            buttonStyle={styles.button}
            onPress={handleSubmit}
            title="Registrarse"
          />
        </ScrollView>
      )}
    </Formik>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  form: {
    paddingVertical: 50,
    display: "flex",
    alignItems: "center",
  },
  textInput: {
    padding: 10,
    marginVertical: 30,
    backgroundColor: "#47494A",
    height: 40,
    width: "95%",
    color: "#fff",
    fontSize: 16,
  },
  button: {
    marginTop: 60,
    width: 200,
    backgroundColor: "#3F59DE",
  },
  title: {
    paddingBottom: 30,
    fontSize: 28,
    color: "#fff",
  },
  error: {
    color: "red",
  },
});
