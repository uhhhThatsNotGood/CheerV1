import { View } from "react-native";
import React, { useEffect, useState } from "react";
import useFonts from "../hooks/useFonts";
import * as SplashScreen from "expo-splash-screen";
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
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default RootLayout;
