import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import stylesLogin from "../styles/login";
import styles from "../styles/components/componentStyles";
import { router } from 'expo-router';
import { API_URL } from '../config/config';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_URL}/login-app`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (!data.accessToken) {
                    Alert.alert("Erro", "Token não recebido do servidor.");
                    return;
                }
                await AsyncStorage.setItem("token", data.accessToken);
                router.push("/app/produtos");
            } else {
                Alert.alert('Erro', 'Email ou senha inválidos');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faça seu login</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={stylesLogin.forgotPassword} onPress={() => router.push("/redefineSenha")}>
                <Text style={stylesLogin.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}
