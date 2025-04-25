import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import "../global.css";
import { Styles } from "../hooks/styles";
import { MyAlert } from "../components/MyAlert";
import useAlert from "../hooks/useAlert";
import { InfoHook } from "../hooks/storageLogic";

const App: React.FC = () => {
  const router = useRouter();
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [alertState, ShowAlert, HideAlert] = useAlert();

  useEffect(() => {
    setSeat(seat.toUpperCase());
  }, [seat]);

  const CheckInfo = () => {
    const value = InfoHook(seat, position, "choose", router);
    if (value == "err") {
      ShowAlert("Error", "Incorrect Input");
    }
  };
  // const CheckFormerLogin = async () => {
  //   const value = await fLogHook({ setSeat, setPosition }, "choose", router);
  //   if (value == "NULL") {
  //     Alert.alert("Error", "No previous login found.");
  //   } else if (value == "err") {
  //     Alert.alert("Error", "Error loading previos login");
  //   }
  // };

  // const clearAsync = () => {
  //   AsyncStorage.clear();
  //   setSeat("");
  //   setPosition("");
  //   Alert.alert("Data cleared");
  // };

  return (
    <>
      <ScrollView style={{ backgroundColor: "#000000" }}>
        <SafeAreaView style={Styles.Container}>
          <Text style={[Styles.Text48, Styles.MgT16]}>
            {" "}
            Welcome to {"\n"}SkCheer
          </Text>
          <Text style={[Styles.Text24, { fontFamily: "SGTReg" }]}>
            Enter your seat
          </Text>

          <Text style={[Styles.Text32, Styles.Pad20]}>Row</Text>

          <TextInput
            placeholder="A - Y"
            maxLength={1}
            value={seat}
            onChangeText={setSeat}
            placeholderTextColor={"#999999"}
            className="border-4 border-pink-300 bg-pink-950 focus:scale-105"
            style={Styles.TextInput}
          />
          <Text style={[Styles.Text32, Styles.Pad20]}>Column</Text>
          <TextInput
            placeholder="1 - 50"
            maxLength={2}
            value={position}
            onChangeText={setPosition}
            placeholderTextColor={"#999999"}
            keyboardType="numeric"
            className="border-4 border-blue-400 bg-blue-950 focus:scale-105"
            style={Styles.TextInput}
          />

          <TouchableOpacity
            onPress={CheckInfo}
            style={[Styles.Submit, Styles.MgT64]}
            className="border-4 border-[#DDDDDD]"
          >
            <Text style={[Styles.Text32, { color: "#FFFFFF" }]}>Let's Go!</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
      {alertState.isVisible && (
        <MyAlert
          isVisible={alertState.isVisible}
          setVisible={HideAlert}
          Topic={alertState.topic}
          Message={alertState.message}
        />
      )}
    </>
  );
};

export default App;
