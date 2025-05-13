import { CustomText } from "@/components/ui/CustomText";
import { View } from "react-native";
export default function Favorites() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      {/* <Text className="text-lg font-bold font-lexend-medium">Favorites</Text> */}
      <CustomText>Favorites</CustomText>
    </View>
  );
}
