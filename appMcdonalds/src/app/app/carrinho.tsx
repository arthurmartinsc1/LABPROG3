import { useCart } from "../context/cartContext";
import { View, Text, FlatList, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";

export default function Carrinho() {
  const { cartItems, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const handlePagamento = () => {
    Alert.alert("Pagamento", "Siga as instruções do pinpad para concluir o pagamento.");
  };

  const handleCancelar = () => {
    clearCart();
    Alert.alert("Cancelar Pedido", "Pedido cancelado!");
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio 😢</Text>
      ) : (

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>Quantidade: {item.quantity}</Text>
                <Text style={styles.details}>Preço: R$ {Number(item.price).toFixed(2)}</Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>

              <TouchableOpacity style={styles.button} onPress={handlePagamento}>
                <Text style={styles.buttonText}>Pagar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCancelar} style={styles.cancelContainer}>
                <Text style={styles.cancelText}>Cancelar pedido</Text>
              </TouchableOpacity>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 72 }}
        />


      )}
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
