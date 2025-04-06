import { useEffect, useState } from "react";
import {
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import "../global.css";
import { fLogHook, InfoHook } from "../hooks/storageLogic";
import { Styles } from "../hooks/styles";

const App: React.FC = () => {
  const router = useRouter();
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  useEffect(() => {
    setSeat(seat.toUpperCase());
  }, [seat]);

  const CheckInfo =  () => {
    const value = InfoHook(seat, position, "choose", router);
    console.log(seat, position, "aaaa");
    if (value == "err") {
      Alert.alert("Error", "Incorrect input.");
    }
  };
  const CheckFormerLogin = async () => {
    const value = await fLogHook({ setSeat, setPosition }, "choose", router);
    if (value == "NULL") {
      Alert.alert("Error", "No previous login found.");
    } else if (value == "err") {
      Alert.alert("Error", "Error loading previos login");
    }
  };

  const clearAsync = () => {
    AsyncStorage.clear();
    setSeat("");
    setPosition("");
    Alert.alert("Data cleared");
  };

  return (
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#1a1a1a", "#800852"]}
      locations={[0, 0.4, 0.6, 1]}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <SafeAreaView style={Styles.Container}>
          <Text style={[Styles.Text64, Styles.MgT16]}>Log In</Text>

          <Text style={[Styles.Text32, Styles.Pad20]}>Seat</Text>

          <TextInput
            placeholder="A"
            maxLength={1}
            value={seat}
            onChangeText={setSeat}
            placeholderTextColor={"#808080"}
            className="bg-black focus:bg-slate-950/90 focus:border-slate-900 focus:scale-105"
            style={Styles.TextInput}
          />
          <Text style={[Styles.Text32, Styles.Pad20]}>Seat No.</Text>
          <TextInput
            placeholder="00"
            maxLength={2}
            value={position}
            onChangeText={setPosition}
            placeholderTextColor={"#808080"}
            keyboardType="numeric"
            className="bg-black focus:bg-slate-950/90 focus:border-slate-900 focus:scale-105"
            style={Styles.TextInput}
          />

          <TouchableOpacity onPress={CheckInfo} style={Styles.Submit}>
            <Text style={Styles.Text24}>Let's Go!</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={CheckFormerLogin} style={Styles.Submit}>
            <Text style={Styles.Text24}>Previous Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={clearAsync}
            style={[Styles.Submit, { backgroundColor: "#992222" }]}
          >
            <Text style={Styles.Text24}>Clear Login Data</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default App;
