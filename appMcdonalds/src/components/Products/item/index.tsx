import { ProdutoProps } from "@/src/services/loadingProducts/Products";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useCart } from "../../../app/context/cartContext";
import styles from "../../../styles/components/item/item.styles";

export function ProductItem({ item }: { item: ProdutoProps }) {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 2.3;

  const { addToCart, removeFromCart, getProductQuantity } = useCart(); // ✅ incluir getProductQuantity
  const quantidade = getProductQuantity(item.id); // ✅ usar quantidade do contexto

  const handleIncrement = () => {
    addToCart(item);
  };

  const handleDecrement = () => {
    removeFromCart(item.id);
  };

  return (
    <View style={[styles.container, { width: itemWidth }]}>
      <Image source={{ uri: item.image_url }} style={styles.image} resizeMode="contain" />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
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
