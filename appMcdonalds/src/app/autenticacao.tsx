import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from "../styles/components/componentStyles";
import stylesAuth from '../styles/autenticacao';
import { router } from 'expo-router';

export default function VerificationScreen() {
  const [pin, setPin] = useState(Array(6).fill(''));

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text.slice(-1); // só um dígito
    setPin(newPin);
  };

  return (
    <View style={styles.container}>

        <Text style={styles.title}>Autenticação</Text>
        <Text style={stylesAuth.subtitle}>
          Conclua seu cadastro inserindo aqui o PIN enviado ao e-mail cadastrado
        </Text>

        <View style={stylesAuth.pinContainer}>
          {pin.map((digit, i) => (
            <TextInput
              key={i}
              style={stylesAuth.pinBox}
              value={digit}
              onChangeText={(text) => handleChange(text, i)}
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/produtos")}>
          <Text style={styles.buttonText}>Verificar</Text>
        </TouchableOpacity>
      </View>

  );
}


