import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import "../global.css";
import { Styles } from "../hooks/styles";

const Home = () => {
  const router = useRouter();
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const push = (path: string) => {
    router.push({ pathname: "imageID", params: { id: `${path}` } });
  };

  const LoadSeatPosition = async () => {
    try {
      const s = await AsyncStorage.getItem("seat");
      const p = await AsyncStorage.getItem("position");
      if (s) setSeat(s);
      if (p) setPosition(p);
    } catch (e) {
      Alert.alert("Error", "Error Loading Data");
      console.log(e, "ErrorLoadingSeatPosition");
    }
  };

  useEffect(() => {
    LoadSeatPosition();
  }, []);
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
        <View style={[Styles.Mg24, { alignItems: "center" }]}>
          <Text style={[Styles.Text48]}>
            Welcome {seat}
            {parseInt(position, 10)}
          </Text>
          <TouchableOpacity style={Styles.Choose} onPress={() => push("1")}>
            <Text style={Styles.Text72}>1 : 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.Choose} onPress={() => push("20")}>
            <Text style={Styles.Text72}>1 : 20</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
