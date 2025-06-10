// app/perfil.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import stylesPerfil from "../../styles/perfil"
import styles from "../../styles/components/componentStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getUserProfile } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err: any) {
        console.error('Erro ao carregar perfil:', err);
        
        // Se o erro for relacionado à autenticação, redirecionar para login
        if (err.message.includes('Sessão expirada') || err.message.includes('Token não encontrado')) {
          Alert.alert(
            "Sessão Expirada", 
            "Sua sessão expirou. Você será redirecionado para o login.",
            [
              {
                text: "OK",
                onPress: () => router.push("/")
              }
            ]
          );
        } else {
          Alert.alert("Erro", "Não foi possível carregar seus dados.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.push("/");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      router.push("/");
    }
  };

  // Função para formatar data se necessário
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Carregando dados...</Text>
      </View>
    );
  }

  const formatCPF = (cpf: string) => {
  if (!cpf) return "";
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };


  return (
    <View style={styles.container}>
      <View style={stylesPerfil.header}>
        <Text style={stylesPerfil.title}>Sua conta</Text>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={22} color="#DB0106" style={{ marginRight: 4 }} />
          <Text style={stylesPerfil.logout}>Sair</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} value={formatCPF(user?.cpf) || ""} editable={false} />
      <TextInput style={styles.input} value={user?.name || ""} editable={false} />
      <TextInput style={styles.input} value={user?.email || ""} editable={false} />
      <TextInput style={styles.input} value={formatDate(user?.birth_date) || ""} editable={false} />
      <TextInput style={styles.input} value="**********" editable={false} secureTextEntry />
    </View>
  );
}


