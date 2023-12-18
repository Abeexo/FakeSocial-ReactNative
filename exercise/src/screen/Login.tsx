import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";
import { ScreenFC } from "../models/ScreenFC";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/accountActions";


const Login: ScreenFC<"Login"> = ({ navigation }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
  <Text style={styles.title}>Login</Text>
  <TextInput
    style={styles.input}
    placeholder="email"
    onChangeText={(value) => setEmail(value)}
  />
  <TextInput
    style={styles.input}
    placeholder="password"
    onChangeText={(value) => setPassword(value)}
  />
  <Pressable
    style={styles.button}
    onPress={() => {
      email &&
        password &&
        dispatch(login({
          email, password, isLogged: true,
          image: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          nationality: "",
          city: "",
          phoneNumber: ""
        }));
    }}
  >
  <Text style={styles.signUpText2}>Login</Text></Pressable>
  <View style={styles.signUpContainer}>
    <Text style={styles.signUpText}>Do not have an account?</Text>
    <Button title="Sign In"
      onPress={() => navigation.navigate("SignUp")}
    />
  </View>
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width:80,
    height:30,
    backgroundColor: "rgb(33, 150, 243);",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  signUpText2: {
    color: "#fff",
  },
  signUpText: {
    marginRight: 10,
  },
});

export default Login;
