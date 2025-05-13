import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

export default function BlurTabBarBackground() {
  return (
    // <BlurView
    //   // System chrome material automatically adapts to the system's theme
    //   // and matches the native tab bar appearance on iOS.
    //   tint="systemChromeMaterial"
    //   intensity={150}
    //   style={[
    //     StyleSheet.absoluteFill,
    //     { backgroundColor: "rgba(56,76,97,255)" },
    //   ]}
    // />
    <View style={StyleSheet.absoluteFill}>
      <BlurView tint="dark" intensity={150} style={StyleSheet.absoluteFill} />
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(14, 38, 62, 0.8)" },
        ]}
      />
    </View>
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
