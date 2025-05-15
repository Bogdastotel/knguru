import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  useFonts,
} from "@expo-google-fonts/lexend";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import "react-native-reanimated";
import "../global.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts and any other resources
        await Promise.all([
          // Add any other async operations here
          new Promise((resolve) => setTimeout(resolve, 1000)), // Optional delay
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="product/[id]"
              options={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: "horizontal",
                fullScreenGestureEnabled: true,
              }}
            />
            <Stack.Screen
              name="product/edit/[id]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="listings" options={{ headerShown: false }} />
          </Stack>
          <StatusBar />
        </ThemeProvider>
      </QueryClientProvider>
    </View>
  );
}
