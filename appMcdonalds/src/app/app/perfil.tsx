// app/perfil.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import stylesPerfil from "../../styles/perfil"
import styles from "../../styles/components/componentStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getUserProfile } from "../../services/api";

export default function Perfil() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        Alert.alert("Erro", "Não foi possível carregar seus dados.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <View style={stylesPerfil.header}>
        <Text style={stylesPerfil.title}>Sua conta</Text>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => router.push("/")}>
          <MaterialCommunityIcons name="logout" size={22} color="#DB0106" style={{ marginRight: 4 }} />
          <Text style={stylesPerfil.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} value={user?.cpf || ""} editable={false} />
      <TextInput style={styles.input} value={user?.name || ""} editable={false} />
      <TextInput style={styles.input} value={user?.email || ""} editable={false} />
      <TextInput style={styles.input} value={user?.birth_date || ""} editable={false} />
      <TextInput style={styles.input} value="**********" editable={false} secureTextEntry />
    </View>
  );
}


