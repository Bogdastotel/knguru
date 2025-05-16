import Bell from "@/assets/icons/bell.svg";
import Check from "@/assets/icons/check.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";
import Credits from "@/assets/icons/credits.svg";
import Invite from "@/assets/icons/invite.svg";
import { CustomText } from "@/components/ui/CustomText";
import { ProductCard } from "@/components/ui/ProductCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { Skeleton } from "@/components/ui/Skeleton";
import { useFavoritesStore } from "@/lib/favoritesStore";
import { useDebounce } from "@/lib/useDebounce";
import { fetchProducts, fetchSearchedProducts } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  Share,
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

export default function HomeScreen() {
  const router = useRouter();
  const { favorites } = useFavoritesStore();
  const [showNotifModal, setShowNotifModal] = useState(false);
  const notifAnim = useRef(new Animated.Value(0)).current;
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const creditsAnim = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -200],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (showNotifModal) {
      notifAnim.setValue(0);
      Animated.spring(notifAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 2,
        tension: 200,
      }).start();
    }
  }, [showNotifModal]);

  useEffect(() => {
    if (showCreditsModal) {
      creditsAnim.setValue(0);
      Animated.spring(creditsAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 2,
        tension: 200,
      }).start();
    }
  }, [showCreditsModal]);

  const { data: searchedProducts, isLoading: isLoadingSearchedProducts } =
    useQuery({
      queryKey: ["search", debouncedSearch],
      queryFn: () => fetchSearchedProducts(debouncedSearch),
      enabled: !!debouncedSearch,
    });

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    enabled: !debouncedSearch,
  });

  const products: Product[] = data?.products || [];
  const favoriteProducts = products.filter((p: Product) =>
    favorites.has(String(p.id))
  );

  const displayProducts = debouncedSearch
    ? searchedProducts?.products
    : products;

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
      <View className="flex-1 bg-background px-4 pt-16">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <Skeleton width={120} height={32} borderRadius={16} style={{}} />
          <Skeleton width={32} height={32} borderRadius={16} style={{}} />
        </View>
        <Skeleton
          width={"100%"}
          height={44}
          borderRadius={16}
          style={{ marginBottom: 32 }}
        />
        <Skeleton
          width={160}
          height={28}
          borderRadius={8}
          style={{ marginBottom: 16 }}
        />
        <View style={{ flexDirection: "row" }}>
          <Skeleton
            width={260}
            height={220}
            borderRadius={24}
            style={{ marginRight: 16 }}
          />
          <Skeleton width={260} height={220} borderRadius={24} style={{}} />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Animated.View
        style={{
          transform: [{ translateY: headerTranslateY }],
          opacity: headerOpacity,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          backgroundColor: "transparent",
        }}
      >
        <View className="flex-row justify-between align-center items-center pl-4 mb-7 mt-20">
          <Pressable
            className="flex-row items-center bg-white rounded-full px-1 py-1"
            onPress={() => setShowCreditsModal(true)}
          >
            <Credits />
            <CustomText className="text-xs text-dark-blue font-lexend ml-2.5 mr-3">
              512 credits
            </CustomText>
          </Pressable>
          <Pressable
            className="mr-6 justify-center"
            onPress={() => setShowNotifModal(true)}
          >
            <Bell />
          </Pressable>
        </View>
        <SearchInput value={search} onChangeText={setSearch} />
      </Animated.View>
      <Animated.FlatList
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 140, paddingTop: 240 }}
        data={[1, 2]}
        keyExtractor={(_, i) => i.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={() => (
          <View>
            <View className="flex-row justify-between items-center pl-4 mb-4">
              <CustomText className="text-2xl text-dark-blue font-lexend-semibold">
                {debouncedSearch
                  ? isLoadingSearchedProducts
                    ? "Searching..."
                    : `${
                        !displayProducts || displayProducts.length === 0
                          ? "0 "
                          : ""
                      }Search Results`
                  : "New products"}
              </CustomText>
              {!debouncedSearch && (
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
              )}
            </View>
            {debouncedSearch ? (
              isLoadingSearchedProducts ? (
                <View className="items-center justify-center py-20">
                  <CustomText className="text-lg text-dark-blue">
                    Searching...
                  </CustomText>
                </View>
              ) : (
                <FlatList
                  data={displayProducts}
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
                        marginRight:
                          index === displayProducts.length - 1 ? 16 : 8,
                      }}
                    />
                  )}
                  snapToInterval={CARD_WIDTH + 8}
                  decelerationRate="fast"
                />
              )
            ) : (
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
            )}
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
      <Modal
        visible={showNotifModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNotifModal(false)}
      >
        <View className="flex-1 bg-dark-blue justify-center items-center">
          <View className="items-center mt-20">
            <Animated.View
              style={{
                transform: [{ scale: notifAnim }],
                opacity: notifAnim,
                marginBottom: 24,
              }}
            >
              <Check width={64} height={64} />
            </Animated.View>
            <CustomText className="text-white text-4xl font-lexend-bold mb-2 text-center">
              No new notifications
            </CustomText>
            <CustomText className="text-white text-base mb-8 text-center">
              You&apos;re all caught up!
            </CustomText>
            <Pressable
              className="bg-[#FFD500] rounded-xl px-8 py-3 w-64"
              onPress={() => setShowNotifModal(false)}
            >
              <CustomText className="text-dark-blue text-center text-lg font-lexend-bold">
                Close
              </CustomText>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showCreditsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCreditsModal(false)}
      >
        <View className="flex-1 bg-dark-blue justify-center items-center">
          <View className="items-center mt-20">
            <Animated.View
              style={{
                transform: [{ scale: creditsAnim }],
                opacity: creditsAnim,
                marginBottom: 24,
              }}
            >
              <Credits width={64} height={64} />
            </Animated.View>
            <CustomText className="text-white text-4xl font-lexend-bold mb-2 text-center">
              Credits
            </CustomText>
            <CustomText className="text-white text-base mb-8 text-center">
              You currently have only 512 credits.
            </CustomText>
            <Pressable
              className="bg-[#FFD500] rounded-xl px-8 py-3 w-64"
              onPress={() => setShowCreditsModal(false)}
            >
              <CustomText className="text-dark-blue text-center text-lg font-lexend-bold">
                Close
              </CustomText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
