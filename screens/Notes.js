import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import firebase from "firebase";
import "@firebase/firestore";
import NoteForm from "../components/NoteForm";

const Notes = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState();

  const getUserData = (uid) => {
    const docRef = firebase.firestore().collection("Users").doc(uid);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        setUserInfo(userData);
        setNotes(userData.notes);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      } else {
        setLoading(false);
        console.log("DOcument not exist!");
      }
    });
  };

  const addNote = () => {
    if (note === "") return;

    const _notes = [...notes];
    _notes.push(note);

    firebase.firestore().collection("Users").doc(userInfo.uid).update({
      notes: _notes,
    });
    setNotes(_notes);
    setNote("");
  };

  const removeNote = (i) => {
    console.log("remove clicked", i);

    const _notes = [...notes];

    _notes.splice(i, 1);

    firebase.firestore().collection("Users").doc(userInfo.uid).update({
      notes: _notes,
    });

    setNotes(_notes);
  };

  const updateNote = (index, note) => {
    // if (note === "") return;

    const _notes = [...notes];

    _notes[index] = note;

    firebase.firestore().collection("Users").doc(userInfo.uid).update({
      notes: _notes,
    });
    setNotes(_notes);
  };

  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getUserData(user.uid);
        } else {
          setUserInfo(null);
          setLoading(false);
          navigation.navigate("Login");
        }
      });
    });

    return isFocused;
  }, [userInfo, loading, navigation, notes]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="darkslateblue" />
      </View>
    );
  }
  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>User not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Welcome, {userInfo.name}!</Text>
      <ScrollView style={styles.scrollView}>
        {notes ?.map((note, i) => (
          <TouchableOpacity
            key={i}
            style={styles.note}
            onPress={() => {
              navigation.navigate("Note", {
                noteIndex: i,
                sentNote: note,
                updateNote,
              });
            }}
          >
            <Text style={styles.noteText}>
              {note.split("").length > 40
                ? note.substring(0, 40) + "..."
                : note}
            </Text>
            <TouchableOpacity
              style={styles.remove}
              onPress={() => removeNote(i)}
            >
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <NoteForm inputValue={note} onChangeText={setNote} onNoteAdd={addNote} />
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "skyblue",
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
    marginBottom: 10,
  },
  note: {
    margin: 5,
    borderWidth: 2,
    backgroundColor: "skyblue",
    borderColor: "skyblue",
    borderRadius: 10,
  },
  noteText: {
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 20,
    color: "white",
    fontWeight: "700",
  },
  remove: {
    position: "absolute",
    right: 10,
    top: 15,
    padding: 5,
  },
  removeText: {
    color: "white",
    fontWeight: "bold",
  },
});