import { StyleSheet, TextInput, Text, ScrollView,View } from "react-native";
import React ,{useState} from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Divider } from "@rneui/themed";
import { loginUser } from "../firebase/Session";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {

  const [error, setError] = useState(null)

  const navigation=useNavigation()

  const login= async (user)=> {
    try{

      const loginUserForm=await loginUser(user)
      
      loginUserForm && navigation.replace("Home")
      !loginUserForm && setError(true)
    }catch{e=> console.log(e)

    }
   
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Enter a valid Email").required("Required"),
        password: Yup.string()
          .min(6, "Must be 6 characters or more")
          .required("Required"),
      })}
      onSubmit={(values) => login(values)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <ScrollView contentContainerStyle={styles.form}>
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
          {error?<Text style={styles.error}>Credenciales incorrectas</Text>:null}
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
              onPress={()=>navigation.navigate("Register")}
            ></Button>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  form: {
    display: "flex",
   alignItems:"center",
  },
  textInput: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#47494A",
    height: 40,
    width: "95%",
    color:"#fff",
    fontSize:16
  },
  button: {
    marginVertical: 20,
    width: 200,
    backgroundColor: "#3F59DE",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom:30,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
  },
});
