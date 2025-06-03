import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from "../styles/components/componentStyles";
import { router } from 'expo-router';
import { API_URL } from "@/src/config/config";

export default function RegisterScreen() {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (!cpf || !name || !email || !birthDate || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register-app`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf,
          name,
          email,
          password,
          birth_date: birthDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', data.message);
        router.push(`/autenticacao?email=${encodeURIComponent(email)}`);

      } else {
        Alert.alert('Erro', data.error || 'Erro ao registrar');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} />
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Data de nascimento" value={birthDate} onChangeText={setBirthDate} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmar senha" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
