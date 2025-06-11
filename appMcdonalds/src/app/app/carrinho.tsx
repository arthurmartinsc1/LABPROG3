import { useState } from "react";
import { useCart } from "../context/cartContext";
import { View, Text, FlatList, StyleSheet, Image, Alert, TouchableOpacity, ListRenderItem } from "react-native";
import TelaPagamento from "./telaPagamento"; // Importe o componente

// Assumindo que você tem um tipo para o item do carrinho
interface CartItem {
  id: number;
  name: string;
  price: string | number;
  quantity: number;
  image_url: string;
}

export default function Carrinho(): JSX.Element {
  const { cartItems, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState<boolean>(false);

  const total: number = cartItems.reduce(
    (sum: number, item: CartItem) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const handlePagamento = (): void => {
    if (cartItems.length === 0) {
      Alert.alert("Erro", "Seu carrinho está vazio!");
      return;
    }
    setShowPayment(true);
  };

  const handleCancelar = (): void => {
    clearCart();
    Alert.alert("Cancelar Pedido", "Pedido cancelado!");
  };

  const closePayment = (): void => {
    setShowPayment(false);
  };

  const renderItem: ListRenderItem<CartItem> = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>Quantidade: {item.quantity}</Text>
        <Text style={styles.details}>Preço: R$ {Number(item.price).toFixed(2)}</Text>
      </View>
    </View>
  );

  const ListFooter = (): JSX.Element => (
    <View style={styles.footer}>
      <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePagamento}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancelar} style={styles.cancelContainer}>
        <Text style={styles.cancelText}>Cancelar pedido</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio 😢</Text>
      ) : (
        <FlatList<CartItem>
          data={cartItems}
          keyExtractor={(item: CartItem) => item.id.toString()}
          renderItem={renderItem}
          ListFooterComponent={ListFooter}
          contentContainerStyle={{ paddingBottom: 72 }}
        />
      )}

      {/* Tela de Pagamento Modal */}
      <TelaPagamento
        visible={showPayment}
        onClose={closePayment}
        total={total}
        cartItems={cartItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fafafa",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  footer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F2A100",
    marginBottom: 12,
    textAlign: "left",
  },
  button: {
    backgroundColor: "#FDBA1C",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 12,
    shadowColor: "#FDBA1C",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelContainer: {
    alignItems: "flex-end",
  },
  cancelText: {
    color: "#FF0000",
    fontSize: 14,
  },
});