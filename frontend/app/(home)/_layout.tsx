import GlobalLoader from "@/components/GlobalLoader";
import useAppStore from "@/contexts/zustand_ctx";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeLayout() {
  const { isLoading } = useAppStore();

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Home", headerShown: false }}
          />
        </Stack>
      )}
    </View>
  );
}
