import CustomToaster from "@/components/CustomToster";
import useAppStore from "@/contexts/zustand_ctx";
import useFetchPostDatas from "@/hooks/useFetchPostDatas";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { registerMutate } = useFetchPostDatas();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = () => {
    registerMutate({
      username,
      email,
      password,
      confirmPassword,
    });

    // setUsername("");
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formCont}>
        <TextInput
          style={styles.inputField}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3d3d3d",
  },
  formCont: {
    width: 350,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#888",
    gap: 10,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputField: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
});
