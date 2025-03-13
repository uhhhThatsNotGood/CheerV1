import { View, Alert, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Asset } from "expo-asset";

import "../../global.css";
import { Styles } from "../../hooks/styles";

import { toHexString, getPixel24, colorToNameX1 } from "../../hooks/BMPutils";
import { imageMapX1 } from "../../hooks/getImage";

const seatToIndex = (seat: string) => {
  return seat.toUpperCase().charCodeAt(0) - 65;
};
const posToIndex = (pos: string) => {
  return parseInt(pos, 10) - 1;
};

const Display = () => {
  const { imgID } = useLocalSearchParams() as {
    imgID?: string;
  };
  const router = useRouter();
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
        50 * 6,
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
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#1a1a1a", "#800852"]}
      locations={[0, 0.4, 0.6, 1]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={Styles.GlobalBackButton}
        >
          <Text style={Styles.Text32}>{"<"}</Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={[Styles.Text40, Styles.SMBoldCenter, Styles.Pad20]}>
            {" "}
            X1 โค้ด {imgID} {"\n"}( {seat}
            {posToIndex(position) + 1} )
          </Text>
          <View
            style={[
              Styles.boRad,
              Styles.X1Pixel,
              { backgroundColor: pixelColor ?? "" },
            ]}
          />
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
            <Text style={Styles.Text32}>Loading...</Text>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Display;
