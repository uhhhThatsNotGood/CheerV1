import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";

import "../global.css";
import { Styles } from "../hooks/styles";
import { imageMapX1, imageMapX20 } from "../hooks/getImage";
import { BackButton, HeaderLabel } from "../components/Header";

const ImageID = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [input, setInput] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      setInput("");
    }, [])
  );

  const adding = (value: string) => {
    if (input.length < 3) {
      setInput((prev) => prev + value);
    }
  };
  const delButton = () => {
    setInput((prev) => prev.slice(0, -1));
  };
  const checkID = () => {
    if (input === "" || input === "000" || input === "00" || input === "0") {
      Alert.alert("Error", "Enter Image ID");
      return;
    }
    const chosen = parseInt(input, 10);

    if (id == "1") {
      return router.push({
        pathname: "display/x1",
        params: { imgID: `${chosen}` },
      });
    }
    if (id == "20") {
      return router.push({
        pathname: "display/x20",
        params: { imgID: `${chosen}` },
      });
    }
  };
  return (
    <SafeAreaView style={Styles.Container}>
      <BackButton />
      <HeaderLabel />
      <View style={Styles.MgT16}>
        <Text style={[Styles.Text40, Styles.Mg20]}>( 1 : {id} )</Text>
        <Text style={[Styles.Text48, Styles.Mg20]}>{input || "..."}</Text>
        <View className="flex-1 flex-row flex-shrink flex-wrap items-center justify-center">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <TouchableOpacity
              key={num}
              style={Styles.NumPad}
              onPress={() => adding(num)}
            >
              <Text style={Styles.Text40}>{num}</Text>
            </TouchableOpacity>
          ))}
          <View
            style={[Styles.NumPad, { backgroundColor: "", borderWidth: 0 }]}
          />

          <TouchableOpacity style={Styles.NumPad} onPress={() => adding("0")}>
            <Text style={Styles.Text40}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.NumPad} onPress={delButton}>
            <Text style={Styles.DelButton}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.GoButton}
            className={`mt-8 ${
              id == "1"
                ? "border-pink-300 bg-pink-950"
                : "border-blue-400 bg-blue-950"
            } `}
            onPress={checkID}
          >
            <Text style={Styles.Text40}>Go</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImageID;
