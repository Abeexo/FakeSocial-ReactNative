
import React, { useState } from "react";
import { Button, Image, Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { ScreenFC } from "../models/ScreenFC";
import { useDispatch, useSelector } from "react-redux";
import {ACCOUNT_ACTIONS, AccountProps, logout } from "../redux/actions/accountActions";
import RootStackParams from "../models/RootStackParams";
import ROUTES from "../navigation/routes";
import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from "@react-navigation/drawer";





const ProfileScreen: ScreenFC<"Profile"> = () => {
  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );
  const RootStack = createStackNavigator<RootStackParams>();
 

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParams, ROUTES>>();
 


  

  
    return (
      <View style={styles.container}>
  
        <Pressable onPress={() => navigation.navigate("Editor")} style={[styles.button, styles.deleteButton]}><Text style={styles.buttonText}>Info Developer</Text></Pressable>
        <Pressable onPress={() => navigation.navigate("Favorite")} style={[styles.button, styles.deleteButton]}><Text style={styles.buttonText}>Favorites</Text></Pressable>
        <Pressable onPress={() => navigation.navigate("Personal")} style={[styles.button, styles.deleteButton]}><Text style={styles.buttonText}>Personal Area</Text></Pressable>
       
        

    </View>

    
    );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
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
      logoutButton: {
        backgroundColor: "blue",
        marginTop: 20,
      },
      deleteButton: {
        backgroundColor: "red",
        marginTop: 20,
        marginBottom: 20
      },
    });

    export default ProfileScreen;