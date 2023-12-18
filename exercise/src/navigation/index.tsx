import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import RootStackParams from "../models/RootStackParams";
import HomeScreen from "../screen/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screen/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../screen/Favorites";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ROUTES from "./routes";
import { useSelector } from "react-redux";
import { BookmarkProps } from "../redux/actions/bookmarkActions";
import Login from "../screen/Login";
import SignUp from "../screen/SignUp";
import { AccountProps } from "../redux/actions/accountActions";
import Editor from "../screen/Editor";
import Personal from "../screen/Personal";

const RootStack = createStackNavigator<RootStackParams>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();



const HomeStack: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={ROUTES.Home}component={HomeScreen}
        options={{headerShown: false,headerStyle: { backgroundColor: "rgb(79,172,217)" }, }} />
      <RootStack.Screen name={ROUTES.Profile} component={ProfileScreen} 
      options={{headerShown: false,headerStyle: { backgroundColor: "rgb(79,172,217)" }, }}/>
      <RootStack.Screen name={ROUTES.Favorite} component={Favorites}
      options={{headerShown: false,headerStyle: { backgroundColor: "rgb(79,172,217)" }, }} />
      <RootStack.Screen name={ROUTES.Editor} component={Editor} 
      options={{headerShown: false,headerStyle: { backgroundColor: "rgb(79,172,217)" }, }}/>
      <RootStack.Screen name={ROUTES.Personal} component={Personal} 
      options={{headerShown: false,headerStyle: { backgroundColor: "rgb(79,172,217)" }, }}/>

    </RootStack.Navigator>
  );
};

const MainStack: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name={ROUTES.Login}component={Login}options={{headerShown: false,headerStyle: { backgroundColor: "rgb(79,172,217)" },}}/>
      <RootStack.Screen name={ROUTES.SignUp} component={SignUp} options={{headerShown: false,headerStyle: { backgroundColor: "rgb(79,172,217)" },}}/>
    </RootStack.Navigator>
  );
};

const TabNavigation: React.FC = () => {
  const { bookmarks } = useSelector(
    (state: { bookmarkReducer: BookmarkProps }) => state.bookmarkReducer
  );

  const { navigate } =
    useNavigation<StackNavigationProp<RootStackParams, ROUTES>>();

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HomeStack}
      screenOptions={{
        tabBarActiveTintColor: "#fc8386",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name={ROUTES.HomeStack}
        component={HomeStack}
        listeners={{ tabPress: () => { navigate("HomeStack"); } }}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        
      />
      <Tab.Screen
        name={ROUTES.Profile}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="details" color={color} size={size} />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
};



const DrawerMenu: React.FC = () => {
  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );

  return (
    <NavigationContainer>
      {account && account.isLogged ? (
        <Drawer.Navigator>

          <Drawer.Screen
            name="HomeStack"
            component={TabNavigation}
            options={{
              headerShown: true,
              headerTintColor: "red",
              headerStyle: { backgroundColor: "#fc8386" },
              drawerLabel: "-",
            }}/>

            <Drawer.Screen
            name={ROUTES.Home}
            component={HomeScreen}
            options={{
              headerShown: true,
              headerTintColor: "red",
              headerStyle: { backgroundColor: "#fc8386" },
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              drawerLabel: "Home",
            }}/>
          
          <Drawer.Screen name={ROUTES.Profile} component={ProfileScreen} 
           options={{
            headerShown: true,
            headerTintColor: "red",
            headerStyle: { backgroundColor: "#fc8386" },
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="details" color={color} size={size} />
            ),
            drawerLabel: "Profile",
          }}
        />
         
        </Drawer.Navigator>
      ) : (
        <MainStack />
      )}
    </NavigationContainer>
  );
};

export default DrawerMenu;
