import { useFocusEffect, useRouter } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { Styles } from "../hooks/styles";

import { readData } from "../hooks/storageLogic";
import { useState, useCallback } from "react";

export const BackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={Styles.GlobalBackButton}
    >
      <Text style={[Styles.Text48, { fontFamily: "THSrBold" }]}>{"<"}</Text>
    </TouchableOpacity>
  );
};

export const HeaderLabel = () => {
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  useFocusEffect(
    useCallback(() => {
      const LoadData = async () => {
        const s = await readData("seat");
        const p = await readData("position");
        if (s != "NULL" && p != "NULL") {
          setSeat(s);
          setPosition(p);
        }
      };
      LoadData();
    }, [])
  );
  return (
    <View style={Styles.GlobalSeatPos} className="pl-1 pr-1">
      <Text style={Styles.Text24}>
        {seat}
        {position}
      </Text>
    </View>
  );
};
