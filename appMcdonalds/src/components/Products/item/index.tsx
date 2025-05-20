import { ProdutoProps } from "@/src/services/loadingProducts/Products";
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import styles from "../../../styles/components/item/item.styles";

export function ProductItem({ item }: { item: ProdutoProps }) {
  const [quantidade, setQuantidade] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 2.3; 

  const handleIncrement = () => setQuantidade((prev) => prev + 1);
  const handleDecrement = () => setQuantidade((prev) => Math.max(prev - 1, 0));

  return (
    <View style={[styles.container, { width: itemWidth }]}>
      <Image
        source={{ uri: item.image_url }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>
          {item.price && !isNaN(Number(item.price))
            ? `R$ ${Number(item.price).toFixed(2)}`
            : "Preço indisponível"}
        </Text>
      </View>

      <View style={styles.counterContainer}>
        <CounterButton onPress={handleDecrement} text="-" />
        <Text style={styles.quantity}>{quantidade}</Text>
        <CounterButton onPress={handleIncrement} text="+" />
      </View>
    </View>
  );
}

const CounterButton = ({ onPress, text }: { onPress: () => void; text: string }) => (
  <TouchableOpacity onPress={onPress} style={styles.counterButton}>
    <Text style={styles.counterButtonText}>{text}</Text>
  </TouchableOpacity>
);