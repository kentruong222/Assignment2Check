import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "firebase";

const Signup = ({ navigation }) => {
  const [singupForm, setSignupForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onChangeTextEmail = (email) => {
    setSignupForm({
      ...singupForm,
      email,
    });
  };
  const onChangeTextPassword = (password) => {
    setSignupForm({
      ...singupForm,
      password,
    });
  };
  const onChangeTextName = (name) => {
    setSignupForm({
      ...singupForm,
      name,
    });
  };

  const createAccount = () => {
    return new Promise(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(singupForm.email, singupForm.password)
        .then((res) => {
          firebase
            .firestore()
            .collection("Users")
            .doc(res.user.uid)
            .set({
              uid: res.user.uid,
              email: res.user.email,
              name: singupForm.name,
            })
            .then(() => {
              console.log("User successfully created!");
              navigation.navigate("rootTabs", {
                screen: "Notes",
                params: { email: res.user.email },
              });
            })
            .catch((err) => {
              console.log(err);
              alert("Create account failed, Error:" + err.message);
            });
        })
        .catch((err) => alert(err.message));
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={onChangeTextEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={onChangeTextPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={onChangeTextName}
      />
      <TouchableOpacity style={styles.button} onPress={createAccount}>
        <Text style={styles.buttonText}>Creat Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Go to login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 40,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 40,
    marginBottom: 10,
    padding: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontWeight: "700",
  },
});