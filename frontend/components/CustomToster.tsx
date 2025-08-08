import useAppStore from "@/contexts/zustand_ctx";
import { ToasterColors, ToasterType } from "@/types/types";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const CustomToaster = () => {
  const { toasterMessage, clearToasterMessage } = useAppStore();

  useEffect(() => {
    setTimeout(() => {
      clearToasterMessage();
    }, 3000);
  });

  const setToasterColor = (type: ToasterType) => {
    if (type === "SUCCESS") {
      return ToasterColors.SUCCESS;
    } else if (type === "ERROR") {
      return ToasterColors.ERROR;
    } else if (type === "INFO") {
      return ToasterColors.INFO;
    } else if (type === "WARNING") {
      return ToasterColors.WARNING;
    } else if (type === "FAILURE") {
      return ToasterColors.FAILURE;
    }
  };

  if (!toasterMessage) {
    return null;
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: setToasterColor(toasterMessage.type),
          fontSize: 18,
          fontWeight: "bold"
        }}
      >
        {toasterMessage.message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
  }
});

export default CustomToaster;
