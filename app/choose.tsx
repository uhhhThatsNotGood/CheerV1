import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
//import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";

import "../global.css";
import { Styles } from "../hooks/styles";
import { BackButton, HeaderLabel } from "../components/Header";

const Home = () => {
  const router = useRouter();

  const push = (path: string) => {
    router.push({ pathname: "imageID", params: { id: `${path}` } });
  };

  return (
    <SafeAreaView style={Styles.Container}>
      <BackButton />
      <HeaderLabel />
      <View style={Styles.MgT64}>
        <Text style={[Styles.Text48, Styles.Pad20]}>Selection</Text>
        <TouchableOpacity
          style={Styles.Choose}
          className="border-8 border-pink-400 bg-pink-950"
          onPress={() => push("1")}
        >
          <Text style={Styles.Text72}>1 : 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.Choose}
          className="border-8 border-blue-400 bg-blue-950"
          onPress={() => push("20")}
        >
          <Text style={Styles.Text72}>1 : 20</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
