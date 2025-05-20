import { ScrollView, View } from "react-native";
import { Products } from "../components/Products";
import Navbar from "../components/Navbar";

export default function Index() {

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Products/>
      </ScrollView>
      <Navbar/>
    </View>
  );
}
