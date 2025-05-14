import Heart from "@/assets/icons/heart.svg";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { CustomText } from "./CustomText";

interface ProductCardProps {
  title: string;
  description: string;
  category: string;
  rating: number;
  brand: string;
  price: number;
  stock: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ProductCard({
  title,
  description,
  category,
  rating,
  brand,
  price,
  stock,
  onPress,
  style,
}: ProductCardProps) {
  return (
    <Pressable
      className="bg-card rounded-2xl pt-4 active:opacity-70"
      onPress={onPress}
      style={style}
    >
      <View className="flex-row justify-between px-4">
        <CustomText className="font-lexend-medium  text-dark-blue text-product-title mb-1">
          {title}
        </CustomText>
        <Heart color="#2555E7" />
      </View>
      <View className=" bg-stroke-primary h-px mx-4 my-4"></View>
      <CustomText
        className="px-4 text-product-meta text-secondary mb-2"
        numberOfLines={2}
      >
        {description}
      </CustomText>
      <View className="flex-row justify-between my-3">
        <CustomText className="px-4 text-product-meta text-secondary">
          Category
        </CustomText>
        <CustomText className="px-4 text-product-meta text-dark-blue font-lexend-medium">
          {category}
        </CustomText>
      </View>
      <View className="flex-row justify-between mb-3">
        <CustomText className="px-4 text-product-meta text-secondary">
          Rating
        </CustomText>
        <CustomText className="px-4 text-product-meta text-dark-blue font-lexend-medium">
          {rating}
        </CustomText>
      </View>
      <View className="flex-row justify-between mb-4">
        <CustomText className="px-4 text-product-meta text-secondary">
          Brand
        </CustomText>
        <CustomText className="px-4 text-product-meta font-lexend-medium">
          {brand}
        </CustomText>
      </View>
      <View className="bg-background-price pt-4 px-4 pb-0.5 flex-row justify-between items-end">
        <CustomText className="text-primary-blue font-lexend-medium text-xl">
          ${price}
        </CustomText>
        <CustomText className="text-md font-lexend-medium text-primary-blue text-xl">
          {stock}
        </CustomText>
      </View>
      <View className="bg-background-price rounded-b-2xl px-4 pb-4 flex-row justify-between items-end">
        <CustomText className="text-base text-secondary">/price</CustomText>
        <CustomText className="text-base text-secondary">/in stock</CustomText>
      </View>
    </Pressable>
  );
}
