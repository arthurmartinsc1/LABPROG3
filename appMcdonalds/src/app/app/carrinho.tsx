import { useCart } from "../context/cartContext";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

export default function Carrinho() {
  const { cartItems } = useCart();

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
                <Text style={styles.details}>Qtd: {item.quantity}</Text>
                <Text style={styles.details}>Preço: R$ {Number(item.price).toFixed(2)}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
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
});
