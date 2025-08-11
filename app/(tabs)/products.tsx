import { ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useProductStore } from "@/store/useProductStore";
import { List } from "@ant-design/react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function ProductsScreen() {
  const router = useRouter();
  const { products, setProducts } = useProductStore();
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");

      setProducts(response.data.products);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <View style={styles.screenContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Products</ThemedText>
      </ThemedView>
      <ScrollView
        // style={{ flex: 1, backgroundColor: '#f5f5f9' }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <List>
          {products.map((item) => {
            return (
              <List.Item
                key={item.id}
                thumb={item.thumbnail}
                styles={{
                  Thumb: { width: 48, height: 48, borderRadius: 4 },
                  Content: { paddingVertical: 16 },
                }}
                onPress={() => {
                  router.push(`/product-detail/${item.id}`);
                }}
              >
                <ThemedText>{item.title}</ThemedText>
              </List.Item>
            );
          })}
        </List>
      </ScrollView>
      {/* <ThemedView>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <ThemedText>{item.title}</ThemedText>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        
      </ThemedView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 52,
    backgroundColor: "white",
    padding: 16,
  },
  titleContainer: {
    flexDirection: "column",
    paddingBottom: 8,
  },
  productItem: {
    gap: 16,
  },
});
