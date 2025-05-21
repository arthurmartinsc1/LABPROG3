import { View, Text, StyleSheet, StatusBar } from 'react-native';
import styles from "../../styles/components/header.styles";

export function Header() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#DB0106" barStyle="light-content"  />
      <Text style={styles.title}>Mc Donald's</Text>
    </View>
  );
}