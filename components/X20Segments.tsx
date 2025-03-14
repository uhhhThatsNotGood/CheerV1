import { Text, View } from "react-native";
import { Styles } from "../hooks/styles";
import { colorToNameX20 } from "../hooks/BMPutils";

const getContrast = (hex: string) => {
  const color = hex.replace(/^#/, "");

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return brightness > 0.5 ? "#000000" : "#FFFFFF";
};

export const X20Segments = ({ color }: { color: string }) => {
  const contrasted: string = getContrast(color);
  return (
    <View style={[Styles.X20Pixel, { backgroundColor: color }]}>
      <Text style={[Styles.Text24, Styles.SMBoldCenter, { color: contrasted }]}>
        {color ? colorToNameX20(color) : "Loading hex data..."}
      </Text>
    </View>
  );
};
