import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import styles from "../styles/components/componentStyles";
import stylesAuth from '../styles/autenticacao';
import { API_URL } from '../config/config';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendResetEmail = async () => {
    if (!email.trim()) {
      alert('Por favor, insira seu e-mail');
      return;
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/reset-password-pin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ E-mail enviado! Verifique sua caixa de entrada.');
        router.push({
          pathname: '/resetVerification' as any,
          params: { email: email.trim().toLowerCase() }
        });
      } else {
        alert('❌ Erro: ' + (data.error || 'Erro ao enviar e-mail de redefinição'));
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('❌ Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefina sua senha</Text>
      <Text style={stylesAuth.subtitle}>
        Digite seu e-mail para receber o código de verificação
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSendResetEmail}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Enviar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => router.back()}
      >
        <Text style={styles.linkText}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}