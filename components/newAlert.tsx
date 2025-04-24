import { Text, TouchableOpacity, View } from "react-native";

import { Styles } from "../hooks/styles";

type AlertProps = {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  Topic: string;
  Message: string;
};

export const MyAlert = ({
  isVisible,
  setVisible,
  Topic,
  Message,
}: AlertProps) => {
  if (!isVisible) return null;
  return (
    <View
      style={[Styles.AlertContainer, { backgroundColor: "rgba(0,0,0,0.8)" }]}
    >
      <TouchableOpacity
        onPress={() => setVisible(false)}
        style={Styles.AlertContainer}
      >
        <View style={Styles.AlertBox} className="border-4 border-black">
          <Text style={Styles.Text40}>{Topic}</Text>
          <Text style={[Styles.Text24, Styles.Pad20]}>{Message}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
