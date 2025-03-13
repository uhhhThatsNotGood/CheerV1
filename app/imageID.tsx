import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";

import "../global.css";
import { Styles } from "../hooks/styles";

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
    if (input.length < 2) {
      setInput((prev) => prev + value);
    }
  };
  const delButton = () => {
    setInput((prev) => prev.slice(0, -1));
  };
  const checkID = () => {
    if (input === "" || input === "00" || input === "0") {
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
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#800852"]}
      locations={[0, 0.6, 1]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={Styles.GlobalBackButton}
        >
          <Text style={Styles.Text32}>{"<"}</Text>
        </TouchableOpacity>
        <View style={Styles.Container}>
          <Text style={[Styles.Text48, Styles.Pad20, Styles.SMBoldCenter]}>
            ( 1 : {id} ){"\n"}
            {input || "_ _"}
          </Text>
          <View className="flex-1 flex-row flex-shrink flex-wrap items-center justify-center">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num, index) => (
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
              <Text style={Styles.Text40}>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.Submit, Styles.GoButton]}
              onPress={checkID}
            >
              <Text style={Styles.Text32}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ImageID;
