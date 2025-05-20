import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import stylesLogin from "../styles/login";
import styles from "../styles/components/componentStyles";
import { router } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            <TouchableOpacity style={styles.button} onPress={() => router.push("/produtos")}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

