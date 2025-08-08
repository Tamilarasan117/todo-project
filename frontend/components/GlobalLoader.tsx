import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const GlobalLoader = () => {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotate]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.spine, { transform: [{ rotate: spin }] }]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spine: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 7,
    borderColor: "#ccc",
    borderTopColor: "green",
  },
});

export default GlobalLoader;
