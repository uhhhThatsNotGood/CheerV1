import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Styles } from "../hooks/styles";

export const BackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={Styles.GlobalBackButton}
    >
      <View>
        <Text style={Styles.Text32}>{"<"}</Text>
      </View>
    </TouchableOpacity>
  );
};


