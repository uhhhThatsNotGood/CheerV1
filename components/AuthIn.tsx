import { View, Text, TextInput } from "react-native";
import React from "react";

interface AuthInProps {
  label: string;
  placehold: string;
  maxLen: number;
  states: string;
  dataType: "numeric" | "default";
  setStates: React.Dispatch<React.SetStateAction<string>>;
}

const AuthIn: React.FC<AuthInProps> = ({
  label,
  placehold,
  maxLen,
  states,
  dataType,
  setStates,
}) => {
  return (
    <View className="items-center">
      <Text className="color-white p-8 text-4xl font-SpGtskReg">{label}</Text>
      <TextInput
        className="text-3xl border-2 bg-slate-900/50 focus:bg-slate-950/90 focus:border-slate-900 focus:scale-105
         border-white w-80 h-24 rounded-lg m-auto text-center color-white font-SpGtskReg"
        placeholder={placehold}
        value={states}
        onChangeText={setStates}
        maxLength={maxLen}
        placeholderTextColor={"#808080"}
        keyboardType={dataType}
      />
    </View>
  );
};

export default AuthIn;
