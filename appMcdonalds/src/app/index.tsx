import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/components/componentStyles";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>

        <Image
          source={require("../app/assets/mcLogo.png")}
          resizeMode="cover"
          style={styles.image}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Faça seu login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/cadastro")}>
        <Text style={styles.buttonText}>Crie uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}