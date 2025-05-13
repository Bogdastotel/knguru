import { CustomText } from "@/components/ui/CustomText";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <CustomText className="text-lg font-lexend-medium">Hello</CustomText>
    </View>
  );
}
