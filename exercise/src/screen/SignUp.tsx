import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { ScreenFC } from "../models/ScreenFC";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/actions/accountActions";
import * as ImagePicker from 'expo-image-picker';
import { relative } from "path";

interface CustomImagePickerResult {
  cancelled: boolean;
  uri: string;
  type?: string;
  width?: number;
  height?: number;
}


const SignUp: ScreenFC<"SignUp"> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const dispatch = useDispatch();

  const handleImagePicker = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Per favore, abilita i permessi per la libreria multimediale.");
      return;
    }
    const result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })) as unknown as CustomImagePickerResult;
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Registrati</Text>
    <TextInput
      style={styles.input}
      placeholder="Nome"
      onChangeText={(value) => setFirstName(value)}
    />
    <TextInput
      style={styles.input}
      placeholder="Cognome"
      onChangeText={(value) => setLastName(value)}
    />
    <TextInput
      style={styles.input}
      placeholder="Data di nascita"
      onChangeText={(value) => setDateOfBirth(value)}
    />
    <TextInput
      style={styles.input}
      placeholder="Nazionalità"
      onChangeText={(value) => setNationality(value)}
    />
    <TextInput
      style={styles.input}
      placeholder="Città"
      onChangeText={(value) => setCity(value)}
    />
    <TextInput
      style={styles.input}
      placeholder="Telefono"
      onChangeText={(value) => setPhoneNumber(value)}
    />
    <TextInput
      style={styles.input}
      placeholder="Email"
      onChangeText={(value) => setEmail(value)}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry={true}
      onChangeText={(value) => setPassword(value)}
    />
     <Pressable onPress={handleImagePicker}  style={styles.button2}><Text style={styles.signInText2}>Add picture</Text></Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          email &&
            password &&
            dispatch(
              signUp({
                email,
                password,
                isLogged: true,
                firstName,
                lastName,
                dateOfBirth,
                nationality,
                city,
                phoneNumber,
                image: imageUri,
              })
            );
        }}
      >
        <Text style={styles.signInText2}>Sign In</Text></Pressable>
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Have you an account?</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Login")} ><Text style={styles.signInText2}>Login</Text></Pressable>
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
  button2: {
    marginTop: 20,
    width:120,
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
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  signInText: {
    position:"relative",
    marginRight: 10,
    top:10,
  },
  signInText2: {
    color: "#fff",
  },
});


export default SignUp;
