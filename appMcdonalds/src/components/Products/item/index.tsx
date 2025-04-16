import { ProdutoProps } from "@/src/services/loadingProducts/Products";
import { View, Text, Image, Pressable, Dimensions } from "react-native";

export function ProductItem({item}: {item:ProdutoProps}) {
    return (
        <Pressable className="p-2 items-center" style={{ width: Dimensions.get('window').width / 3 }}>
          <Image
            source={{ uri: item.image_url }}
            className="rounded-md"
            style={{ width: 110, height: 90 }}
          />
          <View className="w-full mt-1 flex items-center">
            <Text className="text-xs text-gray-500" numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text className="font-bold">{item.price}</Text>
          </View>
        </Pressable>
    );
}