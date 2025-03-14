import { useState } from "react";
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
import { Styles } from "../hooks/styles";

const App: React.FC = () => {
  const router = useRouter();
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const isNumber = (input: string): boolean => {
    return /^\d{1,2}$/.test(input);
  };
  const isAlphabet = (input: string): boolean => {
    return /^[A-Z]$/.test(input.toUpperCase());
  };
  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert("Error", "Saving data failed");
    }
  };
  const readData = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      Alert.alert("Error", "Retrieving data failed");
    }
  };
  const CheckInfo = () => {
    if (
      isNumber(position) &&
      isAlphabet(seat) &&
      position !== "0" &&
      position !== "00" &&
      parseInt(position) < 51 &&
      seat.toUpperCase() !== "Z"
    ) {
      storeData("seat", seat);
      storeData("position", position);
      storeData("isLoggedIn", "true");
      router.push("choose");
    } else {
      Alert.alert("Error", "Incorrect Data");
    }
  };
  const CheckFormerLogin = async () => {
    try {
      const formerData = await readData("isLoggedIn");
      if (!formerData) {
        Alert.alert("Error", "No previous data existed");
        return;
      }
      const seatVale = await readData("seat");
      const posValue = await readData("position");
      if (seatVale && posValue) {
        setSeat(seatVale);
        setPosition(posValue);
        router.push("choose");
      } else {
        Alert.alert("Error", "Data not found");
      }
    } catch (e) {
      Alert.alert("Error", "Error loading previous data");
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
