import "react-native-reanimated";
import { Stack } from "expo-router";
import Navbar  from "../../components/Navbar"
import { CartProvider } from "../../app/context/cartContext";
export default function RootLayout() {
  return (
    <CartProvider>
    <>
      <Stack screenOptions={{ headerShown: false, }}/>
      <Navbar/>
    </>
    </CartProvider>
  );
}
