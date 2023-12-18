import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { CustomScreenFC } from "../models/ScreenFC";
import { useSelector } from "react-redux";
import Card from "../components/Card/Card";
import {
  BookmarkProps,
  removeAllBookmark,
  removeBookmark,
} from "../redux/actions/bookmarkActions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";


const Favorites: CustomScreenFC<"Favorite"> = () => {
  const { bookmarks } = useSelector(
    (state: { bookmarkReducer: BookmarkProps }) => state.bookmarkReducer
  );

  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  if (selectedIndex >= 0) {
    Alert.alert(
      "Remove contact",
      "Are you sure you want to remove this contact from favorites?",
      [
        {
          text: "No",
          onPress: () => setSelectedIndex(-1),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(removeBookmark(selectedIndex));
            setSelectedIndex(-1);
          },
        },
      ],
      { cancelable: false }
    );
  }


  return (
    <View>
    {bookmarks.length > 0 ? (
    <View>
    <TouchableOpacity
    activeOpacity={0.4}
    onPress={() => dispatch(removeAllBookmark())}>
    <MaterialCommunityIcons name="delete" color="red" size={30} />
    </TouchableOpacity>

    <FlatList
      data={bookmarks}
      numColumns={3}
      showsVerticalScrollIndicator={true}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onLongPress={() => {
            Alert.alert(
              "Remove Contact",
              "Do you want to remove this contact from favorites?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Canceled"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => dispatch(removeBookmark(item.id)),
                },
              ],
              { cancelable: false }
            );
          }}>
          <View style={styles.cardContainer}>
            <Card
              item={item}
              index={index}
              key={index}
              disabled
              isBookmarked={false}
              isFavorite={true}
            />
            <View style={styles.textContainer}>
              <MaterialCommunityIcons
                name="account"
                color="black"
                size={10}
              />
              <Text style={styles.text}>
                {item.firstName} {item.lastName}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <MaterialCommunityIcons
                name="phone"
                color="black"
                size={10}
              />
              <Text style={styles.text}>{item.phone}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
) : (
  <View>
    <Text>No Bookmark present</Text>
  </View>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    bottom:50,
  },
  text: {
    fontSize:10,
    marginLeft: 5,
  },
});



export default Favorites;
