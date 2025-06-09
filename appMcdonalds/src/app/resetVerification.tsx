import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import styles from "../styles/components/componentStyles";
import stylesAuth from '../styles/autenticacao';
import { API_URL } from '../config/config';
import { router } from 'expo-router';

export default function ResetVerificationScreen() {
  const [pin, setPin] = useState(Array(6).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);
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

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text.slice(-1); 
    setPin(newPin);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus(); 
    }
    if (index === pin.length - 1 && text) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && pin[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = pin.join('');
    if (!email || code.length < 6) {
      alert("Preencha todos os dígitos e verifique se o email está presente.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/verify-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Código verificado!");
        router.push({
          pathname: '/updatePassword' as any,
          params: { email }
        });
      } else {
        alert("❌ Erro: " + data.error);
      }
    } catch (err) {
      console.error("Erro ao verificar código:", err);
      alert("Erro na verificação.");
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await fetch(`${API_URL}/reset-password-pin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Novo código enviado para seu e-mail');
        // Limpar o PIN atual
        setPin(Array(6).fill(''));
        inputRefs.current[0]?.focus();
      } else {
        alert('❌ Erro: ' + (data.error || 'Erro ao reenviar código'));
      }
    } catch (error) {
      console.error('Erro ao reenviar:', error);
      alert('❌ Erro de conexão. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificação de Reset</Text>
      <Text style={stylesAuth.subtitle}>
        Digite o PIN enviado ao e-mail {email} para redefinir sua senha
      </Text>

      <View style={stylesAuth.pinContainer}>
        {pin.map((digit, i) => (
          <TextInput
            key={i}
            style={stylesAuth.pinBox}
            value={digit}
            onChangeText={(text) => handleChange(text, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            keyboardType="number-pad"
            maxLength={1}
            ref={(el) => {inputRefs.current[i] = el;}}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton}
        onPress={handleResendCode}
      >
        <Text style={styles.linkText}>Reenviar código</Text>
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