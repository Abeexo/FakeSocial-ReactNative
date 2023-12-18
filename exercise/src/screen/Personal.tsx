
import React, { useState } from "react";
import { Image, Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AccountAction, ACCOUNT_ACTIONS, AccountProps, logout} from "../redux/actions/accountActions";
import * as ImagePicker from 'expo-image-picker';
import { ScreenFC} from "../models/ScreenFC";
import { ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import RootStackParams from "../models/RootStackParams";


const Personal: ScreenFC<"Profile"> = (navigation, route ) => {
    const { account } = useSelector(
      (state: { accountReducer: AccountProps }) => state.accountReducer
    );
    const RootStack = createStackNavigator<RootStackParams>();

  const dispatch = useDispatch();


  const [email, setEmail] = useState<string>(account.email);
  const [password, setPassword] = useState<string>(account.password);
  const [imageUri, setImageUri] = useState<string>(account.image);
  const [firstName, setFirstName] = useState<string>(account.firstName);
  const [lastName, setLastName] = useState<string>(account.lastName);
  const [dateOfBirth, setDateOfBirth] = useState<string>(account.dateOfBirth);
  const [nationality, setNationality] = useState<string>(account.nationality);
  const [city, setCity] = useState<string>(account.city);
  const [phoneNumber, setPhoneNumber] = useState<string>(account.phoneNumber);
  const [isEditing, setIsEditing] = useState<boolean>(false);
const [isTextInputEditable, setIsTextInputEditable] = useState<boolean>(false);

  interface CustomImagePickerResult {
    cancelled: boolean;
    uri: string;
    type?: string;
    width?: number;
    height?: number;
  }

  const handleEdit = () => {
    setIsEditing(true);
    setIsTextInputEditable(true);
  };
  

  const handleSaveChanges = () => {
    setIsEditing(false);
    setIsTextInputEditable(false);
    if (isEditing) {
      dispatch({
        type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT,
        payload: {
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
        },
      } as AccountAction);
    } else {
      dispatch({
        type: ACCOUNT_ACTIONS.ADD_ACCOUNT,
        payload: {
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
        },
      } as AccountAction);
    }
    setIsEditing(false);
  };

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

  const handleDeleteAccount = () => {
    dispatch({ type: ACCOUNT_ACTIONS.DELETE_ACCOUNT });
  };



  return (
    <ScrollView>
    <View style={styles.container}>
        <Image
          source={{ uri: imageUri }}
          style={styles.profileImage}
          resizeMode="cover"/>

        <Pressable onPress={handleImagePicker} style={[styles.buttonimg]}><Text style={styles.buttonTextimg}>Cambia immagine</Text></Pressable>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          value={firstName}
          onChangeText={isEditing ? setFirstName : undefined}
          editable={isTextInputEditable}
          style={styles.input}
        />
        <Text style={styles.label}>Cognome</Text>
        <TextInput
          value={lastName}
          onChangeText={isEditing ? setLastName : undefined}
          editable={isTextInputEditable}
          style={styles.input}
        />
        <Text style={styles.label}>Data di nascita</Text>
        <TextInput 
          value={dateOfBirth} 
          onChangeText={isEditing ? setDateOfBirth : undefined} 
          editable={isTextInputEditable} 
          style={styles.input}/>
        <Text style={styles.label}>Nazionalità</Text>
        <TextInput 
          value={nationality} 
          onChangeText={isEditing ? setNationality : undefined} 
          editable={isTextInputEditable} 
          style={styles.input}/>
        <Text style={styles.label}>Città</Text>
        <TextInput 
          value={city} 
          onChangeText={isEditing ? setCity : undefined} 
          editable={isTextInputEditable} 
          style={styles.input}/>
        <Text style={styles.label}>Telefono</Text>
        <TextInput 
          value={phoneNumber} 
          onChangeText={isEditing ? setPhoneNumber : undefined} 
          editable={isTextInputEditable} 
          style={styles.input}/>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          value={email} 
          onChangeText={isEditing ? setEmail : undefined}
          editable={isTextInputEditable} 
          style={styles.input}/>
        <Text style={styles.label}>Password</Text>
        <TextInput 
          value={password} 
          onChangeText={isEditing ? setPassword : undefined} 
          secureTextEntry={true} editable={isTextInputEditable} 
          style={styles.input}/>
          
        <Pressable onPress={handleEdit} disabled={isEditing} 
        style={[styles.button]}><Text style={styles.buttonText}>Edit Profile</Text> </Pressable>

        <Pressable onPress={handleSaveChanges} disabled={!isEditing}  
        style={[styles.button]}><Text style={styles.buttonText}>Save Changes</Text></Pressable>

<Pressable  onPress={() => dispatch(logout())} 
        style={[styles.button, styles.deleteButton]}><Text style={styles.buttonText }>Logout</Text> </Pressable>
        
        <Pressable onPress={handleDeleteAccount}  style={[styles.button, styles.deleteButton]}><Text style={styles.buttonText}>Cancella Account</Text> </Pressable>
        </View>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
      top:100,
    },
    profileImage: {
      maxWidth: 120,
      maxHeight: 120,
      width: "100%",
      height: "100%",
      borderRadius: 100,
    },
    input: {
      textAlign: "center",
      marginBottom: 5,
      fontSize: 12,
    },
    label: {
      fontWeight: "bold",
      fontSize: 14,
      marginTop: 5,
      marginBottom: 5,
    },
    button: {
      marginTop: 20,
      backgroundColor: "#4CAF50",
      borderRadius: 5,
      padding: 10,
      minWidth: 150,
      alignItems: "center",
      justifyContent: "center",
      height: 30,

    },
    deleteButton: {
        backgroundColor: "red",
        marginTop: 20,
        marginBottom: 0
      },
    buttonimg: {
      height: 30,
      marginTop: 20,
      marginBottom:10,
      borderRadius: 5,
      padding: 10,
      minWidth: 150,
      alignItems: "center",
      justifyContent: "center",

    },
    buttonTextimg: {
      fontWeight: "bold",
      fontSize: 14,
      marginTop: 5,
      marginBottom: 5,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 12,
    },
  });

export default Personal;
