import { useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { Styles } from "../hooks/styles";

export const BackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={Styles.GlobalBackButton}
    >
        <Text style={Styles.Text32}>{"<"}</Text>
    </TouchableOpacity>
  );
};


