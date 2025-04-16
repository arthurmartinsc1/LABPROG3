import { Text, View } from "react-native";
import { Header } from "../components/header";
import { Products } from "../components/Products";

export default function Index() {

  return (
    <View>
      <Header/>
      <Products/>
    </View>
  );
}
