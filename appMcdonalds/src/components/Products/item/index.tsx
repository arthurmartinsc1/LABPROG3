import { ProdutoProps } from "@/src/services/loadingProducts/Products";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useCart } from "../../../app/context/cartContext";
import styles from "../../../styles/components/item/item.styles";

export function ProductItem({ item }: { item: ProdutoProps }) {
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 2.3;

  const { addToCart, removeFromCart, getProductQuantity } = useCart();

  const quantidade = getProductQuantity(item.id);

  const handleIncrement = () => {
    addToCart(item);
  };

  const handleDecrement = () => {
    removeFromCart(item.id);
  };

  // Função para validar e limpar a URI
  const getValidImageUri = (uri: string | undefined | null): string | null => {
    if (!uri || typeof uri !== 'string') {
      return null;
    }

    // Remove espaços em branco no início e fim
    const cleanUri = uri.trim();

    // Verifica se é uma URL válida
    try {
      new URL(cleanUri);
      return cleanUri;
    } catch (error) {
      console.warn('URI inválida:', cleanUri);
      return null;
    }
  };

  const validImageUri = getValidImageUri(item?.image_url);

  return (
    <View style={[styles.container, { width: itemWidth }]}>
      {validImageUri ? (
        <Image 
          source={{ uri: validImageUri }} 
          style={styles.image} 
          resizeMode="contain"
          onError={(error) => {
            console.warn('Erro ao carregar imagem:', error.nativeEvent.error);
          }}
        />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>Sem imagem</Text>
        </View>
      )}
      
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