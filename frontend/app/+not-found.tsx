import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles?.container}>
      <Text style={styles?.text1}>Oops!</Text>
      <Text style={styles?.text2}>Page Not Found</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Link href={"/"} style={styles?.button}>
          Go Back To Home Screen
        </Link>
      </TouchableOpacity>
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
  text1: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text2: {
    color: "#3ccc",
    fontSize: 20,
    fontWeight: "semibold",
    marginBottom: 10,
  },
  button: {
    borderRadius: 7,
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
