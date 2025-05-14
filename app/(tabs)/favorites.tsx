import { CustomText } from "@/components/ui/CustomText";
import { ProductCard } from "@/components/ui/ProductCard";
import { ScrollView, View } from "react-native";
export default function Favorites() {
  return (
    <ScrollView
      className="flex-1 px-4  bg-background"
      contentContainerStyle={{ paddingBottom: 100, paddingTop: 4 }}
    >
      {/* <Text className="text-lg font-bold font-lexend-medium">Favorites</Text> */}
      <CustomText className="text-2xl font-bold font-lexend-medium mt-20">
        Favorites
      </CustomText>
      <View className="my-2">
        <ProductCard
          title="Product title"
          description="We're looking for a skilled team to build a small commercial office (approx. 200 m²) in downtown LA. The job includes.."
          category="Category Home"
          brand="Essence"
          rating={4.95}
          price={450.0}
          stock={10}
        />
      </View>
      <View className="my-2">
        <ProductCard
          title="Product title"
          description="We're looking for a skilled team to build a small commercial office (approx. 200 m²) in downtown LA. The job includes.."
          category="Category Home"
          brand="Essence"
          rating={4.95}
          price={450.0}
          stock={10}
        />
      </View>
      <View className="my-2">
        <ProductCard
          title="Product title"
          description="We're looking for a skilled team to build a small commercial office (approx. 200 m²) in downtown LA. The job includes.."
          category="Category Home"
          brand="Essence"
          rating={4.95}
          price={450.0}
          stock={10}
        />
      </View>
      <View className="my-2">
        <ProductCard
          title="Product title"
          description="We're looking for a skilled team to build a small commercial office (approx. 200 m²) in downtown LA. The job includes.."
          category="Category Home"
          brand="Essence"
          rating={4.95}
          price={450.0}
          stock={10}
        />
      </View>
    </ScrollView>
  );
}
