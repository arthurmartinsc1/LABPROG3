import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import styles from "../styles/components/componentStyles";
import stylesAuth from '../styles/autenticacao';
import { API_URL } from '../config/config';
import { router } from 'expo-router';

export default function VerificationScreen() {
  const [pin, setPin] = useState(Array(6).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const params = useLocalSearchParams();
  const email = Array.isArray(params.email) ? params.email[0] : params.email;


  if (!email) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erro</Text>
        <Text style={stylesAuth.subtitle}>Email não fornecido. Volte para o cadastro.</Text>
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
      const res = await fetch(`${API_URL}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Verificação concluída!");
        router.push("/"); 
      } else {
        alert("❌ Erro: " + data.error);
      }
    } catch (err) {
      console.error("Erro ao verificar código:", err);
      alert("Erro na verificação.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autenticação</Text>
      <Text style={stylesAuth.subtitle}>
        Conclua seu cadastro inserindo aqui o PIN enviado ao e-mail {email}
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
    </View>
  );
}
