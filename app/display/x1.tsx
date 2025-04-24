import { View, Alert, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Asset } from "expo-asset";

import "../../global.css";
import { Styles } from "../../hooks/styles";

import { toHexString, getPixel24, colorToNameX1 } from "../../hooks/bmpUtils";
import { imageMapX1 } from "../../hooks/getImage";
import { BackButton, HeaderLabel } from "../../components/Header";

const seatToIndex = (seat: string) => {
  return seat.charCodeAt(0) - 65;
};
const posToIndex = (pos: string) => {
  return parseInt(pos, 10) - 1;
};

const Display = () => {
  const { imgID } = useLocalSearchParams() as {
    imgID?: string;
  };
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [pixelColor, setPixelColor] = useState<string | null>(null);

  const LoadSeatPosition = async () => {
    try {
      const s = await AsyncStorage.getItem("seat");
      const p = await AsyncStorage.getItem("position");
      if (s) setSeat(s);
      if (p) setPosition(p);
    } catch (e) {
      console.log(e, "ErrorLoadingSeatPosition");
    }
  };

  const LoadPixelAndCache = async (id: string, s: string, p: string) => {
    if (!id || !s || !p) return;
    const cachedKeys = `x1-${id}-${s}-${p}`;
    try {
      const cachedColors = await AsyncStorage.getItem(cachedKeys);
      if (cachedColors) {
        setPixelColor(cachedColors);
        return;
      }
      const asset = Asset.fromModule(imageMapX1[id]);
      await asset.downloadAsync();
      const b64Data = await fetch(asset.localUri!);
      const buffer = await b64Data.arrayBuffer();
      const Uint8Arr = new Uint8Array(buffer);
      const bmpData = toHexString(Uint8Arr).slice(108);
      const data = getPixel24(
        bmpData,
        300,
        posToIndex(position),
        seatToIndex(seat)
      );
      if (!data) return;

      if (data) {
        setPixelColor(data);
        await AsyncStorage.setItem(cachedKeys, data);
      }
    } catch (e) {
      console.log(e, "ErrorFetchingData");
      Alert.alert("Error", "Failed to decode BMP.");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await LoadSeatPosition();
    };
    fetch();
  }, []);
  useEffect(() => {
    if (imgID && seat && position) {
      LoadPixelAndCache(String(imgID), seat, position);
    }
  }, [imgID, seat, position]);
  return (
    <SafeAreaView style={Styles.Container}>
      <BackButton />
      <HeaderLabel />

      <View style={Styles.MgT16}>
        <Text style={[Styles.Text40, Styles.Mg20]}>
          X1 โค้ด {imgID}
          {"\n"}( {seat}
          {posToIndex(position) + 1} )
        </Text>
        <View style={[Styles.X1Pixel, { backgroundColor: pixelColor ?? "" }]} />
        <Text style={Styles.Text40}>
          {pixelColor ? colorToNameX1(pixelColor) : "Loading hex data..."}
        </Text>
        <Text style={Styles.Text32}>Current Image </Text>
        {imgID ? (
          <Image
            source={imageMapX1[imgID]}
            style={Styles.ImgX1}
            resizeMode="contain"
            resizeMethod="scale"
          />
        ) : (
          <Text style={[Styles.Text32, Styles.LoadingBox]}>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Display;
