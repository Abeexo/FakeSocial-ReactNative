import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {View,SafeAreaView,Button,FlatList,Text,StyleSheet} from "react-native";
import Card from "../components/Card/Card";
import { Data } from "../models/Data";
import { ScreenFC } from "../models/ScreenFC";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";



const HomeScreen: ScreenFC<"Home"> = ({ navigation, route }) => {
const [stateapi, setState] = useState<Array<Data>>([]);
const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=26')
      .then(response => response.json())
      .then(data => {
        const users: Data[] = data.results.map((user: any) => ({
          firstName: user.name.first,
          lastName: user.name.last,
          phone: user.phone,
          picture: user.picture.large,
          id: user.id.value,
          email: user.email,
          street: user.location.street.name,
          location: user.location.street.number,
          date: user.dob.date,
          city: user.location.city,
          country: user.location.country,
        }));
        setState(users);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch('https://randomuser.me/api/?results=26')
        .then(response => response.json())
        .then(data => {
          const users: Data[] = data.results.map((user: any) => ({
            firstName: user.name.first,
            lastName: user.name.last,
            phone: user.phone,
            picture: user.picture.large,
          }));
          setState(users);
        })
        .catch(error => console.log(error));
    }, 120000); // 120 seconds
    return () => clearTimeout(timeout);
  }, [stateapi]);

  return (
    
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <View style={styles.buttonContainer}/>

        <View style={styles.shadow}>
          {stateapi.length > 0 ? (
           <FlatList
           style={{ marginBottom: 120 }}
           data={stateapi}
           numColumns={3}
           showsVerticalScrollIndicator={false}
           renderItem={({ item }) => (
             <Card
               item={item}
               isBookmarked={bookmarkedIds.includes(item.id)}
               index={0}
               onBookmarkChange={(id, isBookmarked) => {
                 if (isBookmarked) {
                   setBookmarkedIds([...bookmarkedIds, id]);
                 } else {
                   setBookmarkedIds(bookmarkedIds.filter((i) => i !== id));
                 }
               }}
             />
           )}
         />
          ) : (
            <View style={styles.cardContainer}>
              <Text>No result</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff56",
    paddingHorizontal: 0,
    alignItems: "center",
    justifyContent:"space-between"
    
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 10,
  },
  shadow: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      height: 20,
      width: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  cardContainer: {
    backgroundColor: "#fff",
    height: 170,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;


