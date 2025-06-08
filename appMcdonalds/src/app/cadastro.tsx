import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import styles from "../styles/components/componentStyles";
import { router } from 'expo-router';
import { API_URL } from "@/src/config/config";

const formatDate = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  let formatted = cleaned;

  if (cleaned.length > 2) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }
  if (cleaned.length > 4) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }

  return formatted;
};

const formatCpf = (value: string): string => {
  const cleaned = value.replace(/\D/g, ''); // remove tudo que não for número

  let formatted = cleaned;

  if (cleaned.length > 3) {
    formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  }
  if (cleaned.length > 6) {
    formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  }
  if (cleaned.length > 9) {
    formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  }

  return formatted;
};


export default function RegisterScreen() {
  const [cpf, setCpf] = useState('');           
  const [cpfDisplay, setCpfDisplay] = useState(''); 
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

  const dateParts = birthDate.split('/');
  if (dateParts.length !== 3) {
    Alert.alert('Erro', 'Formato de data inválido. Use DD/MM/AAAA.');
    return;
  }

  const [dayStr, monthStr, yearStr] = dateParts;
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  const dateObj = new Date(year, month - 1, day); 
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    Alert.alert('Erro', 'Data inválida. Verifique o dia, mês e ano.');
    return;
  }

  const formattedDate = `${year.toString().padStart(4, '0')}-${month
    .toString()
    .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

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
        birth_date: formattedDate,
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
      <TextInput style={styles.input} placeholder="CPF" value={cpfDisplay} keyboardType="numeric" 
      onChangeText={(text) => {
        const cleaned = text.replace(/\D/g, '');
        setCpf(cleaned);
        setCpfDisplay(formatCpf(cleaned));
        if (cleaned.length === 11) {
          Keyboard.dismiss(); 
        }
      }}
    />
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Data de nascimento" value={birthDate} keyboardType="numeric"
        onChangeText={(text) => {
          const formatted = formatDate(text);
          setBirthDate(formatted);
          if (formatted.length === 10) {
            Keyboard.dismiss(); 
          }
        }}
      />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmar senha" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
