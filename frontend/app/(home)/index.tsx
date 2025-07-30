import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles?.container}>
      <Text style={styles?.text}>Home Screen</Text>
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
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
