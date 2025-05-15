import { CustomText } from "@/components/ui/CustomText";
import { ProductCard } from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { useFavoritesStore } from "@/lib/favoritesStore";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

// Reuse the Product type from the home screen

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  thumbnail?: string;
  images?: string[];
};

export default function Listings() {
  const { favorites } = useFavoritesStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-background px-4 pt-20">
        <CustomText className="text-product-title-lg font-bold font-lexend-medium mb-4 mt-10">
          Products
        </CustomText>
        <View className="flex-col space-y-4 mt-4">
          {[1, 2, 3, 4].map((_, i) => (
            <View key={i} className="my-2">
              <Skeleton width={"100%"} height={289} borderRadius={24} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 px-4  bg-background"
      contentContainerStyle={{ paddingBottom: 100, paddingTop: 80 }}
    >
      {/* <Text className="text-lg font-bold font-lexend-medium">Favorites</Text> */}
      <CustomText className="text-product-title-lg font-bold font-lexend-medium mb-4">
        Products
      </CustomText>
      {products.length === 0 ? (
        <CustomText className="text-base text-secondary mt-10 text-center">
          No products available.
        </CustomText>
      ) : (
        products.map((product) => (
          <View className="my-2" key={product.id}>
            <ProductCard {...product} />
          </View>
        ))
      )}
    </ScrollView>
  );
}
