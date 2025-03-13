import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const DisplayLayout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar hidden />
      <LinearGradient
        colors={["#0d3d6b", "#1a1a1a", "#800852"]}
        locations={[0, 0.6, 1]}
        style={{ flex: 1 }}
      >
        <Stack>
          <Stack.Screen name="x1" options={{ headerShown: false }} />
          <Stack.Screen name="x20" options={{ headerShown: false }} />
        </Stack>
      </LinearGradient>
    </View>
  );
};

export default DisplayLayout;
