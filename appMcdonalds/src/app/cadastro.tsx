import React from 'react';
import { View, Text, TextInput, TouchableOpacity, } from 'react-native';
import styles from "../styles/components/componentStyles";
import { router } from 'expo-router';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput style={styles.input} placeholder="CPF" />
      <TextInput style={styles.input} placeholder="Nome" />
      <TextInput style={styles.input} placeholder="E-mail" />
      <TextInput style={styles.input} placeholder="Data de nascimento" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar senha" secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={() => router.push("/autenticacao")}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

