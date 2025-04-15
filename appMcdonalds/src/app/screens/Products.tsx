import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator} from "react-native";
import { getProducts } from "../../services/api";

interface Produto {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
}

const ProdutosScreen = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await getProducts();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <View>
            <Text className="font-bold">{item.name}</Text>
        </View>
        )}
    />
  );
};


export default ProdutosScreen;