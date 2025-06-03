// app/perfil.tsx
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import stylesPerfil from "../../styles/perfil"
import styles from "../../styles/components/componentStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <View style={stylesPerfil.header}>
        <Text style={stylesPerfil.title}>Sua conta</Text>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => router.push("/")}>
          <MaterialCommunityIcons name="logout" size={22} color="#DB0106" style={{ marginRight: 4 }} />
          <Text style={stylesPerfil.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} value="123.456.789-01" editable={false} />
      <TextInput style={styles.input} value="Matheus" editable={false} />
      <TextInput style={styles.input} value="matheus@ime.eb.br" editable={false} />
      <TextInput style={styles.input} value="27/03/1995" editable={false} />
      <TextInput style={styles.input} value="**********" editable={false} secureTextEntry />
    </View>
  );
}


