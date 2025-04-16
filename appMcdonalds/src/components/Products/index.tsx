import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useProdutos } from "@/src/services/loadingProducts/Products";
import { ProductItem } from "./item";
import { CategoryFilter } from "../category";

export function Products() {
    const produtos = useProdutos();
    const [filteredProducts, setFilteredProducts] = useState(produtos);
    const [activeCategory, setActiveCategory] = useState('Sanduíches');
    
    // Extrair categorias únicas dos produtos
    const allCategories = [...Array.from(new Set(produtos.map(product => product.category)))];
    
    // Filtrar produtos quando a categoria ativa mudar ou quando os produtos mudarem
    useEffect(() => {
        const filtered = produtos.filter(product => product.category === activeCategory);
        setFilteredProducts(filtered);
        
    }, [activeCategory, produtos]);
    
    const handleCategoryPress = (category: React.SetStateAction<string>) => {
        setActiveCategory(category);
    };
    
    return(
        <ScrollView className="flex-1">
            <View className="px-2">
                <CategoryFilter 
                    categories={allCategories} 
                    activeCategory={activeCategory} 
                    onCategoryPress={handleCategoryPress} 
                />
                
                <View className="flex-row flex-wrap justify-between">
                    {filteredProducts.map(item => (
                        <ProductItem item={item} key={item.id} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}