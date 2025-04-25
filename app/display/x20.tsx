import { View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";

import "../../global.css";
import { Styles } from "../../hooks/styles";

import { toHexString, getPixel24 } from "../../hooks/bmpUtil";
import { imageMapX20 } from "../../hooks/getImage";
import { X20Segments } from "../../components/X20Segments";
import { BackButton, HeaderLabel } from "../../components/Header";
import { MyAlert } from "../../components/MyAlert";
import useAlert from "../../hooks/useAlert";

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
  startCol: number
) => {
  const region: string[][] = [];
  for (let r = 0; r < 4; r++) {
    const rowPixel: string[] = [];
    for (let c = 0; c < 5; c++) {
      const color = getPixel24(bmpData, rowSize, startCol + c, startRow + r);
      rowPixel.push(color);
    }
    region.push(rowPixel);
  }
  return region;
};

const X20display = () => {
  const { imgID } = useLocalSearchParams() as { imgID: string };
  const router = useRouter();
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [regionColor, setRegionColor] = useState<string[][] | null>(null);
  const [alertState, ShowAlert, HideAlert] = useAlert();

  const LoadSeatPosition = async () => {
    try {
      const s = await AsyncStorage.getItem("seat");
      const p = await AsyncStorage.getItem("position");
      if (s) setSeat(s);
      if (p) setPosition(p);
    } catch (e) {
      ShowAlert("Error", "Error loading seat/position");
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
        250 * 6,
        seatToIndex(seat),
        posToIndex(position)
      );
      if (!data) return;
      setRegionColor(data);
      if (data) {
        await AsyncStorage.setItem(cachedKeys, JSON.stringify(data));
      }
    } catch (e) {
      ShowAlert("Error", "Error loading/decoding bmp files");
      return;
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
    <>
      <SafeAreaView style={Styles.Container}>
        <BackButton />
        <HeaderLabel />
        <View>
          <Text style={[Styles.Text40, Styles.Pad20]}>
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
            <Text style={[Styles.Text40, Styles.LoadingBox]}>
              Loading pixel grid...
            </Text>
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
      {alertState.isVisible && (
        <MyAlert
          isVisible={alertState.isVisible}
          setVisible={() => {
            HideAlert;
            router.back();
          }}
          Topic={alertState.topic}
          Message={alertState.message}
        />
      )}
    </>
  );
};

export default X20display;
