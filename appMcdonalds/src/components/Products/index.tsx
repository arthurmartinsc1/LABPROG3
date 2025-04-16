import { View, ScrollView } from "react-native";
import { useProdutos } from "@/src/services/loadingProducts/Products";
import { ProductItem } from "./item";


export function Products() {
    const produtos = useProdutos();

    return(
        <ScrollView className="flex-1">
            <View className="flex-row flex-wrap justify-between px-1">
                {produtos.map(item => (
                    <ProductItem item={item} key={item.id} />
                ))}
            </View>
        </ScrollView>
    );
}