import Bell from "@/assets/icons/bell.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";
import Credits from "@/assets/icons/credits.svg";
import Invite from "@/assets/icons/invite.svg";
import Search from "@/assets/icons/search.svg";
import { CustomText } from "@/components/ui/CustomText";
import { ProductCard } from "@/components/ui/ProductCard";
import { useFavoritesStore } from "@/lib/favoritesStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  Dimensions,
  FlatList,
  Pressable,
  Share,
  TextInput,
  View,
} from "react-native";

const CARD_WIDTH = Dimensions.get("window").width * 0.8;

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

const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function HomeScreen() {
  const router = useRouter();
  const { favorites } = useFavoritesStore();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const products = data?.products || [];
  const favoriteProducts = products.filter((p) => favorites.has(String(p.id)));

  const handleInvite = async () => {
    try {
      await Share.share({
        message: "Check out this app for finding skilled contractors!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <CustomText className="text-lg text-dark-blue">Loading...</CustomText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <FlatList
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 140 }}
        data={[1, 2]}
        keyExtractor={(_, i) => i.toString()}
        ListHeaderComponent={() => (
          <View>
            <View className="flex-row justify-between align-center items-center pl-4 mb-7 mt-20">
              <View className="flex-row items-center bg-white rounded-full px-1 py-1">
                <Credits />
                <CustomText className="text-xs text-dark-blue font-lexend ml-2.5 mr-3">
                  512 credits
                </CustomText>
              </View>
              <View className="mr-6 justify-center ">
                <Bell />
              </View>
            </View>
            <View className="bg-white rounded-2xl flex-row items-center px-4 mx-4 py-2.5 mb-10">
              <View className="mr-3">
                <Search />
              </View>
              <TextInput
                className="flex-1 text-base font-lexend pt-2 pb-2.5"
                placeholder="Search for products"
                placeholderTextColor="#566A7C"
                textAlignVertical="center"
              />
            </View>
            <View className="flex-row justify-between items-center pl-4 mb-4">
              <CustomText className="text-2xl text-dark-blue font-lexend-semibold">
                New products
              </CustomText>
              <Pressable
                onPress={() => router.push("/listings")}
                className="bg-white rounded-10 flex-row items-center mx-4 px-3 py-2 active:opacity-70"
              >
                <CustomText className="font-lexend text-sm text-center text-dark-blue pl-1">
                  View all
                </CustomText>
                <View className="ml-2">
                  <ChevronRight />
                </View>
              </Pressable>
            </View>
            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `new-${item.id}`}
              renderItem={({ item, index }) => (
                <ProductCard
                  {...item}
                  onPress={() => router.push(`/product/${item.id}`)}
                  style={{
                    width: CARD_WIDTH,
                    marginLeft: index === 0 ? 16 : 8,
                    marginRight: index === products.length - 1 ? 16 : 8,
                  }}
                />
              )}
              snapToInterval={CARD_WIDTH + 8}
              decelerationRate="fast"
            />
          </View>
        )}
        renderItem={({ item, index }) =>
          index === 1 && favoriteProducts.length > 0 ? (
            <View>
              <View className="flex-row justify-between items-center pl-4 mt-10 mb-4">
                <CustomText className="text-2xl text-dark-blue font-lexend-semibold">
                  Favorite products
                </CustomText>
                <Pressable
                  onPress={() => router.push("/favorites")}
                  className="bg-white rounded-10 flex-row items-center mx-4 px-3 py-2 active:opacity-70"
                >
                  <CustomText className="font-lexend text-sm text-center text-dark-blue pl-1">
                    View all
                  </CustomText>
                  <View className="ml-2">
                    <ChevronRight />
                  </View>
                </Pressable>
              </View>
              <FlatList
                data={favoriteProducts}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => `fav-${item.id}`}
                renderItem={({ item, index }) => (
                  <ProductCard
                    {...item}
                    onPress={() => router.push(`/product/${item.id}`)}
                    style={{
                      width: CARD_WIDTH,
                      marginLeft: index === 0 ? 16 : 8,
                      marginRight:
                        index === favoriteProducts.length - 1 ? 16 : 8,
                    }}
                  />
                )}
                snapToInterval={CARD_WIDTH + 8}
                decelerationRate="fast"
              />
            </View>
          ) : null
        }
        ListFooterComponent={() => (
          <View className="mx-4 rounded-2xl mt-10 p-4 bg-main-blue">
            <Invite />
            <CustomText className="text-white text-xl font-lexend-medium mt-3 mb-1">
              Invite business partners
            </CustomText>
            <CustomText className="text-sm text-stroke-primary mb-6">
              Know other contractors looking for skilled workers? Recommend our
              app and help them find the right talent while growing your
              network.
            </CustomText>
            <Pressable
              className="bg-white rounded-xl py-2.5 items-center"
              onPress={handleInvite}
            >
              <CustomText className="text-dark-blue text-center text-lg font-lexend-medium">
                Invite business partner
              </CustomText>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
