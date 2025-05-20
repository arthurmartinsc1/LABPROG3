import { Stack } from "expo-router";
import '../styles/global.css';
import { Header } from "../components/header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Stack 
        screenOptions={{
          headerShown: false, 
        }}
      />;
    </>
  );
}
