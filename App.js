import React from "react";

import { LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Notes from "./screens/Notes";
import Note from "./screens/Note";

import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvBP7642hT2sKizYz4vPtDvUZVZvrEvtA",
  authDomain: "note-2e79a.firebaseapp.com",
  databaseURL: "https://note-2e79a.firebaseio.com",
  projectId: "note-2e79a",
  storageBucket: "note-2e79a.appspot.com",
  messagingSenderId: "644246918508",
  appId: "1:644246918508:web:6098c657027ae3639c4f49"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);;

const Drawer = createDrawerNavigator();
const NotesStack = createStackNavigator();

const NotesStackNvigator = () => {
  return (
    <NotesStack.Navigator>
      <NotesStack.Screen name="Notes" component={Notes} />
      <NotesStack.Screen name="Note" component={Note} />
    </NotesStack.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={() => {
          console.log("logout");
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log("Signout successfull!");
              props.navigation.closeDrawer();
            })
            .catch((err) => alert(err.message));
        }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen
        name="NotesStack"
        component={NotesStackNvigator}
        options={{ title: "Notes" }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}