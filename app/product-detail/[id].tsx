import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);

      setData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  return (
    <ScrollView style={{ padding: 16, backgroundColor: "white" }}>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{data?.title}</Text>
        <Image
          source={{ uri: data?.thumbnail }}
          style={{ width: "100%", height: 360 }}
        />
        <Text style={{ textAlign: "center" }}>{data?.description}</Text>
      </View>
    </ScrollView>
  );
}
