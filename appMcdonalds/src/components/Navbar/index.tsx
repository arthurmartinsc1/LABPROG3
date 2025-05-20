import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import styles from "../../styles/components/navbar.styles";
import { MaterialCommunityIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

export default function Navbar() {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={{alignItems:'center'}} onPress={() => router.replace("/produtos")}>
        <MaterialCommunityIcons name="food" size={24} color="#DB0106" />
        <Text style={styles.navItem}>Produtos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems:'center'}} onPress={() => router.replace("/carrinho")}>
        <Ionicons name="cart" size={24} color="#DB0106" />
        <Text style={styles.navItem}>Carrinho</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems:'center'}} onPress={() => router.replace("/perfil")}>
        <FontAwesome name="user" size={24} color="#DB0106" />
        <Text style={styles.navItem}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}