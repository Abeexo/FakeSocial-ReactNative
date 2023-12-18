import React, { useState } from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { addBookmark, removeBookmark } from '../../redux/actions/bookmarkActions';
import { Data } from '../../models/Data';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Linking } from 'react-native';


interface Props {
  item: Data;
  isBookmarked: boolean;
  index: number;
  disabled?: boolean;
  onPress?: () => void;
  onBookmarkChange?: (id: number, isBookmarked: boolean) => void;
  isFavorite?: boolean;  // aggiunta della prop isFavorite
}


const Card = ({ item, isBookmarked, isFavorite = false }: Props) => {
  const dispatch = useDispatch();
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${item.email}`);
  };
  
  const handlePhonePress = () => {
    Linking.openURL(`tel:${item.phone}`);
  };


  const handleCardAction = (action: "bookmark" | "remove") => {
    setBookmarked(!bookmarked);
    if (action === "bookmark") {
      dispatch(addBookmark(item));
    } else {
      dispatch(removeBookmark(item.id));
    }
  };

  const icon = isFavorite ? (
    ''
  ) : (
    <Icon
      name="heart"
      size={20}
      color={bookmarked ? "red" : "white"}
      onPress={() => handleCardAction("bookmark")}
    />
  );

  

  return (
    <><View style={styles.cardContainer}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)}>
        <Image source={{ uri: item.picture }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>{icon}</View>
    </View>
    
    <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.imagecont}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Icon name="close" size={20} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: item.picture }} style={styles.modalImage} />
          {icon}
          </View>
          
         
          <Text style={styles.modalText}> <MaterialCommunityIcons name="calendar" size={20} color="white"
    />  {item.date}</Text>

          <Text style={styles.modalText}> <MaterialCommunityIcons name="face-man-profile" size={20} color="white"
    />  {item.lastName} {item.firstName}</Text>

<Text style={styles.modalText}><MaterialCommunityIcons name="map-marker" size={20} color="white"
    />  {item.country} - {item.city} - {item.street}{item.location}</Text>

         
         <Text style={styles.modalText}>
  <MaterialCommunityIcons name="email" size={20} color="white" />{' '}
  <TouchableOpacity onPress={handleEmailPress}>
    <Text style={{ textDecorationLine: 'none' }}> {item.email}</Text>
  </TouchableOpacity>
</Text>

<Text style={styles.modalText}>
  <MaterialCommunityIcons name="phone" size={20} color="white" />
  <TouchableOpacity onPress={handlePhonePress}>
    <Text style={{ textDecorationLine: 'none' }}> {item.phone}</Text>
  </TouchableOpacity>
</Text>
</View>
</Modal></>


  );

  
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "none",
    height: 150,
    width: 100,
    padding: 10,
    borderRadius: 0,
    alignItems: "center",
    marginVertical: 15,
    margin: 10,
    justifyContent: "flex-start",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 0,
  },
  iconContainer: {
    position: "absolute",
    right: 80,
    bottom: 12,
  },
  
  modalContainer: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width:"100%",
    padding:10,
  },
  imagecont:{
    bottom:120,
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    flexDirection:"column",
  },
  modalImage: {
    height: 180,
    width: 180,
    borderRadius: 80,
    marginVertical: 20,

  },
  modalText: {
    position:"relative",
    color: "white",
    fontSize: 16,
    marginVertical: 5,
    bottom:250,
  },
  
  
});

export default Card;
