import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Note = ({ route, navigation }) => {
  const { params } = route;
  const { noteIndex, sentNote, updateNote } = params;
  const [note, setNote] = useState(sentNote);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Note:</Text>
        <TextInput
          style={styles.noteText}
          value={note}
          multiline
          onChangeText={(text) => {
            setNote(text);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.button(note.length <= 0 || note === sentNote)}
        onPress={() => {
          updateNote(noteIndex, note);
          navigation.goBack();
        }}
        disabled={note.length <= 0 || note === sentNote}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkslateblue",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  innerContainer: {
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    height: "30%",
    borderRadius: 10,
  },
  noteText: {
    borderRadius: 10,
    fontSize: 14,
    backgroundColor: "lavender",
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  button: (disabled) => ({
    backgroundColor: "mediumpurple",
    borderRadius: 40,
    marginBottom: 10,
    padding: 20,
    width: "100%",
    marginVertical: 20,
    opacity: disabled ? 0.5 : 1,
  }),
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
});