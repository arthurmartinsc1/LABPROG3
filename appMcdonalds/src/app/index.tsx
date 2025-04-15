import { Text, View } from "react-native";
import ProdutosScreen from "./screens/Products";
import { Header } from "../components/header";

export default function Index() {

  return (
    <View>
      <Header/>
      <ProdutosScreen/>
    </View>
  );
}
