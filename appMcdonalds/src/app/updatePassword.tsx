import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import styles from "../styles/components/componentStyles";
import stylesAuth from '../styles/autenticacao';
import { API_URL } from '../config/config';
import { router } from 'expo-router';

export default function UpdatePasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();
  const email = Array.isArray(params.email) ? params.email[0] : params.email;

  if (!email) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erro</Text>
        <Text style={stylesAuth.subtitle}>Email não fornecido. Volte para redefinir senha.</Text>
      </View>
    );
  }

  const handleUpdatePassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (newPassword.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          newPassword: newPassword.trim()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Senha alterada com sucesso!');
        // Navega para a tela de login e limpa o stack
        router.replace('/login');
      } else {
        alert('❌ Erro: ' + (data.error || 'Erro ao atualizar senha'));
      }
    } catch (error) {
      console.error('Erro na atualização:', error);
      alert('❌ Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Senha</Text>
      <Text style={stylesAuth.subtitle}>
        Defina sua nova senha para a conta {email}
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar nova senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        editable={!loading}
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleUpdatePassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Atualizar Senha</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => router.back()}
      >
        <Text style={styles.linkText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
