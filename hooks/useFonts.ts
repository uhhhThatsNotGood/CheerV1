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
          SGTLight: require("../assets/fonts/SpaceGrotesk_300Light.ttf"),
          SGTReg: require("../assets/fonts/SpaceGrotesk_400Regular.ttf"),
          SGTMid: require("../assets/fonts/SpaceGrotesk_500Medium.ttf"),
          SGTsmBold: require("../assets/fonts/SpaceGrotesk_600SemiBold.ttf"),
          THSrbn: require("../assets/fonts/THSarabun.ttf"),
          THSrBold: require("../assets/fonts/THSarabun_Bold.ttf"),
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
