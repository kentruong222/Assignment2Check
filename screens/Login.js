import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "firebase";

const Login = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    email: "hamid@email.com",
    password: "123123",
  });

  const onChangeTextEmail = (email) => {
    setLoginForm({
      ...loginForm,
      email,
    });
  };
  const onChangeTextPassword = (password) => {
    setLoginForm({
      ...loginForm,
      password,
    });
  };

  const loginHandler = () => {
    return new Promise(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(loginForm.email, loginForm.password)
        .then((res) => {
          navigation.navigate("NotesStack");
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
        value={loginForm.email}
        onChangeText={onChangeTextEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={loginForm.password}
        secureTextEntry
        onChangeText={onChangeTextPassword}
      />
      <TouchableOpacity style={styles.button} onPress={loginHandler}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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