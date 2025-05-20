import React from "react";
import { View, ScrollView, Text } from "react-native";
import { useProdutos } from "@/src/services/loadingProducts/Products";
import { ProductItem } from "./item";
import styles from "../../styles/components/products.styles";

export function Products() {
  const produtos = useProdutos();

  // Agrupar produtos por categoria
  const groupedProducts = produtos.reduce((acc: Record<string, typeof produtos>, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {Object.entries(groupedProducts).map(([categoria, items]) => (
          <View key={categoria} style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{categoria}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productList}>
              {items.map((item) => (
                <ProductItem item={item} key={item.id} />
              ))}
            </ScrollView>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}