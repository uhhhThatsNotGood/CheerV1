import { View } from "react-native";
import React, { useEffect, useState } from "react";
import useFonts from "../hooks/useFonts";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
  const FontsLoaded = useFonts();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (FontsLoaded) {
      SplashScreen.hideAsync().then(() => setAppReady(true));
    }
  }, [FontsLoaded]);

  if (!appReady) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar hidden />
      <LinearGradient
        colors={["#0d3d6b", "#1a1a1a", "#800852"]}
        locations={[0, 0.6, 1]}
        style={{ flex: 1 }}
      >
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="choose" options={{ headerShown: false }} />
          <Stack.Screen name="imageID" options={{ headerShown: false }} />
          <Stack.Screen name="display" options={{ headerShown: false }} />
        </Stack>
      </LinearGradient>
    </View>
  );
};

export default RootLayout;
