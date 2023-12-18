import React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, StyleSheet } from 'react-native';


export const Editor = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../img/1.png")} style={styles.profileImage} />
      <Text style={styles.name}>Simonpietro Gennaro</Text>
      <View style={styles.privacy}>
        <Text style={styles.privacyText}>Informativa sulla privacy:</Text>
        <Text style={styles.privacyText}>
          Qui potrai trovare tutte le informazioni relative al trattamento dei tuoi dati personali.
        </Text>
      </View>
    </View>
  );
};

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
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  privacy: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  privacyText: {
    fontSize: 14,
    marginBottom: 5,
    textAlign:"center",
  },
});

export default Editor;

