import * as Font from "expo-font";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const useFonts = () => {
  const [FontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          SpGtskLight: require("../assets/fonts/SpaceGrotesk_300Light.ttf"),
          SpGtskReg: require("../assets/fonts/SpaceGrotesk_400Regular.ttf"),
          SpGtskMid: require("../assets/fonts/SpaceGrotesk_500Medium.ttf"),
          SpGtskSMBold: require("../assets/fonts/SpaceGrotesk_600SemiBold.ttf"),
        });
      } catch (e) {
        console.log("Error in useFont hooks", e);
      } finally {
        setFontsLoaded(true);
      }
    };
    loadFonts();
  }, []);
  return FontsLoaded;
};

export default useFonts;
