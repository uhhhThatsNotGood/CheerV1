import { View, Alert, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Asset } from "expo-asset";

import "../../global.css";
import { Styles } from "../../hooks/styles";

import { toHexString, getPixel32 } from "../../hooks/bmpUtils";
import { imageMapX20 } from "../../hooks/getImage";
import { X20Segments } from "../../components/X20Segments";
import { BackButton } from "../../components/BackButton";

const seatToIndex = (seat: string) => {
  return 4 * (seat.charCodeAt(0) - 65);
};
const posToIndex = (pos: string) => {
  return 5 * (parseInt(pos, 10) - 1);
};

const getRegion = (
  bmpData: string | null,
  rowSize: number,
  startRow: number,
  startCol: number,
  regionHeight: number,
  regionWidth: number
) => {
  const region: string[][] = [];
  for (let r = 0; r < regionHeight; r++) {
    const rowPixel: string[] = [];
    for (let c = 0; c < regionWidth; c++) {
      const color = getPixel32(bmpData, rowSize, startCol + c, startRow + r);
      rowPixel.push(color);
    }
    region.push(rowPixel);
  }
  return region;
};

const X20display = () => {
  const { imgID } = useLocalSearchParams() as { imgID: string };
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [regionColor, setRegionColor] = useState<string[][] | null>(null);

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
  const LoadRegionAndCache = async (id: string, s: string, p: string) => {
    if (!id || !s || !p) return;
    const cachedKeys = `x20-${id}-${s}-${p}`;
    try {
      const cachedColors = await AsyncStorage.getItem(cachedKeys);
      if (cachedColors) {
        setRegionColor(JSON.parse(cachedColors));
        return;
      }

      const asset = Asset.fromModule(imageMapX20[id]);
      await asset.downloadAsync();
      const b64Data = await fetch(asset.localUri!);
      const buffer = await b64Data.arrayBuffer();
      const Uint8Arr = new Uint8Array(buffer);
      const bmpData = toHexString(Uint8Arr).slice(108);
      const data = getRegion(
        bmpData,
        250 * 8,
        seatToIndex(seat),
        posToIndex(position),
        4,
        5
      );
      if (!data) return;
      setRegionColor(data);
      if (data) {
        await AsyncStorage.setItem(cachedKeys, JSON.stringify(data));
      }
    } catch (e) {
      console.log(e, "ErrorFetchingGrid");
      Alert.alert("Error", "Error loading/decoding BMP.");
    }
  };

  useEffect(() => {
    LoadSeatPosition();
  }, []);

  useEffect(() => {
    if (imgID && seat && position) {
      LoadRegionAndCache(String(imgID), seat, position);
    }
  }, [imgID, seat, position]);

  return (
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#1a1a1a", "#800852"]}
      locations={[0, 0.4, 0.6, 1]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <BackButton />
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={[Styles.Text40, Styles.SMBoldCenter, Styles.Pad20]}>
            {" "}
            X20 โค้ด {imgID}
            {"\n"}( {seat} {posToIndex(position) / 5 + 1} )
          </Text>
          {regionColor ? (
            <View>
              {regionColor.map((_, rowIndex, arr) => {
                const row = arr[arr.length - 1 - rowIndex];
                return (
                  <View key={rowIndex} className="flex flex-row">
                    {row.map((color, colIndex) => {
                      return <X20Segments key={colIndex} color={color} />;
                    })}
                  </View>
                );
              })}
            </View>
          ) : (
            <Text style={[Styles.Text40,Styles.LoadingBox]}>Loading pixel grid...</Text>
          )}

          <Text style={Styles.Text32}>Current Image</Text>
          {imgID ? (
            <Image
              source={imageMapX20[imgID]}
              style={Styles.ImgX20}
              resizeMode="contain"
            />
          ) : (
            <Text style={Styles.Text32}>Loading...</Text>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default X20display;
