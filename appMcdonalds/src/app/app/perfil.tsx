// app/perfil.tsx
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import stylesPerfil from "../../styles/perfil"
import styles from "../../styles/components/componentStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { getUserProfile } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar perfil
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      // Limpa o estado anterior antes de buscar novos dados
      setUser(null);

      const data = await getUserProfile();
      console.log('Dados do perfil carregados:', data); // Para debug
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
  }, []);

  // useEffect inicial
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Recarrega sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  const handleLogout = async () => {
    try {
      // Limpa todos os dados relacionados à sessão
      await AsyncStorage.multiRemove(['token', 'user', 'userProfile']);

      // Limpa o estado local
      setUser(null);

      router.push("/");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      router.push("/");
    }
  };

  // Função para formatar data se necessário
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
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